"use client"

import { useState, useEffect } from "react"
import { Shield, MapPin, IndianRupee, ChevronRight, Bell, User, AlertTriangle, X, Zap } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export function DashboardScreen() {
  const [isProtectionActive, setIsProtectionActive] = useState(true)
  const [showNotification, setShowNotification] = useState(false)

  // Show notification after a short delay to simulate real-time alert
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Push Notification Overlay */}
      {showNotification && (
        <div className="fixed inset-x-0 top-0 z-50 px-3 pt-3 animate-in slide-in-from-top-full duration-500">
          <div className="relative bg-amber-50 border-2 border-amber-400 rounded-2xl shadow-xl shadow-amber-200/50 overflow-hidden">
            {/* Animated warning stripe */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 animate-pulse" />
            
            {/* Close button */}
            <button 
              onClick={() => setShowNotification(false)}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-amber-200/80 flex items-center justify-center hover:bg-amber-300 transition-colors"
            >
              <X className="w-4 h-4 text-amber-800" />
            </button>
            
            <div className="p-4 pt-5">
              {/* Alert Header */}
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-300/50">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 pr-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wide text-amber-700 bg-amber-200 px-2 py-0.5 rounded">Live Alert</span>
                    <Zap className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                  </div>
                  <p className="text-sm font-bold text-amber-900 leading-snug">
                    Grid Outage Detected at Dark Store #4
                  </p>
                </div>
              </div>
              
              {/* Alert Body */}
              <div className="mt-3 pl-14">
                <p className="text-sm text-amber-800 leading-relaxed">
                  Deliveries halted. Crediting <span className="font-bold text-amber-900">₹250</span> for 2 hours of lost downtime instantly.
                </p>
              </div>
              
              {/* Credit Badge */}
              <div className="mt-4 flex items-center gap-3">
                <div className="flex-1 bg-green-100 border border-green-300 rounded-xl px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                      <IndianRupee className="w-4 h-4 text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-xs text-green-700 font-medium">Instant Credit</p>
                      <p className="text-lg font-bold text-green-800">₹250</p>
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Shield className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
            <span className="text-base font-semibold text-foreground">SafeShift</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
              <Bell className="w-4.5 h-4.5 text-muted-foreground" />
            </button>
            <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
              <User className="w-4.5 h-4.5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pb-6 flex flex-col gap-4">
        {/* Map Widget */}
        <Card className="overflow-hidden py-0 gap-0">
          <div className="relative w-full aspect-[4/3] bg-secondary">
            {/* Map Background - Stylized representation */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Grid pattern to represent streets */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
              
              {/* Main roads */}
              <div className="absolute top-1/2 left-0 right-0 h-3 bg-card -translate-y-1/2" />
              <div className="absolute left-1/2 top-0 bottom-0 w-3 bg-card -translate-x-1/2" />
              
              {/* Secondary roads */}
              <div className="absolute top-1/4 left-0 right-0 h-1.5 bg-card/70" />
              <div className="absolute top-3/4 left-0 right-0 h-1.5 bg-card/70" />
              <div className="absolute left-1/4 top-0 bottom-0 w-1.5 bg-card/70" />
              <div className="absolute left-3/4 top-0 bottom-0 w-1.5 bg-card/70" />
              
              {/* Building blocks */}
              <div className="absolute top-[10%] left-[10%] w-[15%] h-[12%] rounded-sm bg-muted" />
              <div className="absolute top-[10%] right-[10%] w-[20%] h-[10%] rounded-sm bg-muted" />
              <div className="absolute bottom-[10%] left-[10%] w-[18%] h-[15%] rounded-sm bg-muted" />
              <div className="absolute bottom-[10%] right-[10%] w-[15%] h-[12%] rounded-sm bg-muted" />
            </div>

            {/* Location Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
              <div className="relative">
                {/* Pulse effect */}
                <div className="absolute -inset-4 rounded-full bg-primary/20 animate-ping" />
                <div className="absolute -inset-2 rounded-full bg-primary/30" />
                
                {/* Marker */}
                <div className="relative w-10 h-10 rounded-full bg-primary shadow-lg flex items-center justify-center border-2 border-card">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                
                {/* Marker point */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-primary" />
              </div>
            </div>
          </div>

          {/* Store Info */}
          <CardContent className="py-3 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-700 font-bold text-sm">Z</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Zepto Dark Store</p>
                  <p className="text-xs text-muted-foreground">T. Nagar, Chennai</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Protection Toggle Card */}
        <Card className="py-4">
          <CardContent className="py-0">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="protection-toggle" className="text-base font-semibold text-foreground cursor-pointer">
                  Active Weekly Protection
                </Label>
                <p className="text-sm text-muted-foreground mt-0.5">
                  <span className="inline-flex items-center">
                    <IndianRupee className="w-3.5 h-3.5" />
                    45/week
                  </span>
                </p>
              </div>
              <Switch 
                id="protection-toggle"
                checked={isProtectionActive}
                onCheckedChange={setIsProtectionActive}
                className="scale-125 data-[state=checked]:bg-primary"
              />
            </div>
            
            {/* Status indicator */}
            {isProtectionActive && (
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-green-600 font-medium">Protection Active</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Protected Target Stat Card */}
        <Card className="py-5 bg-primary text-primary-foreground border-primary">
          <CardContent className="py-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary-foreground/80 font-medium">Protected Target</p>
                <div className="flex items-center mt-1">
                  <IndianRupee className="w-6 h-6" strokeWidth={2.5} />
                  <span className="text-3xl font-bold tracking-tight">3,000</span>
                </div>
                <p className="text-xs text-primary-foreground/70 mt-1">Weekly income coverage</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <Shield className="w-7 h-7 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="py-4">
            <CardContent className="py-0">
              <p className="text-xs text-muted-foreground font-medium">This Week</p>
              <p className="text-xl font-bold text-foreground mt-1">0 Claims</p>
            </CardContent>
          </Card>
          <Card className="py-4">
            <CardContent className="py-0">
              <p className="text-xs text-muted-foreground font-medium">Total Saved</p>
              <div className="flex items-center mt-1">
                <IndianRupee className="w-4 h-4 text-foreground" />
                <span className="text-xl font-bold text-foreground">1,200</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
