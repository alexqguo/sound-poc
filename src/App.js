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

  useEffect(() => {
    const playlist = WaveformPlaylist({
      samplesPerPixel: 3000,
      mono: true,
      waveHeight: 70,
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

    playlist
      .load([
        {
          src: 'tracks/alto.wav',
          name: 'alto',
          gain: 0.5
        },
        {
          src: 'tracks/bari.wav',
          name: 'bari'
        },
        {
          src: 'tracks/tenor.wav',
          name: 'tenor'
        }
      ])
      .then(() => {
        const ee = playlist.getEventEmitter();
        setLoadingState(loadingStates.loaded);
        setPlaylist(playlist);
        ee.on('timeupdate', (time) => console.log(time));
      });
  }, []);

  // record example: https://github.com/naomiaro/waveform-playlist/blob/master/ghpages/js/record.js

  return (
    <main>
      {
        loadingState === loadingStates.loaded ? <section>
          <ButtonGroup size="sm">
            <Button onClick={() => playlist.play()}>Play</Button>
            <Button onClick={() => playlist.pause()}>Pause</Button>
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
