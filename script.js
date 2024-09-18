const API_KEY = '14071ca267e247a49b88af698528b961'; // Remplacez par votre clé API

// Fonction pour récupérer et afficher les résultats des matchs
function getFootballResults() {
    fetch('https://api.football-data.org/v2/competitions/PL/matches', {
        headers: { 'X-Auth-Token': API_KEY }
    })
    .then(response => response.json())
    .then(data => {
        const results = data.matches;
        let output = '<ul class="list-group">';
        results.forEach(match => {
            output += `
            <li class="list-group-item">
                <h5>${match.homeTeam.name} ${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam} ${match.awayTeam.name}</h5>
                <p>Date : ${new Date(match.utcDate).toLocaleString()}</p>
            </li>`;
        });
        output += '</ul>';
        document.getElementById('results').innerHTML = output;
    })
    .catch(error => console.error('Erreur:', error));
}

// Appel de la fonction pour récupérer les résultats dès le chargement de la page
getFootballResults();
