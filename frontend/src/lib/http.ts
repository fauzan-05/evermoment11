export async function safeJson<T = unknown>(
  response: Response,
  fallback: T
): Promise<T> {
  const text = await response.text();

  if (!text.trim()) {
    return fallback;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    return fallback;
  }
}
