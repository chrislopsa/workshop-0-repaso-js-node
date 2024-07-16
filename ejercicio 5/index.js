
const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1500, stock: 10 },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, stock: 20 },
    { id: 3, name: 'Headphones', category: 'Electronics', price: 100, stock: 30 },
    { id: 4, name: 'T-shirt', category: 'Clothing', price: 20, stock: 50 },
    { id: 5, name: 'Jeans', category: 'Clothing', price: 50, stock: 40 },
    { id: 6, name: 'Sneakers', category: 'Clothing', price: 80, stock: 30 },
    { id: 7, name: 'Backpack', category: 'Accessories', price: 40, stock: 25 },
    { id: 8, name: 'Watch', category: 'Accessories', price: 60, stock: 20 },
    { id: 9, name: 'Sunglasses', category: 'Accessories', price: 30, stock: 35 }
];

function renderProducts(products){
    console.log(products);
    const $productsInfo = document.getElementById('products-container');

    $productsInfo.innerHTML = `
            <h2>Lista de Productos</h2>
            <table class='products-table'>
                <thead>
                    <tr>
                        <th>ID del producto</th>
                        <th>Nombre</th>
                        <th>Categoria</th>
                        <th>Precio</th>
                        <th>Cantidad disponible</th>
                    </tr>
                </thead>
                <tbody>
                    ${products.map(product => `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.category}</td>
                        <td>${product.price}</td>
                        <td>${product.stock}</td>
                    </tr>                  
                     `).join('')}
                </tbody>
            </table>`
}     
renderProducts(products);   

const $categoryFilterBtn = document.getElementById('get-category-products');

$categoryFilterBtn.addEventListener('click',()=>{
    
    const $categoryToFilter = document.getElementById('category-search').value;
    
    const $listadeProductos = products.filter(products => products.category === $categoryToFilter);
     renderProducts($listadeProductos);
})
const $nameFilterBtn = document.getElementById('get-name-products');

$nameFilterBtn.addEventListener('click',()=>{
    
    const $nameToFilter = document.getElementById('name-product-search').value;
    
    const $listadeProductos = products.find(product => product.name === $nameToFilter);
    const lista =[];
    lista.push($listadeProductos);
   renderProducts(lista);
})
document.getElementById('get-names-products').addEventListener('click',()=>{
    const $productsInfo = document.getElementById('products-container');
    const nuevaLista = products.map(product => {
        return product.name
    }
    )
    console.log(nuevaLista);
     $productsInfo.innerHTML = `
     ${nuevaLista.map(nameProduct=>`
        <p>${nameProduct}</p>
        `)}
     </div>
     `
})