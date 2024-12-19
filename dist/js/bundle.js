/*! For license information please see bundle.js.LICENSE.txt */
(()=>{"use strict";var __webpack_modules__={"./src/scss/style.scss":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://travelking/./src/scss/style.scss?")},"./src/js/Components/DisplayRooms.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   displayRooms: () => (/* binding */ displayRooms)\n/* harmony export */ });\n/* harmony import */ var _FetchRooms_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FetchRooms.js */ "./src/js/Components/FetchRooms.js");\n/* harmony import */ var _RoomCard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RoomCard.js */ "./src/js/Components/RoomCard.js");\n\n\n\n/*\n ** Display Rooms\n */\n async function displayRooms(start_date, end_date) {\n    const rooms = await (0,_FetchRooms_js__WEBPACK_IMPORTED_MODULE_0__.fetchRooms)(start_date, end_date);\n    const section_rooms = document.getElementById("section--rooms");\n    section_rooms.innerHTML = null;\n    if (rooms) {\n      rooms.map((room, index) => {\n        let room_card = (0,_RoomCard_js__WEBPACK_IMPORTED_MODULE_1__.roomCard)(room, index);\n        section_rooms.innerHTML += room_card;\n      });\n    }\n  }\n\n//# sourceURL=webpack://travelking/./src/js/Components/DisplayRooms.js?')},"./src/js/Components/FetchDates.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchDates: () => (/* binding */ fetchDates)\n/* harmony export */ });\n\nasync function fetchDates(url, target) {\n    const btn_text = target.innerText;\n    target.innerText = "loading...";\n\n    try {\n      const response = await fetch(url);\n\n      if (!response.ok) {\n        throw new Error(`HTTP error! status: ${response.status}`);\n      }\n      return await response.json();\n    } catch (error) {\n      console.log("Error: " + error);\n    } finally {\n      target.innerText = btn_text;\n    }\n  }\n\n//# sourceURL=webpack://travelking/./src/js/Components/FetchDates.js?')},"./src/js/Components/FetchRooms.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchRooms: () => (/* binding */ fetchRooms)\n/* harmony export */ });\n/* harmony import */ var _urls_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./urls.js */ "./src/js/Components/urls.js");\n/* harmony import */ var _RoomCard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RoomCard.js */ "./src/js/Components/RoomCard.js");\n\n\n/*\n ** Get Available Rooms from API for the selected dates\n */\n async function fetchRooms(start_date, end_date) {\n    const url = (0,_urls_js__WEBPACK_IMPORTED_MODULE_0__.quoteeUrl)(start_date, end_date);\n    const section_rooms = document.getElementById("section--rooms");\n    section_rooms.innerHTML = (0,_RoomCard_js__WEBPACK_IMPORTED_MODULE_1__.roomCard)();\n    const message = document.getElementById("section--message");\n    const room_card = document.querySelectorAll(".room-card");\n\n    try {\n      message.innerHTML = "";\n\n      const response = await fetch(url);\n      if (!response.ok) {\n        throw new Error(`HTTP error! status: ${response.status}`);\n      }\n\n      const hotels = await response.json();\n\n      return hotels._embedded.hotel_quotes;\n    } catch (error) {\n      const section_rooms = document.getElementById("section--rooms");\n      section_rooms.innerHTML = null;\n\n      message.innerHTML = `<div class="error-message">\n      There are no rooms available for the selected period. Please try another dates.</div>`;\n\n      console.log("Error: " + error);\n    } finally {\n      room_card.forEach((element) => {\n        element.classList.remove("suspense-block");\n      });\n    }\n  }\n\n//# sourceURL=webpack://travelking/./src/js/Components/FetchRooms.js?')},"./src/js/Components/ProcessDates.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   precessDates: () => (/* binding */ precessDates)\n/* harmony export */ });\n/* harmony import */ var _DisplayRooms_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DisplayRooms.js */ "./src/js/Components/DisplayRooms.js");\n\n/*\n ** Put Available Dates to the Calendar\n */\n function precessDates(data) {\n    let enable_dates = [];\n    let enable_dates_obj = {};\n    let i = 0;\n    for (let item of data._embedded.hotel_availabilities) {\n      enable_dates[i] = item.date;\n      enable_dates_obj[item.date] = item;\n      i++;\n    }\n\n    let showMonthsVar = window.innerWidth > 800 ? 2 : 1;\n\n    const config = {\n      dateFormat: "Y-m-d",\n      closeOnSelect: false,\n      minDate: "today",\n      maxDate: new Date().fp_incr(188),\n      mode: "range",\n      showMonths: showMonthsVar,\n      enable: enable_dates,\n      onDayCreate: function (dObj, dStr, fp, dayElem) {\n        const formattedDate = new Intl.DateTimeFormat("en-CA").format(\n          dayElem.dateObj\n        );\n\n        if (enable_dates_obj[formattedDate]) {\n          let day = dayElem.innerHTML;\n          dayElem.innerHTML = `\n          <span class=\'day-number\'>${day}</span>\n            <span class=\'day-price\'>${enable_dates_obj[formattedDate].price}</span>\n            `;\n        }\n      },\n\n      onOpen: (selectedDates, dateStr, instance) => {\n        const calendar_container = instance.calendarContainer;\n        const wrapper = document.createElement("div");\n        wrapper.id = "calendar-wrapper";\n        calendar_container.parentNode.insertBefore(wrapper, calendar_container);\n        wrapper.appendChild(calendar_container);\n        const apply_button = document.createElement("button");\n        apply_button.textContent = "Apply";\n        apply_button.className = "apply-button btn";\n        calendar_container.appendChild(apply_button);\n\n        apply_button.addEventListener("click", () => {\n          instance.close();\n\n          let input_dates = instance.input.value;\n          let start_date = input_dates.split(" to ")[0];\n          let end_date = input_dates.split(" to ")[1];\n          (0,_DisplayRooms_js__WEBPACK_IMPORTED_MODULE_0__.displayRooms)(start_date, end_date);\n        });\n      },\n      onClose: function (selectedDates, dateStr, instance) {\n        const calendar_wrapper = document.getElementById("calendar-wrapper");\n        calendar_wrapper.remove();\n      },\n    };\n\n    let calendar = flatpickr("#calendar", config);\n    calendar.open();\n  }\n\n//# sourceURL=webpack://travelking/./src/js/Components/ProcessDates.js?')},"./src/js/Components/RoomCard.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   roomCard: () => (/* binding */ roomCard)\n/* harmony export */ });\n/*\n ** Template for Rooms article with suspense effect\n */\n function roomCard(room, index = 0) {\n    let suspense_block_classname = "suspense-block";\n    let suspense_line_classname = "suspense-line";\n    let description = "";\n    let img = "";\n    let services = "";\n    let price = "";\n    let nights = "";\n\n    if (room) {\n      suspense_block_classname = "";\n      suspense_line_classname = "";\n      description = room.description;\n      price = room.full_formatted_price;\n      nights = room.fullPriceBreakdown.nights;\n\n      img = `<img src="${room._embedded.pictures[0].offer_teaser_ncol}"\n       alt="${room._embedded.pictures[0].description}" loading="lazy" />`;\n\n      if (room._embedded.amenities) {\n        services = room._embedded.amenities.reduce((services, item) => {\n          return services + `<div>${item.description}</div>`;\n        }, "");\n      }\n    }\n\n    return `\n      <article id="section--rooms--${index}" class="room-card ${suspense_block_classname}">\n                  <div class="room-card--left">\n                      ${img}\n                  </div>\n                  <div class="room-card--right">\n                      <div class="room-card--body">\n                          <h2 class="room-card--header">${description}</h2>\n                          <div class="room-card--body--amenities ${suspense_line_classname}">\n                          ${services}\n                          </div>\n                      </div>\n                      <div class="room-card--body--price">\n                          <span class="room-card--body--price--number ${suspense_line_classname}">\n                            ${price}\n                          </span>\n                          <span class="room-card--body--price--nights ${suspense_line_classname}">\n                            for ${nights} nights\n                          </span>\n                          <span class="room-card--body--price--book ${suspense_line_classname}">\n                            <button class="btn">Book</button>\n                          </span>\n                      </div>\n                  </div>\n              </article>`;\n  }\n\n//# sourceURL=webpack://travelking/./src/js/Components/RoomCard.js?')},"./src/js/Components/urls.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CHECKINS_URL: () => (/* binding */ CHECKINS_URL),\n/* harmony export */   URL: () => (/* binding */ URL),\n/* harmony export */   quoteeUrl: () => (/* binding */ quoteeUrl)\n/* harmony export */ });\nconst URL = "https://api.travelcircus.net/hotels/17080/";\n\nconst CHECKINS_URL = `${URL}checkins?E&party=%7B%22adults%22:2,%22childre\nn%22:%5B%5D%7D&domain=de&date_start=2025-01-01&date_end=2025-06-31`;\n\nfunction quoteeUrl(start_date, end_date) {\n  return `${URL}quotes?locale=de_DE&checkin=${start_date}\n&checkout=${end_date}&party=%7B"adults":2,"children":[]%7D&domain=de`;\n}\n\n\n//# sourceURL=webpack://travelking/./src/js/Components/urls.js?')},"./src/js/main.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Components_urls_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Components/urls.js */ "./src/js/Components/urls.js");\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scss/style.scss */ "./src/scss/style.scss");\n/* harmony import */ var _Components_FetchDates_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Components/FetchDates.js */ "./src/js/Components/FetchDates.js");\n/* harmony import */ var _Components_ProcessDates_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Components/ProcessDates.js */ "./src/js/Components/ProcessDates.js");\n\n\n\n\n\n/*\n ** Create Calendar\n */\nasync function createCalendar(url, target) {\n  const data = await (0,_Components_FetchDates_js__WEBPACK_IMPORTED_MODULE_2__.fetchDates)(url, target);\n  (0,_Components_ProcessDates_js__WEBPACK_IMPORTED_MODULE_3__.precessDates)(data);\n}\n\n/*\n ** onClick event for the "Check Availabilities" button\n */\nlet btn = document.getElementById("check-availabilities--btn");\nbtn.onclick = (event) => createCalendar(_Components_urls_js__WEBPACK_IMPORTED_MODULE_0__.CHECKINS_URL, event.target);\n\n\n//# sourceURL=webpack://travelking/./src/js/main.js?')}},__webpack_module_cache__={};function __webpack_require__(e){var n=__webpack_module_cache__[e];if(void 0!==n)return n.exports;var _=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](_,_.exports,__webpack_require__),_.exports}__webpack_require__.d=(e,n)=>{for(var _ in n)__webpack_require__.o(n,_)&&!__webpack_require__.o(e,_)&&Object.defineProperty(e,_,{enumerable:!0,get:n[_]})},__webpack_require__.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var __webpack_exports__=__webpack_require__("./src/js/main.js")})();