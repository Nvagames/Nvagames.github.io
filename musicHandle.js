const MusicChannel = new BroadcastChannel('Music');

MusicChannel.postMessage('Connected!');
MusicChannel.postMessage('connect', true);

var albumimg = document.getElementById('albumcover')

var songtitle = document.getElementById('SongTitle')
var SongArtist = document.getElementById('SongArtist')

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

      albumimg.src = 'https://nvagames.github.io/Music/' + info.songAlbumSrc
      songtitle.innerHTML = info.songname
      SongArtist.innerHTML = info.songArtist
      break;

    case 'requestAgain': 
        console.log('Recived Update Request')
        channel.postMessage({ type: 'getSongInfo' });

        break;

    default:
      console.log('Received unexpected response type:', responseType);
  }
};
