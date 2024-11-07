

// VARIÁVEIS DO DIALOG
const dialog = document.getElementById('dialog');
const openBtn = document.getElementById('open-dialog');
const closeBtn = document.getElementById('close-dialog');

// VARIÁVEIS DE DATA
const dia = document.getElementById('dia-semana');
const data = document.getElementById('data');
const hora = document.getElementById('hora');
const dialogData = document.getElementById('dialog-data');
const dialogHora = document.getElementById('dialog-hora');

// VARIÁVEIS DO ALERTA
const divAlertaRegistroPonto = document.getElementById("alerta-registro-ponto");
const btnCloseAlertRegister = document.getElementById("alerta-registro-ponto-fechar");

// CONFIGURAÇÃO DO BOTÃO DE ALERTA PARA FECHAR
btnCloseAlertRegister.addEventListener("click", () => {
    divAlertaRegistroPonto.classList.remove("show");
    divAlertaRegistroPonto.classList.add("hidden");
});

// DEFINE LIMITE DE DATA DO PONTO COMO DIA DE HOJE

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('data-ponto').max = today();
});

function today() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    return ano + '-' + mes + '-' + dia;
};

// VARIÁVEIS PARA REGISTRO DE PONTO
const nextRegister = {
    "entrada": "intervalo",
    "intervalo": "volta-intervalo", 
    "volta-intervalo": "saida", 
    "saida": "entrada"
};
let registerLocalStorage = getRegisterLocalStorage();

// EVENTO DO BOTÃO DE REGISTRO DE PONTO
const baterPonto = document.getElementById("btn-dialog-bater-ponto");
baterPonto.addEventListener("click", async () => {
    const typeRegister = document.getElementById("tipos-ponto");
    let lastTypeRegister = localStorage.getItem("lastTypeRegister");

    let userCurrentPosition = await getCurrentPosition();
    let ponto = {
        "data": getDate(),
        "hora": getHour(),
        "localizacao": userCurrentPosition,
        "id": 1,
        "tipo": typeRegister.value
    };

    // Salva o registro no localStorage
    saveRegisterLocalStorage(ponto);

    localStorage.setItem("lastDateRegister", ponto.data);
    localStorage.setItem("lastTimeRegister", ponto.hora);

    // Exibir o alerta de registro de ponto
    divAlertaRegistroPonto.classList.remove("hidden");
    divAlertaRegistroPonto.classList.add("show");

    // Ocultar automaticamente o alerta após 5 segundos
    setTimeout(() => {
        divAlertaRegistroPonto.classList.remove("show");
        divAlertaRegistroPonto.classList.add("hidden");
    }, 5000);
    
    dialog.close();
});

// ABERTURA E FECHAMENTO DO DIALOG
openBtn.addEventListener('click', () => {
    register();
    dialog.showModal();
});

closeBtn.addEventListener('click', () => {
    dialog.close();
});

// FUNÇÃO PARA DEFINIR OS DADOS DE DATA E HORA EM TEMPO REAL
function set_data(){
    dialogData.textContent = "Data: " + getDate();
    dialogHora.textContent = "Hora: " + getHour();
    dia.textContent = getWeekDay();
    data.textContent = getDate();
    hora.textContent = getHour();
    setInterval(set_data, 1000);
}
set_data();

// FUNÇÕES PARA GERENCIAMENTO DO LOCALSTORAGE
function saveRegisterLocalStorage(register) {
    const typeRegister = document.getElementById("tipos-ponto");
    registerLocalStorage.push(register); // Array
    localStorage.setItem("register", JSON.stringify(registerLocalStorage));
    localStorage.setItem("lastTypeRegister", typeRegister.value);
} 

function getRegisterLocalStorage() {
    let registers = localStorage.getItem("register");
    if(!registers) {
        return [];
    }
    return JSON.parse(registers); 
}

// FUNÇÃO PARA REGISTRAR O PONTO
function register() {
    dialogData.textContent = "Data: " + getDate();
    dialogHora.textContent = "Hora: " + getHour();
    
    let lastTypeRegister = localStorage.getItem("lastTypeRegister");
    if(lastTypeRegister) {
        const typeRegister = document.getElementById("tipos-ponto");
        typeRegister.value = nextRegister[lastTypeRegister];
        let lastRegisterText = "Último registro: " + localStorage.getItem("lastDateRegister") + " - " + localStorage.getItem("lastTimeRegister") + " | " + localStorage.getItem("lastTypeRegister");
        document.getElementById("dialog-last-register").textContent = lastRegisterText;
    }

    setInterval(() => {
        dialogHora.textContent = "Hora: " + getHour();
    }, 1000);
}

// FUNÇÕES AUXILIARES PARA OBTER DATA E HORA
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
    return String(date.getDate()).padStart(2, '0') + "/" + String((date.getMonth() + 1)).padStart(2, '0') + "/" + date.getFullYear();
}

// FUNÇÃO PARA OBTER POSIÇÃO ATUAL
async function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            let userLocation = {
                "latitude": position.coords.latitude,
                "longitude": position.coords.longitude
            };
            resolve(userLocation);
        },
        (error) => {
            reject("Erro ao recuperar a localização " + error);
        });
    });
}
