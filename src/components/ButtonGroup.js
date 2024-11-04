import Link from 'next/link';
import { Home, BadgeInfo, FolderClosed, Radius, Box, Bolt, Code, Download, Filter } from "lucide-react";

const ButtonGroup = () => {
  return (
    <ul className="space-y-4 w-full columns-1 lg:columns-2">
      <li className="bg-gray-100 text-lg rounded-lg shadow p-4 w-full h-full flex items-center">
        <Link href="/mainTechnologies" className="flex items-center w-full">
          <Box className="w-6 h-6 mr-2" />
          <span className="font-semibold hover:underline">Ana Teknolojiler</span>
        </Link>
      </li>
      <li className="bg-gray-100 text-lg rounded-lg shadow p-4 w-full h-full flex items-center">
        <Link href="/mainTechnologies" className="flex items-center w-full">
          <Filter className="w-6 h-6 mr-2" />
          <span className="font-semibold hover:underline">Filtre</span>
        </Link>
      </li>
      <li className="bg-gray-100 text-lg rounded-lg shadow p-4 w-full h-full flex items-center">
        <Link href="/solutions" className="flex items-center w-full">
          <Bolt className="w-6 h-6 mr-2" />
          <span className="font-semibold hover:underline">Alt Teknolojiler</span>
        </Link>
      </li>
      <li className="bg-gray-100 text-lg rounded-lg shadow p-4 w-full h-full flex items-center">
        <Link href="/projects" className="flex items-center w-full">
          <FolderClosed className="w-6 h-6 mr-2" />
          <span className="font-semibold hover:underline">Projeler</span>
        </Link>
      </li>
      <li className="bg-gray-100 text-lg rounded-lg shadow p-4 w-full h-full flex items-center">
        <Link href="/" className="flex items-center w-full">
          <Radius className="w-6 h-6 mr-2" />
          <span className="font-semibold hover:underline">Teknoloji Radarı Nedir?</span>
        </Link>
      </li>
      <li className="bg-gray-100 text-lg rounded-lg shadow p-4 w-full h-full flex items-center">
        <Link href="/about" className="flex items-center w-full">
          <BadgeInfo className="w-6 h-6 mr-2" />
          <span className="font-semibold hover:underline">Hakkında</span>
        </Link>
      </li>
      <li className="bg-gray-100 text-lg rounded-lg shadow p-4 w-full h-full flex items-center">
        <Link href="/" className="flex items-center w-full">
          <Download className="w-6 h-6 mr-2" />
          <span className="font-semibold hover:underline">Radar Görüntüsü İndir</span>
        </Link>
      </li>
      <li className="bg-gray-100 text-lg rounded-lg shadow p-4 w-full h-full flex items-center">
        <Link href="/" className="flex items-center w-full">
          <Code className="w-6 h-6 mr-2" />
          <span className="font-semibold hover:underline">Radar Yerleştirme</span>
        </Link>
      </li>
    </ul>
  );
};

export default ButtonGroup;
