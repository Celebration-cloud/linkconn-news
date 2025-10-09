// lib/actions/settings/control-panel.js


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
 * Invite a new user (email + role)
 * @param {Object} payload
 * @param {string} payload.email
 * @param {string} payload.role
 */
export async function inviteUser({ email, role }) {
  return fetcher("/api/admin/settings/control-panel", {
    method: "POST",
    body: JSON.stringify({ email, role }),
  });
}

/**
 * Fetch all invited users
 * @returns {Promise<Array>}
 */
export async function fetchInvitedUsers() {
  return fetcher("/api/admin/settings/control-panel", {
    method: "GET",
  });
}

/**
 * Update role of an invited user
 * @param {string} targetUserId
 * @param {string} role
 */
export async function updateUserRole(targetUserId, role) {
  return fetcher("/api/admin/settings/control-panel", {
    method: "PATCH",
    body: JSON.stringify({ targetUserId, role }),
  });
}

/**
 * Delete/remove an invited user
 * @param {string} userId
 */
export async function deleteInvitedUser(userId) {
  return fetcher("/api/admin/settings/control-panel", {
    method: "DELETE",
    body: JSON.stringify({ targetUserId: userId }),
  });
}

/**
 * Ban a user
 * @param {string} targetUserId
 */
export async function banUser(targetUserId) {
  return fetcher("/api/admin/settings/control-panel/ban_unban-user", {
    method: "PUT",
    body: JSON.stringify({ targetUserId, action: "ban" }),
  });
}

/**
 * Unban a user
 * @param {string} targetUserId
 */
export async function unbanUser(targetUserId) {
  return fetcher("/api/admin/settings/control-panel/ban_unban-user", {
    method: "PUT",
    body: JSON.stringify({ targetUserId, action: "unban" }),
  });
}
