import {publicProcedure, router} from '../trpc';
import {z} from 'zod';
import axios from 'axios';
import {GenerateContentRequest} from '@google-cloud/vertexai';
import * as dotenv from 'dotenv';
dotenv.config();

const inputSchema = z.object({
    jobDescription: z.string(),
    cv: z.string(),
});

const GEMINI_API_ENDPOINT = process.env.GEMINI_API_ENDPOINT!;
const GEMINI_API_TOKEN = process.env.GEMINI_API_TOKEN!;

// @ts-ignore
const pdfAnalysisRouter = router({
    analyzePDFs: publicProcedure
        .input(inputSchema) // input validation
        .mutation(async ({input}) => {
            const {jobDescription, cv} = input;

            const requestBody: GenerateContentRequest = {
                contents: [
                    {
                        role: 'user',
                        parts: [
                            {text: `Job Description: ${jobDescription}`},
                            {text: `CV: ${cv}`},
                        ],
                    },
                ],
            };

            try {
                const response = await axios.post(GEMINI_API_ENDPOINT, requestBody, {
                    headers: {
                        Authorization: GEMINI_API_TOKEN,
                        'Content-Type': 'application/json',
                    },
                });

                return response.data;
            } catch (error) {
                throw new Error('Failed to analyze PDFs');
            }
        }),
});

export default pdfAnalysisRouter;