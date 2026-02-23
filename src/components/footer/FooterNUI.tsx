import React from "react";
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
import Link from "next/link";
import Image from "next/image";

const footerSections = {
  servicios: [
    {
      name: "Reparacion de iPhone",
      href: "/guias/reparacion-iphone-buenos-aires",
      icon: FaApple,
    },
    {
      name: "Reparacion de celulares",
      href: "/presupuesto-reparacion",
      icon: FaMobileAlt,
    },
    {
      name: "Microelectronica y reballing",
      href: "/guias/microelectronica-reballing-caba",
      icon: FaTools,
    },
    {
      name: "Soporte para empresas",
      href: "/guias/soporte-empresas-servicio-tecnico",
      icon: FaBuilding,
    },
    {
      name: "Mantenimiento preventivo",
      href: "/guias/mantenimiento-preventivo-celulares",
      icon: FaShieldAlt,
    },
  ],
  guias: [
    { name: "Todas las guias", href: "/guias" },
    { name: "Reparacion iPhone", href: "/guias/reparacion-iphone-buenos-aires" },
    { name: "Microelectronica", href: "/guias/microelectronica-reballing-caba" },
    {
      name: "Mantenimiento preventivo",
      href: "/guias/mantenimiento-preventivo-celulares",
    },
    {
      name: "Soporte empresas",
      href: "/guias/soporte-empresas-servicio-tecnico",
    },
  ],
  recursos: [
    { name: "Tienda online", href: "/tienda" },
    { name: "Solicitar presupuesto", href: "/presupuesto-reparacion" },
    { name: "Sobre nosotros", href: "/sobrenosotros" },
    { name: "Contacto", href: "/contacto" },
  ],
};

export default function FooterNUI() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-16 w-full overflow-hidden bg-footer-background text-white">
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <Image
                src="/images/IMAGOTIPO/PNG/IMAGOTIPO_6.png"
                alt="Team Celular"
                width={300}
                height={300}
                className="mb-2 h-auto w-48"
              />
              <p className="text-sm text-slate-200">
                Mas de 15 anos de experiencia en reparacion profesional de
                celulares en Buenos Aires.
              </p>
            </div>

            <div className="flex space-x-3 pt-4">
              <Link
                aria-label="WhatsApp"
                href="https://wa.me/5491151034595?text=Hola%21%20Necesito%20informacion"
                target="_blank"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-white/10 hover:text-green-400"
              >
                <BsWhatsapp size={22} />
              </Link>
              <Link
                aria-label="Instagram"
                href="https://www.instagram.com/teamcelular.arg/"
                target="_blank"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-white/10 hover:text-pink-400"
              >
                <BsInstagram size={22} />
              </Link>
              <Link
                aria-label="Facebook"
                href="https://www.facebook.com/TeamCelular/"
                target="_blank"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-white/10 hover:text-blue-400"
              >
                <BsFacebook size={22} />
              </Link>
            </div>

            <div className="flex items-start space-x-2 pt-2 text-sm">
              <BsClock className="mt-1 flex-shrink-0 text-primary" />
              <div>
                <p className="font-semibold">Horario de atencion</p>
                <p className="text-slate-200">Lunes a viernes</p>
                <p className="text-slate-200">10:30 - 18:00 hs</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <h4 className="mb-2 text-lg font-bold text-primary">Servicios</h4>
            {footerSections.servicios.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.href}
                  href={service.href}
                  className="flex min-h-9 items-center space-x-2 text-sm text-slate-200 transition-all duration-200 hover:translate-x-1 hover:text-white"
                >
                  <Icon className="text-primary" />
                  <span>{service.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col space-y-3">
            <h4 className="mb-2 text-lg font-bold text-secondary">Guias tecnicas</h4>
            {footerSections.guias.map((guia) => (
              <Link
                key={guia.href}
                href={guia.href}
                className="inline-flex min-h-9 items-center text-sm text-slate-200 transition-all duration-200 hover:translate-x-1 hover:text-white"
              >
                {guia.name}
              </Link>
            ))}

            <div className="my-6 h-px w-full bg-white/10" />

            <h4 className="mb-2 text-lg font-bold text-secondary">Recursos</h4>
            {footerSections.recursos.map((recurso) => (
              <Link
                key={recurso.href}
                href={recurso.href}
                className="inline-flex min-h-9 items-center text-sm text-slate-200 transition-all duration-200 hover:translate-x-1 hover:text-white"
              >
                {recurso.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col space-y-4">
            <h4 className="mb-2 text-lg font-bold text-primary">Contacto</h4>

            <div className="flex items-start space-x-3 text-sm">
              <BsGeoAlt className="mt-1 flex-shrink-0 text-primary" />
              <div>
                <p className="font-semibold">Direccion</p>
                <p className="text-slate-200">Paraguay 2451</p>
                <p className="text-slate-200">Recoleta, CABA</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-sm">
              <BsTelephone className="mt-1 flex-shrink-0 text-primary" />
              <div>
                <p className="font-semibold">Telefono</p>
                <Link
                  href="tel:+5491151034595"
                  className="text-slate-200 transition-colors hover:text-white"
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
                  className="break-all text-slate-200 transition-colors hover:text-white"
                >
                  teamcelular.arg@gmail.com
                </Link>
              </div>
            </div>

            <Link
              href="/contacto"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Ver ubicacion
            </Link>
          </div>
        </div>

        <div className="my-8 h-px w-full bg-white/10" />

        <div className="flex flex-col items-center justify-between space-y-4 text-sm text-slate-200 md:flex-row md:space-y-0">
          <div className="flex flex-col items-center space-y-2 md:flex-row md:space-x-4 md:space-y-0">
            <p>© {currentYear} Team Celular. Todos los derechos reservados.</p>
            <div className="flex space-x-4">
              <Link
                href="/terminos"
                className="inline-flex min-h-8 items-center transition-colors hover:text-white"
              >
                Terminos
              </Link>
              <Link
                href="/devoluciones"
                className="inline-flex min-h-8 items-center transition-colors hover:text-white"
              >
                Devoluciones
              </Link>
              <Link
                href="/privacidad"
                className="inline-flex min-h-8 items-center transition-colors hover:text-white"
              >
                Privacidad
              </Link>
            </div>
          </div>

          <p className="text-xs text-slate-200">Hecho en Buenos Aires, Argentina</p>
        </div>
      </div>
    </footer>
  );
}
