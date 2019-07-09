const endpoint = 'https://emma.pixnet.cc/mainpage/blog/categories/hot/28?api_version=2'
const data = []

const foodSuggestions = [...document.querySelectorAll('.food-suggestion')]
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

const displayData = data => {
  data.forEach(article => {
    if (article.cover !== '') {
      foodSuggestions.forEach(item => {
        item.innerHTML += `
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
      })
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
  // console.log(stepInfo)
}

//取得行程頁面 因要選定日期 故用opacity控制不然有bug html也有做調整
const getStroke = () => {
  hideAll()
  stroke.setAttribute('style', 'opacity:1;')
  document.getElementById('day1').setAttribute('style', 'display:block;')
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
    defaultDate: new Date('2019', '00', '01'),
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
  const noUiSliderOption = {
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
  }

  //#region 推薦美食、近期活動寫死頁面-待改
  //food
  var foodSlider = document.getElementById('food-slider')
  const foodFromto = [document.getElementById('food-from'), document.getElementById('food-to')]
  noUiSlider.create(foodSlider, noUiSliderOption)

  foodSlider.noUiSlider.on('update', function(values, handle) {
    foodFromto[handle].innerText = values[handle]
  })

  //ticket
  var ticketSlider = document.getElementById('ticket-slider')
  const ticketFromto = [document.getElementById('ticket-from'), document.getElementById('ticket-to')]
  noUiSlider.create(ticketSlider, noUiSliderOption)

  ticketSlider.noUiSlider.on('update', function(values, handle) {
    ticketFromto[handle].innerText = values[handle]
  })

  //scape
  var foodSlider = document.getElementById('scape-slider')
  const scapeFromto = [document.getElementById('scape-from'), document.getElementById('scape-to')]
  noUiSlider.create(foodSlider, noUiSliderOption)

  foodSlider.noUiSlider.on('update', function(values, handle) {
    scapeFromto[handle].innerText = values[handle]
  })
  //shopping
  var shoppingSlider = document.getElementById('shopping-slider')
  const shoppingFromto = [document.getElementById('shopping-from'), document.getElementById('shopping-to')]
  noUiSlider.create(shoppingSlider, noUiSliderOption)

  foodSlider.noUiSlider.on('update', function(values, handle) {
    shoppingFromto[handle].innerText = values[handle]
  })

  //#endregion

  //提示框
  var tooltipsElems = document.querySelectorAll('.tooltipped')
  var tooltipsInstances = M.Tooltip.init(tooltipsElems, { enterDelay: 100, outDuration: 100 })
})

const hideAll = () => {
  searchCity.classList.remove('show')
  searchCity.classList.add('hide')
  package.classList.remove('show')
  package.classList.add('hide')
}
