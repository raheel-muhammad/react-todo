import React from 'react'

export default function Home(props) {
    const display = props.array.map((item, index) => <li key={index}>{item}</li>)


    return (
        <div>{display}</div>
    )
}
