# TechStore - Frontend

Una aplicación web de comercio electrónico especializada en productos tecnológicos, desarrollada con Angular 20 y Firebase.

## 🚀 Características Principales

- **Catálogo de productos**: Amplia gama de categorías tecnológicas
- **Carrito de compras**: Sistema completo de gestión de productos
- **Pasarela de pagos**: Integración con métodos de pago modernos
- **Panel administrativo**: Gestión de productos y ventas
- **Autenticación**: Sistema de login y registro
- **Responsive Design**: Interfaz adaptativa para todos los dispositivos
- **Renderizado del lado del servidor**: Optimización SEO con Angular Universal

## 🛠️ Tecnologías Utilizadas

- **Angular 20**: Framework principal
- **Firebase**: Base de datos y autenticación
- **Bootstrap 5**: Framework CSS
- **Spline**: Elementos 3D interactivos
- **TypeScript**: Lenguaje de programación
- **RxJS**: Programación reactiva
- **Angular Universal**: Server-side rendering

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── app/
│   │   ├── admin/                    # Panel administrativo
│   │   │   ├── productos/            # Gestión de productos
│   │   │   ├── editar-productos/     # Edición de productos
│   │   │   └── tablero/              # Dashboard admin
│   │   ├── compras/                  # Módulo de compras
│   │   │   ├── carrito/              # Carrito de compras
│   │   │   ├── pasarela-pagos/       # Procesamiento de pagos
│   │   │   └── personal/             # Panel de personal
│   │   ├── inicio/                   # Páginas principales
│   │   │   ├── accesorios/           # Categoría accesorios
│   │   │   ├── audio-video/          # Categoría audio y video
│   │   │   ├── cabecero/             # Componente header
│   │   │   ├── camaras/              # Categoría cámaras
│   │   │   ├── celulares/            # Categoría celulares
│   │   │   ├── drones/               # Categoría drones
│   │   │   ├── footer-inicio/        # Componente footer
│   │   │   ├── gaming/               # Categoría gaming
│   │   │   ├── laptops/              # Categoría laptops
│   │   │   ├── productos-inicio/     # Página de productos
│   │   │   ├── tablets/              # Categoría tablets
│   │   │   └── wearables/            # Categoría wearables
│   │   ├── login/                    # Autenticación
│   │   ├── modelo/                   # Modelos de datos
│   │   ├── services/                 # Servicios
│   │   │   ├── carrito.service.ts    # Gestión del carrito
│   │   │   ├── firebase.service.ts   # Integración Firebase
│   │   │   └── pagos.service.ts      # Procesamiento de pagos
│   │   ├── servicios/                # Servicios adicionales
│   │   └── contacto/                 # Página de contacto
│   ├── assets/                       # Recursos estáticos
│   └── environments/                 # Configuraciones de entorno
├── public/                           # Archivos públicos
└── angular.json                      # Configuración de Angular
```

## 🏪 Categorías de Productos

### Principales Categorías:
- **💻 Laptops y Computadoras**: MacBook Pro, Dell XPS, HP Spectre, Asus ROG
- **📱 Smartphones**: iPhone, Samsung Galaxy, Xiaomi, Google Pixel
- **🎮 Gaming**: PlayStation, Xbox, Nintendo, accesorios gaming
- **📷 Cámaras**: Canon, Sony, Nikon, GoPro, DJI
- **🛩️ Drones**: DJI Mavic, Autel EVO, Skydio
- **⌚ Wearables**: Apple Watch, Samsung Galaxy Watch, Fitbit
- **📱 Tablets**: iPad, Samsung Galaxy Tab, Microsoft Surface
- **🎧 Audio y Video**: Auriculares, altavoces, televisores
- **🖱️ Accesorios**: Mouse, teclados, cargadores, hubs

## 🔧 Configuración del Proyecto

### Prerrequisitos
```bash
Node.js >= 18.0.0
Angular CLI >= 19.0.0
```

### Instalación
```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]
cd frontend

# Instalar dependencias
npm install

# Configurar Firebase
# Crear archivo src/environments/environment.ts con las credenciales
```

### Configuración de Firebase
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
  }
};
```

## 🚀 Desarrollo

### Servidor de desarrollo
```bash
ng serve
```
Navega a `http://localhost:4200/`. La aplicación se recarga automáticamente.

### Construcción
```bash
ng build
```
Los archivos se almacenan en `dist/`.

### Prerenderizado
```bash
ng run frontend:prerender
```
Genera páginas estáticas para mejor SEO.

## 🧪 Testing

### Pruebas unitarias
```bash
ng test
```

### Pruebas end-to-end
```bash
ng e2e
```

## 🎨 Características de UI/UX

### Diseño
- **Tema oscuro**: Interfaz moderna con esquema de colores oscuros
- **Responsive**: Adaptable a móviles, tablets y desktop
- **Animaciones**: Transiciones suaves y efectos visuales
- **Elementos 3D**: Integración con Spline para productos interactivos

### Componentes Principales
- **Header navegable**: Menú responsivo con carrito
- **Cards de productos**: Diseño uniforme con ratings y precios
- **Filtros avanzados**: Búsqueda por categoría, marca y precio
- **Modal de detalles**: Vista ampliada de productos
- **Carrito flotante**: Acceso rápido a productos agregados

## 🛒 Funcionalidades del E-commerce

### Gestión de Productos
- Catálogo dinámico con Firebase
- Filtros y búsqueda en tiempo real
- Información detallada de productos
- Imágenes de alta calidad
- Ratings y reseñas

### Carrito de Compras
- Agregar/quitar productos
- Modificar cantidades
- Cálculo automático de totales
- Persistencia en localStorage
- Validación de stock

### Proceso de Pago
- Formulario de datos personales
- Validación con API de RENIEC
- Subida de comprobantes
- Códigos de seguridad
- Estados de transacción

### Panel Administrativo
- Gestión de productos
- Seguimiento de ventas
- Aprobación de pagos
- Reportes y estadísticas

## 🔐 Autenticación y Seguridad

### Características de Seguridad
- Autenticación con Firebase Auth
- Validación de DNI con API externa
- Guards de rutas protegidas
- Sanitización de datos
- Códigos de verificación

### Roles de Usuario
- **Cliente**: Compra productos, ve historial
- **Administrador**: Gestiona productos y ventas
- **Personal**: Aprueba/rechaza compras

## 📊 Integración con APIs

### APIs Utilizadas
- **Firebase Firestore**: Base de datos principal
- **API RENIEC**: Validación de documentos
- **Firebase Auth**: Autenticación
- **Firebase Storage**: Almacenamiento de archivos

## 🌐 Rutas Principales

```typescript
- /inicio - Página principal
- /celulares - Catálogo de smartphones
- /laptops - Catálogo de laptops
- /gaming - Productos gaming
- /camaras - Cámaras y fotografía
- /drones - Drones y accesorios
- /wearables - Dispositivos wearables
- /tablets - Tablets y accesorios
- /audio-video - Audio y video
- /accesorios - Accesorios tecnológicos
- /carrito - Carrito de compras
- /pasarela-pagos - Proceso de pago
- /contacto - Información de contacto
- /login - Autenticación
- /productos - Panel administrativo
- /personal - Panel de personal
```

## 📈 Optimizaciones

### Rendimiento
- Lazy loading de módulos
- Prerenderizado de páginas
- Compresión de imágenes
- Caché de servicios
- Tree shaking automático

### SEO
- Meta tags dinámicos
- Sitemap automático
- Structured data
- URLs amigables
- Renderizado del servidor

## 🔄 Estado de Desarrollo

### Funcionalidades Completadas ✅
- Catálogo de productos
- Carrito de compras
- Autenticación básica
- Panel administrativo
- Responsive design
- Integración Firebase

### En Desarrollo 🚧
- Sistema de reviews
- Notificaciones push
- Chat en vivo
- Múltiples métodos de pago
- Panel de analytics

## 📝 Contribución

1. Fork el proyecto
2. Crear una rama para la funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Commit los cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🤝 Soporte

Para soporte técnico o preguntas:
- Email: contactotecnologia.com
- Teléfono: +51 999 999 999
- Ubicación: Andahuaylas, Apurímac

## 🎯 Roadmap

### Versión 2.0 (Próximamente)
- [ ] PWA (Progressive Web App)
- [ ] Pagos con criptomonedas
- [ ] Realidad aumentada para productos
- [ ] Chatbot con IA
- [ ] Sistema de puntos y recompensas
- [ ] Integración con redes sociales

---

**Desarrollado con ❤️ usando Angular 20 y Firebase**
