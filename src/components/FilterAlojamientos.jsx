import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FilterAlojamientos = ({dataFilter}) => {

    const navigate = useNavigate();
    const [tipoAlojamiento, setTipoAlojamiento] = useState(dataFilter?.tipoAlojamiento || '');
    const [provincia, setProvincia] = useState(dataFilter?.provincia || '');
    const [precioDesde, setPrecioDesde] = useState(dataFilter?.precioDesde || '');
    const [precioHasta, setPrecioHasta] = useState(dataFilter?.precioHasta || '');

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

    const handleSubmit = e => {
        e.preventDefault();
        navigate(`/alojamientos?tipoAlojamiento=${tipoAlojamiento}&provincia=${provincia}&precioDesde=${precioDesde}&precioHasta=${precioHasta}`);
    }
 
  return (
    <form 
        onSubmit={handleSubmit}
        className="grid grid-cols-2 grid-rows-3 px-1 md:px-56 gap-x-2"
    >
        <div>
            <select
            id="tipo-alojamiento"
            name="tipo-alojamiento"
            className="text-sm text-secundario mt-1 p-2 w-full rounded-md placeholder-gray-600"
            value={tipoAlojamiento}
            onChange={e => setTipoAlojamiento(e.target.value)}
            >
            <option value="">Seleccionar alojamiento</option>
            <option value="habitacion">Habitaciones</option>
            <option value="departamento">Departamentos</option>
            <option value="casa">Casas</option>
            </select>
        </div>

        <div>
            <select 
            name="provincia" 
            id="provincia"
            className="text-sm text-secundario mt-1 p-2 w-full rounded-md placeholder-gray-600"
            value={provincia}
            onChange={e => setProvincia(e.target.value)}
            >
            <option value="">Seleccionar provincia</option>
            {provincias.map(provincia => <option value={provincia} key={provincia}>{provincia}</option>)}
            </select>
        </div>

        <div>
            <input
            type="number"
            id="precio-desde"
            name="precio-desde"
            min={0}
            placeholder="Precio desde"
            className="text-sm text-secundario mt-1 p-2 block w-full rounded-md placeholder-gray-600"
            value={precioDesde}
            onChange={e => setPrecioDesde(e.target.value)}
            />
        </div>

        <div>
            <input
            type="number"
            id="precio-hasta"
            name="precio-hasta"
            min={0}
            placeholder="Precio hasta"
            className="text-sm text-secundario mt-1 p-2 block w-full rounded-md placeholder-gray-600"
            value={precioHasta}
            onChange={e => setPrecioHasta(e.target.value)}
            />
        </div>

        <div className="col-span-2">
            <button
            type="submit"
            className="w-full px-4 py-2 border border-transparent text-sm font-bold uppercase shadow-sm text-white bg-primario hover:bg-primario-hover mt-2"
            >
            Buscar Alojamientos
            </button>
        </div>
    </form>
  )
}

export default FilterAlojamientos