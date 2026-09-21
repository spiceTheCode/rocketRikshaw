const API_KEY = import.meta.env.VITE_NASA_API_KEY;

var media
var expanded = document.querySelector("#expanded")

document.querySelector("#app").innerHTML = "<p>loading...</p>";

document.querySelector("#waySetter").addEventListener("click", e=>{
  if(expanded.style.visibility=="hidden"){
    expanded.style.visibility="visible";
  }else
    expanded.style.visibility="hidden";
})

fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
  .then(response => response.json()).then(data => {
    if (data.media_type == "video") {
      media = `<video src="${data.url}" id="autoWhere">`
    }else if(data.media_type == "image"){
      media=`<img src="${data.url}" id="autoWhere">`
    }else{
      media=`<iframe src="${data.url}" id="autoWhere"></iframe>`
    }
    document.querySelector("#app").innerHTML = `
    ${media}`
    expanded.innerHTML=`
    <h1 id="expanHead">${data.title}</h1>
    <p id="expanText">${data.explanation}</p>`
  }).catch(err=>{
    document.querySelector("#app").innerHTML=`<p>Error:${err.message}</p>`
  })