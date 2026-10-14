// Precios confirmados por el negocio: una fuente para guía, landing y schema.
export const VIRUS_CLEANING_PRICE_DATE = "14 de octubre de 2026";
export const VIRUS_CLEANING_PLANS = [
  {
    id: "minima",
    name: "Limpieza simple",
    price: 55000,
    data: "Conservando tus datos",
    includes: [
      "Revisión de apps y permisos sospechosos",
      "Eliminación de la app responsable o de las notificaciones no deseadas",
      "Comprobación del problema después de la limpieza",
    ],
    fit: "Para una app o permiso que genera publicidad. Conservamos fotos, contactos y chats sin restablecer el equipo; al quitar una app, se pierde el contenido propio de esa app.",
    recommended: false,
  },
  {
    id: "completa",
    name: "Reinstalación con backup",
    price: 85000,
    data: "Primero revisamos qué se puede guardar",
    includes: [
      "Respaldo de fotos, contactos y WhatsApp cuando el acceso y el espacio lo permiten",
      "Reinstalación del sistema o restablecimiento, según el modelo y el diagnóstico",
      "Restauración de los datos respaldados y reinstalación de apps desde la tienda oficial",
      "Revisión de sesiones abiertas y ayuda con la verificación en dos pasos",
    ],
    fit: "Si la limpieza simple no alcanza. Confirmamos el backup antes de borrar, actualizamos si el modelo lo permite y te avisamos qué apps requieren volver a iniciar sesión.",
    recommended: true,
  },
] as const;
