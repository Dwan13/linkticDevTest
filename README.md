# LinkticProject

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.8.

## API REST Utilizada

Este proyecto consume datos de productos desde la siguiente API REST:

`https://devsapihub.com/api-fast-food`

El servicio encargado de interactuar con esta API es el <mcsymbol name="ProductService" filename="product.service.ts" path="/Users/dwanfelipevelozapaez/Documents/linkticTEst/linkticProject/src/app/services/product.service.ts" startline="7" type="class"></mcsymbol>.

## Pruebas Unitarias

Se han implementado pruebas unitarias para verificar el correcto funcionamiento de componentes y servicios clave de la aplicación. Puedes encontrar las pruebas en los archivos `.spec.ts` correspondientes.

Las pruebas unitarias cubren, entre otros:

*   **<mcsymbol name="ProductService" filename="product.service.ts" path="/Users/dwanfelipevelozapaez/Documents/linkticTEst/linkticProject/src/app/services/product.service.ts" startline="7" type="class"></mcsymbol>**: Verificación de la carga de productos desde la API mockeada y la actualización del observable de productos. (<mcfile name="product.service.spec.ts" path="/Users/dwanfelipevelozapaez/Documents/linkticTEst/linkticProject/src/app/services/product.service.spec.ts"></mcfile>)
*   **<mcsymbol name="CartComponent" filename="cart.component.ts" path="/Users/dwanfelipevelozapaez/Documents/linkticTEst/linkticProject/src/app/components/cart/cart.component.ts" startline="8" type="class"></mcsymbol>**: Pruebas para la inicialización del carrito desde el estado del router y la emisión de eventos al eliminar productos. (<mcfile name="cart.component.spec.ts" path="/Users/dwanfelipevelozapaez/Documents/linkticTEst/linkticProject/src/app/components/cart/cart.component.spec.ts"></mcfile>)
*   **<mcsymbol name="NavbarComponent" filename="navbar.component.spec.ts" path="/Users/dwanfelipevelozapaez/Documents/linkticTEst/linkticProject/src/app/components/navbar/navbar.component.spec.ts" startline="2" type="class"></mcsymbol>**: Verificación de la visualización correcta del número de ítems en el carrito en la barra de navegación. (<mcfile name="navbar.component.spec.ts" path="/Users/dwanfelipevelozapaez/Documents/linkticTEst/linkticProject/src/app/components/navbar/navbar.component.spec.ts"></mcfile>)

Para ejecutar las pruebas unitarias, utiliza el siguiente comando:

```bash
ng test
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.


## Arquitectura

Este proyecto sigue una arquitectura basada en componentes, típica de las aplicaciones Angular. Los principales elementos arquitectónicos incluyen:

*   **Componentes:** La interfaz de usuario se divide en componentes reutilizables (por ejemplo, <mcsymbol name="CartAppComponent" filename="cart-app.component.ts" path="/Users/dwanfelipevelozapaez/Documents/linkticTEst/linkticProject/src/app/components/cart-app/cart-app.component.ts" startline="14" type="class"></mcsymbol>, <mcsymbol name="CatalogComponent" filename="catalog.component.spec.ts" path="/Users/dwanfelipevelozapaez/Documents/linkticTEst/linkticProject/src/app/components/catalog/catalog.component.spec.ts" startline="20" type="class"></mcsymbol>, <mcsymbol name="ProductCardComponent" filename="product-card.component.ts" path="/Users/dwanfelipevelozapaez/Documents/linkticTEst/linkticProject/src/app/components/product-card/product-card.component.ts" startline="8" type="class"></mcsymbol>, <mcsymbol name="NavbarComponent" filename="navbar.component.spec.ts" path="/Users/dwanfelipevelozapaez/Documents/linkticTEst/linkticProject/src/app/components/navbar/navbar.component.spec.ts" startline="3" type="class"></mcsymbol>, <mcsymbol name="CartComponent" filename="cart.component.ts" path="/Users/dwanfelipevelozapaez/Documents/linkticTEst/linkticProject/src/app/components/cart/cart.component.ts" startline="10" type="class"></mcsymbol>), cada uno con su propia lógica, plantilla y estilos.
*   **Servicios:** Se utilizan servicios (como <mcsymbol name="ProductService" filename="product.service.ts" path="/Users/dwanfelipevelozapaez/Documents/linkticTEst/linkticProject/src/app/services/product.service.ts" startline="7" type="class"></mcsymbol> para la obtención de datos y <mcsymbol name="SharingDataService" filename="cart-app.component.ts" path="/Users/dwanfelipevelozapaez/Documents/linkticTEst/linkticProject/src/app/components/cart-app/cart-app.component.ts" startline="14" type="class"></mcsymbol> para la comunicación entre componentes) para encapsular la lógica de negocio y compartir datos a través de la aplicación.
*   **Routing:** Angular Router se utiliza para gestionar la navegación entre diferentes vistas de la aplicación.
*   **State Management:** Se utiliza `sessionStorage` para persistir el estado del carrito de compras entre recargas de página.

Esta estructura promueve la modularidad, la mantenibilidad y la escalabilidad del proyecto.


## Dificultades y Próximos Pasos (Redux Toolkit)

Actualmente, la gestión del estado del carrito se realiza de forma básica utilizando `sessionStorage` y servicios de Angular. Si bien esto es funcional para una aplicación pequeña, la incorporación de una librería de gestión de estado más robusta como Redux Toolkit (o NgRx) es un próximo paso planificado para mejorar la escalabilidad y mantenibilidad del proyecto.

La integración de Redux Toolkit presenta algunas dificultades iniciales:

*   **Curva de Aprendizaje:** Introducción a nuevos conceptos como acciones, reducers, efectos y selectores.
*   **Configuración y Boilerplate:** Aunque Redux Toolkit reduce el código repetitivo, la configuración inicial del store y la definición de slices requiere trabajo.
*   **Migración del Estado Existente:** Refactorizar la lógica actual de gestión del carrito y persistencia en `sessionStorage` para usar el store de Redux.
*   **Manejo de Efectos Secundarios:** Integrar operaciones asíncronas (como llamadas HTTP) utilizando NgRx Effects.
*   **Refactorización de Componentes:** Adaptar los componentes para interactuar con el store (dispatch actions, select state) en lugar de servicios de datos directos.
*   **Actualización de Pruebas:** Modificar las pruebas unitarias existentes para mockear el store de Redux.

A pesar de estas dificultades, la adopción de Redux Toolkit proporcionará una fuente única de verdad para el estado, facilitará la depuración y preparará el proyecto para un crecimiento futuro.
