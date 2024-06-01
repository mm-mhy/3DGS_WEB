let url= "https://m91u957388.goho.co"

if(localStorage.getItem("token")!=null){
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
    handlesuccess();
    console.log(localStorage.getItem("token"));
}



let invalid;
function handlelogin(){   
    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;   
    axios.post(url+"/login",{email,password}).then(res=>{       
        if(res.data.status==0){
            handlesuccess(res.data.message);
            localStorage.setItem("token",res.data.token);
        }else{
            handlefailure(res.data.message);           
        }
    }).catch(err=>{
        console.log(err);
    })
}

function handlesuccess(message){
    console.log(message);
    setTimeout(()=>{
        signIn();
        addMenu();
        loginWindow.style.display = "none";
        registerWindow.style.display="none";
    },1000)
}

function handlefailure(message){    
    invalid=document.createElement("div");
    loginWindow.appendChild(invalid);
    invalid.innerHTML="Invalid email or password";
    invalid.classList.add("invalid");
    setTimeout(()=>{
        invalid.remove();
    },4000)
}

function handlesignup(){
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    axios.post(url+"/signup",{name,email,password}).then(res=>{
        if(res.data.status==0){
            handlesuccess(res.data.message);
            localStorage.setItem("token", res.data.token);
        }
        else{

        }
    }).catch(err=>{
        console.log(err);
    })
}
