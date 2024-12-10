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