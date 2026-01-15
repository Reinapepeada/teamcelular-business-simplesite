# 📦 Carga Masiva de Productos - Panel de Administración

## ✅ Implementación Completada

Se ha implementado exitosamente el sistema de carga masiva de productos en el panel de administración de TeamCelular.

## 🎯 Funcionalidades Implementadas

### 1. **Navegación del Panel Admin**
- Nueva opción "Carga Masiva" agregada al menú de Productos
- Accesible desde: `/admin/bulk-upload`

### 2. **Interfaz de Usuario**
La página de carga masiva incluye:

#### Descarga de Template
- Botón para descargar un archivo Excel vacío con ejemplos
- Template incluye todas las columnas necesarias y una hoja de referencia

#### Exportación de Productos
- Botón para exportar todos los productos existentes
- El archivo exportado puede ser modificado y re-importado
- Facilita actualizaciones masivas de productos

#### Carga de Archivo
- Selector de archivos Excel (.xlsx, .xls)
- Opción para continuar procesando aunque haya errores
- Barra de progreso durante la carga

#### Reporte de Resultados
Después de procesar el archivo, se muestra:
- **Estadísticas Generales:**
  - Total de filas procesadas
  - Cantidad de registros exitosos
  - Cantidad de registros fallidos
  - Cantidad de registros omitidos (sin cambios)
  
- **Indicadores de Actualización:**
  - Productos actualizados
  - Variantes actualizadas
  
- **Detalles de Creación:**
  - Lista de productos creados (serial_number)
  - Lista de variantes creadas (SKU)
  
- **Tabla de Errores:**
  - Número de fila con error
  - Serial del producto
  - Descripción del error
  
- **Advertencias:**
  - Listado de warnings con detalles de cambios

## 🚀 Cómo Usar

### Opción 1: Crear Productos Nuevos desde Cero

1. Ve a **Admin → Productos → Carga Masiva**
2. Click en **"Descargar Template"**
3. Abre el archivo Excel descargado
4. Completa la información de tus productos
5. Si tienes imágenes, coloca las rutas separadas por `;` en la columna `image_paths`
6. Guarda el archivo
7. Click en **"Seleccionar Archivo"** y elige tu Excel
8. Click en **"Cargar Productos"**
9. Revisa el reporte de resultados

### Opción 2: Actualizar Productos Existentes

1. Ve a **Admin → Productos → Carga Masiva**
2. Click en **"Exportar Productos"**
3. Abre el archivo Excel descargado
4. Modifica los campos que deseas actualizar (precio, stock, descripción, etc.)
5. Puedes agregar nuevos productos al final del archivo
6. Guarda el archivo
7. Click en **"Seleccionar Archivo"** y elige tu Excel modificado
8. Click en **"Cargar Productos"**
9. El sistema detectará automáticamente:
   - ✅ Productos con cambios → Se actualizarán
   - ⏭️ Productos sin cambios → Se omitirán
   - ➕ Productos nuevos → Se crearán

### Opción 3: Agregar Nuevas Variantes

1. Exporta productos existentes
2. Busca el producto al que quieres agregar variantes
3. Duplica la fila
4. En la fila duplicada:
   - Mantén el mismo `serial_number`
   - Cambia `variant_color`, `variant_size`, etc.
   - Modifica `variant_branch_id` y `variant_stock`
5. Sube el archivo
6. Se creará la nueva variante sin duplicar el producto

## 🔄 Lógica de Upsert Inteligente

El sistema implementa una lógica de upsert que:

### Para Productos:
- **Identificador único:** `serial_number`
- **Si existe:** Compara campos y actualiza solo si hay cambios
- **Si no existe:** Crea el producto nuevo

**Campos comparados:**
- name, description
- brand_id, category_id
- warranty_time, warranty_unit
- cost, retail_price
- status

### Para Variantes:
- **Identificador único:** `product_id` + `color` + `size` + `size_unit` + `unit`
- **Si existe:** Compara campos y actualiza solo si hay cambios
- **Si no existe:** Crea la variante nueva

**Campos comparados:**
- branch_id
- stock, min_stock
- images (si se proporcionan nuevas)

## 📋 Estructura del Excel

### Columnas Requeridas
- `serial_number` - Identificador único del producto
- `name` - Nombre del producto
- `cost` - Costo
- `retail_price` - Precio de venta

### Columnas Opcionales del Producto
- `description` - Descripción
- `brand_id` - ID de la marca
- `category_id` - ID de la categoría
- `warranty_time` - Tiempo de garantía
- `warranty_unit` - Unidad de garantía (DAYS, MONTHS, YEARS)
- `status` - Estado (ACTIVE, INACTIVE, DISCONTINUED)

### Columnas de Variante
- `variant_color` - Color (ROJO, AZUL, VERDE, AMARILLO, etc.)
- `variant_size` - Talla/Tamaño
- `variant_size_unit` - Unidad de tamaño
- `variant_unit` - Unidad (KG, G, LB, CM, M, etc.)
- `variant_branch_id` - ID de sucursal (requerido para crear variante)
- `variant_stock` - Cantidad en stock
- `variant_min_stock` - Stock mínimo

### Columna de Imágenes
- `image_paths` - Rutas de imágenes separadas por `;`
  - Ejemplo: `C:\imgs\producto1.jpg;C:\imgs\producto2.jpg`

## 🎨 Características de la Interfaz

### Diseño Responsivo
- Funciona en desktop y móvil
- Grid adaptativo para tarjetas de acción
- Tabla de errores con scroll horizontal en móviles

### Feedback Visual
- Animaciones suaves con Framer Motion
- Barra de progreso durante la carga
- Badges de colores para estados:
  - 🟢 Verde: Exitosos
  - 🔴 Rojo: Errores
  - 🔵 Azul: Omitidos
  - 🟡 Amarillo: Advertencias

### Toast Notifications
- Confirmación al descargar template
- Confirmación al exportar productos
- Resumen después de la carga
- Errores detallados si algo falla

## 📁 Archivos Creados/Modificados

### Nuevos Archivos
1. **`/src/app/admin/bulk-upload/page.tsx`**
   - Página principal de carga masiva
   - Componente React con toda la lógica de UI

2. **`/src/components/ui/progress.tsx`**
   - Componente de barra de progreso
   - Basado en Radix UI

### Archivos Modificados
1. **`/src/services/products.tsx`**
   - Agregadas funciones:
     - `downloadBulkUploadTemplate()`
     - `exportProducts()`
     - `uploadBulkProducts(file, skipErrors)`
   - Tipos TypeScript agregados:
     - `BulkUploadError`
     - `BulkUploadWarning`
     - `BulkUploadResult`

2. **`/src/app/admin/layout.tsx`**
   - Agregada opción "Carga Masiva" al menú de Productos
   - Importado icono `Upload` de lucide-react

3. **`/package.json`**
   - Agregada dependencia: `@radix-ui/react-progress`

## 🔧 Dependencias Instaladas
```json
{
  "@radix-ui/react-progress": "^1.1.0"
}
```

## 🌐 Endpoints de API Utilizados

La implementación del frontend se conecta a estos endpoints del backend FastAPI:

1. **GET** `/product/bulk-upload/template`
   - Descarga template vacío
   - No requiere autenticación

2. **GET** `/product/bulk-upload/export`
   - Exporta productos existentes
   - Requiere autenticación (Editor+)

3. **POST** `/product/bulk-upload?skip_errors={true|false}`
   - Procesa archivo Excel
   - Requiere autenticación (Editor+)
   - Parámetro `skip_errors`: continuar o detener en errores

## ⚡ Próximos Pasos

Para usar la funcionalidad:

1. **Asegúrate de que el backend esté corriendo:**
   ```bash
   # En el proyecto fastapi-teamcelular
   uvicorn main:app --reload
   ```

2. **Inicia el frontend:**
   ```bash
   npm run dev
   ```

3. **Accede al panel admin:**
   - URL: `http://localhost:3000/admin`
   - Inicia sesión con credenciales de Editor o Admin

4. **Navega a Carga Masiva:**
   - Click en "Productos" en el menú lateral
   - Click en "Carga Masiva"

## 🎓 Ejemplos de Uso

### Ejemplo 1: Actualizar Solo Precios
```
1. Exportar productos
2. En Excel: modificar solo columna "retail_price"
3. Subir archivo
4. Resultado: Solo se actualizan productos con cambios de precio
```

### Ejemplo 2: Agregar Stock a Variantes Existentes
```
1. Exportar productos
2. En Excel: modificar solo columna "variant_stock"
3. Subir archivo
4. Resultado: Se actualiza stock sin crear duplicados
```

### Ejemplo 3: Mezcla de Operaciones
```
1. Exportar productos
2. En Excel:
   - Modificar algunos productos existentes
   - Agregar filas nuevas con nuevos serial_number
   - Duplicar filas para crear nuevas variantes
3. Subir archivo
4. Resultado:
   - Productos existentes con cambios → Actualizados
   - Productos nuevos → Creados
   - Variantes nuevas → Creadas
   - Sin cambios → Omitidos
```

## 🎉 Estado de la Implementación

✅ **100% Completado**

- ✅ Página de carga masiva creada
- ✅ Servicios API implementados
- ✅ Navegación actualizada
- ✅ Componentes UI agregados
- ✅ Dependencias instaladas
- ✅ TypeScript types definidos
- ✅ Manejo de errores implementado
- ✅ Feedback visual completo

**Fecha de implementación:** 15 de Enero de 2026
**Versión:** 1.0
**Estado:** ✅ Listo para usar

---

Para más información sobre la lógica de upsert y detalles técnicos del backend, consulta:
- `RESUMEN_IMPLEMENTACION.md` (backend)
- `CARGA_MASIVA_PRODUCTOS.md` (backend)
- `UPSERT_LOGIC.md` (backend)
