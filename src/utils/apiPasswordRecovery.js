export const BASE_URL = 'http://127.0.0.1:8000/api/v1/';

function handleResponce(res) {
    if (res.ok) {
        console.log('111')
        return res.json();
    }
    return Promise.reject(res.status);
};

export const sendEmail = (data) => {
    console.log('data', data)
    return fetch(`http://127.0.0.1:8000/api/v1/users/reset_password/`, {
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


