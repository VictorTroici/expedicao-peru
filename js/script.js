/**
 * Lógica de controle de Abas (Tabs) para o roteiro
 */
function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName("tab-content");
    
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    const tablinks = document.getElementsByClassName("tab-btn");
    
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    const currentTab = document.getElementById(tabName);
    currentTab.style.display = "block";
    
    setTimeout(() => {
        currentTab.classList.add("active");
    }, 10);
    
    evt.currentTarget.classList.add("active");
}

/**
 * Lógica do Motor Financeiro (Extrato Automático)
 * Para adicionar um novo gasto, basta adicionar uma linha no array 'gastosViagem'.
 */
const gastosViagem = [
    { desc: "Passagem Ida (SP - Lima)", victor: 1095.69, maria: 1095.69 },
    { desc: "Passagem Ida Cusco", victor: 384.84, maria: 384.84 },
    { desc: "Passagem Volta (Cusco - SP)", victor: 1399.11, maria: 1399.11 },
    { desc: "Trem Machu Picchu", victor: 1052.00, maria: 1052.00 },
    { desc: "Ingresso Machu Picchu", victor: 254.00, maria: 254.00 },
    { desc: "Airbnb (Victor Pagou)", victor: 200.00, maria: 0.00 }
    
    // MODELO PARA ADICIONAR NOVOS GASTOS FUTUROS (Basta remover as barras duplas '//'):
    // { desc: "Mochila Nova Victor", victor: 350.00, maria: 0.00 },
    // { desc: "Bota de Trilha Maria", victor: 0.00, maria: 450.00 },
];

function renderizarExtrato() {
    const tbody = document.getElementById('extrato-tbody');
    // Prevenção de erro: só executa se a tabela existir no HTML
    if (!tbody) return; 

    let totalVictor = 0;
    let totalMaria = 0;

    // Limpa a tabela antes de popular
    tbody.innerHTML = '';

    // Loop que percorre o banco de dados e cria a matemática linha a linha
    gastosViagem.forEach(item => {
        totalVictor += item.victor;
        totalMaria += item.maria;
        const subtotal = item.victor + item.maria;

        const tr = document.createElement('tr');
        
        // Formata os números no padrão brasileiro (R$ 1.000,00)
        tr.innerHTML = `
            <td>${item.desc}</td>
            <td style="color: var(--text-muted);">R$ ${item.victor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
            <td style="color: var(--text-muted);">R$ ${item.maria.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
            <td><strong>R$ ${subtotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</strong></td>
        `;
        tbody.appendChild(tr);
    });

    // Calcula o montante global
    const totalGeral = totalVictor + totalMaria;

    // Injeta os totais processados de volta no HTML
    document.getElementById('total-victor').innerText = `R$ ${totalVictor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    document.getElementById('total-maria').innerText = `R$ ${totalMaria.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    document.getElementById('total-geral').innerText = `R$ ${totalGeral.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
}

// Escuta quando a página termina de carregar para injetar os dados sem quebrar a UI
document.addEventListener('DOMContentLoaded', () => {
    renderizarExtrato();
});
