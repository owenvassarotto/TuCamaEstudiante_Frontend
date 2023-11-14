import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {
  // Estados locales para los datos del usuario y alertas
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  // Función para manejar el envío del formulario de registro
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Comprueba que ningún campo esté vacío
    if ([nombre, email, telefono, password, repetirPassword].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    // Comprueba que las contraseñas coincidan
    if (password !== repetirPassword) {
      setAlerta({
        msg: "Las contraseñas no coinciden",
        error: true,
      });
      return;
    }

    // Comprueba que la contraseña tenga al menos 6 caracteres
    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña es muy corta, agrega mínimo 6 caracteres",
        error: true,
      });
      return;
    }

    // Registra al usuario en la base de datos
    try {
      await clienteAxios.post("/usuarios", {
        nombre,
        email,
        telefono,
        password,
      });
      setAlerta({
        msg: "Cuenta creada correctamente, revisa tu email",
        error: false,
      });
    } catch (error) {
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
          Crea tu Cuenta y<span className="text-primario"> Empieza a Navegar</span>
        </h1>
      </div>

      <form
        className="p-4 border rounded-md bg-white shadow-sm shadow-gray-200"
        onSubmit={handleSubmit}
        data-cy="form-registro"
      >
        {/* Campos de entrada para nombre, email, teléfono, contraseña y repetir contraseña */}
        <div className="mb-2">
          <label className="text-sm md:text-base font-bold uppercase" htmlFor="name">
            Nombre y apellido
          </label>
          <input
            className="w-full border my-2 py-2 px-4 rounded-lg bg-gray-50"
            type="text"
            id="name"
            name="name"
            placeholder="Ingresa tu nombre y apellido"
            data-cy="nombre-input"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

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
          <label className="text-sm md:text-base font-bold uppercase" htmlFor="phone-number">
            Teléfono
          </label>
          <input
            className="w-full border my-2 py-2 px-4 rounded-lg bg-gray-50"
            type="tel"
            id="phone-number"
            name="phone-number"
            placeholder="Ingresa tu teléfono"
            data-cy="telefono-input"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
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
            data-cy="password-input"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <label className="text-sm md:text-base font-bold uppercase" htmlFor="repetirPassword">
            Repetir contraseña
          </label>
          <input
            className="w-full border my-2 py-2 px-4 rounded-lg bg-gray-50"
            type="password"
            id="repetirPassword"
            name="repetirPassword"
            placeholder="Repite tu contraseña"
            data-cy="repitepassword-input"
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
          />
        </div>

        {/* Botón para enviar el formulario */}
        <input
          type="submit"
          data-cy="submit-registro"
          value="Crear cuenta"
          className="mt-2 bg-primario hover-bg-primario-hover py-2 px-4 text-white font-bold uppercase rounded-md cursor-pointer w-full md:w-min"
        />

        {/* Muestra alertas si existen */}
        {msg && <Alerta alerta={alerta} />}

        {/* Enlaces para iniciar sesión o recuperar contraseña */}
        <nav className="flex flex-col gap-4 text-center md:gap-0 md:flex-row md:justify-between mt-8">
          <Link to={"/login"} className="text-gray-500 text-sm">
            ¿Ya tienes una cuenta? <span className="underline">Inicia sesión</span>
          </Link>
          <Link to={"/olvide-contrasena"} className="text-gray-500 text-sm">
            Olvidé mi contraseña
          </Link>
        </nav>
      </form>
    </>
  );
};

export default Registrar;
