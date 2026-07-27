export interface MetaculusQuestion {
  id: number;               // Metaculus question ID (for the link)
  title: string;
  medianDate: string;       // ISO date string, e.g. "2031-06-15"
  category?: string;
}