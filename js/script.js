//DIALOG VARS

const dialog = document.getElementById('dialog');
const openBtn = document.getElementById('open-dialog');
const closeBtn = document.getElementById('close-dialog');

// DATE VARS

const dia = document.getElementById('dia-semana');
const data = document.getElementById('data');
const hora = document.getElementById('hora');
const dialogData = document.getElementById('dialog-data')
const dialogHora = document.getElementById('dialog-hora')

// SET REAL TIME DATA ON SCREEN

dialogData.textContent = "Data: " + getDate();
dialogHora.textContent = "Hora: " + getHour();
dia.textContent = getWeekDay();
data.textContent = getDate();
hora.textContent = getHour();



openBtn.addEventListener('click', () =>{
    dialog.showModal();
});

closeBtn.addEventListener('click', () =>{
    dialog.close();
});



/////////////////////
// GET ALL DATA
////////////////////

function getWeekDay() {
    const date = new Date();
    let days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return days[date.getDay()];
};
function getHour() {
    // Considerar os métodos abaixo para incluir zeros em numeros < 10
    // padStart()
    // slice()
    // formatos de hora considerando o locale do usuário
    const date = new Date();
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
};
function getDate(){
    // Alterar a solução para considerar padStart ou slice
    // Considerar formatos diferentes da data, conforme localização
    // do usuário dd/mm/aaaa, mm/dd/aaaa, aaaa/mm/dd, aaaa.mm.dd
    // Verificar se no Date() há algum método que possa auxiliar
    // locale
    const date = new Date();
    let month = date.getMonth();
    let day = date.getDate();
    if (day < 10) {
        day = "0" + day
    }
    if (month < 10) {
        month = "0" + (month + 1)
    }
    return day + "/" + month + "/" + date.getFullYear()
};