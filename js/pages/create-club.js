export default function createClub() {
  return `
    <h2>Create a club</h2>
    <form id="club-form">
      <label>Club name</label>
      <input type="text" name="club-name" required>
      <br>

      <label>Description</label>
      <input type="text" name="description" required>
<br>
      <button type="submit">Create club</button>
    </form>
  `;
}
async function submitForm(event) {
  event.preventDefault();

  const form = event.target;
  const clubName = form.querySelector('[name="club-name"]').value;
  const description = form.querySelector('[name="description"]').value;

  await fetch('http://localhost:3000/clubs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: clubName, description })
  });

  alert("Club created!");
}

window.addEventListener("submit", submitForm);
