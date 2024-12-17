"use strict";

const URL = "https://api.travelcircus.net/hotels/17080/";

const CHECKINS_URL = `${URL}checkins?E&party=%7B%22adults%22:2,%22childre
n%22:%5B%5D%7D&domain=de&date_start=2025-01-01&date_end=2025-06-31`;

function quoteeUrl(start_date, end_date) {
  return `${URL}quotes?locale=de_DE&checkin=${start_date}
&checkout=${end_date}&party=%7B"adults":2,"children":[]%7D&domain=de`;
}

/*
 ** Get Available dates from API
 */
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

/*
 ** Put Available Dates to the Calendar
 */
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
    dateFormat: "Y-m-d",
    closeOnSelect: false,
    mode: "range",
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

    onOpen: (selectedDates, dateStr, instance) => {
      const calendar_container = instance.calendarContainer;
      const wrapper = document.createElement("div");
      wrapper.id = "calendar-wrapper";
      calendar_container.parentNode.insertBefore(wrapper, calendar_container);
      wrapper.appendChild(calendar_container);
      const apply_button = document.createElement("button");
      apply_button.textContent = "Apply";
      apply_button.className = "apply-button btn";
      calendar_container.appendChild(apply_button);

      apply_button.addEventListener("click", () => {
        instance.close();

        let input_dates = instance.input.value;
        let start_date = input_dates.split(" to ")[0];
        let end_date = input_dates.split(" to ")[1];
        displayRooms(start_date, end_date);
      });
    },
    onClose: function (selectedDates, dateStr, instance) {
      const calendar_wrapper = document.getElementById("calendar-wrapper");
      calendar_wrapper.remove();
    },
  };

  let calendar = flatpickr("#calendar", config);
  calendar.open();
}

/*
 ** Create Calendar
 */
async function createCalendar(url, target) {
  const data = await fetchDates(url, target);
  precessDates(data);
}

/*
 ** Get Available Rooms from API for the selected dates
 */
async function fetchRooms(start_date, end_date) {
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

/*
 ** Display Rooms
 */
async function displayRooms(start_date, end_date) {
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

/*
 ** Template for Rooms article with suspense effect
 */
function roomCard(room, index = 0) {
  let suspens_block_classname = "suspense-block";
  let suspens_line_classname = "suspense-line";
  let description = "";
  let img = "";
  let amenitie = "";
  let price = "";
  let nights = "";

  if (room) {
    suspens_block_classname = "";
    suspens_line_classname = "";
    description = room.description;
    price = room.full_formatted_price;
    nights = room.fullPriceBreakdown.nights;

    img = `<img src="${room._embedded.pictures[0].offer_teaser_ncol}"
     alt="${room._embedded.pictures[0].description}" loading="lazy" />`;

    if (room._embedded.amenities) {
      amenitie = room._embedded.amenities.reduce((amenities, item) => {
        return amenities + `<div>${item.description}</div>`;
      }, "");
    }
  }

  return `
    <article id="section--rooms--${index}" class="room-card ${suspens_block_classname}">
                <div class="room-card--left">
                    ${img}
                </div>
                <div class="room-card--right">
                    <div class="room-card--body">
                        <h2 class="room-card--header">${description}</h2>
                        <div class="room-card--body--amenities ${suspens_line_classname}">
                        ${amenitie}
                        </div>
                    </div>
                    <div class="room-card--body--price">
                        <span class="room-card--body--price--number ${suspens_line_classname}">
                          ${price}
                        </span>
                        <span class="room-card--body--price--nights ${suspens_line_classname}">
                          for ${nights} nights
                        </span>
                    </div>
                </div>
            </article>`;
}

/*
 ** onClick event for the "Check Availabilities" button
 */
let btn = document.getElementById("check-availabilities--btn");
btn.onclick = (event) => createCalendar(CHECKINS_URL, event.target);
