import { quoteeUrl } from "../../utils/urls.js";
import { roomCard } from "./RoomCard.js";
import { removeSuspenseState } from "../../utils/removeSuspenseState.js";

/**
 * Fetch available rooms from API for the selected dates.
 * @param {string} start_date - The start date of the booking period.
 * @param {string} end_date - The end date of the booking period.
 * @returns {Promise<Array|void>} List of available hotel quotes or undefined in case of an error.
 */
export async function getRooms(start_date, end_date) {
  const url = quoteeUrl(start_date, end_date);
  const sectionRooms = document.getElementById("section--rooms");
  const message = document.getElementById("section--message");

  // Display loading state
  sectionRooms.innerHTML = roomCard();
  const roomCards = document.querySelectorAll(".room-card");

  try {
    message.innerHTML = "";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { _embedded: { hotel_quotes } = {} } = await response.json();
    return hotel_quotes || [];
  } catch (error) {
    console.error("Error fetching rooms:", error);
  } finally {
    removeSuspenseState(roomCards);
  }
}
