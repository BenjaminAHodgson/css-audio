import defaultOnAudio from "./defaultOnAudio";

type CSSAudioOptions = {
  src: string;
  beforeStart?: (source: AudioBufferSourceNode, context: AudioContext) => void;
  animationFrameCallback?: (analyser: AnalyserNode) => void;
};

export default async function cssAudio(options: CSSAudioOptions) {
  const { animationFrameCallback = defaultOnAudio, src } = options;

  const result = await fetch(src).then((response) => response.arrayBuffer());

  function frame(analyser: AnalyserNode) {
    animationFrameCallback(analyser);
    requestAnimationFrame(frame.bind(null, analyser));
  }

  async function init() {
    const context = new AudioContext();
    const source = context.createBufferSource();
    const analyser = context.createAnalyser();
    const gainNode = context.createGain();
    const buffer = await context.decodeAudioData(result);

    source.buffer = buffer;
    source.connect(analyser).connect(gainNode).connect(context.destination);

    if (options.beforeStart) {
      options.beforeStart(source, context);
    }

    source.start(0);
    frame(analyser);

    return {
      context,
      source,
      analyser,
    };
  }

  return init;
}
