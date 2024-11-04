"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function SolutionsPage() {
  const [technologies, setTechnologies] = useState([]);
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    const fetchTechnologiesAndSolutions = async () => {
      try {
        const technologiesResponse = await axios.get('http://localhost:1337/api/main-technologies');
        const sortedTechnologies = technologiesResponse.data.data.sort((a, b) => {
          if (a.attributes.title < b.attributes.title) return -1;
          if (a.attributes.title > b.attributes.title) return 1;
          return 0;
        });
        setTechnologies(sortedTechnologies);

        const solutionsResponse = await axios.get('http://localhost:1337/api/solutions?populate=main_technology');
        setSolutions(solutionsResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTechnologiesAndSolutions();
  }, []);

  const getSolutionsByTechnology = (techId) => {
    return solutions
      .filter(solution => solution.attributes.main_technology.data.id === techId)
      .sort((a, b) => {
        if (a.attributes.title < b.attributes.title) return -1;
        if (a.attributes.title > b.attributes.title) return 1;
        return 0;
      });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Teknolojiler</h1>
      {technologies.map((tech, techIndex) => (
        <div key={tech.id} className="mb-8">
          <h2 className="text-xl font-semibold mb-4" style={{ color: tech.attributes.color }}>
            {techIndex + 1}. {tech.attributes.title}
          </h2>
          <ul className="space-y-4">
            {getSolutionsByTechnology(tech.id).map((solution, solIndex) => (
              <Link key={solution.id} href={`/solutions/${solution.id}`} passHref>
                <li className="bg-gray-100 mb-2 rounded-lg shadow p-4 cursor-pointer hover:bg-gray-200">
                  <span className="text-lg font-semibold">
                    {solIndex + 1}. {solution.attributes.title}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
