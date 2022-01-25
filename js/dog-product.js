var xmlhttp = new XMLHttpRequest();
var url = "./json/products.json";
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        dogProduct(myArr);
    }
};
// xmlhttp.onreadystatechange = function () {
//   if (this.readyState == 4 && this.status == 200) {
//     var myApp = JSON.parse(this.responseText);
//     myFunction(myApp);
//   }
// };
xmlhttp.open("GET", url, true); //ra lệnh
xmlhttp.send(); //thực hiên

function dogProduct(arr) {
    var div = "";
    var i;
    var href = window.location.href;
    var link = new Array();
    link = href.split("/");
    var name = link[link.length - 1];
    if (name == "Dog-Product.html") {
        for (i = 0; i < arr.length; i++) {
            if (arr[i].category.charAt(0) == 'd') {
                var d = '';
                var e = '';
                var open_del = '';
                var close_del = '';
                if (arr[i].discount != "") {
                    d = 'đ';
                    open_del = '<del>';
                    close_del = '</del>';
                    e = formatNumber(arr[i].discount)
                }
                if(arr[i].discount == ""){
                    e = '';
                }
                div +=
                    '<div class="product"><div class="product-item" onclick="gotoChiTiet(' + arr[i].productid + ')" ><div class="product-top"><img src="' +
                    arr[i].image[0] +
                    ' "alt=""></div><div class="product-info"><div class="product-label"> ' +
                    arr[i].label +
                    '</div><br/><div class="product-name">' +
                    arr[i].name +   
                    '</div><br/><div class="product-price">' + open_del +
                    formatNumber(arr[i].price[0]) +
                    " đ" + close_del + "</div><div class='product-discount' >" + e + ' ' + d + "</div></div></div></div></div>";
            }

        }
        document.getElementById("product").innerHTML = div;
        return 0;
    }
    for (i = 0; i < arr.length; i++) {
        if (arr[i].category == category) {
            var d = '';
            var e = '';
            var open_del = '';
            var close_del = '';
            if (arr[i].discount != "") {
                d = 'đ';
                open_del = '<del>';
                close_del = '</del>';
                e = formatNumber(arr[i].discount);
            }
            if(arr[i].discount == ""){
                e = '';
            }
            div +=
                '<div class="product" ><div class="product-item" onclick="gotoChiTiet(' + arr[i].productid + ')" ><div class="product-top"><img src="' +
                arr[i].image[0] +
                ' "alt=""></div><div class="product-info"><div class="product-label"> ' +
                arr[i].label +
                '</div><br/><div class="product-name">' +
                arr[i].name +
                '</div><br/><div class="product-price">' + open_del +
                formatNumber(arr[i].price[0]) +
                " đ" + close_del + "</div><div class='product-discount'  >" +  e + ' ' + d + "</div></div></div></div></div>";
        }
        document.getElementById("product").innerHTML = div;
    }
}

//Function Đi đến chi tiết
function gotoChiTiet(id) {
    window.location.href = 'products_detail.html?productid=' + id;
}

function formatNumber(num) {
    var n = Number(num);
    return n.toLocaleString("vi");
}


// let cartItemID = 1;

// // purchase product
// function purchaseProduct(e) {
//     if (e.target.classList.contains("add-to-cart-btn")) {
//         let product = e.target.parentElement.parentElement;
//         getProductInfo(product);
//     }
// }

// // get product info after add to cart button click
// function getProductInfo(product) {
//     let productInfo = {
//         id: cartItemID,
//         imgSrc: product.querySelector(".product-top img").src,
//         name: product.querySelector(".product-name").textContent,
//         category: product.querySelector(".product-category").textContent,
//         price: product.querySelector(".product-price").textContent,
//     };
//     cartItemID++;
//     addToCartList(productInfo);
//     saveProductInStorage(productInfo);
// }

// // add the selected product to the cart list
// function addToCartList(product) {
//     const cartItem = document.createElement("div");
//     cartItem.classList.add("cart-item");
//     cartItem.setAttribute("data-id", `${product.id}`);
//     cartItem.innerHTML = `
//       <img src = "${product.imgSrc}" alt = "product image">
//       <div class = "cart-item-info">
//           <h3 class = "cart-item-name">${product.name}</h3>
//           <span class = "cart-item-category">${product.category}</span>
//           <span class = "cart-item-price">${product.price}</span>
//       </div>

//       <button type = "button" class = "cart-item-del-btn">
//           <i class = "fas fa-times"></i>
//       </button>
//   `;
//     cartList.appendChild(cartItem);
// }

// // save the product in the local storage
// function saveProductInStorage(item) {
//     let products = getProductFromStorage();
//     products.push(item);
//     localStorage.setItem("products", JSON.stringify(products));
//     updateCartInfo();
// }

// // get all the products info if there is any in the local storage
// function getProductFromStorage() {
//     return localStorage.getItem("products") ?
//         JSON.parse(localStorage.getItem("products")) : [];
//     // returns empty array if there isn't any product info
// }

// // load carts product
// function loadCart() {
//     let products = getProductFromStorage();
//     if (products.length < 1) {
//         cartItemID = 1; // if there is no any product in the local storage
//     } else {
//         cartItemID = products[products.length - 1].id;
//         cartItemID++;
//         // else get the id of the last product and increase it by 1
//     }
//     products.forEach((product) => addToCartList(product));

//     // calculate and update UI of cart info
//     updateCartInfo();
// }

// // calculate total price of the cart and other info
// function findCartInfo() {
//     let products = getProductFromStorage();
//     let total = products.reduce((acc, product) => {
//         let price = parseFloat(product.price.substr(1)); // removing dollar sign
//         return (acc += price);
//     }, 0); // adding all the prices

//     return {
//         total: total.toFixed(2),
//         productCount: products.length,
//     };
// }

// // delete product from cart list and local storage
// function deleteProduct(e) {
//     let cartItem;
//     if (e.target.tagName === "BUTTON") {
//         cartItem = e.target.parentElement;
//         cartItem.remove(); // this removes from the DOM only
//     } else if (e.target.tagName === "I") {
//         cartItem = e.target.parentElement.parentElement;
//         cartItem.remove(); // this removes from the DOM only
//     }

//     let products = getProductFromStorage();
//     let updatedProducts = products.filter((product) => {
//         return product.id !== parseInt(cartItem.dataset.id);
//     });
//     localStorage.setItem("products", JSON.stringify(updatedProducts)); // updating the product list after the deletion
//     updateCartInfo();
// }