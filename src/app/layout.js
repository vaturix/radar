"use client";

import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '../components/Header';
import { VerticalNavbar } from '../components/VerticalNavbar';
import { MainNavbar } from '../components/MainNavbar'; // MainNavbar bileşenini import ettik
import ZoomWrapper from '../components/ZoomWrapper';
import dynamic from "next/dynamic";
import React, { useState, useEffect } from 'react'; // useEffect'i React'tan import ettik

const RadarChart = dynamic(() => import("../components/RadarChartD3"), { ssr: false });

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    window.addEventListener('resize', handleResize);

    handleResize(); // Başlangıçta ekran genişliğini kontrol et

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer) {
      chartContainer.style.width = isSidebarOpen ? '55vw' : '100vw';
    }
  }, [isSidebarOpen]);

  return (
    <html lang="en">
      <head>
        <title>Akıllı Şehirler Portalı</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/lib/img/favicon.png" /> {/* Favicon dosyasını buraya ekleyin */}
      </head>
      <body className={`${inter.className} flex m-2 flex-col h-screen bg-gray-100`}>
        <div className="w-full mx-auto m-1">
          <MainNavbar />
        </div>
        <div className="flex flex-grow overflow-hidden">
          <div className={`transition-all duration-100 transform ${isSidebarOpen ? (isMobile ? 'w-full' : 'w-2/5 ms-1 me-2 mt-2 p-8') : (isMobile ? 'w-0' : '-translate-x-full w-0')} h-full bg-gray-200 rounded-xl shadow-2xl flex flex-col overflow-y-auto`}>
            {isSidebarOpen && (
              <>
                <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
                <div className="mt-4 flex-grow overflow-y-auto">
                  {children}
                </div>
              </>
            )}
          </div>
          <div className={`transition-all duration-100 transform ${isSidebarOpen ? (isMobile ? 'w-0' : 'w-3/5 ms-2 me-1 mt-2 p-8') : 'w-full'} h-full bg-gray-200 rounded-xl shadow-xl flex justify-center items-center`}>
            <ZoomWrapper>
              <RadarChart toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
            </ZoomWrapper>
          </div>
          {!isSidebarOpen && !isMobile && <VerticalNavbar toggleSidebar={toggleSidebar} />}
          {isMobile && !isSidebarOpen && <VerticalNavbar toggleSidebar={toggleSidebar} />}
        </div>
      </body>
    </html>
  );
}
