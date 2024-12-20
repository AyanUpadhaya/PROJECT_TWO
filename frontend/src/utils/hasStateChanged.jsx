export function hasStateChanged(original, updated) {
  // Check all keys in the original object
  for (const key in original) {
    if (Object.prototype.hasOwnProperty.call(original, key)) {
      const originalValue = original[key];
      const updatedValue = updated[key];

      // Compare arrays
      if (Array.isArray(originalValue) && Array.isArray(updatedValue)) {
        if (originalValue.join(",") !== updatedValue.join(",")) {
          return true;
        }
      }
      // Compare objects (deep comparison)
      else if (
        typeof originalValue === "object" &&
        originalValue !== null &&
        typeof updatedValue === "object" &&
        updatedValue !== null
      ) {
        if (hasStateChanged(originalValue, updatedValue)) {
          return true;
        }
      }
      // Compare primitive values
      else if (originalValue !== updatedValue) {
        return true;
      }
    }
  }

  // Check for additional keys in the updated object not in the original
  for (const key in updated) {
    if (!Object.prototype.hasOwnProperty.call(original, key)) {
      return true;
    }
  }

  return false; // No changes detected
}
