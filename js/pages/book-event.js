export default async function bookEvent() {

  const clubs = await (await fetch("http://localhost:3000/clubs")).json();
  const events = await (await fetch("http://localhost:3000/events")).json();
  //hämta informationen från json filen.

  window.allEvents = events;

  return `
    <h2>Book an Event</h2>

    <form id="event-form">

      <label>Select Club</label>
      <select name="clubId" id="club-select" required>
        ${clubs.map(club => `
          <option value="${club.id}">${club.name}</option>
        `).join('')}
      </select>

      <label>Select Event</label>
      <select name="eventId" id="event-select" required></select>

      <label>Your Name</label>
      <input type="text" name="visitor-name" required>

      <label>Email</label>
      <input type="email" name="visitor-email" required>

      <button type="submit">Book</button>
    </form>
  `;
}


//gjorde en funktion för att uppdatera dropdown beroende på clubID
function updateEventDropdown() {
  const clubId = document.querySelector("#club-select").value;
  const eventSelect = document.querySelector("#event-select");

  const filteredEvents = window.allEvents.filter(event => event.clubId === clubId);

  eventSelect.innerHTML = filteredEvents.map(event => `
    <option value="${event.id}">${event.name}</option>
  `).join('');
}



async function submitEventForm(event) {
  event.preventDefault();

  const form = event.target;

  const clubId = form.querySelector('[name="clubId"]').value;
  const eventId = form.querySelector('[name="eventId"]').value;
  const name = form.querySelector('[name="visitor-name"]').value;
  const email = form.querySelector('[name="visitor-email"]').value;

  await fetch("http://localhost:3000/visitor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clubId, eventid: eventId, name, email })
  });


}



window.addEventListener("change", (e) => {
  if (e.target.id === "club-select") updateEventDropdown();
});

window.addEventListener("submit", (e) => {
  if (e.target.id === "event-form") submitEventForm(e);
});



setTimeout(updateEventDropdown, 0);



