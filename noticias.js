async function fetchNoticias() {
  try {
    const response = await fetch('https://organizadalock.vercel.app/noticias'); // Atualize para o URL do seu projeto Vercel
    if (!response.ok) {
      throw new Error('Erro na requisição: ' + response.statusText);
    }
    const noticias = await response.json();
    const noticiasContainer = document.getElementById('noticias');
    noticiasContainer.innerHTML = ''; // Limpa os resultados anteriores

    noticias.forEach(noticia => {
      const noticiaElement = document.createElement('div');
      noticiaElement.classList.add('noticia'); // Adiciona a classe 'noticia' para aplicar estilos CSS
      noticiaElement.innerHTML = `<h2>${noticia.title}</h2><p>${noticia.contentSnippet}</p><a href="${noticia.link}" target="_blank">Leia mais</a>`;
      noticiasContainer.appendChild(noticiaElement);
    });
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
  }
}

document.addEventListener('DOMContentLoaded', fetchNoticias);
