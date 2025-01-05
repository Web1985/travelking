export function onDayCreate (dayElem) {
    const formattedDate = new Intl.DateTimeFormat("en-CA").format(dayElem.dateObj);
    const availability = enable_dates_obj[formattedDate];

    if (availability) {
      dayElem.innerHTML = `
        <span class='day-available price-position--${availability.price_position}'>
          <span class='day-number'>${dayElem.innerHTML}</span>
          <span class='day-price'>${availability.price} €</span>
        </span>`;
    }
}