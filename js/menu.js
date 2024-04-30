'use strict'

/* Selecionando o elemento que acionará a lista de links do menu  */

const botaoMenu = document.querySelector("nav h2 a");

/* Selecionando a lista links/menu */
const listaDeLinks = document.querySelector(".links-menu")

/* Monitorando o evento de click/toque no botaoMenu */
botaoMenu.addEventListener("click", function(event){
    /* Prevenir/anular o evento padrão do link de redirecionamento/recarregamento da página */
    event.preventDefault();
    
    listaDeLinks.classList.toggle("aberto")
    if(listaDeLinks.classList.contains("aberto")){
        botaoMenu.innerHTML = "Fechar &times;"
    }else {
        botaoMenu.innerHTML = "Menu &equiv;" 
    }
})