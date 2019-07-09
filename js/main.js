const endpoint = 'https://emma.pixnet.cc/mainpage/blog/categories/hot/28?api_version=2'
const data = []

const foodSuggestion = document.querySelector('.food-suggestion')
const tooltips = [...document.querySelectorAll('[data-tooltip]')]
const searchCity = document.getElementById('search-city')
const package = document.getElementById('package')
const stroke = document.getElementById('stroke')
const strokeDetails = [...document.querySelectorAll('.stroke-detail')]
const stepInfo = document.getElementById('step-info')

tooltips.forEach(item => {
  item.addEventListener('click', e => {
    const clickTarget = e.target
    if (clickTarget.nodeName === 'A' || clickTarget.parentNode.nodeName === 'A') {
      clickTarget.offsetParent.lastElementChild.classList.toggle('slide-in')
    }
  })
})

function displayData(data) {
  data.forEach(article => {
    if (article.cover !== '') {
      foodSuggestion.innerHTML += `
        <div class="suggest-item row">
          <div class="col m10">
            <a href="${article.link}" class="list" target="_blank">
              <img class="cover"  src='${article.cover}' />
              <div>${article.title}</div>
            </a>
          </div>
          <div class="col m2">
            <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a>
          </div>
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
  hideAll()
  searchCity.classList.remove('hide')
  searchCity.classList.add('show')
  stepInfo.classList.remove('hide')
}

const goPackage = () => {
  hideAll()
  package.classList.remove('hide')
  package.classList.add('show')
  console.log(stepInfo)
}

const getStroke = () => {
  hideAll()
  stroke.classList.remove('hide')
  stroke.classList.add('show')
}

const getStrokeDetail = target => {
  let point = target.dataset.point - 1
  strokeDetails.forEach(item => {
    item.classList.add('hide')
  })
  strokeDetails[point].classList.remove('hide')
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

  //預算範圍slider
  var foodSlider = document.getElementById('food-slider')
  const fromto = [document.getElementById('from'), document.getElementById('to')]
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
    fromto[handle].innerText = values[handle]
  })

  //提示框
  var tooltipsElems = document.querySelectorAll('.tooltipped')
  var tooltipsInstances = M.Tooltip.init(tooltipsElems, { enterDelay: 100, outDuration: 100 })
})

const hideAll = () => {
  searchCity.classList.remove('show')
  searchCity.classList.add('hide')
  package.classList.remove('show')
  package.classList.add('hide')
  stroke.classList.remove('show')
  stroke.classList.add('hide')
}
