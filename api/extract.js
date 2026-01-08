import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export default async function handler(req, res) {
  // 1. Obtenemos la URL que nos manda la App Android
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Falta el parámetro ?url=' });
  }

  let browser = null;

  try {
    // 2. Lanzamos el Navegador (Configuración optimizada para Vercel)
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();

    // Bloqueamos imágenes y CSS para que cargue RAPIDÍSIMO
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });

    // 3. LA TRAMPA: Escuchamos el tráfico de red buscando el .m3u8
    let streamUrl = null;
    
    // Promesa que se resuelve cuando encontramos el link
    const searchPromise = new Promise((resolve) => {
      page.on('request', (request) => {
        const reqUrl = request.url();
        if (reqUrl.includes('.m3u8')) {
          streamUrl = reqUrl;
          resolve(reqUrl); // ¡Lo tenemos!
        }
      });
    });

    // 4. Navegamos a la página
    // Ponemos un timeout de 8 segundos para no pasarnos del límite de Vercel
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 8000 });

    // Esperamos a que aparezca el m3u8 o timeout
    // A veces hay que simular un click si el video no arranca solo
    try {
        // Intentamos esperar un poco a ver si sale la petición de red
        await Promise.race([
            searchPromise,
            new Promise(r => setTimeout(r, 5000)) // Esperar máximo 5s extra
        ]);
    } catch (e) {
        console.log("Timeout esperando red");
    }

    // 5. Devolvemos el resultado
    if (streamUrl) {
      // ÉXITO: Devolvemos el link y los headers necesarios
      res.status(200).json({
        found: true,
        streamUrl: streamUrl,
        headers: {
          "User-Agent": await browser.userAgent(),
          "Referer": url // La referencia es la página original
        }
      });
    } else {
      res.status(404).json({ found: false, error: "No se detectó stream m3u8" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}