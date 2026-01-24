// Calculator constants - store these for easy adjustment later
export const CALC_CONSTANTS = {
  // Replacement costs
  replacementCostPerSqFt: 7.50,
  
  // Roof lifespan
  lifespanNoProgram: 18,        // years
  lifespanWithSRC: 24,          // years (33% extension)
  
  // Emergency/failure rates by current approach
  failureRates: {
    reactive: 0.025,            // 2.5% annual failure rate
    basic: 0.015,               // 1.5% annual failure rate
    none: 0.035,                // 3.5% annual failure rate
  } as Record<string, number>,
  
  // Cost multipliers
  emergencyMultiplier: 5,       // Emergency repairs cost 5x preventive
  avgPreventiveRepairPerSqFt: 0.15,  // $0.15/sqft for preventive repairs
  
  // CM savings
  cmBiddingSavings: 0.12,       // 12% savings through competitive bidding
  
  // Valuation
  capRate: 0.06,                // 6% cap rate for NOI to value conversion
  
  // SRC costs (for ROI calculation)
  annualInspectionPerSqFt: 0.03,
  annualInspectionPerProperty: 750,  // minimum per property
};

export interface CalculatorInputs {
  totalSqFt: number;           // Total portfolio square footage
  propertyCount: number;        // Number of properties
  avgRoofAge: number;          // Average roof age in years
  plannedReplacements: number;  // $ planned for replacements in next 5 years
  currentApproach: 'reactive' | 'basic' | 'none';  // Current maintenance approach
}

export interface CalculatorResults {
  extendedLifeSavings: number;
  emergencyAvoidanceSavings: number;
  cmSavings: number;
  maintenanceSavings: number;
  totalSavings: number;
  annualSavings: number;
  noiImpact: number;
  valueImpact: number;
  totalInvestment: number;
  roi: number;
  yearsExtended: number;
}

export function calculateSavings(inputs: CalculatorInputs): CalculatorResults {
  const C = CALC_CONSTANTS;
  
  // 1. EXTENDED ROOF LIFE SAVINGS
  // Calculate the value of delaying replacements
  const yearsExtended = C.lifespanWithSRC - C.lifespanNoProgram; // 6 years
  const portfolioReplacementCost = inputs.totalSqFt * C.replacementCostPerSqFt;
  
  // Present value of deferring replacement (simplified: ~5% discount rate equivalent)
  // Deferring a $10M expense 6 years ≈ $2.5M in today's dollars saved
  const deferralValueFactor = 0.25; // Simplified PV factor
  const extendedLifeSavings = portfolioReplacementCost * deferralValueFactor;
  
  // 2. EMERGENCY REPAIR AVOIDANCE (5-year projection)
  const years = 5;
  const failureRate = C.failureRates[inputs.currentApproach];
  const reducedFailureRate = 0.005; // 0.5% with SRC program
  
  const avgRepairCostPerFailure = (inputs.totalSqFt / inputs.propertyCount) * C.avgPreventiveRepairPerSqFt * C.emergencyMultiplier;
  
  // Expected failures without SRC vs with SRC
  const expectedFailuresWithout = inputs.propertyCount * failureRate * years;
  const expectedFailuresWith = inputs.propertyCount * reducedFailureRate * years;
  const failuresAvoided = expectedFailuresWithout - expectedFailuresWith;
  
  const emergencyAvoidanceSavings = failuresAvoided * avgRepairCostPerFailure;
  
  // 3. CONSTRUCTION MANAGEMENT SAVINGS
  // Only applies if they have planned replacements
  const cmSavings = inputs.plannedReplacements * C.cmBiddingSavings;
  
  // 4. REDUCED ONGOING MAINTENANCE
  // Proactive vs reactive maintenance cost difference
  const reactiveMaintenanceCost = inputs.totalSqFt * C.avgPreventiveRepairPerSqFt * 1.5 * years;
  const proactiveMaintenanceCost = inputs.totalSqFt * C.avgPreventiveRepairPerSqFt * years;
  const maintenanceSavings = reactiveMaintenanceCost - proactiveMaintenanceCost;
  
  // TOTAL 5-YEAR SAVINGS
  const totalSavings = extendedLifeSavings + emergencyAvoidanceSavings + cmSavings + maintenanceSavings;
  
  // NOI IMPACT
  const annualSavings = totalSavings / years;
  const noiImpact = annualSavings; // Direct NOI improvement
  
  // PROPERTY VALUE IMPACT (NOI / Cap Rate)
  const valueImpact = noiImpact / C.capRate;
  
  // SRC INVESTMENT COST (5 years)
  const annualInspectionCost = Math.max(
    inputs.totalSqFt * C.annualInspectionPerSqFt,
    inputs.propertyCount * C.annualInspectionPerProperty
  );
  const totalInvestment = annualInspectionCost * years;
  
  // ROI
  const roi = totalSavings / totalInvestment;
  
  return {
    extendedLifeSavings: Math.round(extendedLifeSavings),
    emergencyAvoidanceSavings: Math.round(emergencyAvoidanceSavings),
    cmSavings: Math.round(cmSavings),
    maintenanceSavings: Math.round(maintenanceSavings),
    totalSavings: Math.round(totalSavings),
    annualSavings: Math.round(annualSavings),
    noiImpact: Math.round(noiImpact),
    valueImpact: Math.round(valueImpact),
    totalInvestment: Math.round(totalInvestment),
    roi: Math.round(roi * 10) / 10, // One decimal place
    yearsExtended,
  };
}
