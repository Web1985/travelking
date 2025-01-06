import { getRooms } from "./GetRooms.js";
import { roomCard } from "./RoomCard.js";
import { handleError } from "../../utils/handleError.js";

/**
 * Displays rooms on the page based on the fetched data.
 * @param {string} start_date - The start date for fetching rooms.
 * @param {string} end_date - The end date for fetching rooms.
 */
export async function displayRooms(start_date, end_date) {
  const section_rooms = document.getElementById("section--rooms");
  const message = document.getElementById("section--message");
  try {
    const rooms = await getRooms(start_date, end_date);
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
