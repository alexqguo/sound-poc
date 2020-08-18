import React, { useEffect, useState } from 'react';
import WaveformPlaylist from 'waveform-playlist';
import { ButtonGroup, Button } from 'react-bootstrap';
import Player from './Player';

const loadingStates = Object.freeze({
  loading: 'loading',
  loaded: 'loaded',
  error: 'error',
});

function App() {
  const [loadingState, setLoadingState] = useState(loadingStates.loading);
  const [playlist, setPlaylist] = useState(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    (async function() {
      console.log(WaveformPlaylist.prototype);
      const playlist = WaveformPlaylist({
        samplesPerPixel: 3000,
        waveHeight: 120,
        container: document.getElementById('playlist'),
        state: 'cursor',
        colors: {
          waveOutlineColor: '#E0EFF1',
          timeColor: 'grey',
          fadeColor: 'black'
        },
        controls: {
          show: true,
          width: 200
        },
        zoomLevels: [500, 1000, 3000, 5000]
      });
      window.p = playlist;
  
      await playlist.load([
        { src: 'tracks/alto.wav', name: 'alto' },
        { src: 'tracks/bari.wav', name: 'bari' },
        { src: 'tracks/tenor.wav', name: 'tenor' },
      ]);

      setPlaylist(playlist);
      setLoadingState(loadingStates.loaded);
      const ee = playlist.getEventEmitter();

      ee.on('audiorenderingfinished', (type, data) => {
        if (type === 'wav') {
          const url = window.URL.createObjectURL(data);
          const anchor = document.createElement('a');
          anchor.setAttribute('href', url);
          anchor.setAttribute('download', `${Date.now()}.wav`)
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);
        }
      });

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        playlist.initRecorder(stream);
        playlist.initExporter();
        setStream(stream);
      } catch (e) {
        console.error('Access to microphone not granted by user', e);
      }
    })();
  }, []);

  // record example: https://github.com/naomiaro/waveform-playlist/blob/master/ghpages/js/record.js
  return (
    <main>
      {
        loadingState === loadingStates.loaded ? (
          <Player 
            playlist={playlist}
            stream={stream}
          />
        ) : <>Loading...</>
      }

      <section>
        <div id="playlist"></div>
      </section>
    </main>
  );
}

export default App;
