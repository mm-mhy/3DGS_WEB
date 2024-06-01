let upstate = false;
let generateState = false;
let downloadState = false;
let closeUploadWindowButton = document.querySelector(".upload-window .close-btn");
let closeUploadProgressWindowButton = document.querySelector(".uploadProgress-window .close-btn");
let upok=document.querySelector(".successful-window");
const filename=document.querySelector(".successful-window .fileName");
const gray=document.querySelector(".gray");
const conv=document.querySelector(".conversation-window1");
const conv1=document.querySelector(".progress-bar-container1");
const such1=document.querySelector(".suc");
//上传文件
function upload(){
    if(!loginState){
        alert("please log your account!");
        return;
    }
    else{  
        gray.style.display="block";
        console.log("upload");
        showUpload();
    }
}
closeUploadWindowButton.addEventListener("click", function () {
    closeUpload();
    gray.style.display = "none";
});
closeUploadProgressWindowButton.addEventListener("click", function () {
    closeUploadProgressWindow();
})

function showUpload() {
    let uploadWindow = document.querySelector(".upload-window");
    uploadWindow.style.display = "block";
}
function closeUpload() {
    let uploadWindow = document.querySelector(".upload-window");
    uploadWindow.style.display = "none";
}
function showUploadProgressWindow(){
    let uploadProgressWindow = document.querySelector('.uploadProgress-window');
    uploadProgressWindow.style.display = "block";
}
function closeUploadProgressWindow(){
    let uploadProgressWindow = document.querySelector('.uploadProgress-window');
    uploadProgressWindow.style.display = "none";
}
//文件转换
function generate(){
    if(!upstate){
        alert("please upload your file!");
        return;
    }
    else{      
        
        gray.style.display="block";
                conv.style.display="block";
                conv1.style.display="block";
                console.log("generate success");
                generatestate=true;
                setTimeout(function(){
                    conv1.style.display="none";
                    such1.innerHTML="Successful";
                    setTimeout(function(){
                        conv.style.display="none";
                        conv1.style.display="block";
                        gray.style.display="none";
                        such1.innerHTML="Conversation.....";
                    },2000)
                },2000)
    }
}
//
function download(){
   
        console.log("Edit");
        window.location.href = "../html/mymodelfiles.html";
    
}

//上传文件请求逻辑
const inputElement = document.getElementById('mp4-file');
const progressBar = document.getElementById('progress-bar');
inputElement.addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const file = event.target.files[0];
    filename.textContent=file.name.slice(0,-4);
    upstate=true;
    generatestate=false;
    showUploadProgressWindow();
    closeUpload();
    setTimeout(function(){
        upok.style.display = "block";
    },1000);
    if (!file || file.type !== 'video/mp4') {
             alert('Please select an mp4 file.');
             closeUploadProgressWindow();
             closeUpload();
                return;
            }

function showPreviewImage(imageUrl) {
    const previewContainer = document.querySelector('.fileImg_preview'); // 确保HTML中有这个元素
    previewContainer.innerHTML = `<img src="${imageUrl}" alt="Video Preview" style="max-width: 100%;">`;
}            

    const formData = new FormData();
    formData.append('mp4File', file);

    // 创建可跟踪进度的请求
    const request = new XMLHttpRequest();
    request.open('POST', url+'/upload');
    request.upload.onprogress = updateProgress;
    request.onload = () => {
        const responseJson = JSON.parse(request.responseText);
        if (responseJson.status === 0) {
            console.log('File uploaded successfully.');
            // 显示预览图
            showPreviewImage(responseJson.imageUrl);
        } else {
            console.error('Error uploading file: ' + responseJson.message);
        }
    };
    
    request.onerror = () => {
        console.error('There was an error uploading the file.');
    };

    request.send(formData);

    function updateProgress(event) {
        if (event.lengthComputable) {
                const percentComplete = Math.round((event.loaded / event.total) * 100);
                 progressBar.style.width = `${percentComplete}%`;
                progressBar.textContent = `${percentComplete}% complete`;
                if(percentComplete==100){
                   
                    closeUpload();
                    
                    setTimeout(function(){
                        closeUploadProgressWindow()
                        gray.style.display = "none";
                    },1000);
                }
            }
    }
}