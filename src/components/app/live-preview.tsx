"use client";

import { Button } from "@/components/ui/button";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { useState, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";

type Viewport = "desktop" | "tablet" | "mobile";

export function LivePreview({ code }: { code: string }) {
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    if (code) {
      const fileRegex = /\/\/\s*FILE:\s*index.html\n([\s\S]*?)(\n\/\/\s*FILE:|$)/;
      const match = code.match(fileRegex);
      if (match && match[1]) {
        setHtmlContent(match[1]);
      } else {
        setHtmlContent(null);
      }
    } else {
      setHtmlContent(null);
    }
  }, [code]);

  const viewportStyles: Record<Viewport, string> = {
    desktop: "w-full h-full",
    tablet: "w-[768px] h-[1024px] max-w-full max-h-full",
    mobile: "w-[375px] h-[667px] max-w-full max-h-full",
  };
  
  const wrapperClass = "h-full flex flex-col bg-slate-900/40 backdrop-blur-lg border border-primary/10 rounded-2xl p-4";

  return (
    <div className={wrapperClass}>
      <div className="flex-shrink-0 flex justify-center items-center gap-2 mb-4">
        <Button variant={viewport === 'desktop' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewport('desktop')} aria-label="Desktop view">
          <Monitor />
        </Button>
        <Button variant={viewport === 'tablet' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewport('tablet')} aria-label="Tablet view">
          <Tablet />
        </Button>
        <Button variant={viewport === 'mobile' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewport('mobile')} aria-label="Mobile view">
          <Smartphone />
        </Button>
      </div>
      <div className="flex-grow flex justify-center items-center overflow-auto bg-background/50 rounded-lg p-2">
        <div className={`${viewportStyles[viewport]} transition-all duration-300 bg-white rounded-md shadow-2xl`}>
          {htmlContent ? (
            <iframe
              srcDoc={htmlContent}
              className="w-full h-full"
              title="Live Preview"
              sandbox="allow-scripts"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-center text-muted-foreground bg-transparent">
              <div>
                <p className="font-headline text-xl text-primary">Live Preview</p>
                <p>Web previews will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
