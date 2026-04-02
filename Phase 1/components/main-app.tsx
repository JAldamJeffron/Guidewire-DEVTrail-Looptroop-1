"use client"

import { useState } from "react"
import { NeonOnboardingScreen } from "./neon-onboarding-screen"
import { FintechDashboard } from "./fintech-dashboard"
import { AnalyticsDashboard } from "./analytics-dashboard"
import { Shield, Home, Activity, BarChart3, User } from "lucide-react"

type Screen = "onboarding" | "dashboard" | "analytics" | "profile"

export function MainApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("onboarding")

  // Bottom nav for non-onboarding screens
  const BottomNav = () => (
    <nav className="fixed bottom-0 inset-x-0 px-5 py-4 border-t border-border/50 bg-card/90 backdrop-blur-md z-30">
      <div className="flex items-center justify-around max-w-md mx-auto">
        <button 
          onClick={() => setCurrentScreen("dashboard")}
          className={`flex flex-col items-center gap-1 ${currentScreen === "dashboard" ? "text-primary" : "text-muted-foreground"}`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${currentScreen === "dashboard" ? "bg-primary/15" : ""}`}>
            <Home className="w-5 h-5" />
          </div>
          <span className="text-xs font-medium">Home</span>
        </button>
        <button 
          onClick={() => setCurrentScreen("analytics")}
          className={`flex flex-col items-center gap-1 ${currentScreen === "analytics" ? "text-primary" : "text-muted-foreground"}`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${currentScreen === "analytics" ? "bg-primary/15" : ""}`}>
            <BarChart3 className="w-5 h-5" />
          </div>
          <span className="text-xs font-medium">Analytics</span>
        </button>
        <button 
          onClick={() => setCurrentScreen("onboarding")}
          className={`flex flex-col items-center gap-1 text-muted-foreground`}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <span className="text-xs">Coverage</span>
        </button>
        <button 
          className="flex flex-col items-center gap-1 text-muted-foreground"
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </nav>
  )

  if (currentScreen === "onboarding") {
    return (
      <div className="relative">
        <div onClick={() => setCurrentScreen("dashboard")}>
          <NeonOnboardingScreen />
        </div>
        {/* Screen Indicator */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50">
          <div className="w-8 h-1 rounded-full bg-primary" />
          <div className="w-2 h-1 rounded-full bg-muted-foreground/30" />
          <div className="w-2 h-1 rounded-full bg-muted-foreground/30" />
        </div>
      </div>
    )
  }

  if (currentScreen === "dashboard") {
    return (
      <div className="relative">
        <FintechDashboard />
        <BottomNav />
      </div>
    )
  }

  if (currentScreen === "analytics") {
    return (
      <div className="relative">
        <AnalyticsDashboard />
        <BottomNav />
      </div>
    )
  }

  return null
}
