function openObservation(element) {
    const modal = document.getElementById("observationModal");
    const observationText = document.getElementById("observationText");
    observationText.value = element.textContent.trim();
    modal.style.display = "block";

    // Salvar a referência do elemento clicado
    modal.dataset.element = element;
}

function closeModal() {
    const modal = document.getElementById("observationModal");
    modal.style.display = "none";
}

function saveObservation() {
    const modal = document.getElementById("observationModal");
    const observationText = document.getElementById("observationText");
    const element = modal.dataset.element;

    // Salvar o texto no campo de observação
    element.textContent = observationText.value;
    closeModal();
}

function editFinalizada(element) {
    // Criando o campo de input para edição
    const currentValue = element.textContent.trim();
    element.innerHTML = `<input type="text" value="${currentValue}" class="input-finalizada" />`;

    // Focando automaticamente no campo de input para facilitar a edição
    const input = element.querySelector("input");
    input.focus();

    // Aguardando a perda do foco (blur) para salvar o valor
    input.addEventListener('blur', function() {
        saveFinalizada(input, element);
    });
}

function saveFinalizada(input, element) {
    // Obtendo o valor digitado no campo de input
    const newValue = input.value.trim();

    // Se o valor não estiver vazio, atualiza a célula
    if (newValue !== "") {
        element.textContent = newValue;
    } else {
        // Se o campo estiver vazio, mantemos o valor original
        element.textContent = "SIM"; // ou outro valor default
    }
}


function saveConsultation(button) {
    const row = button.closest('tr');  // Pega a linha onde o botão foi clicado
    const idConsulta = row.cells[0].textContent;
    const diaHorario = row.cells[1].textContent;
    const idPaciente = row.cells[2].textContent;
    const nomePaciente = row.cells[3].textContent;
    const status = row.cells[4].querySelector('input').checked ? 'Concluída' : 'Pendente';
    const observacao = row.cells[5].textContent; // ou use outra forma para pegar a observação

    console.log('Salvando consulta: ', {
        idConsulta,
        diaHorario,
        idPaciente,
        nomePaciente,
        status,
        observacao
    });

    // Aqui você pode adicionar código para salvar esses dados no servidor ou em algum lugar, se necessário.
}


document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Impede o envio normal do formulário

    // Pegue o e-mail e senha inseridos
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Combinações de e-mails e senhas com as páginas de destino
    const usuarios = {
        'dr.lucio@dentalclinic.com': {
            senha: 'lucio123',
            pagina: 'dentista.html'  // Página do primeiro usuário
        },
        'maria.eduarda@dentalclinic.com': {
            senha: 'duda123',
            pagina: 'agendar2.html'  // Página do segundo usuário
        },
        'wendell@dentalclinic.com': {
            senha: 'wendell123',
            pagina: 'recepcao.html'  // Página do terceiro usuário
        },
        'adm@dentalclinic.com': {
            senha: 'admin123',
            pagina: 'admin.html'  // Página do quarto usuário
        }
    };

    // Verifique se o e-mail está no objeto 'usuarios' e se a senha está correta
    if (usuarios[email] && usuarios[email].senha === senha) {
        // Se o e-mail e a senha estiverem corretos, redirecione para a página correspondente
        window.location.href = usuarios[email].pagina;
    } else {
        // Caso o e-mail ou a senha não correspondam, exibe uma mensagem de erro
        alert('E-mail ou senha incorretos.');
    }
});
