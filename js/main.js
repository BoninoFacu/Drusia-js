let cartArr = [];

const cart = document.getElementById("cart");

const total = document.getElementById("total");

const burgerIcon = document.querySelector(".brgIcon");
const links = document.querySelector(".menuLinks");
const barrs = document.querySelectorAll(".brgIcon span");

let totalCart = 0;

function modeloAro(name, price, img) {
    this.name = name;
    this.price = price;
    this.img = img;
}

// Eventos
burgerIcon.addEventListener("click", () => {
    links.classList.toggle("activate"); // activa el menu
    barrs.forEach((child) => {
        child.classList.toggle("animate");
    });
});

function cartClass() {
    if (document.querySelector(".carrito").classList.contains("carritoOn")) {
        document.querySelector(".carrito").classList.remove("carritoOn");
    } else document.querySelector(".carrito").classList.add("carritoOn");
}

// Arrays
const aros = [];
// Precio de cada arito llamado por el nombre de modelo
const grata = new modeloAro("Grata", 750, "./assets/Grata.webp");
const mirna = new modeloAro("Mirna", 350, "./assets/Mirna.webp");
const ines = new modeloAro("Ines", 600, "./assets/Ines.webp");
const acucia = new modeloAro("Acucia", 500, "./assets/Acucia.webp");
const sulpicia = new modeloAro("Sulpicia", 550, "./assets/Sulpicia.webp");
// Push Arrays
aros.push(grata);
aros.push(mirna);
aros.push(ines);
aros.push(acucia);
aros.push(sulpicia);
// Orden Arrays
aros.sort(function (a, b) {
    if (a.name > b.name) {
        return 1;
    }
    if (a.name < b.name) {
        return -1;
    }
    return 0;
});

const listaProductos = document.getElementById("products");

aros.forEach((aro) => {
    listaProductos.innerHTML += `
                                <div class="product">
                                    <img src="${aro.img}" alt="" width="100%">
                                    <h3>${aro.name}</h3>
                                    <h5>$${aro.price}</h5>
                                    <div>
                                        <button onclick="addCart('${aro.name}','${aro.price}','${aro.img}')" class="formButton">Agregar</button>
                                    </div>
                                </div>
                            `;
});

function localCart() {
    cartArr = JSON.parse(localStorage.getItem("cart"));
    cartArr.map((data, i) => {
        cart.innerHTML += `
                            <div class="prod-cart">
                                <div>
                                    <img src="${data.img}" width="100%">
                                </div>
                                <div>
                                    <p>${data.name}</p>
                                    <p>$${data.price}</p>
                                    <div class="cantCartItem">
                                        <img src="./assets/menos.png" onclick="sub1ToCart(cant${i},${i})" width="25px" class="mr-2">
                                        <p id="cant${i}" style="margin:0">${data.cant}</p>
                                        <img src="./assets/boton-mas.png" onclick="add1ToCart(cant${i},${i})" width="25px" class="ml-2">
                                    </div>
                                </div>
                                <div>
                                    <img src="./assets/remove.png" width="35px" onclick="removeCart(${i})" style="cursor:pointer;">
                                </div>
                            </div>
        `;
    });

    totalPrice(JSON.parse(localStorage.getItem("cart")), total);
}

localCart();

function addCart(name, price, img) {
    const obj = {
        name: name,
        price: price,
        img: img,
        cant: 1,
    };
    if (cartArr.length === 0) {
        cartArr.push(obj);
        cartArr.map((data, i) => {
            cart.innerHTML += `
                            <div class="prod-cart">
                                <div>
                                    <img src="${data.img}" width="100%">
                                </div>
                                <div>
                                    <p>${data.name}</p>
                                    <p>$${data.price}</p>
                                    <div class="cantCartItem">
                                        <img src="./assets/menos.png" onclick="sub1ToCart(cant${i},${i})" width="25px" class="mr-2">
                                        <p id="cant${i}" style="margin:0">${data.cant}</p>
                                        <img src="./assets/boton-mas.png" onclick="add1ToCart(cant${i},${i})" width="25px" class="ml-2">
                                    </div>
                                </div>
                                <div>
                                    <img src="./assets/remove.png" width="35px" onclick="removeCart(${i})" style="cursor:pointer;">
                                </div>
                            </div>
            `;
        });
        btncompraOnOff();
    } else if (cartArr.find((el) => el.name === obj.name)) {
        alert("El producto ya se encuentra en el carrito");
    } else {
        cartArr.push(obj);
        if (cart.length != 0) {
            cart.innerHTML = "";
            cartArr.map((data, i) => {
                cart.innerHTML += `
                            <div class="prod-cart">
                                <div>
                                    <img src="${data.img}" width="100%">
                                </div>
                                <div>
                                    <p>${data.name}</p>
                                    <p>$${data.price}</p>
                                    <div class="d-flex justify-content-center align-items-center">
                                        <img src="./assets/menos.png" onclick="sub1ToCart(cant${i},${i})" width="25px" class="mr-2">
                                        <p id="cant${i}" style="margin:0">${data.cant}</p>
                                        <img src="./assets/boton-mas.png" onclick="add1ToCart(cant${i},${i})" width="25px" class="ml-2">
                                    </div>
                                </div>
                                <div>
                                    <img src="./assets/remove.png" width="35px" onclick="removeCart(${i})" style="cursor:pointer;">
                                </div>
                            </div>
                `;
            });
        }
    }

    localStorage.setItem("cart", JSON.stringify(cartArr));
    totalPrice(JSON.parse(localStorage.getItem("cart")), total);

    displayCartEver();
}

function removeCart(el) {
    if (cart.childNodes.length > 3) {
        cartArr.splice(el, 1);
        localStorage.clear();
        localStorage.setItem("cart", JSON.stringify(cartArr));
        totalPrice(JSON.parse(localStorage.getItem("cart")), total);
        cart.innerHTML = "";
        cartArr.map((data, i) => {
            cart.innerHTML += `
                            <div class="prod-cart">
                                <div>
                                    <img src="${data.img}" width="100%">
                                </div>
                                <div>
                                    <p>${data.name}</p>
                                    <p>$${data.price}</p>
                                    <div class="d-flex justify-content-center align-items-center">
                                        <img src="./assets/menos.png" onclick="sub1ToCart(cant${i},${i})" width="25px" class="mr-2">
                                        <p id="cant${i}" style="margin:0">${data.cant}</p>
                                        <img src="./assets/boton-mas.png" onclick="add1ToCart(cant${i},${i})" width="25px" class="ml-2">
                                    </div>
                                </div>
                                <div>
                                    <img src="./assets/remove.png" width="35px" onclick="removeCart(${i})" style="cursor:pointer;">
                                </div>
                            </div>
            `;
        });
    } else {
        cartArr.pop();
        localStorage.clear();
        localStorage.setItem("cart", JSON.stringify(cartArr));
        totalPrice(JSON.parse(localStorage.getItem("cart")), total);
        cart.innerHTML = "";
        notDisplayCart();
        btncompraOnOff();
    }
}

function add1ToCart(a, b) {
    let id = Number(a.innerHTML);

    a.innerHTML = id + 1;

    cartArr[b].cant = a.innerHTML;

    localStorage.clear();

    localStorage.setItem("cart", JSON.stringify(cartArr));

    totalPrice(JSON.parse(localStorage.getItem("cart")), total);
}

function sub1ToCart(a, b) {
    let id = Number(a.innerHTML);

    if (id > 1) {
        a.innerHTML = id - 1;

        cartArr[b].cant = a.innerHTML;

        localStorage.clear();

        localStorage.setItem("cart", JSON.stringify(cartArr));

        totalPrice(JSON.parse(localStorage.getItem("cart")), total);
    } else {
        a.innerHTML = id - 0;

        cartArr[b].cant = a.innerHTML;
    }
}

function totalPrice(a, b) {
    totalCart = 0;
    a.map((el) => {
        totalCart += el.cant * el.price;
    });
    b.innerHTML = `<h1>TOTAL $${totalCart}</h1>`;
}

function displayCart() {
    $(".cart").fadeToggle(500);
}

function displayCartEver() {
    $(".cart").fadeIn(500);
}

function notDisplayCart() {
    $(".cart").fadeOut(500);
}

// boton de compra
btncompraOnOff();
function btncompraOnOff() {
    const botonCompra = $("#btnCompra");
    if (cartArr.length < 1) {
        botonCompra.css({
            opacity: 0,
            visibility: "hidden",
        });
    } else {
        botonCompra.css({
            opacity: 1,
            visibility: "visible",
        });
    }
}

const botonCompra = $("#btnCompra");
botonCompra.click(() => {
    $("body").append(
        `<div class="modalVenta"><p style="margin-bottom: 0rem; font-size">Felicitaciones realizaste una compra por un total de $${totalCart}!!</p><a onclick="refresh()" class="btn btn-danger">Regresar</a></div>`
    );
});
function refresh() {
    location.reload();
}
