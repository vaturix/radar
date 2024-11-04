"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProgressBar from '@/components/ProgressBar';
import axios from 'axios';
import { marked } from 'marked';
import { FileText } from 'lucide-react';

// Marked renderer'ı özelleştirin
const renderer = new marked.Renderer();
renderer.em = (text) => `<del>${text}</del>`;

export default function SolutionDetailPage() {
  const { id } = useParams();
  const [solution, setSolution] = useState(null);
  const [mainTechnology, setMainTechnology] = useState(null);
  const [techReadiness, setTechReadiness] = useState(null);

  useEffect(() => {
    const fetchSolution = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`http://localhost:1337/api/solutions/${id}?populate=main_technology,teknoloji_hazirlik_duezeyi,image,report`);
        const solutionData = response.data.data;
        console.log("Solution Data:", solutionData); // Hata ayıklama çıktısı
        setSolution(solutionData);

        const mainTechId = solutionData.attributes.main_technology.data.id;
        const mainTechResponse = await axios.get(`http://localhost:1337/api/main-technologies/${mainTechId}`);
        setMainTechnology(mainTechResponse.data.data);

        const techReadinessId = solutionData.attributes.teknoloji_hazirlik_duezeyi.data.id;
        const techReadinessResponse = await axios.get(`http://localhost:1337/api/teknoloji-hazirlik-duezeyis/${techReadinessId}`);
        setTechReadiness(techReadinessResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSolution();
  }, [id]);

  if (!solution || !mainTechnology || !techReadiness) return <p>Loading...</p>;

  // Resim URL'lerini al
  const imageUrls = solution.attributes.image?.data?.map(img => ({
    original: `http://localhost:1337${img.attributes.url}`
  })) || [];

  // Report URL'lerini al
  const reportUrls = solution.attributes.report?.data?.map(rep => ({
    original: `http://localhost:1337${rep.attributes.url}`
  })) || [];

  // Markdown'u HTML'e dönüştür
  const markdownText = solution.attributes.text;
  const htmlContent = marked(markdownText, { renderer });

  const handleOpenInNewTab = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="p-4">
      <h2 className="text-sm font-medium mb-1" style={{ color: mainTechnology.attributes.color }}>
        {mainTechnology.attributes.title}
      </h2>
      <h1 className="text-2xl font-bold mb-4">{solution.attributes.title}</h1>
      
      {imageUrls.map((img, index) => (
        <div key={index} className="mb-5 w-full aspect-w-16 aspect-h-9">
          <img
            src={img.original}
            alt={solution.attributes.title}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      ))}

      <ProgressBar blogPoint={techReadiness.attributes.blogPoint} thsName={techReadiness.attributes.thsName} color={mainTechnology.attributes.color} />

      <div className="rich-text p-4 mb-5 text-xl" dangerouslySetInnerHTML={{ __html: htmlContent }}></div> {/* HTML içeriğini render et */}
      
      {reportUrls.map((rep, index) => (
        <div key={index} className="flex justify-center">
          <button 
            onClick={() => handleOpenInNewTab(rep.original)} 
            className="flex items-center justify-center bg-white text-lg py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 border"
            style={{ borderColor: mainTechnology.attributes.color, color: mainTechnology.attributes.color }}>
            <FileText className="mr-2" />
            Raporu İndir
          </button>
        </div>
      ))}
    </div>
  );
}
