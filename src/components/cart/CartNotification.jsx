"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartNotification({ show, productName }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
            const timer = setTimeout(() => setIsVisible(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [show]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -20, x: 20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                    className="fixed top-20 right-4 z-50 bg-green-500/90 backdrop-blur-sm text-white px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 max-w-xs"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    >
                        <CheckCircle2 className="h-4 w-4" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">Agregado al carrito</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
