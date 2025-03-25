const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

async function launchBrowser() {
    return await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
}

(async () => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  await page.goto("https://www.managerzone.com/?changesport=soccer");

  await page.waitForSelector('#login_username', { visible: true });
  await page.type('#login_username', 'jeep27');

  await page.waitForSelector('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll', { visible: true });
  await page.click('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');

  const password = process.env.PUPPETEER_PASSWORD;
  await page.waitForSelector('#login_password', { visible: true });
  await page.type('#login_password', password);

  await delay(2000);
  
  await page.click('#login');
    await page.waitForSelector('#mz_logo', { visible: true });

  await page.goto("https://www.managerzone.com/?p=players")

  await page.waitForSelector('#players_container', { visible: true });
  
  // Lista de IDs de jugadores a modificar
  const playersData = [
    {
        "nombre": "Svante Valrot",
        "id": 220526654,
        "trainBoost": "Intel.",
        "trainNormal": "Remates"
    },
    {
        "nombre": "Eumaios Zorbas",
        "id": 220290465,
        "trainBoost": "pases largos",
        "trainNormal": "remates"
    },
    {
        "nombre": "Gerardo Piqué",
        "id": 220611796,
        "trainBoost": "velocidad",
        "trainNormal": "pases"
    },
    {
        "nombre": "Veijo Väätäinen",
        "id": 220066853,
        "trainBoost": "Intel.",
        "trainNormal": "Cabeza"
    },
    {
        "nombre": "Aleksander Prus",
        "id": 221469696,
        "trainBoost": "Pases largos",
        "trainNormal": "cabeza"
    },
    {
        "nombre": "Carl Foermose",
        "id": 221665966,
        "trainBoost": "intel.",
        "trainNormal": "remates"
    },
    {
        "nombre": "Zé Paulo da Silveira",
        "id": 221111821,
        "trainBoost": "Velocidad",
        "trainNormal": "pases"
    },
    {
        "nombre": "Mister Trump",
        "id": 220684902,
        "trainBoost": "Intel.",
        "trainNormal": "pases largos"
    },
    {
        "nombre": "Dave Efrayim",
        "id": 221825427,
        "trainBoost": "pases",
        "trainNormal": "entradas"
    },
    {
        "nombre": "Diego Lopes",
        "id": 219883833,
        "trainBoost": "pases",
        "trainNormal": "pases largos"
    },
    {
        "nombre": "Sarbelio Calderon",
        "id": 228342149,
        "trainBoost": "velocidad",
        "trainNormal": "Remates"
    },
    {
        "nombre": "Misael Sigaran",
        "id": 217546233,
        "trainBoost": "Ctrl Balón",
        "trainNormal": "B. parado"
    },
    {
        "nombre": "Arnaldo Bastia",
        "id": 221422921,
        "trainBoost": "Intel.",
        "trainNormal": "pases"
    },
  ];

  const useTrainBoost = process.env.IS_TRAIN_BOOST === "true"; // Cambia a false para usar trainNormal

  for (const player of playersData) {
    const playerSpan = await page.$(`#player_id_${player.id}`);

    while (!playerSpan) { 
        // Hacer scroll gradual si el jugador aún no está cargado
        await page.evaluate(() => window.scrollBy(0, 300));
        await delay(500);
        playerSpan = await page.$(`#player_id_${player.id}`);
    }
    if (playerSpan) {
        await page.evaluate(el => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), playerSpan);
        await delay(500);
      const playerContainer = await playerSpan.evaluate(el => el.closest('div[id^="thePlayers_"]')?.id);
      if (playerContainer) {
        const mainContentSelector = `#${playerContainer} .mainContent`;
        await page.waitForSelector(mainContentSelector, { visible: true });
        
        const selectSelector = `${mainContentSelector} .training-attr-selector`;
        let isVisible = await page.evaluate(sel => {
          const el = document.querySelector(sel);
          return el && el.offsetParent !== null;
        }, selectSelector);
        
        if (!isVisible) {
          await page.evaluate(el => el.scrollIntoView(), playerSpan);
          await delay(500);
        }
        
        await page.waitForSelector(selectSelector, { visible: true });
        const selectedTraining = useTrainBoost ? player.trainBoost : player.trainNormal;
    
        await page.select(selectSelector, await page.evaluate((sel, training) => {
          const options = Array.from(document.querySelector(sel).options);
          return options.find(opt => opt.textContent.toLowerCase().includes(training.toLowerCase()))?.value;
        }, selectSelector, selectedTraining));
        console.log('listo: ', player.nombre);
        
        // Esperar a que el span dentro de .training-block deje de tener la clase 'loading'
        const trainingBlockSpanSelector = `#${playerContainer} .training-block .player-training-attribute`;
        await page.waitForFunction(selector => {
          const el = document.querySelector(selector);
          return el && !el.classList.contains('loading');
        }, {}, trainingBlockSpanSelector);
      }
    }
  }
  await browser.close();
})();
