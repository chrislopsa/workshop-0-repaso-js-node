class Utilities {
    static async renderPage(data) {
            console.log(data);
            const $tableProducts = document.getElementById('products-list');
            data.slice(0,5).forEach(product => {
                $tableProducts.innerHTML += /*html*/`
                 <tr>
                    <td>${product.title}</td>
                    <td>${product.description}</td>
                    <td>${product.price}</td>
                    <td><img style="width:50px" src="${product.image}" alt="product"></td>
                 </tr>
                `;
            });

    }
} 



async function fetchApi(url){
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const executeApi = async ()=>{
    const data = await fetchApi('https://fakestoreapi.com/products');
    Utilities.renderPage(data);
};

executeApi();