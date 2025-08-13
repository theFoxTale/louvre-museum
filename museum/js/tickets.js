let ticketTypeInBookingSection = 0;
const ticketStandardCost = [20, 25, 40];

let cardMonth, cardYear;

function selectTicketType() {
    setSumTickerPrice();
}

function decreaseTicketsCount(element) {
    element.nextElementSibling.stepDown();
    setSumTickerPrice();
}

function increaseTicketsCount(element) {
    element.previousElementSibling.stepUp();
    setSumTickerPrice();
}

function setSumTickerPrice() {
    const basicCount = document.getElementById('basic_ticket_input').value;
    const seniorCount = document.getElementById('senior_ticket_input').value;
    const ticketType = Number(document.querySelector('input[name="ticket-type"]:checked').value);

    const sumPrice = basicCount*ticketStandardCost[ticketType] + 0.5*seniorCount*ticketStandardCost[ticketType];
    const sumText = document.querySelector('.sum-ticket-price');
    sumText.textContent = '' + sumPrice;
}

/* --- Pop Up --- */
function toggleBookingTicketSelector(element) {
    const upArrow = element.querySelector('.up-arrow');
    upArrow.classList.toggle('hidden-element');

    const downArrow = element.querySelector('.down-arrow');
    downArrow.classList.toggle('hidden-element');

    element.nextElementSibling.classList.toggle('active');
}

function setSomeValue(item) {
    const container = item.closest('.booking-selector-container');
    const selectedValue = container.querySelector('.ticket-data-span');
    selectedValue.textContent = item.textContent;
}

function hideSomeParent(item) {
    const container = item.closest('.booking-selector-container');
    const elementDiv = container.querySelector('.booking-item');
    toggleBookingTicketSelector(elementDiv);
}

function updateTicketType(index) {
    ticketTypeInBookingSection = index;
    setOverviewTicketPricesText();
    setOverviewTicketSum();
}

function selectSomethingAndHideParent(item) {
    setSomeValue(item);
    hideSomeParent(item);
}

function selectBookingTicketType(item, index) {
    setSomeValue(item);
    updateTicketType(index);
}

function updateTicketTime(item) {
    const timeSpan = document.querySelector('.time-description');
    timeSpan.textContent = item.textContent;
}

function setOverviewTicketPricesText() {
    const basicText = document.querySelector('.basic-overview-price');
    basicText.textContent = '' + ticketStandardCost[ticketTypeInBookingSection];

    const seniorText = document.querySelector('.senior-overview-price');
    seniorText.textContent = '' + (0.5*ticketStandardCost[ticketTypeInBookingSection]);
}

function setOverviewTicketSum() {
    const basicCount = document.getElementById('basic_booking_ticket_input').value;
    const basicText = document.querySelector('.basic-overview-sum');
    const basicSum = basicCount*ticketStandardCost[ticketTypeInBookingSection];
    basicText.textContent = '' + basicSum;

    const seniorCount = document.getElementById('senior_booking_ticket_input').value;
    const seniorText = document.querySelector('.senior-overview-sum');
    const seniorSum = 0.5*seniorCount*ticketStandardCost[ticketTypeInBookingSection];
    seniorText.textContent = '' + seniorSum;

    const fullSum = document.querySelector('.full-overview-span');
    fullSum.textContent = '' + (basicSum + seniorSum);
}

function setTicketsDataInBookingForm() {
    const basicCount = document.getElementById('basic_ticket_input').value;
    const basicLeftInput = document.getElementById('basic_booking_ticket_input');
    const basicRightInput = document.querySelector('.basic-right-count');
    basicLeftInput.value = basicCount;
    basicRightInput.textContent = basicCount;

    const seniorCount = document.getElementById('senior_ticket_input').value;
    const seniorLeftInput = document.getElementById('senior_booking_ticket_input');
    const seniorRightInput = document.querySelector('.senior-right-count');
    seniorLeftInput.value = seniorCount;
    seniorRightInput.textContent = seniorCount;

    const ticketType = Number(document.querySelector('input[name="ticket-type"]:checked').value);
    ticketTypeInBookingSection = ticketType;

    const typeOptions = document.querySelectorAll('.ticket-type-span-text');
    selectBookingTicketType(typeOptions[ticketType], ticketType);
}

function clickBuyTicketsButton() {
    setTicketsDataInBookingForm();
    togglePopUp();
}

function updateRightCount(ticketType) {
    const leftInput = document.getElementById(ticketType + '_booking_ticket_input').value;
    const rightInput = document.querySelector('.' + ticketType + '-right-count');
    rightInput.textContent = leftInput;
}

function decreaseOverviewCount(element, ticketType) {
    element.nextElementSibling.stepDown();
    updateRightCount(ticketType);
    setOverviewTicketSum()
}
function increaseOverviewCount(element, ticketType) {
    element.previousElementSibling.stepUp()
    updateRightCount(ticketType);
    setOverviewTicketSum()
}

function getTicketElements() {
    cardMonth = document.getElementById('card-month');
    cardYear = document.getElementById('card-year');
}

document.addEventListener('DOMContentLoaded', () => {
    getTicketElements();
    setSumTickerPrice();

    document.querySelectorAll('.ticket-type-span-text').forEach((item, index) => {
        item.addEventListener('click', function() {
            selectSomethingAndHideParent(item);
            updateTicketType(index);
        });
    });

    document.querySelectorAll('.time-span-text').forEach((item) => {
        item.addEventListener('click', function() {
            selectSomethingAndHideParent(item);
            updateTicketTime(item);
        });
    });

    document.querySelectorAll('.for-toggle-booking').forEach(item => {
        item.addEventListener('click', function() {
            toggleBookingTicketSelector(item);
        });
    });

    document.querySelector('.pop-up-close-button').addEventListener('click', function() {
        togglePopUp();
    });

    document.querySelectorAll('.amount-down').forEach(item => {
        item.addEventListener('click', function() {
            decreaseOverviewCount(item, 'basic');
        });
    });

    document.querySelectorAll('.amount-up').forEach(item => {
        item.addEventListener('click', function() {
            increaseOverviewCount(item, 'basic');
        });
    });

    document.querySelector('.up-card-month').addEventListener('click', function() {
        cardMonth.stepUp();
    });

    document.querySelector('.down-card-month').addEventListener('click', function() {
        cardMonth.stepDown();
    });

    document.querySelector('.up-card-year').addEventListener('click', function() {
        cardYear.stepUp();
    });

    document.querySelector('.down-card-year').addEventListener('click', function() {
        cardYear.stepDown();
    });
});
