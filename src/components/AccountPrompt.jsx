import { Link } from "react-router-dom"
import {BsXCircle} from "react-icons/bs"
import { useState } from "react"

const AccountPrompt = ({setMostrarAlerta}) => {

    const visible = true;

    const toggleVisible = e => {
      e.preventDefault();
      setMostrarAlerta(!visible);
    };

    return (
      <>
        {visible && (
          <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-md w-[480px] mx-2">
            <div className="flex justify-between items-center mb-8 p-4 border-b border-gray-300 shadow-md">
              <p className="text-lg font-bold">¡Bienvenido!</p>
              <button 
                  onClick={toggleVisible} 
                  className="text-3xl"
              ><BsXCircle /></button>
            </div>
            <p className="mb-6 text-center px-4">
              Creá tu cuenta o inicia sesión para guardar tus alojamientos favoritos y acceder a ellos cuando quieras.
            </p>
            <div className="flex justify-center px-4 mb-8">
              <Link
                to="/login"
                className="bg-primario text-white font-bold py-2 px-4 rounded mr-4"
              >
                Iniciar&nbsp;Sesión
              </Link>
              <Link
                to="/registrar"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Crear&nbsp;Cuenta
              </Link>
            </div>
          </div>
        </div>
        )}
      </>
    )
}

export default AccountPrompt