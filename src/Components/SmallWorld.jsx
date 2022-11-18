import Stentence from "./Sentence";

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

const lyricsArray = lyrics.split('\n');


const SmallWorld = ({currentSentence}) => {
    const sentences = lyricsArray.map((sentence, index) => {
        return <Stentence text={sentence} highlight={index === currentSentence} />
    })

    return (
        <div style={{display:'flex', flexDirection:'column', height: '750px', width: '500px', alignItems: 'center',  border: '5px solid #FF0000' , whiteSpace: 'pre-wrap'}}>
            <h3>It's a small world after all</h3>
            {sentences}
      </div>
    )
}

export default SmallWorld;
