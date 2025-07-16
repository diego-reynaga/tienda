import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, onSnapshot, query, where, CollectionReference, DocumentData, orderBy, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MensajeChat } from '../modelo/mensaje-chat.modelo';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private comprasRef: CollectionReference<DocumentData>;
  private contactoRef: CollectionReference<DocumentData>;
  private mensajesChatRef: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.comprasRef = collection(this.firestore, 'compras') as CollectionReference<DocumentData>;
    this.contactoRef = collection(this.firestore, 'contacto') as CollectionReference<DocumentData>;
    this.mensajesChatRef = collection(this.firestore, 'mensajes-chat') as CollectionReference<DocumentData>;
  }

  // Agregar una nueva compra
  agregarCompra(compra: any): Promise<void> {
    return addDoc(this.comprasRef, compra)
      .then(() => {
        // Compra registrada exitosamente
      })
      .catch((error) => {
        console.error('Error al registrar la compra en Firebase:', error);
        throw error; // Propagar el error para manejarlo en el componente
      });
  }

  // Actualizar el estado de una compra
  actualizarEstadoCompra(id: string, nuevoEstado: string): Promise<void> {
    const compraDoc = doc(this.firestore, `compras/${id}`);
    return updateDoc(compraDoc, { estado: nuevoEstado })
      .then(() => {
        // Estado actualizado exitosamente
      })
      .catch((error) => {
        console.error(`Error al actualizar el estado de la compra ${id}:`, error);
        throw error; // Propagar el error para manejarlo en el componente
      });
  }

  // Escuchar cambios en las compras en tiempo real
  escucharCompras(): Observable<any[]> {
    const q = query(this.comprasRef);
    return new Observable((observer) => {
      try {
        onSnapshot(q, (snapshot) => {
          const compras = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          observer.next(compras);
        });
      } catch (error) {
        console.error('Error al escuchar cambios en la colección compras:', error);
        observer.error(error); // Emitir el error al Observable
      }
    });
  }

  // Agregar un nuevo mensaje de contacto
  agregarContacto(contacto: any): Promise<string> {
    const contactoData = {
      ...contacto,
      fechaCreacion: new Date(),
      estado: 'pendiente'
    };
    
    return addDoc(this.contactoRef, contactoData)
      .then((docRef) => {
        // Crear mensaje inicial automático del sistema
        this.crearMensajeInicialAutomatico(docRef.id, contacto);
        
        return docRef.id;
      })
      .catch((error) => {
        console.error('Error al registrar el mensaje de contacto en Firebase:', error);
        throw error;
      });
  }

  // Crear mensaje inicial automático del sistema
  private crearMensajeInicialAutomatico(contactoId: string, contacto: any): void {
    const mensajeInicial: MensajeChat = {
      contactoId: contactoId,
      remitente: 'personal',
      mensaje: `¡Hola ${contacto.firstName}! Gracias por contactarnos. Hemos recibido tu mensaje sobre "${contacto.subject}". Un miembro de nuestro equipo te responderá pronto. Mientras tanto, puedes escribir aquí si tienes alguna pregunta adicional.`,
      fechaEnvio: new Date(),
      leido: false,
      nombreRemitente: 'Equipo TechStore',
      emailRemitente: 'soporte@techstore.com'
    };
    
    // Agregar mensaje inicial al chat (sin esperar la respuesta)
    this.agregarMensajeChat(mensajeInicial).catch(error => {
      console.error('Error al crear mensaje inicial automático:', error);
    });
  }

  // Escuchar mensajes de contacto en tiempo real
  escucharContactos(): Observable<any[]> {
    const q = query(this.contactoRef);
    return new Observable((observer) => {
      try {
        onSnapshot(q, (snapshot) => {
          const contactos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          observer.next(contactos);
        });
      } catch (error) {
        console.error('Error al escuchar cambios en la colección contacto:', error);
        observer.error(error); // Emitir el error al Observable
      }
    });
  }

  // Actualizar el estado de un mensaje de contacto
  actualizarEstadoContacto(id: string, nuevoEstado: string): Promise<void> {
    const contactoDoc = doc(this.firestore, `contacto/${id}`);
    return updateDoc(contactoDoc, { estado: nuevoEstado })
      .then(() => {
        // Estado actualizado exitosamente
      })
      .catch((error) => {
        console.error(`Error al actualizar el estado del mensaje de contacto ${id}:`, error);
        throw error; // Propagar el error para manejarlo en el componente
      });
  }

  // Obtener compras por usuario
  obtenerComprasPorUsuario(userEmail: string): Observable<any[]> {
    console.log('Buscando compras para usuario:', userEmail);
    
    // Primero intentamos obtener todas las compras y filtrar manualmente
    // porque el email puede estar en diferentes ubicaciones
    return new Observable((observer) => {
      try {
        onSnapshot(this.comprasRef, (snapshot) => {
          const todasCompras = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          console.log('Total de compras en la base de datos:', todasCompras.length);
          
          // Filtrar compras por email (buscar en email directo y en cliente.email)
          const comprasFiltradas = todasCompras.filter(compra => {
            const data = compra as any;
            const emailDirecto = data.email;
            const emailCliente = data.cliente?.email;
            
            console.log('Compra:', compra.id, 'Email directo:', emailDirecto, 'Email cliente:', emailCliente);
            
            return emailDirecto === userEmail || emailCliente === userEmail;
          });
          
          console.log('Compras filtradas por email:', comprasFiltradas.length);
          observer.next(comprasFiltradas);
        });
      } catch (error) {
        console.error('Error al obtener compras del usuario:', error);
        observer.error(error);
      }
    });
  }

  // Obtener mensajes de contacto por usuario
  obtenerContactosPorUsuario(userEmail: string): Observable<any[]> {
    return new Observable((observer) => {
      try {
        // Obtener todos los contactos y filtrar por email
        onSnapshot(this.contactoRef, (snapshot) => {
          const contactos = snapshot.docs.map((doc) => {
            const data = doc.data();
            return { id: doc.id, ...data };
          }).filter(contacto => {
            // Manejar ambas estructuras: email y correo
            const email = (contacto as any).email || (contacto as any).correo;
            return email === userEmail;
          });
          
          observer.next(contactos);
        });
      } catch (error) {
        console.error('Error al obtener contactos del usuario:', error);
        observer.error(error);
      }
    });
  }

  // Obtener todos los contactos (para el personal/admin)
  obtenerTodosContactos(): Observable<any[]> {
    return new Observable((observer) => {
      try {
        onSnapshot(this.contactoRef, (snapshot) => {
          const contactos = snapshot.docs.map((doc) => {
            const data = doc.data();
            return { id: doc.id, ...data };
          });
          observer.next(contactos);
        });
      } catch (error) {
        console.error('Error al obtener todos los contactos:', error);
        observer.error(error);
      }
    });
  }

  // Agregar mensaje al chat
  agregarMensajeChat(mensaje: MensajeChat): Promise<void> {
    return addDoc(this.mensajesChatRef, {
      ...mensaje,
      fechaEnvio: new Date()
    })
      .then(() => {
        // Mensaje agregado exitosamente
      })
      .catch((error) => {
        console.error('Error al agregar mensaje de chat:', error);
        throw error;
      });
  }

  // Obtener mensajes de chat por contacto
  obtenerMensajesPorContacto(contactoId: string): Observable<MensajeChat[]> {
    // Crear query más simple sin índices complejos
    const q = query(this.mensajesChatRef, 
      where('contactoId', '==', contactoId)
    );
    
    return new Observable((observer) => {
      try {
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const mensajes = snapshot.docs.map((doc) => ({ 
            id: doc.id, 
            ...doc.data() 
          })) as MensajeChat[];
          
          // Ordenar manualmente por fecha
          const mensajesOrdenados = mensajes.sort((a, b) => {
            const fechaA = a.fechaEnvio instanceof Date ? a.fechaEnvio : new Date(a.fechaEnvio);
            const fechaB = b.fechaEnvio instanceof Date ? b.fechaEnvio : new Date(b.fechaEnvio);
            return fechaA.getTime() - fechaB.getTime();
          });
          
          observer.next(mensajesOrdenados);
        }, (error) => {
          console.error('Error en listener de mensajes:', error);
          observer.error(error);
        });
        
        // Retornar función de limpieza
        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error('Error al obtener mensajes del chat:', error);
        observer.error(error);
        return () => {}; // Función de limpieza vacía en caso de error
      }
    });
  }

  // Marcar mensajes como leídos
  marcarMensajesComoLeidos(contactoId: string, remitente: 'cliente' | 'personal'): Promise<void> {
    // Simplificar la query para evitar índices complejos
    const q = query(this.mensajesChatRef, 
      where('contactoId', '==', contactoId)
    );
    
    return getDocs(q).then((snapshot) => {
      const promises = snapshot.docs
        .filter(doc => {
          const data = doc.data();
          return data['remitente'] !== remitente && data['leido'] === false;
        })
        .map((docSnapshot) => {
          const docRef = doc(this.firestore, `mensajes-chat/${docSnapshot.id}`);
          return updateDoc(docRef, { leido: true });
        });
      
      return Promise.all(promises);
    }).then(() => {
      // Mensajes marcados como leídos
    }).catch((error) => {
      console.error('Error al marcar mensajes como leídos:', error);
      throw error;
    });
  }

  // Obtener count de mensajes no leídos por usuario
  obtenerMensajesNoLeidosPorUsuario(userEmail: string): Observable<number> {
    return new Observable((observer) => {
      // Primero obtener todos los contactos del usuario
      this.obtenerContactosPorUsuario(userEmail).subscribe(contactos => {
        if (contactos.length === 0) {
          observer.next(0);
          return;
        }

        const contactoIds = contactos.map(c => c.id);
        let totalNoLeidos = 0;
        let procesados = 0;

        contactoIds.forEach(contactoId => {
          // Simplificar la query para evitar índices complejos
          const q = query(this.mensajesChatRef,
            where('contactoId', '==', contactoId)
          );

          onSnapshot(q, (snapshot) => {
            // Filtrar manualmente en lugar de usar where complejos
            const noLeidos = snapshot.docs.filter(doc => {
              const data = doc.data();
              return data['remitente'] === 'personal' && data['leido'] === false;
            }).length;
            
            totalNoLeidos += noLeidos;
            procesados++;

            if (procesados === contactoIds.length) {
              observer.next(totalNoLeidos);
            }
          });
        });
      });
    });
  }
}