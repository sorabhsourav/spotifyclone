console.log("welcome to spotify");
//initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');

let myProgressBar = document.getElementById('myProgressBar');

let songItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [

    { songName: "Trucker Jatt", filePath: "songs/1.mp3", coverPath: "covers/cover1.jpg" },
    { songName: "Sadda Pyar", filePath: "songs/2.mp3", coverPath: "covers/cover2.jpg" },
    { songName: "Jhanjra", filePath: "songs/3.mp3", coverPath: "covers/cover3.jpg" },
    { songName: "Tere Baare", filePath: "songs/4.mp3", coverPath: "covers/cover4.jpg" },
    { songName: "Tera Mera Viah", filePath: "songs/5.mp3", coverPath: "covers/cover5.jpg" },
    { songName: "3 Peg", filePath: "songs/6.mp3", coverPath: "covers/cover6.webp" },
    { songName: "Zulfa De Naag", filePath: "songs/7.mp3", coverPath: "covers/cover7.jpg" },
    { songName: "Defend", filePath: "songs/8.mp3", coverPath: "covers/cover8.jpg" },
]

songItem.forEach((element, i) => {
    // console.log(Element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})



// audioElement.play();




//Handle play/pause click
masterPlay.addEventListener('click', () => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
        } else {
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        }
    })
    //listen to evenets



audioElement.addEventListener('timeupdate', () => {
    // console.log('timeupdate'); just written to check that its working in console
    //update seek bar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100) //caulculates the percentage% of song played
        // console.log(progress);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {

    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');


    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {

        makeAllPlays();

        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;

        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

    })
});
document.getElementById('forward').addEventListener('click', () => {
    if (songIndex >= 7) {
        songIndex = 0;
    } else {

        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;

    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
document.getElementById('prev').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 7;
    } else {

        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})