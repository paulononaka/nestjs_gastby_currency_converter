import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import Context from './context'
import HistoryLoading from './history_loading'

export default () => {
  const [loading, setLoading] = useState(true)
  const { historyList: historyList, historyListDispatch } = useContext(Context)

  const fetchHistory = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/history`)

      await historyListDispatch({ type: 'FETCH_HISTORY', payload: data })
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  return (
    <>
      <div className="smart-green">
        <h1>Last 10 requests:</h1>
        {loading ? (
          <HistoryLoading />
        ) : (
          <>
            {historyList && (
              <ul>
                {historyList.map(({ _id, amount, from, to, response }) => (
                  <li key={_id}>
                    {amount} {from} to {to} = {response}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </>
  )
}
