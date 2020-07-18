import React, { useEffect } from 'react';
import WaveformPlaylist from 'waveform-playlist';

function App() {
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
      ])
      .then(() => {
        console.log('Loaded')
      });
  }, []);

  return (
    <div id="playlist"></div>
  );
}

export default App;
