import { motion } from "framer-motion";
import { MapPin, BarChart3, PieChart } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, PieChart as RechartsPieChart, Pie } from "recharts";

// Work order trend data (past 12 months)
const workOrderData = [
  { month: "Jan", leakRepairs: 45, preventative: 120 },
  { month: "Feb", leakRepairs: 38, preventative: 115 },
  { month: "Mar", leakRepairs: 52, preventative: 140 },
  { month: "Apr", leakRepairs: 48, preventative: 155 },
  { month: "May", leakRepairs: 42, preventative: 165 },
  { month: "Jun", leakRepairs: 55, preventative: 180 },
  { month: "Jul", leakRepairs: 62, preventative: 175 },
  { month: "Aug", leakRepairs: 58, preventative: 170 },
  { month: "Sep", leakRepairs: 45, preventative: 160 },
  { month: "Oct", leakRepairs: 40, preventative: 145 },
  { month: "Nov", leakRepairs: 35, preventative: 130 },
  { month: "Dec", leakRepairs: 30, preventative: 110 },
];

// Capital planning data
const capitalData = [
  { name: "Recover", value: 56, color: "hsl(var(--accent))" },
  { name: "Tear-off", value: 36, color: "hsl(var(--teal))" },
  { name: "Partial", value: 6, color: "hsl(var(--cta))" },
  { name: "Other", value: 2, color: "hsl(var(--muted-foreground))" },
];

// States with coverage
const coveredStates = [
  "AL", "AR", "FL", "GA", "IL", "IN", "KY", "LA", "MD", "MI",
  "MO", "MS", "NC", "NJ", "NY", "OH", "OK", "PA", "SC", "TN",
  "TX", "VA", "WI", "AZ", "CO", "NV", "CA", "WA"
];

function USCoverageMap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
          <MapPin className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Coverage Map</h3>
          <p className="text-sm text-muted-foreground">28 states nationwide</p>
        </div>
      </div>
      
      {/* Simplified state grid representation */}
      <div className="grid grid-cols-7 gap-1 mt-4">
        {["WA", "MT", "ND", "MN", "WI", "MI", "ME",
          "OR", "ID", "SD", "IA", "IL", "IN", "NY",
          "NV", "WY", "NE", "MO", "KY", "OH", "PA",
          "CA", "UT", "CO", "KS", "TN", "VA", "NJ",
          "AZ", "NM", "OK", "AR", "NC", "SC", "MD",
          "HI", "AK", "TX", "LA", "MS", "AL", "GA",
          "", "", "", "", "", "FL", ""
        ].map((state, i) => (
          <div
            key={i}
            className={`aspect-square rounded-sm flex items-center justify-center text-[10px] font-medium ${
              state === "" 
                ? "bg-transparent" 
                : coveredStates.includes(state)
                  ? "bg-accent/80 text-accent-foreground"
                  : "bg-muted/30 text-muted-foreground/50"
            }`}
          >
            {state}
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-4 mt-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-accent/80" />
          <span className="text-muted-foreground">Active Coverage</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-muted/30" />
          <span className="text-muted-foreground">Coming Soon</span>
        </div>
      </div>
    </motion.div>
  );
}

function WorkOrderChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-teal/20 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-teal" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Work Order Trends</h3>
          <p className="text-sm text-muted-foreground">Past 12 months activity</p>
        </div>
      </div>
      
      <div className="h-48 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={workOrderData} barGap={0}>
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              hide 
            />
            <Bar 
              dataKey="preventative" 
              fill="hsl(var(--accent))" 
              radius={[2, 2, 0, 0]}
              name="Preventative"
            />
            <Bar 
              dataKey="leakRepairs" 
              fill="hsl(var(--cta))" 
              radius={[2, 2, 0, 0]}
              name="Leak Repairs"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center gap-4 mt-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-accent" />
          <span className="text-muted-foreground">Preventative</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-cta" />
          <span className="text-muted-foreground">Leak Repairs</span>
        </div>
      </div>
    </motion.div>
  );
}

function CapitalPlanningChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-cta/20 flex items-center justify-center">
          <PieChart className="w-5 h-5 text-cta" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Capital Planning</h3>
          <p className="text-sm text-muted-foreground">$3B allocation breakdown</p>
        </div>
      </div>
      
      <div className="h-48 mt-4 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={capitalData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
            >
              {capitalData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </RechartsPieChart>
        </ResponsiveContainer>
        
        {/* Center label */}
        <div className="absolute flex flex-col items-center">
          <span className="text-2xl font-bold text-foreground">$3B</span>
          <span className="text-xs text-muted-foreground">Total</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
        {capitalData.map((item) => (
          <div key={item.name} className="flex items-center gap-1">
            <div 
              className="w-3 h-3 rounded-sm" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-muted-foreground">{item.name} ({item.value}%)</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function DataVisualization() {
  return (
    <section className="bg-secondary section-padding">
      <div className="container-narrow mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-wider">
            Portfolio Intelligence
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Data-Driven Decision Making
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our Roof Controller platform provides real-time visibility into your entire portfolio.
            Here's a snapshot of what we're managing right now.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <USCoverageMap />
          <WorkOrderChart />
          <CapitalPlanningChart />
        </div>
      </div>
    </section>
  );
}
