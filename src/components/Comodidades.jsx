import {HiWifi} from "react-icons/hi";
import {BsFillCarFrontFill, BsFan, BsFillTelephoneFill} from "react-icons/bs";
import {MdDesk, MdPets} from "react-icons/md";
import {BiSolidHot, BiSolidWasher} from "react-icons/bi";
import {PiTelevisionSimpleBold, PiFanFill} from "react-icons/pi";

const Comodidades = ({comodidades, setComodidades}) => {

    const comodidadesData = [
        {id: "wifi", icon: <HiWifi />, name: "wifi"},
        {id: "tv", icon: <PiTelevisionSimpleBold />, name: "tv"},
        {id: "telefono", icon: <BsFillTelephoneFill />, name: "teléfono fijo"},
        {id: "escritorio", icon: <MdDesk />, name: "escritorio"},
        {id: "garage", icon: <BsFillCarFrontFill />, name: "garage"},
        {id: "lavadora", icon: <BiSolidWasher />, name: "lavadora"},
        {id: "mascotas", icon: <MdPets />, name: "mascotas permitidas"},
        {id: "calefaccion", icon: <BiSolidHot />, name: "calefacción"},
        {id: "ventilador", icon: <PiFanFill />, name: "ventilador"},
        {id: "aire", icon: <BsFan />, name: "aire acondicionado"},
    ]

    const handleCbClick = e => {
        const {checked, name} = e.target;
        // Si está seleccionado agregamos el name al state de comodidades en PublicarAlojamiento.jsx
        if(checked){
            setComodidades([...comodidades, name]);
        }else{
            // eliminamos del array a la comodidad deseleccionada
            setComodidades([...comodidades.filter(comodidad => comodidad !== name)]);
        }
    }

  return (
    <>
        {comodidadesData.map(comodidad => (
            <label 
                key={comodidad.id}
                htmlFor={comodidad.id}
                className="border flex items-center rounded-2xl gap-2 justify-center cursor-pointer p-2" 
            >
                <input 
                type="checkbox" 
                id={comodidad.id}
                checked={comodidades.includes(comodidad.name)}
                name={comodidad.name}
                onChange={handleCbClick}
                />
                {comodidad.icon}
                <span className="capitalize">{comodidad.id}</span>
            </label>
        ))}
    </>
  )
}

export default Comodidades