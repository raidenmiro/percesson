function errorResponse(error) {
  console.error(error)

  return {
    event: 'ERROR',
    message: error.message,
  }
}

let _maxTime = 0
let _timerId = null
let _currentTime = 0

self.addEventListener('message', ({ data }) => {
  const { event } = data

  try {
    if (event === 'START') {
      const { initTime } = data

      _currentTime = initTime

      _timerId = setInterval(() => {
        _currentTime -= 1

        if (_currentTime === 0) {
          clearInterval(_timerId)

          self.postMessage({
            event: 'COMPLETED',
          })
        } else {
          self.postMessage({
            event: 'TICK',
            payload: {
              time: _currentTime,
              percent: Math.floor((_currentTime * 100) / 1500),
            },
          })
        }
      }, 1000)
    }

    if (event === 'STOP' && _timerId) {
      clearInterval(_timerId)

      self.postMessage({
        event: 'STOP',
        payload: { currentTime: _currentTime },
      })
    }
  } catch (error) {
    self.postMessage(errorResponse(error))
  }
})
