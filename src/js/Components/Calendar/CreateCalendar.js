import { displayRooms } from "../Rooms/DisplayRooms.js";
import { createCalendarWrapper } from "./configs/createCalendarWrapper.js";
import { addCalendarDescription } from "./configs/addCalendarDescription.js";
import { addApplyButton } from "./configs/addApplyButton.js";
import { clearDisabledDates } from "./configs/clearDisabledDates.js";
import { onDayCreate } from "./configs/onDayCreate.js";

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
      onDayCreate(dayElem, enable_dates_obj);
    },
    onOpen: (selectedDates, dateStr, instance) => {
      createCalendarWrapper(instance);

      addCalendarDescription(
        instance,
        "Prices are average prices per 2 persons per day."
      );

      addApplyButton(instance, displayRooms);

      clearDisabledDates(instance);
    },

    onClose: () => document.getElementById("calendar-wrapper")?.remove(),
  };

  const calendar = flatpickr("#calendar", config);
  calendar.open();
}
