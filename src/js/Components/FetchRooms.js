import { quoteeUrl } from './urls.js';
import { roomCard } from './RoomCard.js';
/*
 ** Get Available Rooms from API for the selected dates
 */
 export async function fetchRooms(start_date, end_date) {
    const url = quoteeUrl(start_date, end_date);
    const section_rooms = document.getElementById("section--rooms");
    section_rooms.innerHTML = roomCard();
    const message = document.getElementById("section--message");
    const room_card = document.querySelectorAll(".room-card");

    try {
      message.innerHTML = "";

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const hotels = await response.json();

      return hotels._embedded.hotel_quotes;
    } catch (error) {
      const section_rooms = document.getElementById("section--rooms");
      section_rooms.innerHTML = null;

      message.innerHTML = `<div class="error-message">
      There are no rooms available for the selected period. Please try another dates.</div>`;

      console.log("Error: " + error);
    } finally {
      room_card.forEach((element) => {
        element.classList.remove("suspense-block");
      });
    }
  }