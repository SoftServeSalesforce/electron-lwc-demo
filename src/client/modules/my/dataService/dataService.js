
let updateAccount = async function updateAccount(params) {
    const searchParams = Object.keys(params).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');

    let response = await fetch('http://localhost:3002/updateAccount', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: searchParams
    });
    const data = await response;
    return data;
}

let getAccounts = async function(){
    let response = await fetch('/getAccounts');
    const data = await response.json();
    return data.records;
}

export {updateAccount, getAccounts};