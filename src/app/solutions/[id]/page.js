"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import axios from "axios";
import { marked } from "marked";
import { FileText } from "lucide-react";

// Customize the marked renderer
const renderer = new marked.Renderer();
renderer.em = (text) => `<del>${text}</del>`;

export default function SolutionDetailPage() {
  const { id } = useParams();
  const [solution, setSolution] = useState(null);
  const [mainTechnology, setMainTechnology] = useState(null);
  const [radarLayer, setRadarLayer] = useState(null);

  useEffect(() => {
    const fetchSolution = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`https://localhost:44307/api/app/sub-teches/${id}?populate=mainTeches,radarLayerLevel,image,report`);
        const solutionData = response.data;
        console.log("Solution Data:", solutionData); // Debug output
        setSolution(solutionData);

        // Fetch main technology data
        const mainTechId = solutionData.mainTeches[0].id; // Assuming `mainTeches` is an array and we're interested in the first item
        const mainTechResponse = await axios.get(`https://localhost:44307/api/app/main-teches/${mainTechId}`);
        setMainTechnology(mainTechResponse.data);

        // Fetch radar layer level data
        const radarLayerId = solutionData.radarLayerLevel.id;
        const radarLayerResponse = await axios.get(`https://localhost:44307/api/app/radar-layer-levels/${radarLayerId}`);
        setRadarLayer(radarLayerResponse.data.items[0]); // Accessing the first item as per structure
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSolution();
  }, [id]);

  if (!solution || !mainTechnology || !radarLayer) return <p>Loading...</p>;

  // Get image URLs
  const imageUrls = solution.imageId
    ? [`https://localhost:44307/path/to/image/${solution.imageId}`]
    : ["/docs/images/blog/image-4.jpg"]; // Default image if none is provided

  // Get report URLs
  const reportUrls = solution.reportId
    ? [`https://localhost:44307/path/to/report/${solution.reportId}`]
    : [];

  // Convert Markdown to HTML
  const markdownText = solution.description;
  const htmlContent = marked(markdownText, { renderer });

  const handleOpenInNewTab = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="p-4">
      <h2 className="text-sm font-medium mb-1" style={{ color: mainTechnology.color }}>
        {mainTechnology.name}
      </h2>
      <h1 className="text-2xl font-bold mb-4">{solution.name}</h1>

      {imageUrls.map((img, index) => (
        <div key={index} className="mb-5 w-full aspect-w-16 aspect-h-9">
          <img
            src={img}
            alt={solution.name}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      ))}

      <ProgressBar
        blogPoint={radarLayer.point}
        thsName={radarLayer.name}
        color={mainTechnology.color}
      />

      <div className="rich-text p-4 mb-5 text-xl" dangerouslySetInnerHTML={{ __html: htmlContent }}></div>

      {reportUrls.map((rep, index) => (
        <div key={index} className="flex justify-center">
          <button
            onClick={() => handleOpenInNewTab(rep)}
            className="flex items-center justify-center bg-white text-lg py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 border"
            style={{ borderColor: mainTechnology.color, color: mainTechnology.color }}
          >
            <FileText className="mr-2" />
            Raporu İndir
          </button>
        </div>
      ))}
    </div>
  );
}
