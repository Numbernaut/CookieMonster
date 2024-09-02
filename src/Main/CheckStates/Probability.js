/**
 * The probability that a GC or reindeer has NOT spawned
 */
let chanceTotal = 1.0;
let chanceTotalDeer = 1.0;

export function resetChanceTotal() {
  chanceTotal = 1.0;
}

export function resetChanceTotalDeer() {
  chanceTotalDeer = 1.0;
}

export function getChanceTotal() {
  return chanceTotal;
}

export function getChanceTotalDeer() {
  return chanceTotalDeer;
}
/**
 * Update the probability that a cookie has not spawned
 * @param {number} chanceToSpawn The probablity that a GC appears
 */
export function updateChanceTotal(chanceToSpawn) {
  chanceTotal *= 1 - chanceToSpawn;
}

/**
 * Update the probability that a reindeer has not spawned
 * @param {number} chanceToSpawn The probablity that a reindeer appears
 */
export function updateChanceTotalDeer(chanceToSpawn) {
  chanceTotalDeer *= 1 - chanceToSpawn;
}
/**
 *
 * @returns the cummulative probability that a GC has appeared from beginning to now
 */
export function getChanceFinal() {
  return 1 - chanceTotal;
}
/**
 *
 * @returns the cummulative probability that a reindeer has appeared from beginning to now
 */
export function getChanceFinalDeer() {
  return 1 - chanceTotalDeer;
}
