import {Component} from 'react'

import './index.css'

class Counter extends Component {
  state = {
    count: 0,
  }

  onDecrement = () => {
    const {count} = this.state
    if (count === 0) {
      this.setState(pv => ({count: pv.count + 1}))
    }
    this.setState(pv => ({count: pv.count - 1}))
  }

  onIncrement = () => {
    this.setState(pv => ({count: pv.count + 1}))
  }

  render() {
    const {count} = this.state
    return (
      <div className="counter-direction">
        <button type="button" className="counter" onClick={this.onDecrement}>
          -
        </button>
        <div className="counter-number">{count}</div>
        <button type="button" className="counter" onClick={this.onIncrement}>
          +
        </button>
      </div>
    )
  }
}

export default Counter
