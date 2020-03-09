import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import uuid from 'uuid/v4'

const myId = uuid()
const socket = io('http://localhost:8080')
socket.on('connect', () => console.log('[IO] Connect => A new connection has been established'))

const Percent = () => {
    const [percent, updatePercent] = useState('')
    const [percents, updatePercents] = useState(0)

    useEffect(() => {
        const handleNewPercent = newPercent =>
            updatePercents(newPercent)
        socket.on('percent', handleNewPercent)
        return () => socket.off('percent', handleNewPercent)
    }, [percents])

    const handleSubmit = () => {
        socket.emit('percent', {
            id: myId,
            percent
        })
        updatePercent('')
    }

    return (
        <div className="div-main">
            <main className="container">
                <CircularProgressbar value={percents.percent ? percents.percent : 0} text={`${percents.percent ? percents.percent : 0}%`} />
            </main>
            <button className="button" onClick={handleSubmit}> Iniciar Loader</button>
        </div>
    )
}

export default Percent
