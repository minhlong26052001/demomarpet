var xmlhttp = new XMLHttpRequest();
var url = "./json/products.json";
xmlhttp.onreadystatechange = function () {
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
  if (name == "product-sale.html") {
    for (i = 0; i < arr.length; i++) {
      if (arr[i].discount != "") {
        // if (arr[i].category.charAt(0) == 'd') {
        var d = "";
        var e = "";
        var open_del = "";
        var close_del = "";
        var type_p = "";

        if(arr[i].category.charAt(0) == 'd'){
            type_p = 'dog'
        }
        else{
            type_p = 'cat'
        }


        if (arr[i].discount != "") {
          d = "đ";
          open_del = "<del>";
          close_del = "</del>";
          e = formatNumber(arr[i].discount);
        }
        if (arr[i].discount == "") {
          e = "";
        }
        div +=
          '<div class="product '+ type_p +'"><div class="product-item" onclick="gotoChiTiet(' +
          arr[i].productid +
          ')" ><div class="product-top"><img src="' +
          arr[i].image[0] +
          ' "alt=""></div><div class="product-info"><div class="product-label"> ' +
          arr[i].label +
          '</div><br/><div class="product-name">' +
          arr[i].name +
          '</div><br/><div class="product-price">' +
          open_del +
          formatNumber(arr[i].price[0]) +
          " đ" +
          close_del +
          "</div><div class='product-discount' >" +
          e +
          " " +
          d +
          "</div></div></div></div></div>";
        // }
      }
    }
    document.getElementById("product").innerHTML = div;
    return 0;
  }
  for (i = 0; i < arr.length; i++) {
    if (arr[i].category == category) {
      var d = "";
      var e = "";
      var open_del = "";
      var close_del = "";
      if (arr[i].discount != "") {
        d = "đ";
        open_del = "<del>";
        close_del = "</del>";
        e = formatNumber(arr[i].discount);
      }
      if (arr[i].discount == "") {
        e = "";
      }
      div +=
        '<div class="product" ><div class="product-item" onclick="gotoChiTiet(' +
        arr[i].productid +
        ')" ><div class="product-top"><img src="' +
        arr[i].image[0] +
        ' "alt=""></div><div class="product-info"><div class="product-label"> ' +
        arr[i].label +
        '</div><br/><div class="product-name">' +
        arr[i].name +
        '</div><br/><div class="product-price">' +
        open_del +
        formatNumber(arr[i].price[0]) +
        " đ" +
        close_del +
        "</div><div class='product-discount'  >" +
        e +
        " " +
        d +
        "</div></div></div></div></div>";
    }
    document.getElementById("product").innerHTML = div;
  }
}



function gotoChiTiet(id) {
  window.location.href = "products_detail.html?productid=" + id;
}

function formatNumber(num) {
  var n = Number(num);
  return n.toLocaleString("vi");
}


