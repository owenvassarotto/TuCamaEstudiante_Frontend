import { useEffect, useState } from "react"
import clienteAxios from "../config/axios";
import AlojamientoCard from "../components/AlojamientoCard";
import { Link } from "react-router-dom";
import FilterAlojamientos from "../components/FilterAlojamientos";

const Inicio = () => {

  const [alojamientos, setAlojamientos] = useState([]);

  useEffect(() => {
    const obtenerAlojamientos = async () => {
      try {
        const {data} = await clienteAxios('/alojamientos/obtener-todos-alojamientos');
        setAlojamientos(data);
      } catch (error) {
        console.log(error);        
      }
    }
    obtenerAlojamientos();
  }, []);

  return (
    <>
        <div className="relative">
          <img src={"/images/estudiantes.jpg"} alt="Imagen de estudiantes" className="h-[500px] w-full object-cover" />

          <div className="absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center flex flex-col justify-center gap-5 bg-black bg-opacity-30 px-2">
            <h1 data-cy="titulo-input" className="text-3xl md:text-4xl font-bold">Bienvenido a TuCamaEstudiante.com</h1>
            <p className="text-xl">Encuentra el alojamiento perfecto para tu vida estudiantil en toda Argentina</p>

            <FilterAlojamientos />
          </div>
        </div>

        {/* Alojamientos inicio */}
        <main className="px-3 md:px-10 my-8">
          <h2 className="text-xl md:text-2xl text-center mb-6 font-bold">Alojamientos Destacados</h2>

          {alojamientos.length > 0 ? (
            <div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {alojamientos.slice(0, 9).map(alojamiento => (
                  <AlojamientoCard alojamiento={alojamiento} key={alojamiento._id}  />
                ))}
              </div>
              <Link to={"/alojamientos"} className="block underline text-primario text-right mt-8 font-bold">Ver todos los alojamientos</Link>
            </div>
          ) : (
            <p className="text-center text-sm">No hay alojamientos publicados. 😢</p>
          )}
        </main>
    </>
  )
}

export default Inicio