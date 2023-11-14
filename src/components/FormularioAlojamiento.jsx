import { useEffect, useState } from "react";
import Alerta from "./Alerta";
import Comodidades from "./Comodidades";
import FotosUploader from "./FotosUploader";
import clienteAxios from "../config/axios";
import Asterisco from "./Asterisco";
import { Link, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const FormularioAlojamiento = ({registro}) => {

    const {auth} = useAuth();

    const [alerta, setAlerta] = useState({});
  
    const [titulo, setTitulo] = useState('');
    const [provincia, setProvincia] = useState('');
    const [direccion, setDireccion] = useState('');
    const [comodidades, setComodidades] = useState([]);
    const [precio, setPrecio] = useState('');
    const [moneda, setMoneda] = useState('ARS');
    const [fotosSubidas, setFotosSubidas] = useState([]);
    const [dormitorios, setDormitorios] = useState('');
    const [banos, setBanos] = useState('');
    const [tipoAlojamiento, setTipoAlojamiento] = useState('');
    const [ambientes, setAmbientes] = useState('');
    const [metrosCuadrados, setMetrosCuadrados] = useState('');
    const [capacidadPersonas, setCapacidadPersonas] = useState('');
    const [descripcion, setDescripcion] = useState('');
    
    const {id} = useParams();
    useEffect(() => {
      if(!id) return;

      const obtenerDatosAlojamiento = async () => {
        const {data} = await clienteAxios(`/alojamientos/${id}`);
        setTitulo(data.titulo);
        setProvincia(data.provincia);
        setDireccion(data.direccion);
        setComodidades(data.comodidades);
        setPrecio(data.precio);
        setMoneda(data.moneda);
        setFotosSubidas(data.fotos);
        setDormitorios(data.dormitorios);
        setTipoAlojamiento(data.tipoAlojamiento);
        setBanos(data.banos);
        setAmbientes(data.ambientes);
        setMetrosCuadrados(data.metrosCuadrados);
        setCapacidadPersonas(data.capacidadPersonas);
        setDescripcion(data.descripcion);
      }
      // Si no está en modo registro entonces está en modo actualizar
      if(!registro){
        obtenerDatosAlojamiento();
      }
    }, [id]);

    const handleSubmit = async e => {
        e.preventDefault();
        
        const camposObligatorios = [
            titulo, 
            provincia,
            direccion, 
            descripcion, 
            precio, 
            // moneda,
            dormitorios, 
            tipoAlojamiento, 
            banos, 
            ambientes,
            metrosCuadrados, 
            capacidadPersonas
        ];

        if(camposObligatorios.includes('') || fotosSubidas.length === 0){
          setAlerta({
            msg: "Completa todos los campos obligatorios",
            error: true
          })
          return;
        }
    
        const alojamientoData = {
          titulo,
          provincia,
          direccion,
          fotos: fotosSubidas,
          precio,
          moneda,
          descripcion,
          comodidades,
          dormitorios,
          contacto: {
            nombre: auth.nombre,
            email: auth.email,
            telefono: auth.telefono,
          },
          tipoAlojamiento,
          banos,
          ambientes,
          metrosCuadrados,
          capacidadPersonas,
        }
    
        if(registro){
            try {
              const token = localStorage.getItem('token_usuario_tucamaestudiante');
              const config = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                }
              }
              await clienteAxios.post('/alojamientos', alojamientoData, config);
              setAlerta({
                msg: "Publicado correctamente",
                error: false
              })
            } catch (error) {
              console.log(error);
            }
        }else{
            // Lógica para actualizar alojamiento
            try {
              const token = localStorage.getItem('token_usuario_tucamaestudiante');
              const config = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                }
              }
              await clienteAxios.put(`/alojamientos/${id}`, alojamientoData, config);
              setAlerta({
                msg: "Actualizado correctamente",
                error: false
              })
            } catch (error) {
              console.log(error);
            }
        }

        setTitulo("");
        setProvincia("");
        setDireccion("");
        setComodidades([]);
        setPrecio("");
        setMoneda("");
        setFotosSubidas([]);
        setDormitorios("");
        setTipoAlojamiento("");
        setBanos("");
        setAmbientes("");
        setMetrosCuadrados("");
        setCapacidadPersonas("");
        setDescripcion("");
      }
    
      const {msg} = alerta;
      
      const provincias = [
        "Tucumán",
        "Buenos Aires",
        "Catamarca",
        "Chaco",
        "Chubut",
        "Córdoba",
        "Corrientes",
        "Entre Ríos",
        "Formosa",
        "Jujuy",
        "La Pampa",
        "La Rioja",
        "Mendoza",
        "Misiones",
        "Neuquén",
        "Río Negro",
        "Salta",
        "San Juan",
        "San Luis",
        "Santa Cruz",
        "Santa Fe",
        "Santiago del Estero",
        "Tierra del Fuego"
      ];

  return (
    <>
        <form 
            className="p-4 border border-gray-100 rounded-md bg-white shadow-sm shadow-gray-300"
            onSubmit={handleSubmit}
          >
              <div className="mb-2">
                  <label className="text-sm font-bold uppercase flex" htmlFor="titulo">Título <Asterisco /></label>
                  <input
                    className="w-full text-sm border my-2 py-2 px-4 rounded-lg bg-gray-50"
                    type="text" 
                    id="titulo" 
                    name="titulo" 
                    placeholder="Ingresa el título de la publicación" 
                    data-cy="titulo-input"
                    value={titulo}
                    onChange={e => setTitulo(e.target.value)}
                  />
              </div>

              <div className="mb-2">
                  <label className="text-sm font-bold uppercase flex" htmlFor="provincia">Provincia <Asterisco /></label>
                  <select 
                    name="provincia" 
                    id="provincia"
                    className="w-full text-sm border my-2 py-2 px-4 rounded-lg bg-gray-50"
                    data-cy="provincia-select"
                    value={provincia}
                    onChange={e => setProvincia(e.target.value)}
                  >
                    <option value="">-- Seleccionar --</option>
                    {provincias.map(provincia => <option value={provincia} key={provincia}>{provincia}</option>)}
                  </select>
              </div>

              <div className="mb-2">
                  <label className="text-sm font-bold uppercase flex" htmlFor="direccion">Dirección <Asterisco /></label>
                  <input
                    className="w-full text-sm border my-2 py-2 px-4 rounded-lg bg-gray-50"
                    type="text" 
                    id="direccion" 
                    name="direccion" 
                    placeholder="Ingresa la dirección del alojamiento" 
                    data-cy="direccion-input"
                    value={direccion}
                    onChange={e => setDireccion(e.target.value)}
                  />
              </div>

              <div className="flex md:gap-2 flex-col md:flex-row">
                <div className="mb-2 md:w-1/2">
                    <label className="text-sm font-bold uppercase flex" htmlFor="tipo-alojamiento">Tipo alojamiento <Asterisco /></label>
                    <select 
                      name="tipo-alojamiento" 
                      id="tipo-alojamiento"
                      className="w-full text-sm border my-2 py-2 px-4 rounded-lg bg-gray-50"
                      data-cy="tipo-alojamiento"
                      value={tipoAlojamiento}
                      onChange={e => setTipoAlojamiento(e.target.value)}
                    >
                      <option value="">-- Seleccionar --</option>
                      <option value="habitacion">Habitación</option>
                      <option value="departamento">Departamento</option>
                      <option value="casa">Casa</option>
                    </select>
                </div>

                <div className="mb-2 md:w-1/2 flex flex-col">
                  <label className="text-sm font-bold uppercase flex" htmlFor="capacidad-personas">Capacidad personas <Asterisco /></label>
                  <input
                    className="w-full text-sm border my-2 py-2 px-4 rounded-lg bg-gray-50"
                    type="number" 
                    id="capacidad-personas" 
                    name="capacidad-personas" 
                    placeholder="Capacidad de personas" 
                    data-cy="capacidad-personas"
                    min={0}
                    value={capacidadPersonas}
                    onChange={e => setCapacidadPersonas(e.target.value)}
                  />
              </div>
              </div>

              <div className="md:flex gap-2">
                <div className="md:w-1/2">
                    <label className="text-sm font-bold uppercase flex" htmlFor="dormitorios">Cantidad dormitorios <Asterisco/></label>
                    <input
                      className="w-full text-sm border my-2 py-2 px-4 rounded-lg bg-gray-50"
                      type="number" 
                      id="dormitorios" 
                      name="dormitorios" 
                      placeholder="Cantidad de dormitorios" 
                      data-cy="dormitorios"
                      min={0}
                      value={dormitorios}
                      onChange={e => setDormitorios(e.target.value)}
                    />
                </div>

                <div className="md:w-1/2">
                    <label className="text-sm font-bold uppercase flex" htmlFor="banos">Cantidad baños <Asterisco/></label>
                    <input
                      className="w-full text-sm border my-2 py-2 px-4 rounded-lg bg-gray-50"
                      type="number" 
                      id="banos" 
                      name="banos" 
                      placeholder="Cantidad de baños" 
                      data-cy="banos"
                      min={0}
                      value={banos}
                      onChange={e => setBanos(e.target.value)}
                    />
                </div>
              </div>

              <div className="flex md:gap-2 flex-col md:flex-row">
                <div className="mb-2 flex flex-col md:w-1/2">
                    <label className="text-sm font-bold uppercase flex" htmlFor="ambientes">Cantidad ambientes <Asterisco /></label>
                    <input
                      className="w-full text-sm border my-2 py-2 px-4 rounded-lg bg-gray-50"
                      type="number" 
                      id="ambientes" 
                      name="ambientes" 
                      placeholder="Cantidad de ambientes" 
                      data-cy="ambientes"
                      min={0}
                      value={ambientes}
                      onChange={e => setAmbientes(e.target.value)}
                    />
                </div>

                <div className="mb-2 flex flex-col md:w-1/2">
                    <label className="text-sm font-bold uppercase flex" htmlFor="metros-cuadrados">Metros cuadrados <Asterisco /></label>
                    <input
                      className="w-full text-sm border my-2 py-2 px-4 rounded-lg bg-gray-50"
                      type="number" 
                      id="metros-cuadrados" 
                      name="metros-cuadrados" 
                      placeholder="Metros cuadrados totales" 
                      data-cy="metros-cuadrados"
                      min={0}
                      value={metrosCuadrados}
                      onChange={e => setMetrosCuadrados(e.target.value)}
                    />
                </div>
              </div>

              <FotosUploader fotosSubidas={fotosSubidas} setFotosSubidas={setFotosSubidas} />

              <p className="text-sm font-bold uppercase mb-2">Comodidades <span className="font-normal">(opcional)</span></p>
              <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-4">
                <Comodidades comodidades={comodidades} setComodidades={setComodidades} />
              </div>

              <div className="mb-2 flex flex-col">
                  <label className="text-sm font-bold uppercase flex" htmlFor="precio">Precio por mes <Asterisco /></label>
                  <p className="text-xs my-1 text-gray-400 font-bold">Si no quieres publicar el precio pon 0 (cero)</p>
                  <div className="flex gap-1">
                    <input
                      className="w-full md:w-1/2 text-sm border my-2 py-2 px-4 rounded-lg bg-gray-50"
                      type="number" 
                      id="precio" 
                      name="precio" 
                      placeholder="Precio por mes" 
                      data-cy="precio-input"
                      min={0}
                      value={precio}
                      onChange={e => setPrecio(e.target.value)}
                    />
                    <select 
                        name="moneda" 
                        id="moneda"
                        className="text-sm border my-2 py-2 px-4 rounded-lg bg-gray-50"
                        data-cy="moneda-select"
                        value={moneda}
                        onChange={e => setMoneda(e.target.value)}
                      >
                        <option value="ARS">ARS</option>
                        <option value="USD">USD</option>
                    </select>
                  </div>
              </div>

              <div className="mb-2">
                <label className="text-sm font-bold uppercase flex" htmlFor="descripcion">Descripción <Asterisco /></label>
                <textarea 
                  name="descripcion" 
                  id="descripcion" 
                  className="w-full bg-gray-50 border rounded-xl resize-none h-44 mt-2 p-2"
                  data-cy="descripcion"
                  spellCheck={false}
                  value={descripcion}
                  onChange={e => setDescripcion(e.target.value)}
                ></textarea>
              </div>

              <div className="m-4">
                <p className="text-sm font-bold mb-2 text-center">Datos de Contacto</p>
                <p className="text-center my-5 text-sm">Modifica estos datos editanto tu perfil <Link to={"/cuenta/perfil"} className="font-bold underline text-primario">aquí</Link></p>
                <div className="mb-2 flex gap-2">
                  <div className="flex flex-col w-1/2">
                    <label className="text-sm font-bold uppercase text-center" htmlFor="nombre">Nombre</label>
                    <input
                      className="text-sm border my-2 py-2 px-4 rounded-lg bg-gray-50 cursor-not-allowed text-center"
                      type="text" 
                      id="nombre" 
                      name="nombre" 
                      disabled
                      title="Cambia este campo editando tu perfil" 
                      defaultValue={auth?.nombre}
                    />
                  </div>

                  <div className="flex flex-col w-1/2">
                    <label className="text-sm font-bold uppercase text-center" htmlFor="telefono">Teléfono</label>
                    <input
                      className="text-sm border my-2 py-2 px-4 rounded-lg bg-gray-50 cursor-not-allowed text-center"
                      type="tel" 
                      id="telefono" 
                      name="telefono" 
                      disabled
                      title="Cambia este campo editando tu perfil"
                      defaultValue={auth?.telefono}
                    />
                  </div>
                </div>

                <div className="mb-2 flex flex-col">
                  <label className="text-sm font-bold uppercase text-center" htmlFor="email">Email</label>
                  <input
                    className="w-full text-sm border my-2 py-2 px-4 rounded-lg bg-gray-50 cursor-not-allowed text-center"
                    type="email" 
                    id="email" 
                    name="email" 
                    disabled
                    title="Cambia este campo editando tu perfil"
                    defaultValue={auth?.email}
                  />
                </div>
              </div>

              <input type="submit" data-cy="publicar-submit" value={registro ? "Publicar alojamiento" : "Actualizar publicación"} className="mt-2 bg-primario hover:bg-primario-hover py-2 px-4 text-white font-bold uppercase rounded-md cursor-pointer w-full md:w-min text-sm" />

              {msg && <Alerta alerta={alerta} />}
          </form>
    </>
  )
}

export default FormularioAlojamiento