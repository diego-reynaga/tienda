export interface MensajeChat {
  id?: string;
  contactoId: string;
  remitente: 'cliente' | 'personal';
  mensaje: string;
  fechaEnvio: Date;
  leido: boolean;
  nombreRemitente?: string;
  emailRemitente?: string;
}

export interface ConversacionContacto {
  id?: string;
  contactoOriginal: any;
  mensajes: MensajeChat[];
  ultimoMensaje: Date;
  estado: 'abierto' | 'cerrado' | 'pendiente';
}
