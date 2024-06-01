// 创建包含下拉菜单的盒子元素
var menuContainer = document.createElement("div");
menuContainer.className = "dropdown-menu-container";

function addMenu() {
    // 添加菜单项
    var menuItems = ["Rename", "My Model Files", "Sign Out"];
    var dropdownMenu = document.createElement("ul");
    dropdownMenu.className = "dropdown-menu";
    menuItems.forEach(function (itemText) {
        var menuItem = document.createElement("li");
        menuItem.textContent = itemText;
        dropdownMenu.appendChild(menuItem);
    });
    menuContainer.appendChild(dropdownMenu);
    // 将菜单容器添加到开始按钮下方
    startButton.parentNode.insertBefore(menuContainer, startButton.nextSibling);


}

var isDropdownShown = false;

// 给按钮添加点击事件监听器
startButton.addEventListener("click", function () {
    console.log(loginState)
    if (!loginState) {
        // 变暗页面
        document.body.style.filter = "brightness(0.8)";
        // 显示登录窗口
        loginWindow.style.display = "block";
    } else {
        var dropdownMenu = menuContainer.querySelector(".dropdown-menu"); // 获取下拉菜单元素
        if (isDropdownShown) {
            dropdownMenu.style.display = "none";
            isDropdownShown = false;
        } else {
            dropdownMenu.style.display = "block";
            isDropdownShown = true;
        }
    }

});


