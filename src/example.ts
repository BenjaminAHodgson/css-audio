import cssAudio from "./cssAudio";

document.addEventListener("DOMContentLoaded", async () => {
  const start = await cssAudio({
    src: "/lib/elevator.wav",
  });

  function play() {
    start();
    document.removeEventListener("click", play);
  }

  document.addEventListener("click", play);
});
