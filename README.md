# Sistema de Gestión de Tareas

Proyecto [Next.js](https://nextjs.org) creado con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Requisitos previos

- **Node.js** 18.x o superior
- **npm**, **yarn**, **pnpm** o **bun** (gestor de paquetes)

## Configuración

1. **Clonar el repositorio** (si aún no lo tienes):

   ```bash
   git clone <url-del-repositorio>
   cd sistema-gestion-tareas
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   # o
   bun install
   ```

## Ejecutar la aplicación

### Modo desarrollo

Arranca el servidor de desarrollo con:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador para ver la aplicación. Los cambios en el código se reflejan automáticamente.

### Build de producción

Genera la versión optimizada para producción:

```bash
npm run build
# o
yarn build
# o
pnpm build
# o
bun run build
```

### Servidor de producción

Tras ejecutar `build`, puedes servir la aplicación en modo producción:

```bash
npm run start
# o
yarn start
# o
pnpm start
# o
bun start
```

## Tests unitarios

Los tests están escritos con **Jest** y **React Testing Library**.

**Ejecutar todos los tests**:

```bash
npm run test
# o
yarn test
# o
pnpm test
# o
bun test
```

**Ejecutar tests en modo watch** (se re-ejecutan al guardar cambios):

```bash
npm run test -- --watch
# o
yarn test --watch
# o
pnpm test --watch
```

**Ejecutar tests con cobertura**:

```bash
npm run test -- --coverage
# o
yarn test --coverage
# o
pnpm test --coverage
```

## Más información

- [Documentación de Next.js](https://nextjs.org/docs)

## Desplegar en Vercel

La forma más sencilla de desplegar esta aplicación es usar [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme). Consulta la [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.
