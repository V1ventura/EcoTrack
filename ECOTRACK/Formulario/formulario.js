document.querySelector('.hamburger').addEventListener('click', function() {
  document.querySelector('nav').classList.toggle('active');
});

emailjs.init('K2azkoJwEk3vXTFdG');

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }

    const phone = document.getElementById('phone').value;
    const phonePattern = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    if (!phonePattern.test(phone)) {
        alert('Por favor, insira um número de telefone válido.');
        return;
    }

    emailjs.sendForm('service_z4qxrgh', 'template_13yc5ui', this)
        .then(function() {
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            document.getElementById('contactForm').reset();
        }, function(error) {
            console.error('Erro:', error);
            alert('Erro ao enviar a mensagem. Tente novamente mais tarde.');
        });
});

document.getElementById('logoutBtn').addEventListener('click', function() {
    if (confirm('Tem certeza que deseja sair da sua conta?')) {
        alert('Você foi desconectado com sucesso.');
        window.location.href = 'index.html';
    }
});
function maskPhone(event) {
    let input = event.target;
    let value = input.value.replace(/\D/g, ""); 
    
    if (value.length > 10) {
        
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (value.length > 5) {
        
        value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else if (value.length > 2) {
        value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
    }
    input.value = value;
}

document.getElementById('phone').addEventListener('input', maskPhone);
