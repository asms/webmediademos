# Web Audio APIs

|Concepts||
|----|----|
| [Context](#Context) | a container for an audio stream |
| [Nodes](#Nodes) | individual transformations that alter a media stream |
| [Graph](#Graph) | a series of connected audio nodes |
| [Streams](#Streams) | buffered channel for waveform audio data |

# Context
Creating an audio processing pipeline requires an [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) to store the parameters and structure for audio processing.

```js
const audioCtx = new AudioContext({
    sampleRate: 44100 // default sample rate on most systems
});
```

# Streams
Streams of media content are represented by the [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) class, consisting of audio and video tracks. The most common media streams is microphone input obtained from [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia).

```js
getInputStream = async () => {
    if (navigator.getUserMedia) {
        return navigator.getUserMedia({ audio: true, video: false });
    }
    throw new Error("user media is not available");
}
```

# Nodes
Audio processing is a series of steps that change the waveform of the audio. Each step in that series is represented by an [AudioNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode). The first node in the series is the source node; this is usally a node constructed from the user media stream.

```js
const inputStream = await getInputStream();
const source = audioCtx.createMediaStreamSource(inputStream);
```

The source node can also be created from an `<audio>` or `<video>` DOM element.

```js
const element = document.querySelector("audio#myElement");
const source = audioCtx.createMediaElementSource(element);
```

If all you want is to output audio to the speakers, then you can use `context.destination`. If you need to output the audio as a stream to a file or to another user via WebRTC, then you will need to create a destination node.

```js
const destination = audioCtx.createMediaStreamDestination();
const outputStream = destination.stream;
```

# Graph
Nodes can alter a media stream's waveform, but they will not work unless you connect them together to form a graph.

```js
node1.connect(node2);
```

# Examples

## Control the volume of an audio element
```js
const audioPlayer = document.querySelector("audio#player");
const volumeControl = document.querySelector("input[type=range]#volume");

// create graph
const audioCtx = new AudioContext()

// add nodes
const source = audioCtx.createMediaElementSource(audioPlayer);
const gainNode = audioCtx.createGain();
const { destination } = audioCtx;

// add vertices
source.connect(gainNode);
gainNode.connect(destination);

// control audio node parameters
range.onchange = () => {
    gainNode.gain.value = volumeControl.value;
};
```