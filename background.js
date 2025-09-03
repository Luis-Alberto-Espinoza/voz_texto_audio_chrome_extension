chrome.commands.onCommand.addListener((command) => {
  if (command === "leer_texto_seleccionado") {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {action: "read_selected_text"});
    });
  }
});