//URL
const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let selectedCat = 0;

//funciones
let createLayout = (category, index, categories) => {
  let contents = document.getElementById("categories");
  if (index == 0) {
    contents.innerHTML = null;
  }
  let catBtn = document.createElement("input");

  catBtn.className = "btn btn-primary";
  catBtn.type = "button";
  catBtn.value = category.name;

  catBtn.addEventListener("click", () => {
    selectedCat = index;
    clearTable();
    categories[selectedCat].products.forEach(createCards);
    console.log("Clicked btn", selectedCat);
  });

  contents.appendChild(catBtn);
};

let createCards = (product, index, products) => {
  let cardHolder = document.getElementById("cardHolder");
  let card = document.createElement("div");
  card.className = "col-lg-3";
  card.innerHTML = `<div class="card" style="width: 18rem;">
    <img src="${product.image}" class="card-img-top" alt="Burger image">
    <div class="card-body">
      <h5 class="card-title">${product.name}</h5>
      <p class="card-text">${product.description}</p>
      <p class="card-text bold">$${product.price}</p>
      <a href="#" class="btn btn-primary" onClick="addProduct()">Add to cart</a>
    </div>
  </div>`;
  cardHolder.appendChild(card);
};

let clearTable = () => {
  let contents = document.getElementById("cardHolder");
  contents.innerHTML = null;
};

fetch(url)
  .then((response) => response.json())
  .then((categories) => {
    console.log(categories);
    categories.forEach(createLayout);
    categories[selectedCat].products.forEach(createCards);
  });

function addProduct() {
  let numProductos = document.getElementById("numProductos");
  numProductos.innerText = Number.parseInt(numProductos.innerText) + 1;
}
