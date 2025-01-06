/**
 * Handle errors by updating the DOM and logging the error.
 * @param {HTMLElement} sectionRooms - The section for displaying room cards.
 * @param {HTMLElement} message - The element for displaying error messages.
 * @param {Error} error - The caught error.
 */
export function handleError(sectionRooms, message, error) {
    sectionRooms.innerHTML = ""; // Clear the room section
    message.innerHTML = `
      <div class="error-message">
        There are no rooms available for the selected period. Please try other dates.
      </div>`;
    console.error("Error fetching rooms:", error);
  }