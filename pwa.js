// ==================== PWA LIFECYCLE ====================
function showUpdateToast() {
    var existing = document.querySelector('.update-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'update-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');

    var label = document.createElement('span');
    label.textContent = '🆕 Nova versão disponível';

    var button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Atualizar';
    button.addEventListener('click', function() {
        window.location.reload();
    });

    var dismiss = document.createElement('button');
    dismiss.type = 'button';
    dismiss.className = 'update-toast-dismiss';
    dismiss.setAttribute('aria-label', 'Dispensar');
    dismiss.textContent = '✕';
    dismiss.addEventListener('click', function() {
        toast.classList.add('update-toast-hiding');
        setTimeout(function() { if (toast.parentNode) toast.remove(); }, 300);
    });

    toast.appendChild(label);
    toast.appendChild(button);
    toast.appendChild(dismiss);
    document.body.appendChild(toast);

    // Auto-dismiss after 30s
    setTimeout(function() {
        if (toast.parentNode) {
            toast.classList.add('update-toast-hiding');
            setTimeout(function() { if (toast.parentNode) toast.remove(); }, 300);
        }
    }, 30000);
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(function(reg) {
        reg.addEventListener('updatefound', function() {
            var newWorker = reg.installing;
            if (!newWorker) return;
            newWorker.addEventListener('statechange', function() {
                if (newWorker.state === 'activated') {
                    // Show toast on update (controller exists = not first install)
                    // Also show on first activated if page was refreshed
                    if (navigator.serviceWorker.controller || performance.navigation.type === 1) {
                        showUpdateToast();
                    }
                }
            });
        });
    }).catch(function(err) { console.warn('SW:', err); });
}

// Show actual cache version in settings.
function updateAppVersion() {
    var el = document.getElementById('appVersion');
    if (!el) return;
    if ('caches' in window) {
        caches.keys().then(function(names) {
            var ver = names.find(function(n) { return n.startsWith('viagem-eua-2027-v'); });
            if (ver) el.textContent = 'EUA 2027 PWA — cache ' + ver.replace('viagem-eua-2027-', '');
        }).catch(function() {});
    }
}
updateAppVersion();
