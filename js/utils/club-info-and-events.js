export default async function clubInfoAndEvents(clubId) {
let url = "http://localhost:3000/events";
if (clubId) {
    url += `?clubId=${clubId}`;
  }

  const res = await fetch(url);
  const events = await res.json();

  events.sort((a, b) => new Date(a.date) - new Date(b.date));

  return events
    .map(
      ({ date, name, description }) => `
      <article class="event-card">
        <h3>${name}</h3>
        <p class="date">${new Date(date).toLocaleDateString("sv-SE", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}</p>
        <p>${description}</p>
      </article>
    `
    )
    .join("");
}