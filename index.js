const { Builder, By, Key, until } = require("selenium-webdriver");
const fs = require("fs");

const texto_arquivo = fs.readFileSync("contatos.txt", "utf8");
const lista_contatos = texto_arquivo.split(",");

(async () => {
  let navegador = await new Builder().forBrowser("chrome").build();

  await navegador.get("https://web.whatsapp.com");

  await navegador.wait(until.elementLocated(By.className("_1jLYl")));

  console.log("Usuário logou.");

  for (contato_atual of lista_contatos) {
    let elementos_campo = await navegador.findElements(By.className("Er7QU"));
    let elemento_pesquisa = elementos_campo[0];

    await elemento_pesquisa.click();
    await elemento_pesquisa.sendKeys(contato_atual);

    await navegador.wait(
      until.elementLocated(By.xpath('//span[@title="' + contato_atual + '"]'))
    );

    await navegador.sleep(3000);

    let contato = await navegador.findElement(
      By.xpath('//span[@title="' + contato_atual + '"]')
    );
    await contato.click();

    await navegador.sleep(1000);

    let elementos_campo_mensagem = await navegador.findElements(
      By.className("_1awRl")
    );
    let campo_mensagem = elementos_campo_mensagem[1];
    await campo_mensagem.click();
    await campo_mensagem.sendKeys("Mensagem teste!");
    await campo_mensagem.sendKeys(Key.ENTER);
  }
})();
