export type Sector =
  | 'All Sectors'
  | 'Manufacturing'
  | 'Renewable Energy'
  | 'IT & ITES'
  | 'Healthcare'
  | 'Construction'
  | 'Automotive'
  | 'Agriculture'
  | 'Logistics';

export const SECTORS: Sector[] = [
  'All Sectors',
  'Manufacturing',
  'Renewable Energy',
  'IT & ITES',
  'Healthcare',
  'Construction',
  'Automotive',
  'Agriculture',
  'Logistics',
];

export interface OccupationDatum {
  occupation: string;
  sector: Exclude<Sector, 'All Sectors'>;
  industryDemand: number;
  trainingSeats: number;
  currentGraduates: number;
  deficit: number;
  unit: string;
}

export const OCCUPATION_DATA: OccupationDatum[] = [
  { occupation: 'Solar PV Technician', sector: 'Renewable Energy', industryDemand: 18500, trainingSeats: 6200, currentGraduates: 4200, deficit: 14300, unit: 'workers' },
  { occupation: 'CNC Machine Operator', sector: 'Manufacturing', industryDemand: 14200, trainingSeats: 5800, currentGraduates: 3900, deficit: 10300, unit: 'workers' },
  { occupation: 'Welder (TIG/MIG)', sector: 'Manufacturing', industryDemand: 22000, trainingSeats: 12400, currentGraduates: 8600, deficit: 13400, unit: 'workers' },
  { occupation: 'Staff Nurse (GNM)', sector: 'Healthcare', industryDemand: 31000, trainingSeats: 18500, currentGraduates: 14200, deficit: 16800, unit: 'workers' },
  { occupation: 'Full-Stack Developer', sector: 'IT & ITES', industryDemand: 26500, trainingSeats: 19200, currentGraduates: 15800, deficit: 10700, unit: 'workers' },
  { occupation: 'EV Battery Technician', sector: 'Automotive', industryDemand: 9800, trainingSeats: 2400, currentGraduates: 1600, deficit: 8200, unit: 'workers' },
  { occupation: 'Data Analyst', sector: 'IT & ITES', industryDemand: 17800, trainingSeats: 11200, currentGraduates: 9100, deficit: 8700, unit: 'workers' },
  { occupation: 'Construction Site Supervisor', sector: 'Construction', industryDemand: 15500, trainingSeats: 7800, currentGraduates: 5200, deficit: 10300, unit: 'workers' },
  { occupation: 'Logistics Coordinator', sector: 'Logistics', industryDemand: 13200, trainingSeats: 8600, currentGraduates: 6800, deficit: 6400, unit: 'workers' },
  { occupation: 'Medical Lab Technician', sector: 'Healthcare', industryDemand: 11400, trainingSeats: 6200, currentGraduates: 4800, deficit: 6600, unit: 'workers' },
  { occupation: 'Masonry Worker', sector: 'Construction', industryDemand: 28000, trainingSeats: 21000, currentGraduates: 17500, deficit: 10500, unit: 'workers' },
  { occupation: 'Tractor Operator', sector: 'Agriculture', industryDemand: 16500, trainingSeats: 14200, currentGraduates: 11800, deficit: 4700, unit: 'workers' },
  { occupation: 'HVAC Technician', sector: 'Construction', industryDemand: 9200, trainingSeats: 4800, currentGraduates: 3400, deficit: 5800, unit: 'workers' },
  { occupation: 'Quality Inspector', sector: 'Manufacturing', industryDemand: 8600, trainingSeats: 5400, currentGraduates: 4200, deficit: 4400, unit: 'workers' },
  { occupation: 'Pharmaceutical Operator', sector: 'Healthcare', industryDemand: 7300, trainingSeats: 5800, currentGraduates: 4600, deficit: 2700, unit: 'workers' },
  { occupation: 'Warehouse Forklift Operator', sector: 'Logistics', industryDemand: 12800, trainingSeats: 9200, currentGraduates: 7800, deficit: 5000, unit: 'workers' },
];

export interface WatchlistEntry {
  occupation: string;
  sector: Exclude<Sector, 'All Sectors'>;
  district: string;
  state: string;
  deficit: number;
  severity: 'Critical' | 'High' | 'Moderate';
  currentSeats: number;
  requiredSeats: number;
  monthsToAction: number;
}

export const WATCHLIST: WatchlistEntry[] = [
  { occupation: 'Solar PV Technician', sector: 'Renewable Energy', district: 'Patna', state: 'Bihar', deficit: 3200, severity: 'Critical', currentSeats: 480, requiredSeats: 3680, monthsToAction: 3 },
  { occupation: 'CNC Machine Operator', sector: 'Manufacturing', district: 'Pune', state: 'Maharashtra', deficit: 2800, severity: 'Critical', currentSeats: 620, requiredSeats: 3420, monthsToAction: 2 },
  { occupation: 'Staff Nurse (GNM)', sector: 'Healthcare', district: 'Bengaluru', state: 'Karnataka', deficit: 4100, severity: 'Critical', currentSeats: 1200, requiredSeats: 5300, monthsToAction: 4 },
  { occupation: 'EV Battery Technician', sector: 'Automotive', district: 'Nagpur', state: 'Maharashtra', deficit: 1800, severity: 'High', currentSeats: 240, requiredSeats: 2040, monthsToAction: 5 },
  { occupation: 'Welder (TIG/MIG)', sector: 'Manufacturing', district: 'Jamshedpur', state: 'Jharkhand', deficit: 2400, severity: 'High', currentSeats: 850, requiredSeats: 3250, monthsToAction: 4 },
  { occupation: 'Full-Stack Developer', sector: 'IT & ITES', district: 'Hyderabad', state: 'Telangana', deficit: 3200, severity: 'High', currentSeats: 2800, requiredSeats: 6000, monthsToAction: 6 },
  { occupation: 'Construction Site Supervisor', sector: 'Construction', district: 'Lucknow', state: 'Uttar Pradesh', deficit: 1500, severity: 'High', currentSeats: 600, requiredSeats: 2100, monthsToAction: 5 },
  { occupation: 'Data Analyst', sector: 'IT & ITES', district: 'Bengaluru', state: 'Karnataka', deficit: 2100, severity: 'Moderate', currentSeats: 1800, requiredSeats: 3900, monthsToAction: 7 },
  { occupation: 'Medical Lab Technician', sector: 'Healthcare', district: 'Patna', state: 'Bihar', deficit: 1200, severity: 'Moderate', currentSeats: 540, requiredSeats: 1740, monthsToAction: 6 },
  { occupation: 'HVAC Technician', sector: 'Construction', district: 'Mumbai', state: 'Maharashtra', deficit: 900, severity: 'Moderate', currentSeats: 420, requiredSeats: 1320, monthsToAction: 8 },
];

export interface DistrictDatum {
  district: string;
  state: string;
  sector: Exclude<Sector, 'All Sectors'>;
  occupationsReported: number;
  demand: number;
  supply: number;
  gap: number;
  gapPct: number;
  trainingInstitutes: number;
  lastUpdated: string;
}

export const DISTRICT_DATA: DistrictDatum[] = [
  { district: 'Patna', state: 'Bihar', sector: 'Renewable Energy', occupationsReported: 14, demand: 8200, supply: 3100, gap: 5100, gapPct: 62, trainingInstitutes: 8, lastUpdated: '2026-10-08' },
  { district: 'Gaya', state: 'Bihar', sector: 'Construction', occupationsReported: 9, demand: 4100, supply: 2400, gap: 1700, gapPct: 41, trainingInstitutes: 5, lastUpdated: '2026-10-06' },
  { district: 'Muzaffarpur', state: 'Bihar', sector: 'Agriculture', occupationsReported: 7, demand: 3200, supply: 2100, gap: 1100, gapPct: 34, trainingInstitutes: 4, lastUpdated: '2026-10-05' },
  { district: 'Bhagalpur', state: 'Bihar', sector: 'Manufacturing', occupationsReported: 6, demand: 2800, supply: 1900, gap: 900, gapPct: 32, trainingInstitutes: 3, lastUpdated: '2026-10-04' },
  { district: 'Pune', state: 'Maharashtra', sector: 'Manufacturing', occupationsReported: 22, demand: 18600, supply: 9200, gap: 9400, gapPct: 51, trainingInstitutes: 19, lastUpdated: '2026-10-10' },
  { district: 'Mumbai', state: 'Maharashtra', sector: 'IT & ITES', occupationsReported: 28, demand: 24200, supply: 16800, gap: 7400, gapPct: 31, trainingInstitutes: 34, lastUpdated: '2026-10-11' },
  { district: 'Nagpur', state: 'Maharashtra', sector: 'Automotive', occupationsReported: 12, demand: 6800, supply: 3200, gap: 3600, gapPct: 53, trainingInstitutes: 7, lastUpdated: '2026-10-07' },
  { district: 'Nashik', state: 'Maharashtra', sector: 'Manufacturing', occupationsReported: 11, demand: 5400, supply: 3600, gap: 1800, gapPct: 33, trainingInstitutes: 6, lastUpdated: '2026-10-06' },
  { district: 'Bengaluru', state: 'Karnataka', sector: 'IT & ITES', occupationsReported: 31, demand: 28500, supply: 19200, gap: 9300, gapPct: 33, trainingInstitutes: 41, lastUpdated: '2026-10-11' },
  { district: 'Mysuru', state: 'Karnataka', sector: 'Manufacturing', occupationsReported: 10, demand: 4800, supply: 3100, gap: 1700, gapPct: 35, trainingInstitutes: 6, lastUpdated: '2026-10-05' },
  { district: 'Hubballi', state: 'Karnataka', sector: 'Agriculture', occupationsReported: 8, demand: 3400, supply: 2500, gap: 900, gapPct: 26, trainingInstitutes: 4, lastUpdated: '2026-10-03' },
  { district: 'Mangaluru', state: 'Karnataka', sector: 'Logistics', occupationsReported: 9, demand: 4200, supply: 2900, gap: 1300, gapPct: 31, trainingInstitutes: 5, lastUpdated: '2026-10-04' },
  { district: 'Hyderabad', state: 'Telangana', sector: 'IT & ITES', occupationsReported: 24, demand: 21000, supply: 14800, gap: 6200, gapPct: 30, trainingInstitutes: 28, lastUpdated: '2026-10-09' },
  { district: 'Lucknow', state: 'Uttar Pradesh', sector: 'Construction', occupationsReported: 13, demand: 7600, supply: 4200, gap: 3400, gapPct: 45, trainingInstitutes: 9, lastUpdated: '2026-10-07' },
  { district: 'Jaipur', state: 'Rajasthan', sector: 'Healthcare', occupationsReported: 15, demand: 9200, supply: 5100, gap: 4100, gapPct: 45, trainingInstitutes: 11, lastUpdated: '2026-10-08' },
  { district: 'Jamshedpur', state: 'Jharkhand', sector: 'Manufacturing', occupationsReported: 10, demand: 6200, supply: 3200, gap: 3000, gapPct: 48, trainingInstitutes: 6, lastUpdated: '2026-10-06' },
  { district: 'Bhopal', state: 'Madhya Pradesh', sector: 'Healthcare', occupationsReported: 11, demand: 5800, supply: 3700, gap: 2100, gapPct: 36, trainingInstitutes: 7, lastUpdated: '2026-10-05' },
  { district: 'Kolkata', state: 'West Bengal', sector: 'Logistics', occupationsReported: 16, demand: 11200, supply: 7800, gap: 3400, gapPct: 30, trainingInstitutes: 14, lastUpdated: '2026-10-10' },
  { district: 'Chennai', state: 'Tamil Nadu', sector: 'Automotive', occupationsReported: 19, demand: 14800, supply: 10200, gap: 4600, gapPct: 31, trainingInstitutes: 17, lastUpdated: '2026-10-09' },
  { district: 'Coimbatore', state: 'Tamil Nadu', sector: 'Manufacturing', occupationsReported: 13, demand: 7400, supply: 5200, gap: 2200, gapPct: 30, trainingInstitutes: 8, lastUpdated: '2026-10-06' },
];

export const STATES = [
  'All States',
  'Bihar',
  'Maharashtra',
  'Karnataka',
  'Telangana',
  'Uttar Pradesh',
  'Rajasthan',
  'Jharkhand',
  'Madhya Pradesh',
  'West Bengal',
  'Tamil Nadu',
] as const;

export interface MonthlyTrend {
  month: string;
  demand: number;
  supply: number;
}

export const MONTHLY_TRENDS: MonthlyTrend[] = [
  { month: 'Apr', demand: 142000, supply: 89000 },
  { month: 'May', demand: 148000, supply: 93000 },
  { month: 'Jun', demand: 156000, supply: 98000 },
  { month: 'Jul', demand: 162000, supply: 104000 },
  { month: 'Aug', demand: 171000, supply: 109000 },
  { month: 'Sep', demand: 178000, supply: 115000 },
  { month: 'Oct', demand: 184000, supply: 121000 },
];

export function getMetrics(sector: Sector) {
  const filtered =
    sector === 'All Sectors'
      ? OCCUPATION_DATA
      : OCCUPATION_DATA.filter((d) => d.sector === sector);

  const totalDemand = filtered.reduce((s, d) => s + d.industryDemand, 0);
  const totalSeats = filtered.reduce((s, d) => s + d.trainingSeats, 0);
  const totalGraduates = filtered.reduce((s, d) => s + d.currentGraduates, 0);
  const occupationsAnalyzed = filtered.length;
  const criticalShortages = filtered.filter((d) => d.deficit > 8000).length;
  const oversupplyRisks = filtered.filter((d) => d.deficit < 3000).length;

  const districtsReporting =
    sector === 'All Sectors'
      ? DISTRICT_DATA.length
      : DISTRICT_DATA.filter((d) => d.sector === sector).length;

  return {
    occupationsAnalyzed,
    districtsReporting,
    criticalShortages,
    oversupplyRisks,
    totalDemand,
    totalSeats,
    totalGraduates,
    nationalGap: totalDemand - totalGraduates,
    fillRate: totalDemand > 0 ? Math.round((totalGraduates / totalDemand) * 100) : 0,
  };
}

export function getChartData(sector: Sector) {
  const filtered =
    sector === 'All Sectors'
      ? OCCUPATION_DATA
      : OCCUPATION_DATA.filter((d) => d.sector === sector);

  return filtered
    .slice()
    .sort((a, b) => b.industryDemand - a.industryDemand)
    .slice(0, 10)
    .map((d) => ({
      occupation: d.occupation,
      demand: d.industryDemand,
      capacity: d.trainingSeats,
      deficit: d.deficit,
    }));
}

export function getWatchlist(sector: Sector) {
  const filtered =
    sector === 'All Sectors'
      ? WATCHLIST
      : WATCHLIST.filter((d) => d.sector === sector);

  return filtered.slice().sort((a, b) => b.deficit - a.deficit);
}

export function getDistricts(state: string, search: string) {
  let filtered = DISTRICT_DATA;
  if (state !== 'All States') {
    filtered = filtered.filter((d) => d.state === state);
  }
  if (search.trim()) {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter(
      (d) =>
        d.district.toLowerCase().includes(q) ||
        d.state.toLowerCase().includes(q) ||
        d.sector.toLowerCase().includes(q)
    );
  }
  return filtered;
}

export function toCSV(rows: Record<string, string | number>[]): string {
  if (rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(',')];
  for (const row of rows) {
    lines.push(
      headers
        .map((h) => {
          const val = row[h];
          const str = String(val);
          return str.includes(',') ? `"${str}"` : str;
        })
        .join(',')
    );
  }
  return lines.join('\n');
}
