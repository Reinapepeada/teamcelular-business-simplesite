const repairOptions = [
    "Pantalla",
    "Bateria",
    "Carga",
    "Placa",
    "Boton",
    "Camara",
    "Parlante",
    "Microfono",
    "Software",
    "Otro",
];

export default function RepairsForm() {
    return (
        <form action="/api/repair-lead" method="post" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-slate-900 dark:text-slate-100">
                    <span>Marca</span>
                    <input
                        type="text"
                        name="brand"
                        required
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                    />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-900 dark:text-slate-100">
                    <span>Modelo</span>
                    <input
                        type="text"
                        name="model"
                        required
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                    />
                </label>
            </div>

            <fieldset className="space-y-3">
                <legend className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Selecciona la falla del equipo
                </legend>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {repairOptions.map((option) => (
                        <label
                            key={option}
                            className="flex min-h-11 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 transition hover:border-primary/40 hover:bg-primary/5 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/70"
                        >
                            <input
                                type="checkbox"
                                name="repairType"
                                value={option}
                                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary dark:border-slate-600 dark:bg-slate-900"
                            />
                            <span>{option}</span>
                        </label>
                    ))}
                </div>
            </fieldset>

            <label className="block space-y-2 text-sm font-medium text-slate-900 dark:text-slate-100">
                <span>Descripcion de la falla</span>
                <textarea
                    name="description"
                    rows={5}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                    placeholder="Contanos cuando empezo, si se golpeo, si tuvo humedad o cualquier detalle util."
                />
            </label>

            <label className="block space-y-2 text-sm font-medium text-slate-900 dark:text-slate-100">
                <span>Medio de contacto preferido</span>
                <input
                    type="text"
                    name="contact"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                    placeholder="WhatsApp, llamada o email"
                />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                    type="submit"
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90"
                >
                    Enviar a WhatsApp
                </button>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                    Armamos el mensaje automaticamente y te llevamos directo al
                    chat para cerrar el pedido sin friccion.
                </p>
            </div>
        </form>
    );
}
