"";
import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
} from "@nextui-org/react";
import ThemeSwitcher from "../switch/ThemeSwitcher";
import { BsWhatsapp } from "react-icons/bs";

export default function NavbarNUI() {
    return (
        <Navbar className="black m-5" maxWidth="2xl">
            <NavbarBrand>
                <img
                    className="w-11 h-15 m-3"
                    src="/images/teamcelular.png"
                    alt="Team Celular"
                />
                <p className="font-bold text-inherit">Team Celular</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive>
                    <Link href="#">Reparaciones</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#" aria-current="page">
                        Productos
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Contacto
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Sobre Nosotros
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button
                        as={Link}
                        color="primary"
                        href="https://wa.me/5491151034595?text=Muy%20buen%20d%C3%ADa%21%20Tengo%20una%20duda."
                        variant="shadow">
                        Contacto Rapido
                        <BsWhatsapp />
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarItem>
                <ThemeSwitcher></ThemeSwitcher>
            </NavbarItem>
        </Navbar>
    );
}
