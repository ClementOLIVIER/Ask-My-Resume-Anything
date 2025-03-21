import { GoogleGenerativeAI } from '@google/generative-ai';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    const { userMessage, messageHistory, resumeContent } = await readBody(event);
    
    // Log incoming user message
    console.log('📩 Incoming user message:', userMessage);

    if (!userMessage) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid request: userMessage is required',
      });
    }

    if (!messageHistory || !Array.isArray(messageHistory)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid request: messageHistory must be an array',
      });
    }

    const apiKey = config.geminiApiKey || process.env.GEMINI_API_KEY; 
    if (!apiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Gemini API key not configured',
      });
    }

    let genAI;
    try {
      genAI = new GoogleGenerativeAI(apiKey);
    } catch (e) {
      console.error(`Failed to initialize Gemini API: ${e.message}`);
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to initialize Gemini API',
      });
    }

    const systemInstruction = `You are a resume analysis assistant. Your task is to answer questions about the provided resume.

  Resume:
  ${JSON.stringify(resumeContent, null, 2)}
  `;

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-lite',
      systemInstruction,
    });

    const chatSession = model.startChat({
      history: messageHistory.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
    });

    const result = await chatSession.sendMessage(userMessage);
    const responseText = result.response.text();
    
    // Log assistant response
    console.log('📤 Assistant response:', responseText);
    
    return {
      success: true,
      response: responseText,
    };
  } catch (error) {
    console.error('chat.post.ts error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
});
