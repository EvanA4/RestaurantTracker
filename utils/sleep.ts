function secretSleep(ms: number) {
  return new Promise<void>((res) => {
    setTimeout(() => res(), ms);
  });
}

export async function sleep(ms: number) {
  await secretSleep(ms);
}
