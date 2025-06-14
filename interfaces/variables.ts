export interface Variable {
    nombre: string
    definicion_operacional: string
    dimensiones: Array<{
        nombre: string
        indicadores: Array<{
            nombre: string
            items_formula: string
            instrumento_escala: string
        }>
    }>
}