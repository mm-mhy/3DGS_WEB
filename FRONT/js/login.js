var loginState = false;
// 获取按钮和登录窗口元素
var startButton = document.getElementById("start");

var loginWindow = document.querySelector(".login-window");
var registerWindow = document.querySelector(".register-window");

var signInButton = document.querySelector(".btn-container button:nth-child(1)");
var signUpButton = document.querySelector(".btn-container button:nth-child(2)");
var registerSignUpButton=document.querySelector(".register-window .btn-container button" );

var closeLoginWindowButton = document.querySelector(".login-window .close-btn");
var registerLoginWindowButton = document.querySelector(".register-window .close-btn");

//关闭窗口
closeLoginWindowButton.addEventListener("click", closeLoginWindow);
registerLoginWindowButton.addEventListener("click", closeLoginWindow);

// 给登录按钮添加点击事件监听器

signUpButton.addEventListener("click", function() {
  loginWindow.style.display = "none";
  registerWindow.style.display = "block";
});

function signIn() {
  loginState = true;
  startButton.innerHTML = '<i class="fas fa-user"><img src="../image/avatar.png" alt=""></i> AICG';
}
function signUp(){
  loginState = true;
  startButton.innerHTML = '<i class="fas fa-user"><img src="../image/avatar.png" alt=""></i> AICG';
}
function closeLoginWindow() {
  var loginWindow = document.querySelector(".login-window");
  var registerWindow = document.querySelector(".register-window");
  loginWindow.style.display = "none";
  registerWindow.style.display = "none";
}


