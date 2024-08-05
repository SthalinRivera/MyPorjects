 export default function () {
    const diferenciaEnDias= ref(0);
    const diasPasados =(data: Date)=>{
        const dataActual= new Date().getTime();
        const diferenciaEnMilesegundos= dataActual-data.getTime();
        diferenciaEnDias.value=Math.floor(
            diferenciaEnMilesegundos/(1000*60*60*24)
        );
    };
    return {diasPasados, diferenciaEnDias}
    
}