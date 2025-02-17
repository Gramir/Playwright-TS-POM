# Proyecto de Pruebas Automatizadas con Playwright

Este proyecto contiene pruebas automatizadas para la funcionalidad de login utilizando Playwright con TypeScript y el patrón Page Object Model.

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (incluido con Node.js)

## Instalación

```bash
npm install
```

## Estructura del Proyecto

- `pages/`: Contiene las clases Page Object
- `tests/`: Contiene los archivos de pruebas
- `test-data/`: Datos de prueba
- `utils/`: Utilidades comunes para las pruebas

## Ejecutar Pruebas

- Ejecutar todas las pruebas:
  ```bash
  npm test
  ```

- Ejecutar pruebas en modo UI:
  ```bash
  npm run test:ui
  ```

- Ejecutar pruebas específicas:
  ```bash
  npm test login-page.spec.ts
  ```

## Reportes

Los reportes HTML se generan automáticamente en la carpeta `playwright-report/`.

## Configuración

El archivo `playwright.config.ts` contiene la configuración para:
- Ejecución paralela de pruebas
- Capturas de pantalla automáticas en caso de fallos
- Configuración de navegadores
- Reportes
