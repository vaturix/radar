"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/projects?populate=solution');
        setProjects(response.data.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project.id} className="bg-gray-100 rounded-lg shadow p-4">
            <h2 className="text-xl font-bold mb-2">
              {project.attributes.solution?.data?.attributes?.title || 'No Solution'}
            </h2>
            <Link href={`/projects/${project.id}`}>
              <span className="text-lg font-semibold hover:underline">
                {project.id}. {project.attributes.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
