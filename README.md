# MzPrivateScripts

## Requisitos para ejecutar el script de forma local

### Requisitos generales
1. **Node.js**: Asegúrate de tener Node.js instalado en tu computadora. Se recomienda la versión 18 o superior.
2. **NPM**: Viene incluido con Node.js. Asegúrate de que esté disponible.
3. **Google Chrome**: El script utiliza Puppeteer, que requiere Google Chrome o Chromium instalado en tu sistema.
4. **Acceso a Internet**: El script necesita conectarse a la página de ManagerZone.

### Requisitos específicos para cada sistema operativo

#### En macOS
- **Homebrew** (opcional): Puedes instalar Node.js y otras herramientas fácilmente con Homebrew.
- **Comando para instalar Node.js**:  
  ```sh
  brew install node
  ```

#### En Windows
- Descarga e instala Node.js desde [nodejs.org](https://nodejs.org/).
- Asegúrate de que las variables de entorno estén configuradas correctamente para que `node` y `npm` sean accesibles desde la terminal.

---

## Cómo ejecutar el script de forma local

### Paso 1: Clonar el repositorio
Clona este repositorio en tu computadora:
```sh
git clone <URL_DEL_REPOSITORIO>
cd MzPrivateScripts
```

### Paso 2: Instalar dependencias
Ejecuta el siguiente comando para instalar las dependencias necesarias:
```sh
npm install
```

### Paso 3: Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables:
```env
USER_PASSWORD=tu_contraseña_de_managerzone
IS_TRAIN_BOOST=true # Cambia a false si deseas desactivar el boost
```

### Paso 4: Ejecutar el script
Para ejecutar el script, utiliza el siguiente comando:
```sh
node boostTrainingChange.js
```

### Paso 5: Verificar resultados
- Si el script se ejecuta correctamente, verás un resumen en la consola con los jugadores actualizados y los errores (si los hay).
- En caso de error, se generará una captura de pantalla en el directorio del proyecto con el prefijo `error-screenshot`.

---

## Notas importantes
- **Archivo de jugadores**: Asegúrate de que el archivo `playersData.json` esté correctamente configurado con los datos de los jugadores.
- **Modo headless**: El script se ejecuta en modo headless (sin interfaz gráfica). Si deseas ver el navegador en acción, cambia `headless: true` a `headless: false` en el archivo `boostTrainingChange.js`.
- **Permisos**: En macOS y Linux, puede ser necesario otorgar permisos de ejecución al script:
  ```sh
  chmod +x boostTrainingChange.js
  ```

---

## Cómo ejecutar el script en tu propio perfil de GitHub

Este repositorio es público, puedes clonarlo y configurarlo para ejecutarlo en tu propio perfil de GitHub. A continuación, se detallan los pasos:

---

### Paso 1: Hacer un fork del repositorio
1. Ve a la página del repositorio en GitHub.
2. Haz clic en el botón **Fork** en la esquina superior derecha para crear una copia del repositorio en tu cuenta de GitHub.

---

### Paso 2: Clonar el repositorio en tu computadora
1. Copia la URL de tu fork del repositorio.
2. Abre una terminal y ejecuta:
   ```sh
   git clone <URL_DE_TU_FORK>
   cd MzPrivateScripts
   ```

---

### Paso 3: Configurar las variables de entorno en GitHub
1. Ve a la página de tu fork en GitHub.
2. Haz clic en **Settings** > **Secrets and variables** > **Actions**.
3. Crea los siguientes **Secrets**:
   - `USER_PASSWORD`: Tu contraseña de ManagerZone.
4. Crea las siguientes **Variables**:
   - `IS_TRAIN_BOOST`: Define `true` o `false` según el modo de entrenamiento que desees usar.

---

### Paso 4: Configurar los workflows
1. Los workflows ya están configurados en los archivos `.github/workflows/workflow-boost-true.yml` y `.github/workflows/workflow-boost-false.yml`.
2. Estos workflows se ejecutarán automáticamente según los horarios definidos en el archivo `.yml` o manualmente desde la pestaña **Actions** en tu repositorio.

---

### Paso 5: Ejecutar el workflow manualmente (opcional)
1. Ve a la pestaña **Actions** en tu repositorio.
2. Selecciona el workflow que deseas ejecutar (`Run Puppeteer with Boost True` o `Run Puppeteer with Boost False`).
3. Haz clic en **Run workflow** y sigue las instrucciones.

---

### Paso 6: Verificar resultados
- Los resultados del script se mostrarán en los logs de la ejecución del workflow en la pestaña **Actions**.
- Si ocurre un error, se generará una captura de pantalla que se subirá como un artefacto descargable en la misma pestaña.

---

## Notas importantes
- **Archivo de jugadores**: Asegúrate de que el archivo `playersData.json` esté correctamente configurado con los datos de los jugadores.
- **Modo headless**: El script se ejecuta en modo headless (sin interfaz gráfica). Si deseas modificar este comportamiento, edita el archivo `boostTrainingChange.js`.