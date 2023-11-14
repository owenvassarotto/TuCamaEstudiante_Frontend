import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  // Función para manejar el envío del formulario de inicio de sesión
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    try {
      // Enviar la solicitud de inicio de sesión al servidor
      const { data } = await clienteAxios.post("/usuarios/login", { email, password });
      localStorage.setItem("token_usuario_tucamaestudiante", data.token);
      // Establecer los datos de autenticación en el contexto de autenticación
      setAuth(data);
      // Redirigir al usuario a la página principal
      navigate("/");
    } catch (error) {
      // Manejar errores de inicio de sesión
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-4xl md:text-6xl text-center mb-6 font-bold">
          Inicia Sesión y Encuentra tu{" "}
          <span className="text-primario">Alojamiento Ideal</span>
        </h1>
      </div>

      <form
        className="p-4 border rounded-md bg-white shadow-sm shadow-gray-200"
        onSubmit={handleSubmit}
      >
        <div className="mb-2">
          <label className="text-sm md:text-base font-bold uppercase" htmlFor="email">
            Email
          </label>
          <input
            className="w-full border my-2 py-2 px-4 rounded-lg bg-gray-50"
            type="email"
            id="email"
            name="email"
            placeholder="Ingresa tu email"
            data-cy="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <label className="text-sm md:text-base font-bold uppercase" htmlFor="password">
            Contraseña
          </label>
          <input
            className="w-full border my-2 py-2 px-4 rounded-lg bg-gray-50"
            type="password"
            id="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            data-cy="password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          data-cy="login-submit"
          value="Iniciar sesión"
          className="mt-2 bg-primario hover:bg-primario-hover py-2 px-4 text-white font-bold uppercase rounded-md cursor-pointer w-full md:w-min"
        />

        {msg && <Alerta alerta={alerta} />}

        <nav className="flex flex-col gap-4 text-center md:gap-0 md:flex-row md:justify-between mt-8">
          <Link to={"/registrar"} className="text-gray-500 text-sm">
            ¿No tienes una cuenta? <span className="underline">Regístrate</span>
          </Link>
          <Link to={"/olvide-contrasena"} className="text-gray-500 text-sm">
            Olvidé mi contraseña
          </Link>
        </nav>
      </form>
    </>
  );
};

export default LoginPage;
