import React from "react";
// fonts
import { Sora } from "next/font/google";
const sora = Sora({ subsets: ["latin"], weight: "300" });
// icons
import {
  BsFacebook,
  BsInstagram,
  BsWhatsapp,
  BsEnvelope,
  BsGeoAlt,
  BsTelephone,
  BsClock,
} from "react-icons/bs";
import {
  FaApple,
  FaMobileAlt,
  FaTools,
  FaBuilding,
  FaShieldAlt,
} from "react-icons/fa";
//Elements
import Link from "next/link";
import Image from "next/image";

const footerSections = {
  servicios: [
    {
      name: "Reparación de iPhone",
      href: "/guias/reparacion-iphone-buenos-aires",
      icon: FaApple,
    },
    {
      name: "Reparación de Celulares",
      href: "/presupuesto-reparacion",
      icon: FaMobileAlt,
    },
    {
      name: "Microelectrónica y Reballing",
      href: "/guias/microelectronica-reballing-caba",
      icon: FaTools,
    },
    {
      name: "Soporte para Empresas",
      href: "/guias/soporte-empresas-servicio-tecnico",
      icon: FaBuilding,
    },
    {
      name: "Mantenimiento Preventivo",
      href: "/guias/mantenimiento-preventivo-celulares",
      icon: FaShieldAlt,
    },
  ],
  guias: [
    { name: "Todas las Guías", href: "/guias" },
    { name: "Reparación iPhone", href: "/guias/reparacion-iphone-buenos-aires" },
    { name: "Microelectrónica", href: "/guias/microelectronica-reballing-caba" },
    {
      name: "Mantenimiento Preventivo",
      href: "/guias/mantenimiento-preventivo-celulares",
    },
    {
      name: "Soporte Empresas",
      href: "/guias/soporte-empresas-servicio-tecnico",
    },
  ],
  recursos: [
    { name: "Tienda Online", href: "/tienda" },
    { name: "Solicitar Presupuesto", href: "/presupuesto-reparacion" },
    { name: "Sobre Nosotros", href: "/sobrenosotros" },
    { name: "Contacto", href: "/contacto" },
  ],
};

export default function FooterNUI() {
  return (
    <footer className="relative bg-footer-background w-full text-white mt-16 overflow-hidden">
      {/* Contenido del Footer */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Columna 1: Team Celular Info */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3 mb-2">
              <Image
                src="/celu.webp"
                alt="Team Celular Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <h3 className={`${sora.className} text-2xl font-bold`}>
                TEAM CELULAR
              </h3>
            </div>
            <p className="text-sm text-slate-300">
              Más de 15 años de experiencia en reparación profesional de
              celulares en Buenos Aires.
            </p>

            {/* Redes Sociales */}
            <div className="flex space-x-4 pt-4">
              <Link
                aria-label="WhatsApp"
                href="https://wa.me/5491151034595?text=Hola%21%20Necesito%20información"
                target="_blank"
                className="hover:text-green-400 transition-colors"
              >
                <BsWhatsapp size={24} />
              </Link>
              <Link
                aria-label="Instagram"
                href="https://www.instagram.com/teamcelular"
                target="_blank"
                className="hover:text-pink-400 transition-colors"
              >
                <BsInstagram size={24} />
              </Link>
              <Link
                aria-label="Facebook"
                href="https://www.facebook.com/teamcelular"
                target="_blank"
                className="hover:text-blue-400 transition-colors"
              >
                <BsFacebook size={24} />
              </Link>
            </div>

            {/* Horarios */}
            <div className="flex items-start space-x-2 text-sm pt-2">
              <BsClock className="mt-1 flex-shrink-0 text-primary" />
              <div>
                <p className="font-semibold">Horario de Atención</p>
                <p className="text-slate-300">Lunes a Viernes</p>
                <p className="text-slate-300">10:30 - 18:00hs</p>
              </div>
            </div>
          </div>

          {/* Columna 2: Servicios */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-lg font-bold mb-2 text-primary">Servicios</h4>
            {footerSections.servicios.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link
                  key={index}
                  href={service.href}
                  className="flex items-center space-x-2 text-sm text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200"
                >
                  <Icon className="text-primary" />
                  <span>{service.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Columna 3: Guías y Recursos */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-lg font-bold mb-2 text-secondary">
              Guías Técnicas
            </h4>
            {footerSections.guias.map((guia, index) => (
              <Link
                key={index}
                href={guia.href}
                className="text-sm text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200"
              >
                {guia.name}
              </Link>
            ))}

            <div className="h-px w-full bg-white/10 my-8" />

            <h4 className="text-lg font-bold mb-2 text-secondary">Recursos</h4>
            {footerSections.recursos.map((recurso, index) => (
              <Link
                key={index}
                href={recurso.href}
                className="text-sm text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200"
              >
                {recurso.name}
              </Link>
            ))}
          </div>

          {/* Columna 4: Contacto */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-lg font-bold mb-2 text-primary">Contacto</h4>

            <div className="flex items-start space-x-3 text-sm">
              <BsGeoAlt className="mt-1 flex-shrink-0 text-primary" />
              <div>
                <p className="font-semibold">Dirección</p>
                <p className="text-slate-300">Paraguay 2451</p>
                <p className="text-slate-300">Recoleta, CABA</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-sm">
              <BsTelephone className="mt-1 flex-shrink-0 text-primary" />
              <div>
                <p className="font-semibold">Teléfono</p>
                <Link
                  href="tel:+5491151034595"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  +54 11 5103-4595
                </Link>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-sm">
              <BsEnvelope className="mt-1 flex-shrink-0 text-primary" />
              <div>
                <p className="font-semibold">Email</p>
                <Link
                  href="mailto:teamcelular.arg@gmail.com"
                  className="text-slate-300 hover:text-white transition-colors break-all"
                >
                  teamcelular.arg@gmail.com
                </Link>
              </div>
            </div>

            <Link href="/contacto" className="pt-2">
              <button className="w-full bg-primary hover:bg-primary/80 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                Ver Ubicación
              </button>
            </Link>
          </div>
        </div>

        <div className="h-px w-full bg-white/10 my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-slate-400">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <p>© 2025 Team Celular. Todos los derechos reservados.</p>
            <div className="flex space-x-4">
              <Link
                href="/terminos"
                className="hover:text-white transition-colors"
              >
                Términos
              </Link>
              <Link
                href="/privacidad"
                className="hover:text-white transition-colors"
              >
                Privacidad
              </Link>
            </div>
          </div>

          <p className="text-slate-500 text-xs">
            Hecho con ❤️ en Buenos Aires, Argentina
          </p>
        </div>
      </div>
    </footer>
  );
}
