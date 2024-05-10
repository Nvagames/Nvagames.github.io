const MusicChannel = new BroadcastChannel('Music');

MusicChannel.postMessage('Connected!');
MusicChannel.postMessage('connect', true);

var albumimg = document.getElementById('albumcover')
var albumcontainer = document.getElementById('albumcontainer')

var songtitle = document.getElementById('SongTitle')
var SongArtist = document.getElementById('SongArtist')

var albumimgnote = document.getElementById('albumcovernote')

var songtitlenote = document.getElementById('SongTitlenote')

/*
albumimg.src = 'https://sz-games.github.io/Music/assets/covers/DRIPTOOHARD.jpeg'
songtitle.innerHTML = 'Drip Too Hard'
SongArtist.innerHTML = 'Lil Baby & Gunna'

albumimg.src = 'https://sz-games.github.io/Music/assets/covers/DRIPTOOHARD.jpeg'
songtitle.innerHTML = 'Testing'
SongArtist.innerHTML = 'Test'
*/

var channel = new BroadcastChannel('Music');

channel.postMessage({ type: 'getSongInfo' });


channel.onmessage = function(event) {
  var responseData = event.data;
  var responseType = responseData.type;

  switch (responseType) {
    case 'getSongInfoR':
      var info = responseData.data;
      console.log('Received info:', info);

      if(info.songAlbumSrc) {
        //albumcover
        
            albumimg.style.animation = 'hidecover  0.5s'
            albumimg.style.opacity = 0
            
            //albumcontainer
            albumcontainer.style.animation = 'blur 0.5s'
            albumcontainer.style.filter = 'blur(5px)'
            setTimeout(() => {
                albumimg.src = 'https://nvagames.github.io/Music/' + info.songAlbumSrc
            }, 200);
        
        songtitle.innerHTML = info.songname
        SongArtist.innerHTML = info.songArtist

        albumimgnote.src = 'https://nvagames.github.io/Music/' + info.songAlbumSrc
        songtitlenote.innerHTML = info.songname
        
        albumimg.onload = function() {
             
                //albumcover
                albumimg.style.animation = 'showcover  0.5s'
                albumimg.style.opacity = 1
                //albumcontainer
                albumcontainer.style.animation = 'unblur 0.5s'
                albumcontainer.style.filter = 'none'

        };
        albumimgnote.onload = function() {
            document.getElementById('nowplayingsidecont').style.display = 'block'
            document.getElementById('nowplayingsidecont').style.animation = 'effectnotemusic 1.0s'

            setTimeout(() => {
                document.getElementById('nowplayingsidecont').style.animation = 'effectnotemusicout 0.5s'
                setTimeout(() => {
                    document.getElementById('nowplayingsidecont').style.display = 'none'
                }, 450);
            }, 3000);
            
        };
      }
      break;

    case 'requestAgain': 
        console.log('Recived Update Request')
        channel.postMessage({ type: 'getSongInfo' });

        break;

    default:
      console.log('Received unexpected response type:', responseType);
  }
};
