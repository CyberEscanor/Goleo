const API_KEY = '14071ca267e247a49b88af698528b961'; // Remplacez par votre clé API

// Fonction pour récupérer et afficher les résultats de la Champions League
function getFootballResults() {
    fetch('https://api.football-data.org/v2/competitions/CL/matches', {
        headers: { 'X-Auth-Token': API_KEY }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur API : ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
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
    .catch(error => {
        console.error('Erreur:', error);
        document.getElementById('results').innerHTML = `<p style="color:red;">Erreur lors du chargement des résultats : ${error.message}</p>`;
    });
}

// Appel de la fonction pour récupérer les résultats dès le chargement de la page
getFootballResults();
