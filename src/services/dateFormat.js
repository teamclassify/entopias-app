function formatearFechaIso(fecha) {
    if (!fecha) return null;
    let fechaStr;
    if (typeof fecha === "string") {
        fechaStr = fecha;
    } else if (fecha instanceof Date) {
        fechaStr = fecha.toISOString();
    } else {
        return null;
    }

    const [año, mes, dia] = fechaStr.split("T")[0].split("-");
    return `${dia}/${mes}/${año}`;
}

export default formatearFechaIso;