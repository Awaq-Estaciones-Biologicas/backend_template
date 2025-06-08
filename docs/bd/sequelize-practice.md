# ¿Qué es `.sync()` en Sequelize?

El método `sequelize.sync()` sincroniza los modelos definidos con las tablas de la base de datos. Esto asegura que las tablas reflejen las definiciones actuales de los modelos.

---

## Modos de sincronización

### 1. **`force: false` (por defecto)**

- No borra datos existentes.
- Solo crea tablas que no existan en la base de datos.
- Útil durante el desarrollo.

```javascript
sequelize.sync({ force: false });
```

### 2. **`force: true`**

- Elimina las tablas existentes y las recrea desde cero.
- **Borra todos los datos de las tablas.**
- Útil en desarrollo cuando necesitas un esquema limpio.

```javascript
sequelize.sync({ force: true });
```

### 3. **`alter: true`**

- Modifica tablas existentes para que coincidan con los modelos actuales, sin borrar datos.
- No elimina ni recrea tablas.
- Puede manejar cambios simples como agregar o eliminar columnas.

```javascript
sequelize.sync({ alter: true });
```

---

## ¿Por qué evitar `.sync()` en producción?

1. **Pérdida de datos**: Si usas `force: true`, las tablas serán eliminadas y recreadas, lo que resultará en la pérdida de datos almacenados.
2. **Falta de control**: `sync` intenta ajustar tablas automáticamente, lo que puede generar errores inesperados.
3. **No soporta cambios avanzados**: Métodos como `alter` no manejan cambios complejos como renombrar columnas o mover datos.
4. **Inconsistencias**: Cambiar esquemas automáticamente puede provocar errores en aplicaciones que ya dependen de esos datos.

**Nota:** El uso de `sync()` debe limitarse a entornos de desarrollo.
