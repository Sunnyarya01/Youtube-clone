let q = document.getElementById("query").value;

let search = async ()=> {
    let query = document.getElementById("query").value;
    let data = await getData(query);
    append(data)
}
let GetData = async ()=> {
    let url = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&key=AIzaSyC4H9-W6dFU3igtKkKsUC11LnllulZHdnw';

    let res = await fetch(url);
    let data = await res.json();
    append(data.items);
}
// 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&key=AIzaSyC4H9-W6dFU3igtKkKsUC11LnllulZHdnw'
let getData = async (query)=> {
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=200&q=${query}&key=AIzaSyC4H9-W6dFU3igtKkKsUC11LnllulZHdnw`;

    let res = await fetch(url);
    let data = await res.json();
    return data.items;
}

let append = (data)=> {
    let container = document.querySelector("#container");
    container.innerHTML = null;
    data.forEach((element) => {
        let img = document.createElement("img");
        img.src = element.snippet.thumbnails.medium.url;

        let h3 = document.createElement("h3");
        h3.innerText = element.snippet.title;

        let div = document.createElement("div");
        div.onclick = () => {
            saveVideo(element);
        }
        div.setAttribute("class","video");
        div.append(img, h3);
        container.append(div);
    });
};

let saveVideo = (data) =>{
    localStorage.setItem('video',JSON.stringify(data));
    window.location.href = "play_video.html";
}
GetData();
 
let filter = async ()=>{
    let data = await getData(q);
    data  = data.sort((a, b)=>{
        if(a.snippet.title>b.snippet.title) return -1
        if(a.snippet.title>b.snippet.title) return 1
        return 0
    })
    console.log(data);

    append(data)
}