import React, { PropTypes } from 'react'

let uid = 0
export default function MessageList({ messages }) {
  const messageComponents = messages.map((m) => {
    uid += 1
    return <li key={uid}>{m}</li>
  })
  return (
    <ul className="log">
      {messageComponents}
    </ul>
  )
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string)
}
