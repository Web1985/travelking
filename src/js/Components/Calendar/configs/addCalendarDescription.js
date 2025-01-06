import { createElementWithClass } from "../../../utils/createElementWithClass";

export function addCalendarDescription(instance, text){
    const calendar_container = instance.calendarContainer;

    const description = createElementWithClass("div", "calendar--description", {
        textContent: text,
      });
      calendar_container.appendChild(description);

      const price_description = createElementWithClass(
        "div",
        "calendar--price-description",
        {
          innerHTML: `
            <div class="low-price">€</div>
            <div class="high-price">€€</div>`,
        }
      );
      calendar_container.appendChild(price_description);
}