import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import clienteAxios from "../config/axios";
import FotosAlojamiento from "../components/FotosAlojamiento";
import {FaRegBookmark, FaBookmark} from "react-icons/fa6";
import { IoMdPin } from 'react-icons/io'
import {HiOutlineUser} from "react-icons/hi";
import {BsCrop, BsFillTelephoneForwardFill} from "react-icons/bs";
import {BiBed, BiBath, BiBorderInner} from "react-icons/bi";
import {GoDotFill} from "react-icons/go";
import {GrMail} from "react-icons/gr";
import useAuth from "../hooks/useAuth";
import AccountPrompt from "../components/AccountPrompt";
import {FaUserCircle} from "react-icons/fa";
import { formatearPrecio, formatearFecha } from "../../helpers";
import Alerta from "../components/Alerta";
import { Oval } from "react-loader-spinner";

const Alojamiento = () => {

    const {id} = useParams();

    const {auth, guardarAlojamientoFavorito, eliminarAlojamientoFavorito} = useAuth();

    const [mostrarAlerta, setMostrarAlerta] = useState(false);

    const [alojamiento, setAlojamiento] = useState({});

    const [alerta, setAlerta] = useState({});

    const [mostrarLoader, setMostrarLoader] = useState(false);

    // Campos form
    const [nombreForm, setNombreForm] = useState('');
    const [telefonoForm, setTelefonoForm] = useState('');
    const [emailForm, setEmailForm] = useState('');
    const [mensajeForm, setMensajeForm] = useState('');

    useEffect(() => {
        if(!id) return;

        const obtenerAlojamiento = async () => {
            try {
                const {data} = await clienteAxios(`/alojamientos/${id}`);
                setAlojamiento(data);
            } catch (error) {
                console.log(error);
            }
        }
        obtenerAlojamiento();
    }, [id]);

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

      const handleSubmit = async e => {
        e.preventDefault();
        
        if([nombreForm, telefonoForm, emailForm, mensajeForm].includes('')){
            setAlerta({
                msg: "Completa todos los campos",
                error: true
            })
            return;
        }

        setMostrarLoader(true);

        const datos = {
            nombre: nombreForm,
            telefono: telefonoForm,
            emailUsuario: emailForm,
            mensaje: mensajeForm,
            email: alojamiento.contacto.email,
            tituloPublicacion: alojamiento.titulo,
        }

        try {
            const {data} = await clienteAxios.post("/usuarios/enviar-mensaje-propietario", datos);
            setAlerta({
                msg: data.msg,
                error: false
            })
        } catch (error) {
            setAlerta({
                msg: error.msg,
                error: true
            })
        }

        setMostrarLoader(false);
      }

      const {msg} = alerta;

  return (
    <main className="px-3 md:px-10 my-8">
        {alojamiento._id ? (
            <div className="w-full h-full">
                <div className="bg-white p-4 rounded-sm border border-gray-200 mb-3">
                    <p className="text-sm text-gray-500 mb-3">{"Publicado el " + formatearFecha(alojamiento.createdAt)}</p>
                    <div className="flex justify-between items-start gap-1">
                        <h1 className="text-sm md:text-base uppercase font-bold">{alojamiento.titulo}</h1>
                        <button 
                            className="text-xl p-2 flex-none -mt-1 text-white bg-black bg-opacity-40 hover:bg-opacity-50 rounded-full cursor-pointer" 
                            title="Guardar publicación"
                            onClick={e => handleClick(e, alojamiento._id)}
                        >
                            {auth.alojamientosGuardados?.includes(alojamiento._id) ? (
                            <FaBookmark />
                            ) : (
                            <FaRegBookmark />
                            )}
                        </button>
                    </div>
                    <a href={"https://www.google.com/maps?q=" + alojamiento.direccion + " " + alojamiento.provincia} target="_blank" className="inline-block mb-3 underline">{alojamiento.direccion + ", " + alojamiento.provincia}</a>
                    <div className="flex gap-2 items-center mb-3">
                        <p className="text-white text-xs bg-primario rounded-xl px-2 py-1 font-bold">{alojamiento.tipoAlojamiento === "habitacion" ? "Habitación" : alojamiento.tipoAlojamiento === "departamento" ? "Departamento" : "Casa"}</p>
                        <div className="flex items-center text-white text-xs bg-green-500 rounded-xl px-2 py-1 font-bold gap-1">
                            <IoMdPin />
                            <p>{alojamiento.provincia}</p>
                        </div>
                    </div>
                    <div>

                    </div>
                    <div className="w-full h-80 md:h-[500px] mb-5">
                        <FotosAlojamiento fotos={alojamiento.fotos} />
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                        <div className="bg-white p-4 rounded-sm border border-gray-200 mb-3">
                            <p className="text-2xl font-bold border-l-4 border-primario pl-2 mb-4">
                                {alojamiento.precio == 0 ? "Sin precio (consultar)" : formatearPrecio(alojamiento.precio) + " " + alojamiento.moneda}
                            </p>
                            <div className="flex gap-x-4 gap-y-2 flex-wrap">
                                <div className="flex items-center gap-1">
                                    <HiOutlineUser />
                                    <span>{alojamiento.capacidadPersonas + " estudiantes"}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <BiBed />
                                    <span>{alojamiento.dormitorios + " dormitorios"}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <BiBath />
                                    <span>{alojamiento.banos + " baños"}</span>
                                </div>
                                {alojamiento.metrosCuadrados > 0 && (
                                    <div className="flex items-center gap-1">
                                    <BsCrop />
                                    <span>{alojamiento.metrosCuadrados + "m²"}</span>
                                </div>
                                )}
                                <div className="flex items-center gap-1">
                                    <BiBorderInner />
                                    <span>{alojamiento.ambientes + " ambientes"}</span>
                                </div>
                            </div>

                        </div>

                        <div className="col-span-2 bg-white p-4 mb-3 rounded-sm border border-gray-200">
                            <h2 className="font-bold text-lg mb-2">Descripción</h2>
                            <p className="whitespace-pre-wrap">
                                {alojamiento.descripcion}
                            </p>
                        </div>
                        
                        {alojamiento.comodidades.length > 0 && 
                            <div className="col-span-2 bg-white p-4 rounded-sm border border-gray-200">
                                <h2 className="font-bold text-lg mb-2">Comodidades</h2>
                                <div className="whitespace-pre-wrap">
                                    {alojamiento.comodidades.map(comodidad => (
                                        <div className="flex gap-1 items-center mb-3" key={comodidad}>
                                            <GoDotFill />
                                            <p className="capitalize">{comodidad}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }

                    </div>

                    {/* Columna 2 */}
                    <div>
                        {/* Inicio contacto */}
                        <div className="bg-white mb-3 rounded-sm border border-gray-200">
                            <div className="flex items-center gap-5 px-6 py-4">
                                <FaUserCircle className="text-7xl" />
                                <div>
                                    <span className="uppercase">Contacto</span>
                                    <p className="font-bold">{alojamiento.contacto.nombre}</p>
                                    <p className="text-gray-500">Propietario</p>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 px-6 py-5 flex flex-col gap-y-3">
                                <div className="flex gap-3 items-center text-lg">
                                    <BsFillTelephoneForwardFill />
                                    <a href={"tel:" + alojamiento.contacto.telefono} className="text-gray-500">{alojamiento.contacto.telefono}</a>
                                </div>

                                <div className="flex gap-3 items-center text-lg">
                                    <GrMail />
                                    <a href={"mailto:" + alojamiento.contacto.email} className="text-gray-500">{alojamiento.contacto.email}</a>
                                </div>
                            </div>
                        </div> 
                        {/*Fin contacto*/}

                        {/* Inicio formulario contacto */}
                        <div className="bg-white mb-3 rounded-sm border border-gray-200 px-6 py-4">
                            <h2 className="font-bold text-lg mb-4">Envía un mensaje al propietario</h2>
                            <form
                                onSubmit={handleSubmit}
                            >
                                <div className="mb-4">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Nombre y apellido *"
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                    value={nombreForm}
                                    onChange={e => setNombreForm(e.target.value)}
                                />
                                </div>

                                <div className="mb-4">
                                <input
                                    type="tel"
                                    id="tel"
                                    name="tel"
                                    placeholder="Teléfono *"
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                    value={telefonoForm}
                                    onChange={e => setTelefonoForm(e.target.value)}
                                />
                                </div>

                                <div className="mb-4">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email *"
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                    value={emailForm}
                                    onChange={e => setEmailForm(e.target.value)}
                                />
                                </div>

                                <div className="mb-4">
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Mensaje *"
                                    rows="4"
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm resize-none h-44"
                                    spellCheck={false}
                                    value={mensajeForm}
                                    onChange={e => setMensajeForm(e.target.value)}
                                />
                                </div>

                                <div className="flex justify-between items-center gap-3">
                                    <button
                                    type="submit"
                                    className="bg-primario hover:bg-primario-hover text-white px-4 py-2 rounded text-sm font-bold"
                                    >
                                    Enviar Mensaje
                                    </button>

                                    {mostrarLoader && 
                                        <div>
                                            <Oval
                                                height={30}
                                                width={30}
                                                color="#1481f7"
                                                wrapperStyle={{}}
                                                wrapperClass=""
                                                visible={true}
                                                ariaLabel='oval-loading'
                                                secondaryColor="#ccc"
                                                strokeWidth={2}
                                                strokeWidthSecondary={2}
                                            />
                                        </div>
                                    }
                                </div>

                                {msg && <Alerta alerta={alerta} />}
                            </form>
                        </div>
                        {/* Fin formulario contacto */}
                    </div>
                </div>
            </div>
         ) : (
            <p className="text-center text-sm font-bold">Alojamiento no encontrado.</p>
         )
        }
        {mostrarAlerta && <AccountPrompt setMostrarAlerta={setMostrarAlerta} />}
    </main>
  )
}

export default Alojamiento