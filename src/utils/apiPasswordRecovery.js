export const BASE_URL = 'http://shifmachine.acceleratorpracticum.ru/api/v1/';

function handleResponce(res) {
    if (res.ok) {
        return res.json();
    }
    console.log(res)
    return Promise.reject(new Error(res.status))
};

export const sendEmail = (data) => {
    return fetch(`${BASE_URL}users/reset_password/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: data,
        })
    })
        .then(handleResponce)
}


export const sendSecretQuestion = (id, answer) => {
    return fetch(`${BASE_URL}users/reset_password_question/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            answer: answer,
        })
    })
        .then(handleResponce)
}

export const sendNewPassword = (id, password, confirmPassword, token) => {
    return fetch(`${BASE_URL}users/reset_password_confirm/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            new_password: password,
            re_new_password: confirmPassword,
            token: token,

        })
    })
        .then((res) => {
            console.log(res)
            if (res.ok) {
                console.log("oki-doki")
                return res.json();
            }
            console.log(res)
            return Promise.reject(new Error(res.status))

        });
}