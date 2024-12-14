'use strict';

const URL = "https://api.travelcircus.net/hotels/15823/";

const CHECKINS_URL = `${URL}checkins?E&party=%7B%22adults%22:2,%22childre
n%22:%5B%5D%7D&domain=de&date_start=2025-01-01&date_end=2025-06-31`;

let start_date = "2025-01-22";
let end_date = "2025-01-27";

let quotes_url = `${URL}quotes?locale=de_DE&checkin=${start_date}
&checkout=${end_date}&party=%7B%22adults%22:2,%22children%22:%5B%5D%7D&domain=de`;

async function fetchDates(url, target) {
  const btn_text = target.innerText;
  target.innerText = "loading...";

  try {

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();

  } catch (error) {

    console.log("Error: " + error);

  } finally {

    target.innerText = btn_text;

  }
}

function precessDates(data) {
  console.log(data);

  let enable_dates = [];
  var enable_dates_obj = {};
  let i = 0;

  for (let item of data._embedded.hotel_availabilities) {
    enable_dates[i] = item.date;
    enable_dates_obj[item.date] = item;
    i++;
  }


  const config = {
    altInput: true,
    altFormat: "Y-m-d",
    dateFormat: "Y-m-d",
    mode: "range",
    showMonths: 2,
    minDate: "today",
    enable: enable_dates,
    onDayCreate: function (dObj, dStr, fp, dayElem) {
      const date = new Date(dayElem.dateObj);
      const formattedDate = date.toISOString().split("T")[0];

      if (enable_dates_obj[formattedDate]) {
        dayElem.innerHTML =
          `<button class='day--btn'><span class='day-number'>${dayElem.innerHTML}</span>
          <span class='event'>${enable_dates_obj[formattedDate].price}</span></button>`;
      }
    },
  };

  let calendar = flatpickr("#calendar", config);
  calendar.open();
}

async function createCalendar(url, target) {
  const data = await fetchDates(url, target);
  precessDates(data);
}

async function fetchRooms(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const hotels = await response.json();

    console.log(hotels);
  } catch (error) {

    console.log("Error: " + error);

  }
}

let btn = document.getElementById("check-availabilities--btn");
btn.onclick = (event) => createCalendar(CHECKINS_URL, event.target);

let btn_rooms = document.getElementById("check-rooms--btn");
btn_rooms.onclick = () => fetchRooms(quotes_url);

console.log("End");
