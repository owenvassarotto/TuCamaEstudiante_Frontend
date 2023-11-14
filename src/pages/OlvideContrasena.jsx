import { useState } from "react"
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const OlvideContrasena = () => {

  const [email, setEmail] = useState('');

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if(email === ''){
      setAlerta({
        msg: "Debes ingresar tu email",
        error: true
      })
      return;
    }

    try {
      const {data} = await clienteAxios.post('/usuarios/olvide-password', {email});
      setAlerta({
        msg: data.msg,
        error: false 
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true 
      });
    }
  }

  const {msg} = alerta;
  
  return (
      <>
        <div>
          <h1 className="text-3xl md:text-5xl text-center mb-6 font-bold text-primario">¿Contraseña olvidada? <span className="text-secundario">Ingresa tu correo y recibe instrucciones para recuperarla.</span></h1>
        </div>

        <form 
          className="p-4 border rounded-md bg-white shadow-sm shadow-gray-200"
          onSubmit={handleSubmit}
        >
          <div className="mb-2">
            <label className="text-sm md:text-base font-bold uppercase" htmlFor="email">Email</label>
            <input
  className="w-full border my-2 py-2 px-4 rounded-lg bg-gray-50" 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Ingresa tu email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <input type="submit" value="Enviar instrucciones" className="mt-2 bg-primario hover:bg-primario-hover py-2 px-4 text-white font-bold uppercase rounded-md cursor-pointer w-full md:w-min" />

          {msg && <Alerta alerta={alerta} />}

          <nav className="flex flex-col md:flex-row gap-4 text-center mt-8">
            <Link to={'/login'} className="text-gray-500 text-sm">¿Recordaste tu contraseña?{" "}<span className="underline">Inicia sesión ahora</span></Link>
            <Link to={'/registrar'} className="text-gray-500 text-sm">¿No tienes una cuenta?{" "}<span className="underline">Regístrate</span></Link>
          </nav>
        </form>
      </>
  )
}

export default OlvideContrasena