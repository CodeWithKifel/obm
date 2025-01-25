async function buscarFilmes(titulo) {
  try {
    const url = `https://www.omdbapi.com/?s=${encodeURIComponent(
      titulo
    )}&apikey=af755445`;

    const resposta = await fetch(url);
    const dados = await resposta.json();

    if (dados.Response === "True") {
      // Filtra os filmes lançados após o ano 2000
      const filmesFiltrados = dados.Search.filter(
        (filme) => parseInt(filme.Year) > 2000
      );

      // Mapeia os filmes para exibir apenas título, ano e diretor
      const filmesMapeados = filmesFiltrados.map((filme) => ({
        titulo: filme.Title,
        ano: filme.Year,
        diretor: filme.Director || "Desconhecido",
        poster: filme.Poster,
        imdbID: filme.imdbID,
      }));

      return filmesMapeados;
    } else {
      throw new Error("Nenhum filme encontrado");
    }
  } catch (erro) {
    console.error("Erro ao buscar filmes:", erro);
  }
}

// Função para exibir filmes na tela
document
  .getElementById("buscar-filmes")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const filmes = await buscarFilmes(titulo);

    const listaFilmes = document.getElementById("lista-filmes");
    listaFilmes.innerHTML = "";

    if (filmes && filmes.length > 0) {
      filmes.forEach((filme) => {
        const li = document.createElement("li");
        li.innerHTML = `
                <img src="${filme.poster}" alt="${filme.titulo} Poster" class="poster">
                <div class="filme-info">
                    <h3>${filme.titulo} (${filme.ano})</h3>
                    <p><strong>Diretor:</strong> ${filme.diretor}</p
                    <a href="https://www.imdb.com/title/${filme.imdbID}" target="_blank">Ver no IMDb</a>
                </div>
            `;
        listaFilmes.appendChild(li);
      });
    } else {
      listaFilmes.innerHTML = "<li>Nenhum filme encontrado após 2000.</li>";
    }
  });
