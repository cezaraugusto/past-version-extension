import('../static/styles.css')
import * as React from 'react'
import {createRoot} from 'react-dom/client'
import Banner from './Banner'

setTimeout(initial, 1000)

function initial() {
  const root = document.createElement('div')
  root.id = 'extension-root'
  document.body.appendChild(root)
  createRoot(root).render(<Banner />)
}
