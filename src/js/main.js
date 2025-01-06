import { CHECKINS_URL } from './utils/urls.js';
import { getDates } from './Components/Calendar/GetDates.js';
import { createCalendar } from './Components/Calendar/CreateCalendar.js';

import '../scss/style.scss';

/*
 ** Open Calendar
 */
async function openCalendar(url, target) {
  const data = await getDates(url, target);
  createCalendar(data);
}

/*
 ** onClick event for the "Check Availabilities" button
 */
let btn = document.getElementById("check-availabilities--btn");
btn.onclick = (event) => openCalendar(CHECKINS_URL, event.target);
