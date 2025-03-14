document.getElementById("input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        getGender();
    }
})

async function getGender(word = null) {
    const errorMessage = document.getElementById('error-message');
    if (errorMessage) errorMessage.remove();

    const requestedWord = word || document.getElementById("input").value;
    const url = `https://www.qmez.de:8444/v1/scanner/es/s?w=${requestedWord}`;
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    fetch(proxyUrl + encodeURIComponent(url))
        .then(response => response.json())
        .then(async data => {
            console.log(`Data: ${data.contents}`)
            const parsedData = JSON.parse(data.contents);
            const article = parsedData.article;
            const word = parsedData.word;
            if (requestedWord == word) {
                document.getElementById("genus").textContent = article;
                document.getElementById("word").innerHTML = `${word}`;
                const translatedWordSE = await translateWord(word, 'sv');
                const translatedWordEN = await translateWord(word, 'en');
                document.getElementById('translation-swedish').innerHTML = 'SE: ' + translatedWordSE;
                document.getElementById('translation-english').innerHTML = 'EN: ' + translatedWordEN;
                
            } else {
                const container = document.getElementById('container');
                const errorMessage = document.createElement('p');
                errorMessage.innerHTML = `Ord hittades inte. Menade du <a id="error-message-a" href="#" onclick="getGender('${word}')"> ${word}</a>?`;
                errorMessage.id = 'error-message';
                container.appendChild(errorMessage);
            }

        })
        .catch(error => console.error('Error:', error));
}

async function translateWord(word, targetLang) {
    const url = `https://api.mymemory.translated.net/get?q=${word}&langpair=de|${targetLang}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.responseData.translatedText;
    } catch (error) {
        console.error('Error:', error);
        return 'Translation error';
    }
}