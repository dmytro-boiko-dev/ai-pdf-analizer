import {parsePdfBase64} from './pdfUtils';
import {initTRPC} from '@trpc/server';
import {z} from 'zod';
import * as dotenv from "dotenv";

dotenv.config();

const tRPC = initTRPC.create();
const publicProcedure = tRPC.procedure;

const ENDPOINT = process.env.ENDPOINT!;
const GEMINI_AUTH_TOKEN = process.env.GEMINI_AUTH_TOKEN ?? '';

//@ts-ignore
export const appRouter = tRPC.router({

    analyzeCV: publicProcedure
        .input(
            z.object({
                jobDescriptionPdfBase64: z.string().nonempty(),
                cvPdfBase64: z.string().nonempty()
            })
        )
        .mutation(async ({input}) => {
            // 1) Parse PDF
            const [jobDescriptionText, cvText] = await Promise.all([
                parsePdfBase64(input.jobDescriptionPdfBase64),
                parsePdfBase64(input.cvPdfBase64),
            ]);

            const prompt = `
You are given two texts:

1) Job Description:
${jobDescriptionText}

2) CV:
${cvText}

Analyze the candidate's strengths and weaknesses, and evaluate how well they align with the job description. Return an overall assessment.
`;

            const requestBody = {
                // If using the official Vertex style:
                contents: [{text: prompt}],
                temperature: 0.5,
                maxOutputTokens: 1024,
            };

            const response = await fetch(ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${GEMINI_AUTH_TOKEN}`
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Gemini request failed: ${response.status} - ${errorText}`);
            }

            const result = await response.json();
            let analysis = 'No analysis available';
            if (result?.contents?.[0]?.text) {
                analysis = result.contents[0].text;
            }

            console.log(process.env.GEMINI_AUTH_TOKEN);

            return {analysis};
        }),
});

export type AppRouter = typeof appRouter;
