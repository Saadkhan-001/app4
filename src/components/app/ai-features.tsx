"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { explainCodeAction, generateTestsAction, refactorCodeAction } from "@/app/actions";
import { Bot, TestTube, Sparkles, AlertCircle } from 'lucide-react';
import { LivePreview } from './live-preview';

type AiFeaturesProps = {
  selectedFile: { name: string; content: string; language: string } | null;
};

type Feature = "preview" | "explain" | "test" | "refactor";

export function AiFeatures({ selectedFile }: AiFeaturesProps) {
  const [activeTab, setActiveTab] = useState<Feature>("preview");
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<Record<Feature, string | null>>({
    preview: null,
    explain: null,
    test: null,
    refactor: null,
  });
  const [error, setError] = useState<string | null>(null);

  const handleAction = async () => {
    if (!selectedFile || activeTab === 'preview') return;

    setIsLoading(true);
    setError(null);
    setOutput(prev => ({ ...prev, [activeTab]: null }));

    try {
      let result;
      if (activeTab === 'explain') {
        result = await explainCodeAction(selectedFile.content, selectedFile.language);
        setOutput(prev => ({ ...prev, explain: result.explanation }));
      } else if (activeTab === 'test') {
        result = await generateTestsAction(selectedFile.content, selectedFile.language);
        setOutput(prev => ({ ...prev, test: result.tests }));
      } else if (activeTab === 'refactor') {
        result = await refactorCodeAction(selectedFile.content, selectedFile.language);
        setOutput(prev => ({ ...prev, refactor: result.refactoredCode }));
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  const getButtonText = () => {
    switch (activeTab) {
      case 'explain': return <> <Bot className="mr-2" /> Explain Code</>;
      case 'test': return <><TestTube className="mr-2" /> Generate Tests</>;
      case 'refactor': return <><Sparkles className="mr-2" /> Refactor Code</>;
      default: return '';
    }
  }

  const wrapperClass = "h-full flex flex-col bg-slate-900/40 backdrop-blur-lg border border-primary/10 rounded-2xl p-4";

  return (
    <div className={wrapperClass}>
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as Feature)} className="h-full flex flex-col">
        <TabsList className="bg-transparent p-0">
          <TabsTrigger value="preview" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Live Preview</TabsTrigger>
          <TabsTrigger value="explain" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Explain</TabsTrigger>
          <TabsTrigger value="test" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Test</TabsTrigger>
          <TabsTrigger value="refactor" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Refactor</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="flex-grow h-0 mt-4">
          <LivePreview code={selectedFile?.content || ""} />
        </TabsContent>

        {["explain", "test", "refactor"].map((feature) => (
          <TabsContent key={feature} value={feature} className="flex-grow h-0 mt-4 flex flex-col gap-4">
            <Button onClick={handleAction} disabled={isLoading || !selectedFile} className="w-full">
              {getButtonText()}
            </Button>
            <div className="flex-grow h-0 bg-slate-900 rounded-b-md overflow-auto">
              <ScrollArea className="h-full w-full">
                <div className="p-4 text-sm">
                  {isLoading && <Skeleton className="w-full h-32 bg-primary/10" />}
                  {error && !isLoading && (
                    <div className="text-destructive flex items-center gap-2">
                      <AlertCircle />
                      <span>{error}</span>
                    </div>
                   )}
                  {output[feature as Feature] && !isLoading && (
                    <pre className="whitespace-pre-wrap font-code">
                      <code>{output[feature as Feature]}</code>
                    </pre>
                  )}
                  {!isLoading && !error && !output[feature as Feature] && (
                    <div className="text-center text-muted-foreground p-8">
                      <p>Click the button above to generate the {feature}.</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
