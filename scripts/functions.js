const save_file = './temp_files/data.json'
const logger = document.getElementById('logger')

fetch(save_file)
    .then(response => {response.json()})
    .then(data => {
        addEntry(logger, data); 
    })

function buttonLog(APICtrl, log) {
    addEntry(log, 'Requesting token');

    token = APICtrl.getToken();
    token.then(result => {
        addEntry(log, 'Token result: ' + result)
    
        searchResult = APICtrl.getGenres(token);
        searchResult.then(result => {
            addEntry(log, 'Genres result: ' + result)
        }).catch(error => {
            addEntry(log, error)
        })
    }).catch(error => {
        addEntry(log, error)
    })
};

function addEntry(father, message) {
    let entry = document.createElement('p');
    entry.innerHTML = message;

    father.appendChild(entry);
};
