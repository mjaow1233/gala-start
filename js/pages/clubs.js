export default async function clubs() {
  const res = await fetch("http://localhost:3000/clubs");
  const allClubs = await res.json();

  const routeMap = {
    "1": "jazz-klubben",
    "3": "dj-klubben",
    "5": "piano-klubben",
    "b1e2": "ballet-club"
  };

  return `
    <section class="clubs-page-container">
      <h1>Clubs</h1>  
      <p></p>
      
      <div class="clubs-page-grid-horizontal">
        ${allClubs.map(club => `
          <a href="#${routeMap[club.id] || 'start'}" 
             class="club-card-horizontal" 
             id="club-card-${club.id}"> 
            
            <div class="club-card-image"></div> <div class="club-card-text"> <h3>${club.name}</h3>
              <p>${club.description}</p>
            </div>
          </a>
        `).join('')}
      </div>
    </section>
  `;
}