"use client";

import Link from "next/link";
import React, { useState } from "react";  
import { FiMenu, FiX } from "react-icons/fi"; // Iconos para el menú hamburguesa


const MenuPrincipal: React.FC = () => { 
    const [openSubItem, setOpenSubItem] = useState<string | null>(null);
    const [openMenuItem, setOpenMenuItem] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Elementos del menú
interface SubSubItem {
    name: string;
    href: string;
}

interface SubItem {
    name: string;
    href: string;
    subSubItems?: SubSubItem[];
}

interface MenuItem {
    name: string;
    href: string;
    subItems?: SubItem[];
}

const menuItems: MenuItem[] = [
    { name: "Profile", href: "/profile", subItems: [] },
    { name: "Wish List", href: "/wishlist", subItems: [] },
    { name: "Groups", href: "/groups", subItems: [] },
];

    // Función para manejar el clic en los elementos del menú en móviles
    const handleMobileMenuItemClick = (itemName: string) => {
        if (openMenuItem === itemName) {
            setOpenMenuItem(null);
        } else {
            setOpenMenuItem(itemName);
        }
    };

    // Función para manejar el clic en los subítems en móviles
    const handleMobileSubItemClick = (subItemName: string) => {
        if (openSubItem === subItemName) {
            setOpenSubItem(null);
        } else {
            setOpenSubItem(subItemName);
        }
    };
    return (        <div className="relative font-navidad">
            {/* Menú principal */}
            <div
                className="fixed top-0 backdrop-blur-md bg-[#D22C31] flex items-center justify-between lg:justify-center w-full h-[66px] px-4 md:px-8 lg:px-16 z-50 gap-x-5"
                
            >
                {/* Logotipo */}
                <Link href="/">
                    <img
                        className="flex-shrink-0 w-[50px] h-auto mr-4 rounded-full border-2"
                        src="/images/logotipo0.png"
                        alt="Logotipo"
                    />
                </Link>




                {/* Menú hamburguesa para móviles */}
                <div className="lg:hidden flex items-center justify-between ">
                    <div className="flex items-center">
                        {isMobileMenuOpen ? "" : <span className="mr-2  text-[#FFFFFFFF] text-xl">Menú</span>}

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-[#FFFFFFFF] font-bold focus:outline-none"
                        >
                            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Menú desplegable en móviles */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed top-[66px] left-0 w-full backdrop-blur-md bg-[#FFFEFEFF] z-20 shadow-md h-[40vh] opacity-[0.99] p-8">
                    <div className="px-4 py-6 space-y-4">
                        {menuItems.map((item) => (
                            <div key={item.name}>
                                <div className="flex justify-between items-center">
                                    <Link
                                        href={item.href || "#"}
                                        className={`cursor-pointer text-[#687E57] text-4xl leading-[180%]  focus:border-b-[1px] focus:border-[#0a0a0c] ${
                                            openMenuItem === item.name
                                                ? "text-black font-bold border-b-[2px] border-[#0a0a0c]"
                                                : "font-medium"
                                        }`}
                                        onClick={() => handleMobileMenuItemClick(item.name)}
                                    >
                                        {item.name}
                                    </Link>
                                </div>
                                {/* Submenú en móviles */}
                                {item.subItems && openMenuItem === item.name && (
                                    <div className="ml-4 mt-2 space-y-2">
                                        {item.subItems.map((subItem) => (
                                            <div key={subItem.name}>
                                                <div className="flex justify-between items-center cursor-pointer">
                                                    <Link
                                                        href={subItem.href || "#"}
                                                        className={`text-[#0a0a0c] text-[14px] cursor-pointer ${
                                                            openSubItem === subItem.name
                                                                ? "text-black border-b-[1px] border-black font-bold"
                                                                : "font-medium"
                                                        }`}
                                                        onClick={() => handleMobileSubItemClick(subItem.name)}
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                </div>
                                                {/* SubSubItems en móviles */}
                                                {subItem.subSubItems && openSubItem === subItem.name && (
                                                    <div className="ml-4 mt-2 space-y-1">
                                                        {subItem.subSubItems.map((subSubItem) => (
                                                            <Link
                                                                href={subSubItem.href}
                                                                key={subSubItem.name}
                                                                className="block text-[#0a0a0c] text-[14px] hover:underline"
                                                            >
                                                                {subSubItem.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

</div>)



};

export default MenuPrincipal;