
import { GoogleGenAI, Modality } from "@google/genai";
import { ImageFile } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const FUNNY_PROMPTS = [
    "Make this pet look like a tiny, adorable superhero, complete with a cape and flying through the sky.",
    "Put this pet in a historical royal portrait, wearing a crown, a monocle, and regal attire.",
    "Place this pet on the moon, wearing a little astronaut helmet, with planet Earth visible in the background.",
    "Turn this pet into a cool DJ at a vibrant, neon-lit music festival, wearing headphones."
];

async function generateSingleImage(image: ImageFile, prompt: string): Promise<string> {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [
                {
                    inlineData: {
                        data: image.base64,
                        mimeType: image.type,
                    },
                },
                {
                    text: prompt,
                },
            ],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
            return part.inlineData.data;
        }
    }
    
    throw new Error("No image data found in the API response.");
}


export const generateFunnyPetImages = async (image: ImageFile): Promise<string[]> => {
    try {
        const imageGenerationPromises = FUNNY_PROMPTS.map(prompt => 
            generateSingleImage(image, prompt)
        );

        const results = await Promise.allSettled(imageGenerationPromises);
        
        const successfulImages = results
            .filter((result): result is PromiseFulfilledResult<string> => result.status === 'fulfilled')
            .map(result => `data:${image.type};base64,${result.value}`);

        if (successfulImages.length === 0) {
            throw new Error("AI failed to generate any images. Please try another photo.");
        }

        return successfulImages;
    } catch (error) {
        console.error("Error generating funny pet images:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate images: ${error.message}`);
        }
        throw new Error("An unknown error occurred while generating images.");
    }
};
