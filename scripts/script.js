"use strict";

const URL = "https://api.travelcircus.net/hotels/15823/";

const CHECKINS_URL = `${URL}checkins?E&party=%7B%22adults%22:2,%22childre
n%22:%5B%5D%7D&domain=de&date_start=2025-01-01&date_end=2025-06-31`;

function quoteeUrl(start_date, end_date) {
  return `${URL}quotes?locale=de_DE&checkin=${start_date}
&checkout=${end_date}&party=%7B%22adults%22:2,%22children%22:%5B%5D%7D&domain=de`;
}

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
    closeOnSelect: false,
    mode: "range",
    showMonths: 2,
    minDate: "today",
    enable: enable_dates,
    onDayCreate: function (dObj, dStr, fp, dayElem) {
      const date = new Date(dayElem.dateObj);
      const formattedDate = date.toISOString().split("T")[0];

      if (enable_dates_obj[formattedDate]) {
        dayElem.innerHTML = `<button class='day--btn'><span class='day-number'>${dayElem.innerHTML}</span>
          <span class='day-price'>${enable_dates_obj[formattedDate].price}</span></button>`;
      }
    },
    onClose: function(selectedDates, dateStr, instance){

        const calendar_wrapper = document.getElementById('calendar-wrapper');
        calendar_wrapper.remove();
    },
    onOpen: (selectedDates, dateStr, instance) => {
        const calendar_container = instance.calendarContainer;

        // Create a new wrapper element
        const wrapper = document.createElement('div');
        wrapper.id = 'calendar-wrapper'; // Optional: Add a class to the wrapper

        // Insert the wrapper into the DOM before the target
        calendar_container.parentNode.insertBefore(wrapper, calendar_container);

        // Move the target inside the wrapper
        wrapper.appendChild(calendar_container);
    },
    onReady: (selectedDates, dateStr, instance) => {
      const apply_button = document.createElement("button");
      apply_button.textContent = "Apply";
      apply_button.className = "apply-button btn";

      const calendar_container = instance.calendarContainer;
      calendar_container.appendChild(apply_button);

      apply_button.addEventListener("click", () => {
        instance.close();

        let input_dates = instance.input.value;
        let start_date = input_dates.split(" to ")[0];
        let end_date = input_dates.split(" to ")[1];
        displayRooms(start_date, end_date);
      });
    },
  };

  let calendar = flatpickr("#calendar", config);
  calendar.open();
}

async function createCalendar(url, target) {
  const data = await fetchDates(url, target);
  precessDates(data);
}

async function fetchRooms(start_date, end_date) {
  const url = quoteeUrl(start_date, end_date);
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const hotels = await response.json();

    return hotels._embedded.hotel_quotes;
  } catch (error) {
    console.log("Error: " + error);
  }
}

function precessRooms(rooms) {
   console.log(rooms);

   for (let room of rooms) {
    console.log(room.name);
    console.log(room.description);
    console.log(room.full_formatted_price);
    console.log(room.full_price);
    console.log(room.room_size_max);
    console.log(room.fullPriceBreakdown.nights);
    console.log(room._embedded.amenities);
    console.log(room._embedded.pictures[0].offer_teaser_ncol);
    let room_card = roomCard(room);
    const section_rooms = document.getElementById('section--rooms');
    section_rooms.innerHTML += room_card;


   }

}

function roomCard(room) {
    //offer_teaser_desktop
    //offer_teaser_ncol
    return (
        `<article class="room-card">
            <div class="room-card--left">
                <img src="${room._embedded.pictures[0].offer_teaser_desktop}" alt="${room._embedded.pictures[0].description}" loading="lazy" />
            </div>
            <div class="room-card--right">
                <header>
                    <h2>${room.description}</h2>
                </header>

                <div class="room-card--body">
                <div class="room-card--body--price">
                    <span class="room-card--body--price--number">${room.full_formatted_price}</span>
                    <span class="room-card--body--price--nights">
                    for ${room.fullPriceBreakdown.nights} nights
                    </span>
                </div>

                </div>
                <footer>
                </footer>
            </div>
        </article>`
    );
}

async function displayRooms(start_date, end_date) {
  const hotels = await fetchRooms(start_date, end_date);
  precessRooms(hotels);
}

let btn = document.getElementById("check-availabilities--btn");
btn.onclick = (event) => createCalendar(CHECKINS_URL, event.target);

console.log("End");
