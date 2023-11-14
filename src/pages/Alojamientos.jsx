import { useEffect, useState } from "react"
import FilterAlojamientos from "../components/FilterAlojamientos"
import clienteAxios from "../config/axios";
import AlojamientoCard from "../components/AlojamientoCard";
import { useLocation } from "react-router-dom";

const Alojamientos = () => {

  const [alojamientos, setAlojamientos] = useState([]);

  const {search} = useLocation();
  const queryParams = new URLSearchParams(search);
  const tipoAlojamiento = queryParams.get('tipoAlojamiento') || "";
  const provincia = queryParams.get('provincia') || "";
  const precioDesde = queryParams.get('precioDesde') || "";
  const precioHasta = queryParams.get('precioHasta') || "";
  
  const obtenerAlojamientos = async () => {
    try {
      const {data} = await clienteAxios('/alojamientos/obtener-todos-alojamientos');
      setAlojamientos(data);
    } catch (error) {
      console.log(error);        
    }
  }

  const obtenerAlojamientosFiltrados = async () => {
    try {
      // Construir un objeto que contenga los parámetros de filtro
      const filtros = {
        tipoAlojamiento,
        provincia,
        precioDesde,
        precioHasta,
      };

      // Realizar la solicitud al endpoint de filtrado con los parámetros
      const { data } = await clienteAxios.post('/alojamientos/filtrar-alojamientos', filtros);
      setAlojamientos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Comprobar si se proporcionaron parámetros de filtro y llamar a la función de filtrado
    if ([tipoAlojamiento, provincia, precioDesde, precioHasta].some(parametro => parametro !== "")) {
      obtenerAlojamientosFiltrados();
    } else {
      // Si no hay ningún dato en los parámetros, obtener todos los alojamientos
      obtenerAlojamientos();
    }
  }, [tipoAlojamiento, provincia, precioDesde, precioHasta]);

  return (
    <>
      <div className="relative w-full h-52">
        <img src="/images/habitacion.jpg" alt="Imagen de fondo de cama" className="h-full w-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <FilterAlojamientos dataFilter={{tipoAlojamiento, provincia, precioDesde, precioHasta}} />
        </div>
      </div>
      <main className="px-3 md:px-10 my-8">
        {alojamientos.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {alojamientos.map(alojamiento => (
              <AlojamientoCard alojamiento={alojamiento} key={alojamiento._id}  />
            ))}
          </div>
        ) : (
          <p className="text-center text-sm">No hay alojamientos publicados. 😥</p>
        )}
      </main>
    </>
  )
}

export default Alojamientos