import { useEffect, useState } from "react"
import clienteAxios from "../config/axios";
import AlojamientoCard from "../components/AlojamientoCard";
import useAuth from "../hooks/useAuth";

const Guardados = () => {

  // Obtiene la información de autenticación del usuario a través del hook "useAuth"
  const { auth } = useAuth();

  // Estado local para almacenar la lista de alojamientos guardados
  const [alojamientos, setAlojamientos] = useState([]);

  useEffect(() => {
    // Función asincrónica para obtener los alojamientos guardados del usuario
    const obtenerAlojamientosGuardados = async () => {

      // Obtiene el token de autenticación del usuario desde el almacenamiento local
      const token = localStorage.getItem('token_usuario_tucamaestudiante');
      
      // Si no hay un token, la función no procede
      if (!token) {
        return;
      }
      
      // Configuración de cabeceras para la solicitud a la API, incluyendo el token de autenticación
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      try {
        // Realiza una solicitud a la API para obtener los alojamientos guardados
        const { data } = await clienteAxios('/alojamientos/obtener-alojamientos-guardados', config);

        // Actualiza el estado "alojamientos" con los datos obtenidos de la API
        setAlojamientos(data);
      } catch (error) {
        console.log(error);        
      }
    }
    
    // Llama a la función para obtener los alojamientos guardados cuando cambia "auth.alojamientosGuardados"
    obtenerAlojamientosGuardados();
  }, [auth.alojamientosGuardados]);

  return (
    <main className="px-3 md:px-10 my-8 mx-auto">
        <h1 className="text-xl md:text-2xl text-center mb-6 font-bold">Alojamientos Guardados</h1>

        {alojamientos.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {alojamientos?.map(alojamiento => (
              // Mapea la lista de alojamientos y muestra cada uno utilizando el componente "AlojamientoCard"
              <AlojamientoCard alojamiento={alojamiento} key={alojamiento._id} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-center">No tienes ningún alojamiento guardado. 😩</p>
        )}
    </main>
  )
}

export default Guardados
