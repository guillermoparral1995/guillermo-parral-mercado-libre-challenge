# Frontend Challenge de Mercado Libre #

## Overview ##

Este challenge está hecho con React para el lado del cliente y Node.js con Express para el lado del server. 
Utilicé `Create React App` (https://github.com/facebook/create-react-app) para inicializar el template del proyecto 
del lado del cliente para facilitar configuración de Webpack y Jest que puede resultar tediosa. Además instalé la 
dependencia `node-sass` (https://github.com/sass/node-sass) para poder utilizar Sass en vez de CSS para los estilos.

## Setup ##

Primero y principal, instalar todas las dependencias:
```
npm install
```

Para levantar la aplicación localmente, ejecutar:
```
npm run all
```
Esto levanta en simultáneo el cliente y el server en dos puertos distintos para poder probar de manera integrada toda la aplicación.

Para correr los tests, ejecutar:
```
npm test
```

## Client-side ##

Está hecho con React, utilizando `React Router` (https://reacttraining.com/react-router/web/guides/quick-start) para 
manejar todo lo que es routeo de la aplicación. 

El state de la aplicación está concentrado en dos componentes: en `App` y en `ItemDetail`. 

Consideré a la vista de detalle de ítem como una vista que funciona de manera independiente, 
ya que puedo ingresar directamente a través de la URL con un ID de producto, con lo cual me pareció correcto que esa vista 
tuviera un state propio. La vista de lista de productos recibe props del componente `App` para dibujarse, ya que está ligada
al resultado de la búsqueda, evento que se dispara a través del componente `Searchbox`, que resulta transversal a toda 
la aplicación y que se presenta desde `App`.

Si bien no estaba especificado en la consigna del challenge, me pareció oportuno agregar mensajes comunicando al usuario
cuando se produjo un error o cuando no hubo resultados para la búsqueda realizada. Esto se puede visualizar en el componente
`Message`.

** DISCLAIMER: ** En los mockups presentados en la consigna, en la vista de listado de productos se ve que los 
productos muestran la ubicación del vendedor, pero en el detalle de la API que debía construir no figuraba ese dato.
Me tomé la libertad de reemplazarlo con la condición del producto. Además, en la vista de detalle de producto decía que
debía mostrar el breadcrumb de la categoría del producto, pero se daba la misma situación: la API que debía construir
y consumir desde el lado del cliente no tenía info de categoría como para armar el breadcrumb. Voy a subir en otro branch
una versión alternativa donde consuma otros servicios de la API de Mercado Libre para obtener esa info.

## Server-side ##

Está hecho en Node.js utilizando Express para manejar los requests HTTP que se hagan desde el lado del cliente.
Construí el server-side en 3 capas: client, service y router.

El client consta de funciones que consumen la API de Mercado Libre y wrappean ese llamado en una Promise para 
poder devolver de forma asincrónica el resultado. Para eso uso el módulo `https` de Node.js y convierto el resultado
a JSON para poder manejarlo más fácilmente.

El service toma las respuestas obtenidas desde el client y las formatea según lo especificado en la consigna. En caso
de que al cliente le haya llegado un error desde el backend, el service lanza una excepción con el código de error y 
el mensaje para devolvérselo al front y accionar debidamente.

El router por último es únicamente un handler de los pedidos que llegan desde el frontend, pasándolos al service
para después devolver los resultados formateados al frontend.

## Tests ##

Los tests fueron hechos con Jest utilizando `React Testing Library` (https://github.com/testing-library/react-testing-library)
junto con las dependencias `wait-for-expect` (https://github.com/TheBrainFamily/wait-for-expect) y `user-event`
(https://github.com/testing-library/user-event), recomendadas por la documentación de `React Testing Library`.
La idea detrás del uso de estas dependencias fue que los tests representaran una interacción más similar a la que tiene
un usuario con el sitio en vez de algo basado en la implementación. De esta manera, se hace mucho uso de hacer queries
en base al texto visible en pantalla en vez de buscar en base a selectores CSS de algun determinado elemento.