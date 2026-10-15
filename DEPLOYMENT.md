# Contrato de deploy y checks de PR

Auditoría del 2 de octubre de 2026 sobre `main` en `92931db592d73c72c3f8c27aac192493f7334eaa`. La limpieza versionada y el contrato se proponen en una rama; las acciones administrativas indicadas abajo siguen pendientes.

## Plataforma y configuración vigentes

`AGENTS.md` y `README.md` definen `main` como producción en Vercel, con dominio público `https://teamcelular.com`. El proyecto que publica los statuses es [reinapepeadas-projects/teamcelular-business-simplesite](https://vercel.com/reinapepeadas-projects/teamcelular-business-simplesite), identificado en los comentarios de la integración como `prj_l4Jnrfidmjsq6DCUKnY9Y06Z5xEy`.

La aplicación usa Next.js con servidor, rutas de API y sitemap dinámico. `next.config.js` contiene redirects, headers y el rewrite `/store/:path*` hacia `https://api.beescend.com/store/:path*`. No configura `output: 'export'`. La salida se construye con `npm run build` y Next.js gestiona el enrutamiento; no corresponde publicar una SPA con fallback universal a `/index.html`.

El único workflow activo y versionado es `.github/workflows/commerce-ci.yml`, `Storefront Commerce CI`, con job `validate`. Se ejecuta para PR a `main`, push a `main` y ejecución manual. Los runs históricos de `deploy-dev.yml`, `deploy-prod.yml` y `security.yml` no son workflows activos ni archivos presentes en `main`; conservar su historial no implica mantener esos deploys.

No hay `netlify.toml`, directorio `.netlify`, workflow de Netlify ni menciones de Netlify en el código del árbol auditado. Sí existe el resto `public/_redirects` con `/* /index.html 200`, que esta propuesta elimina. El archivo no contiene la palabra Netlify y por eso una búsqueda por ese nombre no lo encuentra. Retirarlo limpia la configuración obsoleta, pero no desconecta ninguna integración externa.

No hay `vercel.json` ni configuración versionada de proyecto Vercel: sus variables por entorno, overrides de build, asociación Git y dominios se administran fuera del repositorio. `.nvmrc` fija Node `24.14.0` para CI; `package.json` exige `>=22.19.0` y `.npmrc` activa `engine-strict`. Verificar en Vercel una versión compatible y documentar cualquier diferencia de versión efectiva.

## Qué debe validar un PR

| Señal | Antes de integrar | Alcance |
| --- | --- | --- |
| `validate`, emitido por GitHub Actions | `success` en la ejecución correspondiente al último head del PR, después del último push o actualización de la base | Instalación con lockfile, auditoría de dependencias de producción, lint, tests, build y TypeScript. |
| Status de commit `Vercel`, del proyecto vigente | `success` en el último head del PR, con deployment Preview y URL comprobados | Deploy real del proveedor con su configuración Preview. |
| Verificación del preview | Revisar la página o endpoint afectado en la URL del deployment de ese commit | Funcionamiento real; el éxito del build no garantiza el contrato con el backend. |
| `Vercel Preview Comments` | Resolver el feedback pertinente | Informa sobre comentarios pendientes; puede estar verde aunque el deployment falle. |
| `netlify/clever-palmier-665214/deploy-preview` y checks Netlify | Retirar de requisitos si estuvieran configurados; desconectar la integración obsoleta | No representan la plataforma de producción vigente. |

No integrar si `validate` o el preview Vercel falla, está pendiente, falta o pertenece a otro commit. No crear statuses verdes sintéticos ni desactivar previews para hacer pasar un PR. Un workflow manual o un push a otra rama no sustituyen la ejecución de la PR. Por defecto `pull_request` prueba el merge ref de GitHub; comprobar que la ejecución corresponde al head y base actuales y repetirla si cambió la base.

CI compila con `NODE_ENV=production` y `NEXT_PUBLIC_BASE_URL=https://store.example.test`, sin credenciales de negocio. Esto activa el preflight de producción antes de `next build`; antes, el workflow no fijaba `NODE_ENV` y el preflight podía omitir la validación. Se retira `STORE_SAME_ORIGIN_PROXY_CONFIRMED`, que ningún código consume. El dominio reservado de CI sirve para validar configuración y compilar; no acredita un backend desplegado, DNS, variables Preview, autorización del proveedor ni promoción a producción. La comprobación explícita de TypeScript se hace después del build para incluir los tipos generados por Next.js.

En Preview, `NEXT_PUBLIC_BASE_URL` debe ser una URL HTTPS absoluta. `NEXT_PUBLIC_STORE_API_URL` puede quedar vacío para usar `/store` en el mismo origen; si se configura, el preflight exige conservar el host de la tienda. Las imágenes, API administrativa y servicios auxiliares se configuran según `.env.local.example`. Revisar además `src/lib/storeApi.ts`: en servidor, el origen usado para las solicitudes depende de estas variables. No copiar automáticamente variables o credenciales de producción a Preview. El rewrite versionado apunta al backend real, y un host Preview puede requerir autorización o asociación de empresa en ese backend; verificarlo con lecturas sin crear pedidos, pagos, envíos ni modificar stock.

Después del merge, comprobar `validate` del push a `main`, el deployment de producción del SHA integrado, la asignación efectiva del dominio público y la página o endpoint afectado. Un status `Vercel: success` es evidencia del deployment de ese commit, pero por sí solo no prueba la asignación actual de `teamcelular.com` ni todas las rutas.

## Evidencia de las PR del 1 de octubre

| Ref auditada | SHA | `validate` | Status `Vercel` | Status preview Netlify | `Vercel Preview Comments` |
| --- | --- | --- | --- | --- | --- |
| [PR #2](https://github.com/Reinapepeada/teamcelular-business-simplesite/pull/2), head | `21473b9cf4c8fe190a6375d481458757f92f7d18` | success | failure | failure | success |
| [PR #3](https://github.com/Reinapepeada/teamcelular-business-simplesite/pull/3), head | `b6b0190e38649d8683a69eb229fed3f4cbb5c65c` | success | failure | failure | success |
| Merge de PR #3 en `main` | `92931db592d73c72c3f8c27aac192493f7334eaa` | success, push a main | success | No observado en los statuses actuales de este SHA | No necesario para acreditar producción |

Los [runs de PR #2](https://github.com/Reinapepeada/teamcelular-business-simplesite/actions/runs/36903858594), [PR #3](https://github.com/Reinapepeada/teamcelular-business-simplesite/actions/runs/36920510875) y [push del merge](https://github.com/Reinapepeada/teamcelular-business-simplesite/actions/runs/36921123911) aprobaron. Vercel falló en [el preview de PR #2](https://vercel.com/reinapepeadas-projects/teamcelular-business-simplesite/Gxhsc3NCnbmu9rdTjeYHtUud21ma) y [el de PR #3](https://vercel.com/reinapepeadas-projects/teamcelular-business-simplesite/DtqMTKKBp9LLAvfVyk5rLAQnn2T4), mientras [el deployment del merge](https://vercel.com/reinapepeadas-projects/teamcelular-business-simplesite/9vvucaBbjqiW8rvZtLb2CX8QoSNy) figura en success. Son commits y entornos distintos; el último no corrige ni acredita retroactivamente los previews anteriores.

Los check-runs `Pages changed - clever-palmier-665214`, `Header rules - clever-palmier-665214` y `Redirect rules - clever-palmier-665214` identifican como emisor a la GitHub App `netlify`, app ID `13473`. Todos fallaron en ambas PR. Sus logs están en [Netlify PR #2](https://app.netlify.com/projects/clever-palmier-665214/deploys/6abea03411b7d4000882f5df) y [Netlify PR #3](https://app.netlify.com/projects/clever-palmier-665214/deploys/6abebfe56f735c000885892c). No provienen del workflow de Actions.

## Acciones administrativas pendientes y criterio de cierre

1. **Netlify, administrador del proyecto `clever-palmier-665214`:** ir a Project configuration → Developer settings → Continuous deployment → Repository → Manage repository → Unlink the current repository. Desvincular únicamente `Reinapepeada/teamcelular-business-simplesite`; no borrar el proyecto ni afectar otros repositorios. Como alternativa para revocar el emisor en GitHub, el dueño de la instalación puede abrir [Settings → Applications → Installed GitHub Apps](https://github.com/settings/installations), configurar Netlify y retirar el acceso solo a este repositorio. Si la instalación tiene acceso a todos, preservar los otros repositorios al ajustar la selección. Los checks históricos no desaparecen. Cerrar esta tarea solo al verificar que un nuevo head de PR ya no recibe statuses ni check-runs Netlify.

2. **Vercel, administrador del proyecto vigente:** abrir los Build Logs de los dos deployments fallidos. Para PR #3, el status propone `npx vercel inspect dpl_DtqMTKKBp9LLAvfVyk5rLAQnn2T4 --logs`, con acceso al equipo `reinapepeadas-projects`. Comparar configuración Preview y Production: repositorio/rama de producción, raíz del proyecto, preset Next.js, install/build commands, versión Node, variables necesarias y overrides por rama. Aplicar la corrección que indiquen los logs; verificar que el build ejecuta `npm run build` y que el preflight corre con `NODE_ENV=production`. No se identificó una causa concreta del fallo mediante los statuses públicos y no se afirma que falten variables, que haya un problema de autoría o que el build esté roto. Redeployar el último head del PR en Preview, comprobar `Vercel: success` y revisar su URL y contratos. Si cambia el head, repetir la verificación. Cerrar solo con esa evidencia.

3. **GitHub, administrador del repositorio:** revisar [Settings → Branches](https://github.com/Reinapepeada/teamcelular-business-simplesite/settings/branches) y [Rules](https://github.com/Reinapepeada/teamcelular-business-simplesite/settings/rules). Mantener protección de `main`, exigir `validate` de GitHub Actions y el status `Vercel` del emisor vigente, y conservar las demás protecciones legítimas. Retirar únicamente los cuatro contextos Netlify de la tabla y evidencia si estuvieran como requisitos; no sustituir `Vercel` por `Vercel Preview Comments`. Hasta reparar el preview, bloquear la integración según este contrato. `main` informa `protected: true`; la lista de rulesets consultada está vacía, pero leer `/branches/main/protection` devolvió `403 Resource not accessible by integration`. No se verificaron ni modificaron los checks efectivamente requeridos ni los webhooks/instalaciones administrativas.

La conexión disponible permite cambios en archivos y PR de GitHub, pero no administra proyectos de Vercel/Netlify ni la protección/instalaciones de GitHub. Los logs privados de Vercel no fueron accesibles desde la consulta pública. La auditoría corrige lo versionado; no presenta las integraciones externas como reparadas.

Referencias administrativas: [Netlify: desvincular repositorio](https://docs.netlify.com/build/git-workflows/repo-permissions-linking/#unlink-a-git-repository) y [Vercel: entornos Preview y Production](https://vercel.com/docs/deployments/environments).

El estado de comercio que `AGENTS.md` referencia en `../../mvp-scalarbee/docs/commerce/ESTADO_IMPLEMENTACION.md` no está disponible en este checkout. Este documento registra el avance y los bloqueos de esta auditoría sin fabricar ni modificar un estado de otro repositorio.
