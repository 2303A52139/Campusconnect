export function trackEvent(name, data = {}) {
  if (import.meta.env.DEV) {
    console.log("[analytics]", name, data);
  }
}