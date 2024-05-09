'use strict'

/* Selecioanndo os elementos que serão manipulados */
const formulario = document.querySelector("form");
const campoCep = formulario.querySelector("#cep");
const campoEndereco = formulario.querySelector("#endereco");
const campoBairro = formulario.querySelector("#bairro");
const campoCidade = formulario.querySelector("#cidade");
const campoEstado = formulario.querySelector("#estado");
const botaoBuscar = formulario.querySelector("#buscar");
const mensagemStatus = formulario.querySelector("#status");

/* Detectando quando o botão de buscar CEP é acionado */
botaoBuscar.addEventListener("click", async function(event){
    /* Anular o comportamento padrão de redirecionamento/recarregamento da página. Sempre acontece ao trabalhar com <a> e <form> */
    event.preventDefault();

    if(campoCep.value.length !==8){
        /* Informar o usuário sobre o erro: */
        mensagemStatus.textContent = "Digite um CEP válido";
        mensagemStatus.style.color = "red";
        /* Pare completamente a execução */
        return;
    }

    /* Guardando o valor do cep digitado/informado */
    let cepInformado = campoCep.value;
    console.log(cepInformado);

    /* AJAX - Asyncronous JavaScript And XML
    (JavaScript assíncrono e XML)
    Técnica de comunicação (transmição, recebimento) de dados que permite o processamento em conjunto com APIs (ou Web Services) */

    // Etapa 1: preparar a URL da API com o CEP informado
    let url = `https://viacep.com.br/ws/${cepInformado}/json/`;

    // Etapa 2: acessar a API (com URL) e aguardar o retorno dela
    const resposta = await fetch(url);
    console.log(resposta);
    // Etapa 3: extrair os dados da resposta da API em formato JSON
    const dados = await resposta.json();
    console.log(dados);

    // Etapa 4: lidar com os dados (em caso de erro e de sucesso)
    /* Se existir a string/prop "erro" no objeto dados */
    if("erro" in dados){
        mensagemStatus.textContent = "CEP inexistente!";
        mensagemStatus.style.color = "red";
    }else {
        /* Senão, é porque o CEP existe! */
        mensagemStatus.textContent = "CEP encontrado";
        mensagemStatus.style.color = "green"


        const camposAdicionais = formulario.querySelectorAll(`.campos-restantes`)

        /* Removendo a classe usando um loop */

        for(const campo of camposAdicionais){
            campo.classList.remove("campos-restantes")
        }

        /* Atribuindo os dados a cada campo */
        campoEndereco.value = dados.logradouro;
        campoBairro.value = dados.bairro;
        campoCidade.value = dados.localidade;
        campoEstado.value = dados.uf;
    }
})