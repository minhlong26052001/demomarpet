window.onscroll = function() {
    scrollFunction()
        // returnTop()
};
//Fixed menu appears
function scrollFunction() {
    if (document.body.scrollTop > 186 || document.documentElement.scrollTop > 186) {
        document.getElementById("slide-down-bar").style.top = "0";
        // active fixed menu for mobile screen
        document.getElementById("nav-for-mobile").classList.add('sticky');
    } else {
        document.getElementById("slide-down-bar").style.top = "-100px";
        document.getElementById("nav-for-mobile").classList.remove('sticky');
    }
}
// đóng mở side menu
function openNav() {
    document.getElementById("sideMenu").style.left = "0%";
}

function closeNav() {
    document.getElementById("sideMenu").style.left = "-100%";
}