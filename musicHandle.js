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

const channel = new BroadcastChannel('Music');

channel.postMessage({ type: 'getSongInfo' });

channel.onmessage = function(event) {
    const responseData = event.data;
    const responseType = responseData.type;
  
    switch (responseType) {
      case 'getSongInfoR':
        const info = responseData.info; // Corrected accessing the 'info' property
        console.log('Received info:', info);
        break;
  
      default:
        console.log('Received unexpected response type:', responseType);
    }
  };
  