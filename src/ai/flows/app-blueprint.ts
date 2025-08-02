'use server';
/**
 * @fileOverview AI App Blueprint generator.
 *
 * - appBlueprint - A function that handles the app blueprint generation process.
 * - AppBlueprintInput - The input type for the appBlueprint function.
 * - AppBlueprintOutput - The return type for the appBlueprint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AppBlueprintInputSchema = z.object({
  prompt: z.string().describe('A description of the app to build.'),
  language: z.string().optional().describe('The programming language to use (e.g., HTML, React, Flutter, Kotlin). If omitted, the agent will determine the best language.'),
  platform: z.string().optional().describe('The platform to target (Web, Android, or Both). If omitted, the agent will determine the best platform.'),
});
export type AppBlueprintInput = z.infer<typeof AppBlueprintInputSchema>;

const AppBlueprintOutputSchema = z.object({
  appStructure: z.string().describe('The generated app structure and code.'),
});
export type AppBlueprintOutput = z.infer<typeof AppBlueprintOutputSchema>;

export async function appBlueprint(input: AppBlueprintInput): Promise<AppBlueprintOutput> {
  return appBlueprintFlow(input);
}

const prompt = ai.definePrompt({
  name: 'appBlueprintPrompt',
  input: {schema: AppBlueprintInputSchema},
  output: {schema: AppBlueprintOutputSchema},
  prompt: `You are an AI-powered app builder. You take a description of an app, desired programming language, and target platform, and generate the initial app structure and code.

Description: {{{prompt}}}
Language: {{#if language}}{{{language}}}{{else}}The user has not specified a language.  You should select the most appropriate language.{{/if}}
Platform: {{#if platform}}{{{platform}}}{{else}}The user has not specified a platform.  You should select the most appropriate platform.{{/if}}

Generate the app structure and code:
`,
});

const appBlueprintFlow = ai.defineFlow(
  {
    name: 'appBlueprintFlow',
    inputSchema: AppBlueprintInputSchema,
    outputSchema: AppBlueprintOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
