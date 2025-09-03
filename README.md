# Voz a Texto Plus

Esta es una extensión de Chrome que te permite convertir tu voz a texto en cualquier página web, y también leer en voz alta el texto que selecciones.

## Características

*   **Voz a Texto**: Activa el micrófono y dicta. El texto aparecerá en la interfaz y se copiará automáticamente a tu portapapeles.
*   **Texto a Voz**: Selecciona cualquier texto en una página web y presiona `Ctrl+Shift+S` para que la extensión lo lea en voz alta.
*   **Historial**: La extensión guarda un historial de tus dictados, que puedes ver en el popup de la extensión.
*   **Configuración**: Puedes cambiar la voz, la velocidad y el volumen de la lectura de texto a voz.

## Instalación

Para instalar esta extensión en tu navegador, sigue estos pasos:

1.  Abre Chrome y ve a `chrome://extensions/`.
2.  Activa el "Modo de desarrollador" en la esquina superior derecha.
3.  Haz clic en "Cargar descomprimida".
4.  Selecciona la carpeta del proyecto.

## Uso

### Voz a Texto

1.  Ve a cualquier página web.
2.  La interfaz flotante aparecerá a la derecha.
3.  Haz clic en "Iniciar" y empieza a hablar.
4.  Cuando termines, haz clic en "Detener". El texto se copiará a tu portapapeles.

### Texto a Voz

1.  Selecciona el texto que quieres que se lea en voz alta.
2.  Presiona `Ctrl+Shift+S`.

## Archivos del Proyecto

*   `manifest.json`: Define la configuración de la extensión.
*   `background.js`: Gestiona los comandos de la extensión.
*   `content_script.js`: Crea la interfaz de voz a texto y gestiona la lectura de texto a voz.
*   `popup.html`: La estructura del popup de la extensión.
*   `popup.js`: La lógica del popup (historial y configuración).
*   `style.css`: Los estilos para la interfaz.
