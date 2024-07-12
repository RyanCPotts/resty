/* eslint-disable react/prop-types */
import React from 'react'

const History = ({history, handleHistory})=>{
    return(
        <>
        <h3>History</h3>
        <ul>
            {history.map((item, idx)=>(
                <li key={idx} onClick = {()=>handleHistory(item)}>
                    {item.method} request to: {item.url}
                </li>
            ))}
        </ul>
        </>
    )
}

export default History