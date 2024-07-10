const express = require('express');
const app = express();
const parser = require('rss-parser');

const rssUrl = 'https://news.google.com.br/rss/search?q=Blue+Lock';

app.use(express.json());

app.get('/api/noticias', async (req, res) => {
  try {
    const feed = await parser.parseURL(rssUrl);
    const noticias = feed.items.map(item => ({
      title: item.title,
      link: item.link,
      contentSnippet: item.contentSnippet
    }));
    res.json(noticias);
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    res.status(500).send(`Erro ao buscar notícias: ${error.message}`);
  }
});

app.listen(() => {
  console.log('Servidor iniciado com sucesso!');
});
