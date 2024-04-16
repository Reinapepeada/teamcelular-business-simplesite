import Link from "next/link";
import { Button } from "@nextui-org/react";

import { FaExclamationCircle } from "react-icons/fa";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen m-3 p-2">
            <div className="mb-4 flex flex-col justify-center items-center text-center">
                <FaExclamationCircle size={48} color="red" className="mb-1"/>
                <h2 className="text-warning mb-5">404</h2>
                <h1 className="text-4xl font-bold mb-4">
                    ¡No hemos encontrado la página a la que quieres acceder!
                </h1>
                <h3 className="text-xl">
                    Pero no te preocupes, puedes volver a inicio
                </h3>
            </div>
            <div className="mb-4">
                <Link href="/">
                    <Button color="primary">Volver a Inicio</Button>
                </Link>
            </div>
        </div>
    );
}
