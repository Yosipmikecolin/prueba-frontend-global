# 🎯 Frontend — Prueba Técnica

Este repositorio corresponde a la implementación **Frontend** desarrollada en **Next.js**, enfocada en una arquitectura modular, escalable y orientada a la mantenibilidad.  
La solución prioriza buenas prácticas de seguridad, experiencia de usuario fluida y eficiencia en la gestión de estado y datos.

---

## 🧱 Stack Tecnológico

| Tecnología | Descripción |
|----------|-------------|
| **Next.js (última versión)** | Framework base para la aplicación y ruteo |
| **Zustand** | Gestión de estado global (auth, loading, errores) |
| **Axios** | Comunicación con el backend |
| **React Query** | Cacheo y sincronización eficiente de peticiones |
| **ShadCN UI** | Sistema de componentes reutilizable |
| **TailwindCSS** | Estilos responsivos y consistentes |
| **JWT + Cookies HTTPOnly** | Autenticación segura |
| **Next Middleware** | Protección de rutas desde el servidor |

---

## 🔐 Autenticación y Seguridad

La autenticación utiliza **JWT almacenado en una cookie HTTPOnly**, evitando el acceso directos desde el cliente y reduciendo el riesgo de ataques XSS.

- El token **no se expone en localStorage**.
- La cookie caduca según la misma expiración interna del token.
- Las **rutas privadas** se verifican desde **Middleware de Next**, garantizando acceso rápido y seguro sin re-renderizados innecesarios.

---

## 🧠 Gestión de Estado con Zustand

El estado global gestiona sesión, errores y carga de datos del usuario:


```
{
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: () => void;
  logout: () => void;
  clearError: () => void;
  fetchUser: () => void;
}
```

##  📄 Instrucciones de Ejecución

- Asegúrese de ejecutar el backend del proyecto siguiendo las instrucciones detalladas en su archivo README.
- Asegúrese de tener el gestor de paquetes ```pnpm``` instalado. Puede verificarlo ejecutando ```pnpm -v``` en su terminal. Si no lo tiene, instálelo globalmente usando npm (asumiendo que tiene Node.js): ```npm install -g pnpm```
- Inicie el entorno de desarrollo del frontend con el comando: ```pnpm run dev```
- Abra el navegador en la siguiente ruta para acceder a la aplicación: ```http://localhost:3000/```

---

##  📄 Video de prueba

Por el afán, no grabé audio y el video está sin audio. Me disculpo, pero se puede ver la funcionalidad de la prueba técnica.:

[https://drive.google.com/file/d/1g4oRoHzzUMaNOSSqFARrbKyGlRYMqurL/view?usp=sharing](https://drive.google.com/file/d/1g4oRoHzzUMaNOSSqFARrbKyGlRYMqurL/view?usp=sharing)

---



## 😓 Disculpas

- Pido disculpas por no haber podido completar todos los requisitos de la prueba debido a una limitación de tiempo, ya que se me presentó otra evaluación para el mismo día.

- La vista que quedó pendiente de finalizar fue la sección de programas o cursos del administrador. A pesar de no haberla terminado, implementé la vista interactiva con datos ficticios para simular la funcionalidad requerida.

- De haber contado con más tiempo, habría seguido la misma arquitectura y lógica que desarrollé para la vista del administrador, aplicándola a la sección de estudiantes.
