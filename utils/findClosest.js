export default function findClosest(x, numbers) {
  return numbers.reduce((prev, current) => {
    return Math.abs(current - x) < Math.abs(prev - x) ? current : prev;
  });
}
