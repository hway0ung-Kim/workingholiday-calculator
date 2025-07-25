import fairWorkData from '../../fair_work_australia_data.json';

export interface WorkSession {
  date: string;
  startTime: string;
  endTime: string;
  breakMinutes: number;
  industry: string;
  hourlyRate: number;
}

export interface WageCalculationResult {
  regularHours: number;
  overtimeHours: number;
  regularPay: number;
  overtimePay: number;
  penaltyPay: number;
  totalPay: number;
  afterTaxPay: number;
}

export interface WeeklyWageResult {
  sessions: WorkSession[];
  totalHours: number;
  basePay: number;
  overtimePay: number;
  penaltyPay: number;
  grossPay: number;
  afterTaxPay: number;
  breakdown: {
    regularHours: number;
    overtimeHours: number;
    saturdayHours: number;
    sundayHours: number;
    publicHolidayHours: number;
  };
}

// Calculate working hours from time strings
export const calculateWorkingHours = (startTime: string, endTime: string, breakMinutes: number): number => {
  const start = new Date(`2024-01-01 ${startTime}`);
  const end = new Date(`2024-01-01 ${endTime}`);
  
  // Handle overnight shifts
  if (end < start) {
    end.setDate(end.getDate() + 1);
  }
  
  const totalMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
  const workingMinutes = totalMinutes - breakMinutes;
  
  return Math.max(0, workingMinutes / 60);
};

// Get penalty rates for specific industry and day type
export const getPenaltyRates = (industry: string) => {
  const industryData = fairWorkData.industries[industry as keyof typeof fairWorkData.industries];
  if (!industryData) {
    return fairWorkData.general_rules.penalty_rates;
  }
  return industryData.penalty_rates;
};

// Calculate penalty pay based on day of week and time
export const calculatePenaltyPay = (
  date: string,
  hours: number,
  hourlyRate: number,
  industry: string
): { penaltyHours: number; penaltyPay: number; dayType: string } => {
  const workDate = new Date(date);
  const dayOfWeek = workDate.getDay(); // 0 = Sunday, 6 = Saturday
  const penaltyRates = getPenaltyRates(industry);
  
  let penaltyMultiplier = 1;
  let dayType = 'weekday';
  
  if (dayOfWeek === 6) { // Saturday
    penaltyMultiplier = penaltyRates.saturday;
    dayType = 'saturday';
  } else if (dayOfWeek === 0) { // Sunday
    penaltyMultiplier = penaltyRates.sunday;
    dayType = 'sunday';
  }
  
  // Check for public holidays (simplified - would need real holiday data)
  // For now, just use the multiplier as is
  
  const penaltyHours = penaltyMultiplier > 1 ? hours : 0;
  const penaltyPay = hours * hourlyRate * (penaltyMultiplier - 1);
  
  return { penaltyHours, penaltyPay, dayType };
};

// Calculate overtime pay based on industry rules
export const calculateOvertimePay = (
  totalHours: number,
  hourlyRate: number,
  industry: string
): { overtimeHours: number; overtimePay: number } => {
  const industryData = fairWorkData.industries[industry as keyof typeof fairWorkData.industries];
  const maxRegularHours = industryData?.working_hours?.maximum_weekly || 38;
  
  if (totalHours <= maxRegularHours) {
    return { overtimeHours: 0, overtimePay: 0 };
  }
  
  const overtimeHours = totalHours - maxRegularHours;
  const overtimeMultiplier = industryData?.penalty_rates?.overtime || 1.5;
  const overtimePay = overtimeHours * hourlyRate * overtimeMultiplier;
  
  return { overtimeHours, overtimePay };
};

// Simple tax calculation (rough estimate for Australian tax)
export const calculateAfterTax = (grossPay: number): number => {
  // Simplified tax calculation - this should be more sophisticated in production
  const weeklyTaxFreeThreshold = 370; // ~$19,200/year / 52 weeks
  
  if (grossPay <= weeklyTaxFreeThreshold) {
    return grossPay;
  }
  
  const taxableAmount = grossPay - weeklyTaxFreeThreshold;
  const tax = taxableAmount * 0.19; // 19% tax rate for low income
  
  return grossPay - tax;
};

// Calculate single session wage
export const calculateSessionWage = (session: WorkSession): WageCalculationResult => {
  const workingHours = calculateWorkingHours(session.startTime, session.endTime, session.breakMinutes);
  const regularHours = Math.min(workingHours, 8); // Assuming 8 hours regular per day
  const overtimeHours = Math.max(0, workingHours - 8);
  
  const regularPay = regularHours * session.hourlyRate;
  const overtimePay = overtimeHours * session.hourlyRate * 1.5; // 1.5x for overtime
  
  const { penaltyPay } = calculatePenaltyPay(session.date, workingHours, session.hourlyRate, session.industry);
  
  const totalPay = regularPay + overtimePay + penaltyPay;
  const afterTaxPay = calculateAfterTax(totalPay);
  
  return {
    regularHours,
    overtimeHours,
    regularPay,
    overtimePay,
    penaltyPay,
    totalPay,
    afterTaxPay
  };
};

// Calculate weekly wage from multiple sessions
export const calculateWeeklyWage = (sessions: WorkSession[]): WeeklyWageResult => {
  let totalHours = 0;
  let basePay = 0;
  let penaltyPay = 0;
  let saturdayHours = 0;
  let sundayHours = 0;
  let publicHolidayHours = 0;
  
  // Calculate each session
  sessions.forEach(session => {
    const hours = calculateWorkingHours(session.startTime, session.endTime, session.breakMinutes);
    totalHours += hours;
    basePay += hours * session.hourlyRate;
    
    const { penaltyPay: sessionPenalty, dayType } = calculatePenaltyPay(
      session.date, 
      hours, 
      session.hourlyRate, 
      session.industry
    );
    
    penaltyPay += sessionPenalty;
    
    if (dayType === 'saturday') saturdayHours += hours;
    if (dayType === 'sunday') sundayHours += hours;
  });
  
  // Calculate overtime for the week
  const industry = sessions[0]?.industry || 'general';
  const { overtimeHours, overtimePay } = calculateOvertimePay(totalHours, sessions[0]?.hourlyRate || 0, industry);
  
  const grossPay = basePay + overtimePay + penaltyPay;
  const afterTaxPay = calculateAfterTax(grossPay);
  
  return {
    sessions,
    totalHours,
    basePay: basePay - overtimePay, // Base pay excluding overtime
    overtimePay,
    penaltyPay,
    grossPay,
    afterTaxPay,
    breakdown: {
      regularHours: totalHours - overtimeHours,
      overtimeHours,
      saturdayHours,
      sundayHours,
      publicHolidayHours
    }
  };
};

// Quick wage estimation for non-members
export const calculateQuickWage = (hourlyRate: number, dailyHours: number, daysPerWeek: number = 5) => {
  const weeklyHours = dailyHours * daysPerWeek;
  const regularHours = Math.min(weeklyHours, 38); // Standard full-time hours
  const overtimeHours = Math.max(0, weeklyHours - 38);
  
  const regularPay = regularHours * hourlyRate;
  const overtimePay = overtimeHours * hourlyRate * 1.5;
  
  const grossPay = regularPay + overtimePay;
  const afterTaxPay = calculateAfterTax(grossPay);
  
  return {
    weeklyHours,
    regularHours,
    overtimeHours,
    regularPay,
    overtimePay,
    grossPay,
    afterTaxPay
  };
}; 