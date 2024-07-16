
//obtenemos el elemento HTML por el 'id' y le agregamos un escuchador de eventos, cuando sucede el evento click se ejecuta la funcion 'fecthPosts'.
document.getElementById('fetch-posts').addEventListener('click', () => {
    fetchPosts();
});
//constante 'ftchPosts' que guarda una funcion para obtener de la url 'jsonplaceholder' la data a traves de una promesa y la peticion fetch.
const fetchPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    //despues de hacer la peticion y usando la propiedad '.ok' que devuelve un booleano, si la respuesta no es 'true' entra en el 'if' y pinta el mensaje de error junto con su estatus.
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            //en caso de que la respuesta sea positiva convertimos esos datos a formato json.
            return response.json();
        })
        //despues de haber obtenido los datos de manera exitosa y haberlos convertido a json ejecutamos la funcion anonima contenida en la constante 'displayPosts'.
        .then(posts => {
            displayPosts(posts);
        })
        //en caso de que la respuesa a la peticion sea negativa ejecutamo la funcion contenida en la cosntante  'displayError'.
        .catch(error => {
            displayError(error);
        });
};

const displayPosts = (posts) => {
    //obtenenemos el elemento HTML de id 'post-list'
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';
    
    posts.forEach(post => {
        //creamos un elemento 'li' por cada uno de los elementos de 'post' 
        const listItem = document.createElement('li');
        //agregamos a cada 'li' la palabra'title' y posteriormente cada uno de los titulos
        listItem.textContent = `Title: ${post.title}`;
        //agregamos cada uno al DOM como hijos del elemento 'postList'
        postList.appendChild(listItem);
    });
};
//obtenemos el elemento de id 'error-message', le agregamos el texto 'Error' y un mensaje de error, esta funcion se ejecutara cuando la peticion a la API no sea exitosa.
const displayError = (error) => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = `Error: ${error.message}`;
};


//generar id a partir de un closure
//metodos o propiedades privadas