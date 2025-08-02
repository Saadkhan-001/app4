'use server';

import { z } from 'zod';
import { appBlueprint, type AppBlueprintInput } from '@/ai/flows/app-blueprint';
import { explainCode, type ExplainCodeOutput } from '@/ai/flows/explain-code';
import { generateTests, type GenerateTestsOutput } from '@/ai/flows/generate-tests';
import { refactorCode, type RefactorCodeOutput } from '@/ai/flows/refactor-code';

const generateAppSchema = z.object({
  prompt: z.string().min(10, "Prompt must be at least 10 characters long."),
  language: z.string().min(1, "Please select a language."),
  platform: z.string().min(1, "Please select a platform."),
});

export type FormState = {
  message: string;
  data?: {
    appStructure: string;
  };
  error?: boolean;
}

export async function generateApp(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = generateAppSchema.safeParse({
    prompt: formData.get('prompt'),
    language: formData.get('language'),
    platform: formData.get('platform'),
  });

  if (!validatedFields.success) {
    const errorMessage = validatedFields.error.issues.map((issue) => issue.message).join(', ');
    return {
      message: `Invalid form data: ${errorMessage}`,
      error: true,
    };
  }

  try {
    const result = await appBlueprint(validatedFields.data as AppBlueprintInput);
    if (!result.appStructure) {
      throw new Error("AI failed to generate an app structure.");
    }
    return {
      message: "App blueprint generated successfully!",
      data: result,
      error: false,
    };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return {
      message: `Failed to generate app blueprint: ${errorMessage}`,
      error: true,
    };
  }
}

const ExplainCodeInputSchema = z.object({
  code: z.string().describe('The code snippet to explain.'),
  language: z.string().describe('The programming language of the code.'),
});

export async function explainCodeAction(code: string, language: string): Promise<ExplainCodeOutput> {
  const validatedFields = ExplainCodeInputSchema.safeParse({ code, language });
  if (!validatedFields.success) {
    throw new Error('Invalid input for explainCodeAction');
  }
  return await explainCode(validatedFields.data);
}

const GenerateTestsInputSchema = z.object({
  code: z.string().describe('The code snippet to generate tests for.'),
  language: z.string().describe('The programming language of the code.'),
});

export async function generateTestsAction(code: string, language: string): Promise<GenerateTestsOutput> {
  const validatedFields = GenerateTestsInputSchema.safeParse({ code, language });
  if (!validatedFields.success) {
    throw new Error('Invalid input for generateTestsAction');
  }
  return await generateTests(validatedFields.data);
}

const RefactorCodeInputSchema = z.object({
  code: z.string().describe('The code snippet to refactor.'),
  language: z.string().describe('The programming language of the code.'),
});

export async function refactorCodeAction(code: string, language: string): Promise<RefactorCodeOutput> {
  const validatedFields = RefactorCodeInputSchema.safeParse({ code, language });
  if (!validatedFields.success) {
    throw new Error('Invalid input for refactorCodeAction');
  }
  return await refactorCode(validatedFields.data);
}
