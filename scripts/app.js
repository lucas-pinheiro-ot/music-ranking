const redirectUri = 'http://localhost:8080/index.html';

const scope = 'user-read-private user-read-email';
const authUrl = new URL("https://accounts.spotify.com/authorize")

var token;
var searchResult;


const APIController = (function () {
    
    const clientId = '3b716fb29ce54f3084810ee7521387f5';
    const clientSecret = 'b76085ed042549cfa3480177bfdb9392';

    const _getToken = async () => {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa( clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    }

    const _getGenres = async (token) => {
        let url = 'https://api.spotify.com/v1/browse/categories?locale=pt_BR&limit=10&offset=0';
        const result = await fetch(url, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
        
        const data = await result.json();
        return data;
    }

    
    return {
        getToken() {
            return _getToken();
        },
        getGenres(token) {
            return _getGenres(token);
        }
    }
})();

const UIController = (function() {
    const DOMElements = {
        objList: '#list',
        objects: '.obj',
        button: '.temp',
        logbox: '#logger'
    }

    return {
        inputField() {
            return {
                button: document.querySelector(DOMElements.button),
                logger: document.querySelector(DOMElements.logbox)
            }
        }
    }
})();

const AppController = (function(UICtrl, APICtrl) {

    var DOMInputs = UICtrl.inputField();
    
    DOMInputs.button.addEventListener('click', async (e) => { buttonLog(APICtrl, DOMInputs.logger) }); 

    return {
        init() {
            // Code initialization procedures here
        }
    };
})(UIController, APIController);

AppController.init();
