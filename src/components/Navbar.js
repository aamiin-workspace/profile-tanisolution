"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setTimeout(() => {
        setActiveLink(sectionId);
        if (sectionId === "about") {
          setActiveMainMenu("tentang");
        }
      }, 300);
    }
  };

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

  const [activeMainMenu, setActiveMainMenu] = useState(null);
  
  // State untuk dropdown desktop (berdasarkan hover)
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  
  // State untuk dropdown mobile (berdasarkan klik)
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState(null);

  // Timer untuk memberi jeda sedikit sebelum menutup dropdown saat mouse keluar (UX yang baik)
  const hoverTimeoutRef = useRef(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname === "/") {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.substring(1);
        setTimeout(() => {
          scrollToSection(id);
        }, 100);
      }
    }
  }, [pathname]);

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

  const getActiveMainMenu = () => {
    if (pathname === "/") return null;
    if (pathname === "/prestasi") return "tentang";
    if (
      ["/teknosolusi", "/edusolusi", "/kreasolusi", "/minilab"].includes(
        pathname,
      )
    )
      return "layanan";
    if (pathname === "/kolaborasi") return "kolab";
    if (pathname === "/berita" || pathname.startsWith("/berita/"))
      return "berita";
    return null;
  };

  const currentActiveMainMenu = getActiveMainMenu();

  // FUNGSI UNTUK HOVER DESKTOP
  const handleMouseEnter = (name) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredDropdown(name);
  };

  const handleMouseLeave = () => {
    // Jeda 200ms agar dropdown tidak langsung hilang saat mouse meleset sedikit
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredDropdown(null);
    }, 200);
  };

  const toggleMobileDropdown = (name) => {
    setMobileOpenDropdown((prev) => (prev === name ? null : name));
  };

  // KONSISTENSI WARNA ACTIVE & HOVER
  const getMenuParentClass = (name) => {
    const isHovered = hoveredDropdown === name;
    const isActive = currentActiveMainMenu === name;
    const isMobileOpen = mobileOpenDropdown === name;

    // Jika sedang di-hover, aktif, atau terbuka di mobile, warnanya hijau (primary)
    if (isHovered || isActive || isMobileOpen) {
      return "text-primary font-bold flex items-center transition-colors dark:text-green-400";
    }
    return "text-secondary hover:text-primary flex items-center transition-colors font-medium dark:text-gray-200 dark:hover:text-green-400";
  };

  const dropdownContainerBaseClass = `absolute top-full left-0 w-48 bg-white dark:bg-gray-800 shadow-xl rounded-b-lg border-t-2 border-primary 
     pt-4 pb-2 z-50 overflow-hidden`;

  const getHomeLinkClass = () => {
    const isActive = pathname === "/" && (activeLink === "home" || !activeLink);
    return isActive
      ? "text-primary font-bold transition-colors dark:text-green-400"
      : "text-secondary hover:text-primary transition-colors font-medium dark:text-gray-200 dark:hover:text-green-400";
  };

  const getSingleLinkClass = (name) => {
    const isActive = currentActiveMainMenu === name;
    return isActive
      ? "text-primary font-bold transition-colors dark:text-green-400"
      : "text-secondary hover:text-primary transition-colors font-medium dark:text-gray-200 dark:hover:text-green-400";
  };

  const dropdownItemClass = (isActive) =>
    `block px-4 py-3 text-sm hover:bg-green-50 dark:hover:bg-gray-700 transition-colors 
     ${isActive ? "text-primary font-bold bg-green-50 dark:bg-gray-700 dark:text-green-400" : "text-secondary font-medium dark:text-gray-200"}`;

  const closeMenu = () => {
    setIsOpen(false);
    setHoveredDropdown(null);
    setMobileOpenDropdown(null);
  };

  const handleVisiMisiClick = () => {
    setActiveMainMenu("tentang");
    closeMenu();

    if (pathname === "/") {
      scrollToSection("about");
    } else {
      router.push("/#about");
    }
  };

  const handleBerandaClick = (e) => {
    e.preventDefault();
    setActiveMainMenu(null);
    closeMenu();

    if (pathname === "/") {
      scrollToSection("home");
      setActiveLink("home");
    } else {
      router.push("/");
    }
  };

  const handleHubungiKamiClick = (e) => {
    e.preventDefault();
    setActiveMainMenu(null);
    closeMenu();

    if (pathname === "/") {
      scrollToSection("contact");
      setActiveLink("contact");
    } else {
      router.push("/#contact");
    }
  };

  const handlePageLinkClick = (mainMenuName) => {
    setActiveMainMenu(mainMenuName);
    closeMenu();
  };

  const handleMobilePageLinkClick = (mainMenuName) => {
    setActiveMainMenu(mainMenuName);
    closeMenu();
  };

  const isPrestasiActive = pathname === "/prestasi";
  const isTeknosolusiActive = pathname === "/teknosolusi";
  const isEdusolusiActive = pathname === "/edusolusi";
  const isKreasolusiActive = pathname === "/kreasolusi";
  const isMinilabActive = pathname === "/minilab";
  const isKolaborasiActive = pathname === "/kolaborasi";

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white dark:bg-gray-900 shadow-md py-2" : "bg-white dark:bg-gray-900 shadow-sm py-4"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-12 items-center">
          
          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center group"
            onClick={() => {
              window.scrollTo(0, 0);
              setActiveLink("home");
              setActiveMainMenu(null);
              setHoveredDropdown(null);
            }}
          >
            <div className="relative h-10 w-10 transform group-hover:scale-105 transition-transform">
              <Image
                src="/tani.webp"
                alt="Logo Tani Solution"
                fill
                className="object-contain"
              />
            </div>
            <span className="ml-2 font-bold text-lg md:text-xl text-secondary dark:text-white hidden sm:block group-hover:text-primary transition-colors">
              Tani Solution Indonesia
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-6">
            
            <button onClick={handleBerandaClick} className={getHomeLinkClass()}>
              Beranda
            </button>

            {/* DROPDOWN TENTANG KAMI */}
            <div 
              className="relative py-4" // Padding vertikal ditambah agar hover area tidak putus saat kursor turun ke dropdown
              onMouseEnter={() => handleMouseEnter("tentang")}
              onMouseLeave={handleMouseLeave}
            >
              <button className={getMenuParentClass("tentang")}>
                Tentang Kami{" "}
                <i className={`fas fa-chevron-down ml-1 text-[10px] transition-transform duration-300 ${hoveredDropdown === "tentang" ? "rotate-180" : ""}`}></i>
              </button>
              <AnimatePresence>
                {hoveredDropdown === "tentang" && (
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

            {/* DROPDOWN LAYANAN KAMI */}
            <div 
              className="relative py-4"
              onMouseEnter={() => handleMouseEnter("layanan")}
              onMouseLeave={handleMouseLeave}
            >
              <button className={getMenuParentClass("layanan")}>
                Layanan Kami{" "}
                <i className={`fas fa-chevron-down ml-1 text-[10px] transition-transform duration-300 ${hoveredDropdown === "layanan" ? "rotate-180" : ""}`}></i>
              </button>
              <AnimatePresence>
                {hoveredDropdown === "layanan" && (
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

            {/* DROPDOWN KOLABORASI */}
            <div 
              className="relative py-4"
              onMouseEnter={() => handleMouseEnter("kolab")}
              onMouseLeave={handleMouseLeave}
            >
              <button className={getMenuParentClass("kolab")}>
                Kolaborasi{" "}
                <i className={`fas fa-chevron-down ml-1 text-[10px] transition-transform duration-300 ${hoveredDropdown === "kolab" ? "rotate-180" : ""}`}></i>
              </button>
              <AnimatePresence>
                {hoveredDropdown === "kolab" && (
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
                      className={dropdownItemClass(isKolaborasiActive)} // Akan kita deteksi via URL param jika memungkinkan, untuk saat ini deteksi via parent route
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

            {/* SINGLE LINK: BERITA */}
            <Link
              href="/berita"
              onClick={() => handlePageLinkClick("berita")}
              className={getSingleLinkClass("berita")}
            >
              Berita
            </Link>

            {/* BUTTON HUBUNGI KAMI */}
            <button
              onClick={handleHubungiKamiClick}
              className="px-5 py-2.5 rounded-full bg-primary text-white hover:bg-green-700 shadow-md text-sm font-bold transition-all transform active:scale-95 hover:shadow-lg"
            >
              Hubungi Kami
            </button>

            {/* THEME TOGGLE */}
            <motion.button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-full text-gray-400 hover:text-gray-800 bg-gray-50 hover:bg-gray-200 dark:bg-gray-800 dark:text-yellow-400 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700 shadow-inner"
              whileTap={{ rotate: 180 }}
            >
              {theme === "dark" ? (
                <i className="fas fa-sun text-[15px]"></i>
              ) : (
                <i className="fas fa-moon text-[15px]"></i>
              )}
            </motion.button>
          </div>

          {/* MOBILE TOGGLE BUTTONS */}
          <div className="flex items-center gap-3 md:hidden">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-yellow-400"
              whileTap={{ rotate: 180 }}
            >
              {theme === "dark" ? (
                <i className="fas fa-sun text-sm"></i>
              ) : (
                <i className="fas fa-moon text-sm"></i>
              )}
            </motion.button>
            <button 
              className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700" 
              onClick={() => setIsOpen(!isOpen)}
            >
              <i
                className={`fas ${isOpen ? "fa-times" : "fa-bars"} text-secondary dark:text-white transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
              ></i>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU (Klik untuk buka) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-2xl w-full absolute top-full left-0 border-t border-gray-100 dark:border-gray-800 overflow-hidden z-40"
          >
            <div className="pb-8 pt-2 max-h-[80vh] overflow-y-auto">
              
              <button
                onClick={handleBerandaClick}
                className={`block w-full text-left px-6 py-4 border-b border-gray-50 dark:border-gray-800 ${pathname === "/" && (activeLink === "home" || !activeLink) ? "text-primary font-bold bg-green-50/50 dark:bg-gray-800/50" : "text-secondary font-medium dark:text-gray-200"}`}
              >
                Beranda
              </button>

              {/* MOBILE DROPDOWN TENTANG */}
              <div className="border-b border-gray-50 dark:border-gray-800">
                <button
                  onClick={() => toggleMobileDropdown("tentang")}
                  className={`flex justify-between items-center w-full text-left px-6 py-4 ${getMenuParentClass("tentang")}`}
                >
                  <span>Tentang Kami</span>
                  <i className={`fas fa-chevron-down text-[10px] transition-transform duration-300 ${mobileOpenDropdown === "tentang" ? "rotate-180" : ""}`}></i>
                </button>
                <AnimatePresence>
                  {mobileOpenDropdown === "tentang" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-gray-50 dark:bg-gray-800/50 overflow-hidden border-t border-gray-100 dark:border-gray-700/50"
                    >
                      <button
                        onClick={handleVisiMisiClick}
                        className={`block w-full text-left py-3 px-10 text-sm ${pathname === "/" && activeLink === "about" ? "text-primary font-bold" : "text-gray-600 dark:text-gray-400"}`}
                      >
                        <i className="fas fa-minus mr-2 text-[8px] opacity-50"></i> Visi & Misi
                      </button>
                      <Link
                        href="/prestasi"
                        onClick={() => handleMobilePageLinkClick("tentang")}
                        className={`block py-3 px-10 text-sm ${isPrestasiActive ? "text-primary font-bold" : "text-gray-600 dark:text-gray-400"}`}
                      >
                        <i className="fas fa-minus mr-2 text-[8px] opacity-50"></i> Prestasi
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* MOBILE DROPDOWN LAYANAN */}
              <div className="border-b border-gray-50 dark:border-gray-800">
                <button
                  onClick={() => toggleMobileDropdown("layanan")}
                  className={`flex justify-between items-center w-full text-left px-6 py-4 ${getMenuParentClass("layanan")}`}
                >
                  <span>Layanan Kami</span>
                  <i className={`fas fa-chevron-down text-[10px] transition-transform duration-300 ${mobileOpenDropdown === "layanan" ? "rotate-180" : ""}`}></i>
                </button>
                <AnimatePresence>
                  {mobileOpenDropdown === "layanan" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-gray-50 dark:bg-gray-800/50 overflow-hidden border-t border-gray-100 dark:border-gray-700/50"
                    >
                      <Link
                        href="/teknosolusi"
                        onClick={() => handleMobilePageLinkClick("layanan")}
                        className={`block py-3 px-10 text-sm ${isTeknosolusiActive ? "text-primary font-bold" : "text-gray-600 dark:text-gray-400"}`}
                      >
                         <i className="fas fa-minus mr-2 text-[8px] opacity-50"></i> Teknosolusi
                      </Link>
                      <Link
                        href="/edusolusi"
                        onClick={() => handleMobilePageLinkClick("layanan")}
                        className={`block py-3 px-10 text-sm ${isEdusolusiActive ? "text-primary font-bold" : "text-gray-600 dark:text-gray-400"}`}
                      >
                         <i className="fas fa-minus mr-2 text-[8px] opacity-50"></i> Edusolusi
                      </Link>
                      <Link
                        href="/kreasolusi"
                        onClick={() => handleMobilePageLinkClick("layanan")}
                        className={`block py-3 px-10 text-sm ${isKreasolusiActive ? "text-primary font-bold" : "text-gray-600 dark:text-gray-400"}`}
                      >
                         <i className="fas fa-minus mr-2 text-[8px] opacity-50"></i> Kreasolusi
                      </Link>
                      <Link
                        href="/minilab"
                        onClick={() => handleMobilePageLinkClick("layanan")}
                        className={`block py-3 px-10 text-sm ${isMinilabActive ? "text-primary font-bold" : "text-gray-600 dark:text-gray-400"}`}
                      >
                         <i className="fas fa-minus mr-2 text-[8px] opacity-50"></i> Agritech
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* MOBILE DROPDOWN KOLABORASI */}
              <div className="border-b border-gray-50 dark:border-gray-800">
                <button
                  onClick={() => toggleMobileDropdown("kolab")}
                  className={`flex justify-between items-center w-full text-left px-6 py-4 ${getMenuParentClass("kolab")}`}
                >
                  <span>Kolaborasi</span>
                  <i className={`fas fa-chevron-down text-[10px] transition-transform duration-300 ${mobileOpenDropdown === "kolab" ? "rotate-180" : ""}`}></i>
                </button>
                <AnimatePresence>
                  {mobileOpenDropdown === "kolab" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-gray-50 dark:bg-gray-800/50 overflow-hidden border-t border-gray-100 dark:border-gray-700/50"
                    >
                      <Link
                        href="/kolaborasi?tab=magang"
                        onClick={() => handleMobilePageLinkClick("kolab")}
                        className={`block py-3 px-10 text-sm ${isKolaborasiActive ? "text-primary font-bold" : "text-gray-600 dark:text-gray-400"}`}
                      >
                        <i className="fas fa-minus mr-2 text-[8px] opacity-50"></i> Magang
                      </Link>
                      <Link
                        href="/kolaborasi?tab=riset"
                        onClick={() => handleMobilePageLinkClick("kolab")}
                        className={`block py-3 px-10 text-sm ${isKolaborasiActive ? "text-primary font-bold" : "text-gray-600 dark:text-gray-400"}`}
                      >
                        <i className="fas fa-minus mr-2 text-[8px] opacity-50"></i> Riset
                      </Link>
                      <Link
                        href="/kolaborasi?tab=kunjungan"
                        onClick={() => handleMobilePageLinkClick("kolab")}
                        className={`block py-3 px-10 text-sm ${isKolaborasiActive ? "text-primary font-bold" : "text-gray-600 dark:text-gray-400"}`}
                      >
                        <i className="fas fa-minus mr-2 text-[8px] opacity-50"></i> Kunjungan
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* MOBILE SINGLE LINK */}
              <Link
                href="/berita"
                onClick={() => handleMobilePageLinkClick("berita")}
                className={`block px-6 py-4 border-b border-gray-50 dark:border-gray-800 ${currentActiveMainMenu === "berita" ? "text-primary font-bold bg-green-50/50 dark:bg-gray-800/50" : "text-secondary font-medium dark:text-gray-200"}`}
              >
                Berita
              </Link>

              <div className="p-6 mt-4">
                <button
                  onClick={handleHubungiKamiClick}
                  className="block w-full px-5 py-3.5 rounded-xl bg-primary text-white text-center font-bold hover:bg-green-700 shadow-lg transform active:scale-95 transition-transform"
                >
                  <i className="fab fa-whatsapp mr-2"></i> Hubungi Kami
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}