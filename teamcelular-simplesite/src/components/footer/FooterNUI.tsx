"use client";
import React from "react";

import { Divider } from "@nextui-org/react";

export default function FooterNUI() {
    return (
        <footer className="flex flex-col justify-center max-w-screen-2xl ">
            <div
                className="flex flex-row justify-between
                
                items-center 
                ">
                <p className="text-tiny">© 2024 Team Celular</p>
                <div className="flex flex-row justify-end items-center space-x-4">
                    <img
                        src="/images/facebook.png"
                        alt="facebook"
                        className="h-6"
                    />
                    <img
                        src="/images/instagram.png"
                        alt="instagram"
                        className="h-6"
                    />
                    <img
                        src="/images/twitter.png"
                        alt="twitter"
                        className="h-6"
                    />
                </div>
            </div>
        </footer>
    );
}
