import { Link } from "react-router-dom"


const PerfilNav = ({perfil, contrasena}) => {

  return (
    <nav className="flex gap-3">
        <Link
            to={"/cuenta/perfil"}
            className={`text-sm font-bold uppercase ${perfil ? "text-gray-600 underline" : "text-gray-500"}`}
        >
        Perfil
        </Link>

        <Link
            to={"/cuenta/cambiar-contrasena"}
            className={`text-sm font-bold uppercase ${contrasena ? "text-gray-600 underline" : "text-gray-500"}`}
        >
        Cambiar contraseña
        </Link>
    </nav>
  )
}

export default PerfilNav