"use client";
import React, { useEffect } from "react";

export default function FaviconSwitch() {
    useEffect(() => {
        const prefersDarkMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        const favicon = document.querySelector(
            'link[rel="icon"]'
        ) as HTMLLinkElement;

        if (prefersDarkMode) {
            favicon.href = "/favicon/favicon-dark.png";
        } else {
            favicon.href = "/favicon/favicon-light.png";
        }
    }, []);
    return (
        <>
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/favivon/apple-touch-icon.png"></link>
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon/favicon-light.png"></link>
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon/favicon-light.png"></link>
            <link rel="manifest" href="/favicon/site.webmanifest"></link>
            <link
                rel="mask-icon"
                href="/favicon/safari-pinned-tab.svg"
                color="#5bbad5"></link>
            <meta name="msapplication-TileColor" content="#da532c"></meta>
            <meta name="theme-color" content="#ffffff"></meta>
        </>
    );
}
