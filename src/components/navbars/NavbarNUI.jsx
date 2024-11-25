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
        "Reparaciones",
        "Productos",
        "Contacto",
        "Tienda",
        "Sobre Nosotros"
    ];

    return (
        <Navbar isBordered maxWidth="2xl">
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarContent className="sm:hidden " justify="center">
                <NavbarBrand>
                    <Link href="/" className="text-inherit">
                        <Image
                            className="w-11 h-15"
                            src="/images/teamcelular.webp"
                            alt="Logo de Team Celular reparacion celulares"
                            width={100}
                            height={200}
                        />
                        {/* <p className="font-bold text-white text-xl text-inherit">
                            Team Celular
                        </p> */}
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent  justify="start">
                <NavbarBrand className="hidden pr-3 sm:flex ">
                    <Link className="text-inherit" href="/">
                        <Image
                            className="h-11 w-15 mr-2"
                            src="/images/teamcelular.webp"
                            alt="Team Celular"
                            width={483}
                            height={612}
                        />
                        <p className="font-bold text-xl text-inherit">
                            Team Celular
                        </p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden  sm:flex gap-4" justify="center">
                <NavbarItem isActive>
                    <Link href="/presupuesto-reparacion" color="primary">
                        Reparaciones
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        color="foreground"
                        href="/productos"
                        aria-current="page">
                        Productos
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
                        color="primary"
                        href="https://wa.me/5491151034595?text=Muy%20buen%20d%C3%ADa%21%20Tengo%20una%20duda."
                        variant="shadow"
                        size="md"
                        area-label="Whatsapp"
                        className="flex items-center justify-center">
                        <p className="hidden sm:flex">Preguntas</p>
                        <BsWhatsapp size={20} />
                    </Button>
                  <ResumeCartNav/>
                </NavbarItem>
                <NavbarItem>
                    <ThemeSwitcher></ThemeSwitcher>
                </NavbarItem>
                <NavbarItem>
                </NavbarItem>
                  
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => {
                    const getMenuLink = (idx) => {
                        switch (idx) {
                            case 0: return "/presupuesto-reparacion";
                            case 1: return "/productos";
                            case 2: return "/contacto";
                            case 3: return "/tienda";
                            default: return "/sobrenosotros";
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
