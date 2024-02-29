import { connectDeviceAudio } from "./connectDevice";
import defaultOnAudio from "./defaultOnAudio";

declare global {
  interface Window {
    AudioContext: typeof AudioContext;
    webkitAudioContext: typeof AudioContext;
  }
}

type CSSAudioOptions = {
  src: string;
  beforeStart?: (source: AudioBufferSourceNode, context: AudioContext) => void;
  animationFrameCallback?: (analyser: AnalyserNode) => void;
};

export default async function cssAudio(options: CSSAudioOptions) {
  const { animationFrameCallback = defaultOnAudio, src } = options;
  const remoteStream = await fetch(src).then((response) =>
    response.arrayBuffer()
  );

  const userStream = await connectDeviceAudio();

  async function init() {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const source = context.createBufferSource();
    const analyser = context.createAnalyser();
    const gainNode = context.createGain();
    const userStreamSource = context.createMediaStreamSource(userStream);
    const buffer = await context.decodeAudioData(remoteStream.slice(0));

    document.documentElement.style.setProperty(
      "--track-duration",
      `${buffer.duration.toFixed(3)}`
    );

    source.buffer = buffer;
    userStreamSource
      .connect(analyser)
      .connect(gainNode)
      .connect(context.destination);
    source.addEventListener("ended", () => {
      context.close();
    });

    if (options.beforeStart) {
      options.beforeStart(source, context);
    }

    source.start(0);

    function frame() {
      animationFrameCallback(analyser);
      requestAnimationFrame(frame);
    }
    frame();

    return {
      context,
      source,
      analyser,
    };
  }

  return init;
}
