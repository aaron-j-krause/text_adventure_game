import React from 'react'
import ReactDOM from 'react-dom'

import MainView from './components/main_view'

import '../style.css'

const contentArea = document.createElement('main')
document.body.insertBefore(contentArea, document.body.firstChild)

ReactDOM.render(<MainView />, contentArea)
