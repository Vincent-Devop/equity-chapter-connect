// Semester logic: Sem 1 = Jan-Apr, Sem 2 = Sep-Dec
export type Semester = { name: string; year: number; startsAt: Date; endsAt: Date; active: boolean };

export function currentSemester(now = new Date()): Semester {
  const y = now.getFullYear();
  const m = now.getMonth(); // 0-indexed
  if (m >= 0 && m <= 3) {
    return { name: "Semester 1", year: y, startsAt: new Date(y, 0, 1), endsAt: new Date(y, 3, 30), active: true };
  }
  if (m >= 8 && m <= 11) {
    return { name: "Semester 2", year: y, startsAt: new Date(y, 8, 1), endsAt: new Date(y, 11, 31), active: true };
  }
  // Off-semester (May–Aug)
  return { name: "Off-Semester Break", year: y, startsAt: new Date(y, 4, 1), endsAt: new Date(y, 7, 31), active: false };
}

export function membershipFee() { return 200; }
