import { Link } from "react-router-dom";
import { HiCursorClick, HiUser, HiMenu, HiUserCircle, HiBookmark } from "react-icons/hi";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Header = () => {

  const { auth, cerrarSesion } = useAuth();

  const [navbarVisible, setNavbarVisible] = useState(true);

  const toggleNavbar = () => {
    setNavbarVisible(!navbarVisible);
  };

  return (
    <header className='py-2 px-3 md:px-10 shadow-sm bg-white flex justify-between items-center'>
        <Link to={"/"} className='flex items-center gap-2'>
          {/* <img src="/images/cama.png" alt="Logotipo" className="w-6 md:w-9" /> */}
          <span className='md:text-xl font-bold'>TuCamaEstudiante.com</span>
        </Link>

        <nav>
          <ul className="flex gap-6 items-center">
            <li className="hidden md:inline-block">
              <Link to={'/cuenta/alojamientos/nuevo'} className='flex gap-1 items-center'>
                <HiCursorClick className="text-primario" />
                <span className='text-sm'>Publica tu alojamiento</span>
              </Link>  
            </li>

            {auth?._id && (
              <li className="hidden md:inline-block">
                <Link to={'/cuenta/alojamientos/guardados'} className='flex gap-1 items-center'>
                  <HiBookmark className="text-primario" />
                  <span className='text-sm'>Guardados</span>
                </Link>  
              </li>
            )}

            <li>
              {!auth?._id ? (
                <Link to={'/login'} className="flex gap-1 items-center">
                  <HiUser className="text-primario" />
                  <span className='text-sm'>Iniciar sesión</span>
                </Link>
              ) : (
                <div className="relative">
                  <button 
                    className="flex gap-1 items-center border border-gray-200 hover:bg-gray-100 hover:shadow-sm p-2 rounded-full"
                    onClick={toggleNavbar}
                  >
                    <HiMenu className="text-primario text-xl" />
                    <HiUserCircle className="text-2xl text-secundario" />
                    {/* Función para mostrar hasta el segundo espacio del nombre, ej. nombre: Santiago Roberto Comolli resultado: Santiago Roberto */}
                    <span className='text-xs font-bold'>{(auth.nombre).split(' ').slice(0, 2).join(' ')}</span>
                  </button>

                  {navbarVisible && (
                    <div className="bg-white shadow p-4 rounded-lg absolute right-0 w-full mt-2 z-50">
                      <nav>
                        <ul className="flex flex-col gap-3 text-xs">
                          <li className="md:hidden">
                            <Link to={'/cuenta/alojamientos/nuevo'}>Publicá tu habitación</Link>
                          </li>
                          <li>
                            <Link to={'/cuenta/alojamientos/publicados'}>Mis publicaciones</Link>
                          </li>
                          <li className="md:hidden">
                            <Link to={'/cuenta/alojamientos/guardados'}>Guardados</Link>
                          </li>
                          <li>
                            <Link to={'/cuenta/perfil'}>Mi perfil</Link>
                          </li>
                          <li>
                            <button
                              onClick={cerrarSesion}
                            >
                              Cerrar sesión
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  )}
                </div>
              )}
            </li>
          </ul>
        </nav>
    </header>
  )
}

export default Header