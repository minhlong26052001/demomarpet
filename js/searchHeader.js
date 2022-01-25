function searchFunc() {
  let menusearch = document.querySelector("#menu__search");

  let menuitems = Array.from(document.querySelectorAll(".menu__item"));

  menusearch.value = menusearch.value.toLowerCase();

  menuitems.forEach(function (el) {
    let text = el.innerText.toLowerCase();
    if (text.indexOf(menusearch.value) > -1) {
      document.querySelector("#search__list").style.display = "block";
      el.style.display = "flex";
    } else el.style.display = "none";

    if (menusearch.value == "") {
      el.style.display = "none";
      document.getElementById("search__list").style.display = "none";
    }
  });
}
var xmlhttp = new XMLHttpRequest();
var url = "./json/products.json";

xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var myArr = JSON.parse(this.responseText);
    loadSearch(myArr);
  }
};

xmlhttp.open("GET", url, true); //ra lệnh
xmlhttp.send(); //thực hiênn

function loadSearch(arr) {
  var i;
  var div = "";
  for (i = 0; i < arr.length; i++) {
    div +=
      ' <li onclick="gotoDetail(' +
      "'" +
      arr[i].productid +
      "'" +
      ')" class="menu__item">' +
      '<img src="' +
      arr[i].image[0] +
      '" width="150px" alt="">' +
      "<span>" +
      "<span>" +
      arr[i].label +
      "</span>" +
      "<br/>" +
      "<span>" +
      arr[i].name +
      "</span>" +
      "</span>" +
      "</li>";
  }

  document.getElementById("search__list").innerHTML = div;
}

function gotoDetail(id) {
  window.location.href = "products_detail.html?productid=" + id;
}

function gotoSearchDetail() {
  let menusearch = document.querySelector("#menu__search").value;
  window.location.href = "Showsearch.html?search=" + menusearch;
}

let btn = document.querySelector("#menu__search");
  document.querySelector("#menu__search").addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
          document.getElementById("myBtnSearch").click();
      } 
  });
  btn.addEventListener("click", () => {
      const keyEvent = new KeyboardEvent("keydown", { key: "Enter" });       
      document.body.dispatchEvent(keyEvent);
  });
