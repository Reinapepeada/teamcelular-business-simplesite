import React from 'react';
import Image from 'next/image';

const ReparacionCelular = () => {

 

  return (
    
        <Image
          alt="Reparación de Celulares"
          src="/celu.webp"
          loading='lazy'
          width={500}
          height={500}
          sizes="(max-width: 768px) 100vw, 500px"
        />   
  );
};

export default ReparacionCelular;
