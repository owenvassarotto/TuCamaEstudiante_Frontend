import {FiUploadCloud} from "react-icons/fi";
import clienteAxios from "../config/axios";
import { useState } from "react";
import Asterisco from "./Asterisco";
import {FaTrash} from "react-icons/fa"
import {BsStar} from "react-icons/bs"
import {BsStarFill} from "react-icons/bs"

const FotosUploader = ({fotosSubidas, setFotosSubidas}) => {

    const [fotoLink, setFotoLink] = useState([]);

    const subirFotoPorLink = async e => {
        e.preventDefault();
        try {
            const {data} = await clienteAxios.post('/alojamientos/subir-foto-link', {link: fotoLink})
            setFotosSubidas(prev => {
                return [...prev, data];
            })
            setFotoLink('');
        } catch (error){
            console.log(error);
        }
    }
    
    const subirFotoDispositivo = async e => {
    // Obtenemos las fotos subidas desde dispositivo local
    const fotos = e.target.files; 
    const data = new FormData();
    for (let i = 0; i < fotos.length; i++) {
        data.append('fotos', fotos[i]);
    }
    await clienteAxios.post('/alojamientos/subir-foto-dispositivo', data, {
        headers: {
        "Content-type": "multipart/form-data"
        }
    }).then(response => {
        const {data} = response;
        setFotosSubidas(prev => {
        return [...prev, ...data];
        })
    })
    }

    const eliminarFoto = (e, link) => {
        e.preventDefault();
        setFotosSubidas([...fotosSubidas.filter(foto => foto !== link)]);
        // Llamada al endpoint para eliminar la imagen del servidor "/uploads"
    }

    const seleccionarFotoPrincipal = (e, link) => {
        e.preventDefault();
        // Agrego la foto seleccionada al principio del array
        setFotosSubidas([link, ...fotosSubidas.filter(foto => foto !== link)]);
    }

  return (
    <div className="mb-2">
        <label className="text-sm font-bold uppercase flex" htmlFor="fotos">Fotos <Asterisco/></label>
        <div className="flex items-center gap-2">
            <input
                className="border text-sm my-2 px-4 py-2 rounded-lg bg-gray-50 w-full"
                type="text" 
                accept=".jpg, .jpeg, .webp"
                id="fotos" 
                name="fotos" 
                placeholder="Añade una foto usando un link" 
                data-cy="link-foto"
                value={fotoLink}
                onChange={e => setFotoLink(e.target.value)}
            />
            <button 
                className="text-white rounded-xl bg-primario hover:bg-primario-hover p-2 text-sm"
                data-cy="agregar-foto"
                onClick={subirFotoPorLink}
            >
                Añadir&nbsp;foto
            </button>
        </div>

        <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {fotosSubidas.length > 0 && fotosSubidas.map((link) => (
                <div key={link} className="relative">
                    <img src={import.meta.env.VITE_UPLOADS_URL + "/" + link} className="w-full h-28 object-cover rounded-xl"/>
                    <button onClick={e => eliminarFoto(e, link)} className="absolute bottom-1 right-1 text-white bg-black bg-opacity-60 p-1.5 rounded-full cursor-pointer" title="Eliminar foto">
                        <FaTrash />
                    </button>
                    <button onClick={e => seleccionarFotoPrincipal(e, link)} className="absolute bottom-1 left-1 bg-black bg-opacity-60 p-1.5 rounded-full cursor-pointer" title="Seleccionar como principal">
                    {link === fotosSubidas[0] ? (
                        <BsStarFill className="text-yellow-300" />
                    ) : (
                        <BsStar className="text-white" />
                    )}
                    </button>
                </div>
            ))}
            <label className="bg-gray-50 hover:bg-gray-100 border rounded-2xl text-gray-500 flex justify-center items-center gap-2 font-bold h-28 text-xs md:text-sm cursor-pointer">
                <input 
                type="file" 
                accept=".jpg, .jpeg, .webp"
                multiple
                className="hidden"
                onChange={subirFotoDispositivo}
                />
                <FiUploadCloud className="text-xl" />
                Subir
            </label>
        </div>
    </div>
  )
}

export default FotosUploader