const APIURL = 'http://localhost:3001/api/game/';

export async function updateGame(coworker, entries) {
    const updateURL = APIURL + coworker.id;
    return fetch(updateURL, {
        method: 'put',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ selection: coworker, entries: entries})
    })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                } else {
                    let err = { errorMessage: 'Please try again later' };
                    throw err;
                }
            }
            return resp.json();
        })
}

export async function getBoard() {
    return fetch(APIURL)
        .then(res => {
            if (!res.ok) {
                if (res.status >= 400 && res.status < 500) {
                    return res.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                } else {
                    let err = { errorMessage: 'Please try again later' };
                    throw err;
                }
            }
            return res.json();
        })
}