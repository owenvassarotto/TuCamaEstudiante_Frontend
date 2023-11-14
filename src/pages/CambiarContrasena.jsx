import { useState } from 'react';
import PerfilNav from '../components/PerfilNav'
import Alerta from '../components/Alerta';
import useAuth from '../hooks/useAuth';

const CambiarContrasena = () => {

  const {guardarContrasena} = useAuth();
  const [alerta, setAlerta] = useState({});
  const [contrasena, setContrasena] = useState({
    contrasena_actual: "",
    contrasena_nueva: "",
  });
 
  const handleSubmit = async e => {
    e.preventDefault();

    if(Object.values(contrasena).some(campo => campo === "")){
      setAlerta({
        msg: "Completa los dos campos",
        error: true
      })
      return;
    }

    if(contrasena.contrasena_nueva.length < 6){
      setAlerta({
        msg: "La contraseña debe tener mínimo 6 caracteres",
        error: true
      })
      return;
    }

    if(contrasena.contrasena_nueva === contrasena.contrasena_actual){
      setAlerta({
        msg: "La contraseña nueva debe ser diferente a la actual",
        error: true
      })
      return;
    }

    // Almacenamos nueva contraseña en la DB
    const resultado = await guardarContrasena(contrasena);

    setAlerta(resultado);
  }

  const {msg} = alerta;

  return (
    <main className='px-3 md:px-10 my-8 mx-auto'>

      <PerfilNav contrasena={true} />

      <h1 className="text-xl md:text-2xl text-center my-6 font-bold">Cambiar Contraseña</h1>
      <p className='text-center mb-4'>Modifica tu <span className='text-primario font-bold'>contraseña aquí</span></p>
      
      <div className='flex justify-center'>
        <div className='w-full md:w-1/2 rounded-lg p-5 border border-gray-100 bg-white shadow-sm shadow-gray-300'>
            <form 
              onSubmit={handleSubmit}
            >
                <div className='my-3'>
                  <label htmlFor="contrasena_actual" className='uppercase font-bold text-gray-600'>Contraseña actual</label>
                  <input 
                    type="password" 
                    id='contrasena_actual' 
                    className='border bg-gray-50 w-full p-2 mt-3 rounded-lg'
                    name='contrasena_actual'
                    placeholder='Escribe tu contraseña actual'
                    onChange={e => setContrasena({
                      ...contrasena,
                      [e.target.name]: e.target.value,
                    })}
                  />
                </div>

                <div className='my-3'>
                  <label htmlFor="contrasena_nueva" className='uppercase font-bold text-gray-600'>Contraseña Nueva</label>
                  <input 
                    type="password" 
                    id='contrasena_nueva' 
                    className='border bg-gray-50 w-full p-2 mt-3 rounded-lg'
                    name='contrasena_nueva'
                    placeholder='Escribe tu contraseña nueva'
                    onChange={e => setContrasena({
                      ...contrasena,
                      [e.target.name]: e.target.value,
                    })}
                  />
                </div>

                <input 
                  type="submit"
                  value="Guardar Cambios"
                  className='bg-primario hover:bg-primario-hover px-10 py-3 mt-5 font-bold text-white rounded-lg uppercase w-full cursor-pointer'
                 />
            </form>

            {msg && <Alerta alerta={alerta} />}
        </div>
      </div>
    </main>
  )
}

export default CambiarContrasena