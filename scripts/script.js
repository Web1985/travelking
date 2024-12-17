"use strict";

const URL = "https://api.travelcircus.net/hotels/17080/";

const CHECKINS_URL = `${URL}checkins?E&party=%7B%22adults%22:2,%22childre
n%22:%5B%5D%7D&domain=de&date_start=2025-01-01&date_end=2025-06-31`;

function quoteeUrl(start_date, end_date) {
  return `${URL}quotes?locale=de_DE&checkin=${start_date}
&checkout=${end_date}&party=%7B"adults":2,"children":[]%7D&domain=de`;
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
  let enable_dates_obj = {};
  let i = 0;
  for (let item of data._embedded.hotel_availabilities) {
    enable_dates[i] = item.date;
    enable_dates_obj[item.date] = item;
    i++;
  }

  let showMonthsVar = window.innerWidt > 800 ? 2 : 1;

  const config = {
    altFormat: "Y-m-d",
    dateFormat: "Y-m-d",
    closeOnSelect: false,
    mode: "range",
    position: 'auto center',
    showMonths: showMonthsVar,
    enable: enable_dates,
    onDayCreate: function (dObj, dStr, fp, dayElem) {
      const formattedDate = new Intl.DateTimeFormat("en-CA").format(
        dayElem.dateObj
      );

      if (enable_dates_obj[formattedDate]) {
        let day = dayElem.innerHTML;
        dayElem.innerHTML = `
        <span class='day-number'>${day}</span>
          <span class='day-price'>${enable_dates_obj[formattedDate].price}</span>
          `;
      }
    },
    onClose: function (selectedDates, dateStr, instance) {
      const calendar_wrapper = document.getElementById("calendar-wrapper");
      calendar_wrapper.remove();
    },
    onOpen: (selectedDates, dateStr, instance) => {
      const calendar_container = instance.calendarContainer;
      const wrapper = document.createElement("div");
      wrapper.id = "calendar-wrapper"; // Optional: Add a class to the wrapper
      calendar_container.parentNode.insertBefore(wrapper, calendar_container);
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
  const section_rooms = document.getElementById("section--rooms");
  section_rooms.innerHTML = sceletonTemplate();
  const message = document.getElementById("section--message");
  const section_rooms_1 = document.getElementById("section--rooms--1");

  try {
    message.innerHTML = "";

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const hotels = await response.json();

    return hotels._embedded.hotel_quotes;
  } catch (error) {
    section_rooms_1.classList.add("display-none");

    message.innerHTML = `<div class="error-message">
    There are no rooms available for the selected period. Please try another dates.</div>`;

    console.log("Error: " + error);
  } finally {
    section_rooms_1.classList.remove("suspense-block");
  }
}

function precessRooms(rooms) {
  rooms.map((room, index) => {
    let room_card = roomCard(room, index);
    if (index > 0) {
      const section_rooms = document.getElementById("section--rooms");
      section_rooms.innerHTML += room_card;
    }
  });
}

function roomCard(room, index) {
  let amenitie = "";
  if (room._embedded.amenities) {
    amenitie = room._embedded.amenities.reduce((amenities, item) => {
      return amenities + `<div>${item.description}</div>`;
    }, "");
  }

  if (index === 0) {
    const first_room_box = document.getElementById("section--rooms--1");
    first_room_box.classList.remove("suspense-block");
    first_room_box.getElementsByClassName("room-card--left")[0].innerHTML = `
        <img
            src="${room._embedded.pictures[0].offer_teaser_ncol}"
            alt="${room._embedded.pictures[0].description}"
            loading="lazy"
        />
    `;
    first_room_box.getElementsByClassName("room-card--header")[0].innerText =
      room.description;
    first_room_box.getElementsByClassName(
      "room-card--body--amenities"
    )[0].innerHTML = amenitie;
    first_room_box.getElementsByClassName(
      "room-card--body--price--number"
    )[0].innerText = room.full_formatted_price;
    first_room_box.getElementsByClassName(
      "room-card--body--price--nights"
    )[0].innerText = `for ${room.fullPriceBreakdown.nights} nights`;
    first_room_box.getElementsByClassName(
      "room-card--body--price--number"
    )[0].innerText = room.full_formatted_price;
  } else {
    return `<article class="room-card">
                <div class="room-card--left">
                    <img src="${room._embedded.pictures[0].offer_teaser_ncol}"
                    alt="${room._embedded.pictures[0].description}" loading="lazy" />
                </div>
                <div class="room-card--right">
                    <div class="room-card--body">
                        <h2 class="room-card--header">${room.description}</h2>
                        <div class="room-card--body--amenities">
                        ${amenitie}
                        </div>
                    </div>
                    <div class="room-card--body--price">
                        <span class="room-card--body--price--number">${room.full_formatted_price}</span>
                        <span class="room-card--body--price--nights">
                        for ${room.fullPriceBreakdown.nights} nights
                        </span>
                    </div>
                </div>
            </article>`;
  }
}

async function displayRooms(start_date, end_date) {
  const hotels = await fetchRooms(start_date, end_date);
  if (hotels) {
    precessRooms(hotels);
  }
}

let btn = document.getElementById("check-availabilities--btn");
btn.onclick = (event) => createCalendar(CHECKINS_URL, event.target);

/*
** Template for Rooms article with suspense block
*/
function sceletonTemplate() {
  return `
    <div id="section--rooms--1" class="room-card suspense-block">
        <div class="room-card--left"></div>
        <div class="room-card--right">
            <div class="room-card--body">
                <h2 class="room-card--header"></h2>
                <div class="room-card--body--amenities suspense-line"></div>
            </div>
            <div class="room-card--body--price">
                <div class="room-card--body--price--number suspense-line"></div>
                 <div class="room-card--body--price--nights suspense-line"></div>
            </div>
        </div>
    </div>`;
}
