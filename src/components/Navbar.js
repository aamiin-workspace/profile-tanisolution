'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; 
import Image from 'next/image'; 
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  // ------------------------

  const [activeMainMenu, setActiveMainMenu] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Click Outside Dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- LOGIKA SCROLL OTOMATIS (Fix Mobile & Cross Page) ---
  // Fungsi ini mendeteksi jika URL memiliki hash (#about, #contact) saat halaman diload
  useEffect(() => {
    if (pathname === "/") {
      const hash = window.location.hash; // ambil #about atau #contact
      if (hash) {
        const id = hash.substring(1); // buang tanda #
        setTimeout(() => {
          scrollToSection(id);
        }, 100); // beri sedikit jeda agar halaman render dulu
      }
    }
  }, [pathname]);

  // ScrollSpy untuk Home Page
  useEffect(() => {
    const handleScrollSpy = () => {
      if (pathname !== "/") return;

      const sections = ["home", "about", "products", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveLink(id);
          if (id === "about") {
            setActiveMainMenu("tentang");
          } else if (id === "home") {
            setActiveMainMenu(null);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [pathname]);

  // Logika Active State Menu Utama
  useEffect(() => {
    if (pathname !== "/") {
      setActiveLink("");
      if (pathname === "/prestasi") {
        setActiveMainMenu("tentang");
      } 
      else if (pathname === "/teknosolusi" || pathname === "/edusolusi" || pathname === "/kreasolusi" || pathname === "/minilab") {
        setActiveMainMenu("layanan");
      } 
      else if (pathname === "/kolaborasi") {
        setActiveMainMenu("kolab");
      } 
      else if (pathname === "/berita") {
        setActiveMainMenu("berita");
      } else {
        setActiveMainMenu(null);
      }
    } else {
      setActiveLink("home");
      // Jika di home tapi sedang di section about, biarkan menu Tentang aktif
      if (activeLink !== "about") {
        setActiveMainMenu(null);
      }
    }
  }, [pathname, activeLink]);

  const toggleDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const toggleMobileDropdown = (name) => {
    setMobileOpenDropdown((prev) => (prev === name ? null : name));
  };

  const getDropdownParentClass = (name) => {
    const isDropdownActive = activeDropdown === name;
    const isMainMenuActive = activeMainMenu === name;
    
    return isDropdownActive || isMainMenuActive
      ? "text-primary font-bold flex items-center transition dark:text-green-400"
      : "text-secondary hover:text-primary flex items-center transition dark:text-gray-200 dark:hover:text-green-400";
  };

  const dropdownContainerBaseClass = 
    `absolute top-full left-0 w-48 bg-white dark:bg-gray-800 shadow-xl rounded-b-lg border-t-2 border-primary 
     pt-4 z-50 overflow-hidden`;

  const getLinkClass = (section) =>
    pathname === "/" && activeLink === section
      ? "text-primary font-bold transition dark:text-green-400"
      : "text-secondary hover:text-primary transition dark:text-gray-200 dark:hover:text-green-400";

  const dropdownItemClass = (isActive) => 
    `block px-4 py-3 text-sm hover:bg-green-50 dark:hover:bg-gray-700 transition-colors 
     ${isActive ? "text-primary font-medium bg-green-50 dark:bg-gray-700 dark:text-green-400" : "text-secondary dark:text-gray-200"}`;

  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
    setMobileOpenDropdown(null);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update state manual agar UI langsung responsif
      setTimeout(() => {
        setActiveLink(sectionId);
        if (sectionId === "about") {
          setActiveMainMenu("tentang");
        }
      }, 300);
    }
  };

  // --- HANDLER KLIK VISI MISI (FIXED) ---
  const handleVisiMisiClick = () => {
    setActiveMainMenu("tentang");
    setActiveDropdown(null);
    setMobileOpenDropdown(null);
    closeMenu();
    
    if (pathname === "/") {
      scrollToSection("about");
    } else {
      // Gunakan push dengan hash agar useEffect di atas menangkapnya
      router.push("/#about"); 
    }
  };

  // --- HANDLER KLIK BERANDA ---
  const handleBerandaClick = (e) => {
    e.preventDefault();
    setActiveMainMenu(null);
    setActiveDropdown(null);
    setMobileOpenDropdown(null);
    closeMenu();
    
    if (pathname === "/") {
      scrollToSection("home");
      setActiveLink("home");
    } else {
      router.push("/");
    }
  };

  // --- HANDLER KLIK HUBUNGI KAMI (FIXED) ---
  const handleHubungiKamiClick = (e) => {
    e.preventDefault();
    setActiveMainMenu(null);
    setActiveDropdown(null);
    setMobileOpenDropdown(null);
    closeMenu();
    
    if (pathname === "/") {
      scrollToSection("contact");
      setActiveLink("contact");
    } else {
      // Gunakan push dengan hash agar useEffect di atas menangkapnya
      router.push("/#contact");
    }
  };

  const handlePageLinkClick = (mainMenuName) => {
    setActiveMainMenu(mainMenuName); 
    setActiveDropdown(null);
    setMobileOpenDropdown(null);
    closeMenu();
  };

  const handleMobilePageLinkClick = (mainMenuName) => {
    setActiveMainMenu(mainMenuName);
    setMobileOpenDropdown(null);
    closeMenu();
  };

  const isPrestasiActive = pathname === "/prestasi";
  const isTeknosolusiActive = pathname === "/teknosolusi";
  const isEdusolusiActive = pathname === "/edusolusi";
  const isKreasolusiActive = pathname === "/kreasolusi";
  const isMinilabActive = pathname === "/minilab"; 
  const isKolaborasiActive = pathname === "/kolaborasi";

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white dark:bg-gray-900 shadow-md py-2" : "bg-white dark:bg-gray-900 shadow-sm py-4"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-12 items-center">

          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center" 
            onClick={() => {
              window.scrollTo(0, 0);
              setActiveLink("home");
              setActiveMainMenu(null);
              setActiveDropdown(null);
            }}
          >
            <div className="relative h-10 w-10">
                <Image 
                    src="/tani.webp" 
                    alt="Logo Tani Solution" 
                    fill
                    className="object-contain"
                />
            </div>
            <span className="ml-2 font-bold text-lg md:text-xl text-secondary dark:text-white hidden sm:block">
              Tani Solution Indonesia
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6" ref={dropdownRef}>

            <button onClick={handleBerandaClick} className={getLinkClass("home")}>
              Beranda
            </button>
            
            {/* Dropdown 1: Tentang Kami */}
            <div className="relative">
              <button onClick={() => toggleDropdown("tentang")} className={getDropdownParentClass("tentang")}>
                Tentang Kami <i className={`fas fa-chevron-down ml-1 text-xs transition-transform duration-300 ${activeDropdown === "tentang" ? "rotate-180" : ""}`}></i>
              </button>
              <AnimatePresence>
                {activeDropdown === "tentang" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className={dropdownContainerBaseClass}
                  >
                    <button 
                      onClick={handleVisiMisiClick}
                      className={`w-full text-left ${dropdownItemClass(pathname === "/" && activeLink === "about")}`}
                    >
                      Visi & Misi
                    </button>
                    <Link 
                      href="/prestasi" 
                      onClick={() => handlePageLinkClick("tentang")}
                      className={dropdownItemClass(isPrestasiActive)}
                    >
                      Prestasi
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dropdown 2: Layanan Kami */}
            <div className="relative">
              <button onClick={() => toggleDropdown("layanan")} className={getDropdownParentClass("layanan")}>
                Layanan Kami <i className={`fas fa-chevron-down ml-1 text-xs transition-transform duration-300 ${activeDropdown === "layanan" ? "rotate-180" : ""}`}></i>
              </button>
              <AnimatePresence>
                {activeDropdown === "layanan" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className={dropdownContainerBaseClass}
                  >
                    <Link 
                      href="/teknosolusi" 
                      onClick={() => handlePageLinkClick("layanan")}
                      className={dropdownItemClass(isTeknosolusiActive)}
                    >
                      Teknosolusi
                    </Link>
                    <Link 
                      href="/edusolusi" 
                      onClick={() => handlePageLinkClick("layanan")}
                      className={dropdownItemClass(isEdusolusiActive)}
                    >
                      Edusolusi
                    </Link>
                    <Link 
                      href="/kreasolusi" 
                      onClick={() => handlePageLinkClick("layanan")}
                      className={dropdownItemClass(isKreasolusiActive)}
                    >
                      Kreasolusi
                    </Link>
                    <Link 
                      href="/minilab" 
                      onClick={() => handlePageLinkClick("layanan")}
                      className={dropdownItemClass(isMinilabActive)}
                    >
                      Agritech
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dropdown 3: Kolaborasi */}
            <div className="relative">
              <button onClick={() => toggleDropdown("kolab")} className={getDropdownParentClass("kolab")}>
                Kolaborasi <i className={`fas fa-chevron-down ml-1 text-xs transition-transform duration-300 ${activeDropdown === "kolab" ? "rotate-180" : ""}`}></i>
              </button>
              <AnimatePresence>
                {activeDropdown === "kolab" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className={dropdownContainerBaseClass}
                  >
                    <Link 
                      href="/kolaborasi?tab=magang" 
                      onClick={() => handlePageLinkClick("kolab")}
                      className={dropdownItemClass(isKolaborasiActive)}
                    >
                      Magang
                    </Link>
                    <Link 
                      href="/kolaborasi?tab=riset" 
                      onClick={() => handlePageLinkClick("kolab")}
                      className={dropdownItemClass(isKolaborasiActive)}
                    >
                      Riset
                    </Link>
                    <Link 
                      href="/kolaborasi?tab=kunjungan" 
                      onClick={() => handlePageLinkClick("kolab")}
                      className={dropdownItemClass(isKolaborasiActive)}
                    >
                      Kunjungan
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              href="/berita" 
              onClick={() => {
                handlePageLinkClick("berita");
              }}
              className={`transition font-medium ${activeMainMenu === "berita" ? "text-primary font-bold dark:text-green-400" : "text-secondary hover:text-primary dark:text-gray-200 dark:hover:text-green-400"}`}
            >
              Berita
            </Link>

            <button 
              onClick={handleHubungiKamiClick}
              className="px-5 py-2 rounded-full bg-primary text-white hover:bg-green-700 shadow-md text-sm font-bold transition-colors transform active:scale-95"
            >
              Hubungi Kami
            </button>

            {/* Tombol Dark Mode Desktop */}
            <motion.button 
              onClick={toggleTheme} 
              className="ml-2 p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-yellow-300 dark:hover:bg-gray-800 transition-colors"
              whileTap={{ rotate: 180 }}
            >
              {theme === "dark" ? <i className="fas fa-sun text-lg"></i> : <i className="fas fa-moon text-lg"></i>}
            </motion.button>
          </div>

          {/* Mobile Button */}
          <div className="flex items-center gap-2 md:hidden">
            <motion.button onClick={toggleTheme} className="p-2 text-gray-600 dark:text-yellow-300" whileTap={{ rotate: 180 }}>
              {theme === "dark" ? <i className="fas fa-sun text-lg"></i> : <i className="fas fa-moon text-lg"></i>}
            </motion.button>
            <button className="p-2" onClick={() => setIsOpen(!isOpen)}>
              <i className={`fas ${isOpen ? "fa-times" : "fa-bars"} fa-lg text-secondary dark:text-white transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU (ANIMATED) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg w-full absolute top-full left-0 border-t dark:border-gray-700 overflow-hidden z-40"
          >
            <div className="pb-8 pt-2">
                <button 
                  onClick={handleBerandaClick}
                  className="block w-full text-left px-4 py-3 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-secondary dark:text-gray-200"
                >
                  Beranda
                </button>
                
                {/* Tentang Kami - Mobile Dropdown */}
                <div className="border-b dark:border-gray-700">
                  <button 
                    onClick={() => toggleMobileDropdown("tentang")}
                    className={`flex justify-between items-center w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 ${activeMainMenu === "tentang" ? "text-primary font-bold dark:text-green-400" : "text-secondary dark:text-gray-200"}`}
                  >
                    <span>Tentang Kami</span>
                    <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${mobileOpenDropdown === "tentang" ? "rotate-180" : ""}`}></i>
                  </button>
                  <AnimatePresence>
                    {mobileOpenDropdown === "tentang" && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-gray-50 dark:bg-gray-800 overflow-hidden"
                      >
                        <button 
                          onClick={handleVisiMisiClick}
                          className="block w-full text-left py-3 px-8 text-sm hover:text-primary dark:text-gray-400 dark:hover:text-green-400"
                        >
                          • Visi & Misi
                        </button>
                        <Link 
                          href="/prestasi" 
                          onClick={() => handleMobilePageLinkClick("tentang")}
                          className="block py-3 px-8 text-sm hover:text-primary dark:text-gray-400 dark:hover:text-green-400"
                        >
                          • Prestasi
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Layanan Kami - Mobile Dropdown */}
                <div className="border-b dark:border-gray-700">
                  <button 
                    onClick={() => toggleMobileDropdown("layanan")}
                    className={`flex justify-between items-center w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 ${activeMainMenu === "layanan" ? "text-primary font-bold dark:text-green-400" : "text-secondary dark:text-gray-200"}`}
                  >
                    <span>Layanan Kami</span>
                    <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${mobileOpenDropdown === "layanan" ? "rotate-180" : ""}`}></i>
                  </button>
                  <AnimatePresence>
                    {mobileOpenDropdown === "layanan" && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-gray-50 dark:bg-gray-800 overflow-hidden"
                      >
                        <Link 
                          href="/teknosolusi" 
                          onClick={() => handleMobilePageLinkClick("layanan")}
                          className="block py-3 px-8 text-sm hover:text-primary dark:text-gray-400 dark:hover:text-green-400"
                        >
                          • Teknosolusi
                        </Link>
                        <Link 
                          href="/edusolusi" 
                          onClick={() => handleMobilePageLinkClick("layanan")}
                          className="block py-3 px-8 text-sm hover:text-primary dark:text-gray-400 dark:hover:text-green-400"
                        >
                          • Edusolusi
                        </Link>
                        <Link 
                          href="/kreasolusi" 
                          onClick={() => handleMobilePageLinkClick("layanan")}
                          className="block py-3 px-8 text-sm hover:text-primary dark:text-gray-400 dark:hover:text-green-400"
                        >
                          • Kreasolusi
                        </Link>
                        <Link 
                          href="/minilab" 
                          onClick={() => handleMobilePageLinkClick("layanan")}
                          className="block py-3 px-8 text-sm hover:text-primary dark:text-gray-400 dark:hover:text-green-400"
                        >
                          • Agritech
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Kolaborasi - Mobile Dropdown */}
                <div className="border-b dark:border-gray-700">
                  <button 
                    onClick={() => toggleMobileDropdown("kolab")}
                    className={`flex justify-between items-center w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 ${activeMainMenu === "kolab" ? "text-primary font-bold dark:text-green-400" : "text-secondary dark:text-gray-200"}`}
                  >
                    <span>Kolaborasi</span>
                    <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${mobileOpenDropdown === "kolab" ? "rotate-180" : ""}`}></i>
                  </button>
                  <AnimatePresence>
                    {mobileOpenDropdown === "kolab" && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-gray-50 dark:bg-gray-800 overflow-hidden"
                      >
                        <Link 
                          href="/kolaborasi?tab=magang" 
                          onClick={() => handleMobilePageLinkClick("kolab")}
                          className="block py-3 px-8 text-sm hover:text-primary dark:text-gray-400 dark:hover:text-green-400"
                        >
                          • Magang
                        </Link>
                        <Link 
                          href="/kolaborasi?tab=riset" 
                          onClick={() => handleMobilePageLinkClick("kolab")}
                          className="block py-3 px-8 text-sm hover:text-primary dark:text-gray-400 dark:hover:text-green-400"
                        >
                          • Riset
                        </Link>
                        <Link 
                          href="/kolaborasi?tab=kunjungan" 
                          onClick={() => handleMobilePageLinkClick("kolab")}
                          className="block py-3 px-8 text-sm hover:text-primary dark:text-gray-400 dark:hover:text-green-400"
                        >
                          • Kunjungan
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link 
                  href="/berita" 
                  onClick={() => handleMobilePageLinkClick("berita")}
                  className={`block px-4 py-3 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 ${activeMainMenu === "berita" ? "text-primary font-bold dark:text-green-400" : "text-secondary dark:text-gray-200"}`}
                >
                  Berita
                </Link>

                <div className="p-4 mt-2">
                  <button 
                    onClick={handleHubungiKamiClick}
                    className="block w-full px-5 py-3 rounded-md bg-primary text-white text-center font-bold hover:bg-green-700 shadow-md transform active:scale-95 transition-transform"
                  >
                    Hubungi Kami
                  </button>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}