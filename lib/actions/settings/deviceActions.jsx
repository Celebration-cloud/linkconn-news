/**
 * Generic fetcher with JSON handling and error throwing
 * @param {string} url - API endpoint
 * @param {RequestInit} options - fetch options
 * @returns {Promise<any>} - JSON response
 */
async function fetcher(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  let data;
  try {
    data = await res.json();
  } catch (e) {
    throw new Error("Invalid JSON response", e);
  }

  if (!res.ok) throw new Error(data.error || "API Error");
  return data;
}

/**
 * Fetch all sessions of current user
 */
export async function getMyDevices() {
  return fetcher("/api/admin/settings/device/sessions", {
    method: "GET",
  });
}

/**
 * Logout a specific device/session
 * @param {string} sessionId
 */
export async function logoutDevice(sessionId) {
  return fetcher(`/api/admin/settings/device/sessions/${sessionId}`, {
    method: "DELETE",
  });
}

/**
 * Logout from all other devices (except current)
 */
export async function logoutAllDevices() {
  return fetcher("/api/admin/settings/device/sessions", {
    method: "DELETE",
    body: JSON.stringify({ all: true }),
  });
}
