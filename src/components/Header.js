import React from 'react';
import { Home, BadgeInfo, ChevronLeft, FolderClosed, Radius, Box, Bolt, ScrollText } from "lucide-react";
import Link from 'next/link';

export function Header({ toggleSidebar }) {
    return (
        <nav className="animate-slide bg-secondary flex items-center mx-5 mt-3 gap-4 h-12 rounded-xl p-4">
            <div className="relative group">
                <Link href="/" className="hover:opacity-50">
                    <Home />
                </Link>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-gray-900 text-white text-s rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100">
                    Ana Sayfa
                </div>
            </div>
            <div className="relative group">
                <Link href="/mainTechnologies" className="hover:opacity-50">
                <Box />
                </Link>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-gray-900 text-white text-s rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100">
                    Ana Teknolojiler
                </div>
            </div>
            <div className="relative group">
                <Link href="/solutions" className="hover:opacity-50">
                    <Bolt />
                </Link>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-gray-900 text-white text-s rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100">
                    Alt Teknolojiler
                </div>
            </div>
            <div className="relative group">
                <Link href="/projects" className="hover:opacity-50">
                    <FolderClosed />
                </Link>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-gray-900 text-white text-s rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100">
                    Projeler
                </div>
            </div>
            <div className="relative group">
                <Link href="/techRadarInfo" className="hover:opacity-50">
                    <Radius />
                </Link>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-gray-900 text-white text-s rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100">
                Teknoloji Radarı Nedir?
                </div>
            </div>
            <div className="relative group">
                <Link href="/about" className="hover:opacity-50">
                    <BadgeInfo />
                </Link>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-gray-900 text-white text-s rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100">
                    Hakkında
                </div>
            </div>
            <div className="relative group">
                <Link href="/term&policy" className="hover:opacity-50">
                    <ScrollText />
                </Link>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-gray-900 text-white text-s rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100">
                    Şartlar ve Koşullar
                </div>
            </div>
            <div className="flex-grow"></div>
            <div className="relative group me-3">
                <button onClick={toggleSidebar} className="hover:opacity-50">
                    <ChevronLeft />
                </button>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-gray-900 text-white text-s rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100">
                    Paneli Kapat
                </div>
            </div>
        </nav>
    );
}
