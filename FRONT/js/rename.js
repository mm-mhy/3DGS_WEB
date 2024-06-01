var closeRenameWindowButton = document.querySelector(".rename-window .close-btn");
var cancelRenameButton=document.querySelector(".rename-window .cancelBtn")
var saveRenameButton=document.querySelector(".rename-window .saveBtn")

document.addEventListener("click", function (event) {
    // 检查点击的元素是否是 "Rename" 标签
    if (event.target.matches(".dropdown-menu-container .dropdown-menu li:first-child")) {
        // 执行点击 "Rename" 标签的操作
        showRenameWindow();
    }
    else if (event.target.matches(".dropdown-menu-container .dropdown-menu li:nth-child(3)")) {
        // 执行点击 "Sign Out" 标签的操作
        signOut();
      }
      else if (event.target.matches(".dropdown-menu-container .dropdown-menu li:nth-child(2)")) {
        window.location.href = "../html/mymodelfiles.html"
      }

});

closeRenameWindowButton.addEventListener("click", closeRenameWindow);

cancelRenameButton.addEventListener("click",function(){
    closeRenameWindow();
})

saveRenameButton.addEventListener("click",function(){
    // 保存更改数据
    change_name();
    //关闭窗口
    closeRenameWindow();
})
function closeRenameWindow(){
    var renameWindow = document.querySelector(".rename-window");
    renameWindow.style.display = "none";
}
function showRenameWindow() {
    var renameWindow = document.querySelector(".rename-window");
    renameWindow.style.display = "block";
}


function change_name(){
    let new_name=document.getElementById("newName").value;
    let current_name=document.getElementById("currentName");
    
    axios.post(url+'/rename',{new_name}).then(res=>{
        if(res.data.status==0){
            current_name.innerText=new_name;
            startButton.innerHTML = '<i class="fas fa-user"><img src="../image/avatar.png" alt=""></i>'+new_name;
            console.log(current_name);
            alert("changing successfuly");

        }
        else{
            
            alert("重命名失败");
        }
    }
    ).catch(err=>{
        console.log(err);
    })
}