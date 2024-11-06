document.addEventListener('DOMContentLoaded', () => {
    // DIALOG VARS
    const dialogo = document.getElementById('histDialog');
    const botaoAbrir = document.getElementById('histPontos');
    const botaoFechar = document.getElementById('closeHist');

    // DIALOG FUNCS
    botaoAbrir.addEventListener('click', () => {
        dialogo.showModal();
    });

    botaoFechar.addEventListener('click', () => {
        dialogo.close();
    });

    // Função para pegar a data de hoje e formatar
    function today() {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const dia = String(hoje.getDate()).padStart(2, '0');
        return ano + '-' + mes + '-' + dia;
    };

    // Configura o valor máximo do input de data para o dia atual
    document.getElementById('data').max = today();

    dataPonto = getElementById('data')
    console.log(dataPonto)
});
