export const getProgressPercent = (event) => {
  const now = Date.now();
  const eventTimeMs = new Date(`${event.date}T${event.time}`).getTime();
  const createdAtMs = event.id;

  const totalMs = Math.max(1, eventTimeMs - createdAtMs);
  const elapsedMs = now - createdAtMs;

  const percent = 100 - (elapsedMs / totalMs) * 100;
  return Math.max(0, Math.min(100, percent));
};
