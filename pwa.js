// ==================== PWA LIFECYCLE ====================
function showUpdateToast() {
    var existing = document.querySelector('.update-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'update-toast';

    var label = document.createElement('span');
    label.textContent = 'Nova versão pronta para usar';

    var button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Reiniciar app';
    button.addEventListener('click', function() {
        window.location.reload();
    });

    toast.appendChild(label);
    toast.appendChild(button);
    document.body.appendChild(toast);

    setTimeout(function() {
        if (toast.parentNode) toast.remove();
    }, 20000);
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(function(reg) {
        reg.addEventListener('updatefound', function() {
            var newWorker = reg.installing;
            if (!newWorker) return;
            newWorker.addEventListener('statechange', function() {
                if (newWorker.state === 'activated' && navigator.serviceWorker.controller) {
                    showUpdateToast();
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
