import { motion, useAnimation } from 'framer-motion';

const ReparacionCelular = () => {
  const control = useAnimation();

  const startAnimation = async () => {
    // Aquí puedes definir las animaciones específicas, por ejemplo, cambiar la escala o la posición
    await control.start({ scale: 1.5 });
    await control.start({ scale: 1 });
  };

  return (
    <div>
      <motion.img
        src="ruta/a/la/imagen-del-celular.png"
        alt="Celular"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        whileHover={{ scale: 1.2 }}
        onClick={startAnimation}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      />
    </div>
  );
};

export default ReparacionCelular;