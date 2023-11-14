

const Alerta = ({alerta}) => {
 
  return (
    <div className={`${alerta.error ? 'bg-red-500 border-red-600' : 'bg-green-500 border-green-600'} bg-gradient-to-br text-center p-3 border uppercase text-white font-bold text-sm my-5`}>
      {alerta.msg}
    </div>
  )
}

export default Alerta