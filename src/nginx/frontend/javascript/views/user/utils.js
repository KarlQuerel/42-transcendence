export function refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    return fetch('/api/token/refresh/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.access) {
            localStorage.setItem('access_token', data.access);
            return data.access;
        } else {
            throw new Error('Token refresh failed');
        }
    });
}