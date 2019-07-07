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

const showSearchCity = () => {
  const searchCity = document.getElementById('search-city')
  searchCity.classList.remove('hide')
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

  //city picture
  var cityElems = document.querySelectorAll('.carousel')
  var cityInstances = M.Carousel.init(cityElems, {})

  //package-tabs
  var packageElems = document.querySelectorAll('.tabs')
  var packageInstance = M.Tabs.init(packageElems, {})

  //slider
  var foodSlider = document.getElementById('food-slider')
  noUiSlider.create(foodSlider, {
    start: [200, 800],
    connect: true,
    step: 10,
    orientation: 'horizontal', // 'horizontal' or 'vertical'
    range: {
      min: 0,
      max: 1000
    },
    format: wNumb({
      prefix: '$',
      thousand: ','
    })
  })

  foodSlider.noUiSlider.on('update', function(values, handle) {
    console.log('values', values)
  })
})
