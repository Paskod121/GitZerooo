// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Récupération des éléments du DOM pour la recherche
    const champRecherche = document.getElementById('recherche');
    const boutonRecherche = document.getElementById('bouton-recherche');
    const cartesCommandes = document.querySelectorAll('.carte-commande');
    
    // Suggestions de commandes Git populaires
    const suggestionsGit = [
        'git init',
        'git clone',
        'git add',
        'git commit',
        'git status',
        'git branch',
        'git checkout',
        'git merge',
        'git pull',
        'git push',
        'git fetch',
        'git remote',
        'git rebase',
        'git log',
        'git diff',
        'git reset',
        'git stash',
        'git tag'
    ];

    // Placeholder dynamique pour la barre de recherche
    const placeholders = [
        'Rechercher une commande Git... ',
        'Ex : git commit',
        'Ex : git branch',
        'Ex : git merge',
        'Ex : git rebase',
        'Ex : git status',
        'Ex : git log'
    ];
    let placeholderIndex = 0;
    let placeholderTimeout;

    function changerPlaceholder() {
        champRecherche.setAttribute('placeholder', placeholders[placeholderIndex]);
        placeholderIndex = (placeholderIndex + 1) % placeholders.length;
        placeholderTimeout = setTimeout(changerPlaceholder, 2200);
    }
    changerPlaceholder();
    champRecherche.addEventListener('focus', () => clearTimeout(placeholderTimeout));
    champRecherche.addEventListener('blur', () => changerPlaceholder());

    // Suggestions instantanées
    const suggestionsList = document.querySelector('.suggestions-list');
    champRecherche.addEventListener('input', function() {
        const valeur = this.value.toLowerCase();
        suggestionsList.innerHTML = '';
        if (valeur.length === 0) {
            suggestionsList.classList.remove('active');
            return;
        }
        const suggestionsFiltrees = suggestionsGit.filter(cmd => cmd.includes(valeur));
        if (suggestionsFiltrees.length > 0) {
            suggestionsFiltrees.forEach(cmd => {
                const li = document.createElement('li');
                li.textContent = cmd;
                li.tabIndex = 0;
                li.addEventListener('mousedown', function(e) {
                    champRecherche.value = cmd;
                    suggestionsList.classList.remove('active');
                });
                suggestionsList.appendChild(li);
            });
            suggestionsList.classList.add('active');
        } else {
            suggestionsList.classList.remove('active');
        }
    });
    champRecherche.addEventListener('keydown', function(e) {
        const items = suggestionsList.querySelectorAll('li');
        let selected = suggestionsList.querySelector('li.selected');
        if (suggestionsList.classList.contains('active') && items.length > 0) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (!selected) {
                    items[0].classList.add('selected');
                } else {
                    selected.classList.remove('selected');
                    if (selected.nextElementSibling) {
                        selected.nextElementSibling.classList.add('selected');
                    } else {
                        items[0].classList.add('selected');
                    }
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (!selected) {
                    items[items.length - 1].classList.add('selected');
                } else {
                    selected.classList.remove('selected');
                    if (selected.previousElementSibling) {
                        selected.previousElementSibling.classList.add('selected');
                    } else {
                        items[items.length - 1].classList.add('selected');
                    }
                }
            } else if (e.key === 'Enter') {
                if (selected) {
                    champRecherche.value = selected.textContent;
                    suggestionsList.classList.remove('active');
                }
            }
        }
    });
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-form')) {
            suggestionsList.classList.remove('active');
        }
    });
    
    // Fonction pour filtrer les commandes en fonction de la recherche
    function filtrerCommandes() {
        // Récupération du texte recherché et conversion en minuscules
        const texteRecherche = champRecherche.value.toLowerCase();
        
        // Variable pour suivre si des résultats ont été trouvés
        let resultatsTrouves = false;
        
        // Parcours de toutes les cartes de commandes
        cartesCommandes.forEach(function(carte) {
            // Récupération du nom de la commande
            const nomCommande = carte.querySelector('h4').textContent.toLowerCase();
            // Récupération de la description de la commande
            const descriptionCommande = carte.querySelector('.carte-contenu p').textContent.toLowerCase();
            
            // Vérification si le texte recherché est présent dans le nom ou la description
            if (nomCommande.includes(texteRecherche) || descriptionCommande.includes(texteRecherche)) {
                carte.style.display = 'flex'; // Afficher la carte
                resultatsTrouves = true;
            } else {
                carte.style.display = 'none'; // Masquer la carte
            }
        });
        
        // Obtenir toutes les catégories de commandes
        const categories = document.querySelectorAll('.categorie-commande');
        
        // Vérifier chaque catégorie et masquer celles qui n'ont pas de commandes visibles
        categories.forEach(function(categorie) {
            const commandesVisibles = categorie.querySelectorAll('.carte-commande[style="display: flex;"]');
            if (commandesVisibles.length === 0) {
                categorie.style.display = 'none';
            } else {
                categorie.style.display = 'block';
            }
        });
        
        // Afficher un message si aucun résultat n'est trouvé
        const messageResultat = document.getElementById('message-resultats');
        if (!resultatsTrouves && texteRecherche !== '') {
            // Créer le message s'il n'existe pas
            if (!messageResultat) {
                const message = document.createElement('div');
                message.id = 'message-resultats';
                message.className = 'message-resultats';
                message.innerHTML = '<p>Aucune commande correspondant à votre recherche n\'a été trouvée.</p>';
                document.querySelector('.grille-commandes').prepend(message);
            } else {
                messageResultat.style.display = 'block';
            }
        } else if (messageResultat) {
            messageResultat.style.display = 'none';
        }
    }
    
    // Ajout d'un écouteur d'événement pour le bouton de recherche
    boutonRecherche.addEventListener('click', filtrerCommandes);
    
    // Ajout d'un écouteur d'événement pour la saisie dans le champ de recherche
    champRecherche.addEventListener('keyup', function(event) {
        // Vérification si la touche Entrée a été pressée
        if (event.key === 'Enter') {
            filtrerCommandes();
        }
    });
    
    // Ajout d'un effet de défilement fluide pour le bouton Découvrir
    document.querySelector('.bouton-decouvrir').addEventListener('click', function(e) {
        e.preventDefault();
        const cible = document.querySelector(this.getAttribute('href'));
        window.scrollTo({
            top: cible.offsetTop,
            behavior: 'smooth'
        });
    });
});