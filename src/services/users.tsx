"use server";

import { cookies } from "next/headers";
import { redirect } from 'next/navigation'
// traer las varaiables de entorno

const apiUrl = process.env.NEXT_PUBLIC_API_URL 

export async function loginAction(formData:any) {
    console.log(JSON.stringify(formData));
    // Aqui se envian aca se hace la req
    
    let response = await fetch(`${apiUrl}/users/login`
        ,{ method: 'POST',
            body: JSON.stringify(formData),
            cache: 'no-store', 
            headers: { 
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        if (data.loginUser == undefined) {
            throw Error(data.message || "Login failed");
        } else {
            (await cookies()).set("token", data.loginUser, { secure: true });
            // Puedes también realizar otras acciones con el token si es necesario
            console.log("Token guardado en las cookies", data.loginUser);
            return data;   
        }
};

export async function signUp (formData:any) {

    console.log(JSON.stringify(formData));
    // Aqui se envian aca se hace la req
    let response = await fetch(`${apiUrl}/users/signup`,
        {
            method: 'POST',
            body: JSON.stringify(formData),
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );
    const data = await response.json();
    if (data.signupUser == undefined) {
        throw Error(data.message || "Signup failed");
    } else {
        redirect("/login");
    }
}

export async function logout() {
    (await cookies()).delete("token");
    const cookiesList = cookies();
    const hasCookie = (await cookiesList).has("token");
    if (hasCookie) {
        throw Error("Logout failed");
    } else {
        console.log("Token eliminado de las cookies");
    }
}

export async function forgetPassword(formData:any) {

    console.log(JSON.stringify(formData));
    // Aqui se envian aca se hace la req
    let response = await fetch(`${apiUrl}/users/forget-password`,
        {
            method: 'POST',
            body: JSON.stringify(formData),
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );
    const data = await response.json();
    if (data.forgetPassword == undefined) {
        throw Error(data.message || "Forget password failed");
    } else {
        redirect("/login");
    }
}

export async function recoverPassword(formData:any) {

    console.log(JSON.stringify(formData));
    // Aqui se envian aca se hace la req
    let response = await fetch(`${apiUrl}/users/recover-password`,
        {
            method: 'POST',
            body: JSON.stringify(formData),
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );
    const data = await response.json();
    if (data.recoverPassword == undefined) {
        throw Error(data.message || "Recover password failed");
    } else {
        redirect("/login");
    }
}

export default async function GetUserDetails() {
    let response = await fetch(`${apiUrl}/users/details`,
        {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${(await cookies()).get("token")}`
            }
        }
    );
    const data = await response.json();
    if (data.details == undefined) {
        throw Error(data.message || "Get user details failed");
    } else {
        return data;
    }
}

// updateuser type

export async function UpdateUser(updateuser: any) {
    let response = await fetch(`${apiUrl}/users/update`,
        {
            method: 'PUT',
            body: JSON.stringify(updateuser),
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${(await cookies()).get("token")}`
            }
        }
    );
    const data = await response.json();
    if (data.updateUser == undefined) {
        throw Error(data.message || "Update user failed");
    } else {
        return data;
    }
}