"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function SolutionsPage() {
  const [technologies, setTechnologies] = useState([]);
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    const fetchTechnologiesAndSolutions = async () => {
      try {
        // Fetch main technologies
        const technologiesResponse = await axios.get("https://localhost:44307/api/app/main-teches");
        const sortedTechnologies = technologiesResponse.data.items.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        setTechnologies(sortedTechnologies);

        // Fetch solutions (sub-technologies)
        const solutionsResponse = await axios.get("https://localhost:44307/api/app/sub-teches");
        setSolutions(solutionsResponse.data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTechnologiesAndSolutions();
  }, []);

  // Group solutions by technology
  const getSolutionsByTechnology = (techId) => {
    return solutions
      .filter((solution) => solution.subTech.id === techId)
      .sort((a, b) => {
        if (a.subTech.name < b.subTech.name) return -1;
        if (a.subTech.name > b.subTech.name) return 1;
        return 0;
      });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Teknolojiler</h1>
      {technologies.map((tech, techIndex) => (
        <div key={tech.id} className="mb-8">
          <h2 className="text-xl font-semibold mb-4" style={{ color: tech.color }}>
            {techIndex + 1}. {tech.name}
          </h2>
          <ul className="space-y-4">
            {getSolutionsByTechnology(tech.id).map((solution, solIndex) => (
              <Link key={solution.subTech.id} href={`/solutions/${solution.subTech.id}`} passHref>
                <li className="bg-gray-100 mb-2 rounded-lg shadow p-4 cursor-pointer hover:bg-gray-200">
                  <span className="text-lg font-semibold">
                    {solIndex + 1}. {solution.subTech.name}
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
