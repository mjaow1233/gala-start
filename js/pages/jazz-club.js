
export default async function jazzClub() {
  document.body.classList.remove(...document.body.classList);
  document.body.classList.add("jazzClub");

  const res = await fetch("http://localhost:3000/events");
  const events = await res.json();



  const filteredEvents = events
    .filter((event) => event.clubId === "1")
    .map(
      ({ date, name, description }) => `
      <article class="jazzevents">
        <h3>${name}</h3>
        <p class="date">${new Date(date).toLocaleDateString()}</p>
        <p>${description}</p>
      </article>
    `
    )
    .join("");


  const html = `
    <section class="hero">
      <video autoplay muted loop playsinline class="hero-video" id="heroVideo">
        <source src="videos/jazz4.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
      <section class="jazzevents">
    <h3>Upcoming events</h3>
    <div class="events-grid">${filteredEvents}</div>
</section>

</ul>   

   </div>
</div>
  `;

  return html;
}




