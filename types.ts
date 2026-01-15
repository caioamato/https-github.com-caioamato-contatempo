
export interface DayStats {
  total: number;
  weekdays: number;
  weekends: number;
}

export type SelectedDates = Set<string>; // Format: YYYY-MM-DD
