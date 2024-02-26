document.getElementById('signup-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    // 폼 데이터 수집
    const userData = {
        username: document.getElementById('signup-username').value,
        password: document.getElementById('signup-password').value,
        name: document.getElementById('signup-name').value,
        employeeId: document.getElementById('signup-employee-id').value,
        dateOfJoining: document.getElementById('signup-date-of-joining').value,
        team: document.getElementById('signup-team').value,
        phone: document.getElementById('signup-phone').value,
        email: document.getElementById('signup-email').value
    };

    try {
        // TODO: 회원가입 요청을 여기에 구현하세요. 예:
        // await fetch('/api/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userData) });

        alert('Signup successful!');
        window.location.href = 'index.html'; // 회원가입 성공 후 로그인 페이지로 이동
    } catch (error) {
        console.error('Signup error:', error);
        alert('Signup failed. Please try again.');
    }
});
