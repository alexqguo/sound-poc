import React, { useContext } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { Store } from './store';

const Player = () => {
  const context = useContext(Store);
  const { state, update } = context;
  const { playlist, stream } = state;

  const download = () => {
    // No other way to identify as far as I can tell
    const recordedTracks = playlist.tracks.filter(p => p.name === 'Recording');

    if (!recordedTracks.length) {
      alert('Record something to download');
    } else {
      update({ isRendering: true });
      const allTracksTemp = playlist.tracks;
      playlist.tracks = recordedTracks;
      playlist.getEventEmitter().emit('startaudiorendering', 'wav');
      playlist.tracks = allTracksTemp;
    }
  };

  return (
    <section>
      <ButtonGroup size="sm">
        <Button onClick={() => playlist.play()}>▶</Button>
        <Button onClick={() => playlist.pause()}>‖</Button>
        <Button variant="danger" onClick={() => playlist.stop()}>◻️</Button>
      </ButtonGroup>{'  '}

      <ButtonGroup size="sm">
        <Button
          variant="warning"
          disabled={!stream} 
          onClick={() => playlist.getEventEmitter().emit('record')}
        >
          Ⓡ
        </Button>
        <Button variant="success" onClick={download} disabled={state.isRendering}>
          Download recorded tracks
        </Button>
      </ButtonGroup>
    </section>
  );
};

export default Player;