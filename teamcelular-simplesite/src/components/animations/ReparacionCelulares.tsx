'use client'
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
      {/* centrar imagen con animacion y darl tamaño */}
      <motion.img
      className='w-1/2 h-1/2 mx-auto my-10 md:w-1/3 md:h-1/3 lg:w-1/4 lg:h-1/4 xl:w-1/5 xl:h-1/5'
        src="celu.png"
        alt="Celular"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        whileHover={{ scale: 1.15 }}
        onClick={startAnimation}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      />
    </div>
  );
};

export default ReparacionCelular;