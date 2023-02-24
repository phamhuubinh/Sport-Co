const keyLocalStorageListSP = "DANHSACHSP"
const newListData = JSON.parse(localStorage.getItem(keyLocalStorageListSP))

// định dạng VND
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

// backtoindex
function backtoindex() {
    window.location.href = 'http://127.0.0.1:5500/html/index.html'
}

// Functions call api users
function getDataUsers(callback) {
    fetch('http://localhost:3001/users')
        .then(function (response) {
            return response.json()
        })
        .then(callback)
}

// render danh sách users
getDataUsers(function (users) {
    document.getElementById("body").innerHTML = users.map(item => {
        let sum = 0
        item.listDataCart.map(qty => sum += qty.quantity)
        let totalPrice = 0
        newListData.map(pro => {
            item.listDataCart.map(total => {
                if (pro.id === total.id) {
                    totalPrice += pro.price * total.quantity
                }
            })
        })
        return `
        <tr>
            <th scope="row" class="text-start">
                <p>${item.id}</p>
                <a class="onOffDropdown" href="#">
                    Details&nbsp;<i class="fa-solid fa-caret-down"></i>
                </a>
                <div class="dropdownOrder">
                    <table class="table text-center" id="table">
                        <thead class="table-light bd-bottom">
                            <tr>
                                <th scope="col" class="pros-name">Product Name</th>
                                <th scope="col" class="pros-quantity">Quantity</th>
                                <th scope="col" class="pros-subtotal">Subtotal</th>
                                <th scope="col" class="pros-total">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${item.listDataCart.map((itemCart, index) => {
            return `
                        <tr>
                            <td>
                                ${itemCart.name}
                                <img src="${itemCart.image}" class="pro-image" alt="img">
                            </td>
                            <td class="pro-qty">${itemCart.quantity}</td>
                            <td class="pro-price">${VND.format(itemCart.price)}</td>
                            <td class="pro-total">${VND.format(itemCart.price * itemCart.quantity)}</td>
                        </tr>
                        `
        }).join("")}
                        </tbody>
                    </table>
                </div>
            </th>
            <td>${item.firstName}&nbsp;${item.lastName}</td>
            <td>${item.date}</td>
            <td>${item.listDataCart.length}</td>
            <td>${sum}</td>
            <td>${VND.format(totalPrice)}</td>
            <td>
                <button type="button" value="${item.id}" class="btn btn-outline-danger btn-give-back rounded-circle">
                    <i class="fa-solid fa-rotate-left"></i>
                </button>
            </td>
        </tr>
        `
    })
    // bật tắt details
    const allDropDown = document.querySelectorAll(".onOffDropdown")
    let clickCount = 0;
    allDropDown.forEach(item => item.addEventListener("click", () => {
        clickCount++;
        if (clickCount % 2 !== 0) {
            item.nextElementSibling.style.display = "block";
        } else {
            item.nextElementSibling.style.display = 'none';
        }
    }))

    // trả hàng
    const allGiveBack = document.querySelectorAll(".btn-give-back")
    allGiveBack.forEach(item => item.addEventListener("click", () => {
        fetch("http://localhost:3001/users" + '/' + item.value, {
            method: 'delete'
        })
            .then(response => response.json());
        users.map(user => {
            if (user.id === item.value) {
                user.listDataCart.map(cart => {
                    newListData.map(pro => {
                        if (cart.id === pro.id) {
                            pro.amount += cart.quantity
                        }
                    })
                    localStorage.setItem(keyLocalStorageListSP, JSON.stringify(newListData))
                })
            }
        })
    }))
})