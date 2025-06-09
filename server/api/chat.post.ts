import Anthropic from '@anthropic-ai/sdk'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const config = useRuntimeConfig()

    const anthropic = new Anthropic({
        apiKey: config.anthropicApiKey
    })

    // Prompt del sistema con tus servicios
    const systemPrompt = `
    Eres un asistente especializado en servicios de desarrollo web y asesoría académica. 
    Esta es la información sobre los servicios que ofreces:

    ## Servicios de Desarrollo Web:
    🌐 Diseño Web (Desde S/.500)
    - Sitios personalizados
    - Responsive (móvil, tablet, desktop)
    - SEO básico
    - Integración redes sociales

    🛒 Ecommerce (Desde S/.800)
    - Tiendas online completas
    - Pasarelas de pago
    - Gestión de inventario
    - Carrito de compras

    🚀 Landing Pages (Desde S/.300)
    - Diseño de alta conversión
    - Optimización para campañas
    - Formularios efectivos

    ## Servicios Académicos:
    📚 Asesoría en Tesis (Desde S/.20/hora)
    - Estructuración
    - Redacción y corrección
    - Formato normativo

    📊 Análisis Estadístico (Desde S/.150/proyecto)
    - Estadística descriptiva
    - Análisis inferencial
    - Interpretación

    ## Paquetes Estadísticos:
    1. Descriptivo (S/150): Frecuencias, gráficos, medidas de tendencia
    2. Comparativo (S/250): Pruebas t, ANOVA
    3. Correlacional (S/300): Pearson, Spearman
    4. Explicativo (S/400): Modelos multivariables

    ## Instrucciones:
    1. Proporciona información clara y estructurada
    2. Para consultas estadísticas, identifica primero el tipo de investigación
    3. Menciona precios cuando sea relevante
    4. Usa emojis para categorías
    5. Sé profesional pero cercano
    `

    try {
        const response = await anthropic.messages.create({
            model: "claude-3-haiku-20240307",
            max_tokens: 1024,
            messages: [
                {
                    role: "assistant",
                    content: systemPrompt
                },
                ...body.history,
                {
                    role: "user",
                    content: body.message
                }
            ]
        })

        return {
            content: response.content[0]?.text || "No pude generar una respuesta."
        }
    } catch (error) {
        console.error('Error calling Anthropic API:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Error al contactar al asistente'
        })
    }
})