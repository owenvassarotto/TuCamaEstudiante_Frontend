import { Link } from "react-router-dom";
import {BsFillDoorClosedFill, BsHouseDoorFill, BsFillBuildingFill} from "react-icons/bs";
import {FaRegBookmark, FaBookmark} from "react-icons/fa6";
import { IoMdPin } from 'react-icons/io'
import {BiBed, BiBath} from "react-icons/bi";
import {BsCrop} from "react-icons/bs";
import {HiOutlineUser} from "react-icons/hi";
import useAuth from "../hooks/useAuth";
import AccountPrompt from "./AccountPrompt";
import { useState } from "react";
import { formatearFecha, formatearPrecio } from "../../helpers";

const AlojamientoCard = ({alojamiento}) => {

  const {auth, guardarAlojamientoFavorito, eliminarAlojamientoFavorito} = useAuth();

  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const handleClick = (e, id) => {
    e.preventDefault();
    if(auth._id){
      if(auth.alojamientosGuardados.includes(id)){
        eliminarAlojamientoFavorito(id);
      }else{
        guardarAlojamientoFavorito(id);
      }
    }else{
      setMostrarAlerta(true);
    }
  }

  return (
    <>
      <Link to={`/alojamiento/${alojamiento._id}`} className="p-3 border bg-white border-gray-100 shadow-sm shadow-gray-300 rounded-sm w-full relative">
          
          <img className="object-cover rounded-sm h-56 w-full" src={alojamiento.fotos[0]} alt="Imagen principal de alojamiento"  />
          <div className="bg-primario p-2 text-xl absolute top-4 left-4 text-white rounded-full" title={alojamiento.tipoAlojamiento}>
          {alojamiento.tipoAlojamiento === "habitacion" ? <BsFillDoorClosedFill /> : alojamiento.tipoAlojamiento === "departamento" ? <BsFillBuildingFill /> : <BsHouseDoorFill />}
          </div>
          <button 
            className="absolute top-4 right-4 text-xl p-2 text-white bg-black bg-opacity-40 hover:bg-opacity-50 rounded-full cursor-pointer" 
            title="Guardar publicación"
            onClick={e => handleClick(e, alojamiento._id)}
          >
            {auth?.alojamientosGuardados?.includes(alojamiento._id) ? (
              <FaBookmark />
            ) : (
              <FaRegBookmark />
            )}
          </button>
          <div className="flex gap-2 items-center mt-3">
            <p className="text-white text-xs bg-primario rounded-xl px-2 py-1 font-bold">{alojamiento.tipoAlojamiento === "habitacion" ? "Habitación" : alojamiento.tipoAlojamiento === "departamento" ? "Departamento" : "Casa"}</p>
            <div className="flex items-center text-white text-xs bg-green-500 rounded-xl px-2 py-1 font-bold gap-1">
            <IoMdPin />
            <p>{alojamiento.provincia}</p>
            </div>
          </div>
          <p className="mt-2 truncate text-xl">{alojamiento.direccion}</p>
          <div className="flex items-center gap-4 my-2">
            <div className="flex items-center gap-1">
              <HiOutlineUser />
              <span>{alojamiento.capacidadPersonas}</span>
            </div>

            <div className="flex items-center gap-1">
              <BiBed />
              <span>{alojamiento.dormitorios}</span>
            </div>

            <div className="flex items-center gap-1">
              <BiBath />
              <span>{alojamiento.banos}</span>
            </div>

            {alojamiento.metrosCuadrados > 0 && (
                <div className="flex items-center gap-1">
                <BsCrop />
                <span>{alojamiento.metrosCuadrados + "m²"}</span>
              </div>
            )}
          </div>
          <p className="text-xl font-bold mb-2">
            {alojamiento.precio == 0 ? "Sin precio (consultar)" : formatearPrecio(alojamiento.precio) + " " + alojamiento.moneda}
          </p>
          <p className="text-sm text-gray-500">{"Publicado el " + formatearFecha(alojamiento.createdAt)}</p>
      </Link>
      {mostrarAlerta && <AccountPrompt setMostrarAlerta={setMostrarAlerta} />}
    </>
  )
}

export default AlojamientoCard