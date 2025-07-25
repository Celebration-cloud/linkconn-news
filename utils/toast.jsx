import { addToast } from "@heroui/react";

/**
 * Show a toast notification.
 *
 * @param {Object} options
 * @param {string} options.title - The title of the toast.
 * @param {string} [options.description] - Additional description text.
 * @param {"success" | "danger" | "warning" | "info"} [options.color="info"] - The color type of the toast.
 * @param {number} [options.duration=4000] - How long the toast should stay visible (ms).
 */
export function showToast({
  title,
  description = "",
  color = "info",
  duration = 4000,
}) {
  addToast({
    title,
    description,
    color,
    duration,
  });
}
