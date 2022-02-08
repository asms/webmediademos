const audioCtx = new AudioContext();

const playSound = (value) => {
  const oscillator = audioCtx.createOscillator()
  oscillator.type = "sine"
  oscillator.connect(audioCtx.destination)

  oscillator.frequency.setValueAtTime(
    Math.log(value + 5) * 880,
    audioCtx.currentTime,
  );
  oscillator.start()
  oscillator.stop(audioCtx.currentTime + 0.01);
};

// Listens to changes in the 
const observer = new MutationObserver(mutationsList => playSound(mutationsList.length));
observer.observe(document, {
  attributes: true,
  childList: true,
  subtree: true,
  characterData: true,
});