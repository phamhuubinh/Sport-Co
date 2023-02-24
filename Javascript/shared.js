const today = new Date();

document.getElementById('header').innerHTML = `
<nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top bg-dark" data-bs-theme="dark">
            <div class="container-fluid">
                <a class="navbar-brand me-4 ms-3" href="./index.html">
                    <img src="../image/1280px-Logo_Sport.svg.png" alt="Logo" width="250" height="80"
                        class="d-inline-block align-text-top">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse fs-4 flex-grow-0" id="navbarSupportedContent">
                    <ul id="navbarActive" class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item me-3 ms-3">
                            <a class="nav-link" aria-current="page" href="./index.html">Home</a>
                        </li>
                        <li class="nav-item me-3 ms-3">
                            <a class="nav-link" href="./product.html">Product</a>
                        </li>
                        <li class="nav-item dropdown me-3 ms-3">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-cart-shopping"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><a class="dropdown-item dropdown-item-header" href="./cart.html">Card</a></li>
                                <li><a class="dropdown-item dropdown-item-header" href="./order.html">Order</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item dropdown-item-header" href="#">${today.toDateString()}</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        `

document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.href === window.location.href) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
    }
});
document.querySelectorAll(".dropdown-item-header").forEach((link) => {
    if (link.href === window.location.href) {
        link.classList.add("active-cart");
        link.setAttribute("aria-current", "page");
    }
});

const d = new Date();

document.getElementById('footer').innerHTML = `
<footer class="text-center text-lg-start bg-light text-muted">
            <!-- Section: Social media -->
            <section class="d-flex justify-content-center justify-content-lg-end p-4 border-bottom">
                <!-- Left -->
                <div class="me-5 d-none d-lg-block">
                    <span>Get connected with us on social networks:</span>
                </div>
                <!-- Left -->
                <!-- Right -->
                <div>
                    <a href="https://www.facebook.com/PhamLongPhucBinh95" class="me-4 text-reset">
                        <i class="fab fa-facebook-f" style="color: #0000ff8c;"></i>
                    </a>
                    <a href="https://twitter.com/HungTienMinh?t=M7rIt55YVPuig7uLHsf7eQ&s=09" class="me-4 text-reset">
                        <i class="fab fa-twitter" style="color: blue;"></i>
                    </a>
                    <a href="https://phamgiabinh95@gmail.com" class="me-4 text-reset">
                        <i class="fab fa-google"  style="color: red;"></i>
                    </a>
                    <a href="https://www.instagram.com/phamlongphucbinh/" class="me-4 text-reset">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="https://github.com/phamhuubinh" class="me-4 text-reset">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
                <!-- Right -->
            </section>
            <!-- Section: Social media -->
            <!-- Section: Links  -->
            <section class="">
                <div class="container text-center text-md-start mt-5">
                    <!-- Grid row -->
                    <div class="row mt-3">
                        <!-- Grid column -->
                        <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <!-- Content -->
                            <h6 class="text-uppercase fw-bold mb-4">
                                <i class="fas fa-gem me-3"></i>Sport Co.
                            </h6>
                            <p>
                                Here you can use rows and columns to organize your footer content. Lorem ipsum
                                dolor sit amet, consectetur adipisicing elit.
                            </p>
                        </div>
                        <!-- Grid column -->
                        <!-- Grid column -->
                        <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                            <!-- Links -->
                            <h6 class="text-uppercase fw-bold mb-4">
                                Products
                            </h6>
                            <p>
                                <a href="https://www.javascript.com/" class="text-reset">Javascript</a>
                            </p>
                            <p>
                                <a href="https://reactjs.org/" class="text-reset">React</a>
                            </p>
                            <p>
                                <a href="https://kenwheeler.github.io/slick/" class="text-reset">Slick Slider</a>
                            </p>
                            <p>
                                <a href="https://getbootstrap.com/" class="text-reset">Bootstrap</a>
                            </p>
                        </div>
                        <!-- Grid column -->
                        <!-- Grid column -->
                        <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            <!-- Links -->
                            <h6 class="text-uppercase fw-bold mb-4">
                                Useful links
                            </h6>
                            <p>
                                <a href="#!" class="text-reset">Pricing</a>
                            </p>
                            <p>
                                <a href="#!" class="text-reset">Settings</a>
                            </p>
                            <p>
                                <a href="#!" class="text-reset">Orders</a>
                            </p>
                            <p>
                                <a href="#!" class="text-reset">Help</a>
                            </p>
                        </div>
                        <!-- Grid column -->
                        <!-- Grid column -->
                        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <!-- Links -->
                            <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
                            <p><i class="fas fa-home me-3"></i> New York, NY 10012, US</p>
                            <p>
                                <i class="fas fa-envelope me-3"></i>
                                info@example.com
                            </p>
                            <p><i class="fas fa-phone me-3"></i> + 01 234 567 88</p>
                            <p><i class="fas fa-print me-3"></i> + 01 234 567 89</p>
                        </div>
                        <!-- Grid column -->
                    </div>
                    <!-- Grid row -->
                </div>
            </section>
            <!-- Section: Links  -->
            <!-- Copyright -->
            <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
                © ${d.getFullYear()} Copyright:
                <a class="text-reset fw-bold" href="http://127.0.0.1:5500/html/index.html">SPORT Co.</a>
            </div>
            <!-- Copyright -->
        </footer>
`