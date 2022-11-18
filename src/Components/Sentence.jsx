const Stentence = ({text, highlight}) => {
    const myColor = highlight ? 'black' : 'grey';
    return <p style={{ color: myColor,  lineHeight: '0px'}}>{text}</p>
}

const CorrectSentence = ({text, isCorrect}) => {
    const myColor = isCorrect ? 'green' : 'red';
    return <p style={{ color: myColor,  lineHeight: '0px'}}>{text}</p>
}

export default Stentence;
export {CorrectSentence};