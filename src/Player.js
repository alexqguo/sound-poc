import React, { useEffect, useState } from 'react';
import WaveformPlaylist from 'waveform-playlist';
import { ButtonGroup, Button } from 'react-bootstrap';

const Player = ({
  playlist,
  stream,
}) => {
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
        <Button variant="success" onClick={() => playlist.getEventEmitter().emit('startaudiorendering', 'wav')}>
          Download
        </Button>
      </ButtonGroup>
    </section>
  );
};

export default Player;