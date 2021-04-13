import { useState } from 'react'

function DropDown({ setAlgo, setOpen }) {
  const onClick = (algo) => {
    setAlgo(algo)
    setOpen(false)
  }

  return (
    <div className="header__dropdown">
      <div onClick={() => onClick(1)} className="header__dropdown-item">
        <span>Breadth First Search</span>
      </div>
      <div onClick={() => onClick(2)} className="header__dropdown-item">
        <span>Depth First Search</span>
      </div>
    </div>
  )
}

export function AlgoSelector({ setAlgo }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      onClick={() => setOpen(!open)}
      className={`header__item ${
        open ? 'header__algo-selector-open' : ''
      } header__algo-selector`}
    >
      Algorithms
      <span
        style={{ borderTopColor: open ? '#fff' : 'red' }}
        className="header__dropdown-icon"
      ></span>
      {open ? <DropDown setAlgo={setAlgo} setOpen={setOpen} /> : null}
    </div>
  )
}
