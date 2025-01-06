/**
 * Helper function to create an element with a class and properties.
 * @param {string} tagName - HTML tag name.
 * @param {string} className - Class name(s) for the element.
 * @param {Object} [props={}] - Additional properties for the element.
 * @returns {HTMLElement} The created element.
 */
export function createElementWithClass(tagName, className, props = {}) {
    const element = document.createElement(tagName);
    element.className = className;
    Object.assign(element, props);
    return element;
  }