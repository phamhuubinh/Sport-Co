// tùy chỉnh slick slide
$(document).ready(function () {
    $('.slide').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        infinite: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    arrows: false
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }, {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: false
                }
            }, {
                breakpoint: 300,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            },
        ]
    });
});

const keyLocalStorageListSP = "DANHSACHSP"
const keyLocalStorageItemCart = "DANHSACHITEMCART"
const newListData = JSON.parse(localStorage.getItem(keyLocalStorageListSP))

// định dạng VND
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

// lấy id từ localstorage
const dataProduct = JSON.parse(window.localStorage.getItem("product"))
let id = dataProduct.id
let qty = dataProduct.quantity

// Title
function renderTitle() {
    newListData.map(itemData => {
        if (itemData.id === id) {
            document.getElementById('title').innerHTML = `<h5>Trang chủ > Sản phẩm > ${itemData.name}</h5>`
        }
    })
}
renderTitle()

// thông tin sản phẩm
function renderProduct() {
    newListData.map(itemData => {
        if (itemData.id === id) {
            // on off class button + -
            let classMinus;
            let classPlus;
            let class1 = `pro-quantity-minus`;
            let class2 = `pro-quantity-minus disable`;
            let class3 = `pro-quantity-plus`;
            let class4 = `pro-quantity-plus disable`;
            if (qty === 1) {
                classMinus = class2;
            } else classMinus = class1;
            if (qty === itemData.amount) {
                classPlus = class4;
            } else classPlus = class3;

            // sản phẩm
            document.getElementById("infoProduct").innerHTML = `
            <div class="col">
            <img class="pro-img" src="${itemData.image}" alt="image">
        </div>
        <div class="col">
            <h1 class="pro-name">${itemData.name}</h1>
            <div class="pro-amount">Số lượng trong kho: ${itemData.amount}</div>
            <div class="pro-price">Giá bán: ${VND.format(itemData.price)}</div>
            <div id="activeBorder" class="pro-color">
                Màu sắc:
                <br>
                <span class="pro-color-item active-color"></span>
                <span class="pro-color-item"></span>
                <span class="pro-color-item"></span>
                <span class="pro-color-item"></span>
                <span class="pro-color-item"></span>
                <span class="pro-color-item"></span>
            </div>
            <div id="activeSize" class="pro-size d-flex flex-wrap">
                Size:
                <div class="pro-size-item active-size">38</div>
                <div class="pro-size-item">38.5</div>
                <div class="pro-size-item">39</div>
                <div class="pro-size-item">39.5</div>
                <div class="pro-size-item">40</div>
                <div class="pro-size-item">40.5</div>
                <div class="pro-size-item">41</div>
                <div class="pro-size-item">41.5</div>
                <div class="pro-size-item">42</div>
                <div class="pro-size-item">42.5</div>
                <div class="pro-size-item">43</div>
            </div>
            <div class="pro-quantity">
                Số lượng:
                <br>
                <button class="${classMinus}" onclick="handleMinus(${itemData.id})">-</button>
                <input class="pro-quantity-input" value="${qty}">
                <button class="${classPlus}" onclick="handlePlus(${itemData.id})">+</button>
            </div>
            <button type="button" onclick="handleBuy(${itemData.id},${qty})" class="btn btn-danger btn-style btn-lg">Chọn mua</button>
        </div>
            `
        }
    })
}
renderProduct()

// Add active class to the current button (highlight it)
var header = document.getElementById("activeBorder");
var btns = header.getElementsByClassName("pro-color-item");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active-color");
        current[0].className = current[0].className.replace(" active-color", "");
        this.className += " active-color";
    });
}
var header = document.getElementById("activeSize");
var btns = header.getElementsByClassName("pro-size-item");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active-size");
        current[0].className = current[0].className.replace(" active-size", "");
        this.className += " active-size";
    });
}

// trừ số lượng sản phẩm
function handleMinus(id) {
    qty--
    productItem.id = id
    productItem.quantity = qty
    window.localStorage.setItem("product", JSON.stringify(productItem))
    renderProduct()
}

// cộng số lượng sản phẩm
function handlePlus(id) {
    qty++
    productItem.id = id
    productItem.quantity = qty
    window.localStorage.setItem("product", JSON.stringify(productItem))
    renderProduct()
}

// mua sản phẩm
function handleBuy(id, qty) {
    const indexItem = listCart.findIndex((item) => item.id === id); // tìm index trong listCart
    if (indexItem >= 0) {
        listCart[indexItem].quantity += qty; // cộng số lượng
    } else {
        listCart.push({ id: id, quantity: qty }) // thêm object vào listCart
    }
    // Lưu trữ vào localStorage
    window.localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(listCart))
    window.location.href = "http://127.0.0.1:5500/html/cart.html"
}

function renderListProduct() {
    document.getElementById('cart-item').innerHTML = newListData.map(item => {
        return `
        <div class="card col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12">
            <a href="./product.html">
                <img src="${item.image}" onclick="product(${item.id})" class="card-img-top" alt="${item.name}">
            </a>
            <div class="card-body">
                <a href="./product.html" onclick="product(${item.id})" class="text-name">
                    <p class="card-name">${item.name}</p>
                </a>
                <div class="d-flex justify-content-between flex-wrap align-items-center">
                    <p class="card-price">${VND.format(item.price)}</p>
                    <p class="card-amount">Trong kho: ${item.amount}</p>
                </div>
                <div class="btn-card">
                    <button type="button" onclick="addCart(${item.id})" class="btn btn-success rounded-circle">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        </div>
        `
    })
}
renderListProduct()

const productItem = {
    id: '',
    quantity: 1
}

// xem chi tiết sản phẩm
function product(id) {
    productItem.id = id
    productItem.quantity = 1
    window.localStorage.setItem("product", JSON.stringify(productItem))
}

// lấy array từ localStorage hoặc tạo []
const listCart = JSON.parse(window.localStorage.getItem(keyLocalStorageItemCart)) || []

// thêm vào listCart
function addCart(id) {
    const indexItem = listCart.findIndex((item) => item.id === id); // tìm index trong listCart
    if (indexItem >= 0) {
        listCart[indexItem].quantity += 1; // cộng số lượng
    } else {
        listCart.push({ id: id, quantity: 1 }) // thêm object vào listCart
    }
    // Lưu trữ vào localStorage
    window.localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(listCart))
}