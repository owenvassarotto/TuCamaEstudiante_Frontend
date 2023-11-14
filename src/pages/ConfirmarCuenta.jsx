import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const ConfirmarCuenta = () => {

  // Extraigo el ID de la URL
  const params = useParams();
  const { id } = params;

  // Estado local para indicar si la cuenta se ha confirmado
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  // Estado local para mostrar alertas
  const [alerta, setAlerta] = useState({});

  // Se ejecuta una sola vez cuando el componente está listo
  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);

        // La cuenta se ha confirmado con éxito
        setCuentaConfirmada(true);

        // Muestra una alerta con un mensaje exitoso
        setAlerta({
          msg: data.msg,
          error: false
        })
      } catch (error) {

        // Muestra una alerta de error en caso de fallo
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    
    // Llama a la función para confirmar la cuenta
    confirmarCuenta();
  }, [])

  const {msg} = alerta;

  return (
    <>  
      <div>
        <h1 className="text-2xl md:text-4xl text-center mb-6 font-bold">¡Confirma tu Cuenta y encuentra<span className="text-primario md:text-4xl">{" "}tu Alojamiento Ahora</span>!</h1>
      </div>
      
      <div className="p-4 border rounded-md bg-white shadow shadow-gray-200">
        {msg && <Alerta alerta={alerta} />}

        {cuentaConfirmada && (
          // Enlace para iniciar sesión una vez que la cuenta se ha confirmado
          <Link to={'/login'} className="text-gray-500 text-sm underline">Inicia sesión</Link>
        )}
      </div>
    </>
  )
}

export default ConfirmarCuenta
