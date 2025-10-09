"use client";
import { FilterService } from "primereact/api";

/**
 * Registers custom filter rules for date ranges and number ranges.
 * Should be called once in your main component (useEffect).
 */
export function setupFilterService() {
  // Date range filter
  FilterService.register("custom_$createdAt", (rowValue, filterValue) => {
    const [from, to] = filterValue ?? [null, null];
    if (!from && !to) return true;

    const rowDate = rowValue ? new Date(rowValue) : null;
    if (!rowDate) return false;

    if (from && !to) return rowDate >= new Date(from);
    if (!from && to) return rowDate <= new Date(to);
    return rowDate >= new Date(from) && rowDate <= new Date(to);
  });

  // Generic number range filter
  const numberRangeFilter = (rowValue, filterValue) => {
    const [min, max] = filterValue ?? [null, null];
    if (min == null && max == null) return true;

    const v = rowValue != null ? Number(rowValue) : 0;
    if (min != null && max == null) return v >= Number(min);
    if (min == null && max != null) return v <= Number(max);
    return v >= Number(min) && v <= Number(max);
  };

  FilterService.register("custom_impressions", numberRangeFilter);
  FilterService.register("custom_clicks", numberRangeFilter);
  FilterService.register("custom_shares", numberRangeFilter);
}
