"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Rocket, Zap, Infinity } from "lucide-react";

export function ProModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-headline text-accent border-accent hover:text-accent/90 hover:bg-accent/10 transition-colors shadow-accent/20 shadow-lg" variant="outline">Unlock Pro</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background/80 backdrop-blur-md border-primary/20 text-foreground">
        <DialogHeader>
          <DialogTitle className="text-primary font-headline text-2xl text-center">Unlock Nebula AppForge Pro</DialogTitle>
          <DialogDescription className="text-center pt-2 text-muted-foreground">
            Supercharge your app creation with Pro features.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4 p-2 rounded-lg bg-primary/5">
            <div className="p-2 bg-primary/10 rounded-md"><Rocket className="w-5 h-5 text-primary" /></div>
            <p>Background APK build for faster exports.</p>
          </div>
          <div className="flex items-center gap-4 p-2 rounded-lg bg-primary/5">
            <div className="p-2 bg-primary/10 rounded-md"><Infinity className="w-5 h-5 text-primary" /></div>
            <p>Unlimited app generations.</p>
          </div>
          <div className="flex items-center gap-4 p-2 rounded-lg bg-primary/5">
            <div className="p-2 bg-primary/10 rounded-md"><Zap className="w-5 h-5 text-primary" /></div>
            <p>Access to enhanced and exclusive templates.</p>
          </div>
        </div>
        <Button className="w-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/30">Upgrade Now</Button>
      </DialogContent>
    </Dialog>
  );
}
