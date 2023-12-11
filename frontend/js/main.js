

window.onload = async () => {
  const favoritas = JSON.parse(localStorage.getItem("favorites")) || []

const favoriteClick = (event, id) => {
  
  console.log(event.target);
  event.target.classList.toggle("fa-solid")
   event.target.classList.toggle("fa-regular")
  if (favoritas.includes(id)) {
    favoritas.splice(favoritas.indexOf(id),1)
  } else {
    favoritas.push(id)
  }
  localStorage.setItem('favorites', JSON.stringify(favoritas))
}

  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch
  try {
    
    const response =  await fetch('http://localhost:3031/api/movies')
    const result = await response.json()

    let data = result.data;

    data.forEach((movie) => {
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

      const favoriteLink = document.createElement("i")
      favoriteLink.style.display = "flex"
      favoriteLink.style.justifyContent = "center"
      favoriteLink.classList.add("fa-regular", "fa-heart")

      if (favoritas.includes(movie.id)) {
        favoriteLink.classList.remove("fa-regular", "fa-heart")
        favoriteLink.classList.add("fa-solid", "fa-heart")
      }

      favoriteLink.addEventListener("click", function(event){
        favoriteClick(event, movie.id)
      })

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
      h1.appendChild(favoriteLink)
    });

  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
};
