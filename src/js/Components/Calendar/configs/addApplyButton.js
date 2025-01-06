import { createElementWithClass } from "../../../utils/createElementWithClass";
export function addApplyButton(instance, displayRooms){
    const calendar_container = instance.calendarContainer;

    const apply_button = createElementWithClass("button", "apply-button btn", {
      textContent: "Apply",
    });
    calendar_container.appendChild(apply_button);

    apply_button.addEventListener("click", () => {
      instance.close();
      const [start_date, end_date] = instance.input.value.split(" to ");
      displayRooms(start_date, end_date);
    });
}