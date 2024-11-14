
// Lista das perguntas do quiz
const perguntas = [
    {
        imagem: "\imagens\imagem-pergunta-1.jpg",
        enunciado: "Carros autônomos fazem forte uso de inteligência artificial. Com diversas câmeras ao redor do carro, a IA deve fazer uma análise profunda da imagem para determinar se há obstruções na pista (como um pedestre, ciclista ou mesmo outro carro), ou se é seguro atravessar.",
        pergunta: "Se há um pedestre na frente de um carro autônomo, o que é esperado que aconteça?",
        respostas: [
            { texto: "Uma inteligência artificial irá reconhecer a pessoa através de uma câmera e parar o carro.", correto: true},
            { texto: "A presença da pessoa será detectada por um sensor de proximidade.", correto: false},
            { texto: "É responsabilidade da pessoa tomar cuidado com a passagem de carros autônomos.", correto: false},
            { texto: "É responsabilidade do motorista ver o pedestre e parar o carro.", correto: false}
        ]
    },
    {
        imagem: "\imagens\imagem-pergunta-2.jpg",
        enunciado: "Carros autônomos podem se comunicar com outros carros autônomos na estrada, desde que todos eles tenham conexão com a internet, isso possibilita que ambos tomem decisões conjuntas, sobre qual carro irá passar primeiro, e até mesmo evitando colisões entre ambos, já que todos os seus movimentos são coordenados.",
        pergunta: "De que forma a vantagem dos carros autônomos citada no texto acima pode ser aproveitada ao máximo?",
        respostas: [
            { texto: "Treinando os motoristas para que eles possam dirigir melhor no trânsito.", correto: false},
            { texto: "Aumentando o tamanho das ruas, dando mais espaço para o tráfego.", correto: false},
            { texto: "Aumentando a quantidade de carros autônomos na rua, fazendo com que uma maior parte do trânsito possa automaticamente, coordenar seus movimentos.", correto: true},
            { texto: "Diminuindo a rigorosidade das leis de trânsito, para que os motoristas tenham mais liberdade.", correto: false}
        ]
    },
    {
        imagem: "\imagens\imagem-pergunta-1.jpg",
        enunciado: "1,35 milhão de vidas são perdidas por acidentes de trânsito anualmente. Diversos são os motivos que podem fazer uma fatalidade como essa acontecer, mais a maior parte desses motivos estão atrelados ao erro humano. Carros autônomos prometem dar um fim a esses péssimos números, tendo independência do motorista, e tirando o erro humano da nossa preocupação no trânsito.",
        pergunta: "Qual é o principal benefício dos carros autônomos em comparação aos veículos tradicionais?",
        respostas: [
            { texto: "Menor consumo de combustível.", correto: false},
            { texto: "Menor custo de produção.", correto: false},
            { texto: "Aumento da potência do motor.", correto: false},
            { texto: "Redução de acidentes causados por erro humano.", correto: true}
        ]
    },
    {
        imagem: "\imagens\imagem-pergunta-1.jpg",
        enunciado: "Os carros autônomos estão se tornando cada vez mais presentes em discussões sobre o futuro da mobilidade. Esses veículos são equipados com sensores e inteligência artificial para navegar de forma independente, sem a necessidade de um motorista humano.",
        pergunta: "Quais são os principais sensores utilizados em carros autônomos para detectar o ambiente ao redor?",
        respostas: [
            { texto: "Radar e câmera.", correto: true},
            { texto: "Giroscópio e bússola.", correto: false},
            { texto: "Microfone e alto-falante.", correto: false},
            { texto: "Termômetro e barômetro.", correto: false}
        ]
    }
];

// Coleta todos os elementos do site
const imagemDaQuestao = document.getElementById('imagem');
const enunciadoDaQuestao = document.getElementById('enunciado');
const perguntaDaQuestao = document.getElementById('pergunta');
const respostasDaQuestao = document.getElementById('respostas');
const botaoProximo = document.getElementById('botao-proximo');


let indiceQuestaoAtual = 0;


function iniciarQuiz() {
    indiceQuestaoAtual = 0;
    botaoProximo.innerHTML = "Proximo";
    mostrarQuestao();
}

function mostrarQuestao() {

    apagarQuestaoAnterior(); // Remove as repostas da questão anterior, para que as novas possam ser adicionadas

    let questaoAtual = perguntas[indiceQuestaoAtual]; // Seleciona a questão 
    imagemDaQuestao.src = `/imagens/imagem-pergunta-${indiceQuestaoAtual+1}.jpg`; // Mostra a imagem da respectiva questao
    enunciadoDaQuestao.innerHTML = questaoAtual.enunciado; // Atualiza o enunciado da questão
    perguntaDaQuestao.innerHTML = questaoAtual.pergunta; // Atualiza a pergunta da questão

    // Adiciona os botões das respostas
    questaoAtual.respostas.forEach(resposta => {
        const botao = document.createElement('button');
        botao.innerHTML = resposta.texto;
        botao.classList.add('botao');
        respostasDaQuestao.appendChild(botao);

        if (resposta.correto) {
            botao.dataset.correto = resposta.correto; // Passa o valor verdadeiro ou falso para o botão 
        }
        botao.addEventListener("click", selecionarResposta); // Evento do clique no botao da resposta
    });
}

function apagarQuestaoAnterior() {
    botaoProximo.style.display = 'none'; // Deixa de mostrar o botao de proximo
    while (respostasDaQuestao.firstChild) {
        respostasDaQuestao.removeChild(respostasDaQuestao.firstChild); // Remove todas as alternativas
    }
}

// Função recebe o evento, e verifica se o botão clicado é o correto ou o incorreto
function selecionarResposta(e) { 
    const botaoSelecionado = e.target;
    
    if (botaoSelecionado.dataset.correto === "true") { //Verifica se a resposta está correta
        botaoSelecionado.classList.add('correto');
    } else {
        botaoSelecionado.classList.add('incorreto');
    }
    Array.from(respostasDaQuestao.children).forEach(botao => {
        if (botao.dataset.correto === "true") {
            botao.classList.add("correto"); // Deixa a resposta correta verde (para o caso do usuario selecionar a resposta errado)
        }
        botao.disabled = true; // Desativa o botao para que não seja possível clicar em outros botões após selecionar uma resposta
    });
    botaoProximo.style.display = "block"; // Faz aparecer o botao de proximo, para que o usuário possa ir para a próxima pergunta do quiz   
}



//Evento do clique no botao de proximo (para ir para a proxima questão)
botaoProximo.addEventListener("click", ()=>{
    if (indiceQuestaoAtual < perguntas.length - 1) { // Verifica se ainda há questões para serem mostradas, ou se acabaram
        indiceQuestaoAtual++; // Muda para a proxima questão
        mostrarQuestao(); // Mostra a questão
    } else {
        apagarQuestaoAnterior();
        imagemDaQuestao.style.display = "none"; // Tira a imagem da tela
        enunciadoDaQuestao.style.display = "none"; // Tira o enuncaido da tela
        perguntaDaQuestao.innerHTML = "Parabéns, você completou o nosso quiz sobre carros autônomos!! Para jogar novamente, recarregue a página."
    }
}) 


iniciarQuiz();

