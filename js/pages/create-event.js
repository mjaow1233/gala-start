export default async function createEvent() {
  const clubs = await (await fetch("http://localhost:3000/clubs")).json();
  const events = await (await fetch("http://localhost:3000/events")).json();
  //hämta informationen från json filen.

  window.allEvents = events;
  const clubIdsWithEvents = clubs;
  

  return `
    <h2>Create an Event</h2>

    <form id="event-form">

      <label>Select Club</label>
      <select name="clubId" id="club-select" required>
        ${clubs
          .map(
            (club) => `
          <option value="${club.id}">${club.name}</option>
        `
          )
          .join("")}
      </select>

      <label>Event Name</label>
      <input type = "text" name = "event-name" required>

      <label>date</label>
      <input type = "date" name = "event-date" required>

      <label>Event Description</label>
      <textarea name ="event-description" required></textarea>

      <button type="submit">create</button>
    </form>
  `;
}

//gjorde en funktion för att uppdatera dropdown beroende på clubID
function updateEventDropdown() {
  const clubSelect = document.querySelector("#club-select");
  const eventSelect = document.querySelector("#event-select");
  //ser till att elementer finns
  if (!clubSelect || !eventSelect || !window.allEvents) return;

  const clubId = clubSelect.value;

  const filteredEvents = window.allEvents.filter(
    (event) => String(event.clubId) === String(clubId)
  );

  eventSelect.innerHTML = filteredEvents
    .map(
      (event) => `
    <option value="${event.id}">${event.name}</option>
  `
    )
    .join("");
}

async function submitEventForm(event) {
  event.preventDefault();

  const form = event.target;

  const clubId = form.querySelector('[name="clubId"]').value;
  const name = form.querySelector('[name="event-name"]').value;
  const date = form.querySelector('[name="event-date"]').value;
  const description = form.querySelector('[name="event-description"]').value;

  await fetch("http://localhost:3000/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clubId,name, date, description }),
  });

  
  form.innerHTML = `
  <p> You have successfully created ${name} and
  
  </p> is confirmed.</p>`;

}

window.addEventListener("change", (e) => {
  if (e.target.id === "club-select") updateEventDropdown();
});

window.addEventListener("submit", (e) => {
  if (e.target.id === "event-form") submitEventForm(e);
});
