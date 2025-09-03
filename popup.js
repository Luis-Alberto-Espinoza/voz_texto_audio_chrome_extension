// Envia un mensaje al script de contenido para activar la interfaz
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "activate_interface"});
});

// --- Funcionalidad de Pestañas ---
const historyTabBtn = document.getElementById('history-tab-btn');
const settingsTabBtn = document.getElementById('settings-tab-btn');
const historyContent = document.getElementById('history-content');
const settingsContent = document.getElementById('settings-content');

historyTabBtn.addEventListener('click', () => {
    historyTabBtn.classList.add('active');
    settingsTabBtn.classList.remove('active');
    historyContent.classList.add('active');
    settingsContent.classList.remove('active');
    loadHistory();
});

settingsTabBtn.addEventListener('click', () => {
    settingsTabBtn.classList.add('active');
    historyTabBtn.classList.remove('active');
    settingsContent.classList.add('active');
    historyContent.classList.remove('active');
    loadSettings();
});

// --- Funcionalidad del Historial ---
const loadHistory = () => {
    chrome.storage.local.get(['history'], (result) => {
        const historyList = document.getElementById('history-list');
        historyList.innerHTML = '';
        const history = result.history || [];
        
        if (history.length === 0) {
            historyList.innerHTML = '<li id="no-history">No hay grabaciones en el historial.</li>';
        } else {
            history.reverse().forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${item.text}</strong><span class="date">${item.date}</span>`;
                historyList.appendChild(li);
            });
        }
    });
};

// --- Funcionalidad de Configuración ---
const voiceSelect = document.getElementById('voice-select');
const rateInput = document.getElementById('rate-input');
const rateValueSpan = document.getElementById('rate-value');
const volumeInput = document.getElementById('volume-input');
const volumeValueSpan = document.getElementById('volume-value');

// Cargar las opciones de voz
const loadVoices = () => {
  const voices = window.speechSynthesis.getVoices();
  voiceSelect.innerHTML = '';
  const spanishVoices = voices.filter(voice => voice.lang.startsWith('es'));
  spanishVoices.forEach(voice => {
    const option = document.createElement('option');
    option.textContent = voice.name;
    option.value = voice.name;
    voiceSelect.appendChild(option);
  });
  // Si no hay voces en español, muestra todas
  if (spanishVoices.length === 0) {
     voices.forEach(voice => {
       const option = document.createElement('option');
       option.textContent = voice.name;
       option.value = voice.name;
       voiceSelect.appendChild(option);
     });
  }
};

window.speechSynthesis.onvoiceschanged = loadVoices;

const loadSettings = () => {
  chrome.storage.local.get(['speechConfig'], (result) => {
    const config = result.speechConfig || { voiceName: '', rate: 1.0, volume: 1.0 };
    voiceSelect.value = config.voiceName || voiceSelect.options[0]?.value;
    rateInput.value = config.rate;
    rateValueSpan.textContent = config.rate;
    volumeInput.value = config.volume;
    volumeValueSpan.textContent = config.volume;
  });
};

const saveSettings = () => {
  const config = {
    voiceName: voiceSelect.value,
    rate: parseFloat(rateInput.value),
    volume: parseFloat(volumeInput.value)
  };
  chrome.storage.local.set({ speechConfig: config });
};

rateInput.addEventListener('input', () => {
    rateValueSpan.textContent = rateInput.value;
    saveSettings();
});
volumeInput.addEventListener('input', () => {
    volumeValueSpan.textContent = volumeInput.value;
    saveSettings();
});
voiceSelect.addEventListener('change', saveSettings);

// Carga inicial
document.addEventListener('DOMContentLoaded', () => {
    loadHistory();
    loadVoices();
    loadSettings();
});