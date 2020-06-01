import React, {useReducer} from 'react'
import Context from '../components/context'
import historyReducer from './HistoryReducer'

export default ({ children }) => {
  const [historyList, historyListDispatch] = useReducer(historyReducer, [])

  return (
    <Context.Provider
      value={{
          historyList,
          historyListDispatch}}
    >
      {children}
    </Context.Provider>
  )
}
