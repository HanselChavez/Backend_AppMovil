export const formatearFecha = (fecha) => {
    const [dia, mes, anio] = fecha.split("/");
    const fechaFormateada = `${anio}-${mes}-${dia}`;
    return fechaFormateada;
};
