document.getElementById('search-button').onclick = () => {
  let word = document.getElementById('search-field').value;
  axios.get(`http://api.urbandictionary.com/v0/define?term=${word}`)
      .then(response => {
        console.log(response);

        let main = document.getElementById('main-section');
        response.data.list.forEach(x => {
          let card = document.createElement('div');
          card.setAttribute("class", "main-section__card");
          main.appendChild(card);

          let cardWord = document.createElement('div');
          cardWord.setAttribute("class", "main-section__card__word");
          card.appendChild(cardWord);

          let cardNumber = document.createElement('h3');
          cardNumber.setAttribute("class", "main-section__card__number");
          cardNumber.innerHTML = response.data.list.indexOf(x);
          cardWord.appendChild(cardNumber);

        })
  })
}
