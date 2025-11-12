import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function djClub() {
  const res = await fetch("http://localhost:3000/events");
  const events = await res.json();

  // Filter only events for DJ Club (clubId === "3")
  const filteredEvents = events
    .filter((event) => event.clubId === "3")
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

  return `
  <div class="dj-club-wrapper">
          
    <section class="dj_img">
      <img src="/images/djImage.png" alt="DJImage">
    </section>
           
    <div class="dj-club-content">

    <h1>About DJ Club</h1>
    <p class="about">Step into the groove of Throwback Thursdays at the Gala Emporium, where vintage beats reign supreme and nostalgia pulses <br> through the speakers.
       From disco anthems and 90s hits to early 2000s hits, every night is a time-traveling dance party lit by neon <br> lights and vinyl vibes. 
       This is where old-school sound meets new-school soul and the dance floor never sleeps.
    </p>

    <h3>Short video clip from previous nights</h3>

    <div class="media-row">
    <video controls width="640">
    <source src="/images/djClubVideo.mp4" type="video/mp4">
    </video>

    <section class="dj_artist">
      <img src="/images/artists.png" alt="DJ ARTIST">
    </section>
    </div>
    
    <h3>Upcoming events</h3>
    <div class="events-grid">${filteredEvents}</div>

   <h3>Club Info</h3>
<ul class="club-info">
  <li><strong>Age Limit:</strong> 18+</li>
  <li><strong>Location:</strong> Gala Emporium </li>
  <li><strong>Contact:</strong> info@galaemporium.djclub.se | +46 70 123 456</li>
  <li><strong>Opening Hours:</strong> Thursday-Saturday: 19:00-03:00</li>
  <li><strong>Dress Code:</strong> Optional, based on day's theme!</li>
</ul>   

   </div>
</div>
  `;
}
