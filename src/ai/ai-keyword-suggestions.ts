'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing AI-powered keyword suggestions for resume content.
 *
 * - getAiKeywordSuggestions - A function that takes resume content and a template name as input and returns keyword suggestions.
 * - AiKeywordSuggestionsInput - The input type for the getAiKeywordSuggestions function.
 * - AiKeywordSuggestionsOutput - The return type for the getAiKeywordSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiKeywordSuggestionsInputSchema = z.object({
  resumeContent: z
    .string()
    .describe('The current content of the resume to generate keywords for.'),
  templateName: z.string().describe('The name of the resume template being used.'),
});
export type AiKeywordSuggestionsInput = z.infer<typeof AiKeywordSuggestionsInputSchema>;

const AiKeywordSuggestionsOutputSchema = z.object({
  keywords: z.array(z.string()).describe('An array of suggested keywords and phrases.'),
});
export type AiKeywordSuggestionsOutput = z.infer<typeof AiKeywordSuggestionsOutputSchema>;

export async function getAiKeywordSuggestions(
  input: AiKeywordSuggestionsInput
): Promise<AiKeywordSuggestionsOutput> {
  return aiKeywordSuggestionsFlow(input);
}

const aiKeywordSuggestionsPrompt = ai.definePrompt({
  name: 'aiKeywordSuggestionsPrompt',
  input: {schema: AiKeywordSuggestionsInputSchema},
  output: {schema: AiKeywordSuggestionsOutputSchema},
  prompt: `You are an expert resume keyword generator. You will provide a list of keywords and phrases that should be included in a resume based on the content provided and the template being used.

Resume Template: {{{templateName}}}
Resume Content: {{{resumeContent}}}

Provide a list of relevant keywords and phrases that would be appropriate for this resume. Be concise. Do not return more than 10 items.`,
});

const aiKeywordSuggestionsFlow = ai.defineFlow(
  {
    name: 'aiKeywordSuggestionsFlow',
    inputSchema: AiKeywordSuggestionsInputSchema,
    outputSchema: AiKeywordSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await aiKeywordSuggestionsPrompt(input);
    return output!;
  }
);
