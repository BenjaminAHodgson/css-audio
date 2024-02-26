import cssAudio from "css-audio";

document.addEventListener("DOMContentLoaded", async () => {
  const start = await cssAudio({
    src: "/elevator.wav",
  });

  function play() {
    start();
    document.removeEventListener("click", play);
  }

  document.addEventListener("click", play);
});
