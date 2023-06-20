const productContainer = document.querySelector('.productsContainer');
const spinner = document.querySelector('.spinner');

const productObj = {
    price : '',
    productName: '',
    productDesc: '',
    category : '',
    getPrice : function getPrice() {
        return this.price;
    }
};
let productArry;
const cart = {
    totalprice : function getTotalPice() {
        let totalprice=0;
        cart.productList.forEach(element => {
            totalprice += element.getPrice();
        });
        cart.price = totalprice;
        return totalprice;
    },
    productList : [],
    nProducts : function getNumberOfProducts() {
        return this.productList.length + 1;
    },
};

// fetch API 
async function getProducts() {
    spinner.classList.toggle('d-none');
    try {
        const res = await fetch('https://fakestoreapi.com/products/');
        const data = await res.json();
        productArry = data;
        // console.log(productArry);
        showAllProducts();
        // return data;

    } catch (error) {
        console.log('failed to get Data');
    }
    finally{
        spinner.classList.toggle('d-none');
    }
}



getProducts();

// Show All products
function showAllProducts(params) {


    productArry.forEach(element => {
        productContainer.innerHTML += `
        <div class="card" style="width: 18rem;">
        <img src="${element.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.description}</p>
          <a href="#" class="btn btn-primary" onclick="addToCart(${element.id})">Add to Cart</a>
        </div>
      </div>    
        `;
      
    });
};


// Show products by category
function showProducts(category) {
    
};



// Add to Cart
function addToCart(productId) {
    productArry.forEach(element => {
        if (element.id === productId) {
            console.log('found product');
            element.getPrice = function getPrice() {
                return this.price;
            }
            // console.log(element);
            cart.productList.push(element);
            cart.totalprice();
            console.log(cart);
            // console.log(cart.totalprice());
        }
    });
}
