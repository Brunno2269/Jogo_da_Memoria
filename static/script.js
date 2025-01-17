document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const moveCounter = document.getElementById('move-counter');
    const timerDisplay = document.getElementById('timer');
    const startButton = document.getElementById('start-button');
    const difficultySelect = document.getElementById('difficulty');

    let cards = [];
    let flippedCards = [];
    let matchedCards = [];
    let moveCount = 0;
    let timer = 0;
    let timerInterval;

    // Dificuldades
    const difficulties = {
        easy: 4,   // 4x4 (16 cartas)
        medium: 6, // 6x6 (36 cartas)
        hard: 8    // 8x8 (64 cartas)
    };

    // Inicia o jogo
    startButton.addEventListener('click', startGame);

    function startGame() {
        const size = difficulties[difficultySelect.value];
        cards = generateCards(size);
        resetGame();
        renderGameBoard(size);
    
        // Esconde a mensagem de vitória ao iniciar um novo jogo
        const winMessage = document.getElementById('win-message');
        winMessage.style.display = 'none';
    }
    
    function checkForMatch() {
        const [card1, card2] = flippedCards;
    
        if (card1.dataset.value === card2.dataset.value) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedCards.push(card1, card2);
    
            if (matchedCards.length === cards.length) {
                clearInterval(timerInterval);
    
                // Exibe a mensagem de vitória
                const winMessage = document.getElementById('win-message');
                winMessage.innerHTML = `Parabens!<br>Você venceu em ${moveCount} movimentos<br>em ${timer} segundos!`;
                winMessage.style.display = 'block';
    
                // Ativa o efeito de confetes
                confetti({
                    particleCount: 100, // Quantidade de confetes
                    spread: 70, // Quão espalhados os confetes estarão
                    origin: { y: 0.6 } // Origem do efeito (parte inferior da tela)
                });
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            const img1 = card1.querySelector('img');
            const img2 = card2.querySelector('img');
            img1.style.display = 'none'; // Esconde a imagem ao desvirar a carta
            img2.style.display = 'none';
        }
    
        flippedCards = [];
    }

    // Gera as cartas
    function generateCards(size) {
        const totalCards = size * size; // 8x8 = 64 cartas
        const icons = [
            'static/img/apple.png',
            'static/img/aviao.png',
            'static/img/badminton.png',
            'static/img/bitcoin.png',
            'static/img/bolsa-de-primeiros-socorros.png',
            'static/img/boxe.png',
            'static/img/camisa-de-futebol.png',
            'static/img/capacete.png',
            'static/img/casal.png',
            'static/img/computacao-em-nuvem.png',
            'static/img/controle.png',
            'static/img/dev.png',
            'static/img/discord.png',
            'static/img/do-utilizador.png',
            'static/img/escudo.png',
            'static/img/facebook.png',
            'static/img/foguete.png',
            'static/img/foto.png',
            'static/img/futebol-americano.png',
            'static/img/gato.png',
            'static/img/github.png',
            'static/img/ideia.png',
            'static/img/microfone.png',
            'static/img/notificacao.png',
            'static/img/papagaio.png',
            'static/img/pingue-pongue.png',
            'static/img/python.png',
            'static/img/telegram.png',
            'static/img/tesoura.png',
            'static/img/twitch.png',
            'static/img/twitter.png',
            'static/img/youtube.png'
        ];
        const selectedIcons = icons.slice(0, totalCards / 2);
        const cardPairs = [...selectedIcons, ...selectedIcons];
        cardPairs.sort(() => Math.random() - 0.5);
        return cardPairs;
    }

    // Renderiza o tabuleiro
    function renderGameBoard(size) {
        gameBoard.innerHTML = '';
        gameBoard.style.gridTemplateColumns = `repeat(${size}, 70px)`; // 8x8 (64 cartas)
        cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.value = card;
            cardElement.dataset.index = index;
    
            // Cria uma tag <img> para exibir a imagem
            const imgElement = document.createElement('img');
            imgElement.src = card; // Define o caminho da imagem
            imgElement.alt = 'Ícone'; // Texto alternativo para acessibilidade
            imgElement.style.display = 'none'; // Inicialmente esconde a imagem
    
            // Verifica se a imagem foi carregada corretamente
            imgElement.onload = () => {
                console.log(`Imagem carregada: ${card}`);
            };
            imgElement.onerror = () => {
                console.error(`Erro ao carregar a imagem: ${card}`);
            };
    
            // Adiciona a imagem à carta
            cardElement.appendChild(imgElement);
            cardElement.addEventListener('click', flipCard);
            gameBoard.appendChild(cardElement);
        });
    }

    // Reseta o jogo
    function resetGame() {
        flippedCards = [];
        matchedCards = [];
        moveCount = 0;
        timer = 0;
        moveCounter.textContent = moveCount;
        timerDisplay.textContent = timer;
        clearInterval(timerInterval);
        timerInterval = setInterval(updateTimer, 1000);
    }

    // Atualiza o timer
    function updateTimer() {
        timer++;
        timerDisplay.textContent = timer;
    }

    // Vira a carta
    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
            this.classList.add('flipped');
            const imgElement = this.querySelector('img');
            imgElement.style.display = 'block'; // Mostra a imagem ao virar a carta
            flippedCards.push(this);
    
            if (flippedCards.length === 2) {
                moveCount++;
                moveCounter.textContent = moveCount;
                setTimeout(checkForMatch, 1000);
            }
        }
    }

    // Verifica se as cartas são iguais
    function checkForMatch() {
        const [card1, card2] = flippedCards;
    
        if (card1.dataset.value === card2.dataset.value) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedCards.push(card1, card2);
    
            if (matchedCards.length === cards.length) {
                clearInterval(timerInterval);
    
                // Exibe a mensagem de vitória
                const winMessage = document.getElementById('win-message');
                winMessage.innerHTML = `Parabens!<br>Você venceu em ${moveCount} movimentos<br>em ${timer} segundos!`;
                winMessage.style.display = 'block';
    
                // Ativa o efeito de confetes
                confetti({
                    particleCount: 100, // Quantidade de confetes
                    spread: 70, // Quão espalhados os confetes estarão
                    origin: { y: 0.6 } // Origem do efeito (parte inferior da tela)
                });
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            const img1 = card1.querySelector('img');
            const img2 = card2.querySelector('img');
            img1.style.display = 'none'; // Esconde a imagem ao desvirar a carta
            img2.style.display = 'none';
        }
    
        flippedCards = [];
    }
    // Envia uma requisição ao servidor quando a página é fechada
    window.addEventListener('beforeunload', () => {
        fetch('/shutdown', { method: 'POST' });
    });
});