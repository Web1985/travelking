import { CHECKINS_URL } from './Components/urls.js';
import '../scss/style.scss';
import { fetchDates } from './Components/FetchDates.js';
import { precessDates } from './Components/ProcessDates.js';

/*
 ** Create Calendar
 */
async function createCalendar(url, target) {
  const data = await fetchDates(url, target);
  precessDates(data);
}

/*
 ** onClick event for the "Check Availabilities" button
 */
let btn = document.getElementById("check-availabilities--btn");
btn.onclick = (event) => createCalendar(CHECKINS_URL, event.target);
