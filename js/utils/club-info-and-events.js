export default async function clubInfoAndEvents(clubId = null) {
  const res = await fetch("http://localhost:3000/events");
  const events = await res.json();
  const filtered = clubId ? events.filter(e => String(e.clubId) === String(clubId)) : events;

  return filtered.map(
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