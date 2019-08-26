const getInitDate = days => {
  let nowDate = new Date()
  nowDate.setDate(nowDate.getDate() + days)
  return getFormatDate(nowDate)
}

const getDateDiff = (date_S, date_E) => {
  let S = new Date(date_S)
  let E = new Date(date_E)
  const dateList = []
  while (S <= E) {
    dateList.push(getFormatDate(S))
    S.setDate(S.getDate() + 1)
  }
  return dateList
}

const getFormatDate = date => {
  return date.toISOString().slice(0, 10)
}

export { getInitDate, getDateDiff }
