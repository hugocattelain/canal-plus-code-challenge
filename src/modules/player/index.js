import RxPlayer from 'rx-player';
import { linkPlayerEventsToState } from './events.js';

const PLAYER = ({ $destroy, state }, initOpts) => {
  const { textTrackElement } = initOpts;
  const player = new RxPlayer(initOpts);

  // facilitate DEV mode
  window.RxPlayer = RxPlayer;
  window.player = window.rxPlayer = player;

  // initial state. Written here to easily showcase it exhaustively
  state.set({
    audioBitrate: undefined,
    audioBitrateAuto: true,
    autoPlayBlocked: false,
    availableAudioBitrates: [],
    availableLanguages: [],
    availableSubtitles: [],
    availableVideoBitrates: [],
    availableVideoTracks: [],
    bufferGap: undefined,
    bufferedData: null,
    cannotLoadMetadata: false,
    currentTime: undefined,
    duration: undefined,
    error: null,
    hasCurrentContent: false,
    hasEnded: false,
    images: [],
    isBuffering: false,
    isCatchUpEnabled: false,
    isCatchingUp: false,
    isContentLoaded: false,
    isLive: false,
    isLoading: false,
    isPaused: false,
    isReloading: false,
    isSeeking: false,
    isStopped: true,
    language: undefined,
    liveGap: undefined,
    loadedVideo: null,
    lowLatencyMode: false,
    maximumPosition: undefined,
    minimumPosition: undefined,
    playbackRate: player.getPlaybackRate(),
    subtitle: undefined,
    volume: player.getVolume(),
  });

  linkPlayerEventsToState(player, state, $destroy);

  $destroy.subscribe(() => player.dispose());

  return {
    SET_VOLUME: (volume) => {
      player.setVolume(volume);
    },

    LOAD: (arg) => {
      player.loadVideo(
        Object.assign(
          {
            textTrackElement,
            transportOptions: { checkMediaSegmentIntegrity: true },
          },
          arg
        )
      );
      state.set({
        loadedVideo: arg,
      });
    },

    PLAY: () => {
      player.play();

      const { isStopped, hasEnded } = state.get();
      if (!isStopped && !hasEnded) {
        state.set({ isPaused: false });
      }
    },

    PAUSE: () => {
      player.pause();

      const { isStopped, hasEnded } = state.get();
      if (!isStopped && !hasEnded) {
        state.set({ isPaused: true });
      }
    },

    JUMP: (position) => {
      player.seekTo(position.value);
    },
  };
};

export default PLAYER;
