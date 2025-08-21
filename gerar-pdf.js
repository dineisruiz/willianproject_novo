// Script Node.js para gerar PDF de uma página HTML
// Requer instalação do pacote puppeteer: npm install puppeteer

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Altere o caminho abaixo para o seu arquivo local
  await page.goto('file:///C:/Projetos/Willian/Index.html', {waitUntil: 'networkidle0'});
  await page.pdf({
    path: 'pagina-willian.pdf',
    format: 'A4',
    printBackground: true
  });
  await browser.close();
  console.log('PDF gerado: pagina-willian.pdf');
})();
