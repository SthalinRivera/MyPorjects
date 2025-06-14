// server/api/title.ts
import Anthropic from '@anthropic-ai/sdk';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const config = useRuntimeConfig();


    const anthropic = new Anthropic({
        apiKey: config.anthropicApiKey
    })

    try {
        const response = await anthropic.messages.create({
            model: "claude-3-haiku-20240307",
            max_tokens: 1024,
            temperature: 0.7,
            system: body.prompt,
            messages: [
                { role: "user", content: body.input }
            ]
        });

        if (!response.content || !response.content[0]?.text) {
            throw new Error("Respuesta vacía del modelo");
        }

        return {
            content: response.content[0].text
        };
    } catch (error) {
        console.error('Error calling Anthropic API:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Error al contactar al asistente: ' + error.message
        });
    }
});