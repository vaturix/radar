"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { FileText } from 'lucide-react';

export default function TechnologyDetailPage() {
  const { id } = useParams();
  const [technology, setTechnology] = useState(null);
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    const fetchTechnology = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`http://localhost:1337/api/main-technologies/${id}?populate=image,report`);
        setTechnology(response.data.data);
      } catch (error) {
        console.error("Error fetching technology:", error);
      }
    };

    const fetchSolutions = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`http://localhost:1337/api/solutions?filters[main_technology][id][$eq]=${id}`);
        const sortedSolutions = response.data.data.sort((a, b) => {
          if (a.attributes.title < b.attributes.title) return -1;
          if (a.attributes.title > b.attributes.title) return 1;
          return 0;
        });
        setSolutions(sortedSolutions);
      } catch (error) {
        console.error("Error fetching solutions:", error);
      }
    };

    fetchTechnology();
    fetchSolutions();
  }, [id]);

  if (!technology) return <p>Loading...</p>;

  const imageUrls = technology.attributes.image?.data?.map(img => ({
    original: `http://localhost:1337${img.attributes.url}`
  })) || [];

  // Report URL'lerini al
  const reportUrls = technology.attributes.report?.data?.map(rep => ({
    original: `http://localhost:1337${rep.attributes.url}`
  })) || [];

  const handleOpenInNewTab = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="p-8 max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4" style={{ color: technology.attributes.color }}>
        {technology.attributes.title}
      </h1>
      {imageUrls.map((img, index) => (
        <div key={index} className="mb-4 w-full relative" style={{ paddingTop: '56.25%' }}>
          <img
            src={img.original}
            alt={technology.attributes.title}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      ))}
      <p>{technology.attributes.text}</p>

      {reportUrls.map((rep, index) => (
        <div key={index} className="flex justify-center mt-4">
          <button 
            onClick={() => handleOpenInNewTab(rep.original)} 
            className="flex items-center justify-center bg-white text-lg py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 border"
            style={{ borderColor: technology.attributes.color, color: technology.attributes.color }}>
            <FileText className="mr-2" />
            Raporu İndir
          </button>
        </div>
      ))}

      <h2 className="text-xl font-semibold mt-8 mb-4" style={{ color: technology.attributes.color }}>Çözümler</h2>
      <ul className="space-y-4">
        {solutions.map((solution, index) => (
          <li key={solution.id} className="bg-gray-100 rounded-lg shadow p-4">
            <Link href={`/solutions/${solution.id}`}>
              <span className="text-lg font-semibold hover:underline" style={{ color: technology.attributes.color }}>
                {index + 1}. {solution.attributes.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
