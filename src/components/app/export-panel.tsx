"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Box, Tv } from "lucide-react";

export function ExportPanel({ hasCode }: { hasCode: boolean }) {
  return (
    <Card className="bg-slate-900/40 backdrop-blur-lg border border-primary/10 shadow-lg">
      <CardHeader>
        <CardTitle className="text-primary font-headline text-xl">Export Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button variant="outline" className="w-full justify-start text-foreground hover:bg-primary/10 hover:text-primary" disabled={!hasCode}>
          <Download className="mr-2" /> 💾 Get Code
        </Button>
        <Button variant="outline" className="w-full justify-start text-foreground" disabled>
          <Tv className="mr-2" /> Export Web Build
        </Button>
        <Button variant="outline" className="w-full justify-start text-foreground" disabled>
          <Box className="mr-2" /> 📦 Download APK
        </Button>
      </CardContent>
    </Card>
  );
}
