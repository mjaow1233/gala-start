export default async function clubRatings(clubId) {
  const events = await (
    await fetch(`http://localhost:3000/events?clubId=${clubId}`)
  ).json();

  const html = events
    .map((event) => {
      let average = 0;
      if (event.votes > 0) {
        // always rounds to the closest number "star"
        average = Math.round(event.total / event.votes);
      }

      return `
    <article class="event-card" data-event-id="${event.id}">
    <h3>${event.name}</h3>
    <p>Average Rating: ${average} stars (${event.votes} votes)</p>

    <div class ="stars">
    <span class= "star" data-value = "1">★</span>
    <span class= "star" data-value = "2">★</span>
    <span class= "star" data-value = "3">★</span>
    <span class= "star" data-value = "4">★</span>
    <span class= "star" data-value = "5">★</span>
    </div>
    </article>
    `;
    })
    .join("");

  return html;
}
export function starSystem() {
  const stars = document.querySelectorAll(".star");

  stars.forEach((star) => {
    star.addEventListener("click", async () => {
      const value = Number(star.dataset.value);
      const eventCard = star.closest(".event-card");
      const allStars = eventCard.querySelectorAll(".star");
      allStars.forEach((s) => s.classList.remove("selected"));
      for (let i = 0; i < value; i++) {
        allStars[i].classList.add("selected");
      }
      

      const eventData = await (
        await fetch(`http://localhost:3000/events/${eventCard.dataset.eventId}`)
      ).json();

      eventData.total = eventData.total + value;
      eventData.votes = eventData.votes + 1;

      /*saves the votes to the json server */

      await fetch(`http://localhost:3000/events/${eventCard.dataset.eventId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      alert(`Your vote ${value} has been submitted to "${eventData.name}"!`);
    });
  });
}
