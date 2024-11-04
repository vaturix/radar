"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { FileText } from "lucide-react";

export default function TechnologyDetailPage() {
  const { id } = useParams();
  const [technology, setTechnology] = useState(null);
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    const fetchTechnology = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`http://localhost:1337/api/main-technologies/${id}`);
        setTechnology(response.data.data);
      } catch (error) {
        console.error("Error fetching technology:", error);
      }
    };

    const fetchSolutions = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`http://localhost:1337/api/solutions?filters[main_technology][id][$eq]=${id}`);
        const sortedSolutions = response.data.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setSolutions(sortedSolutions);
      } catch (error) {
        console.error("Error fetching solutions:", error);
      }
    };

    fetchTechnology();
    fetchSolutions();
  }, [id]);

  if (!technology) return <p>Loading...</p>;

  // Adjust URLs for images and reports based on `imageId` and `reportId`
  const imageUrl = technology.imageId
    ? `http://localhost:1337/path/to/image/${technology.imageId}`
    : "/docs/images/blog/image-4.jpg"; // Default image if none is provided

  const reportUrl = technology.reportId
    ? `http://localhost:1337/path/to/report/${technology.reportId}`
    : null; // Set report URL if provided

  const handleOpenInNewTab = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="p-8 max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4" style={{ color: technology.color }}>
        {technology.name}
      </h1>
      <div className="mb-4 w-full relative" style={{ paddingTop: "56.25%" }}>
        <img
          src={imageUrl}
          alt={technology.name}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>
      <p>{technology.description}</p>

      {reportUrl && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handleOpenInNewTab(reportUrl)}
            className="flex items-center justify-center bg-white text-lg py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 border"
            style={{ borderColor: technology.color, color: technology.color }}
          >
            <FileText className="mr-2" />
            Raporu İndir
          </button>
        </div>
      )}

      <h2 className="text-xl font-semibold mt-8 mb-4" style={{ color: technology.color }}>
        Çözümler
      </h2>
      <ul className="space-y-4">
        {solutions.map((solution, index) => (
          <li key={solution.id} className="bg-gray-100 rounded-lg shadow p-4">
            <Link href={`/solutions/${solution.id}`}>
              <span className="text-lg font-semibold hover:underline" style={{ color: technology.color }}>
                {index + 1}. {solution.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
