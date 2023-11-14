import { Navigate, Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import useAuth from '../hooks/useAuth'

const RutaProtegida = () => {

  const { auth, cargando } = useAuth();

  if(cargando) return 'Cargando...';

  return (
    <>
        <Header />
        {auth?._id ? (
          <main>
            <Outlet />
          </main>
        ) : <Navigate to="/login"/> }
        <Footer />
    </>
  )
}

export default RutaProtegida