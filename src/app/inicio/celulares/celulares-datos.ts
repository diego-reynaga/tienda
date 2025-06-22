import { ProductoResumen } from '../../modelo/producto.modelo';

export const CELULARES_DATOS: ProductoResumen[] = [
  {
    id: 'apple',
    marca: 'Apple',
    modeloCompleto: 'iPhone 15 Pro Max',
    imagenLogo: 'iphone/apple-logo.png',
    imagenProducto: {
      ruta: 'assets/phones/iphone15pro.png',
      splineUrl: 'https://prod.spline.design/CaMctRXxsBbf1Ibx/scene.splinecode'
    },
    precio: 1199,
    gradienteClase: 'apple-gradient',
    descripcionCorta: 'Experimenta el futuro de la tecnología móvil con un rendimiento extraordinario y un diseño impecable.',
    caracteristicas: [
      'Chip A17 Pro',
      'Cámara 48MP',
      '6.7" Super Retina XDR',
      'Titanio de grado aeroespacial'
    ]
  },
  {
    id: 'samsung',
    marca: 'Samsung',
    modeloCompleto: 'Galaxy S23 Ultra',
    imagenLogo: 'samsung/samsung-logo.png',
    imagenProducto: {
      ruta: 'assets/phones/s23ultra.png',
      splineUrl: 'https://prod.spline.design/CaMctRXxsBbf1Ibx/scene.splinecode'
    },
    precio: 1199,
    gradienteClase: 'samsung-gradient',
    botonClase: 'samsung-btn',
    descripcionCorta: 'Redefine los límites con la cámara más avanzada de Samsung y un rendimiento sin precedentes.',
    caracteristicas: [
      'Snapdragon 8 Gen 2',
      'Cámara 200MP',
      '6.8" Dynamic AMOLED 2X',
      'S Pen incluido'
    ]
  },
  {
    id: 'xiaomi',
    marca: 'Xiaomi',
    modeloCompleto: 'Xiaomi 13 Pro',
    imagenLogo: 'xiaomi/xiaomi-logo.png',
    imagenProducto: {
      ruta: 'assets/phones/xiaomi13pro.png',
      splineUrl: 'https://prod.spline.design/CaMctRXxsBbf1Ibx/scene.splinecode'
    },
    precio: 899,
    gradienteClase: 'xiaomi-gradient',
    botonClase: 'xiaomi-btn',
    descripcionCorta: 'Fotografía profesional con óptica Leica y rendimiento excepcional con un precio inigualable.',
    caracteristicas: [
      'Snapdragon 8 Gen 2',
      'Cámara Leica 50MP',
      '6.73" AMOLED 2K',
      'Carga 120W HyperCharge'
    ]
  },
  {
    id: 'google',
    marca: 'Google',
    modeloCompleto: 'Pixel 7 Pro',
    imagenLogo: 'pixel/google-logo.png',
    imagenProducto: {
      ruta: 'telefonol.webp',
      splineUrl: ''
    },
    precio: 899,
    gradienteClase: 'google-gradient',
    botonClase: 'google-btn',
    descripcionCorta: 'La experiencia Android definitiva con IA avanzada y fotografía computacional líder en el mercado.',
    caracteristicas: [
      'Google Tensor G2',
      'Cámara 50MP',
      '6.7" LTPO OLED',
      'Android puro'
    ]
  }
];

export const CELULARES_DETALLES = {
  'apple': {
    titulo: 'Titanio. Tan fuerte. Tan ligero. Tan Pro.',
    descripcion: 'iPhone 15 Pro está fabricado con titanio de calidad aeroespacial, el mismo que se utiliza en naves espaciales enviadas a Marte.',
    especificaciones: {
      pantalla: 'Super Retina XDR 6.7"',
      chip: 'A17 Pro con GPU de 6 núcleos',
      bateria: 'Hasta 29 horas de video',
      camara: 'Sistema Pro 48MP',
      almacenamiento: '128GB, 256GB, 512GB, 1TB',
      resistencia: 'IP68 (6m hasta 30 min)'
    }
  },
  'samsung': {
    titulo: 'El poder de lo inesperado',
    descripcion: 'Con un diseño que desafía lo convencional y un rendimiento que supera expectativas.',
    especificaciones: {
      pantalla: '6.8" Dynamic AMOLED 2X',
      chip: 'Snapdragon 8 Gen 2',
      bateria: '5000mAh',
      camara: '200MP cuádruple',
      almacenamiento: '256GB, 512GB, 1TB',
      resistencia: 'IP68 (1.5m hasta 30 min)'
    }
  },
  'xiaomi': {
    titulo: 'Fotografía profesional, rendimiento excepcional',
    descripcion: 'Captura el mundo como un profesional con la óptica Leica y el potente Snapdragon 8 Gen 2.',
    especificaciones: {
      pantalla: '6.73" AMOLED 2K',
      chip: 'Snapdragon 8 Gen 2',
      bateria: '4820mAh',
      camara: '50MP Leica',
      almacenamiento: '256GB, 512GB, 1TB',
      resistencia: 'IP68 (1.5m hasta 30 min)'
    }
  },
  'google': {
    titulo: 'La experiencia Android definitiva',
    descripcion: 'Disfruta de la velocidad de Google Tensor G2 y captura imágenes impresionantes con la cámara de 50MP.',
    especificaciones: {
      pantalla: '6.7" LTPO OLED',
      chip: 'Google Tensor G2',
      bateria: '5000mAh',
      camara: '50MP',
      almacenamiento: '128GB, 256GB',
      resistencia: 'IP68 (1.5m hasta 30 min)'
    }
  }
};
