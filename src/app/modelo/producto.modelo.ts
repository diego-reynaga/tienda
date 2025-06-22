export interface Producto {
    id?: string;
    nombre?: string;
    marca?: string;
    modeloCompleto?: string;
    descripcion?: string;
    color?: string;
    precio?: number;
    imagenLogo?: string;
    imagenProducto?: {
        ruta: string;
        splineUrl: string;
    };
    imagenGrande?: string;
    gradienteClase?: string;
    botonClase?: string;
    especificaciones?: {
        pantalla?: {
            tipo?: string;
            tamaño?: string;
            resolucion?: string;
            densidad?: string;
        };
        procesador?: {
            chip?: string;
            ram?: string;
            almacenamiento?: string;
        };
        camaras?: {
            principal?: string;
            ultraAngular?: string;
            telefoto?: string;
            periscopio?: string;
            macro?: string;
            frontal?: string;
        };
        bateria?: {
            capacidad?: string;
            cargaRapida?: string;
            cargaInalambrica?: string;
        };
        caracteristicas?: string[];
    };
    coloresDisponibles?: Array<{
        codigo: string;
        activo?: boolean;
    }>;
}

export interface ProductoResumen {
    id: string;
    marca: string;
    modeloCompleto: string;
    imagenLogo: string;
    imagenProducto: {
        ruta: string;
        splineUrl: string;
    };
    precio: number;
    caracteristicas: string[];
    gradienteClase: string;
    botonClase?: string;
    descripcionCorta: string;
}