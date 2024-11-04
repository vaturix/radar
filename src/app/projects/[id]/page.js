"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:1337/api/projects/${id}?populate=solution,image`);
          setProject(response.data.data);
        } catch (error) {
          console.error('Error fetching project:', error);
        }
      }
    };

    fetchProject();
  }, [id]);

  if (!project) return <div>Loading...</div>;

  const imageUrls = project.attributes.image?.data?.map(img => ({
    original: `http://localhost:1337${img.attributes.url}`
  })) || [];


  return (
    <div className="p-8 max-w-screen-lg mx-auto">
      <h2 className="text-sm text-gray-500 mb-2">
        {project.attributes.solution?.data?.attributes?.title || 'No Solution'}
      </h2>
      <h1 className="text-3xl font-bold mb-4">{project.attributes.title}</h1>
      {imageUrls.map((img, index) => (
        <div key={index} className="mb-4 w-full relative" style={{ paddingTop: '56.25%' }}>
          <img
            src={img.original}
            alt={project.attributes.title}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      ))}
      <p className="text-lg mb-4">{project.attributes.text}</p>
      <Link href="/projects">
        <span className="text-blue-500 hover:underline">Back to Projects</span>
      </Link>
    </div>
  );
}
