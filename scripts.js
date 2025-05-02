document.addEventListener('DOMContentLoaded', () => {
    // Menu Hamburger
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
            console.log('Menu toggle clicked');
        });

        document.addEventListener('click', (e) => {
            if (!navUl.contains(e.target) && !menuToggle.contains(e.target)) {
                navUl.classList.remove('active');
            }
        });
    }

    // Função para exibir o formulário e configurar o botão
    window.showForm = function(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.style.display = 'block';
            setupFormSubmit(form); // Configura o evento de submit
        }
    };

    // Configura o evento de submit para o formulário
    function setupFormSubmit(form) {
        const submitBtn = form.querySelector('.submit-btn');
        if (form && submitBtn) {
            console.log('Formulário e botão encontrados');

            submitBtn.disabled = false;
            submitBtn.style.pointerEvents = 'auto';

            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Botão Cadastrar clicado');

                // Remove mensagens anteriores
                const existingMessages = form.querySelectorAll('.error-message, .success-message');
                existingMessages.forEach(msg => msg.remove());

                // Verifica campos obrigatórios
                const inputs = form.querySelectorAll('input[required], select[required]');
                let isValid = true;

                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.style.borderColor = 'var(--error)';
                    } else {
                        input.style.borderColor = '#ddd';
                    }
                });

                // Adiciona contêiner para mensagens
                let messageContainer = form.querySelector('.message-container');
                if (!messageContainer) {
                    messageContainer = document.createElement('div');
                    messageContainer.classList.add('message-container');
                    form.appendChild(messageContainer);
                }

                // Exibe mensagem apropriada
                if (!isValid) {
                    const errorMessage = document.createElement('div');
                    errorMessage.classList.add('error-message');
                    errorMessage.textContent = 'Por favor, preencha todos os campos obrigatórios.';
                    messageContainer.appendChild(errorMessage);
                    errorMessage.classList.add('show');
                    console.log('Erro: Campos obrigatórios não preenchidos');
                } else {
                    const successMessage = document.createElement('div');
                    successMessage.classList.add('success-message');
                    successMessage.textContent = 'Cadastro enviado com sucesso!';
                    messageContainer.appendChild(successMessage);
                    successMessage.classList.add('show');
                    console.log('Sucesso: Formulário enviado');
                    form.reset();
                }
            });
        } else {
            console.log('Formulário ou botão não encontrados');
        }
    }

    // Configura o formulário inicial, se já visível
    const initialForm = document.querySelector('.cadastro-form');
    if (initialForm) {
        setupFormSubmit(initialForm);
    }

    // Improved Scroll Effect with Intersection Observer
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '-50px 0px -50px 0px', // Trigger slightly before/after section enters view
        threshold: 0.15 // Trigger when 15% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing after animation to improve performance
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove class when out of view for reset
                // entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navUl.classList.contains('active')) {
                    navUl.classList.remove('active');
                }
            }
        });
    });
});