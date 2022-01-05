import React from 'react'

const Test = (props) => {

    const [text, setText] = React.useState('');

    const handleInput = (event) => {
        setText(event.target.value);
    }

    React.useEffect(() => {
        console.log('apelare')
    }, [text]);

    console.log(text)
    return (
        <div className="bg-primary">
            <p>{props.text}</p>
            <input type="text" value={text} onChange={handleInput}/>
        </div>
    )
}

export default Test
