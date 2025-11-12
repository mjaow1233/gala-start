export default async function clubEvents(clubId) {
 
  const events = await (
    await fetch(`http://localhost:3000/events?clubId=${clubId}`)
  ).json();

  if (!events.length) {
    return `<p>No upcoming events for this club.</p>`;
  }

  
  return events
    .map(
      (event) => `
      <article class="event-card">
        <h3>${event.name}</h3>
        <p><strong>Date:</strong> ${event.date}</p>
        <p>${event.description}</p>
      </article>
    `
    )
    .join("");
}
