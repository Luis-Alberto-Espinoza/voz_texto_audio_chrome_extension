// Variable global para evitar que la interfaz se cree varias veces
let isInterfaceActive = false;

// La función que contiene toda la lógica de la interfaz y la funcionalidad
const init = () => {
    if (isInterfaceActive) {
        return;
    }
    isInterfaceActive = true;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.error('❌ Lo siento, tu navegador no es compatible con la Web Speech API.');
        return;
    }

    // --- 1. CREACIÓN Y ESTILOS DE LOS ELEMENTOS ---
    const container = document.createElement('div');
    container.id = 'voz-a-texto-plus-container';

    Object.assign(container.style, {
        position: 'fixed',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: '99999',
        transition: 'all 0.3s ease',
        fontFamily: 'Arial, sans-serif'
    });

    const mainContainer = document.createElement('div');
    Object.assign(mainContainer.style, {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '10px',
        padding: '10px 0 0 0', // Solo padding superior
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    });


    const btnContainer = document.createElement('div');
    Object.assign(btnContainer.style, {
        display: 'flex',
        width: '100%',
        gap: '0' // Sin espacio entre los botones
    });

    const startBtn = document.createElement('button');
    const stopBtn = document.createElement('button');
    const toggleBtn = document.createElement('button');
    const outputArea = document.createElement('textarea');

    // Definimos estilos base para los botones
    const buttonStyle = {
        // padding: '10px 20px',
        fontSize: '15px',
        fontWeight: 'bold',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease'
    };

    // Definimos los estilos para el estado minimizado
    const miniBtnStyle = {
        ...buttonStyle,
        width: '18px',
        height: '18px',
        // padding: '0',
        borderRadius: '5px'
    };

    // Asignamos los estilos y contenido a los botones
    Object.assign(startBtn.style, buttonStyle, {
        backgroundColor: '#4CAF50',
        color: 'white',
        flex: '1', // Ocupa todo el espacio posible
        margin: '0' // Sin margen
    });


    Object.assign(stopBtn.style, buttonStyle, {
        backgroundColor: '#f44336',
        color: 'white',
        flex: '1', // Ocupa todo el espacio posible
        margin: '0' // Sin margen
    });

    Object.assign(toggleBtn.style, buttonStyle, { backgroundColor: '#5c6770', color: 'white' });

    // El texto y los iconos se eliminan en el estado minimizado
    startBtn.textContent = '🎙️ Iniciar';
    stopBtn.textContent = '⏹️ Detener';
    toggleBtn.textContent = '—';

    Object.assign(outputArea.style, { width: '250px', height: '100px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '14px', resize: 'none' });
    stopBtn.disabled = true;
    mainContainer.appendChild(outputArea);
    mainContainer.appendChild(btnContainer);
    btnContainer.appendChild(startBtn);
    btnContainer.appendChild(stopBtn);

    container.appendChild(toggleBtn);
    container.appendChild(mainContainer);

    document.body.appendChild(container);

    // --- 2. IMPLEMENTACIÓN DE LA FUNCIONALIDAD ---
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.continuous = true;
    recognition.interimResults = true;

    let finalTranscript = '';
    // Variable global para evitar que la interfaz se cree varias veces
let isInterfaceActive = false;

// La función que contiene toda la lógica de la interfaz y la funcionalidad
const init = () => {
    if (isInterfaceActive) {
        return;
    }
    isInterfaceActive = true;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.error('❌ Lo siento, tu navegador no es compatible con la Web Speech API.');
        return;
    }

    // --- 1. CREACIÓN DE LOS ELEMENTOS ---
    const container = document.createElement('div');
    container.id = 'voz-a-texto-plus-container';

    const mainContainer = document.createElement('div');
    mainContainer.className = 'main-container';

    const btnContainer = document.createElement('div');
    btnContainer.className = 'btn-container';

    const startBtn = document.createElement('button');
    startBtn.className = 'btn start-btn';
    const stopBtn = document.createElement('button');
    stopBtn.className = 'btn stop-btn';
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'btn toggle-btn';
    const outputArea = document.createElement('textarea');

    startBtn.textContent = '🎙️ Iniciar';
    stopBtn.textContent = '⏹️ Detener';
    toggleBtn.textContent = '—';

    stopBtn.disabled = true;
    mainContainer.appendChild(outputArea);
    mainContainer.appendChild(btnContainer);
    btnContainer.appendChild(startBtn);
    btnContainer.appendChild(stopBtn);

    container.appendChild(toggleBtn);
    container.appendChild(mainContainer);

    document.body.appendChild(container);

    // --- 2. IMPLEMENTACIÓN DE LA FUNCIONALIDAD ---
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.continuous = true;
    recognition.interimResults = true;

    let finalTranscript = '';
    const punctuationCommands = { 'punto': '.', 'coma': ',', 'punto y coma': ';', 'dos puntos': ':', 'punto aparte': '' };

    const saveToHistory = (text) => {
        if (!text.trim()) return;
        chrome.storage.local.get(['history'], (result) => {
            let history = result.history || [];
            history.push({ text: text, date: new Date().toLocaleString() });
            chrome.storage.local.set({ history: history });
        });
    };

    const updateInterface = (isMinimized) => {
        if (isMinimized) {
            mainContainer.style.display = 'none';
            toggleBtn.textContent = '➕';
        } else {
            mainContainer.style.display = 'flex';
            toggleBtn.textContent = '—';
        }
    };

    let isMinimized = false;
    updateInterface(isMinimized);

    toggleBtn.addEventListener('click', () => {
        isMinimized = !isMinimized;
        updateInterface(isMinimized);
    });

    startBtn.addEventListener('click', () => {
        finalTranscript = '';
        outputArea.value = '';
        recognition.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
        startBtn.textContent = '🔴 Escuchando...';
    });

    stopBtn.addEventListener('click', async () => {
        recognition.stop();
    });

    recognition.onstart = () => {
        outputArea.placeholder = 'Habla ahora...';
    };

    recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            let transcript = event.results[i][0].transcript;
            for (const cmd in punctuationCommands) {
                if (transcript.toLowerCase().includes(cmd)) {
                    transcript = transcript.replace(new RegExp(cmd, 'gi'), punctuationCommands[cmd]);
                }
            }
            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }
        outputArea.value = finalTranscript + interimTranscript;
    };


    recognition.onend = async () => {
        startBtn.disabled = false;
        stopBtn.disabled = true;
        startBtn.textContent = '🎙️ Iniciar';
        outputArea.placeholder = 'El texto aparecerá aquí...';

        // Ahora, la lógica de guardado y copiado se ejecuta aquí
        if (finalTranscript.trim().length > 0) {
            saveToHistory(finalTranscript);
            try {
                await navigator.clipboard.writeText(finalTranscript.trim());
            } catch (err) {
                console.error('Error al copiar el texto: ', err);
            }
        }
    };

    recognition.onerror = (event) => {
        startBtn.disabled = false;
        stopBtn.disabled = true;
        startBtn.textContent = '🎙️ Iniciar';
        outputArea.value = '❌ Error: ' + event.error;
    };

    // --- Nueva funcionalidad: Texto a Voz ---
    const readSelectedText = (config) => {
        const text = window.getSelection().toString().trim();
        if (text === '') {
            console.log('No hay texto seleccionado para leer.');
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();

        if (config.voiceName) {
            const selectedVoice = voices.find(voice => voice.name === config.voiceName);
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }
        }
        utterance.rate = config.rate;
        utterance.volume = config.volume;

        window.speechSynthesis.speak(utterance);
    };

    chrome.runtime.onMessage.addListener((request) => {
        if (request.action === "activate_interface") {
            // No hacemos nada, ya que la interfaz se crea automáticamente
        } else if (request.action === "read_selected_text") {
            chrome.storage.local.get(['speechConfig'], (result) => {
                const config = result.speechConfig || { voiceName: '', rate: 1.0, volume: 1.0 };
                readSelectedText(config);
            });
        }
    });
}; // Se cierra la función init aquí

// Activa la interfaz en la carga inicial de la página
init();


    const saveToHistory = (text) => {
        if (!text.trim()) return;
        chrome.storage.local.get(['history'], (result) => {
            let history = result.history || [];
            history.push({ text: text, date: new Date().toLocaleString() });
            chrome.storage.local.set({ history: history });
        });
    };

    const updateInterface = (isMinimized) => {
        if (isMinimized) {
            outputArea.style.display = 'none';
            mainContainer.style.padding = '10px 0 0 0'; // Solo padding superior
            toggleBtn.textContent = '➕';
            Object.assign(startBtn.style, { ...miniBtnStyle, backgroundColor: '#4CAF50', margin: '0' });
            Object.assign(stopBtn.style, { ...miniBtnStyle, backgroundColor: '#f44336', margin: '0' });
            startBtn.textContent = '';
            stopBtn.textContent = '';
        } else {
            outputArea.style.display = 'block';
            mainContainer.style.padding = '10px 0 0 0'; // Solo padding superior
            toggleBtn.textContent = '—';
            Object.assign(startBtn.style, buttonStyle, { backgroundColor: '#4CAF50', color: 'white', flex: '1', margin: '0' });
            Object.assign(stopBtn.style, buttonStyle, { backgroundColor: '#f44336', color: 'white', flex: '1', margin: '0' });
            startBtn.textContent = '🎙️ Iniciar';
            stopBtn.textContent = '⏹️ Detener';
        }
    };

    let isMinimized = true;
    updateInterface(isMinimized);

    toggleBtn.addEventListener('click', () => {
        isMinimized = !isMinimized;
        updateInterface(isMinimized);
    });

    startBtn.addEventListener('click', () => {
        finalTranscript = '';
        outputArea.value = '';
        recognition.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
        startBtn.textContent = '🔴 Escuchando...';
    });

    stopBtn.addEventListener('click', async () => {
        recognition.stop();

    });

    recognition.onstart = () => {
        outputArea.placeholder = 'Habla ahora...';
    };

    recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            let transcript = event.results[i][0].transcript;
            for (const cmd in punctuationCommands) {
                if (transcript.toLowerCase().includes(cmd)) {
                    transcript = transcript.replace(new RegExp(cmd, 'gi'), punctuationCommands[cmd]);
                }
            }
            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }
        outputArea.value = finalTranscript + interimTranscript;
    };


    recognition.onend = async () => {
        startBtn.disabled = false;
        stopBtn.disabled = true;
        startBtn.textContent = '🎙️ Iniciar';
        outputArea.placeholder = 'El texto aparecerá aquí...';

        // Ahora, la lógica de guardado y copiado se ejecuta aquí
        if (finalTranscript.trim().length > 0) {
            saveToHistory(finalTranscript);
            try {
                await navigator.clipboard.writeText(finalTranscript.trim());
            } catch (err) {
                console.error('Error al copiar el texto: ', err);
            }
        }
    };

    recognition.onerror = (event) => {
        startBtn.disabled = false;
        stopBtn.disabled = true;
        startBtn.textContent = '🎙️ Iniciar';
        outputArea.value = '❌ Error: ' + event.error;
    };

    // --- Nueva funcionalidad: Texto a Voz ---
    const readSelectedText = (config) => {
        const text = window.getSelection().toString().trim();
        if (text === '') {
            console.log('No hay texto seleccionado para leer.');
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();

        if (config.voiceName) {
            const selectedVoice = voices.find(voice => voice.name === config.voiceName);
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }
        }
        utterance.rate = config.rate;
        utterance.volume = config.volume;

        window.speechSynthesis.speak(utterance);
    };

    chrome.runtime.onMessage.addListener((request) => {
        if (request.action === "activate_interface") {
            // No hacemos nada, ya que la interfaz se crea automáticamente
        } else if (request.action === "read_selected_text") {
            chrome.storage.local.get(['speechConfig'], (result) => {
                const config = result.speechConfig || { voiceName: '', rate: 1.0, volume: 1.0 };
                readSelectedText(config);
            });
        }
    });
}; // Se cierra la función init aquí

// Activa la interfaz en la carga inicial de la página
init();