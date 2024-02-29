import cssAudio from "css-audio";

document.addEventListener("DOMContentLoaded", async () => {
  const start = await cssAudio({
    src: window.location.href + "/elevator.wav",
  });

  async function play() {
    togglePlayingClass();
    document.removeEventListener("click", play);

    const { source } = await start();

    source.addEventListener("ended", () => {
      togglePlayingClass();
      document.addEventListener("click", play);
    });
  }

  document.addEventListener("click", play);
});

function togglePlayingClass() {
  document.body.classList.toggle("playing");
}
