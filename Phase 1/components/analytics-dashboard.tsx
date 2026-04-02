"use client"

import { 
  Shield, TrendingUp, TrendingDown, Activity, Zap, CloudRain, 
  AlertTriangle, CheckCircle2, Clock, IndianRupee, MapPin, 
  BarChart3, PieChart, ArrowUpRight, ArrowDownRight, Bell, User
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const weeklyData = [
  { day: "Mon", earnings: 850, protected: 850 },
  { day: "Tue", earnings: 920, protected: 920 },
  { day: "Wed", earnings: 450, protected: 780, disruption: true },
  { day: "Thu", earnings: 880, protected: 880 },
  { day: "Fri", earnings: 950, protected: 950 },
  { day: "Sat", earnings: 1100, protected: 1100 },
  { day: "Sun", earnings: 320, protected: 720, disruption: true },
]

const recentClaims = [
  { id: 1, type: "Power Outage", location: "Dark Store #4", amount: 250, time: "2h ago", status: "credited" },
  { id: 2, type: "Heavy Rain", location: "Zone A", amount: 180, time: "1d ago", status: "credited" },
  { id: 3, type: "Power Outage", location: "Dark Store #2", amount: 320, time: "3d ago", status: "credited" },
]

const fraudChecks = [
  { label: "GPS Location", status: "verified", icon: MapPin },
  { label: "Active Shift", status: "verified", icon: Clock },
  { label: "Store Proximity", status: "verified", icon: Shield },
  { label: "Grid Data Match", status: "verified", icon: Zap },
]

export function AnalyticsDashboard() {
  const totalEarnings = weeklyData.reduce((sum, d) => sum + d.earnings, 0)
  const totalProtected = weeklyData.reduce((sum, d) => sum + d.protected, 0)
  const recoveredAmount = totalProtected - totalEarnings
  const maxValue = Math.max(...weeklyData.map(d => Math.max(d.earnings, d.protected)))

  return (
    <div className="dark min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">EarnSure</span>
          <span className="text-sm text-muted-foreground font-medium">Analytics</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-accent/80 flex items-center justify-center shadow-lg shadow-primary/20">
            <User className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </header>

      <main className="flex-1 px-5 py-6 flex flex-col gap-5 overflow-auto pb-24">
        {/* Summary Stats Row */}
        <div className="grid grid-cols-2 gap-3">
          {/* Weekly Earnings */}
          <Card className="border-border/50 shadow-lg overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground font-medium">This Week</span>
                <div className="flex items-center gap-1 text-accent text-xs font-medium">
                  <ArrowUpRight className="w-3 h-3" />
                  +12%
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">
                <span className="text-primary">Rs.</span> {totalProtected.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Protected earnings</p>
            </CardContent>
          </Card>

          {/* Amount Recovered */}
          <Card className="border-border/50 shadow-lg overflow-hidden bg-gradient-to-br from-accent/10 to-transparent">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground font-medium">Recovered</span>
                <CheckCircle2 className="w-4 h-4 text-accent" />
              </div>
              <p className="text-2xl font-bold text-accent">
                Rs. {recoveredAmount.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">From 2 disruptions</p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Chart */}
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="pb-2 px-4 pt-4">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Weekly Income Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {/* Chart */}
            <div className="flex items-end justify-between gap-2 h-36 mt-4">
              {weeklyData.map((day, i) => (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="relative w-full flex flex-col items-center gap-0.5" style={{ height: '100px' }}>
                    {/* Protected bar (background) */}
                    <div 
                      className={`w-full rounded-t-sm transition-all duration-500 ${
                        day.disruption 
                          ? 'bg-gradient-to-t from-accent/60 to-accent/30' 
                          : 'bg-primary/20'
                      }`}
                      style={{ height: `${(day.protected / maxValue) * 100}%`, position: 'absolute', bottom: 0 }}
                    />
                    {/* Actual earnings bar */}
                    <div 
                      className={`w-3/4 rounded-t-sm transition-all duration-500 ${
                        day.disruption 
                          ? 'bg-gradient-to-t from-red-500/80 to-orange-500/60' 
                          : 'bg-gradient-to-t from-primary to-primary/70'
                      }`}
                      style={{ height: `${(day.earnings / maxValue) * 100}%`, position: 'absolute', bottom: 0, zIndex: 1 }}
                    />
                    {/* Disruption indicator */}
                    {day.disruption && (
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2">
                        <AlertTriangle className="w-3 h-3 text-amber-400" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">{day.day}</span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-primary" />
                <span className="text-xs text-muted-foreground">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-accent/50" />
                <span className="text-xs text-muted-foreground">Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-3 h-3 text-amber-400" />
                <span className="text-xs text-muted-foreground">Disruption</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fraud Detection / Verification Section */}
        <Card className="border-border/50 shadow-lg overflow-hidden">
          <CardHeader className="pb-2 px-4 pt-4">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent" />
              Intelligent Fraud Detection
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Real-time validation checks</p>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="grid grid-cols-2 gap-2 mt-2">
              {fraudChecks.map((check) => (
                <div 
                  key={check.label}
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-accent/20"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
                    <check.icon className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{check.label}</p>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="text-xs text-accent capitalize">{check.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Claims */}
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="pb-2 px-4 pt-4">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Recent Payouts
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="flex flex-col gap-3 mt-2">
              {recentClaims.map((claim) => (
                <div 
                  key={claim.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border/30"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    claim.type.includes("Power") 
                      ? "bg-amber-500/15" 
                      : "bg-cyan-500/15"
                  }`}>
                    {claim.type.includes("Power") 
                      ? <Zap className="w-5 h-5 text-amber-400" />
                      : <CloudRain className="w-5 h-5 text-cyan-400" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{claim.type}</p>
                    <p className="text-xs text-muted-foreground">{claim.location} - {claim.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-accent">+Rs. {claim.amount}</p>
                    <div className="flex items-center gap-1 justify-end">
                      <CheckCircle2 className="w-3 h-3 text-accent" />
                      <span className="text-xs text-accent capitalize">{claim.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Coverage Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-border/50 shadow-lg">
            <CardContent className="p-3 text-center">
              <Zap className="w-5 h-5 text-amber-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">4</p>
              <p className="text-xs text-muted-foreground">Power Events</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-lg">
            <CardContent className="p-3 text-center">
              <CloudRain className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">2</p>
              <p className="text-xs text-muted-foreground">Rain Events</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-lg">
            <CardContent className="p-3 text-center">
              <Shield className="w-5 h-5 text-accent mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">6</p>
              <p className="text-xs text-muted-foreground">Total Claims</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
