import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Image,
    Button,
} from "@nextui-org/react";

export default function CoverLeguend() {
    return (
        <Card
            isFooterBlurred
            className="w-full h-[300px] col-span-12 sm:col-span-5">
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                    New
                </p>
                <h4 className="text-black font-medium text-2xl">Acme camera</h4>
            </CardHeader>
            <video autoPlay 
            
            loop
            muted
            className="w-full h-full object-cover"
            >
                
                <source src="microscopioVideo.mp4" type="video/mp4" />
            </video>
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                <div>
                    <p className="text-black text-tiny">Available soon.</p>
                    <p className="text-black text-tiny">Get notified.</p>
                </div>
                <Button
                    className="text-tiny"
                    color="primary"
                    radius="full"
                    size="sm">
                    Notify Me
                </Button>
            </CardFooter>
        </Card>
    );
}
