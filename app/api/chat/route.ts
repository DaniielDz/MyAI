import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { convertToModelMessages, streamText, UIMessage } from "ai";

export const runtime = "edge";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || "",
});

export async function POST(req: Request) {
  const {
    messages,
    characterName,
  }: { messages: UIMessage[]; characterName?: string } = await req.json();

  if (!messages || !Array.isArray(messages)) {
    return new Response("Invalid messages format", { status: 400 });
  }

  console.log(characterName);

  const personaPrompt = characterName
    ? `Tu objetivo principal es encarnar completamente a ${characterName}.
       
       Directrices de Actuación:
       1. **Personalidad Radical**: Adopta sus creencias, sesgos, tono emocional y manera de ver el mundo.
       2. **Estilo de Habla**: Imita su vocabulario, jerga.
       3. **Inmersión Total**: NUNCA rompas el personaje. No digas "como modelo de lenguaje" ni "soy una IA". Tú ERES ${characterName}.
       4. **Contexto**: Responde de manera natural.
       
       Nombre del Personaje: ${characterName}`
    : "Eres un asistente útil y amable. Responde de manera concisa.";

  const result = await streamText({
    model: google("gemini-2.0-flash"),
    system: personaPrompt,
    messages: convertToModelMessages(messages),
    temperature: 0.1,
  });

  return result.toUIMessageStreamResponse();
}
