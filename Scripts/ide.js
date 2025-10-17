(function () {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function () {

        // DOM elements
        const termOut = document.getElementById('terminal-output');
        const termInput = document.getElementById('terminal-input');
        const termForm = document.getElementById('terminal-form');

        // Console functions for user feedback
        function ok(message) {
            console.log('✅ ' + message);
            if (termOut) {
                const line = document.createElement('div');
                line.className = 'terminal-line';
                line.style.color = '#4ade80';
                line.textContent = '✅ ' + message;
                termOut.appendChild(line);
                termOut.scrollTop = termOut.scrollHeight;
            }
        }

        function err(message) {
            console.error('❌ ' + message);
            if (termOut) {
                const line = document.createElement('div');
                line.className = 'terminal-line';
                line.style.color = '#f87171';
                line.textContent = '❌ ' + message;
                termOut.appendChild(line);
                termOut.scrollTop = termOut.scrollHeight;
            }
        }

        // Basic Git command simulation
        function executeGitCommand(command) {
            const cmd = command.trim().toLowerCase();
            const timestamp = new Date().toLocaleTimeString();

            if (cmd === 'git init' || cmd === 'init') {
                ok(`[${timestamp}] Repository Git initialisé`);
            } else if (cmd === 'git status' || cmd === 'status') {
                ok(`[${timestamp}] Sur la branche main\nAucun commit encore`);
            } else if (cmd === 'git add .' || cmd === 'add .') {
                ok(`[${timestamp}] Fichiers ajoutés à la zone de staging`);
            } else if (cmd.includes('git commit') || cmd.includes('commit')) {
                ok(`[${timestamp}] Commit créé avec succès`);
            } else if (cmd === 'git log' || cmd === 'log') {
                ok(`[${timestamp}] Historique des commits affiché`);
            } else if (cmd === 'clear') {
                termOut.innerHTML = '';
                return;
            } else {
                err(`[${timestamp}] Commande non reconnue: ${command}`);
            }
        }

        // Execute command on form submit
        if (termForm) {
            termForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const command = termInput.value.trim();
                if (command) {
                    executeGitCommand(command);
                    termInput.value = '';
                }
            });
        }

        // Quick command buttons
        document.querySelectorAll('[data-cmd]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                const command = btn.getAttribute('data-cmd');
                if (termInput) {
                    termInput.value = command;
                }
                executeGitCommand(command);
            });
        });

        // IDE Toolbar buttons
        const newFileBtn = document.getElementById('btn-new-file');
        const resetBtn = document.getElementById('btn-reset');
        const guidedToggle = document.getElementById('toggle-guided');

        // New file functionality
        if (newFileBtn) {
            newFileBtn.addEventListener('click', function () {
                const editorContainer = document.getElementById('pane-editor');
                const textarea = editorContainer.querySelector('textarea');
                if (textarea) {
                    textarea.value = '// Nouveau fichier\n// Commencez à coder ici\n\nconsole.log("Hello Git Zero!");';
                    textarea.focus();
                    ok('Nouveau fichier créé');
                }
            });
        }

        // Reset workspace functionality
        if (resetBtn) {
            resetBtn.addEventListener('click', function () {
                if (confirm('Êtes-vous sûr de vouloir réinitialiser l\'atelier ? Toutes les modifications seront perdues.')) {
                    // Reset editor
                    const editorContainer = document.getElementById('pane-editor');
                    const textarea = editorContainer.querySelector('textarea');
                    if (textarea) {
                        textarea.value = '// Votre code ici\nconsole.log("Hello Git!");';
                    }

                    // Reset terminal
                    if (termOut) {
                        termOut.innerHTML = '';
                    }

                    // Reset guided mode
                    if (guidedToggle) {
                        guidedToggle.checked = false;
                    }

                    // Reset progress
                    const guidedStep = document.getElementById('guided-step');
                    const guidedStepLabel = document.getElementById('guided-step-label');
                    const guidedBarFill = document.getElementById('guided-bar-fill');
                    if (guidedStep) guidedStep.textContent = '1/5';
                    if (guidedStepLabel) guidedStepLabel.textContent = '1/5';
                    if (guidedBarFill) guidedBarFill.style.width = '20%';

                    // Reset step cards
                    document.querySelectorAll('.guided-step-card').forEach(function (card) {
                        card.classList.remove('completed', 'active');
                        if (card.dataset.step === '1') {
                            card.classList.add('active');
                        }
                    });

                    ok('Atelier réinitialisé avec succès');
                }
            });
        }

        // Guided mode toggle
        if (guidedToggle) {
            guidedToggle.addEventListener('change', function () {
                if (this.checked) {
                    ok('Mode guidé activé - Suivez les étapes pour apprendre Git');
                    activatePane('pane-help');
                } else {
                    ok('Mode guidé désactivé');
                }
            });
        }

        // Advanced IDE modal
        const advBtn = document.getElementById('btn-advanced');
        const advBackdrop = document.getElementById('dialog-advanced-backdrop');
        const advCancel = document.getElementById('adv-cancel');
        const advContinue = document.getElementById('adv-continue');

        function openModal() {
            if (advBackdrop) {
                advBackdrop.style.display = 'flex';
                const continueBtn = document.getElementById('adv-continue');
                if (continueBtn) continueBtn.focus();
            }
        }

        function closeModal() {
            if (advBackdrop) {
                advBackdrop.style.display = 'none';
            }
        }

        if (advBtn) {
            advBtn.addEventListener('click', openModal);
        }
        if (advCancel) {
            advCancel.addEventListener('click', closeModal);
        }
        if (advBackdrop) {
            advBackdrop.addEventListener('click', function (e) {
                if (e.target === advBackdrop) closeModal();
            });
        }

        if (advContinue) {
            advContinue.addEventListener('click', function () {
                closeModal();

                err('Chargement de l\'IDE avancé...');

                // Try to load Monaco Editor using script tag
                const script = document.createElement('script');
                script.src = 'https://cdn.skypack.dev/monaco-editor@0.45.0';
                script.onload = function () {
                    ok('✓ Monaco Editor chargé');
                    initializeMonacoOnly(window.monaco);
                    ok('🎉 Éditeur Monaco activé !');
                    if (advBtn) {
                        advBtn.textContent = 'Monaco actif';
                        advBtn.disabled = true;
                    }
                };
                script.onerror = function () {
                    err('❌ Impossible de charger Monaco Editor');
                };
                document.head.appendChild(script);
            });
        }

        // Initialize just Monaco Editor (fallback)
        function initializeMonacoOnly(monaco) {
            return new Promise(function (resolve, reject) {
                try {
                    const editorContainer = document.getElementById('pane-editor');
                    const textarea = editorContainer.querySelector('textarea');
                    if (textarea) {
                        textarea.style.display = 'none';
                        const monacoEditor = monaco.editor.create(editorContainer, {
                            value: textarea.value || '// Votre code ici\nconsole.log("Hello Git!");',
                            language: 'javascript',
                            theme: 'vs-dark',
                            minimap: { enabled: false },
                            fontSize: 14,
                            lineNumbers: 'on',
                            roundedSelection: false,
                            scrollBeyondLastLine: false,
                            automaticLayout: true
                        });

                        // Sync with textarea for fallback
                        monacoEditor.onDidChangeModelContent(function () {
                            textarea.value = monacoEditor.getValue();
                        });

                        resolve();
                    } else {
                        reject(new Error('Container éditeur non trouvé'));
                    }
                } catch (error) {
                    reject(error);
                }
            });
        }

        // Mobile tabs switching
        const tabs = document.querySelectorAll('.ide-tab');
        function activatePane(id) {
            document.querySelectorAll('.pane').forEach(function (p) {
                p.style.display = (p.id === id ? '' : 'none');
            });
            tabs.forEach(function (t) {
                const active = t.getAttribute('aria-controls') === id;
                t.classList.toggle('active', active);
                t.setAttribute('aria-selected', active ? 'true' : 'false');
            });
        }

        tabs.forEach(function (t) {
            t.addEventListener('click', function () {
                activatePane(t.getAttribute('aria-controls'));
            });
        });

        // On mobile only, show one pane at a time; desktop shows all by CSS grid
        const mq = window.matchMedia('(max-width: 768px)');
        function onResize() {
            if (mq.matches) {
                activatePane('pane-editor');
            } else {
                document.querySelectorAll('.pane').forEach(function (p) {
                    p.style.display = '';
                });
            }
        }
        onResize();
        mq.addEventListener('change', onResize);

        // Copy/Clear
        const copyBtn = document.getElementById('btn-copy');
        const clearBtn = document.getElementById('btn-clear');

        if (copyBtn) {
            copyBtn.addEventListener('click', function () {
                if (termOut) {
                    const text = Array.from(termOut.querySelectorAll('.terminal-line'))
                        .map(function (n) { return n.textContent; })
                        .join('\n');
                    try {
                        navigator.clipboard.writeText(text).then(function () {
                            ok('Sortie copiée dans le presse-papiers.');
                        }).catch(function () {
                            err('Impossible de copier.');
                        });
                    } catch (e) {
                        err('Impossible de copier.');
                    }
                }
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', function () {
                if (termOut) {
                    termOut.innerHTML = '';
                }
            });
        }

        // Basic history + autocomplete
        const history = [];
        let historyIndex = -1;

        if (termInput) {
            termInput.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (history.length) {
                        historyIndex = Math.max(0, historyIndex === -1 ? history.length - 1 : historyIndex - 1);
                        termInput.value = history[historyIndex];
                    }
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (history.length) {
                        if (historyIndex >= history.length - 1) {
                            historyIndex = -1;
                            termInput.value = '';
                        } else {
                            historyIndex = historyIndex + 1;
                            termInput.value = history[historyIndex];
                        }
                    }
                } else if (e.key === 'Tab') {
                    e.preventDefault();
                    const known = ['git init', 'git status', 'git add .', 'git commit -m "init"', 'git log', 'clear'];
                    const val = termInput.value.trim();
                    const match = known.find(function (k) { return k.startsWith(val); });
                    if (match) termInput.value = match;
                }
            });
        }

        if (termForm) {
            termForm.addEventListener('submit', function () {
                if (termInput && termInput.value.trim()) {
                    history.push(termInput.value.trim());
                    historyIndex = -1;
                }
            });
        }

        // Initialize with welcome message
        ok('IDE Git Zero initialisé. Tapez "git init" pour commencer !');

    });

})();
