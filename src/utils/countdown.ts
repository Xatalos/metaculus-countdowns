export function getTimeLeft(targetDate: string) {
  const now = Date.now();
  const target = new Date(targetDate).getTime();
  const diff = target - now;

  if (diff <= 0) {
    return {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: true,
    };
  }

  const msYear = 1000 * 60 * 60 * 24 * 365.25;
  const msMonth = 1000 * 60 * 60 * 24 * 30.44;
  const msDay = 1000 * 60 * 60 * 24;
  const msHour = 1000 * 60 * 60;
  const msMinute = 1000 * 60;

  const years = Math.floor(diff / msYear);
  const months = Math.floor((diff % msYear) / msMonth);
  const days = Math.floor((diff % msMonth) / msDay);
  const hours = Math.floor((diff % msDay) / msHour);
  const minutes = Math.floor((diff % msHour) / msMinute);
  const seconds = Math.floor((diff % msMinute) / 1000);

  return { years, months, days, hours, minutes, seconds, isPast: false };
}