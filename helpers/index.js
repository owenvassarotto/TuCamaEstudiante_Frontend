// Función para formatear precio, ej. de 200000 -> 200.000
const formatearPrecio = precio => {
    return precio.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS', // Código de moneda para el peso argentino
      minimumFractionDigits: 0, 
    });
}  

const formatearFecha = fecha => {
    const fechaObjeto = new Date(fecha);

    const dia = fechaObjeto.getDate().toString().padStart(2, '0');
    const mes = (fechaObjeto.getMonth() + 1).toString().padStart(2, '0');
    const anio = fechaObjeto.getFullYear();

    const fechaFormateada = `${dia}/${mes}/${anio}`;

    return fechaFormateada; // Salida: "31-10-2023"
}

export {
    formatearPrecio,
    formatearFecha
}