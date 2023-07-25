import {useState} from 'react'
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai'

const Pagmentation = props => {
  const [increase, increaseOffset] = useState(0)
  const clickForward = () => {
    const {sendOffset} = props
    increaseOffset(increase + 10)
    sendOffset(increase)
  }

  return (
    <>
      <AiOutlineLeft className="arrow" />
      <p className="slides">1 of 20</p>
      <AiOutlineRight className="arrow" onClick={clickForward} />
    </>
  )
}
export default Pagmentation
