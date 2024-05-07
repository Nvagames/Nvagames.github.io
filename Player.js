var Music = document.getElementById('Paudio')
var title = document.getElementById('SongName')
var artist = document.getElementById('Artist')
var cover2 = document.getElementById('Playericon')
//conditions 

var loop = false;

//FUNCTIONS


var songAlbumURL;


//NOVAGAMES STUFF

var songnameOUT = null;

var songArtistOUT = null;

var songAlbumSrcOUT = null;


var MusicChannel = new BroadcastChannel('Music');


MusicChannel.onmessage = function(event) {
  const requestData = event.data;
  const requestType = requestData.type;

  switch (requestType) {
    case 'getSongInfo':
      var songIfo = {
        songname: songnameOUT,
        songAlbumSrc: songAlbumSrcOUT,
        songArtist: songArtistOUT,
      };

      MusicChannel.postMessage({ type: 'getSongInfoR', data: songIfo });
      break;

    default:
      console.log('Received unexpected request type:', requestType);
  }
};



function showPlay() {
    document.getElementById('audio_play').style.display = 'none'
    document.getElementById('audio_pause').style.display = 'block'
}

function showPause() {
    document.getElementById('audio_play').style.display = 'block'
    document.getElementById('audio_pause').style.display = 'none'
}

function showLoop() {
    document.getElementById('loop').style.display = 'none'
    document.getElementById('loop2').style.display = 'block'
}

function showLoopp() {
    document.getElementById('loop').style.display = 'block'
    document.getElementById('loop2').style.display = 'none'
}






var songQueue = [

]






//END
var ManuelSelect;
var currentSong2;
var isAL;
var contextaudiomade = false
    function play(song, title2, by, img, num, R, ISAL) {
        songnameOUT = title2
        songArtistOUT = by
        songAlbumSrcOUT = img
        
         songIfo = {
            songname: songnameOUT,
            songAlbumSrc: songAlbumSrcOUT,
            songArtist: songArtistOUT,
        };

        console.log(songIfo)

        MusicChannel.postMessage({ type: 'requestAgain' });

        
        //alert("Playing " + songInfo.TITLE + " by " + songInfo.BY);
        makeAUDIOAC()
        if(contextaudiomade === true) {
            console.warn('A Background Has Been Made!')
        } else {
            setvisualbg()
            contextaudiomade = true
        }

        if(R || R === false) {
            ManuelSelect = false
        } else {
            songAlbumURL = CurrentDir
            ManuelSelect = true
        }

        if(ISAL === true) {
            isAL = true
        } else {
            isAL = false
        }

        if(num) {
            currentSong2 = num
        }
        title.innerHTML = title2
        artist.innerHTML = by
        cover2.src = img
        Music.setAttribute('src', song)
        Music.addEventListener('canplaythrough', () => {
            Music.play()
        });

        if ("mediaSession" in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
             
              title: title2,
              artist: by,
              album: '',
              artwork: [
                { src: img,   sizes: '96x96',   type: 'image/png' },
                { src: img, sizes: '128x128', type: 'image/png' },
                { src: img, sizes: '192x192', type: 'image/png' },
                { src: img, sizes: '256x256', type: 'image/png' },
                { src: img, sizes: '384x384', type: 'image/png' },
                { src: img, sizes: '512x512', type: 'image/png' },
              ]
            });
        } else {
            navigator.mediaSession.metadata = new MediaMetadata({
             
                title: title2,
                artist: by,
                album: '',
                artwork: [
                  { src: img,   sizes: '96x96',   type: 'image/png' },
                  { src: img, sizes: '128x128', type: 'image/png' },
                  { src: img, sizes: '192x192', type: 'image/png' },
                  { src: img, sizes: '256x256', type: 'image/png' },
                  { src: img, sizes: '384x384', type: 'image/png' },
                  { src: img, sizes: '512x512', type: 'image/png' },
                ]
            });
        }
    }
    

    Music.addEventListener('play', () => {
        showPlay()
    });

    Music.addEventListener('pause', () => {
        showPause()
    });

    Music.addEventListener('ended', () => {
        if(loop===true) {
            Music.currentTime = 0;
        } else {
        handleNext()
        }
        console.log(currentSong2)

    });



    function playRandomSongs() {
        var songData;

        var jsonUrl;

        jsonUrl = './master.json';

        fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            songData = data;

            // Convert the keys of songData to an array
            var songKeys = Object.keys(songData);

            // Get a random index within the bounds of songKeys
            var randomIndex = Math.floor(Math.random() * songKeys.length);

            // Get the random item from songData using the random key
            var randomSong = songData[songKeys[randomIndex]];
            if(randomSong.TITLEE==='@') {
                playRandomSongs()
            } else {
                var idLower230 = randomSong.TITLE.toLowerCase();

                play(randomSong.path, randomSong.TITLE, randomSong.BY, randomSong.COVER, idLower230, true);

                console.log('Random item:', randomSong);
            }
        });
    }

    var isAlbumEnd = false;
    function handleNext() {
        if(ManuelSelect===false && isAL === false && songQueue.length == 0) {
            playRandomSongs()
        } else if(songQueue.length == 0 && songAlbumURL) {
            autoPlay();
        } else if(songQueue.length > 0) {
            var myDiv9 = document.getElementById("queueSongs");

            var firstElementT = myDiv9.querySelector("*");
            var KEYFORSONG = firstElementT.getAttribute('songq')
            console.log(firstElementT);

          
            var songFoundd = null;
            var GetDataTimes = 0

            for (var i = 0; i < songQueue.length; i++) {
                GetDataTimes++
                if (songQueue[i].hasOwnProperty(KEYFORSONG)) {
                    songFoundd = songQueue[i][KEYFORSONG];
                    break;
                }
            }

            if (songFoundd !== null) {
                console.log(songFoundd);
            } else {
                console.log('Song not found');
            }
            var idLower230 = songFoundd.TITLE.toLowerCase();

            play(songFoundd.path, songFoundd.TITLE, songFoundd.BY, songFoundd.COVER, idLower230, true);



            let removedFirstOccurrence = false;

        
            for (var i = 0; i < songQueue.length; i++) {
            let songObject = songQueue[i];
            let songName = Object.keys(songObject)[0]; 

            if (!removedFirstOccurrence && songName === KEYFORSONG) {
                songQueue.splice(i, 1);
                removedFirstOccurrence = true;
            }
            }

          
            console.log(songQueue)
            firstElementT.remove()
        } else {
            playRandomSongs()
        }
    }

    function autoPlay() {
        var songData;

        var jsonUrl;
        
        
        
            jsonUrl = songAlbumURL

            fetch(jsonUrl)
            .then(response => response.json())
            .then(data => {
            songData = data; 

            var songKeys = Object.keys(songData);

            var currentIndex = songKeys.indexOf(currentSong2);
        
            if (currentIndex !== -1 && currentIndex < songKeys.length - 1) {
                var nextKey = songKeys[currentIndex + 1];
                var songE = songData[nextKey]
                var idLower2 = songE.TITLE.toLowerCase()
                play(songE.path, songE.TITLE, songE.BY, songE.COVER, idLower2, false, true);

            } else {
                console.log('?')
                if(currentIndex + 1 === songKeys.length) {
                    console.log('last song')
                    ManuelSelect = false
                    isAL = false
                    handleNext()
                } else {
                    handleNext()
                }
                //console.log(currentIndex)
                //console.log(songKeys.length)
            }

        });
    }
   





    var timesQ = 0;
    
    function addToQ(name) {
        var song = CurrentArray[name];
    
        if (song) {
            timesQ++;
    
            var idLower5 = name.toLowerCase() + 'Queue' + timesQ;
    
         
            var item = {
                [name]: song
            };
    
            songQueue.push(item);
    
            var songDiv5 = document.createElement('div');
            songDiv5.setAttribute('id', idLower5);
            songDiv5.setAttribute('AR', name.toLowerCase());
            songDiv5.setAttribute('SongQ', name.toLowerCase());

            songDiv5.classList.add('Queueitem');
            songDiv5.innerHTML = `
                <img src="${song.COVER}" alt="${song.TITLE} Cover" class="coverSmall">
                <p class="smallTXT">${name}</p>
                <p class="art">${song.BY}</p>
                <i class="material-icons upQueue" onclick="moveItemInQueue(event, 'up')">expand_less</i>
                <i class="material-icons downQueue" onclick="moveItemInQueue(event, 'down')">expand_more</i>
            `;
    
            document.getElementById('queueSongs').appendChild(songDiv5);
    
            console.log('added');
            console.log(songQueue);
        } else {
            console.log('Song not found in CurrentArray');
        }
    }
    

    function moveItemInQueue(event, direction) {
        var clickedElement = event.target;
        var parentElement = clickedElement.parentNode;
    
        var PLACEMENT = parentElement.getAttribute('ar');
    
        var container = document.getElementById('queueSongs');
        var elements = Array.from(container.querySelectorAll("div"));
    
        elements.sort(function(a, b) {
            return parseInt(a.getAttribute('ar')) - parseInt(b.getAttribute('ar'));
        });
    
        var currentIndex = elements.indexOf(parentElement);
    
        if (direction === 'up' && currentIndex > 0) {
            elements.splice(currentIndex, 1);
            elements.splice(currentIndex - 1, 0, parentElement);
    
            for (var i = 0; i < elements.length; i++) {
                elements[i].setAttribute('ar', i + 1);
            }
        } else if (direction === 'down' && currentIndex < elements.length - 1) {
            elements.splice(currentIndex, 1);
            elements.splice(currentIndex + 1, 0, parentElement);
    
            for (var i = 0; i < elements.length; i++) {
                elements[i].setAttribute('ar', i + 1);
            }
        }
    
        container.innerHTML = '';
        elements.forEach(function(element) {
            container.appendChild(element);
        });
   
    }
    
  
    //To Do:

 
   
    //add songs

    //other
    
    

if(Music.paused) {
    showPause()

} else {
    showPlay()
}

function playpause() {
    
    if(Music.paused) {
        Music.play()
    } else {
        Music.pause()
    }
}

function toggleL() {
    if(loop) {
        showLoop()
        loop = false
    } else {
        showLoopp()
        console.log('t')

        loop = true
    }
}




const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const currentTimeElement = document.getElementById('curtime');
const totalTimeElement = document.getElementById('totaltime');

// Update the progress bar based on audio currentTime
Music.addEventListener('timeupdate', () => {
    const currentTime = Music.currentTime;
    const duration = Music.duration;
    const progress = (currentTime / duration) * 100;
    progressBar.style.width = progress + '%';

    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    currentTimeElement.textContent = formattedTime;

    const totalMinutes = Math.floor(duration / 60);
    const totalSeconds = Math.floor(duration % 60);
    const formattedTotalTime = `${String(totalMinutes).padStart(2, '0')}:${String(totalSeconds).padStart(2, '0')}`;
    totalTimeElement.textContent = formattedTotalTime;
});

// Update the audio currentTime when the user clicks on the progress bar
progressContainer.addEventListener('click', (e) => {
    const clickX = e.clientX - progressContainer.getBoundingClientRect().left;
    const containerWidth = progressContainer.clientWidth;
    const clickPercentage = (clickX / containerWidth);
    const newTime = Music.duration * clickPercentage;
    Music.currentTime = newTime;
});

setup()
function setup() {
    showPause()
    showLoop()

}

const volumeRange = document.getElementById('volumeRange');
const volumeValue = document.getElementById('volumeValue');

// Set initial volume to 100%
Music.volume = 0.35;
volumeRange.value = 0.35;
//volumeValue.textContent = '100%';

// Update the volume and volume value when the slider is moved
volumeRange.addEventListener('input', () => {
    const newVolume = volumeRange.value;
    Music.volume = newVolume;
    //volumeValue.textContent = `${Math.round(newVolume * 100)}%`;
});

console.log('loaded in Player.js!')
console.log('loading in 5 other scripts...')
console.warn('EQ.js Must Be Loaded In!')