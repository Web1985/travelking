import { displayRooms } from "./DisplayRooms.js";
/*
 ** Put Available Dates to the Calendar
 */
export function createCalendar(data) {
  let enable_dates = [];
  let enable_dates_obj = {};
  let i = 0;
  for (let item of data._embedded.hotel_availabilities) {
    enable_dates[i] = item.date;
    enable_dates_obj[item.date] = item;
    i++;
  }
  console.log(data);

  let showMonthsVar = window.innerWidth > 800 ? 2 : 1;

  const config = {
    dateFormat: "Y-m-d",
    closeOnSelect: false,
    minDate: "today",
    maxDate: new Date().fp_incr(188),
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
          <span class='day-available price-position--${enable_dates_obj[formattedDate].price_position}'>
          <span class='day-number'>${day}</span>
            <span
               class='day-price '>
             ${enable_dates_obj[formattedDate].price} €
            </span>`;
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
