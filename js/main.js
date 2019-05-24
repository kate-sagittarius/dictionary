document.getElementById('search-button').onclick = () => {
  let word = document.getElementById('search-field').value;
  axios.get(`http://api.urbandictionary.com/v0/define?term=${word}`)
      .then(response => {
        console.log(response);

        let main = document.getElementById('main-section');
        main.innerHTML = '';

        response.data.list.forEach((x, i) => {
          console.log(x);
          let card = document.createElement('div');
          card.setAttribute("class", "main-section__card");
          main.appendChild(card);

          let cardWord = document.createElement('div');
          cardWord.setAttribute("class", "main-section__card__word");
          card.appendChild(cardWord);

          let cardNumber = document.createElement('h3');
          if (i == 0) {
            cardNumber.innerHTML = 'Top definition';
            cardNumber.setAttribute("class", "main-section__card__number main-section__card__number--top")
          } else {
            cardNumber.setAttribute("class", "main-section__card__number");
            cardNumber.innerHTML = i;
          }
          cardWord.appendChild(cardNumber);

          let wordName = document.createElement('h2');
          wordName.setAttribute("class", "main-section__card__word-name");
          wordName.innerHTML = x.word;
          cardWord.appendChild(wordName);

          let author = document.createElement('h4');
          author.setAttribute("class", "main-section__card__author");
          author.innerHTML = x.author;
          card.appendChild(author);

          let cardDefinition = document.createElement('div');
          cardDefinition.setAttribute("class", "main-section__card__text");
          card.appendChild(cardDefinition);
          let cardDefinitionHeading = document.createElement('strong');
          cardDefinitionHeading.innerHTML = 'Definitions';
          cardDefinition.appendChild(cardDefinitionHeading);
          let cardDefinitionText = document.createElement('p');
          cardDefinitionText.innerHTML = x.definition.replace(/[\[\]]/g, '');
          cardDefinition.appendChild(cardDefinitionText);

          let cardExample = document.createElement('div');
          cardExample.setAttribute("class", "main-section__card__text");
          card.appendChild(cardExample);
          let cardExampleHeading = document.createElement('strong');
          cardExampleHeading.innerHTML = 'Examples';
          cardExample.appendChild(cardExampleHeading);
          let cardExampleText = document.createElement('p');
          cardExampleText.innerHTML = x.example.replace(/[\[\]]/g, '');
          cardExample.appendChild(cardExampleText);

          let cardLikes = document.createElement('div');
          cardLikes.setAttribute("class", "main-section__card__likes");
          card.appendChild(cardLikes);
          let likeImg = document.createElement('img');
          likeImg.setAttribute("class", "like-img");
          likeImg.setAttribute("src", "images/heart.svg");
          likeImg.setAttribute("alt", "Like");
          cardLikes.appendChild(likeImg);
          let likeNums = document.createElement('p');
          likeNums.setAttribute("class", "number number-of-likes");
          likeNums.innerHTML = x.thumbs_up;
          cardLikes.appendChild(likeNums);

          likeImg.onclick = () => {
            likeNums.innerHTML = parseInt(likeNums.innerHTML, 10) + 1;
          };

        })


  })
}
