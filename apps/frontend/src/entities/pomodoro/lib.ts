export const parseToSeconds = (time: { hours?: number; minutes: number; seconds: number }) => {
  const hours = time.hours ?? 0

  return hours * 3600 + time.minutes * 60 + time.seconds
}
