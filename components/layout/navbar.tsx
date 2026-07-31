"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Logo } from "@/public/icons/Logo";
import Link from "next/link";

const navItems = [
  { name: "Accueil", href: "/" },
  { name: "Activités", href: "/activites" },
  { name: "Exploration", href: "/exploration" },
  { name: "Liste", href: "/liste" },
  { name: "Contact", href: "/contact" },
];

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // effet pour détecter le scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    // cleanup: on retire le listener quand le composant unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // tableau de dépendances vide = effet exécuté une seule fois au mount

  return (
    <header
      className={`fixed top-2 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out rounded-xl
        ${isScrolled ? "w-195 bg-background/40 backdrop-blur-xl py-2 px-2" : "w-full py-2 px-6"}`}
      style={{ maxWidth: "100%", minWidth: "0px" }}
    >
      <div className="relative w-full hidden lg:grid grid-cols-[120px_1fr_120px] items-center justify-between gap-1">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-start gap-2">
          <div className="relative flex size-8 shrink-0 overflow-hidden">
            <Logo size={32} />
          </div>
        </Link>

        {/* Menu */}
        <NavItemsMenu />

        {/* Bouton de connexion */}
        <Link href="/login" className="flex items-center justify-end gap-2">
          <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 cursor-pointer">
            Connexion
          </Button>
        </Link>
      </div>
    </header>
  );
}

function NavItemsMenu() {
  return (
    <div className="flex items-center justify-center gap-2">
      {navItems.map((item) => (
        <Link key={item.name} href={item.href}>
          <Button variant="ghost" className="cursor-pointer px-3 ">
            {item.name}
          </Button>
        </Link>
      ))}
    </div>
  );
}
