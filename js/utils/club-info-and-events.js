export default async function clubInfoAndEvents() {
  const res = await fetch("http://localhost:3000/events");
  const events = await res.json();

  return events
    .map(
      ({ date, name, description }) => `
      <article class="event-card">
        <h3>${name}</h3>
        <p class="date">${new Date(date).toLocaleDateString()}</p>
        <p>${description}</p>
      </article>
    `
    )
    .join("");
}