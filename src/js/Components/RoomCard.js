/**
 * Generates a room card template with optional suspense effect.
 * @param {Object} [room] - Room data (optional for suspense effect).
 * @param {number} [index=0] - Index of the room card (for unique IDs).
 * @returns {string} HTML string for the room card.
 */
export function roomCard(room = null, index = 0) {
  const suspenseClass = room ? "" : "suspense-block";
  const suspenseLineClass = room ? "" : "suspense-line";

  const img = room?.["_embedded"]?.["pictures"]?.[0]
    ? `<img src="${room._embedded.pictures[0].offer_teaser_ncol}"
       alt="${room._embedded.pictures[0].description}" loading="lazy" />`
    : "";

  const services = room?._embedded?.amenities
    ? room._embedded.amenities
        .map((item) => `<div>${item.description}</div>`)
        .join("")
    : "";

  const description = room?.description || "";
  const price = room?.full_formatted_price || "";
  const nights = room?.fullPriceBreakdown?.nights || "";

  return `
    <article id="section--rooms--${index}" class="room-card ${suspenseClass}">
      <div class="room-card--left">
        ${img}
      </div>
      <div class="room-card--right">
        <div class="room-card--body">
          <h2 class="room-card--header">${description}</h2>
          <div class="room-card--body--amenities ${suspenseLineClass}">
            ${services}
          </div>
        </div>
        <div class="room-card--body--price">
          <span class="room-card--body--price--number ${suspenseLineClass}">
            ${price}
          </span>
          <span class="room-card--body--price--nights ${suspenseLineClass}">
            for ${nights} nights
          </span>
          <span class="room-card--body--price--book ${suspenseLineClass}">
            <button class="btn">Book</button>
          </span>
        </div>
      </div>
    </article>`;
}
