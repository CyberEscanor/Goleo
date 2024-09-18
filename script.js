const API_KEY = 'e3b568804d3c8610e98810301bc6381c'; // Remplacez par votre clé API API-Football

// Fonction pour récupérer et afficher les résultats de football
function getFootballResults() {
    fetch('https://v3.football.api-sports.io/fixtures?league=2&season=2023', {
        headers: {
            'x-apisports-key': API_KEY
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur API : ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        const results = data.response;
        let output = '<ul class="list-group">';
        results.forEach(match => {
            output += `
            <li class="list-group-item">
                <h5>${match.teams.home.name} ${match.goals.home} - ${match.goals.away} ${match.teams.away.name}</h5>
                <p>Date : ${new Date(match.fixture.date).toLocaleString()}</p>
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
