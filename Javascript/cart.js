const keyLocalStorageListSP = "DANHSACHSP"
const keyLocalStorageItemCart = "DANHSACHITEMCART"
const newListData = JSON.parse(localStorage.getItem(keyLocalStorageListSP))
const listCart = JSON.parse(localStorage.getItem(keyLocalStorageItemCart))

function checkListCart() {
    if (listCart.length === 0) {
        document.getElementById("table").style.display = "none"
        document.getElementById('total').style.display = "none"
        document.getElementById('btn-buy').style.display = "none"
        document.getElementById('empty-cart').style.display = "block"
    } else {
        document.getElementById("table").style.display = "block"
        document.getElementById('total').style.display = "block"
        document.getElementById('btn-buy').style.display = "block"
        document.getElementById('empty-cart').style.display = "none"
    }
}
checkListCart()

// định dạng VND
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

// backtoindex
function backtoindex() {
    window.location.href = 'http://127.0.0.1:5500/html/index.html'
}

// return danh sách giỏ hàng
function renderCart() {
    // check id so sánh lấy ra sản phẩm
    const newListCart = []
    newListData.map(itemData => {
        listCart.map(itemCart => {
            if (itemData.id === itemCart.id) {
                newListCart.push({
                    id: itemData.id,
                    name: itemData.name,
                    amount: itemData.amount,
                    price: itemData.price,
                    image: itemData.image,
                    quantity: itemCart.quantity
                })
            }
        })
    })

    // danh sách sản phẩm
    document.getElementById('list-cart').innerHTML = newListCart?.map((item, index) => {
        // on off class button + -
        let classMinus;
        let classPlus;
        let class1 = `btn btn-light`;
        let class2 = `btn btn-light disable`;
        let class3 = `btn btn-light`;
        let class4 = `btn btn-light disable`;
        if (item.quantity === 1) {
            classMinus = class2;
        } else classMinus = class1;
        if (item.quantity === item.amount) {
            classPlus = class4;
        } else classPlus = class3;

        // sản phẩm
        return `
    <tr>
        <th scope="row">${index + 1}</th>
        <td class="text-start d-flex">
            <a href="#" class="link-img"><img src="${item.image}" class="pro-image" alt="img"></a>
            <div class="d-flex flex-column ms-5">
                <a href="#" class="pro-name mb-3">${item.name}</a>
                <p class="pro-quantity mt-3">Số lượng trong kho: ${item.amount}</p>
            </div>
        </td>
        <td class="pro-qty">
            <button type="button" onclick="handleMinus(${item.id})" class="${classMinus}">-</button>
            <input value="${item.quantity}" class="pro-quantity">
            <button type="button" onclick="handlePlus(${item.id})" class="${classPlus}">+</button>
        </td>
        <td class="pro-price">${VND.format(item.price)}</td>
        <td>${VND.format(item.price * item.quantity)}</td>
        <td>
            <button type="button" onclick="handleDelete(${item.id})" class="btn btn-outline-danger rounded-circle">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </td>
    </tr>
    `
    })
}
renderCart()

// xóa sản phẩm
function handleDelete(id) {
    const indexItem = listCart.findIndex((item) => item.id === id); // tìm index trong listCart
    listCart.splice(indexItem, 1)
    window.localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(listCart)) // Lưu trữ vào localStorage
    renderCart()
    cartTotal()
    checkListCart()
}

// trừ số lượng sản phẩm
function handleMinus(id) {
    const indexItem = listCart.findIndex((item) => item.id === id); // tìm index trong listCart
    listCart[indexItem].quantity -= 1; // trừ số lượng mua hàng
    window.localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(listCart)) // Lưu trữ vào localStorage
    renderCart()
    cartTotal()
}

// cộng số lượng sản phẩm
function handlePlus(id) {
    const indexItem = listCart.findIndex((item) => item.id === id); // tìm index trong listCart
    listCart[indexItem].quantity += 1; // cộng số lượng mua hàng
    window.localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(listCart)) // Lưu trữ vào localStorage
    renderCart()
    cartTotal()
}

// tổng giá tiền listCart
function cartTotal() {
    // check id so sánh lấy ra sản phẩm
    const newListCart = []
    newListData.map(itemData => {
        listCart.map(itemCart => {
            if (itemData.id === itemCart.id) {
                newListCart.push({
                    id: itemData.id,
                    price: itemData.price,
                    quantity: itemCart.quantity
                })
            }
        })
    })
    // tính tổng tiền
    let sum = 0
    newListCart?.map(item => {
        sum += item.price * item.quantity
    })
    // in ra html
    document.getElementById('total').innerHTML = `
    <p class="text-end mt-4 mb-4">Total: ${newListCart ? VND.format(sum) : 0 + 'đ'}</p>
    `
}
cartTotal()