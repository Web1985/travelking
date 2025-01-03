import { CHECKINS_URL } from './Components/urls.js';
import '../scss/style.scss';
import { fetchDates } from './Components/FetchDates.js';
import { createCalendar } from './Components/CreateCalendar.js';

/*
 ** Open Calendar
 */
async function openCalendar(url, target) {
  const data = await fetchDates(url, target);
  createCalendar(data);
}

/*
 ** onClick event for the "Check Availabilities" button
 */
let btn = document.getElementById("check-availabilities--btn");
btn.onclick = (event) => openCalendar(CHECKINS_URL, event.target);
