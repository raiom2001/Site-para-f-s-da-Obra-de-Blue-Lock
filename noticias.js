const express = require('express');
const cors = require('cors');
const Parser = require('rss-parser');

const app = express();
const port = 4000;
const parser = new Parser();

// Middleware para permitir CORS
app.use(cors());

const rssUrl = 'https://news.google.com.br/rss/search?q=Blue+Lock';

app.get('/noticias', async (req, res) => {
  try {
    const feed = await parser.parseURL(rssUrl);

    // Filtrar ou processar as notícias conforme necessário
    const noticias = feed.items.map(item => ({
      title: item.title,
      link: item.link,
      contentSnippet: item.contentSnippet
    }));

    res.json(noticias); // Envia as notícias em formato JSON
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    res.status(500).send('Erro ao buscar notícias: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
