import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

// Este Provider va a retornar el Context 
const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token_usuario_tucamaestudiante');
            if(!token){
                setCargando(false);
                return;
            }
            
            // Crear el header de configuración
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios('/usuarios/perfil', config);
                // Seteamos los datos del usuario en el context
                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }

            setCargando(false);
        }
        autenticarUsuario();
    }, [])

    
    // Función para cerrar sesión elimnando token del localStorage
    const cerrarSesion = () => {
        localStorage.removeItem('token_usuario_tucamaestudiante');
        setAuth({});
    }
    
    const guardarAlojamientoFavorito = async id => {

        const token = localStorage.getItem('token_usuario_tucamaestudiante');
            if(!token){
                return;
            }
            
            // Crear el header de configuración
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios.put(`/usuarios/perfil/guardar-alojamiento-favorito/${id}`, {id}, config);
                setAuth({
                    ...auth,
                    alojamientosGuardados: data
                });
            } catch (error) {
                console.log(error);
            }
    }    

    const eliminarAlojamientoFavorito = async id => {

        const token = localStorage.getItem('token_usuario_tucamaestudiante');
        if(!token){
            return;
        }
        
        // Crear el header de configuración
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await clienteAxios.put(`/usuarios/perfil/eliminar-alojamiento-favorito/${id}`, {id}, config);
            setAuth({
                ...auth,
                alojamientosGuardados: data
            });
        } catch (error) {
            console.log(error);
        }
    }   

    const actualizarPerfil = async datos => {
        try {
            const token = localStorage.getItem('token_usuario_tucamaestudiante');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.put(`/usuarios/perfil/${datos._id}`, datos, config);
            await clienteAxios.put(`/alojamientos/actualizar-contacto/${datos._id}`, datos, config);
            // Actualizamos el auth con los nuevos datos del usuario
            setAuth(data);
            return {
                msg: "Almacenado correctamente",
                error: false
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const guardarContrasena = async datos => {
        const token = localStorage.getItem('token_usuario_tucamaestudiante');
        if(!token){
            return;
        }
        
        // Crear el header de configuración
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await clienteAxios.put("/usuarios/modificar-contrasena", datos, config);
            return {
                msg: data.msg,
                error: false,
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true,
            }
        }
    }

    return(
        <AuthContext.Provider
            value={{
                auth, 
                setAuth,
                cargando,
                cerrarSesion,
                guardarAlojamientoFavorito,
                eliminarAlojamientoFavorito,
                actualizarPerfil,
                guardarContrasena
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;