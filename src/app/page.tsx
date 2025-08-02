"use client";

import { useState } from 'react';
import { Header } from '@/components/app/header';
import { PromptForm } from '@/components/app/prompt-form';
import { CodePreview } from '@/components/app/code-preview';
import { LivePreview } from '@/components/app/live-preview';
import { ExportPanel } from '@/components/app/export-panel';

export default function Home() {
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccess = (code: string) => {
    setGeneratedCode(code);
  };

  return (
    <main className="min-h-screen w-full overflow-hidden p-4 md:p-8">
      <Header />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-150px)]">
        {/* Left Column */}
        <div className="lg:col-span-3 space-y-8 flex flex-col min-h-[400px]">
          <div className="p-6 rounded-2xl bg-slate-900/40 backdrop-blur-lg border border-primary/10 shadow-lg">
            <PromptForm
              onSubmissionStart={setIsLoading}
              onSubmissionSuccess={handleSuccess}
            />
          </div>
          <ExportPanel hasCode={!!generatedCode} />
        </div>

        {/* Middle Column */}
        <div className="lg:col-span-5 h-full min-h-[400px] lg:min-h-0">
          <CodePreview code={generatedCode} isLoading={isLoading} />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 h-full min-h-[400px] lg:min-h-0">
          <LivePreview code={generatedCode} isLoading={isLoading} />
        </div>
      </div>
    </main>
  );
}
