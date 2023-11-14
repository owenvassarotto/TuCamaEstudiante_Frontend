import { useEffect, useState } from "react"
import clienteAxios from "../config/axios";
import MiAlojamiento from "../components/MiAlojamiento";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const MisPublicaciones = () => {

  const [alojamientos, setAlojamientos] = useState([]);

  useEffect(() => {
    obtenerAlojamientos();
  }, []);
  
  const obtenerAlojamientos = async () => {
    const token = localStorage.getItem('token_usuario_tucamaestudiante');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
    const {data} = await clienteAxios('/alojamientos', config);
    setAlojamientos(data);
  }

  const eliminarAlojamiento = async id => {
    
    const confirmacion = await MySwal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción eliminará el alojamiento. Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1481f7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: "Cancelar"
    })
    
    if (confirmacion.isConfirmed) {
      try {
        const token = localStorage.getItem('token_usuario_tucamaestudiante');
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
        await clienteAxios.delete(`/alojamientos/${id}`, config);
        obtenerAlojamientos();
        Swal.fire(
          '¡Eliminado!',
          'Tu alojamiento fue eliminado correctamente.',
          'success'
        )
      } catch (error) {
        console.log(error);
      }
    }

  }

  return (
    <div className="px-3 md:px-10 my-8 mx-auto md:max-w-5xl">
      <h1 className="text-xl md:text-2xl text-center mb-6 font-bold">Mis Publicaciones</h1>

      <div>
        {alojamientos.length > 0 ? (
          alojamientos.map(alojamiento => (
            <MiAlojamiento alojamiento={alojamiento} key={alojamiento._id} eliminarAlojamiento={eliminarAlojamiento} />
          ))
        ) : (
          <p className="text-sm text-center">No tienes ningún alojamiento publicado. 😕</p>
        )}
      </div>
    </div>
  )
}

export default MisPublicaciones 