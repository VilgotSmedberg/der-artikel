function getGender() {
    const errorMessage = document.getElementById('error-message');
    if (errorMessage) errorMessage.remove();

    const requestedWord = document.getElementById("input").value;
    const url = `https://www.qmez.de:8444/v1/scanner/es/s?w=${requestedWord}`;
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    fetch(proxyUrl + encodeURIComponent(url))
        .then(response => response.json())
        .then(data => {
            console.log(`Data: ${data.contents}`)
            const parsedData = JSON.parse(data.contents);
            const article = parsedData.article;
            const word = parsedData.word;
            if (requestedWord == word) {
                document.getElementById("genus").textContent = article;
                document.getElementById("word").innerHTML = `${word}`;
            } else {
                const container = document.getElementById('container');
                const errorMessage = document.createElement('p');
                errorMessage.textContent = 'Ord hittades inte. Prova igen.';
                errorMessage.id = 'error-message';
                container.appendChild(errorMessage);
            }

        })
        .catch(error => console.error('Error:', error));
}