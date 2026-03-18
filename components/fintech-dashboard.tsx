"use client"

import { useState, useEffect } from "react"
import { Shield, MapPin, Activity, Zap, TrendingUp, Bell, User, AlertTriangle, CheckCircle2, X, Sparkles } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"

export function FintechDashboard() {
  const [isShieldActive, setIsShieldActive] = useState(true)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowAlert(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background dark flex flex-col relative">
      {/* Glassmorphism Alert Overlay */}
      {showAlert && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowAlert(false)}
          />
          
          {/* Alert Card */}
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
            <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden">
              {/* Animated gradient border effect */}
              <div className="absolute inset-0 rounded-3xl p-px bg-gradient-to-b from-red-500/30 via-transparent to-accent/30 pointer-events-none" />
              
              {/* Close button */}
              <button 
                onClick={() => setShowAlert(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary/80 backdrop-blur-sm flex items-center justify-center hover:bg-secondary transition-colors z-10"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              {/* AI Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30">
                <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                <span className="text-xs font-semibold text-primary">AI System Alert</span>
              </div>

              {/* Header - The Problem */}
              <div className="pt-14 px-5 pb-5 bg-gradient-to-b from-red-500/15 to-transparent">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/30 flex-shrink-0">
                    <AlertTriangle className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-red-400 mb-1">
                      Critical Disruption Detected
                    </h3>
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      Massive Power Grid failure at Dark Store #4. All deliveries in this zone are halted.
                    </p>
                  </div>
                </div>
                
                {/* Live indicator */}
                <div className="flex items-center gap-2 mt-4">
                  <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  </div>
                  <span className="text-xs text-red-400/80 font-medium uppercase tracking-wide">Live Update</span>
                  <span className="text-xs text-muted-foreground">12:47 PM</span>
                </div>
              </div>

              {/* Divider */}
              <div className="relative h-px mx-5">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border to-transparent" />
                <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center">
                  <Zap className="w-4 h-4 text-accent" />
                </div>
              </div>

              {/* Footer - The Solution */}
              <div className="pt-5 px-5 pb-6 bg-gradient-to-t from-accent/10 to-transparent">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-emerald-400 flex items-center justify-center shadow-lg shadow-accent/30 flex-shrink-0">
                    <CheckCircle2 className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-accent mb-1">
                      Automated Solution Triggered
                    </h3>
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      Parametric claim approved. <span className="font-bold text-accent">Rs. 250</span> has been instantly credited to your UPI for 2 hours of lost downtime.
                    </p>
                  </div>
                </div>

                {/* Credit confirmation */}
                <div className="mt-5 p-4 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-emerald-400 flex items-center justify-center shadow-lg shadow-accent/20">
                      <span className="text-lg font-bold text-accent-foreground">Rs.</span>
                    </div>
                    <div>
                      <p className="text-xs text-accent font-medium">Instant Credit</p>
                      <p className="text-2xl font-bold text-foreground">250</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <span className="text-xs font-medium text-accent">Credited</span>
                    </div>
                    <span className="text-xs text-muted-foreground">to UPI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">SafeShift</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent animate-pulse" />
          </button>
          <button className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-accent/80 flex items-center justify-center shadow-lg shadow-primary/20">
            <User className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </header>

      <main className="flex-1 px-5 py-6 flex flex-col gap-5 overflow-auto">
        {/* Map Widget */}
        <Card className="overflow-hidden border-border/50 shadow-xl shadow-primary/5">
          <CardContent className="p-0">
            {/* Stylized Map */}
            <div className="relative h-52 bg-gradient-to-br from-secondary via-muted to-secondary overflow-hidden">
              {/* Grid Pattern */}
              <div className="absolute inset-0 opacity-30">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              
              {/* Glowing Operational Radius */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* Outer glow ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full bg-primary/10 border border-primary/30 animate-pulse" />
                {/* Middle ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-primary/15 border border-primary/40" />
                {/* Inner ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-primary/25 border-2 border-primary/60" />
                
                {/* Center marker */}
                <div className="relative z-10 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/50 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
              </div>
              
              {/* Decorative roads */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
              
              {/* Label */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-sm font-semibold text-foreground">Zepto Hub #4</span>
                  <span className="text-xs text-muted-foreground">3km radius</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Coverage Card */}
        <Card className="border-border/50 shadow-xl shadow-primary/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
          <CardContent className="p-5 relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Activity className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-foreground">Active Coverage</h2>
            </div>
            
            <div className="flex items-center justify-between bg-secondary/50 rounded-2xl p-4 border border-border/30">
              <div className="flex-1">
                <p className="text-base font-semibold text-foreground">Weekly Income Shield</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  <span className="text-accent font-bold">Rs. 45</span>/week
                </p>
              </div>
              <div className="flex items-center gap-3">
                {isShieldActive && (
                  <span className="text-xs font-medium text-accent bg-accent/15 px-2.5 py-1 rounded-full">
                    Active
                  </span>
                )}
                <Switch 
                  checked={isShieldActive}
                  onCheckedChange={setIsShieldActive}
                  className="data-[state=checked]:bg-accent"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Safety Net Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Your Safety Net</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Protected Target Widget */}
            <Card className="border-border/50 shadow-lg shadow-primary/5 overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">Protected Target</span>
                </div>
                
                <p className="text-2xl font-bold text-foreground mb-3">
                  <span className="text-primary">Rs.</span> 3,000
                </p>
                
                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                      style={{ width: '68%' }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Rs. 2,040 earned</span>
                    <span className="text-primary font-medium">68%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Live Grid Status Widget */}
            <Card className="border-border/50 shadow-lg shadow-primary/5 overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">Live Grid Status</span>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-2xl font-bold text-foreground">100%</p>
                  <span className="text-sm text-accent font-semibold">Stable</span>
                </div>
                
                {/* Pulse indicator */}
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-accent" />
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-accent animate-ping opacity-75" />
                  </div>
                  <span className="text-xs text-muted-foreground">All systems operational</span>
                </div>
                
                {/* Mini status bars */}
                <div className="flex gap-1 mt-3">
                  {[...Array(8)].map((_, i) => (
                    <div 
                      key={i} 
                      className="flex-1 h-1.5 rounded-full bg-accent/80"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="px-5 py-4 border-t border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center gap-1 text-primary">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-xs">Activity</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-xs">Claims</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
