var axios = require('axios');

const game = {
    "user": '',
    "answer": '',
    "completed": false,
    "entries": []
};

function getCoworkers(num, userList) {
    var size = Object.keys(userList).length;
    let numList = [];
    let i = 0;
    let coworkerList = [];
    while (i < num) {
        let rNum = Math.floor(Math.random() * (size + 1));
        if (!numList.includes(rNum)) {
            let usr = userList[rNum];
            if ("headshot" in usr && "id" in usr && "firstName" in usr && "lastName" in usr){
                if (usr.headshot.url === "undefined" || usr.id === "undefined" || usr.firstName === "undefined" || usr.lastName === "undefined")
                    continue;
                let usrObj = { id: usr.id, firstName: usr.firstName, lastName: usr.lastName, imgUrl: usr.headshot.url , selected: false, correct: false}
                coworkerList.push(usrObj);
                numList.push(rNum);
                i++;
            } else 
                continue;
        }
    }
    return coworkerList;
}

function getAnswer(entries) {
    var size = Object.keys(entries).length;
    let rNum = Math.floor(Math.random() * (size));
    let retVal = entries;
    let retStr = retVal[rNum].firstName + " " + retVal[rNum].lastName
    return retStr;
}

function getUsers() {
    var url = 'https://www.willowtreeapps.com/api/v1.0/profiles';
    return axios.get(url).then( response =>{
        return response.data;
    });
}
var newGame = Object.create(game);

exports.createGame = function (req, res) {
    getUsers().then(data => {
        let userList = data;
        newGame.entries = getCoworkers(6, userList);
        newGame.answer = getAnswer(newGame.entries);
        res.json(newGame);
    })
}

//update route
exports.updateGame = function (req, res) {
    newGame.entries.forEach(element => {
        if (req.params.gameId === element.id) {
            let fullName = element.firstName + " " + element.lastName;
            if (fullName === newGame.answer){
                element.correct = true;
            }
            element.selected = true;
        }
    });
    res.json(newGame);
};


module.exports = exports