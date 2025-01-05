/**
 * Fetches data from the given URL and handles loading state for the target element.
 * @param {string} url - The API endpoint to fetch data from.
 * @param {HTMLElement} target - The target element whose inner text reflects the loading state.
 * @returns {Promise<Object|null>} The fetched data in JSON format, or null in case of an error.
 */
export async function fetchDates(url, target) {
  if (!target || !(target instanceof HTMLElement)) {
    console.error("Invalid target element provided.");
    return null;
  }

  const originalText = target.innerText;
  target.innerText = "Loading...";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  } finally {
    target.innerText = originalText;
  }
}
