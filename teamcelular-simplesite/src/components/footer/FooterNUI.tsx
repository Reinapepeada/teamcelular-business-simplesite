"use client";
import React from "react";

import {
    
    Divider,
} from "@nextui-org/react";

const rows = [
    {
        key: "1",
        name: "Tony Reichert",
        role: "CEO",
        status: "Active",
    },
    {
        key: "2",
        name: "Zoey Lang",
        role: "Technical Lead",
        status: "Paused",
    },
    {
        key: "3",
        name: "Jane Fisher",
        role: "Senior Developer",
        status: "Active",
    },
    {
        key: "4",
        name: "William Howard",
        role: "Community Manager",
        status: "Vacation",
    },
];

const columns = [
    {
        key: "contacto",
        label: "CONTACTO",
    },
    {
        key: "ubicacion",
        label: "UBICACION",
    },
    {
        key: "condiciones",
        label: "CONDICIONES",
    },
];

export default function FooterNUI() {
    return (
        <footer className="flex justify-center  ">
            <div className="w-3/4 flex flex-row justify-center items-center  ">
                <img src="/images/teamcelular.png" alt="logo Team Celular" className="h-1/3" />
                
                <Divider orientation="vertical" className="m-6 h-1/3" />
                <div className="flex flex-col  items-center w-[82rem]">
                    <div className="flex flex-row justify-center items-center space-x-12">
                        <div className="flex flex-col justify-center items-center">
                            <h5 className="text-lg font-bold">Contacto</h5>
                            <h5 className="text-sm">+54 9 11 1234 5678</h5>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <h5 className="text-lg font-bold">Ubicación</h5>
                            <h5 className="text-sm">Av. Corrientes 1234</h5>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <h5 className="text-lg font-bold">Condiciones</h5>
                            <h5 className="text-sm">Términos y condiciones</h5>
                        </div>
                    </div>
                    <Divider className="m-2" />
                    <h1 className="text-lg font-bold">Team Celular</h1>
                    <p className="text-tiny">Reparación y Accesorios de celulares</p>
                    <p className="text-tiny">© 2024 Team Celular</p>
                
                </div>

                
            </div>
        </footer>
    );
}
