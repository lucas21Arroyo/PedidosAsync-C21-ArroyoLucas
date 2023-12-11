const $ = id => document.getElementById(id)

window.onload = async () => {
    
    await movie()
}
let query = new URLSearchParams(location.search)
const movie = async () =>{ 
    
    try{
    
    const response = await fetch(`http://localhost:3031/api/movies/${query.get('movie')}`)
    const result = await response.json()
   
   $('id').value = result.data.id;
   $('title').value = result.data.title;
   $('rating').value = result.data.rating;
   $('awards').value = result.data.awards;
   if (result.data.release_date) {
    // Extraer solo la parte de la fecha
    const fechaSinTiempo = result.data.release_date.substring(0, 10);
    $('release_date').value = fechaSinTiempo;
}
   $('length').value = result.data.length;

    $('length').placeholder = result.data.length === null ? 'no tiene duracion' : '';

    console.log(result);
} catch (error) {
    console.log(error);
}
}


const createMovie = async() =>{
    try {
    const title =await $('title').value;
    const rating =await $('rating').value;
    const awards =await $('awards').value;
    const release_date =await $('release_date').value;
    const length =await $('length').value;
    const genre_id =await $('genre_id').value;
        
    const datosPelicula = {
        title: title,
        rating: rating,
        awards: awards,
        release_date: release_date,
        length: length,
        genre_id: genre_id
    };
    //console.log(datosPelicula);
    const response = await fetch('http://localhost:3031/api/movies/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosPelicula)
    });
    const result = await response.json();
    
    //console.log("------------------",result);
    } catch (error) {
        console.log(error);
    }
};

//LIMPIAR
$('clear').addEventListener('click',function(e){
    e.preventDefault()
    query.delete("movie")
    $('form').reset() 
});


//EDITAR
$('form').addEventListener('submit',async function (e){
    e.preventDefault()

        try {
            //console.log('Editar función ejecutada');
            const id = $('id').value;
            const title = $('title').value;
            const rating = $('rating').value;
            const awards = $('awards').value;
            const release_date = $('release_date').value;
            const length = $('length').value;
            
    
            const editMovie = {
                id: id,
                title: title,
                rating: rating,
                awards: awards,
                release_date: release_date,
                length: length,
            }
    
            const url = query.has("movie") ?`http://localhost:3031/api/movies/update/${id}` : `http://localhost:3031/api/movies/create`

            const response = await fetch(url, {
            method: query.has("movie") ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editMovie),
        });
            
            const result = await response.json();
            console.log(result);
            
        } catch (error) {
            console.log(error);
        }  
    });

//BORRAR
$('form').addEventListener('submit',async function (e){
    e.preventDefault()

    try {
        const id = $('id').value;

        const removeMovie = {id: id}

        const url = `http://localhost:3031/api/movies/delete/${id}`

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(removeMovie),
        });

        const result = await response.json();
        console.log(result);

    } catch (error) {
        console.log(error);
    }
});

query.set