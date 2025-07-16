export interface Contacto {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  agree: boolean;
  fechaCreacion?: Date;
  estado?: string;
}
