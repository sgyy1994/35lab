import { Component } from 'react'
import VConsole from 'vconsole'
import './app.scss'

new VConsole()

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError (e) {
    console.error(e)
  }

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
