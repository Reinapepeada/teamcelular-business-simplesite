# Revisión de dependencias del 15 de noviembre de 2026

Se prepara una actualización conjunta de Lucide React 1.72.0 y del grupo de once actualizaciones menores de la PR #129, conservando el flujo completo de validación y preview antes de integrar. No se modifican reglas comerciales ni contratos de API.

## Versiones que se conservan

- **tailwind-merge 2.6.0:** el proyecto usa Tailwind CSS 3. El mantenedor indica usar esta versión con Tailwind 3; la línea 3 de tailwind-merge corresponde a Tailwind 4. No se justifica una migración de estilos para resolver una alerta de versión. Fuente: https://github.com/dcastil/tailwind-merge#readme.
- **TypeScript 6.0.3:** Next 16.4 utiliza `typescript.createProgram` en su verificación del build. TypeScript 7.0.2 no exporta esa API; Microsoft documenta la ausencia de API compatible y propone convivencia con TypeScript 6 para herramientas que la necesitan. Se mantiene el compilador actual hasta contar con soporte de la cadena de build, sin omitir la verificación de tipos. Fuente: https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/.
- **ESLint 9.39.5:** la resolución de ESLint 10.14.0 detecta que eslint-plugin-react 7.37.5, utilizado por eslint-config-next 16.4.6, declara soporte hasta ESLint 9. No se fuerzan peers ni se deshabilitan reglas. Revalidar cuando el plugin y el preset Next declaren compatibilidad con ESLint 10. La prueba de resolución no se incorpora al lockfile final.

## Validación y entrega

Exigir instalación con lockfile, auditoría de producción, lint sin advertencias, pruebas unitarias, build, TypeScript y pruebas de navegador. Verificar el preview del último commit, y después del merge el despliegue y las páginas públicas. Los resultados y SHAs finales se consultan en la PR de esta entrega.

El estado de comercio referenciado por AGENTS.md en `../../mvp-scalarbee/docs/commerce/ESTADO_IMPLEMENTACION.md` no existe en este checkout. Este documento registra la decisión y el próximo paso sin modificar un repositorio distinto.
