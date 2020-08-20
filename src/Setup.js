import React, { useEffect, useContext, useState } from 'react';
import WaveformPlaylist from 'waveform-playlist';
import { Store } from './store';
import Player from './Player';

const loadingStates = Object.freeze({
  loading: 'loading',
  loaded: 'loaded',
  error: 'error',
});

const Setup = () => {
  const { update } = useContext(Store);
  const [loadingState, setLoadingState] = useState(loadingStates.loading);

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
        timescale: true,
        zoomLevels: [500, 1000, 3000, 5000]
      });
      window.p = playlist;
  
      await playlist.load([
        { src: 'tracks/alto.wav', name: 'alto' },
        { src: 'tracks/bari.wav', name: 'bari' },
        { src: 'tracks/tenor.wav', name: 'tenor' },
      ]);

      update({ playlist });
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
          update({ isRendering: false });
        }
      });

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        playlist.initRecorder(stream);
        playlist.initExporter();
        update({ stream });
      } catch (e) {
        console.error('Access to microphone not granted by user', e);
      }
    })();
  }, []);

  return (
    <main>
      {
        loadingState === loadingStates.loaded ? (
          <Player />
        ) : <>Loading...</>
      }

      <section>
        <div id="playlist"></div>
      </section>
    </main>
  );
}

export default Setup;