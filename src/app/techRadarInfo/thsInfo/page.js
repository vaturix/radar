"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MainTechnologiesPage() {
  const [technologies, setTechnologies] = useState([]);
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/radar-duezey-segmentis');
        const orderedSegmentNames = ["Bekle", "Düşün", "Dene", "Benimse/Yaygınlaştır"];
        const sortedSegments = response.data.data.sort((a, b) => 
          orderedSegmentNames.indexOf(a.attributes.radarSegmentName) - orderedSegmentNames.indexOf(b.attributes.radarSegmentName)
        );
        setSegments(sortedSegments);
      } catch (error) {
        console.error("Error fetching segments:", error);
      }
    };

    const fetchTechnologies = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/teknoloji-hazirlik-duezeyis');
        // Verileri alfabetik olarak sırala
        const sortedTechnologies = response.data.data.sort((a, b) => 
          a.attributes.thsName.localeCompare(b.attributes.thsName)
        );
        setTechnologies(sortedTechnologies);
      } catch (error) {
        console.error("Error fetching technologies:", error);
      }
    };

    fetchSegments();
    fetchTechnologies();
  }, []);

  // Teknolojileri segmentlere göre gruplayın
  const groupedTechnologies = segments.map((segment) => ({
    ...segment,
    technologies: technologies.filter((tech) => {
      if (segment.attributes.radarSegmentName === "Bekle") {
        return tech.attributes.radarPoint <= 6;
      } else if (segment.attributes.radarSegmentName === "Düşün") {
        return tech.attributes.radarPoint > 6 && tech.attributes.radarPoint <= 12;
      } else if (segment.attributes.radarSegmentName === "Dene") {
        return tech.attributes.radarPoint > 12 && tech.attributes.radarPoint <= 18;
      } else if (segment.attributes.radarSegmentName === "Benimse/Yaygınlaştır") {
        return tech.attributes.radarPoint > 18;
      }
      return false;
    })
  }));

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Teknoloji Hazırlık Düzeyleri</h1>
      {groupedTechnologies.map((segment) => (
        <div key={segment.id} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{segment.attributes.radarSegmentName}</h2>
          <ul className="space-y-4">
            {segment.technologies.map((tech) => (
              <li key={tech.id}>
                <div className="flex flex-col items-center bg-white border rounded-lg shadow-xl md:flex-row md:max-w-2xl lg:max-w-4xl hover:bg-gray-100 p-4">
                  <div className="flex flex-col justify-between leading-normal">
                    <h5 className="text-2xl font-bold tracking-tight" style={{ color: '#000' }}>{tech.attributes.thsName}</h5>
                    <p className="text-gray-700 text-lg">{tech.attributes.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
