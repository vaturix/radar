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
        console.log("API Yanıtı:", response.data); // Yanıtı kontrol ediyoruz
        // Teknolojileri isme göre alfabetik sırayla düzenleyin
        const sortedTechnologies = response.data.items.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setTechnologies(sortedTechnologies);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchTechnologies();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Ana Teknolojiler</h1>
      <ul className="space-y-4">
        {technologies.map((tech) => (
          <li key={tech.id}>
            <Link href={`/mainTechnologies/${tech.id}`}>
              <span className="text-xl font-semibold hover:text-blue-500 cursor-pointer">
                {tech.name || "İsim Bulunamadı"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
