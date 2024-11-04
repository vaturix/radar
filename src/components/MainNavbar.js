import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react'; // Menu ve X ikonları için lucide-react kütüphanesini kullanıyoruz

export function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex flex-col lg:flex-row justify-between items-center w-full p-2 bg-gray-200 rounded-xl shadow-xl">
      <div className=" mx-5 flex justify-between items-center w-full lg:w-auto">
        <Image src="/lib/img/csb-logo-footer-tr.png" alt="Logo" width={200} height={50} className="ms-3 me-3" />
        <Image src="/lib/img/portal-dnm-logo.png" alt="Logo" width={200} height={50} className="ms-3 hidden lg:block" /> {/* Mobilde gizli */}
        <button onClick={toggleMenu} className="lg:hidden">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div className={`flex flex-col lg:flex-row items-center gap-8 ${isMenuOpen ? 'flex' : 'hidden'} lg:flex`}>
        <Link href="/">
          <span className="text-gray-900 font-bold hover:underline">Ana Sayfa</span>
        </Link>
        <Link href="/">
          <span className="text-gray-900 font-bold hover:underline">Strateji ve Eylem Planı</span>
        </Link>
        <Link href="/">
          <span className="text-gray-900 font-bold hover:underline">Akıllı Şehir</span>
        </Link>
        <Link href="/">
          <span className="text-gray-900 font-bold hover:underline">Dijital Kütüphane</span>
        </Link>
        <Link href="/">
          <span className="text-gray-900 font-bold hover:underline">Uygulamalar</span>
        </Link>
      </div>
      <div className="hidden lg:block"></div>
    </nav>
  );
}
