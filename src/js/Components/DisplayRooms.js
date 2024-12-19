import { fetchRooms } from './FetchRooms.js';
import { roomCard } from './RoomCard.js';

/*
 ** Display Rooms
 */
 export async function displayRooms(start_date, end_date) {
    const rooms = await fetchRooms(start_date, end_date);
    const section_rooms = document.getElementById("section--rooms");
    section_rooms.innerHTML = null;
    if (rooms) {
      rooms.map((room, index) => {
        let room_card = roomCard(room, index);
        section_rooms.innerHTML += room_card;
      });
    }
  }