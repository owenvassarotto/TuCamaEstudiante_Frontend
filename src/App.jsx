import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import OlvideContrasena from "./pages/OlvideContrasena";
import NuevaContrasena from "./pages/NuevaContrasena";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import Inicio from "./pages/Inicio";

import EditarPerfil from "./pages/EditarPerfil";
import RutaProtegida from "./layout/RutaProtegida";
import PublicarAlojamiento from "./pages/PublicarAlojamiento";
import MisPublicaciones from "./pages/MisPublicaciones";
import EditarAlojamiento from "./pages/EditarAlojamiento";
import PublicLayout from "./layout/PublicLayout";
import Alojamientos from "./pages/Alojamientos";
import Alojamiento from "./pages/Alojamiento";
import Guardados from "./pages/Guardados";
import { AuthProvider } from "./context/AuthProvider";
import CambiarContrasena from "./pages/CambiarContrasena";

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<PublicLayout />} >
                <Route index element={<Inicio />} />
                <Route path="alojamientos" element={<Alojamientos />} /> 
                <Route path="alojamiento/:id" element={<Alojamiento />} />
            </Route>

            <Route element={<Layout />}> 
                <Route path="/login" element={<Login />} />
                <Route path="/registrar" element={<Registrar />} />
                <Route path="/olvide-contrasena" element={<OlvideContrasena />} />
                <Route path="/olvide-contrasena/:token" element={<NuevaContrasena />} />
                <Route path="/confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>

            {/* Rutas privadas */}
            <Route path="/cuenta" element={<RutaProtegida />}>
                <Route path="perfil" element={<EditarPerfil />}/>
                <Route path="cambiar-contrasena" element={<CambiarContrasena />}/>
                <Route path="alojamientos/nuevo" element={<PublicarAlojamiento />}/>
                <Route path="alojamientos/publicados" element={<MisPublicaciones />}/>
                <Route path="alojamientos/editar/:id" element={<EditarAlojamiento />}/>
                <Route path="alojamientos/guardados" element={<Guardados />}/>
            </Route>
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
