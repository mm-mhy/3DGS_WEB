//搜索

import lunr from 'lunr';
//构建索引
let idx;
let imagesMetadata;
async function initializeSearchIndex() {
    
    idx = lunr(function () {
      this.ref('id');
      this.field('title', { boost: 10 });
      this.field('tags');
  
      imagesMetadata.forEach((image) => {
        this.add({
          id: image.id,
          title: image.title,
          tags: image.tags.join(' '), // 如果有多个标签，转换为字符串
          
        });
      });
    });
  }

  function searchImages(query) {
    if (!idx) return []; // 确保索引已初始化
    const results = idx.search(query);
    return results.map(result => imagesMetadata[result.ref]);
  }

document.getElementById('search-input').addEventListener('input', function (e) {
    const query = e.target.value;
    const matchingImages = searchImages(query);
    // 渲染匹配的图片及其相关信息到页面上
    displaySearchResults(matchingImages);
    // 更新页面以显示搜索结果
  });
//初始化索引
document.addEventListener('DOMContentLoaded', () => {
    initializeSearchIndex();
  });
//后端请求//点击my model files
function getimagematedata(){
    axios.post('/images').then((response) =>{
        imagesMetadata=response.data;
        console.log(imagesMetadata);
    }).then(()=>{
        displayImages(imagesMetadata);
    })
    
    
}

//显示图片
function displayImages(images) {
    const imageList = document.getElementById('image-list');
  
    images.forEach((image) => {
      const imgElement = document.createElement('img');
      imgElement.src = `/images/${image.id}.jpg`; // 假设图片 URL 格式
      imgElement.alt = image.title;
  
      const listItem = document.createElement('li');
      listItem.appendChild(imgElement);
  
      imageList.appendChild(listItem);
    });
  }
//显示搜索结果图片
function displaySearchResults(images) {
    // 清除原有内容并重新渲染
    const imageList = document.getElementById('search-results');
    imageList.innerHTML = '';
  
    images.forEach((image) => {
      const imgElement = document.createElement('img');
      imgElement.src = `/images/${image.id}.jpg`; // 假设图片 URL 格式
      imgElement.alt = image.title;
  
      const listItem = document.createElement('li');
      listItem.appendChild(imgElement);
  
      imageList.appendChild(listItem);
    });
  }

