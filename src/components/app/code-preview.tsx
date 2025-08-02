"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type File = {
  name: string;
  content: string;
  language: string;
};

function parseCode(code: string): File[] {
  if (!code) return [];
  const files: File[] = [];
  const fileRegex = /\/\/\s*FILE:\s*([^\s]+)\n/g;
  const parts = code.split(fileRegex);

  if (parts.length <= 1) {
    return [{ name: 'output.txt', content: code, language: 'text' }];
  }

  for (let i = 1; i < parts.length; i += 2) {
    const name = parts[i];
    const content = parts[i + 1]?.trim() || '';
    const language = name.split('.').pop() || 'text';
    files.push({ name, content, language });
  }
  return files;
}

export function CodePreview({ code, isLoading }: { code: string; isLoading: boolean }) {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (code) {
      setFiles(parseCode(code));
    }
  }, [code]);

  const wrapperClass = "h-full bg-slate-900/40 backdrop-blur-lg border border-primary/10 rounded-2xl p-4 flex flex-col";

  if (isLoading) {
    return (
      <div className={wrapperClass}>
        <Skeleton className="h-10 w-1/3 mb-4 bg-primary/10" />
        <Skeleton className="flex-grow w-full bg-primary/10" />
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className={`${wrapperClass} items-center justify-center`}>
        <div className="text-center text-muted-foreground">
          <p className="font-headline text-xl text-primary">Code will appear here</p>
          <p>Describe your app and click "Launch My App"</p>
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <Tabs defaultValue={files[0].name} className="h-full flex flex-col">
        <TabsList className="bg-transparent p-0">
          {files.map((file) => (
            <TabsTrigger key={file.name} value={file.name} className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">{file.name}</TabsTrigger>
          ))}
        </TabsList>
        {files.map((file) => (
          <TabsContent key={file.name} value={file.name} className="flex-grow h-0 mt-4">
            <div className="w-full h-full bg-slate-900 rounded-b-md overflow-auto">
              <pre className="p-4 text-sm h-full"><code className={`language-${file.language}`}>{file.content}</code></pre>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
