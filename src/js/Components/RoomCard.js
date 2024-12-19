/*
 ** Template for Rooms article with suspense effect
 */
 export function roomCard(room, index = 0) {
    let suspense_block_classname = "suspense-block";
    let suspense_line_classname = "suspense-line";
    let description = "";
    let img = "";
    let services = "";
    let price = "";
    let nights = "";

    if (room) {
      suspense_block_classname = "";
      suspense_line_classname = "";
      description = room.description;
      price = room.full_formatted_price;
      nights = room.fullPriceBreakdown.nights;

      img = `<img src="${room._embedded.pictures[0].offer_teaser_ncol}"
       alt="${room._embedded.pictures[0].description}" loading="lazy" />`;

      if (room._embedded.amenities) {
        services = room._embedded.amenities.reduce((services, item) => {
          return services + `<div>${item.description}</div>`;
        }, "");
      }
    }

    return `
      <article id="section--rooms--${index}" class="room-card ${suspense_block_classname}">
                  <div class="room-card--left">
                      ${img}
                  </div>
                  <div class="room-card--right">
                      <div class="room-card--body">
                          <h2 class="room-card--header">${description}</h2>
                          <div class="room-card--body--amenities ${suspense_line_classname}">
                          ${services}
                          </div>
                      </div>
                      <div class="room-card--body--price">
                          <span class="room-card--body--price--number ${suspense_line_classname}">
                            ${price}
                          </span>
                          <span class="room-card--body--price--nights ${suspense_line_classname}">
                            for ${nights} nights
                          </span>
                          <span class="room-card--body--price--book ${suspense_line_classname}">
                            <button class="btn">Book</button>
                          </span>
                      </div>
                  </div>
              </article>`;
  }