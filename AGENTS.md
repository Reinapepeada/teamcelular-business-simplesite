# Trabajo de comercio

Leer y actualizar ../../mvp-scalarbee/docs/commerce/ESTADO_IMPLEMENTACION.md como fuente única de avance y próximo paso. Coordinar contratos con backend y frontend Fixbee.

Usar caveman ultra y ponytail full instaladas. Mantener claridad, seguridad y pruebas monetarias/concurrencia; documentos en prosa normal. Revalidar hallazgos y corregir la causa con el cambio mínimo.

Conservar ramas existentes y cambios ajenos. No cobros, envíos ni mutaciones de datos comerciales sin autorización específica. PostgreSQL de pruebas debe ser aislado y descartable; nunca usar base configurada de desarrollo/producción. Actualizar estado tras cada unidad y antes de terminar.

## Desarrollo y entrega

No desarrollar ni hacer commits directamente en `main`. Usar `develop` o `dev` actualizado, o una rama `feature/`, `fix/` o `chore/` desde `origin/main`; conservar trabajo divergente. El flujo solicitado por el usuario incluye commits, push y PR de cambios autorizados. Auditar el diff, seguridad, SEO y contratos del catálogo; ejecutar las pruebas, lint, TypeScript y build pertinentes y exigir `validate` aprobado en el último commit antes de integrar, salvo instrucción expresa de no publicar.

`main` es producción en Vercel. Aplicar el contrato de [DEPLOYMENT.md](DEPLOYMENT.md): antes de integrar exigir `validate` de GitHub Actions y el status de deployment `Vercel` en `success`, ambos correspondientes al último commit del PR, además de verificar el preview y resolver las conversaciones. `Vercel Preview Comments` no valida un deployment; los checks de Netlify pertenecen a una integración obsoleta cuya desconexión administrativa sigue pendiente. No integrar con el preview fallido o ausente ni usar un éxito de producción para darlo por validado. Después del merge comprobar el deployment del commit integrado y la página o endpoint afectado. Conservar la protección de main; no afirmar que sus checks requeridos fueron configurados sin verificarlos.
