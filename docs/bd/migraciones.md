# Cómo realizar cambios en los modelos y migraciones con Sequelize

## **Introducción**

Este documento describe cómo realizar cambios en los modelos de Sequelize y aplicar esos cambios a la base de datos mediante migraciones, utilizando la configuración proporcionada en `dbConfig.js`.

### **Archivos relevantes:**

- **`dbConfig.js`**: Configura la conexión a la base de datos.
- **Carpeta `models/`**: Define los modelos de Sequelize.
- **Archivo `migrations/package.json`**: Define el tipo de módulo para las migraciones.
  Como nosotros usamos Emacscript, y sequelize solo reconoce `commonjs`, hay que tener un package.json para que sea reconocido.
- **Carpeta `migrations/`**: Contiene los archivos de migración para modificar el esquema de la base de datos.

---

## Uso en un flujo típico

1. **Modifica el modelo**: Actualiza el modelo en `models/` según los cambios necesarios (por ejemplo, agrega una nueva propiedad).
2. **Crea una migración**: Usa `npx sequelize-cli migration:generate` para crear el archivo de migración.
3. **Edita la migración**: Define los cambios que se deben aplicar a la base de datos en el archivo generado.
4. **Ejecuta la migración**: Aplica los cambios con `npx sequelize-cli db:migrate`.
5. **Prueba los cambios**: Verifica que los nuevos campos, relaciones o modificaciones funcionan correctamente.

---

## **1. Crear un archivo de migración**

Para crear un archivo de migración, usa el siguiente comando:

```bash
npx sequelize-cli migration:generate --name <nombre-de-la-migracion>
```

Por ejemplo:

```bash
npx sequelize-cli migration:generate --name add-column-to-internships
```

Esto generará un archivo en la carpeta `migrations/`, con un nombre similar a:

```
migrations/20241215012345-add-column-to-internships.js
```

---

## **2. Ejemplos de modificaciones en modelos y migraciones**

### **2.1. Agregar una nueva columna**

Supongamos que necesitas agregar una nueva columna `duration` al modelo `Internship`.

#### **Editar el modelo:**

Edita `models/internship.js` para agregar la nueva propiedad:

```javascript
duration: {
  type: Sequelize.INTEGER,
  allowNull: true,
},
```

#### **Editar la migración generada:**

En el archivo `migrations/<timestamp>-add-column-to-internships.js`, escribe lo siguiente:

```javascript
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('internships', 'duration', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('internships', 'duration');
  },
};
```

#### **Ejecutar la migración:**

```bash
npm run migrate
```

---

### **2.2. Eliminar una columna**

Supongamos que necesitas eliminar la columna `subtitle_en`.

#### **Editar el modelo:**

Elimina la propiedad `subtitle_en` en `models/internship.js`.

#### **Editar la migración generada:**

En el archivo `migrations/<timestamp>-remove-column-subtitle-en.js`:

```javascript
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('internships', 'subtitle_en');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('internships', 'subtitle_en', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
```

#### **Ejecutar la migración:**

```bash
npm run migrate
```

---

### **2.3. Cambiar el nombre de una tabla**

Supongamos que necesitas cambiar el nombre de la tabla `internships` a `program_internships`.

#### **Editar el modelo:**

Actualiza la propiedad `tableName`:

```javascript
tableName: 'program_internships',
```

#### **Editar la migración generada:**

En el archivo `migrations/<timestamp>-rename-table-internships.js`:

```javascript
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('internships', 'program_internships');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('program_internships', 'internships');
  },
};
```

#### **Ejecutar la migración:**

```bash
npm run migrate
```

---

### **2.4. Agregar una relación (foreign key)**

Supongamos que necesitas agregar una nueva relación entre `Internship` y una tabla `categories`.

#### **Editar el modelo:**

Agrega la nueva propiedad y define la relación en `models/internship.js`:

```javascript
category_id: {
  type: Sequelize.INTEGER,
  allowNull: false,
  references: {
    model: 'categories',
    key: 'id',
  },
},
```

#### **Editar la migración generada:**

En el archivo `migrations/<timestamp>-add-category-foreign-key.js`:

```javascript
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('internships', 'category_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('internships', 'category_id');
  },
};
```

#### **Ejecutar la migración:**

```bash
npm run migrate
```

---

### **2.5. Cambiar el nombre de una columna**

Supongamos que necesitas renombrar la columna `description_en` a `details_en`.

#### **Editar el modelo:**

Actualiza el nombre de la propiedad en `models/internship.js`:

```javascript
details_en: {
  type: Sequelize.TEXT,
  allowNull: false,
},
```

#### **Editar la migración generada:**

En el archivo `migrations/<timestamp>-rename-column-description-en.js`:

```javascript
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      'internships',
      'description_en',
      'details_en'
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      'internships',
      'details_en',
      'description_en'
    );
  },
};
```

#### **Ejecutar la migración:**

```bash
npm run migrate
```

---

## **3. Revertir migraciones**

Si necesitas deshacer una migración, usa:

```bash
npm run migrate:undo
```

Para deshacer todas las migraciones:

```bash
npm run migrate:undo:all
```

---

## **4. Notas importantes**

1. **Nunca edites migraciones ya aplicadas en producción.** Si necesitas realizar cambios adicionales, crea una nueva migración.
2. **Prueba todas las migraciones** en un entorno de desarrollo antes de ejecutarlas en producción.
3. Usa el archivo `dbConfig.js` para definir correctamente tus entornos (`development`, `production`) y mantener credenciales seguras.
4. Para verificar que una migración a sido ejecutada, revisa la tabla `SequelizeMeta` en tu base de datos.

---
