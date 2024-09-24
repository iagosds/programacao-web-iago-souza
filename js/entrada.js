function today(){
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    return ano + '-' + mes + '-' + dia;
};

console.log(today())
document.addEventListener('DOMContentLoaded', () => {
    // document.addEventListener('DOMContentLoaded') -> garante que o código
    // só seja executado após carregamento completo do DOM
    document.getElementById('data').max = today();
});;
