import { fetchRooms } from "./FetchRooms.js";
import { roomCard } from "./RoomCard.js";

/**
 * Displays rooms on the page based on the fetched data.
 * @param {string} start_date - The start date for fetching rooms.
 * @param {string} end_date - The end date for fetching rooms.
 */
export async function displayRooms(start_date, end_date) {
  const section_rooms = document.getElementById("section--rooms");
  const message = document.getElementById("section--message");
  try {
    const rooms = await fetchRooms(start_date, end_date);
    section_rooms.innerHTML = null;
    if (!rooms) {
      throw new Error("there are no any available rooms");
    } else {
      rooms.map((room, index) => {
        let room_card = roomCard(room, index);
        section_rooms.innerHTML += room_card;
      });
    }
  } catch (error) {
    handleError(section_rooms, message, error);
  }
}

/**
 * Handle errors by updating the DOM and logging the error.
 * @param {HTMLElement} sectionRooms - The section for displaying room cards.
 * @param {HTMLElement} message - The element for displaying error messages.
 * @param {Error} error - The caught error.
 */
function handleError(sectionRooms, message, error) {
  sectionRooms.innerHTML = ""; // Clear the room section
  message.innerHTML = `
    <div class="error-message">
      There are no rooms available for the selected period. Please try other dates.
    </div>`;
  console.error("Error fetching rooms:", error);
}
