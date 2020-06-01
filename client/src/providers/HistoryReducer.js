export default (historyList, action) => {
  switch (action.type) {
    case 'FETCH_HISTORY':
      return action.payload
    default:
      return historyList
  }
}
