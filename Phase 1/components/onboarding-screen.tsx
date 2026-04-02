"use client"

import { Shield, CloudRain, Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function OnboardingScreen() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with Logo */}
      <header className="px-6 pt-8 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">SafeShift</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 flex flex-col">
        {/* Hero Illustration Section */}
        <div className="py-8">
          <div className="relative w-full aspect-square max-w-[280px] mx-auto">
            {/* Background Circle */}
            <div className="absolute inset-0 rounded-full bg-primary/5" />
            
            {/* Central Shield Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-16 h-16 text-primary" strokeWidth={1.5} />
              </div>
            </div>
            
            {/* Floating Icons */}
            <div className="absolute top-8 left-8 w-14 h-14 rounded-2xl bg-card shadow-lg flex items-center justify-center border border-border">
              <CloudRain className="w-7 h-7 text-primary" />
            </div>
            
            <div className="absolute top-8 right-8 w-14 h-14 rounded-2xl bg-card shadow-lg flex items-center justify-center border border-border">
              <Zap className="w-7 h-7 text-accent" />
            </div>
            
            {/* Bottom decorative element */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="w-2 h-2 rounded-full bg-primary/40" />
              <div className="w-2 h-2 rounded-full bg-primary/20" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 flex flex-col justify-center pb-4">
          <h1 className="text-2xl font-bold text-foreground leading-tight text-balance mb-4">
            A Safety Net for Your Hard Work
          </h1>
          
          <p className="text-base text-muted-foreground leading-relaxed">
            Protect yourself from weekly income loss caused by rain and dark store power cuts. Not for medical or vehicle expenses—strictly for your lost hours.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-2 mt-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <CloudRain className="w-4 h-4" />
              Rain Protection
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium">
              <Zap className="w-4 h-4" />
              Power Cut Coverage
            </span>
          </div>
        </div>
      </main>

      {/* Bottom CTA Section */}
      <footer className="px-6 pb-8 pt-4">
        <Button 
          size="lg" 
          className="w-full h-14 text-lg font-semibold rounded-xl shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
        >
          Get Started
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        
        {/* Trust indicator */}
        <p className="text-center text-sm text-muted-foreground mt-4">
          <span className="inline-flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" />
            Your data is 100% secure
          </span>
        </p>
      </footer>
    </div>
  )
}
