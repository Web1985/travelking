import { onCalendarOpen } from "./onCalendarOpen.js";
import { onDayCreate } from "./onDayCreate.js";

/**
 * Create a calendar with available dates.
 * @param {Object} data - Data containing hotel availabilities.
 */
export function createCalendar(data) {
  const enable_dates = data._embedded.hotel_availabilities.map(
    (item) => item.date
  );
  const enable_dates_obj = Object.fromEntries(
    data._embedded.hotel_availabilities.map((item) => [item.date, item])
  );

  const showMonthsVar = window.innerWidth > 800 ? 2 : 1;

  const config = {
    dateFormat: "Y-m-d",
    closeOnSelect: false,
    minDate: "today",
    maxDate: new Date().fp_incr(188),
    mode: "range",
    showMonths: showMonthsVar,
    enable: enable_dates,
    onDayCreate: (dObj, dStr, fp, dayElem) => {
      onDayCreate(dayElem,enable_dates_obj);
    },
    onOpen: (selectedDates, dateStr, instance) => {
      onCalendarOpen(instance);
    },

    onClose: () => document.getElementById("calendar-wrapper")?.remove(),
  };

  const calendar = flatpickr("#calendar", config);
  calendar.open();
}
