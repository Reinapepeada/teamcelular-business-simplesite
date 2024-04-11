import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
} from "@nextui-org/react";

export default function Contacto() {
    return (
        <div>
            <Card className="m-5 p-5" shadow="md">
                <CardHeader>
                    <div className="flex flex-col space-y-5">
                        <h1 className="font-bold text-4xl">Contacto</h1>
                        <p className="text-md">
                            ¿Tenés alguna duda? ¡Usa estos datos para
                            encontrarnos!
                        </p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="flex flex-col md:flex-row justify-center  p-2 ">
                        <div className="space-y-4 md:mr-32 my-5 md:w-1/2 ">
                            <div className="flex flex-col">
                                <h2 className="font-bold text-xl">Dirección</h2>
                                <p className="text-lg">Av. Corrientes 1234</p>
                            </div>
                            <div className="flex flex-col">
                                <h2 className="font-bold text-xl">Teléfono</h2>
                                <p className="text-lg"> 1234-5678</p>
                            </div>
                            <div className="flex flex-col">
                                <h2 className="font-bold text-xl">Email</h2>
                                <p className="text-lg">
                                    teamcelular.arg@gmail.com
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <h2 className="font-bold text-xl">
                                    Horario de atención
                                </h2>
                                <p className="text-lg">
                                    Lunes a Viernes de 10 a 18hs
                                </p>
                            </div>
                        </div>
                        <div className="w-full p-1 md:w-1/2">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.262305984237!2d-58.40523692350382!3d-34.59752805717274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb9f6e9910cb%3A0xb492115ba59bc4f2!2sTeam%20celular%20%7C%20Reparacion%20de%20celulares%20%7C%20Reparacion%20de%20computadoras!5e0!3m2!1ses!2sar!4v1712864201522!5m2!1ses!2sar"
                                className="w-full h-96 rounded-lg"
                                loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </CardBody>
                <Divider />
                <CardFooter>Footer</CardFooter>
            </Card>
        </div>
    );
}
