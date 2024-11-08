document.addEventListener('DOMContentLoaded', () => {
    // Variáveis da data e hora (esses elementos só devem existir no caso de você querer exibi-los)
    const dialogData = document.getElementById('dialog-data');
    const dialogHora = document.getElementById('dialog-hora');
    const dia = document.getElementById('dia-semana');
    const data = document.getElementById('data');
    const hora = document.getElementById('hora');

    // Função para atualizar data e hora
    function set_data() {
        if (dialogData) dialogData.textContent = "Data: " + getDate();
        if (dialogHora) dialogHora.textContent = "Hora: " + getHour();
        if (dia) dia.textContent = getWeekDay();
        if (data) data.textContent = getDate();
        if (hora) hora.textContent = getHour();
        setInterval(set_data, 1000);
    }

    // Chama a função para definir data e hora
    set_data();

    // Funções auxiliares para obter data e hora
    function getWeekDay() {
        const date = new Date();
        let days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
        return days[date.getDay()];
    }

    function getHour() {
        const date = new Date();
        return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
    }

    function getDate() {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Função para obter os registros do localStorage
    function getRegisters() {
        return JSON.parse(localStorage.getItem("register")) || [];
    }

    // Função para formatar a data para exibição no formato dd/mm/aaaa
    function formatDateForDisplay(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }

    // Função para exibir os registros na tabela
    function displayRegisters() {
        const tbody = document.querySelector("#tabela-pontos tbody");
        tbody.innerHTML = "";  // Limpa a tabela

        const registros = getRegisters();  // Recupera os registros do localStorage
        registros.forEach((ponto) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${formatDateForDisplay(ponto.data)}</td>
                <td>${ponto.hora}</td>
                <td>${ponto.tipo}</td>
                <td>${ponto.localizacao.latitude}, ${ponto.localizacao.longitude}</td>
                <td>${ponto.antigo}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Chama a função para exibir os registros ao carregar a página
    displayRegisters();
});
