
import { GoogleGenAI } from "@google/genai";
import type { Product } from '../types';

// Do not pre-initialize the AI client if the API key might change.
// However, in this app, the key is static from environment variables, so this is fine.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function getRecommendations(userInput: string, productList: Product[]): Promise<string> {
  try {
    const productInfo = productList.map(p => `- ${p.name}: ${p.description}`).join('\n');

    const prompt = `
      Eres un asistente de compras virtual amigable y servicial para "DISTRIBUCIONES NICOLAS", una tienda en línea que vende productos de farmacia y limpieza.
      Tu tono debe ser cercano y profesional.

      Tu tarea es recomendar productos basándote en la necesidad del usuario.
      Comienza tu respuesta con un saludo amigable.

      Aquí está la lista de productos disponibles con sus descripciones:
      ${productInfo}

      Necesidad del usuario: "${userInput}"

      Basado en la necesidad del usuario y las descripciones de los productos, recomienda de 1 a 3 productos de la lista proporcionada que sean más relevantes.
      Para cada recomendación, menciona el nombre exacto del producto.
      Explica brevemente por qué cada producto es una buena opción en 1 o 2 frases.
      Si ningún producto parece adecuado, explica amablemente que no encontraste una coincidencia y sugiere que exploren el catálogo.
      Formatea tu respuesta de manera clara y concisa. No uses markdown. Utiliza saltos de línea para separar las recomendaciones.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text;

  } catch (error) {
    console.error("Error fetching recommendations from Gemini:", error);
    throw new Error("Failed to get recommendations.");
  }
}