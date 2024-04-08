import React from 'react';
import Image from 'next/image';

const SobreNosotros = () => {
  return (
    <div className=" min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-3xl p-8 bg- rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Sobre Nosotros</h1>
        <p className="text-gray-600 mb-6">
          Somos una empresa familiar dedicada a las soluciones tecnológicas y al servicio de reparación de celulares y computadoras. Con más de <span className="font-semibold">10 años de experiencia</span>, hemos estado ofreciendo nuestros servicios en <span className="font-semibold">Buenos Aires</span> y más allá.
        </p>
        <div className="relative h-48 w-full mb-6">


          
          <Image
            src="/path_to_your_image.jpg"
            alt="Nuestra oficina"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Nuestra Misión</h2>
            <p className="text-gray-600">
              Proporcionar <span className="font-semibold">soluciones tecnológicas de alta calidad</span> y servicios de reparación confiables a nuestros clientes. Nos esforzamos por superar las expectativas y garantizar la satisfacción total.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Nuestra Visión</h2>
            <p className="text-gray-600">
              Ser reconocidos como el proveedor líder de <span className="font-semibold">soluciones tecnológicas y servicios de reparación en toda América Latina</span>. Queremos ser la primera opción para quienes buscan excelencia y confianza.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Nuestros Valores</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Excelencia: Buscamos la perfección en todo lo que hacemos.</li>
            <li>Innovación: Siempre estamos explorando nuevas formas de resolver problemas.</li>
            <li>Compromiso: Nos dedicamos a nuestros clientes y sus necesidades.</li>
            <li>Integridad: Actuamos con honestidad y transparencia en todo momento.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SobreNosotros;
