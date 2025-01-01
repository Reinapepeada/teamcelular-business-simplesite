"use server";

import { cookies } from "next/headers";
import { redirect } from 'next/navigation'
// traer las varaiables de entorno

const apiUrl = process.env.NEXT_PUBLIC_API_URL 

export async function getcategories() {
    // Aqui se envian aca se hace la req
    
    let response = await fetch(`${apiUrl}/categories/get/all`
        ,
        { method: 'GET',
            cache: 'no-store', 
            headers: { 
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        if (data == undefined) {
            throw Error(data.message || "Get brands failed");
        } else {
            return data;
        }
}

export async function createCategory({ name, description }: { name: string; description: string }) {
    // Aqui se envian aca se hace la req
    let response = await fetch(`${apiUrl}/categories/create`,
        {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description })
        });
    const data = await response.json();
    if (data == undefined) {
        throw Error(data.message || "Create category failed");
    } else {
        return data;
    }
}