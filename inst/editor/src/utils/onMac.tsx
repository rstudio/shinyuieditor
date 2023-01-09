export function onMac(): boolean {
  return /mac/i.test(window.navigator.platform);
}
