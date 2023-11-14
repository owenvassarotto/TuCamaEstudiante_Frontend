import FormularioAlojamiento from "../components/FormularioAlojamiento";

const PublicarAlojamiento = () => {

  return (
    <div className="px-3 md:px-10 my-8 md:w-2/3 mx-auto">
      <h1 data-cy="publicar-titulo" className="text-xl md:text-2xl text-center mb-6 font-bold">Publica tu alojamiento</h1>

      <FormularioAlojamiento registro={true} />
    </div>
  )
}

export default PublicarAlojamiento