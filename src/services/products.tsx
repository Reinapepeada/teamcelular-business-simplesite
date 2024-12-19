import { redirect } from 'next/navigation'

// traer las varaiables de entorno

export const imgBBKey = process.env.NEXT_PUBLIC_IMGBB_KEY
export const apiUrl = process.env.NEXT_PUBLIC_API_URL 

export async function createProduct(formData:any) {
    console.log(JSON.stringify(formData));
    // Aqui se envian aca se hace la req
    console.log("llamando a la api")
    
    try {
        let response = await fetch(`${apiUrl}/products/create`, {
            method: 'POST',
            body: JSON.stringify(formData),
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // CORS header
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.json();
        console.log('Product created successfully:', data);
        return data;
    } catch (error) {
        console.error('Error creating product:', error);
    }
}

export async function getProductById (product_id:number) {
    console.log(product_id);
    // Aqui se envian aca se hace la req
    
    let response = await fetch(`${apiUrl}/products/get?product_id=${product_id}`
        ,
        { method: 'GET',
            cache: 'no-store', 
            headers: { 
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        if (data.getProductById == undefined) {
            throw Error(data.message || "Get product failed");
        } else {
            return data.getProductById;
        }
}

export async function getAllProductsPaginated (page:number, limit:number) {
    console.log(page, limit);
    // Aqui se envian aca se hace la req
    
    let response = await fetch(`${apiUrl}/products/get/all?page=${page}&limit=${limit}`
        ,
        { method: 'GET',
            cache: 'no-store', 
            headers: { 
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        if (data.getAllProductsPaginated == undefined) {
            throw Error(data.message || "Get all products failed");
        } else {
            return data.getAllProductsPaginated;
        }
}

export async function updateProduct (formData:any) {
    console.log(JSON.stringify(formData));
    // Aqui se envian aca se hace la req
    
    let response = await fetch(`${apiUrl}/products/update?product_id=${formData.product_id}`
        ,
        { method: 'PUT',
            body: JSON.stringify(formData),
            cache: 'no-store', 
            headers: { 
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        if (data.updateProduct == undefined) {
            throw Error(data.message || "Update product failed");
        } else {
            redirect("/products");
        }
}

export async function deleteProduct (formData:any) {
    console.log(JSON.stringify(formData));
    // Aqui se envian aca se hace la req
    
    let response = await fetch(`${apiUrl}/products/delete?product_id=${formData.product_id}`
        ,
        { method: 'DELETE',
            body: JSON.stringify(formData),
            cache: 'no-store', 
            headers: { 
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        if (data.deleteProduct == undefined) {
            throw Error(data.message || "Delete product failed");
        } else {
            redirect("/products");
        }
}

type variants={
    "variants": [
      {
        "product_id": number,
        "color": string,
        "size": string,
        "size_unit" : string,
        "unit" : string,
        "branch_id": number,
        "stock": number,
        "min_stock": number,
        "images": [string]
      }
    ]
  }

export async function createProductVariants(formData:any) {
    console.log(JSON.stringify(formData));
    // Aqui se envian aca se hace la req
    
    try {
        let response = await fetch(`${apiUrl}/products/create/variant`, {
            method: 'POST',
            body: JSON.stringify(formData),
            cache: 'no-store', 
            headers: { 
                'Content-Type': 'application/json',
               'AccessControlAllowOrigin': '*'
            }
        });
        const data = await response.json();
        // if (!data[0].id) {
        //     throw Error(data.message || "Create product variants failed");
        // } 
        return data;
    } catch (error) {
        console.error('Error creating product variants:', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}
type variantUpdate = {
    color?: string,
    size?: string,
    size_unit?: string,
    unit?: string,
    branch_id?: number,
    stock?: number,
    min_stock?: number,
    images?: string[]
}

export async function updateProductVariant (formData:variantUpdate) {
    console.log(JSON.stringify(formData));
    // Aqui se envian aca se hace la req
    
    let response = await fetch(`${apiUrl}/products/update/variant`
        ,
        { method: 'PUT',
            body: JSON.stringify(formData),
            cache: 'no-store', 
            headers: { 
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        if (data.updateProductVariant == undefined) {
            throw Error(data.message || "Update product variant failed");
        } else {
            redirect("/products");
        }
}

export async function uploadImagesToimgBB(images: File[]): Promise<string[]> {
    try {
        const uploadedImages = await Promise.all(
            images.map(async (image) => {
                const formData = new FormData();
                formData.append("image", image);
                const response = await fetch(
                    `https://api.imgbb.com/1/upload?key=${imgBBKey}`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );
                const data = await response.json();
                return data.data.url;
            })
        );
        console.log("Images uploaded successfully:", uploadedImages);
        return uploadedImages; // Return the uploaded images URLs
    } catch (error) {
        console.error("Error uploading images to imgBB:", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}