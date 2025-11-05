import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function balettKlubben() {
  // Anropa er gemensamma funktion med ID:t för "Balettklubben"
  return clubInfoAndEvents('b1e2');
}