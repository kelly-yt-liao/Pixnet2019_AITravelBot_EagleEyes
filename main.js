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
