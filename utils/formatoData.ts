export default (data: string, tipo: string = "") => {
    const dataFormatada = new Date(data);
    switch (tipo) {
      case "dd/mm/yyyy hh:mm":
        return dataFormatada.toLocaleString("es-PE");
      case "hh:mm":
        return dataFormatada.toLocaleTimeString("es-PE");
      default:
        return dataFormatada.toLocaleDateString("es-PE");
    }
  };