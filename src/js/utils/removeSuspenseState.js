/**
 * Remove the suspense state from room cards.
 * @param {NodeListOf<Element>} roomCards - NodeList of room card elements.
 */
export function removeSuspenseState(roomCards) {
    roomCards.forEach((card) => card.classList.remove("suspense-block"));
  }