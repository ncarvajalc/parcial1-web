//URL
const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

//Variables
let selectedCat = 0;
let selectedProducts = [];
let categoryNames = [];

//Funciones
let createLayout = (category, index, categories) => {
  let contents = document.getElementById("categories");
  let altCats = document.getElementById("altCats");
  altCats.className = "d-lg-none d-xl-none row";
  altCats.innerHTML = `<div class="col-2"></div>
  <div class="col-8 yellow"><div class="row">
    <div class="col-10" id="nholder">${categories[selectedCat].name}</div><div id="categoryChanger" class="col-2"><svg width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.9393 26.0607C11.5251 26.6464 12.4749 26.6464 13.0607 26.0607L22.6066 16.5147C23.1924 15.9289 23.1924 14.9792 22.6066 14.3934C22.0208 13.8076 21.0711 13.8076 20.4853 14.3934L12 22.8787L3.51472 14.3934C2.92893 13.8076 1.97918 13.8076 1.3934 14.3934C0.807612 14.9792 0.807612 15.9289 1.3934 16.5147L10.9393 26.0607ZM10.5 -1.02689e-09L10.5 25L13.5 25L13.5 1.02689e-09L10.5 -1.02689e-09Z" fill="black"/>
    </svg>
    </div>
  </div></div>
  <div class="col-2"></div>`;

  let categoryChanger = document.getElementById("categoryChanger");
  categoryChanger.addEventListener("click", () => {
    let nholder = document.getElementById("nholder");
    selectedCat = (selectedCat + 1) % categories.length;
    nholder.innerText = categories[selectedCat].name;
    clearTable();
    categories[selectedCat].products.forEach(createCards);
  });

  let catBtn = document.createElement("a");

  if (index == 0) {
    contents.innerHTML = null;
    catBtn.style.fontWeight = "bold";
    catBtn.style.textDecorationLine = "underline";
  }

  catBtn.className = "category";
  catBtn.innerText = category.name;
  categoryNames.push(category.name);

  selectedCategory.innerText = categories[selectedCat].name.toUpperCase();

  catBtn.addEventListener("click", () => {
    selectedCat = index;
    selectedCategory.innerText = categories[selectedCat].name.toUpperCase();
    clearTable();
    categories[selectedCat].products.forEach(createCards);
  });

  contents.appendChild(catBtn);
};

let createCards = (product) => {
  let cardHolder = document.getElementById("cardHolder");
  let card = document.createElement("div");
  card.className = "col-lg-3 col-12 padded";
  card.innerHTML = `<div class="card"><p>
    <img src="${product.image}" class="card-img-top" alt="image">
    </p>
    <div class="card-body">
      <h5 class="card-title">${product.name}</h5>
      <p class="card-text">${product.description}</p>
      <p class="card-text bold">$${product.price}</p>
    </div>
    <div class="add-place">

    </div>
  </div>`;
  let btnAddToCart = document.createElement("a");
  btnAddToCart.className = "btn btn-add";
  btnAddToCart.textContent = "Add to cart";

  btnAddToCart.addEventListener("click", () => {
    let productDetail = {
      description: product.name,
      unitPrice: product.price,
      quantity: 1,
    };

    let i = selectedProducts.findIndex(
      (pd) => pd.description === productDetail.description
    );

    if (i > -1) {
      selectedProducts[i].quantity += 1;
    } else {
      let numProductos = document.getElementById("numProductos");
      numProductos.innerText = `${
        Number.parseInt(numProductos.innerText.split(" ")[0]) + 1
      } items`;
      numProductos.hidden = false;
      selectedProducts.push(productDetail);
    }
  });

  let body = card.firstChild.firstChild.nextSibling.nextSibling;
  body.appendChild(btnAddToCart);
  cardHolder.appendChild(card);
};

let clearTable = () => {
  let contents = document.getElementById("cardHolder");
  contents.innerHTML = null;
};

//Carga de datos
fetch(url)
  .then((response) => response.json())
  .then((categories) => {
    categories.forEach(createLayout);
    categories[selectedCat].products.forEach(createCards);
  });

//Eventos
let carrito = document.getElementById("carrito");
carrito.addEventListener("click", () => {
  clearTable();
  paintProducts();
});

let paintProducts = () => {
  let contents = document.getElementById("cardHolder");
  //CASO MOVIL
  let orderDetail = document.createElement("div");
  orderDetail.className = "col-12 d-lg-none d-xl-none text-center ord";
  orderDetail.innerText = " ORDER DETAIL";

  contents.appendChild(orderDetail);

  let selectionMenu = document.createElement("div");
  selectionMenu.className = "col-12 d-lg-none d-xl-none selmenu";
  contents.appendChild(selectionMenu);

  selectedCategory.innerText = "ORDER DETAIL";
  let table = document.createElement("table");
  table.className = "table table-striped d-none d-lg-table";

  table.innerHTML = `
  <thead>
  <tr>
    <th class="theading" scope="col">Item</th>
    <th class="theading" scope="col">Qty.</th>
    <th class="theading" scope="col">Description</th>
    <th class="theading" scope="col">Unit price</th>
    <th class="theading" scope="col">Amount</th>
    <th class="theading" scope="col"><span class="bold">Modify</span></th>
  </tr>
</thead>
`;

  let tbody = document.createElement("tbody");
  table.appendChild(tbody);

  let totalPrice = 0;

  selectedProducts.forEach((product, index) => {
    let row2col = document.createElement("div");
    row2col.className = "row";
    let col1 = document.createElement("div");
    col1.className = "col-8 spacing";
    col1.innerText = `${product.quantity} ${product.description}`;

    let col2 = document.createElement("div");
    col2.className = "col-4 spacing";

    let plus2 = document.createElement("input");
    plus2.className = "btn btn-primary plus";
    plus2.type = "button";
    plus2.value = "+";
    let minus2 = document.createElement("input");
    minus2.className = "btn btn-primary minus";
    minus2.type = "button";
    minus2.value = "-";

    plus2.addEventListener("click", () => {
      product.quantity += 1;
      clearTable();
      paintProducts();
    });

    minus2.addEventListener("click", () => {
      product.quantity -= 1;
      clearTable();
      if (product.quantity <= 0) {
        selectedProducts = selectedProducts.filter((p) => {
          return p.quantity > 0;
        });
        let numProductos = document.getElementById("numProductos");
        numProductos.innerText = `${
          Number.parseInt(numProductos.innerText.split(" ")[0]) - 1
        } items`;
      }
      paintProducts();
    });

    col2.appendChild(plus2);
    col2.appendChild(minus2);

    row2col.appendChild(col1);
    row2col.appendChild(col2);
    selectionMenu.appendChild(row2col);

    let row = document.createElement("tr");
    if (index % 2 == 0) {
      row.className = "gray";
    } else {
      row.className = "white";
    }
    let uPrice = product.unitPrice * product.quantity;
    totalPrice += uPrice;
    row.innerHTML = `
    <td>${index + 1}</td>
    <td>${product.quantity}</td>
    <td>${product.description}</td>
    <td>${product.unitPrice}</td>
    <td>${uPrice}</td>
    `;
    let modifiers = document.createElement("td");

    let plus = document.createElement("input");
    plus.className = "btn btn-primary plus";
    plus.type = "button";
    plus.value = "+";
    let minus = document.createElement("input");
    minus.className = "btn btn-primary minus";
    minus.type = "button";
    minus.value = "-";

    plus.addEventListener("click", () => {
      product.quantity += 1;
      clearTable();
      paintProducts();
    });

    minus.addEventListener("click", () => {
      product.quantity -= 1;
      clearTable();
      if (product.quantity <= 0) {
        selectedProducts = selectedProducts.filter((p) => {
          return p.quantity > 0;
        });
        let numProductos = document.getElementById("numProductos");
        numProductos.innerText = `${
          Number.parseInt(numProductos.innerText.split(" ")[0]) - 1
        } items`;
      }

      paintProducts();
    });

    modifiers.appendChild(plus);
    modifiers.appendChild(minus);
    row.appendChild(modifiers);

    tbody.appendChild(row);
  });

  let totalOptns = document.createElement("div");
  totalOptns.className = "row";

  let total = document.createElement("div");
  total.className = "col-lg-8 col-12";
  total.innerHTML = `
  <p class="bold">
    Total: $${totalPrice}
  </p>`;

  let btns = document.createElement("div");
  btns.className = "col-lg-4 col-12 right";

  let cancelBtn = document.createElement("input");
  cancelBtn.className = "btn btn-primary cancel";
  cancelBtn.type = "button";
  cancelBtn.value = "Cancel";

  cancelBtn.addEventListener("click", () => {
    let mainContainer = document.getElementById("mainContainer");
    let floatConf = document.createElement("div");
    floatConf.innerHTML = `
    <h2 class="txt-cancel-order">
      Cancel the order
    </h2>
    <p class="r-u-sure">
    Are you sure about cancelling the order?
    </p>
    <div class="btn-cont"></div>`;

    let cancelBtn = document.createElement("input");
    cancelBtn.className = "btn btn-primary conf-2";
    cancelBtn.type = "button";
    cancelBtn.value = "Yes, I want to cancel the order";
    cancelBtn.addEventListener("click", () => {
      selectedProducts = [];
      clearTable();
      let numProductos = document.getElementById("numProductos");
      numProductos.innerText = "0 items";
      numProductos.hidden = true;
      floatConf.remove();
    });

    let confirmBtn = document.createElement("input");
    confirmBtn.className = "btn btn-primary cancel-2";
    confirmBtn.type = "button";
    confirmBtn.value = "No, I want to continue adding products";
    confirmBtn.addEventListener("click", () => {
      floatConf.remove();
    });

    floatConf.lastChild.appendChild(cancelBtn);
    let br = document.createElement("br");
    floatConf.lastChild.appendChild(br);
    floatConf.lastChild.appendChild(confirmBtn);
    floatConf.className = "floating";
    mainContainer.prepend(floatConf);
  });
  let confirmBtn = document.createElement("input");
  confirmBtn.className = "btn btn-primary conf";
  confirmBtn.type = "button";
  confirmBtn.value = "Confirm order";

  confirmBtn.addEventListener("click", () => {
    selectedProducts.forEach((product, index) => {
      product.item = index + 1;
    });
    console.log(selectedProducts);
    selectedProducts = [];
    clearTable();
    let numProductos = document.getElementById("numProductos");
    numProductos.hidden = true;
    numProductos.innerText = "0 items";
  });

  btns.appendChild(cancelBtn);
  btns.appendChild(confirmBtn);

  totalOptns.appendChild(total);
  totalOptns.appendChild(btns);

  contents.appendChild(table);
  contents.appendChild(totalOptns);
};

let selectedCategory = document.getElementById("selectedCategory");
