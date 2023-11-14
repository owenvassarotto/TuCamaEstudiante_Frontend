import { useEffect, useState } from 'react'
import PerfilNav from '../components/PerfilNav'
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alerta';

const EditarPerfil = () => {

  // Obtiene el objeto "auth" y la función "actualizarPerfil" desde el hook "useAuth"
  const { auth, actualizarPerfil } = useAuth();

  // Estado para almacenar el perfil del usuario
  const [perfil, setPerfil] = useState({});

  // Estado para mostrar alertas
  const [alerta, setAlerta] = useState({});

  // useEffect para actualizar el perfil cuando "auth" cambia
  useEffect(() => {
    setPerfil(auth);
  }, [auth]);

  // Función que maneja el envío del formulario
  const handleSubmit = async e => {
    e.preventDefault();

    // Extrae campos del perfil
    const { nombre, telefono, email } = perfil;

    // Verifica si algún campo está vacío y muestra una alerta si es necesario
    if ([nombre, telefono, email].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      });
    }

    // Llama a la función "actualizarPerfil" para guardar los cambios en el perfil
    const resultado = await actualizarPerfil(perfil);

    // Muestra una alerta con el resultado
    setAlerta({
      msg: resultado.msg,
      error: resultado.error,
    });
  }

  // Extrae el mensaje de la alerta
  const { msg } = alerta;

  return (
    <main className='px-3 md:px-10 my-8 mx-auto'>

      {/* Componente "PerfilNav" para la navegación de perfil */}
      <PerfilNav perfil={true} />

      <h1 className="text-xl md:text-2xl text-center my-6 font-bold">Mi Perfil</h1>
      <p className='text-center mb-4'>Modifica tu <span className='text-primario font-bold'>información aquí</span></p>

      <div className='flex justify-center'>
        <div className='w-full md:w-1/2 rounded-lg p-5 border border-gray-100 bg-white shadow-sm shadow-gray-300'>

          <form 
            onSubmit={handleSubmit}
          >
            <div className='my-3'>
              <label htmlFor="nombre" className='uppercase font-bold text-gray-600'>Nombre y apellido</label>
              <input 
                type="text" 
                id='nombre' 
                className='border bg-gray-50 w-full p-2 mt-3 rounded-lg'
                name='nombre'
                value={perfil.nombre || ""}
                onChange={e => setPerfil({
                  ...perfil,
                  [e.target.name]: e.target.value
                })}
              />
            </div>

            <div className='my-3'>
              <label htmlFor="telefono" className='uppercase font-bold text-gray-600'>Teléfono</label>
              <input 
                type="text" 
                id='telefono' 
                className='border bg-gray-50 w-full p-2 mt-3 rounded-lg'
                name='telefono'
                value={perfil.telefono || ""}
                onChange={e => setPerfil({
                  ...perfil,
                  [e.target.name]: e.target.value
                })}
              />
            </div>

            <div className='my-3'>
              <label htmlFor="email" className='uppercase font-bold text-gray-600'>Email</label>
              <input 
                type="text" 
                id='email' 
                className='border bg-gray-50 w-full p-2 mt-3 rounded-lg'
                name='email'
                value={perfil.email || ""}
                onChange={e => setPerfil({
                  ...perfil,
                  [e.target.name]: e.target.value
                })}
              />
            </div>

            <input 
              type="submit"
              value="Guardar Cambios"
              className='bg-primario hover:bg-primario-hover px-10 py-3 mt-5 font-bold text-white rounded-lg uppercase w-full cursor-pointer'
            />
          </form>

          {/* Muestra la alerta si existe un mensaje de alerta */}
          {msg && <Alerta alerta={alerta} />}
        </div>
      </div>
    </main>
  )
}

export default EditarPerfil
