const endpoint = 'https://emma.pixnet.cc/mainpage/blog/categories/hot/28?api_version=2'
const data = []

const suggestion = document.querySelector('.suggestion')
const button = document.querySelectorAll('button')

function displayData(data) {
  data.forEach(article => {
    if (article.cover !== '') {
      suggestion.innerHTML += `
        <div class="suggest-item">
          <a href="${article.link}" class="list" target="_blank">
            <img class="cover"  src='${article.cover}' />
            <div>${article.title}</div>
          </a>
        </div>
      `
    }
  })
}

fetch(endpoint)
  .then(blob => blob.json())
  .then(response => {
    data.push(...response.articles)
    displayData(data)
  })

const getNowDate = () => {
  let nowDate = new Date()
  return { nowYear: nowDate.getFullYear(), nowMonth: nowDate.getMonth(), nowDate: nowDate.getDate() }
}

document.addEventListener('DOMContentLoaded', function() {
  //下拉
  const selectElems = document.querySelectorAll('select')
  const selectInstances = M.FormSelect.init(selectElems, {})

  //日期
  const { nowYear, nowMonth, nowDate } = getNowDate()
  const dateOptions = {
    defaultDate: new Date(nowYear, nowMonth, nowDate),
    setDefaultDate: true,
    format: 'yyyy / mm / dd'
  }
  const dateElems = document.querySelectorAll('.datepicker')
  const dateInstances = M.Datepicker.init(dateElems, dateOptions)
  // dateInstances.setDate(new Date(nowYear, nowMonth, nowDate))
})
