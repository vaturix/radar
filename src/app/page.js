"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ButtonGroup from '../components/ButtonGroup';
import axios from 'axios';
import { FileText } from 'lucide-react';

export default function Home() {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/home?populate=image,report');
        setHomeData(response.data.data.attributes);
      } catch (error) {
        console.error("Error fetching home data:", error);
      }
    };

    fetchHomeData();
  }, []);

  if (!homeData) return <p>Loading...</p>;

  // Resim URL'lerini al
  const imageUrls = homeData.image?.data?.map(img => ({
    original: `http://localhost:1337${img.attributes.url}`
  })) || [];

  // Report URL'lerini al
  const reportUrls = homeData.report?.data?.map(rep => ({
    original: `http://localhost:1337${rep.attributes.url}`
  })) || [];

  const handleOpenInNewTab = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col items-center gap-10 p-3">
      <div className="mx-auto lg:mx-0">
        <h2 className="text-4xl font-bold tracking-tight text-black sm:text-6xl text-center">
          {homeData.title}
        </h2>
        <p className="mt-6 mx-3 text-lg leading-8 text-gray-600">
          {homeData.definition}
        </p>
      </div>

      {imageUrls.map((img, index) => (
        <div key={index} className="mb-4 w-full relative" style={{ paddingTop: '56.25%' }}>
          <img
            src={img.original}
            alt="anasayfa"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      ))}

      <ButtonGroup />

      <p className="text-center text-lg">
        {homeData.text}
      </p>
      
      {reportUrls.map((rep, index) => (
        <div key={index} className="flex justify-center mt-4">
          <button 
            onClick={() => handleOpenInNewTab(rep.original)} 
            className="flex items-center justify-center bg-white text-lg py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 border"
            style={{ borderColor: '#1D4ED8', color: '#1D4ED8' }}>
            <FileText className="mr-2" />
            Akıllı Şehir Güncel Teknoloji Eğilimleri Raporu</button>
        </div>
      ))}
    </div>
  );
}
