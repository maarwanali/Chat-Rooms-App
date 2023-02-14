export default function createRondomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
