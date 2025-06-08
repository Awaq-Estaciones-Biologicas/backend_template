# Buenas prácticas y reglas para el proyecto

Este documento detalla algunas de las mejores prácticas que debes seguir para trabajar con este proyecto, desde la gestión
de variables de entorno hasta el uso de herramientas de calidad de código y control de versiones.

> [!WARNING]
> El proyecto usa husky para validar buenas practicas.
> Si algun paso falla, por favor, ejecute manualmente el comando para saber que fallo.
>
> Ejemplo:
>
> ```bash
> $ git push origin main
> 🏃 Running pre-push checks...
>
> 📝 Running Prettier...
> ✅ npm successful!
>
> 🧪 Running Tests...
> ✅ npm successful!
>
> 🔍 Running ESLint...
> ✅ npm successful!
>
> 📋 Checking commit messages...
> husky - pre-push hook exited with code 1 (error)
> error: failed to push some refs to 'github.com:erickvasm/backend.git'
> ```
>
> En este caso, fallo los estandares de escribit un commit. Para saber que fallo,
> ejecuta el comando `npx --no-install commitlint --from=HEAD~1` y revisa el mensaje de error.
>
> Pero tome en cuenta, que si fallo cualquier otro, debe ejecutar el script que aparacen en el
> `package.json` para saber que fallo.

## 1. Uso de `dotenv` para gestionar variables de entorno

En lugar de usar directamente `process.env` en tu código, utiliza un archivo de configuración dedicado, como
`environment.js`, para acceder a las variables de entorno. Esto mejora la legibilidad y el mantenimiento del código,
y facilita la validación de las variables antes de usarlas.

## 2. Uso de aliases con ~ en lugar de rutas relativas

Para mejorar la legibilidad del código y evitar rutas relativas largas y confusas, usa aliases como ~ para hacer
referencia al directorio raíz del proyecto.

## 3. Uso de logManager para registrar eventos

Nosotros usamos `logManager` para registrar eventos en lugar de usar `console.log`.
Esto nos permite tener un registro uniforme y configurable de los eventos que ocurren en nuestra aplicación.
Por lo que no esta permitido usar `console.log` en el codigo.

## Actualizar documentación

Cada cambio que se haga a un modelo, debe actualizarse la documentación correspondiente -> [diagrama](/docs/bd/diagrama.md).
De igual forma, se debe explicar como utilizar los endpoints de cada controlador.

### Swagger como documentación

Usamos swagger para documentar los endpoints de nuestra API. Cada cambio que se haga a un controlador, debe
actualizarse la documentación correspondiente en los swagger.

## Otras buenas prácticas

**a. Organización del código**

Separa las rutas, controladores, servicios y modelos en carpetas distintas para mantener una estructura modular y escalable.
Usa nombres claros y consistentes para los archivos y carpetas.

**b. Validaciones y manejo de errores**

Utiliza middlewares de validación (por ejemplo, express-validator) para asegurarte de que los datos de entrada sean correctos.
Usa un middleware de manejo de errores global para capturar excepciones no manejadas.

**c. Pruebas automáticas**

Escribe pruebas unitarias y de integración utilizando herramientas como Jest o Mocha.
Usa supertest para probar las rutas de la API.
