// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments principaux
    const conteneurAccueil = document.querySelector('.landing-container');
    const contenuPrincipal = document.querySelector('.main-content');
    const boutonAction = document.querySelector('.cta-button');
    const champRecherche = document.querySelector('.search-input');
    const boutonRecherche = document.querySelector('.search-button');
    const liensNavigation = document.querySelectorAll('.nav-link');
    
    // Animation subtile au chargement de la page
    window.addEventListener('load', function() {
        document.body.classList.add('charge');
        
        // Animation séquentielle des éléments
        setTimeout(() => {
            document.querySelector('.hero-title').classList.add('anime');
        }, 300);
        
        setTimeout(() => {
            document.querySelector('.hero-description').classList.add('anime');
        }, 600);
        
        setTimeout(() => {
            boutonAction.classList.add('anime');
        }, 900);
    });
    
    // Fonction pour l'effet de parallaxe sur mouvement de souris
    function effetParallaxe(e) {
        const deplacementX = (e.clientX - window.innerWidth / 2) * 0.01;
        const deplacementY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        contenuPrincipal.style.backgroundPosition = `calc(50% + ${deplacementX}px) calc(50% + ${deplacementY}px)`;
    }
    
    // Application de l'effet de parallaxe
    contenuPrincipal.addEventListener('mousemove', effetParallaxe);
    
    // Fonctions pour l'animation du bouton d'action
    function animerBoutonEntree() {
        this.classList.add('survol');
    }
    
    function animerBoutonSortie() {
        this.classList.remove('survol');
    }
    
    // Application des animations au bouton
    boutonAction.addEventListener('mouseenter', animerBoutonEntree);
    boutonAction.addEventListener('mouseleave', animerBoutonSortie);
    
    // Fonctions pour les effets du champ de recherche
    function activerRecherche() {
        document.querySelector('.search-form').classList.add('active');
    }
    
    function desactiverRecherche() {
        document.querySelector('.search-form').classList.remove('active');
    }
    
    // Application des effets au champ de recherche
    champRecherche.addEventListener('focus', activerRecherche);
    champRecherche.addEventListener('blur', desactiverRecherche);
    
    // Fonction pour traiter la recherche
    function traiterRecherche() {
        if (champRecherche.value.trim() !== '') {
            // Animation de recherche
            this.classList.add('recherche-en-cours');
            champRecherche.disabled = true;
            
            // Simuler un délai de recherche puis rediriger
            setTimeout(() => {
                window.location.href = `main.html?search=${encodeURIComponent(champRecherche.value.trim())}`;
            }, 800);
        } else {
            // Animation de secousse si vide
            champRecherche.classList.add('secouer');
            setTimeout(() => {
                champRecherche.classList.remove('secouer');
            }, 600);
        }
    }
    
    // Appliquer le traitement de recherche
    boutonRecherche.addEventListener('click', traiterRecherche);
    
    // Permettre la recherche avec la touche Entrée
    champRecherche.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            traiterRecherche.call(boutonRecherche);
        }
    });
    
    // Fonction pour animer les éléments au défilement
    function animerAuDefilement() {
        const elementsAAnimer = document.querySelectorAll('.animer-au-defilement');
        
        elementsAAnimer.forEach(element => {
            const position = element.getBoundingClientRect().top;
            const hauteurEcran = window.innerHeight;
            
            if (position < hauteurEcran * 0.8) {
                element.classList.add('visible');
            }
        });
    }
    
    // Appliquer l'animation au défilement si nécessaire
    window.addEventListener('scroll', animerAuDefilement);
    
    // Fonction pour gérer le clic sur le conteneur principal
    function naviguerVersMain(e) {
        // Permettre le focus sur les éléments interactifs sans redirection
        if (e.target.closest('.search-form') || e.target === champRecherche || e.target === boutonRecherche) {
            e.preventDefault();
            return;
        }
        
        // Ajouter un effet de transition avant la navigation
        document.body.classList.add('transition-sortie');
        
        // Délai court pour permettre l'animation
        setTimeout(() => {
            window.location.href = this.getAttribute('href');
        }, 300);
    }
    
    // Appliquer la navigation avec transition
    conteneurAccueil.addEventListener('click', naviguerVersMain);

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
});