import { displayRooms } from "./DisplayRooms.js";

export function onCalendarOpen(instance) {

  const calendar_container = instance.calendarContainer;
  const wrapper = createElementWithClass("div", "calendar-wrapper", {
    id: "calendar-wrapper",
  });
  calendar_container.parentNode.insertBefore(wrapper, calendar_container);
  wrapper.appendChild(calendar_container);

  const description = createElementWithClass("div", "calendar--description", {
    textContent: "Prices are average prices per 2 persons per day.",
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

  const apply_button = createElementWithClass("button", "apply-button btn", {
    textContent: "Apply",
  });
  calendar_container.appendChild(apply_button);

  apply_button.addEventListener("click", () => {
    instance.close();
    const [start_date, end_date] = instance.input.value.split(" to ");
    displayRooms(start_date, end_date);
  });

  instance.config.onChange.push(function() {
    const selected = calendar_container.querySelectorAll('.inRange');
    selected.forEach(child => {
        if(child.classList.contains('flatpickr-disabled')){
            instance.clear();
        }
      });
  } );
}


/**
 * Helper function to create an element with a class and properties.
 * @param {string} tagName - HTML tag name.
 * @param {string} className - Class name(s) for the element.
 * @param {Object} [props={}] - Additional properties for the element.
 * @returns {HTMLElement} The created element.
 */
function createElementWithClass(tagName, className, props = {}) {
    const element = document.createElement(tagName);
    element.className = className;
    Object.assign(element, props);
    return element;
  }