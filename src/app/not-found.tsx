import Link from 'next/link'
import { Button } from '@nextui-org/react'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">¡No encontrado – 404!</h1>
            <div className="mb-4">
                <Link href="/">
                    <Button color="primary">Volver a Inicio</Button>
                </Link>
            </div>
        </div>
    )
}

