"use server";

import { cookies } from "next/headers";
import { redirect } from 'next/navigation'
// traer las varaiables de entorno

const apiUrl = process.env.NEXT_PUBLIC_API_URL 

export async function getproviders() {
    // Aqui se envian aca se hace la req
    
    let response = await fetch(`${apiUrl}/providers/get/all`
        ,
        { method: 'GET',
            cache: 'no-store', 
            headers: { 
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        if (data == undefined) {
            throw Error(data.message || "Get providers failed");
        } else {
            return data;
        }
}

interface Provider {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export async function createProvider({ name, email, phone, address}: Provider) {
    // Aqui se envian aca se hace la req
    let response = await fetch(`${apiUrl}/providers/create`
        ,
        { method: 'POST',
            cache: 'no-store', 
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, phone, address})
        });
        const data = await response.json();
        if (data == undefined) {
            throw Error(data.message || "Create provider failed");
        } else {
            return data;
        }
}