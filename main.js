const games = [ /* server.js games 객체 복사 */ ];

function loadGames() {
  const grid = document.getElementById('games-grid');
  grid.innerHTML = '';
  games.forEach(game => {
    const card = document.createElement('a');
    card.href = `/game/${game.id}`;
    card.className = 'game-card';
    card.innerHTML = `
      <h3>${game.name}</h3>
      <p>${game.tips[0]}</p>
      ${game.script ? '<button>📥 다운로드</button>' : ''}
    `;
    grid.appendChild(card);
  });
}

function filterGames() {
  const query = document.getElementById('search').value.toLowerCase();
  // 필터링 로직
}

loadGames();
