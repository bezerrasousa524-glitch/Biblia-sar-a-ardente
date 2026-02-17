
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Google GenAI client following the required pattern
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  // Uses gemini-3-flash-preview for basic text tasks like daily verse generation
  async getDailyVerse() {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Escolha um versículo bíblico impactante para hoje, inclua a referência e uma reflexão profunda. Retorne em JSON.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reference: { type: Type.STRING },
            text: { type: Type.STRING },
            reflection: { type: Type.STRING }
          },
          required: ["reference", "text", "reflection"]
        }
      }
    });
    // Use .text property to extract output string
    return JSON.parse(response.text || '{}');
  },

  // Uses gemini-3-flash-preview for devotional generation
  async getDailyDevotional() {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Crie um devocional completo para o dia de hoje baseado no tema 'Sarça Ardente' (Presença de Deus). Inclua título, versículo chave, reflexão pastoral (3 parágrafos) e uma oração. Retorne em JSON.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            verse: { type: Type.STRING },
            content: { type: Type.STRING },
            prayer: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["title", "verse", "content", "prayer", "tags"]
        }
      }
    });
    // Use .text property to extract output string
    return JSON.parse(response.text || '{}');
  },

  // Fetches Bible text using gemini-3-flash-preview
  async getChapterText(book: string, chapter: number) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Forneça o texto completo e fiel do capítulo ${chapter} do livro de ${book} da Bíblia (Almeida). Retorne uma lista de versículos com número e texto.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            verses: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  number: { type: Type.INTEGER },
                  text: { type: Type.STRING }
                },
                required: ["number", "text"]
              }
            }
          },
          required: ["verses"]
        }
      }
    });
    // Use .text property to extract output string
    return JSON.parse(response.text || '{"verses": []}');
  },

  /**
   * Added the missing studyAssistant method.
   * Uses gemini-3-pro-preview for complex reasoning and theological analysis.
   */
  async studyAssistant(instruction: string, text: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `${instruction}\n\nTexto para análise: ${text}`,
    });
    // Directly returns the text from response
    return response.text || "Não foi possível realizar a análise no momento.";
  }
};
