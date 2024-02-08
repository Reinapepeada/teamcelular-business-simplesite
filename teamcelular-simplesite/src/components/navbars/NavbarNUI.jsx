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

export default function NavbarNUI() {
    return (
        <Navbar className="black" position="sticky" maxWidth="2xl">
            <NavbarBrand>
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
                    <Button  as={Link} color="primary" href="#" variant="shadow">
                        Contacto Rapido
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarItem>
                <ThemeSwitcher></ThemeSwitcher>
            </NavbarItem>
        </Navbar>
    );
}
