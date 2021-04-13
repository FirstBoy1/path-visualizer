import { useEffect, useLayoutEffect, useState } from 'react'

export function TutorialModel() {
  const [page, setPage] = useState(1)
  const [completed, setCompleted] = useState(false)

  useLayoutEffect(() => {
    const isCompleted = localStorage.getItem('tutorial-model:completed')
    if (isCompleted) setCompleted(true)
  }, [])

  useEffect(() => {
    if (completed) {
      localStorage.setItem('tutorial-model:completed', true)
    }
  }, [completed])

  if (completed) {
    return null
  }

  return (
    <div className="tutorial-model">
      <div className="tutorial-model__page">
        <div className="tutorial-model__page-count">{page}/3</div>
        Will be Implement Soon!. Just skip for now.
      </div>
      <div className="tutorial-model__btn-section">
        <button onClick={() => setCompleted(true)}>Skip</button>
        <div>
          <button
            onClick={() => setPage(page - 1)}
            style={{ marginRight: '10px' }}
          >
            Previous
          </button>
          <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>
    </div>
  )
}
