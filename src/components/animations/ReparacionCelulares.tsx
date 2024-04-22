'use client'
import React from 'react';
import {Image} from "@nextui-org/react";
import { motion, useAnimation } from 'framer-motion';
import NextImage from "next/image";

const ReparacionCelular = () => {

 

  return (
    


      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center"
      >
        <Image
          alt="Reparacion de Celulares"
          src="/celu.png"
          as={NextImage}
          width={1000}
          height={1000}
        />
      </motion.div>      
   
  );
};

export default ReparacionCelular;