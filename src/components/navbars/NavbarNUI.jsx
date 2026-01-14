import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
} from "@nextui-org/react";
import ThemeSwitcher from "../switch/ThemeSwitcher";
import { BsWhatsapp } from "react-icons/bs";
import Image from "next/image";
import ResumeCartNav from "../cart/resume_cart_nav";

export default function NavbarNUI() {
    const menuItems = [
        "Arreglo de celulares",
        "Zonas",
        "Guías",
        "Tienda",
        "Contacto",
        "Sobre Nosotros",
    ];

    return (
        <Navbar  maxWidth="2xl">
            <NavbarContent className="" justify="start">
                <NavbarItem className="nav:hidden">
                    <NavbarMenuToggle className="w-12 h-12" />
                </NavbarItem>
                <NavbarItem className="flex items-center">
                    <Link href="/" className="flex items-center gap-3 text-inherit">
                        <Image
                            className="h-10 w-auto dark:hidden"
                            src="/images/brand/imagotipo-light.png"
                            alt="Team Celular"
                            width={1725}
                            height={591}
                            sizes="(max-width: 640px) 140px, 170px"
                            priority
                        />
                        <Image
                            className="hidden h-10 w-auto dark:block"
                            src="/images/brand/imagotipo-dark.png"
                            alt="Team Celular"
                            width={1725}
                            height={591}
                            sizes="(max-width: 640px) 140px, 170px"
                            priority
                        />
                    </Link>
                </NavbarItem>
            </NavbarContent>

    

            <NavbarContent className="hidden nav:flex gap-4" justify="center">
                <NavbarItem isActive>
                    <Link href="/arreglo-de-celulares" color="primary">
                        Arreglo de celulares
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/zonas">
                        Zonas
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        color="foreground"
                        href="/guias"
                        aria-current="page">
                        Guías
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        color="foreground"
                        href="/tienda"
                        aria-current="page">
                        Tienda
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/contacto">
                        Contacto
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/sobrenosotros">
                        Sobre Nosotros
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="" justify="end">
                <NavbarItem className="flex items-center gap-2">
                    <Button
                        as={Link}
                        color="secondary"
                        href="/presupuesto-reparacion#solicitar-presupuesto"
                        variant="shadow"
                        size="md"
                        className="hidden nav:flex bg-gradient-to-r from-primary to-secondary text-white font-semibold">
                        Presupuesto
                    </Button>
                    <Button
                        as={Link}
                        color="success"
                        href="https://wa.me/5491151034595?text=Hola%21%20Quiero%20pedir%20un%20presupuesto%20de%20reparaci%C3%B3n."
                        variant="flat"
                        size="md"
                        aria-label="WhatsApp"
                        className="flex items-center justify-center">
                        <p className="hidden sm:flex">WhatsApp</p>
                        <BsWhatsapp size={20} />
                    </Button>
                    <ResumeCartNav />
                </NavbarItem>
                <NavbarItem>
                    <ThemeSwitcher></ThemeSwitcher>
                </NavbarItem>
                <NavbarItem></NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => {
                    const getMenuLink = (idx) => {
                        switch (idx) {
                            case 0:
                                return "/arreglo-de-celulares";
                            case 1:
                                return "/zonas";
                            case 2:
                                return "/guias";
                            case 3:
                                return "/tienda";
                            case 4:
                                return "/contacto";
                            default:
                                return "/sobrenosotros";
                        }
                    };

                    return (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                className="w-full"
                                color={index === 0 ? "primary" : "foreground"}
                                href={getMenuLink(index)}
                                size="lg">
                                {item}
                            </Link>
                        </NavbarMenuItem>
                    );
                })}
            </NavbarMenu>
        </Navbar>
    );
}
