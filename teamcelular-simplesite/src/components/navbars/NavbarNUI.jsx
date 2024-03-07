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

export default function NavbarNUI() {
    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    return (
        <Navbar disableAnimation isBordered maxWidth="2xl">
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarContent className="sm:hidden pr-3 " justify="center">
                <NavbarBrand>
                    <img
                        className="w-11 h-15 "
                        src="/images/teamcelular.png"
                        alt="Team Celular"
                    />
                    <p className="font-bold text-inherit">Team Celular</p>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden pr-3 sm:flex " justify="start">
                <NavbarBrand>
                    <img
                        className="w-11 h-15 m-1"
                        src="/images/teamcelular.png"
                        alt="Team Celular"
                    />
                    <p className="font-bold text-inherit">Team Celular</p>
                </NavbarBrand>
            </NavbarContent>

               
            <NavbarContent className="hidden  sm:flex gap-4" justify="center">
                <NavbarItem isActive>
                    <Link href="#">Reparaciones</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/productos" aria-current="page">
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
                <NavbarItem>
                    <Button
                        as={Link}

                        color="primary"
                        href="https://wa.me/5491151034595?text=Muy%20buen%20d%C3%ADa%21%20Tengo%20una%20duda."
                        variant="shadow"
                        size="md"
                        >
                        Contacto
                        <BsWhatsapp />
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <ThemeSwitcher></ThemeSwitcher>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            color={
                                index === 2
                                    ? "warning"
                                    : index === menuItems.length - 1
                                    ? "danger"
                                    : "foreground"
                            }
                            href="#"
                            size="lg">
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
