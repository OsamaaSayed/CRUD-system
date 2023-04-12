//CRUD SYSTEM (Create, Read , Update , Delete)

let productName = document.getElementById('productName');
let productPrice = document.getElementById('productPrice');
let productCategory = document.getElementById('productCategory');
let productDescription = document.getElementById('productDescription');
let submitBtn = document.getElementById('submitBtn');
let searchInput = document.getElementById('searchInput')
let inputs = document.getElementsByClassName('form-control');
let nameAlert = document.getElementById('nameAlert');
let priceAlert = document.getElementById('priceAlert');
let categoryAlert = document.getElementById('categoryAlert');
let descriptionAlert = document.getElementById('descriptionAlert');
let products = [];
let currentIndex = 0;


//to check if the local storage has products to save and display it

if (JSON.parse(localStorage.getItem('productsList')) != null) {

    products = JSON.parse(localStorage.getItem('productsList'));
    displayData();
}


//For Validation to all inputs

productName.onkeyup = function () {

    let nameRejex = /^[A-z a-z]{3,20}$/;
    if (nameRejex.test(productName.value) == false) {

        submitBtn.disabled = 'true';
        productName.classList.add('is-invalid')
        productName.classList.remove('is-valid')
        nameAlert.classList.remove('d-none')
    }
    else {
        submitBtn.removeAttribute('disabled');
        productName.classList.add('is-valid');
        productName.classList.remove('is-invalid')
        nameAlert.classList.add('d-none')
    }
}

productPrice.onkeyup = function () {

    let nameRejex = /^[0-9]{1,7}$/;
    if (nameRejex.test(productPrice.value) == false) {

        submitBtn.disabled = 'true';
        productPrice.classList.add('is-invalid')
        productPrice.classList.remove('is-valid')
        priceAlert.classList.remove('d-none')
    }
    else {
        submitBtn.removeAttribute('disabled');
        productPrice.classList.add('is-valid');
        productPrice.classList.remove('is-invalid')
        priceAlert.classList.add('d-none')
    }
}

productCategory.onkeyup = function () {

    let nameRejex = /^[A-z a-z]{4,20}$/;
    if (nameRejex.test(productCategory.value) == false) {

        submitBtn.disabled = 'true';
        productCategory.classList.add('is-invalid')
        productCategory.classList.remove('is-valid')
        categoryAlert.classList.remove('d-none')
    }
    else {
        submitBtn.removeAttribute('disabled');
        productCategory.classList.add('is-valid');
        productCategory.classList.remove('is-invalid')
        categoryAlert.classList.add('d-none')
    }
}

productDescription.onkeyup = function () {

    let nameRejex = /^[A-z a-z]{4,20}$/;
    if (nameRejex.test(productDescription.value) == false) {

        submitBtn.disabled = 'true';
        productDescription.classList.add('is-invalid')
        productDescription.classList.remove('is-valid')
        descriptionAlert.classList.remove('d-none')
    }
    else {
        submitBtn.removeAttribute('disabled');
        productDescription.classList.add('is-valid');
        productDescription.classList.remove('is-invalid')
        descriptionAlert.classList.add('d-none')
    }
}


//Button to add or update product

submitBtn.onclick = function () {

    if (submitBtn.innerHTML == 'Add Product') {
        if (productName.value == '' | productPrice.value == '' | productDescription.value == '' | productCategory.value == '') {

            alert('YOU SHOULD FILL ALL INPUTS!')
        }
        else {
            addProduct();

        }

    }
    else {
        updateProduct();
    }

    displayData();
    clearForm();
}


// To add Products

function addProduct() {

    let product = {

        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        descreption: productDescription.value

    };

    products.push(product);
    localStorage.setItem('productsList', JSON.stringify(products));
};


// To display data in the table

function displayData() {

    let trs = '';

    for (let i = 0; i < products.length; i++) {

        trs += `<tr> 
        <td>${i + 1}</td>
        <td>${products[i].name}</td>
        <td>${products[i].price}</td>
        <td>${products[i].category}</td>
        <td>${products[i].descreption}</td>
        <td>
        <button onclick='getProductInfo(${i})' >
        <i class="far fa-edit"></i>
        </button>
        </td>
        <td>
        <button onclick='deleteProduct(${i})'>
        <i class="fas fa-trash"></i>
        </button>
        </td>
        </tr>`

    };

    document.getElementById('tableBody').innerHTML = trs;
};


//To clear all inputs after adding or updating the products

function clearForm() {

    for (let i = 0; i < inputs.length; i++) {

        inputs[i].value = '';

    };
};


//To delete the product 

function deleteProduct(index) {

    products.splice(index, 1);
    localStorage.setItem('productsList', JSON.stringify(products));
    displayData();
};



// Searching for products by name

searchInput.onkeyup = function () {

    let trs = '';
    let value = searchInput.value;
    for (let i = 0; i < products.length; i++) {

        if (products[i].name.toLowerCase().includes(value.toLowerCase())) {
            trs += `<tr> 
            <td>${i + 1}</td>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].category}</td>
            <td>${products[i].descreption}</td>
            <td><button onclick='updateProduct()' class='btn btn-warning'>Update</button></td>
            <td><button onclick='deleteProduct(${i})' class='btn btn-danger'>Delete</button></td>
            </tr>`

        };
    }
    document.getElementById('tableBody').innerHTML = trs;

}

//To update the products

function getProductInfo(index) {

    productName.value = products[index].name;
    productPrice.value = products[index].price;
    productCategory.value = products[index].category;
    productDescription.value = products[index].descreption;

    submitBtn.innerHTML = 'Update Product';
    submitBtn.className = 'btn btn-warning';

    currentIndex = index;
};

function updateProduct() {

    let product = {

        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        descreption: productDescription.value

    };

    products[currentIndex] = product;
    localStorage.setItem('productsList', JSON.stringify(products));
    submitBtn.innerHTML = 'Add Product';
    submitBtn.className = 'btn btn-success';
}