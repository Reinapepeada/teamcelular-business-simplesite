import React from 'react'
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { IoMdConstruct } from "react-icons/io";

export default function WorkInProgress() {
  return (
    <div className="flex flex-col items-center justify-center h-screen m-3 p-2">
            <div className="mb-4 flex flex-col justify-center items-center text-center">
                <IoMdConstruct size={48} color="green" className="mb-1" />
                <h2 className="text-success mb-5">200</h2>
                <h1 className="text-4xl font-bold mb-4">
                    ¡Estamos Construyendo este apartado para ti!
                </h1>
                <h3 className="text-xl">
                    Pero no te preocupes, pronto disponible.
                </h3>
            </div>
            <div className="mb-4">
                <Link href="/">
                    <Button color="primary">Volver a Inicio</Button>
                </Link>
            </div>
        </div>
  )
}
