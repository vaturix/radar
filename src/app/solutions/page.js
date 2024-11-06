"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function SolutionsPage() {
  const [technologies, setTechnologies] = useState([]);
  const [solutionsMap, setSolutionsMap] = useState({});

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

        // Fetch all sub-technologies
        const solutionsResponse = await axios.get("https://localhost:44307/api/app/sub-teches");
        const solutions = solutionsResponse.data.items;

        // Initialize the map to group sub-technologies by main technology
        const subTechMap = {};

        for (const solution of solutions) {
          // Ensure solution.subTech and solution.subTech.id are defined
          if (!solution.subTech || !solution.subTech.id) {
            console.error("Sub-tech ID is undefined for solution:", solution);
            continue; // Skip this entry if subTech or subTech.id is undefined
          }

          try {
            // Fetch main technology details for each sub-technology
            const detailsResponse = await axios.get(
              `https://localhost:44307/api/app/sub-teches/${solution.subTech.id}/with-navigation-properties`
            );

            const mainTechId = detailsResponse.data.mainTeches?.[0]?.id;

            // Only add to the map if a valid main technology ID is found
            if (mainTechId) {
              if (!subTechMap[mainTechId]) {
                subTechMap[mainTechId] = [];
              }
              subTechMap[mainTechId].push({
                id: solution.subTech.id,
                name: solution.subTech.name,
                ...solution,
              });
            } else {
              console.warn("Main technology ID not found for sub-tech:", solution);
            }
          } catch (error) {
            console.error(`Error fetching details for sub-tech with ID ${solution.subTech.id}:`, error);
          }
        }

        setSolutionsMap(subTechMap);

        // Debug logs to verify data structure
        console.log("Main Technologies:", sortedTechnologies);
        console.log("Solutions Map by Main Tech:", subTechMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTechnologiesAndSolutions();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Teknolojiler ve Çözümler</h1>
      {technologies.map((tech, techIndex) => (
        <div key={tech.id} className="mb-8">
          <h2 className="text-xl font-semibold mb-4" style={{ color: tech.color }}>
            {techIndex + 1}. {tech.name}
          </h2>
          <ul className="space-y-4">
            {(solutionsMap[tech.id] || []).map((solution, solIndex) => (
              <Link key={solution.id} href={`/solutions/${solution.id}`} passHref>
                <li className="bg-gray-100 mb-2 rounded-lg shadow p-4 cursor-pointer hover:bg-gray-200">
                  <span className="text-lg font-semibold">
                    {solIndex + 1}. {solution.name}
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
