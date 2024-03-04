var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("slide");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 2000); // Mude para o intervalo de tempo desejado (em milissegundos)
}

function plusSlides(n) {
    slideIndex += n;
    showSlides();
}

document.getElementById('meuFormulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar o envio padrão do formulário

    var nome = document.getElementById('nome').value;
    var sobrenome = document.getElementById('sobrenome').value;
    var endereco = document.getElementById('endereco').value;
    var email = document.getElementById('email').value;
    var telefone = document.getElementById('telefone').value;
    var cep = document.getElementById('cep').value;
    var mensagem = document.getElementById('mensagem').value;

    // Validação simples
    if (nome === '' || sobrenome === '' || endereco === '' || email === '' || telefone === '' || cep === '' || mensagem === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Objeto com os dados do formulário
    var formData = new FormData();
    formData.append('nome', nome);
    formData.append('sobrenome', sobrenome);
    formData.append('endereco', endereco);
    formData.append('email', email);
    formData.append('telefone', telefone);
    formData.append('cep', cep);
    formData.append('mensagem', mensagem);

    // Requisição AJAX para enviar os dados para o script PHP
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'salvar_formulario.php', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            alert('Chamado enviado com sucesso!');
            document.getElementById('meuFormulario').reset(); // Limpar o formulário
        } else {
            alert('Erro ao enviar o chamado. Tente novamente mais tarde.');
        }
    };
    xhr.send(formData);
});
