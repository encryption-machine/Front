export const BASE_URL = 'http://127.0.0.1:8000/api/v1/';

function handleResponce(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res.status);
};

export const sendEmail = async (data) => {
    const res = await fetch(`${BASE_URL}users/reset_password/`, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return handleResponce(res);
} 