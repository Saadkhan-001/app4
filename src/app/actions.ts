'use server';

import { z } from 'zod';
import { appBlueprint, type AppBlueprintInput } from '@/ai/flows/app-blueprint';

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
