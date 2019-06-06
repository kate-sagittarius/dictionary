const MAIN = document.getElementById('main-section');

const CREATE_ELEMENT = (elementName, className, parent) => {
  const tag = document.createElement(elementName);
  tag.setAttribute("class", className);
  parent.appendChild(tag);

  return tag;
};

const CREATE_CARD = (word, authorName, definitions, examples, likes, i) => {
  const card = CREATE_ELEMENT('div', 'main-section__card', MAIN);
  const cardWord = CREATE_ELEMENT('div', 'main-section__card__word', card);
  const cardNumber = CREATE_ELEMENT('h3', 'main-section__card__number', cardWord);

  if (i===0) {
    cardNumber.setAttribute("class", "main-section__card__number main-section__card__number--top");
    cardNumber.innerHTML = 'Top definition';
  } else {
    cardNumber.innerHTML = i;
  }

  const wordName = CREATE_ELEMENT('h2', 'main-section__card__word-name', cardWord);
  const author = CREATE_ELEMENT('h4', 'main-section__card__author', card);
  const cardDefinition = CREATE_ELEMENT('div', 'main-section__card__text', card);
  const cardDefinitionHeading = CREATE_ELEMENT('strong', 'main-section__card__text--strong', cardDefinition);
  const cardDefinitionText = CREATE_ELEMENT('p', 'main-section__card__text__definition', cardDefinition);
  const cardExample = CREATE_ELEMENT('div', 'main-section__card__text', card);
  const cardExampleHeading = CREATE_ELEMENT('strong', 'main-section__card__text--strong', cardExample);
  const cardExampconstext = CREATE_ELEMENT('p', 'main-section__card__text__example', cardExample);
  const cardLikes = CREATE_ELEMENT('div', 'main-section__card__likes', card);
  const likeImg = CREATE_ELEMENT('img', 'like-img', cardLikes);
  const likeNums = CREATE_ELEMENT('p', 'number number-of-likes', cardLikes);

  likeImg.setAttribute("src", "images/heart.svg");
  likeImg.setAttribute("alt", "Like");

  wordName.innerHTML = word;
  author.innerHTML = authorName;
  cardDefinitionHeading.innerHTML = 'Definitions';
  cardDefinitionText.innerHTML = definitions.replace(/[\[\]]/g, '');
  cardExampleHeading.innerHTML = 'Examples';
  cardExampconstext.innerHTML = examples.replace(/[\[\]]/g, '');
  likeNums.innerHTML = likes;

  likeImg.onclick = () => {
    likeNums.innerHTML = parseInt(likeNums.innerHTML, 10) + 1;
  };
}

document.getElementById('search-button').onclick = () => {
  const word = document.getElementById('search-field').value;
  axios.get(`http://api.urbandictionary.com/v0/define?term=${word}`)
    .then(response => {
      MAIN.innerHTML = '';
      response.data.list.forEach((x, i) => {
        CREATE_CARD(x.word, x.author, x.definition, x.example, x.thumbs_up, i);
      })
  })
}
