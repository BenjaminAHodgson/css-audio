export default function defaultOnAudio(analyser: AnalyserNode) {
  const bufferLength = analyser.frequencyBinCount;

  let dataArray = new Uint8Array(bufferLength);
  analyser.getByteFrequencyData(dataArray);

  const { lowSum, midSum, highSum } = getSum(dataArray, bufferLength);

  document.documentElement.style.setProperty("--freq-low", `${lowSum}`);
  document.documentElement.style.setProperty("--freq-mid", `${midSum}`);
  document.documentElement.style.setProperty("--freq-high", `${highSum}`);
}

function getSum(dataArray: Uint8Array, bufferLength: number) {
  let lowSum = 0;
  let midSum = 0;
  let highSum = 0;
  for (let i = 0; i < bufferLength; i++) {
    if (i < bufferLength / 3) {
      lowSum += dataArray[i];
    } else if (i < (bufferLength / 3) * 2) {
      midSum += dataArray[i];
    } else {
      highSum += dataArray[i];
    }
  }
  return {
    lowSum,
    midSum,
    highSum,
  };
}
