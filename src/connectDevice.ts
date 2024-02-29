export async function connectDeviceAudio() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const speakers = devices.filter((device) => {
    return device.kind === "audiooutput";
  });
  const constraints = {
    audio: {
      deviceId: speakers[0].deviceId,
    },
  };
  const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
  return mediaStream;
}
