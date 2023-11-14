
const Footer = () => {

    const year = new Date().getFullYear();

  return (
    <footer className="bg-primario text-center p-3 absolute bottom-0 w-full">
        <p className="font-bold text-sm text-white">&copy; {year} TuCamaEstudiante.com - Todos los derechos reservados.</p>
    </footer>
  )
}

export default Footer