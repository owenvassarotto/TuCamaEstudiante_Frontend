import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

const NuevaContrasena = () => {

    // Estado local para la contraseña
    const [password, setPassword] = useState('');

    // Estado local para mostrar alertas
    const [alerta, setAlerta] = useState({});

    // Estado local para verificar si el token es válido
    const [tokenValido, setTokenValido] = useState(false);

    // Estado local para indicar si la contraseña se ha restablecido
    const [passwordReestablecida, setPasswordReestablecida] = useState(false);

    // Obtiene el token de los parámetros de la URL
    const params = useParams();
    const { token } = params;
    
    // useEffect para comprobar si el token es válido
    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/usuarios/olvide-password/${token}`);
                setTokenValido(true);
            } catch (error) {
                setAlerta({
                    msg: 'Hubo un error con el enlace',
                    error: true
                });
            }
        }
        comprobarToken();
    }, []);

    // Función que maneja el envío del formulario para restablecer la contraseña
    const handleSubmit = async e => {
        e.preventDefault();

        if (password === '') {
            setAlerta({
                msg: "Debes ingresar tu nueva contraseña",
                error: true,
            });
            return;
        }

        try {
            const { data } = await clienteAxios.post(`/usuarios/olvide-password/${token}`, { password });
            setAlerta({
                msg: data.msg,
                error: false
            });
            setPasswordReestablecida(true);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    const { msg } = alerta;

  return (
    <>
        <div>
            <h1 className="text-3xl text-center mb-6 font-bold text-secundario">Reestablece tu Contraseña y no Pierdas Acceso a{" "}<span className="text-primario text-3xl">TuCamaEstudiante.com</span></h1>
        </div>

        <div 
          className="p-4 border rounded-md bg-white shadow shadow-gray-200"
        >
            {tokenValido && 
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="text-sm md:text-base font-bold uppercase" htmlFor="password">Nueva contraseña</label>
                        <input 
                            className="w-full border my-2 py-2 px-4 rounded-lg bg-gray-50"
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Ingresa tu nueva contraseña" 
                            value={password} onChange={e => setPassword(e.target.value)} 
                        />
                    </div>
                    <input type="submit" value="Reestablecer contraseña" className="mt-2 bg-primario py-2 px-4 text-white font-bold uppercase rounded-md cursor-pointer w-full md:w-min" />
                </form> 
            }

            {msg && <Alerta alerta={alerta} />}

            {passwordReestablecida && (
                <Link to={'/login'} className="text-gray-500 text-sm underline">Inicia sesión</Link>
            )}
        </div>
    </>
  )
}

export default NuevaContrasena
