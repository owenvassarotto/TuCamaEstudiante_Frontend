import React from 'react'
import { IoMdPin } from 'react-icons/io'
import { MdModeEditOutline } from 'react-icons/md'
import {FaTrash} from "react-icons/fa"
import { Link } from 'react-router-dom'

const MiAlojamiento = ({alojamiento, eliminarAlojamiento}) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-4 bg-white p-4 md:p-3 border border-gray-100 rounded-md shadow-md mb-4">
                
        <div className='flex-none'>
            {alojamiento.fotos.length > 0 && (
            <img className="w-full h-52 md:w-80 md:max-h-full object-cover rounded-md" src={alojamiento.fotos[0]} alt="Imagen principal de alojamiento"  />
            )}
        </div>

        <div>
            <Link to={`/alojamiento/${alojamiento._id}`} className="font-semibold text-xl underline">{alojamiento.titulo.slice(0, 60) + "..."}</Link>
            <div className="flex gap-1 items-center my-2">
                <IoMdPin />
                <p className="text-sm">{alojamiento.direccion}</p>
            </div>
            <p className="text-sm">{alojamiento.descripcion.slice(0, 100) + "..."}</p>
        </div>     

        <div className="flex justify-between md:flex-col md:justify-around gap-5 py-2">
            <Link to={`/cuenta/alojamientos/editar/${alojamiento._id}`} className="text-green-500 text-sm flex gap-1 items-center font-bold" title="Editar Publicación">
                <MdModeEditOutline />
                <span>Editar</span>
            </Link>
            <button 
                className="text-red-500 text-sm flex gap-1 items-center font-bold" 
                title="Eliminar Publicación"
                onClick={() => eliminarAlojamiento(alojamiento._id)}
            >
                <FaTrash />
                <span>Eliminar</span>
            </button>
        </div>
    </div>
  )
}

export default MiAlojamiento