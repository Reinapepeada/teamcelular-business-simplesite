'use client'
import React from 'react';
import {Image} from "@nextui-org/react";
import NextImage from "next/image";

const ReparacionCelular = () => {

 

  return (
    
        <Image
          alt="Reparacion de Celulares"
          src="/celu.png"
          loading='eager'
          as={NextImage}
          width={500}
          height={500}
        />
          
   
  );
};

export default ReparacionCelular;