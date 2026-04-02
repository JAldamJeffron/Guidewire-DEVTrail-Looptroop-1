"use client"

import { CloudRain, Zap, AlertTriangle, Shield, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const disruptions = [
  {
    icon: CloudRain,
    title: "Extreme Weather",
    description: "Floods & Heavy Rain",
    color: "from-cyan-500 to-blue-600",
    iconBg: "bg-cyan-500/20",
    iconColor: "text-cyan-400",
    borderColor: "border-cyan-500/30",
  },
  {
    icon: Zap,
    title: "Power Grid Failures",
    description: "Dark Store Outages",
    color: "from-amber-500 to-orange-600",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
    borderColor: "border-amber-500/30",
  },
  {
    icon: AlertTriangle,
    title: "City Curfews",
    description: "Unplanned Restrictions",
    color: "from-rose-500 to-pink-600",
    iconBg: "bg-rose-500/20",
    iconColor: "text-rose-400",
    borderColor: "border-rose-500/30",
  },
]

export function NeonOnboardingScreen() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Content */}
        <div className="relative flex-1 flex flex-col px-5 py-8 max-w-md mx-auto w-full">
          
          {/* EarnSure Logo Header */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/40">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">EarnSure</span>
          </div>
          
          {/* Top Section - The Hook */}
          <header className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary uppercase tracking-wider">Income Shield</span>
            </div>
            
            <h1 className="text-3xl font-bold text-foreground leading-tight mb-4 text-balance">
              Welcome to EarnSure:{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                Your Income, Protected.
              </span>
            </h1>
            
            <p className="text-muted-foreground text-base leading-relaxed">
              When the city stops, your earnings shouldn't.
            </p>
          </header>

          {/* Middle Section - The Problem */}
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 text-center">
              What We Cover (Loss of Income Only)
            </h2>
            
            <div className="flex flex-col gap-3">
              {disruptions.map((item) => (
                <Card 
                  key={item.title}
                  className={`bg-card/50 backdrop-blur-sm border ${item.borderColor} hover:border-opacity-60 transition-all duration-300`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                        <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-base">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Bottom Section - The Solution */}
          <section className="mb-8">
            <div className="relative rounded-2xl overflow-hidden">
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/50 via-accent to-accent/50 rounded-2xl" />
              <div className="absolute inset-[1px] bg-accent/10 backdrop-blur-sm rounded-2xl" />
              
              <div className="relative p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <h3 className="font-bold text-accent text-lg">The Solution</h3>
                </div>
                
                <p className="text-foreground/90 text-sm leading-relaxed">
                  <span className="font-semibold text-foreground">Zero-touch parametric payouts.</span>{" "}
                  If an external disruption halts your deliveries, our AI instantly credits your lost wages.{" "}
                  <span className="text-accent font-medium">No claims, no waiting.</span>
                </p>
              </div>
            </div>
          </section>

          {/* Spacer to push button to bottom */}
          <div className="flex-1" />

          {/* CTA Button */}
          <footer className="pt-4 pb-2">
            <Button 
              size="lg" 
              className="relative w-full h-14 text-base font-bold rounded-xl bg-gradient-to-r from-accent to-emerald-500 text-accent-foreground shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 transition-all duration-300 overflow-hidden group"
            >
              {/* Glow effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Shield className="w-5 h-5 mr-2" />
              Activate EarnSure Shield
            </Button>
            
            <p className="text-center text-xs text-muted-foreground mt-4">
              Cancel anytime. No hidden fees.
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}
