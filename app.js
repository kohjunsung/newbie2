document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            window.location.href = 'main.html';
        } else {
            document.getElementById('login-error').textContent = '로그인할 수 없습니다.';
        }
    } catch (error) {
        console.error('Login error:', error);
        document.getElementById('login-error').textContent = '로그인할 수 없습니다.';
    }
});
