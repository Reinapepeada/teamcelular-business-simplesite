"use server";

import { cookies } from "next/headers";
import { redirect } from 'next/navigation'
// traer las varaiables de entorno

const apiUrl = process.env.NEXT_PUBLIC_API_URL 

export async function getbranches() {
    // Aqui se envian aca se hace la req
    
    let response = await fetch(`${apiUrl}/branches/get/all`
        ,
        { method: 'GET',
            cache: 'no-store', 
            headers: { 
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        if (data == undefined) {
            throw Error(data.message || "Get branchs failed");
        } else {
            return data;
        }
}

export async function createBranch({ name, location }: { name: string; location: string }) {
    let response = await fetch(`${apiUrl}/branches/create`
        ,
        { method: 'POST',
            cache: 'no-store', 
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, location })
        });
        const data = await response.json();
        if (data == undefined) {
            throw Error(data.message || "Create branch failed");
        } else {
            return data;
        }
}