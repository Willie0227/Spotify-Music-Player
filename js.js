let index = 0

const playlist = [

    {
        name: "Faded",
        audio: "music/Alan Walker - Faded.mp3",
        author: "BY: Alan Walker",
        rate: "rating: 4 stars",
        poster: "images/MV5BZTUyYWI4Y2EtZGQ2MC00NDNiLTg3N2UtMWMwY2I1ZTViYzA4XkEyXkFqcGdeQXVyMTY5MDE5NA@@._V1_.jpg"
    },
    {
        name: "Senorita",
        audio: "music/Shawn Mendes, Camila Cabello - Señorita.mp3",
        author: "BY: Shawn Mendes",
        rate: "rating: 5 stars",
        poster: "images/artworks-000610058968-nebvy6-t500x500.jpg"

    },
    {
        name: "Yummy",
        audio: "music/Justin Bieber - Yummy (Official Video).mp3",
        audio: "music/Justin Bieber - Yummy (Official Video).mp3",
        author: "BY: Justin Bieber",
        rate: "rating: 4 stars",
        poster: "images/799f2655903a772fd93e90ba975b4730.jpg"

    },
    {
        name: "Starboy",
        audio: "music/The Weeknd - Starboy ft. Daft Punk (Official Video).mp3",
        author: "BY: The Weekend",
        rate: "rating: 4 stars",
        poster: "images/51hGPt6EKWL._AC_.jpg"

    },
    {
        name: "Waiting for love",
        audio: "music/Avicii - Waiting For Love.mp3",
        author: "BY: Avicii",
        rate: "rating: 4 stars",
        poster: "images/Avicii's_Waiting_For_Love,_Cover_Artwork.png"

    },
    {
        name: "Cold Water",
        audio: "music/Major Lazer - Cold Water (feat. Justin Bieber & MØ) (Official Lyric Video).mp3",
        author: "BY: Major Lazer",
        rate: "rating: 4 stars",
        poster: "images/MV5BZTY4ZWU1ZGEtMmJmYS00MTYyLWFiYjYtYzA2MzI0OTZiMWYwL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc2MDk5ODM@._V1_.jpg"

    },
    {
        name: "Thinking Out Loud",
        audio: "music/Ed Sheeran - Thinking Out Loud (Official Music Video).mp3",
        author: "BY: Ed Sheeran",
        rate: "rating: 5 stars",
        poster: "images/d00644b625f0421bc26c541f86773868.jpg"

    },
    {
        name: "Shape of you",
        audio: "music/Ed Sheeran - Shape of You (Official Music Video).mp3",
        author: "BY: Ed Sheeran",
        rate: "rating: 5 stars",
        poster: "images/MV5BNmVmNWQ0YjktMjE1OS00YzViLWIxYjYtYjc0ZDI2NGY1OTdjXkEyXkFqcGdeQXVyNzA1MTE4MTU@._V1_.jpg"
    }


]

for (var i = 0; i < 8; i++) {
    document.querySelector(".musicTitle" + i).innerHTML = playlist[i].name
}

for (var i = 0; i < 8; i++) {
    document.querySelector(".rate" + i).innerHTML = playlist[i].rate
}

for (var i = 0; i < 8; i++) {
    document.querySelector(".Artist" + i).innerHTML = playlist[i].author
}


// for (var i = 0; i < 8; i++) {
const pictures = document.querySelector(".musicImg")
pictures.src = playlist[0].poster
// }

var song;

function pickSong() {
    // songAddress[0].load()
    song = new Audio(playlist[index].audio);
    pictures.src = playlist[index].poster
    song.addEventListener('ended', function () {
        nextSong();
    });
}

pickSong()

function play() {
    song.play();
    console.log(song)
}


function pause() {
    song.pause();
    console.log(song)
}

let isPlay = false

function checkPlay() {
    isPlay = !isPlay
    document.querySelector("#defaultPlayPause").classList.toggle("fa-play")
    document.querySelector("#defaultPlayPause").classList.toggle("fa-pause")
    if (isPlay) {
        play()
    } else {
        pause()
    }
}

isLoop = false

function repeatSong() {
    isPlay = true
    isLoop = !isLoop
    song.loop = isLoop
    console.log(isLoop)
    document.querySelector("#defaultRepeat").classList.toggle("fa-repeat-alt")
    document.querySelector("#defaultRepeat").classList.toggle("fa-repeat-1-alt")
}

document.querySelector(".mus0").classList.add("musColor")

var songOrder = 0
var before = 0;

function nextSong() {
    isPlay = true
    document.querySelector("#defaultPlayPause").classList.remove("fa-play")
    document.querySelector("#defaultPlayPause").classList.add("fa-pause")
    song.load()
    index++
    warpIndex()
    pickSong()
    song.play();
    updateColor()
}

function warpIndex() {

    if (index >= playlist.length) {
        index = 0
    } else if (index < 0) {
        index = playlist.length - 1
    }

}

function lastSong() {
    isPlay = true
    document.querySelector("#defaultPlayPause").classList.remove("fa-play")
    document.querySelector("#defaultPlayPause").classList.add("fa-pause")
    console.log("Last Song")

    song.load()
    index--
    warpIndex()
    pickSong()
    song.play();
    updateColor()
}

function random() {

    song.load()
    playlist.sort(() => Math.random() - 0.5);

    for (var i = 0; i < 8; i++) {
        document.querySelector(".musicTitle" + i).innerHTML = playlist[i].name
    }

    pickSong();
    song.play()

}

const progressBar = document.querySelector('#progress-bar'); // element where progress bar appears

function updateProgressValue() {
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
    document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(song.currentTime)));
    if (document.querySelector('.durationTime').innerHTML === "NaN:NaN") {
        document.querySelector('.durationTime').innerHTML = "0:00";
    } else {
        document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(song.duration)));
    }
}

// convert song.currentTime and song.duration into MM:SS format
function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10) {
        sec = `0${sec}`;
    }
    ;
    return `${min}:${sec}`;
}

// run updateProgressValue function every 1/2 second to show change in progressBar and song.currentTime on the DOM
setInterval(updateProgressValue, 500);

// function where progressBar.value is changed when slider thumb is dragged without auto-playing audio
function changeProgressBar() {
    song.currentTime = progressBar.value;
}

function choice(musNum) {


    index = musNum
    updateColor()
    song.load()
    pickSong()
    isPlay = true
    song.play()
}

function updateColor() {
    for (var i = 0; i < 8; i++) {
        document.querySelector(".mus" + i).classList.remove("musColor")
    }
    document.querySelector(".mus" + index).classList.add("musColor")
}