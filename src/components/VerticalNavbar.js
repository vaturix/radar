import { Home, BadgeInfo, ChevronRight, FolderClosed, Box, Bolt, Radius, Filter, Code, Download } from "lucide-react";
import Link from "next/link";

export function VerticalNavbar({ toggleSidebar }) {
    return (
        <div className="fixed top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 rounded-xl shadow-xl m-5 p-4 flex flex-col items-center justify-center">
            <button onClick={toggleSidebar} className="hover:opacity-50 mb-4 relative group">
                <ChevronRight />
                <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 w-max bg-white font-bold text-black text-s rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 shadow-lg">
                    Paneli Aç
                </div>
            </button>
            <button onClick={toggleSidebar} className="hover:opacity-50 my-2 relative group">
                <Link href="/">
                    <Home />
                </Link>
                <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 w-max bg-white font-bold text-black text-s rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 shadow-lg">
                    Ana Sayfa
                </div>
            </button>
            <button onClick={toggleSidebar} className="hover:opacity-50 my-2 relative group">
                <Link href="/">
                    <Filter />
                </Link>
                <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 w-max bg-white font-bold text-black text-s rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 shadow-lg">
                    Ana Sayfa
                </div>
            </button>
            <button onClick={toggleSidebar} className="hover:opacity-50 my-2 relative group">
                <Link href="/mainTechnologies">
                    <Box />
                </Link>
                <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 w-max bg-white font-bold text-black text-s rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 shadow-lg">
                    Ana Teknolojiler
                </div>
            </button>
            <button onClick={toggleSidebar} className="hover:opacity-50 my-2 relative group">
                <Link href="/solutions">
                    <Bolt />
                </Link>
                <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 w-max bg-white font-bold text-black text-s rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 shadow-lg">
                    Alt Teknolojiler
                </div>
            </button>
            <button onClick={toggleSidebar} className="hover:opacity-50 my-2 relative group">
                <Link href="/projects">
                    <FolderClosed />
                </Link>
                <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 w-max bg-white font-bold text-black text-s rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 shadow-lg">
                    Projeler
                </div>
            </button>
            <button onClick={toggleSidebar} className="hover:opacity-50 my-2 relative group">
                <Link href="/techRadarInfo">
                    <Radius />
                </Link>
                <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 w-max bg-white font-bold text-black text-s rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 shadow-lg">
                    Teknoloji Radarı Nedir?
                </div>
            </button>
            <button onClick={toggleSidebar} className="hover:opacity-50 my-2 relative group">
                <Link href="/about">
                    <BadgeInfo />
                </Link>
                <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 w-max bg-white font-bold text-black text-s rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 shadow-lg">
                    Hakkında
                </div>
            </button>
  
            <button onClick={toggleSidebar} className="hover:opacity-50 my-2 relative group">
                <Link href="/">
                    <Download />
                </Link>
                <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 w-max bg-white font-bold text-black text-s rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 shadow-lg">
                Radar Görüntüsü İndir                
                </div>
            </button>
            <button onClick={toggleSidebar} className="hover:opacity-50 my-2 relative group">
                <Link href="/">
                    <Code />
                </Link>
                    <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 w-max bg-white font-bold text-black text-s rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 shadow-lg">
                    Radar Yerleştirme                
                    </div>
            </button>
            </div>


    );
}
