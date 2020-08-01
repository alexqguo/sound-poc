import React, { useEffect, useState } from 'react';
import WaveformPlaylist from 'waveform-playlist';
import { ButtonGroup, Button } from 'react-bootstrap';

const loadingStates = Object.freeze({
  loading: 'loading',
  loaded: 'loaded',
  error: 'error',
});

function App() {
  const [loadingState, setLoadingState] = useState(loadingStates.loading);
  const [playlist, setPlaylist] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    (async function() {
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
      // const ee = playlist.getEventEmitter();
      // ee.on('timeupdate', (time) => console.log(time));

      // window.addEventListener('keydown', (e) => {
      //   if (e.keyCode === 32) togglePlaying();
      // });

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        playlist.initRecorder(stream);
        setStream(stream);
      } catch (e) {
        console.error('Access to microphone not granted by user', e);
      }
    })();
  }, []);

  const togglePlaying = () => {
    if (playlist.isPlaying() && isPlaying) {
      setIsPlaying(false);
      playlist.pause();
    } else {
      setIsPlaying(true);
      playlist.play();
    }
  };

  // record example: https://github.com/naomiaro/waveform-playlist/blob/master/ghpages/js/record.js
  return (
    <main>
      {
        loadingState === loadingStates.loaded ? <section>
          <ButtonGroup size="sm">
            <Button onClick={togglePlaying}>
              {isPlaying ? 'pause' : 'play'}
            </Button>

            <Button variant="success" disabled={!stream} onClick={() => playlist.getEventEmitter().emit('record')}>
              Record
            </Button>

            <Button variant="danger" onClick={() => playlist.stop()}>
              Stop
            </Button>
          </ButtonGroup>
        </section> : null
      }

      <section>
        <div id="playlist"></div>
      </section>
    </main>
  );
}

export default App;
