import { Link } from 'react-router-dom'
import {BsArrowLeftCircleFill } from "react-icons/bs";

const PublicNav = () => {
    
  return (
    <nav className='absolute top-5 left-7'>
        <Link to={"/"} className='flex items-center gap-2 font-bold'>
            <BsArrowLeftCircleFill />
            <p className='hover:underline'>Ir al inicio</p>
        </Link>
    </nav>
  )
}

export default PublicNav