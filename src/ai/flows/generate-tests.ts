'use server';
/**
 * @fileOverview A unit test generation AI agent.
 *
 * - generateTests - A function that handles the unit test generation process.
 * - GenerateTestsInput - The input type for the generateTests function.
 * - GenerateTestsOutput - The return type for the generateTests function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTestsInputSchema = z.object({
  code: z.string().describe('The code snippet to generate tests for.'),
  language: z.string().describe('The programming language of the code.'),
});
export type GenerateTestsInput = z.infer<typeof GenerateTestsInputSchema>;

const GenerateTestsOutputSchema = z.object({
  tests: z.string().describe('The generated unit tests.'),
});
export type GenerateTestsOutput = z.infer<typeof GenerateTestsOutputSchema>;

export async function generateTests(input: GenerateTestsInput): Promise<GenerateTestsOutput> {
  return generateTestsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTestsPrompt',
  input: {schema: GenerateTestsInputSchema},
  output: {schema: GenerateTestsOutputSchema},
  prompt: `You are an expert software engineer. Write unit tests for the following {{{language}}} code snippet.

Code:
\`\`\`
{{{code}}}
\`\`\`

Generate comprehensive unit tests.
`,
});

const generateTestsFlow = ai.defineFlow(
  {
    name: 'generateTestsFlow',
    inputSchema: GenerateTestsInputSchema,
    outputSchema: GenerateTestsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
