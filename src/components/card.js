import axios from "axios"

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  const card = document.createElement('div')
  const heading = document.createElement('div')
  const author = document.createElement('div')
  const container = document.createElement('div')
  const img = document.createElement('img')
  const credit = document.createElement('span')

  card.classList = 'card'
  heading.classList = 'headline'
  heading.textContent = article.headline
  author.classList = 'author'
  container.classList = 'img-container'
  img.src = article.authorPhoto
  img.alt = 'author photo'
  credit.textContent = `By ${article.authorName}`

  card.appendChild(heading)
  card.appendChild(author)
  author.appendChild(container)
  container.appendChild(img)
  author.appendChild(credit)
  card.addEventListener('click', (evt) => {
    console.log(article.headline)
  })

  return card
}
const container = document.querySelector('.cards-container')

// container.appendChild(Card({headline: 'aaa', authorPhoto: 'https://avatars.githubusercontent.com/u/84542261?v=4', authorName: 'isaac'}));
const articlesArr = [];

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  const tag = document.querySelector(selector)

  axios.get('http://localhost:5001/api/articles')
    .then(res => {
      Object.values(res.data.articles).forEach(element => {
        element.forEach(el => {
          articlesArr.push(el)
        })
      })

      articlesArr.forEach(element => {
        tag.appendChild(Card(element))})
      })
    .catch(err => console.log(err))

}

export { Card, cardAppender }
