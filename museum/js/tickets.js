const ticketStandardCost = [20, 25, 40];

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
    const seniorCount = document.getElementById('senior_ticker_input').value;
    const ticketType = Number(document.querySelector('input[name="ticket-type"]:checked').value);

    const sumPrice = basicCount*ticketStandardCost[ticketType] + 0.5*seniorCount*ticketStandardCost[ticketType];
    const sumText = document.querySelector('.sum-ticket-price');
    sumText.textContent = '' + sumPrice;
}

document.addEventListener('DOMContentLoaded', () => {
    selectTicketType();
});