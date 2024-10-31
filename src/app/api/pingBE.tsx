export async function pingBE() {
  try {
    // Simple GET requests to both backends
    await Promise.all([
      fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/cron/ping'),
      fetch(process.env.NEXT_PUBLIC_FLASK_AVA_BASE_URL + '/cron'),
    ]);
  } catch (error) {
    // Silently fail - we don't want to affect the user experience
    console.log('Ping failed');
  }
}
