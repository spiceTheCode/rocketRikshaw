const API_KEY = import.meta.env.VITE_NASA_API_KEY;

var media

document.querySelector("#app").innerHTML = "<p>loading...</p>";

fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
  .then(response => response.json()).then(data => {
    if (data.media_type == "video") {
      media = `<video src="${data.url}"/>`
    }else if(data.media_type == "image"){
      media=`<img src="${data.url}"/>`
    }else{
      media=`<iframe src="${data.url}"></iframe>`
    }
    document.querySelector("#app").innerHTML = `
    <h1>${data.title}</h1>
    ${media}
    <p>${data.explanation}</p>`
  }).catch(err=>{
    document.querySelector("#app"),innerHTML=`<p>Error:${err.message}</p>`
  })