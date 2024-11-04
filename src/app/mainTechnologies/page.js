"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function MainTechnologiesPage() {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/main-technologies?populate=image');
        // Verileri alfabetik olarak sırala
        const sortedTechnologies = response.data.data.sort((a, b) => 
          a.attributes.title.localeCompare(b.attributes.title)
        );
        setTechnologies(sortedTechnologies);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTechnologies();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Ana Teknolojiler</h1>
      <ul className="space-y-4">
        {technologies.map((tech, index) => {
          const imageUrls = tech.attributes.image?.data?.map(img => ({
            original: `http://localhost:1337${img.attributes.url}`
          })) || [];

          console.log(`Image URLs for ${tech.attributes.title}:`, imageUrls); // Debug log

          return (
            <li key={tech.id}>
              <Link href={`/mainTechnologies/${tech.id}`}>
                <span className="flex flex-col items-center bg-white border rounded-lg shadow-xl md:flex-row md:max-w-2xl lg:max-w-4xl hover:bg-gray-100" style={{ borderColor: tech.attributes.color }}>
                  {imageUrls.length > 0 ? (
                    imageUrls.map((img, idx) => (
                      <img
                        key={idx}
                        className="object-cover w-full aspect-[16/9] rounded-t-lg md:w-64 md:rounded-none md:rounded-s-lg"
                        src={img.original}
                        alt={tech.attributes.title}
                      />
                    ))
                  ) : (
                    <img
                      className="object-cover w-full aspect-[16/9] rounded-t-lg md:w-64 md:rounded-none md:rounded-s-lg"
                      src="/docs/images/blog/image-4.jpg" // Default image if none is provided
                      alt={tech.attributes.title}
                    />
                  )}
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className=" text-2xl font-bold tracking-tight" style={{ color: tech.attributes.color }}>{tech.attributes.title}</h5>
                   
                  </div>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
