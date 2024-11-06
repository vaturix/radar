"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ReactDOMServer from 'react-dom/server';
import ProgressBar from './TooltipProgressBar';
import styles from '../app/RadarChart.module.css';

const RadarChartD3 = ({ toggleSidebar, isSidebarOpen }) => {
  const svgRef = useRef(null);
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [colors, setColors] = useState([]);
  const [ids, setIds] = useState([]);
  const [isMainTechnology, setIsMainTechnology] = useState([]);
  const [images, setImages] = useState([]);
  const [thsNames, setThsNames] = useState([]);
  const [thsPoints, setThsPoints] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sub-tech data
        const subTechResponse = await axios.get('https://localhost:44307/api/app/sub-teches');
        const subTechItems = subTechResponse.data.items;

        const combinedLabels = [];
        const combinedData = [];
        const combinedColors = [];
        const combinedIds = [];
        const combinedIsMainTechnology = [];
        const combinedImages = [];
        const combinedThsNames = [];
        const combinedThsPoints = [];

        // Fetch details for each sub-tech
        for (const subTech of subTechItems) {
          const detailsResponse = await axios.get(`https://localhost:44307/api/app/sub-teches/${subTech.id}/with-navigation-properties`);
          const details = detailsResponse.data;

          const mainTechnology = details.mainTeches?.[0];
          const mainTechColor = mainTechnology?.color || '#000000';

          combinedLabels.push(subTech.name);
          combinedData.push(24 - (details.radarLayerLevel?.point || 0));
          combinedColors.push(mainTechColor);
          combinedIds.push(subTech.id);
          combinedIsMainTechnology.push(false);

          const imageUrl = subTech.imageId ? `https://localhost:44307/api/files/${subTech.imageId}` : null;
          combinedImages.push(imageUrl);
          combinedThsNames.push(details.effectLevel?.name || 'Unknown');
          combinedThsPoints.push(details.effectLevel?.level || 0);
        }

        setLabels(combinedLabels);
        setData(combinedData);
        setColors(combinedColors);
        setIds(combinedIds);
        setIsMainTechnology(combinedIsMainTechnology);
        setImages(combinedImages);
        setThsNames(combinedThsNames);
        setThsPoints(combinedThsPoints);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length === 0 || labels.length === 0) return;

    const width = 500;
    const height = 750;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const circleTexts = ['Yaygınlaştır', 'Dene', 'Düşün', 'Bekle'];
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append('g')
      .attr('transform', `translate(${(width + margin.left + margin.right) / 2},${(height + margin.top + margin.bottom) / 2})`);

    const defs = svg.append('defs');
    const filter = defs.append('filter')
      .attr('id', 'drop-shadow')
      .attr('x', '-100%')
      .attr('y', '-100%')
      .attr('width', '300%')
      .attr('height', '300%');

    filter.append('feGaussianBlur')
      .attr('in', 'SourceAlpha')
      .attr('stdDeviation', 2)
      .attr('result', 'blur');

    filter.append('feOffset')
      .attr('in', 'blur')
      .attr('dx', 1)
      .attr('dy', 1)
      .attr('result', 'offsetBlur');

    filter.append('feFlood')
      .attr('flood-color', '#dee2e6')
      .attr('result', 'colorBlur');

    filter.append('feComposite')
      .attr('in2', 'offsetBlur')
      .attr('operator', 'in')
      .attr('in', 'colorBlur')
      .attr('result', 'colorBlur');

    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode')
      .attr('in', 'colorBlur');
    feMerge.append('feMergeNode')
      .attr('in', 'SourceGraphic');

    const radialScale = d3.scaleLinear()
      .domain([-6, 24])
      .range([0, width / 2]);

    const angleSlice = Math.PI * 2 / labels.length;
    const labelOffset = 10;

    [-6, 0, 6, 12, 18, 24].forEach((tick, index) => {
      svg.append('circle')
        .attr('r', radialScale(tick))
        .attr('fill', 'none')
        .attr('stroke', '#C0BDC7')
        .attr('stroke-width', 0.5)
        .attr('stroke-opacity', 1)
        .style('filter', 'url(#drop-shadow)');
      if (index > 0) {
        const textY = (radialScale(tick) + radialScale(tick - 6)) / 2;
        svg.append('text')
          .attr('x', 0)
          .attr('y', -textY)
          .attr('dy', '-0.35em')
          .attr('text-anchor', 'middle')
          .style('font-size', '0.8em')
          .style('fill', '#C0BDC7')
          .style('fill-opacity', 1)
          .style('filter', 'url(#drop-shadow)')
          .text(circleTexts[index - 2]);
      }
    });

    labels.forEach((label, i) => {
      const angle = angleSlice * i;
      const x = radialScale(24) * Math.cos(angle - Math.PI / 2);
      const y = radialScale(24) * Math.sin(angle - Math.PI / 2);

      svg.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', x)
        .attr('y2', y)
        .attr('stroke', 'rgba(0, 0, 0, 0)');

      const rotation = (angle * 180 / Math.PI) - 90 + (i >= labels.length / 2 ? 180 : 0);
      const labelX = (radialScale(24) + labelOffset) * Math.cos(angle - Math.PI / 2);
      const labelY = (radialScale(24) + labelOffset) * Math.sin(angle - Math.PI / 2);

      svg.append('text')
        .attr('x', labelX)
        .attr('y', labelY)
        .attr('dy', '0.35em')
        .attr('text-anchor', labelX < 0 ? 'end' : 'start')
        .attr('transform', `rotate(${rotation}, ${labelX}, ${labelY})`)
        .style('font-size', '0.8em')
        .style('fill', colors[i])
        .style('filter', 'url(#drop-shadow)')
        .text(label)
        .style('cursor', ids[i] ? 'pointer' : 'default')
        .on('click', () => {
          if (ids[i]) {
            if (!isSidebarOpen) toggleSidebar();
            setTimeout(() => router.push(`/solutions/${ids[i]}`), 300);
          }
        });
    });

    // Tooltip setup
    const tooltip = d3.select('body').append('div')
      .attr('class', styles.tooltip)
      .style('visibility', 'hidden');

    const createTooltipContent = (label, image, thsName, color, percentage) => `
        <img src="${image}" alt="${label}" style="width: 100%; height: auto;"/>
        <h4 style="color: ${color};">${label}</h4>
        <p style="color: ${color};">${thsName}</p>
        ${ReactDOMServer.renderToString(<ProgressBar blogPoint={percentage} color={color} />)}
      `;

    data.forEach((d, i) => {
      if (d === null) return;
      const angle = angleSlice * i;
      const x = radialScale(d) * Math.cos(angle - Math.PI / 2);
      const y = radialScale(d) * Math.sin(angle - Math.PI / 2);

      svg.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', x)
        .attr('y2', y)
        .attr('stroke', 'rgba(0, 0, 0, 0)');

      svg.append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 5)
        .attr('fill', colors[i])
        .attr('fill-opacity', 0.7)
        .style('filter', 'url(#drop-shadow)')
        .style('cursor', ids[i] ? 'pointer' : 'default')
        .on('click', () => {
          if (ids[i]) {
            if (!isSidebarOpen) toggleSidebar();
            setTimeout(() => router.push(`/solutions/${ids[i]}`), 300);
          }
        })
        .on('mouseover', () => {
          const tooltipData = { title: labels[i], image: images[i] || 'https://via.placeholder.com/50', thsName: thsNames[i], color: colors[i], percentage: thsPoints[i] };
          tooltip.html(createTooltipContent(tooltipData.title, tooltipData.image, tooltipData.thsName, tooltipData.color, tooltipData.percentage))
            .style('border-color', tooltipData.color)
            .style('visibility', 'visible');
        })
        .on('mousemove', (event) => tooltip.style('top', `${event.pageY - 10}px`).style('left', `${event.pageX + 10}px`))
        .on('mouseout', () => tooltip.style('visibility', 'hidden'));
    });
  }, [data, labels, colors, ids, images, thsNames, thsPoints, router, isSidebarOpen, toggleSidebar]);

  return <svg ref={svgRef} className={`${styles.chart} h-full w-full`}></svg>;
};

export default RadarChartD3;
