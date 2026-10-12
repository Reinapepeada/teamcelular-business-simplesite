import type { StoreOrderStatus } from "./storeApi";
import { esperaAntesDeReintentar, vueltaMostrable, type Intencion } from "./vueltaDelPago";

/** Consultas de solo lectura: acotadas, sin solaparse y descartables al navegar. */
export const consultarPedido = ({
    consultar, recibir, pagado, noEncontrado, consultando, agotado,
    intencion = "exito", limite = 12,
    programar = (fn: () => void, delay: number) => setTimeout(fn, delay),
    cancelar = (timer: ReturnType<typeof setTimeout>) => clearTimeout(timer),
}: {
    consultar: () => Promise<StoreOrderStatus>;
    recibir: (estado: StoreOrderStatus) => void;
    pagado: () => Promise<void>;
    noEncontrado: () => void;
    consultando: (valor: boolean) => void;
    agotado: (valor: boolean) => void;
    intencion?: Intencion;
    limite?: number;
    programar?: (fn: () => void, delay: number) => ReturnType<typeof setTimeout>;
    cancelar?: (timer: ReturnType<typeof setTimeout>) => void;
}) => {
    let vivo = true;
    let ocupado = false;
    let intentos = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const preguntar = async () => {
        if (!vivo || ocupado) return;
        ocupado = true;
        consultando(true);
        intentos += 1;
        let seguir = true;
        try {
            const estado = await consultar();
            if (!vivo) return;
            recibir(estado);
            const vista = vueltaMostrable(estado, intencion);
            seguir = vista.seguirPreguntando;
            if (vista.desenlace === "pagado") await pagado();
        } catch (error) {
            if (!vivo) return;
            if ((error as { status?: number })?.status === 404) {
                noEncontrado();
                seguir = false;
            }
        } finally {
            ocupado = false;
            if (vivo) consultando(false);
        }
        if (!vivo || !seguir) return;
        if (intentos >= limite) { agotado(true); return; }
        timer = programar(() => { void preguntar(); }, esperaAntesDeReintentar(intentos));
    };
    const actualizar = () => {
        if (!vivo || ocupado) return;
        if (timer) cancelar(timer);
        intentos = 0;
        agotado(false);
        void preguntar();
    };
    actualizar();
    return {
        actualizar,
        detener: () => { vivo = false; if (timer) cancelar(timer); },
    };
};
