"use client";

import { useFormState, useFormStatus } from "react-dom";
import { generateApp } from "@/app/actions";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Rocket, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const initialState = { message: "", error: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full mt-4 font-bold text-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-accent/30"
    >
      {pending ? (
        <Loader2 className="animate-spin mr-2" />
      ) : (
        <Rocket className="mr-2" />
      )}
      {pending ? "Assembling your app..." : "🚀 Launch My App"}
    </Button>
  );
}

type PromptFormProps = {
  onSubmissionStart: (isLoading: boolean) => void;
  onSubmissionSuccess: (code: string) => void;
};

export function PromptForm({ onSubmissionStart, onSubmissionSuccess }: PromptFormProps) {
  const [state, formAction] = useFormState(generateApp, initialState);
  const { toast } = useToast();
  const { pending } = useFormStatus();

  useEffect(() => {
    onSubmissionStart(pending);
  }, [pending, onSubmissionStart]);
  
  useEffect(() => {
    if (state.message && state.error === false && state.data) {
      toast({ title: "Success!", description: state.message });
      onSubmissionSuccess(state.data.appStructure);
    } else if (state.message && state.error) {
      toast({ variant: "destructive", title: "Error!", description: state.message });
    }
  }, [state, toast, onSubmissionSuccess]);
  
  return (
    <form action={formAction}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="prompt" className="text-lg font-medium text-primary">Describe the app you want to build...</Label>
          <Textarea
            id="prompt"
            name="prompt"
            placeholder="e.g., 'Build a restaurant app in Flutter with login and map support'"
            className="mt-2 min-h-[120px] bg-background/50 border-primary/20 focus:border-primary focus:ring-primary"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="language" className="text-primary">Language</Label>
            <Select name="language" defaultValue="react" required>
              <SelectTrigger id="language" className="bg-background/50 border-primary/20">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="html">HTML/CSS/JS</SelectItem>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="flutter">Flutter</SelectItem>
                <SelectItem value="kotlin">Kotlin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="platform" className="text-primary">Platform</Label>
            <Select name="platform" defaultValue="web" required>
              <SelectTrigger id="platform" className="bg-background/50 border-primary/20">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web">Web</SelectItem>
                <SelectItem value="android">Android</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}