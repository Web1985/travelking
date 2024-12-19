export const URL = "https://api.travelcircus.net/hotels/17080/";

export const CHECKINS_URL = `${URL}checkins?E&party=%7B%22adults%22:2,%22childre
n%22:%5B%5D%7D&domain=de&date_start=2025-01-01&date_end=2025-06-31`;

export function quoteeUrl(start_date, end_date) {
  return `${URL}quotes?locale=de_DE&checkin=${start_date}
&checkout=${end_date}&party=%7B"adults":2,"children":[]%7D&domain=de`;
}
