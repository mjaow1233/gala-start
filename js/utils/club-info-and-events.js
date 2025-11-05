/*
export default async function clubInfoAndEvents(clubId) {
  let name = '', description = '';
  // if there is a clubId -> fetch the info about the club
  // and calculate the correct url for fetching filtered events
  let url = 'http://localhost:3000/events';
  if (clubId) {
    const { name: clubName, description: clubDescription } =
      await (await fetch('http://localhost:3000/clubs/' + clubId)).json();
    name = clubName;
    description = clubDescription;
    url += '?clubId=' + clubId;
  }
  const events =
    await (await fetch(url)).json();
  // return html
  return `
    <h1>${name}</h1>
    <p>${description}</p>
    <h2>Events</h2>
    ${events
      .toSorted((a, b) => a.date > b.date ? 1 : -1)
      .map(({ date, name, description }) => `
        <article class="event">
          <h3>${name} ${date}</h3>
          <p>${description}</p>
        </article>
      `)
      .join('')
    }
  `;
}
*/
// js/utils/club-info-and-events.js
// js/utils/club-info-and-events.js

const API_BASE_URL = 'http://localhost:3000';

// Funktion för att hämta ALLA evenemang eller evenemang för en specifik klubb
export async function getClubInfoAndEvents(clubId = null) {
  try {
    const response = await fetch(`${API_BASE_URL}/events`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const events = await response.json();

    if (clubId) {
      return events.filter(event => event.clubId === clubId);
    }
    return events;
  } catch (error) {
    console.error("Kunde inte hämta evenemang:", error);
    return [];
  }
}

// Ny funktion för att hämta specifik klubbinfo (namn, beskrivning)
export async function getClubDetails(clubId) {
  try {
    const response = await fetch(`${API_BASE_URL}/clubs/${clubId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const club = await response.json();
    return club;
  } catch (error) {
    console.error(`Kunde inte hämta klubbinfo för ID ${clubId}:`, error);
    return { name: 'Okänd Klubb', description: 'Ingen beskrivning tillgänglig.' };
  }
}