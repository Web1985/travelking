import { createElementWithClass } from "../../../utils/createElementWithClass";

export function createCalendarWrapper(instance){

    const calendar_container = instance.calendarContainer;
    const wrapper = createElementWithClass("div", "calendar-wrapper", {
      id: "calendar-wrapper",
    });
    calendar_container.parentNode.insertBefore(wrapper, calendar_container);
    wrapper.appendChild(calendar_container);
}