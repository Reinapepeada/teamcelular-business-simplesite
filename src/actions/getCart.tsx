import Cookies from 'js-cookie';

export default async function getCookieCart() {
    // Aqui vemos el form

    //   console.log(JSON.stringify(formData));
    //   // Aqui se envian aca se hace la req
    //   const options = {
    //     method: 'POST',
    //     cache: 'no-store', 
    //     headers: { 
    //     'Content-Type': 'application/json',
    //     "Access-Control-Allow-Origin": "*",
    //     },
    //     body: JSON.stringify(formData),
    //     };

    //     let response = await fetch('http://localhost:4050/api/users/login', options);
    //     const data = await response.json();
    //     // console.log(data);
    // if (cartData == undefined) {
    //   throw Error("no se escuentra el carrito");
    // } else {
    let cart = Cookies.get("cart");
    //   console log de las cookies
    console.log(Cookies.get());
    // cookies.set("token", data.token,{secure:true});
    // Puedes también realizar otras acciones con el token si es necesario
    console.log("carrito guardado en las cookies", cart);
    return cart;
    // }
}