"use strict";

const MONTHS = [`JAN`, `FEB`, `MAR`, `APR`, `MAY`, `JUN`, `JUL`, `AUG`, `SEP`, `OCT`, `NOV`, `DEC`];
const FILTERS_DATA = [`Everything`, `Future`, `Past`];

const CONTENT_DATA = [
  {
    date: `2019-03-18`,
    events: [
      {
        type: `taxi`,
        title: `Taxi to Amsterdam`,
        start: `2019-03-18T10:30`,
        end: `2019-03-18T11:00`,
        offers: [
          {
            title: `Order Uber`,
            price: 20
          }
        ]
      },
      {
        type: `flight`,
        title: `Flight to Chamonix`,
        start: `2019-03-18T12:25`,
        end: `2019-03-18T13:35`,
        offers: [
          {
            title: `Add luggage`,
            price: 50
          },
          {
            title: `Switch to comfort`,
            price: 80
          },
        ]
      },
      {
        type: `drive`,
        title: `Drive to Chamonix`,
        start: `2019-03-18T14:30`,
        end: `2019-03-18T16:05`,
        offers: [
          {
            title: `Rent a car`,
            price: 200
          }
        ]
      },
    ]
  },
  {
    date: `2019-03-19`,
    events: [
      {
        type: `taxi`,
        title: `Taxi to Amsterdam`,
        start: `2019-03-18T10:30`,
        end: `2019-03-18T11:00`,
        offers: [
          {
            title: `Order Uber`,
            price: 20
          }
        ]
      },
      {
        type: `drive`,
        title: `Drive to Chamonix`,
        start: `2019-03-18T14:30`,
        end: `2019-03-18T16:05`,
        offers: [
          {
            title: `Rent a car`,
            price: 200
          }
        ]
      },
    ]
  },
];

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const getfullPriceEvent = (event) => {
  return event.offers.reduce((sum, offer) => sum + offer.price, 0);
};

const getfullDayPrice = (day) => {
  return day.events.reduce((sum, event) => sum + getfullPriceEvent(event), 0);
};

const getFullPrice = () => {
  return CONTENT_DATA.reduce((sum, day) => sum + getfullDayPrice(day), 0);
};

const createSiteTripInfo = () => {

  const fullPrice = getFullPrice();

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${fullPrice}</span>
      </p>
    </section>`
  );
};

const createSiteMenu = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>`
  );
};

const createSiteFiltersContainer = () => {
  return (
    `<form class="trip-filters" action="#" method="get">
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

const createSiteFilterElement = (name) => {
  const attrChecked = name === `Everything` ? `checked` : ``;

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name.toLowerCase()}" ${attrChecked}>
      <label class="trip-filters__filter-label" for="filter-${name.toLowerCase()}">${name}</label>
    </div>`
  );
};

const createSiteSorts = () => {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>

      <div class="trip-sort__item  trip-sort__item--event">
        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" checked>
        <label class="trip-sort__btn" for="sort-event">Event</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--time">
        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
        <label class="trip-sort__btn" for="sort-time">
          Time
          <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
            <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
          </svg>
        </label>
      </div>

      <div class="trip-sort__item  trip-sort__item--price">
        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
        <label class="trip-sort__btn" for="sort-price">
          Price
          <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
            <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
          </svg>
        </label>
      </div>

      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};

const createSiteTripDays = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

const createEvents = (day) => {
  return day.events.reduce((string, event) => {
    return string + createSiteEvent(event);
  }, ``);
};

const createSiteDay = (day, number) => {
  const date = new Date(day.date);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${number}</span>
        <time class="day__date" datetime="${day.date}">${MONTHS[date.getMonth()]}&nbsp;${date.getDate()}</time>
      </div>

      <ul class="trip-events__list">${createEvents(day)}</ul>
    </li>`
  );
};

const convertingTimeToString = (time) => {
  let hours = time.getHours();
  let minutes = time.getMinutes();

  hours = hours < 10 ? `0${hours}` : `${hours}`;
  minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${hours}:${minutes}`;
};

const convertingDurationToString = (duration) => {
  let hours = duration.getUTCHours();
  let minutes = duration.getUTCMinutes();

  hours = hours === 0 ? `` : `${hours}H`;
  minutes = `${minutes}М`;

  return `${hours} ${minutes}`;
};

const createOfferTemplate = (offer) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
    </li>`
  );
};

const createOffers = (event) => {
  const offers = event.offers.reduce((string, offer) => {
    return string + createOfferTemplate(offer);
  }, ``);

  return offers;
};

const createSiteEvent = (event) => {
  const startTime = new Date(event.start);
  const endTime = new Date(event.end);
  const duration = new Date(endTime - startTime);
  const totalPrice = getfullPriceEvent(event);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${event.type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${event.title}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${event.start}">${convertingTimeToString(startTime)}</time>
            &mdash;
            <time class="event__end-time" datetime="${event.end}">${convertingTimeToString(endTime)}</time>
          </p>
          <p class="event__duration">${convertingDurationToString(duration)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${totalPrice}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOffers(event)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};


const siteTripMain = document.querySelector(`.trip-main`);
const siteTripEvents = document.querySelector(`.trip-events`);

render(siteTripMain, createSiteTripInfo(), `afterbegin`);

const siteTripControls = siteTripMain.querySelector(`.trip-controls`);
const siteTripHiddenText = siteTripControls.querySelector(`h2`);

render(siteTripHiddenText, createSiteMenu(), `afterend`);
render(siteTripControls, createSiteFiltersContainer(), `beforeend`);

const siteTripFiltersButton = siteTripControls.querySelector(`.trip-filters button`);

FILTERS_DATA.forEach((filter) => {
  render(siteTripFiltersButton, createSiteFilterElement(filter), `beforebegin`);
});

render(siteTripEvents, createSiteSorts(), `beforeend`);
render(siteTripEvents, createSiteTripDays(), `beforeend`);

const siteTripDays = siteTripEvents.querySelector(`.trip-days`);

CONTENT_DATA.forEach((day, index) => {
  render(siteTripDays, createSiteDay(day, index + 1), `beforeend`);
});
