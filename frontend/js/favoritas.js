window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch

  const favoritas = JSON.parse(localStorage.getItem("favorites")) || []
  console.log(favoritas);


  if (favoritas.length > 0) {
  
  try {
    
    const response =  await fetch('http://localhost:3031/api/movies')
    const {meta , data} = await response.json()

    //let data = result.data;

    const pelis = data.filter(peli => favoritas.includes(peli.id))

    pelis.forEach((movie) => {

     const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      const link = document.createElement("a");
      link.classList.add('ver')
      link.textContent = "ver mas"
      link.setAttribute('href',`formulario.html?movie=${movie.id}`)

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);
      card.appendChild(link);
    });

  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
} else {
  const error = document.createElement("h2");
  error.innerHTML = "No hay peliculas favoritas"
  container.appendChild(error);
}
};
