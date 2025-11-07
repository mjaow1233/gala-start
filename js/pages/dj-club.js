import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function djClub() {
const eventsHtml = await clubInfoAndEvents("3"); // match clubId from db.json
  return `
    <h2>DJ Club</h2>
    <p>TBT</p>
    <div class="events-grid">${eventsHtml}</div>
  `;}
