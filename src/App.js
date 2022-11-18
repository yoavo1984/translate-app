import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Dictaphone from './Components/Dictaphone';
import SmallWorld from './Components/SmallWorld';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Stentence, {CorrectSentence} from './Components/Sentence';

const spanishLyrics = `En el mundo hay risas y dolor.
Esperanzas y hay tambien temor.
Mucho hay en verdad, que poder compartir.
Entre la humanidad.

Muy pequeño el mundo es.
Muy pequeño el mundo es.
Debe haber mas hermandad.
Muy pequeño es.

Una luna hay solo hay un sol.
Para todos brillan sin distincion.
Y aunque muy grandes son, las montañas y el mar.
Muy pequeño el mundo es.

Muy pequeño el mundo es.
Muy pequeño el mundo es.
Debe haber mas hermandad.
Muy pequeño es.`;

const lyrics = `It's a world of laughter, a world of tears.
It's a world of hopes and a world of fears.
There's so much that we share, that it's time we're aware
It's a small world after all.
It's a small world after all.
It's a small world after all.
It's a small world after all.
It's a small, small world.
There is just one moon and one golden sun.
And a smile means friendship to everyone.
Though the mountains divide, and the oceans are wide
It's a small world after all.
It's a small world after all.
It's a small world after all.
It's a small world after all.
It's a small, small world.`;

// break down spanish lyrics into an array of sentences
const spanishLyricsArray = spanishLyrics.split('.');
const lyricsArray = spanishLyrics.split('.');

function App() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState([]);
  const [analyze, setAnalyze] = useState(true);
  const {
    transcript,
    listening,
    finalTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const translted = spanishLyricsArray.slice(0, step).map((sentence, index) => {
    return (
      <CorrectSentence text={sentence} isCorrect={scores[index] > 0.75}>{scores[index]}</CorrectSentence>
    )
  });

  const handleStart = () => {
    resetTranscript();
    setAnalyze(true);
  }

  // check if transcript is greater than 5 and listening is false
  if (finalTranscript.length > 5 && !listening && analyze) {
    console.log('This is your transcript: ', transcript);
    // preform an API get call to compare transcript to lyrics
    fetch(`http://0.0.0.0:8080/compare?sent1=${finalTranscript}&sent2=${spanishLyricsArray[step]}`)
    .then(response => response.json())
    .then(data => setScores([...scores, data.score]));

    setStep(step + 1);
    setAnalyze(false);
  }

  return (
  // Return 2 divs side by side one containing the lyrics to the song and the other containing the dictaphone

    <div style={{display:'flex', flexDirection:'row'}}>
      <SmallWorld currentSentence={step}/>

      <div style={{display:'flex', flexDirection:'column', height: '750px', width: '500px',  alignItems: 'center',  border: '5px solid #0F0000'}}>
        <Dictaphone  listening={listening} transcript={transcript} resetTranscript={handleStart}/>
      </div>

      <div style={{display:'flex', flexDirection:'column', height: '750px', width: '500px',  alignItems: 'center',  border: '5px solid #0F0000'}}>
        {/* <p>Your score = {score}</p> */}
        <h3>Muy pequeño el mundo es.</h3>
        {translted}
      </div>
    </div>
);}


export default App;
