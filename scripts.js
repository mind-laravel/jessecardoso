// Validação do formulário
const contactForm = document.getElementById('contactForm');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const mensagemInput = document.getElementById('mensagem');
const successMessage = document.getElementById('successMessage');

// Função para validar nome
function validarNome() {
    const nome = nomeInput.value.trim();
    const nomeGroup = nomeInput.parentElement;

    // Remove classes anteriores
    nomeGroup.classList.remove('error', 'success');

    if (nome.length === 0) {
        return false; // Não mostra erro se campo estiver vazio
    }

    if (nome.length < 3) {
        nomeGroup.classList.add('error');
        return false;
    }

    nomeGroup.classList.add('success');
    return true;
}

// Função para validar email
function validarEmail() {
    const email = emailInput.value.trim();
    const emailGroup = emailInput.parentElement;

    // Remove classes anteriores
    emailGroup.classList.remove('error', 'success');

    if (email.length === 0) {
        return false; // Não mostra erro se campo estiver vazio
    }

    // Regex para validar formato de email
    // Copie da internet... nao sabia como fazer...
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        emailGroup.classList.add('error');
        return false;
    }

    // Validação adicional: mínimo 3 caracteres antes do @
    const emailParts = email.split('@');
    if (emailParts[0].length < 3) {
        emailGroup.classList.add('error');
        return false;
    }

    emailGroup.classList.add('success');
    return true;
}

// Função para validar mensagem
function validarMensagem() {
    const mensagem = mensagemInput.value.trim();
    const mensagemGroup = mensagemInput.parentElement;

    // Remove classes anteriores
    mensagemGroup.classList.remove('error', 'success');

    if (mensagem.length === 0) {
        return false; // Não mostra erro se campo estiver vazio
    }

    if (mensagem.length < 10) {
        mensagemGroup.classList.add('error');
        return false;
    }

    mensagemGroup.classList.add('success');
    return true;
}

// Validação enquanto o usuário digita
nomeInput.addEventListener('blur', validarNome);
nomeInput.addEventListener('input', function () {
    if (nomeInput.value.trim().length > 0) {
        validarNome();
    }
});

emailInput.addEventListener('blur', validarEmail);
emailInput.addEventListener('input', function () {
    if (emailInput.value.trim().length > 0) {
        validarEmail();
    }
});

mensagemInput.addEventListener('blur', validarMensagem);
mensagemInput.addEventListener('input', function () {
    if (mensagemInput.value.trim().length > 0) {
        validarMensagem();
    }
});

// Submissão do formulário com validação
contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Previne o envio real do formulário

    // Captura os valores dos campos
    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const mensagem = mensagemInput.value.trim();

    // Validação: verifica se os campos estão vazios
    let isValid = true;

    if (nome.length === 0) {
        nomeInput.parentElement.classList.add('error');
        isValid = false;
    }

    if (email.length === 0) {
        emailInput.parentElement.classList.add('error');
        isValid = false;
    }

    if (mensagem.length === 0) {
        mensagemInput.parentElement.classList.add('error');
        isValid = false;
    }

    // Se algum campo estiver vazio, interrompe
    if (!isValid) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Executa validações individuais
    const nomeValido = validarNome();
    const emailValido = validarEmail();
    const mensagemValida = validarMensagem();

    // Verifica se todas as validações passaram
    if (!nomeValido || !emailValido || !mensagemValida) {
        alert('Por favor, corrija os erros no formulário antes de enviar.');
        return;
    }

    // Se todas as validações passarem, simula o envio
    // Exibe alerta de sucesso
    alert('Mensagem enviada com sucesso!');

    // Limpa os campos do formulário
    contactForm.reset();

    // Remove classes de validação
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error', 'success');
    });

    // Exibe a mensagem de sucesso visual
    successMessage.classList.add('show');

    // Oculta a mensagem após 5 segundos
    setTimeout(function () {
        successMessage.classList.remove('show');
    }, 5000);
});

// Navegação suave para as seções (smooth scroll)
// Sempre uso este codigo para suavizar o scroll...
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});