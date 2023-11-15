
const Footer = () => {

    const year = new Date().getFullYear();

  return (
    <footer className="bg-primario text-center p-2 absolute bottom-0 w-full">
        <p className="text-xs text-white">&copy; {year} TuCamaEstudiante.com - Todos los derechos reservados.</p>
    </footer>
  )
}

export default Footer