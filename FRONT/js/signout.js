
function signOut(){

    if(confirm("Are you sure you want to sign out?")){
        // 执行退出操作     
       localStorage.removeItem('token');
       location.reload(true);     
   }

}