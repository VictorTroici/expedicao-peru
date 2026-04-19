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