"use client";

import { usePathname } from "next/navigation";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Template({ children }) {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(segment => segment);

    const [mainTechnology, setMainTechnology] = useState(null);
    const [solution, setSolution] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (pathSegments[0] === 'solutions' && pathSegments[1]) {
                try {
                    const solutionId = pathSegments[1];
                    const solutionResponse = await axios.get(`http://localhost:1337/api/solutions/${solutionId}?populate=main_technology`);
                    const solutionData = solutionResponse.data.data;
                    setSolution(solutionData);

                    const mainTechId = solutionData.attributes.main_technology.data.id;
                    const mainTechResponse = await axios.get(`http://localhost:1337/api/main-technologies/${mainTechId}`);
                    setMainTechnology(mainTechResponse.data.data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            } else if (pathSegments[0] === 'mainTechnologies' && pathSegments[1]) {
                try {
                    const mainTechId = pathSegments[1];
                    const mainTechResponse = await axios.get(`http://localhost:1337/api/main-technologies/${mainTechId}`);
                    setMainTechnology(mainTechResponse.data.data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            } else if (pathSegments[0] === 'mainTechnologies') {
                // Main technologies list page
                setMainTechnology({ attributes: { title: "Ana Teknolojiler" } });
            } else if (pathSegments[0] === 'solutions') {
                // Solutions list page
                setSolution({ attributes: { title: "Alt Teknolojiler" } });
            }
        };

        fetchData();
    }, [pathname]);

    return (
        <div className="animate-appear p-4">
            <div className="inline-block bg-muted px-2 py-1 rounded-lg">
                <Link href="/">
                    <span className="hover:underline">Anasayfa</span>
                </Link>
                {pathSegments[0] === 'mainTechnologies' && (
                    <>
                        {' / '}
                        <Link href="/mainTechnologies">
                            <span className="hover:underline">{mainTechnology ? mainTechnology.attributes.title : 'Ana Teknolojiler'}</span>
                        </Link>
                    </>
                )}
                {pathSegments[0] === 'solutions' && !pathSegments[1] && (
                    <>
                        {' / '}
                        <Link href="/solutions">
                            <span className="hover:underline">{solution ? solution.attributes.title : 'Alt Teknolojiler'}</span>
                        </Link>
                    </>
                )}
                {mainTechnology && pathSegments[0] !== 'mainTechnologies' && pathSegments[1] && (
                    <>
                        {' / '}
                        <Link href={`/mainTechnologies/${mainTechnology.id}`}>
                            <span className="hover:underline">{mainTechnology.attributes.title}</span>
                        </Link>
                    </>
                )}
                {solution && pathSegments[1] && (
                    <>
                        {' / '}
                        <Link href={`/solutions/${solution.id}`}>
                            <span className="hover:underline">{solution.attributes.title}</span>
                        </Link>
                    </>
                )}
            </div>
            {children}
        </div>
    );
}
