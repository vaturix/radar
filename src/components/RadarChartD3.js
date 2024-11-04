"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ReactDOMServer from 'react-dom/server'; // Import ReactDOMServer
import ProgressBar from './TooltipProgressBar'; // Import the ProgressBar component
import styles from '../app/RadarChart.module.css';

const RadarChartD3 = ({ toggleSidebar, isSidebarOpen }) => {
  const svgRef = useRef(null);
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [colors, setColors] = useState([]);
  const [ids, setIds] = useState([]);
  const [isMainTechnology, setIsMainTechnology] = useState([]);
  const [images, setImages] = useState([]);  // New state for images
  const [thsNames, setThsNames] = useState([]);  // New state for THS names
  const [thsPoints, setThsPoints] = useState([]);  // New state for THS points
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const technologiesResponse = await axios.get('http://localhost:1337/api/main-technologies');
        const technologies = technologiesResponse.data.data;

        const solutionsResponse = await axios.get('http://localhost:1337/api/solutions?populate=main_technology,teknoloji_hazirlik_duezeyi,image');
        const solutions = solutionsResponse.data.data;

        const combinedLabels = [];
        const combinedData = [];
        const combinedColors = [];
        const combinedIds = [];
        const combinedIsMainTechnology = [];
        const combinedImages = [];  // New array for images
        const combinedThsNames = [];  // New array for THS names
        const combinedThsPoints = [];  // New array for THS points

        technologies.forEach(tech => {
          combinedLabels.push(tech.attributes.title);
          combinedData.push(null);
          combinedColors.push('#000000');
          combinedIds.push(tech.id);
          combinedIsMainTechnology.push(true);
          combinedImages.push(null);  // No image for main technologies
          combinedThsNames.push(null);  // No THS name for main technologies
          combinedThsPoints.push(null);  // No THS points for main technologies

          solutions.forEach(solution => {
            if (solution.attributes.main_technology.data.id === tech.id) {
              combinedLabels.push(solution.attributes.title);
              const radarPoint = solution.attributes.teknoloji_hazirlik_duezeyi.data?.attributes.radarPoint || 0;
              combinedData.push(24 - radarPoint);
              combinedColors.push(tech.attributes.color || '#000000');
              combinedIds.push(solution.id);
              combinedIsMainTechnology.push(false);
              const imageUrl = solution.attributes.image?.data?.[0]?.attributes?.url ? `http://localhost:1337${solution.attributes.image.data[0].attributes.url}` : null;
              combinedImages.push(imageUrl);
              combinedThsNames.push(solution.attributes.teknoloji_hazirlik_duezeyi.data?.attributes?.thsName || 'Unknown');
              combinedThsPoints.push(solution.attributes.teknoloji_hazirlik_duezeyi.data?.attributes?.blogPoint || 0);
            }
          });
        });

        setLabels(combinedLabels);
        setData(combinedData);
        setColors(combinedColors);
        setIds(combinedIds);
        setIsMainTechnology(combinedIsMainTechnology);
        setImages(combinedImages);  // Set images
        setThsNames(combinedThsNames);  // Set THS names
        setThsPoints(combinedThsPoints);  // Set THS points
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
            if (!isSidebarOpen) {
              toggleSidebar();
            }
            setTimeout(() => {
              router.push(isMainTechnology[i] ? `/mainTechnologies/${ids[i]}` : `/solutions/${ids[i]}`);
            }, 300);
          }
        });

      svg.selectAll('text').each(function () {
        const textElement = d3.select(this);
        const computedFontSize = parseFloat(window.getComputedStyle(this).fontSize);
        if (computedFontSize > 10) {
          textElement.style('font-size', '10px');
        }
      });
    });

    // Create a tooltip element
    const tooltip = d3.select('body').append('div')
      .attr('class', styles.tooltip)
      .style('visibility', 'hidden');

    // Function to create the content of the tooltip
    const createTooltipContent = (label, image, thsName, color, percentage) => {
      return `
        <img src="${image}" alt="${label}" style="width: 100%; height: auto;"/>
        <h4 style="color: ${color};">${label}</h4>
        <p style="color: ${color};">${thsName}</p>
        ${ReactDOMServer.renderToString(<ProgressBar blogPoint={percentage} color={color} />)}
      `;
    };

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

      const xOuter = radialScale(24) * Math.cos(angle - Math.PI / 2);
      const yOuter = radialScale(24) * Math.sin(angle - Math.PI / 2);

      svg.append('line')
        .attr('x1', x)
        .attr('y1', y)
        .attr('x2', xOuter)
        .attr('y2', yOuter)
        .attr('stroke', colors[i])
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '0.5 , 3')
        .attr('stroke-linecap', 'round')
        .attr('stroke-opacity', 0.3);

      svg.append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 10)
        .attr('fill', 'white')
        .attr('fill-opacity', 0.2)
        .style('filter', 'url(#drop-shadow)');

      const point = svg.append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 5)
        .attr('fill', colors[i])
        .attr('fill-opacity', 0.7)
        .attr('stroke-width', 1)
        .style('filter', 'url(#drop-shadow)')
        .style('cursor', ids[i] ? 'pointer' : 'default')
        .on('click', () => {
          if (ids[i]) {
            if (!isSidebarOpen) {
              toggleSidebar();
            }
            setTimeout(() => {
              router.push(`/solutions/${ids[i]}`);
            }, 300);
          }
        })
        .on('mouseover', function (event) {
          const tooltipData = {
            title: labels[i],
            image: images[i] || 'https://via.placeholder.com/50',  // Use actual image URL or placeholder
            thsName: thsNames[i],
            color: colors[i],
            percentage: thsPoints[i]
          };
          tooltip.html(createTooltipContent(tooltipData.title, tooltipData.image, tooltipData.thsName, tooltipData.color, tooltipData.percentage))
            .style('border-color', tooltipData.color) // Set border color
            .style('visibility', 'visible');
        })
        .on('mousemove', function (event) {
          tooltip.style('top', (event.pageY - 10) + 'px')
            .style('left', (event.pageX + 10) + 'px');
        })
        .on('mouseout', function () {
          tooltip.style('visibility', 'hidden');
        });
    });

  }, [data, labels, colors, ids, images, thsNames, thsPoints, router, isSidebarOpen, toggleSidebar]);

  return <svg ref={svgRef} className={`${styles.chart} h-full w-full`}></svg>;
};

export default RadarChartD3;
