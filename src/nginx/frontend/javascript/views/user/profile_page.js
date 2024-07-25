// Je veux savoir quel user est connecté
// Une fois que je sais qui est connecté, je peux envoyer les bonnes valeurs à afficher

document.addEventListener('DOMContentLoaded', function()
{
	loadUserData();
    setupEventListeners();
});

function setupEventListeners()
{
    document.getElementById('chart_icon').addEventListener('click', function() {
        $('#chartModal').modal('show');
    }
    );
}
