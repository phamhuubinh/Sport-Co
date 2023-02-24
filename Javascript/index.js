const listData = [
    {
        id: 1,
        name: 'Sản phẩm 1',
        price: 1000000,
        amount: 50,
        image: '../image/product/2a87e3da-58fd-4cdf-8b11-aee7501a8ac5.jpg'
    },
    {
        id: 2,
        name: 'Sản phẩm 2',
        price: 5000000,
        amount: 20,
        image: '../image/product/2e317d2d-d164-46a8-b0dc-ea3e5a43e490.jpg'
    },
    {
        id: 3,
        name: 'Sản phẩm 3',
        price: 1500000,
        amount: 100,
        image: '../image/product/3b05de1c-b694-48b1-9855-f8494f99e0b3.jpg'
    },
    {
        id: 4,
        name: 'Sản phẩm 4',
        price: 1230000,
        amount: 18,
        image: '../image/product/68c28c49-4c26-4f81-9b4e-0e9760edcef9.jpg'
    },
    {
        id: 5,
        name: 'Sản phẩm 5',
        price: 990000,
        amount: 60,
        image: '../image/product/471bffe8-9757-4b0e-8416-8ed1a9e5c7d0.jpg'
    },
    {
        id: 6,
        name: 'Sản phẩm 6',
        price: 650000,
        amount: 69,
        image: '../image/product/air-force-1-07-lv8-shoes-VqVnxG.jpg'
    },
    {
        id: 7,
        name: 'Sản phẩm 7',
        price: 1200000,
        amount: 58,
        image: '../image/product/air-force-1-high-07-lv8-shoes-RTQ6x1.jpg'
    },
    {
        id: 8,
        name: 'Sản phẩm 8',
        price: 2300000,
        amount: 40,
        image: '../image/product/air-jordan-1-mid-shoes-SQf7DM.jpg'
    },
    {
        id: 9,
        name: 'Sản phẩm 9',
        price: 999000,
        amount: 53,
        image: '../image/product/air-max-90-g-golf-shoe-qlD3wL.jpg'
    },
    {
        id: 10,
        name: 'Sản phẩm 10',
        price: 1200000,
        amount: 24,
        image: '../image/product/air-max-90-se-shoes-ltJLHs.jpg'
    },
    {
        id: 11,
        name: 'Sản phẩm 11',
        price: 3400000,
        amount: 60,
        image: '../image/product/air-max-97-se-shoes-rjm3vj.jpg'
    },
    {
        id: 12,
        name: 'Sản phẩm 12',
        price: 5000000,
        amount: 34,
        image: '../image/product/air-max-dawn-se-shoes-hgfNdW.jpg'
    },
    {
        id: 13,
        name: 'Sản phẩm 13',
        price: 1850000,
        amount: 30,
        image: '../image/product/air-max-excee-shoe-lPbXqt.jpg'
    },
    {
        id: 14,
        name: 'Sản phẩm 14',
        price: 1850000,
        amount: 46,
        image: '../image/product/b6a095e1-d80b-4a28-b0d4-fdc3c098c95c.jpg'
    },
    {
        id: 15,
        name: 'Sản phẩm 15',
        price: 2300000,
        amount: 15,
        image: '../image/product/b89c9e48-d1bf-4d72-afd5-18ac97a4c072.jpg'
    },
    {
        id: 16,
        name: 'Sản phẩm 16',
        price: 4750000,
        amount: 92,
        image: '../image/product/b03907b4-a52f-46a8-b195-2e79ded93212.jpg'
    },
    {
        id: 17,
        name: 'Sản phẩm 17',
        price: 4300000,
        amount: 42,
        image: '../image/product/e6da41fa-1be4-4ce5-b89c-22be4f1f02d4.jpg'
    },
    {
        id: 18,
        name: 'Sản phẩm 18',
        price: 3500000,
        amount: 22,
        image: '../image/product/gripknit-phantom-gx-elite-fg-football-boot-6t4Xff.jpg'
    },
    {
        id: 19,
        name: 'Sản phẩm 19',
        price: 1980000,
        amount: 21,
        image: '../image/product/infinity-react-3-road-running-shoes-m07w1L.jpg'
    },
    {
        id: 20,
        name: 'Sản phẩm 20',
        price: 1630000,
        amount: 18,
        image: '../image/product/nikecourt-zoom-vapor-cage-4-rafa-hard-court-tennis-shoes-cS7wct.jpg'
    },
    {
        id: 21,
        name: 'Sản phẩm 21',
        price: 850000,
        amount: 55,
        image: '../image/product/pegasus-39-road-running-shoes-wd8m6T.jpg'
    },
    {
        id: 22,
        name: 'Sản phẩm 22',
        price: 1660000,
        amount: 8,
        image: '../image/product/pegasus-flyease-easy-on-off-road-running-shoes-RlnnC7.jpg'
    },
    {
        id: 23,
        name: 'Sản phẩm 23',
        price: 2960000,
        amount: 19,
        image: '../image/product/waffle-one-se-shoes-4PgbzS.jpg'
    }
]

const keyLocalStorageListSP = "DANHSACHSP"
const keyLocalStorageItemCart = "DANHSACHITEMCART"

// window.localStorage.setItem(keyLocalStorageListSP, JSON.stringify(listData))
const newListData = JSON.parse(localStorage.getItem(keyLocalStorageListSP))

// định dạng VND
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

// return danh sách sản phẩm
function listProduct() {
    document.getElementById('card-item').innerHTML = newListData.map(item => {
        return `
        <div class="card mb-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12">
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
    }).join('')
}
listProduct()

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