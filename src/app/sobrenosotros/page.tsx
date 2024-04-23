import React from 'react';
import Image from 'next/image';
import {Metadata} from 'next'


export const metadata: Metadata = {
  title: 'Sobre Nosotros',
  description: 'Conoce más sobre nuestra empresa y nuestra misión, visión y valores.',

}

const SobreNosotros = () => {
  return (
    <div className=" min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-3xl p-8 bg- rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Sobre Nosotros</h1>
        <p className="text-gray-400 mb-6">
          Somos una empresa familiar dedicada a las soluciones tecnológicas y al servicio de reparación de celulares y computadoras. Con más de <span className="font-bold">15 años de experiencia</span>, hemos estado ofreciendo nuestros servicios en <span className="font-bold">Buenos Aires, Panamá y Venezuela</span> y vamos por mas.
        </p>
        <div className="relative h-72 w-full mb-6">
          
          <Image
            src="/images/empresaFamiliar.webp"
            alt="Nuestra oficina"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Nuestra Misión</h2>
            <p className="text-gray-400">
              Proporcionar <span className="font-semibold">soluciones tecnológicas de alta calidad</span> y servicios de reparación confiables a nuestros clientes. Nos esforzamos por superar las expectativas y garantizar la satisfacción total.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Nuestra Visión</h2>
            <p className="text-gray-400">
              Ser reconocidos como el proveedor líder de <span className="font-semibold">soluciones tecnológicas y servicios de reparación en toda América Latina</span>. Queremos ser la primera opción para quienes buscan excelencia y confianza.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Nuestros Valores</h2>
          <ul className="list-disc list-inside text-gray-400">
            <li><span className='font-bold'> Excelencia </span>: Buscamos la perfección en todo lo que hacemos.</li>
            <li><span className='font-bold'> Innovación </span>: Siempre estamos explorando nuevas formas de resolver problemas.</li>
            <li><span className='font-bold'> Compromiso </span>: Nos dedicamos a nuestros clientes y sus necesidades.</li>
            <li><span className='font-bold'> Integridad </span>: Actuamos con honestidad y transparencia en todo momento.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SobreNosotros;
