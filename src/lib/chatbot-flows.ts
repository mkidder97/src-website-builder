// Chatbot conversation flow definitions

export interface ChatOption {
  id: string;
  label: string;
  icon?: string;
  action: 'navigate' | 'next-step' | 'external-link' | 'form' | 'call';
  target?: string;
}

export interface ChatStep {
  id: string;
  message: string;
  options?: ChatOption[];
  isForm?: 'quote' | 'storm';
  links?: { label: string; url: string; external?: boolean }[];
}

export interface ChatFlow {
  id: string;
  title: string;
  icon: string;
  steps: Record<string, ChatStep>;
}

// Coverage states
export const coveredStates = [
  'Alabama', 'Arizona', 'Arkansas', 'Colorado', 'Florida', 'Georgia', 
  'Illinois', 'Indiana', 'Kansas', 'Kentucky', 'Louisiana', 'Michigan',
  'Mississippi', 'Missouri', 'Nebraska', 'Nevada', 'New Mexico', 'North Carolina',
  'Ohio', 'Oklahoma', 'Pennsylvania', 'South Carolina', 'Tennessee', 'Texas',
  'Utah', 'Virginia', 'West Virginia', 'Wisconsin'
];

// Main topic options shown on chat open
export const mainTopics: ChatOption[] = [
  { id: 'service-need', label: 'Which service do I need?', icon: '🔍', action: 'next-step', target: 'service-need' },
  { id: 'reports', label: "What's included in reports?", icon: '📋', action: 'next-step', target: 'reports' },
  { id: 'coverage', label: 'Do you cover my area?', icon: '🗺️', action: 'next-step', target: 'coverage' },
  { id: 'timeline', label: 'How long does it take?', icon: '⏱️', action: 'next-step', target: 'timeline' },
  { id: 'pricing', label: 'How does pricing work?', icon: '💰', action: 'next-step', target: 'pricing' },
  { id: 'storm', label: 'Storm emergency?', icon: '🌪️', action: 'next-step', target: 'storm' },
];

// Conversation flows
export const chatFlows: Record<string, ChatFlow> = {
  'service-need': {
    id: 'service-need',
    title: 'Which service do I need?',
    icon: '🔍',
    steps: {
      start: {
        id: 'start',
        message: 'What best describes your situation?',
        options: [
          { id: 'acquiring', label: "I'm acquiring/buying a property", action: 'next-step', target: 'acquiring' },
          { id: 'maintenance', label: 'I need ongoing maintenance oversight', action: 'next-step', target: 'maintenance' },
          { id: 'project', label: 'I have a roofing project that needs management', action: 'next-step', target: 'project' },
          { id: 'storm', label: 'I have storm damage', action: 'next-step', target: 'storm-damage' },
          { id: 'measurements', label: 'I need measurements for a roofing bid', action: 'next-step', target: 'measurements' },
        ],
      },
      acquiring: {
        id: 'acquiring',
        message: "For acquisitions, our **Due Diligence inspection** is ideal. We provide comprehensive roof assessments with CapEx forecasts to inform your purchase decision.\n\n⏱️ Timeline: Typically 5-10 business days.",
        links: [
          { label: 'Learn More About Due Diligence', url: '/services/due-diligence' },
        ],
        options: [
          { id: 'quote', label: 'Request Quote', icon: '📝', action: 'form', target: 'quote' },
          { id: 'back', label: '← Back to topics', action: 'next-step', target: 'main' },
        ],
      },
      maintenance: {
        id: 'maintenance',
        message: "Our **Annual Inspection program** is perfect for maintaining roof health and warranty compliance. We recommend bi-annual inspections (spring and fall).",
        links: [
          { label: 'Learn More About Annual Inspections', url: '/services/annual' },
        ],
        options: [
          { id: 'quote', label: 'Request Quote', icon: '📝', action: 'form', target: 'quote' },
          { id: 'back', label: '← Back to topics', action: 'next-step', target: 'main' },
        ],
      },
      project: {
        id: 'project',
        message: "Our **Construction Management** service handles everything from bidding to final inspection. We act as your advocate to ensure quality work at competitive prices.",
        links: [
          { label: 'Learn More About Construction Management', url: '/services/construction-management' },
        ],
        options: [
          { id: 'quote', label: 'Request Quote', icon: '📝', action: 'form', target: 'quote' },
          { id: 'back', label: '← Back to topics', action: 'next-step', target: 'main' },
        ],
      },
      'storm-damage': {
        id: 'storm-damage',
        message: "🌪️ **For storm emergencies, we mobilize within 24-48 hours.**\n\nCall our storm hotline now:\n\n📞 **(727) 362-0116**",
        options: [
          { id: 'call', label: 'Call Now', icon: '📞', action: 'call', target: 'tel:+17273620116' },
          { id: 'form', label: 'Request Storm Inspection', icon: '🌪️', action: 'form', target: 'storm' },
          { id: 'back', label: '← Back to topics', action: 'next-step', target: 'main' },
        ],
      },
      measurements: {
        id: 'measurements',
        message: "Our **Take-off inspection** provides detailed measurements and specifications for bidding purposes. This is typically the first step in our Construction Management process.",
        links: [
          { label: 'Learn More About Construction Management', url: '/services/construction-management' },
        ],
        options: [
          { id: 'quote', label: 'Request Quote', icon: '📝', action: 'form', target: 'quote' },
          { id: 'back', label: '← Back to topics', action: 'next-step', target: 'main' },
        ],
      },
    },
  },
  reports: {
    id: 'reports',
    title: "What's included in reports?",
    icon: '📋',
    steps: {
      start: {
        id: 'start',
        message: 'Which report type are you interested in?',
        options: [
          { id: 'dd', label: 'Due Diligence Report', action: 'next-step', target: 'dd-report' },
          { id: 'annual', label: 'Annual Inspection Report', action: 'next-step', target: 'annual-report' },
          { id: 'cm', label: 'Construction Management Documentation', action: 'next-step', target: 'cm-docs' },
          { id: 'storm', label: 'Storm Damage Report', action: 'next-step', target: 'storm-report' },
        ],
      },
      'dd-report': {
        id: 'dd-report',
        message: "Our **Due Diligence reports** include:\n\n• Executive summary\n• Roof system identification\n• Condition assessment (1-10 rating)\n• Photo documentation (50-100 images)\n• Remaining useful life estimate\n• 10-year CapEx forecast\n• Recommended repairs",
        options: [
          { id: 'sample', label: 'View Sample Report', icon: '📄', action: 'next-step', target: 'sample-reports' },
          { id: 'quote', label: 'Request Quote', icon: '📝', action: 'form', target: 'quote' },
          { id: 'back', label: '← Back to topics', action: 'next-step', target: 'main' },
        ],
      },
      'annual-report': {
        id: 'annual-report',
        message: "**Annual Inspection reports** include:\n\n• Current condition assessment\n• Comparison to previous inspections\n• Photo documentation\n• Maintenance recommendations\n• Priority repair list\n• Warranty compliance checklist",
        options: [
          { id: 'sample', label: 'View Sample Report', icon: '📄', action: 'next-step', target: 'sample-reports' },
          { id: 'quote', label: 'Request Quote', icon: '📝', action: 'form', target: 'quote' },
          { id: 'back', label: '← Back to topics', action: 'next-step', target: 'main' },
        ],
      },
      'cm-docs': {
        id: 'cm-docs',
        message: "**CM projects** include:\n\n• Bid analysis spreadsheet\n• Contractor recommendations\n• In-progress inspection reports\n• Final inspection sign-off\n• Warranty documentation\n• Complete project records",
        links: [
          { label: 'Learn More', url: '/services/construction-management' },
        ],
        options: [
          { id: 'quote', label: 'Request Quote', icon: '📝', action: 'form', target: 'quote' },
          { id: 'back', label: '← Back to topics', action: 'next-step', target: 'main' },
        ],
      },
      'storm-report': {
        id: 'storm-report',
        message: "**Storm reports** are designed for insurance claims:\n\n• Damage assessment with photos\n• Repair scope and estimates\n• Insurance-ready documentation\n• Before/after comparisons (if available)",
        options: [
          { id: 'request', label: 'Request Storm Inspection', icon: '🌪️', action: 'form', target: 'storm' },
          { id: 'back', label: '← Back to topics', action: 'next-step', target: 'main' },
        ],
      },
      'sample-reports': {
        id: 'sample-reports',
        message: "I can show you sample reports! Select the type you'd like to see:",
        options: [
          { id: 'dd-sample', label: 'Due Diligence Sample', icon: '📄', action: 'next-step', target: 'show-samples' },
          { id: 'annual-sample', label: 'Annual Inspection Sample', icon: '📄', action: 'next-step', target: 'show-samples' },
          { id: 'capex-sample', label: 'CapEx Forecast Sample', icon: '📄', action: 'next-step', target: 'show-samples' },
        ],
      },
      'show-samples': {
        id: 'show-samples',
        message: "Sample reports are available for download. Click below to access them:",
        options: [
          { id: 'open-samples', label: 'View Sample Reports', icon: '📄', action: 'next-step', target: 'open-sample-modal' },
          { id: 'back', label: '← Back to topics', action: 'next-step', target: 'main' },
        ],
      },
    },
  },
  coverage: {
    id: 'coverage',
    title: 'Do you cover my area?',
    icon: '🗺️',
    steps: {
      start: {
        id: 'start',
        message: "We cover **28 states** across the US. What state is your property in?\n\nOur coverage includes: AL, AZ, AR, CO, FL, GA, IL, IN, KS, KY, LA, MI, MS, MO, NE, NV, NM, NC, OH, OK, PA, SC, TN, TX, UT, VA, WV, WI",
        options: [
          { id: 'covered', label: "My state is listed ✓", action: 'next-step', target: 'covered' },
          { id: 'not-covered', label: "My state isn't listed", action: 'next-step', target: 'not-covered' },
          { id: 'map', label: 'View Coverage Map', icon: '🗺️', action: 'navigate', target: '/roof-controller' },
        ],
      },
      covered: {
        id: 'covered',
        message: "Great news! We have active coverage in your area. We've managed thousands of roofs across our 28-state territory.\n\nReady to get started?",
        links: [
          { label: 'View Our Coverage Map', url: '/roof-controller' },
        ],
        options: [
          { id: 'quote', label: 'Request Quote', icon: '📝', action: 'form', target: 'quote' },
          { id: 'back', label: '← Back to topics', action: 'next-step', target: 'main' },
        ],
      },
      'not-covered': {
        id: 'not-covered',
        message: "We don't currently have regular coverage in your state, but we can often accommodate projects on a case-by-case basis, especially for larger portfolios.\n\nLet's discuss your needs!",
        links: [
          { label: 'View Coverage Map', url: '/roof-controller' },
        ],
        options: [
          { id: 'contact', label: 'Contact Us to Discuss', icon: '💬', action: 'navigate', target: '/contact' },
          { id: 'back', label: '← Back to topics', action: 'next-step', target: 'main' },
        ],
      },
    },
  },
  timeline: {
    id: 'timeline',
    title: 'How long does it take?',
    icon: '⏱️',
    steps: {
      start: {
        id: 'start',
        message: 'Which service are you asking about?',
        options: [
          { id: 'dd', label: 'Due Diligence Inspection', action: 'next-step', target: 'dd-timeline' },
          { id: 'annual', label: 'Annual Inspection', action: 'next-step', target: 'annual-timeline' },
          { id: 'cm', label: 'Construction Management', action: 'next-step', target: 'cm-timeline' },
          { id: 'storm', label: 'Storm Response', action: 'next-step', target: 'storm-timeline' },
        ],
      },
      'dd-timeline': {
        id: 'dd-timeline',
        message: "**Due Diligence timeline** depends on portfolio size:\n\n• Single property: 3-5 business days\n• 10-25 properties: 2-3 weeks\n• 25-50 properties: 3-4 weeks\n• 50+ properties: Custom timeline\n\nWe can often accommodate tight closing deadlines.",
        options: [
          { id: 'discuss', label: 'Discuss Your Timeline', icon: '📅', action: 'form', target: 'quote' },
          { id: 'back', label: '← Back to topics', action: 'next-step', target: 'main' },
        ],
      },
      'annual-timeline': {
        id: 'annual-timeline',
        message: "**Annual inspections** typically take 1-2 business days per property, with reports delivered within 5 days.",
        options: [
          { id: 'schedule', label: 'Schedule Inspections', icon: '📅', action: 'form', target: 'quote' },
          { id: 'back', label: '← Back to topics', action: 'next-step', target: 'main' },
        ],
      },
      'cm-timeline': {
        id: 'cm-timeline',
        message: "**CM timeline** depends on project scope:\n\n• Bidding phase: 2-4 weeks\n• Project duration: Varies by scope\n• We provide weekly progress updates",
        options: [
          { id: 'discuss', label: 'Discuss Your Project', icon: '🏗️', action: 'form', target: 'quote' },
          { id: 'back', label: '← Back to topics', action: 'next-step', target: 'main' },
        ],
      },
      'storm-timeline': {
        id: 'storm-timeline',
        message: "🌪️ We mobilize within **24-48 hours** for storm emergencies.\n\nInitial damage reports delivered within 72 hours.",
        options: [
          { id: 'call', label: 'Call Storm Hotline: (727) 362-0116', icon: '📞', action: 'call', target: 'tel:+17273620116' },
          { id: 'back', label: '← Back to topics', action: 'next-step', target: 'main' },
        ],
      },
    },
  },
  pricing: {
    id: 'pricing',
    title: 'How does pricing work?',
    icon: '💰',
    steps: {
      start: {
        id: 'start',
        message: "Our pricing is based on portfolio size and service type. We're happy to provide a custom quote.\n\n**Generally:**\n• Inspections are priced per square foot or per property\n• Volume discounts available for larger portfolios\n• Annual programs include discounted rates\n• CM fees are typically a percentage of project cost\n\nWant a custom quote for your portfolio?",
        options: [
          { id: 'quote', label: 'Yes, get a quote', icon: '📝', action: 'form', target: 'quote' },
          { id: 'browse', label: 'Just browsing for now', action: 'next-step', target: 'browsing' },
        ],
      },
      browsing: {
        id: 'browsing',
        message: "No problem! Feel free to explore our services or use our Savings Calculator to estimate potential ROI.",
        links: [
          { label: 'Explore Services', url: '/services' },
          { label: 'Try Savings Calculator', url: '/savings-calculator' },
        ],
        options: [
          { id: 'back', label: '← Back to topics', action: 'next-step', target: 'main' },
        ],
      },
    },
  },
  storm: {
    id: 'storm',
    title: 'Storm emergency?',
    icon: '🌪️',
    steps: {
      start: {
        id: 'start',
        message: "🌪️ **STORM EMERGENCY RESPONSE**\n\nWe mobilize within 24-48 hours for storm damage inspections.\n\n📞 **Call our storm hotline NOW:**\n**(727) 362-0116**\n\nOr submit an emergency request below:",
        options: [
          { id: 'call', label: 'Call Now: (727) 362-0116', icon: '📞', action: 'call', target: 'tel:+17273620116' },
          { id: 'form', label: 'Submit Emergency Request', icon: '🚨', action: 'form', target: 'storm' },
          { id: 'back', label: '← Back to topics', action: 'next-step', target: 'main' },
        ],
      },
    },
  },
};
