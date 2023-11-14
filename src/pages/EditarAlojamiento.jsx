import React from 'react'
import FormularioAlojamiento from '../components/FormularioAlojamiento'

const EditarAlojamiento = () => {
  return (
    <div className="px-3 md:px-10 my-8 md:w-2/3 mx-auto">
      <h1 className="text-xl md:text-2xl text-center mb-6 font-bold">Actualizar publicación</h1>

      <FormularioAlojamiento registro={false} />
    </div>
  )
}

export default EditarAlojamiento