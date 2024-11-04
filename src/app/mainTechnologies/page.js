"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function MainTechnologiesPage() {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const response = await axios.get("https://localhost:44307/api/app/main-teches");
        // Sort technologies alphabetically by name
        const sortedTechnologies = response.data.items.sort((a, b) =>
          a.name.localeCompare(b.name)
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
          const imageUrl = tech.imageId
            ? `http://localhost:1337/path/to/image/${tech.imageId}` // Adjust this URL based on your backend image serving
            : "/docs/images/blog/image-4.jpg"; // Default image if none is provided

          return (
            <li key={tech.id}>
              <Link href={`/mainTechnologies/${tech.id}`}>
                <span
                  className="flex flex-col items-center bg-white border rounded-lg shadow-xl md:flex-row md:max-w-2xl lg:max-w-4xl hover:bg-gray-100"
                  style={{ borderColor: tech.color }} // Assuming color is added manually or from another source
                >
                  <img
                    className="object-cover w-full aspect-[16/9] rounded-t-lg md:w-64 md:rounded-none md:rounded-s-lg"
                    src={imageUrl}
                    alt={tech.name}
                  />
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="text-2xl font-bold tracking-tight" style={{ color: tech.color }}>
                      {tech.name}
                    </h5>
                    <p className="mt-2">{tech.brief}</p> {/* Display brief information if needed */}
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
