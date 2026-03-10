export interface Project {
  name: string;
  sector: string;
  stat: string;
  image: string;
}

export const SECTOR_FILTERS = [
  { label: "INDUSTRIAL & LOGISTICS", icon: "Warehouse" },
  { label: "HEALTHCARE", icon: "HeartPulse" },
  { label: "EDUCATIONAL", icon: "GraduationCap" },
  { label: "GOVERNMENT", icon: "Landmark" },
  { label: "HOSPITALITY", icon: "Hotel" },
  { label: "RETAIL", icon: "ShoppingBag" },
  { label: "MIXED-USE", icon: "Building2" },
  { label: "COLD STORAGE", icon: "Snowflake" },
] as const;

export const PROJECTS: Project[] = [
  {
    name: "Prologis Midwest Distribution Campus",
    sector: "INDUSTRIAL & LOGISTICS",
    stat: "142,000 SF managed",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
  },
  {
    name: "Southeast Healthcare Portfolio",
    sector: "HEALTHCARE",
    stat: "23 buildings, 6 states",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
  },
  {
    name: "Link Logistics National Portfolio",
    sector: "INDUSTRIAL & LOGISTICS",
    stat: "$4.2M in capital savings identified",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800",
  },
  {
    name: "State Government Complex – GA",
    sector: "GOVERNMENT",
    stat: "8-building campus, annual program",
    image: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800",
  },
  {
    name: "Sealy & Company Retail Centers",
    sector: "RETAIL",
    stat: "31 properties, 12 states",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
  },
  {
    name: "Colliers Mixed-Use Portfolio",
    sector: "MIXED-USE",
    stat: "Ongoing annual inspection program",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800",
  },
  {
    name: "Midwest Cold Storage Facility",
    sector: "COLD STORAGE",
    stat: "680,000 SF due diligence",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800",
  },
  {
    name: "EastGroup Properties Portfolio",
    sector: "INDUSTRIAL & LOGISTICS",
    stat: "Portfolio-wide survey program",
    image: "https://images.unsplash.com/photo-1543674892-7d64d45df18b?w=800",
  },
];
