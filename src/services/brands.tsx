"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'
// traer las varaiables de entorno

const apiUrl = process.env.NEXT_PUBLIC_API_URL 

export async function getbrands() {
    // Aqui se envian aca se hace la req
    
    let response = await fetch(`${apiUrl}/brands/get/all`
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

export async function createBrand(brand:any) {
    // Aqui se envian aca se hace la req
    let response = await fetch(`${apiUrl}/brands/create`
        ,
        { method: 'POST',
            cache: 'no-store', 
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(brand)
        });
        const data = await response.json();
        if (data == undefined) {
            alert("Create brand failed")
            throw Error(data.message || "Create brand failed");
        } else {
            return data;
        }
}