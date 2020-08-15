import React, { useEffect, useState } from 'react';
import WaveformPlaylist from 'waveform-playlist';
import { ButtonGroup, Button } from 'react-bootstrap';

const Player = ({
  playlist,
  stream,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlaying = () => {
    if (playlist.isPlaying() && isPlaying) {
      setIsPlaying(false);
      playlist.pause();
    } else {
      setIsPlaying(true);
      playlist.play();
    }
  };

  return (
    <section>
      <ButtonGroup size="sm">
        <Button onClick={togglePlaying}>
          {isPlaying ? 'Pause' : 'Play'}
        </Button>

        <Button variant="success" disabled={!stream} onClick={() => playlist.getEventEmitter().emit('record')}>
          Record
        </Button>

        <Button variant="danger" onClick={() => playlist.stop()}>
          Stop
        </Button>

        <Button variant="success" onClick={() => playlist.getEventEmitter().emit('startaudiorendering', 'wav')}>
          Download
        </Button>
      </ButtonGroup>
    </section>
  );
};

export default Player;