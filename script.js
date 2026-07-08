// CONTROLO DOS CURSORES DOURADOS
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = `${e.clientX}px`; 
    cursorDot.style.top = `${e.clientY}px`;
    cursorOutline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 500, fill: "forwards" });
    
    const x = (window.innerWidth - e.pageX * 2) / 90;
    const y = (window.innerHeight - e.pageY * 2) / 90;
    document.documentElement.style.setProperty('--px', `${x}px`);
    document.documentElement.style.setProperty('--py', `${y}px`);
});

const updateHoverTargets = () => {
    document.querySelectorAll('.hover-target, button, input, select, .carousel-card, .lone-icon, .gal-card, .ai-pill, .filter-star, .game-selector-pill, .quiz-option, .mem-card').forEach(target => {
        target.addEventListener('mouseenter', () => cursorOutline.classList.add('expand'));
        target.addEventListener('mouseleave', () => cursorOutline.classList.remove('expand'));
    });
};

// ÍCONES FLUTUANTES (Efeito de Fuga e Destaque)
const loneIcons = document.querySelectorAll('.lone-icon');
const infoScreen = document.getElementById('info-display');
const infoTitle = document.getElementById('info-title');
const infoDesc = document.getElementById('info-desc');

loneIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        infoTitle.innerText = icon.getAttribute('data-t');
        infoDesc.innerText = icon.getAttribute('data-d');
        infoScreen.classList.add('active');
        loneIcons.forEach(other => { if (other !== icon) other.classList.add('flee'); });
    });
    icon.addEventListener('mouseleave', () => {
        infoScreen.classList.remove('active');
        loneIcons.forEach(other => other.classList.remove('flee'));
    });
});

// MOTOR DO CARROSSEL 3D DRAGGABLE
let menuOpen = false;
const mapaContainer = document.getElementById('mapa-interativo');
const carousel = document.getElementById('carousel');
let currAngle = 0; let isDragging = false; let startX = 0; let autoSpin = true;

window.toggleMenu = function() {
    menuOpen = !menuOpen;
    if(menuOpen) {
        document.getElementById('modal-body-content').innerHTML = ''; // Bug Fix: limpa lixo anterior
        mapaContainer.classList.add('menu-open');
        const cards = document.querySelectorAll('.carousel-card');
        const angleStep = 360 / cards.length;
        cards.forEach((card, i) => { card.style.transform = `rotateY(${i * angleStep}deg) translateZ(450px)`; });
    } else {
        mapaContainer.classList.remove('menu-open');
        autoSpin = true;
    }
}

function animateCarousel() {
    if(menuOpen && autoSpin && !isDragging) {
        currAngle -= 0.15; 
        carousel.style.transform = `rotateX(-5deg) rotateY(${currAngle}deg)`;
    }
    requestAnimationFrame(animateCarousel);
}
animateCarousel();

const carContainer = document.getElementById('carousel-container');
carContainer.addEventListener('mousedown', (e) => { isDragging = true; autoSpin = false; startX = e.clientX; });
window.addEventListener('mouseup', () => { isDragging = false; setTimeout(() => { autoSpin = true; }, 1500); });
window.addEventListener('mousemove', (e) => {
    if(!isDragging) return;
    const deltaX = e.clientX - startX;
    currAngle += deltaX * 0.3;
    carousel.style.transform = `rotateX(-5deg) rotateY(${currAngle}deg)`;
    startX = e.clientX;
});

// ESTRUTURA DE BANCO DE DADOS DAS ABAS
const sectionData = {
    quem: `<h2 class="modal-title">A Nossa Essência</h2><p class="modal-text">"Mais do que um projeto turístico, a Quinta do Paraíso nasce de uma forte ligação familiar ao Douro e do desejo de preservar a sua identidade..."</p>`,
    servicos: `<h2 class="modal-title">Atividades & Serviços</h2><div class="services-grid"><div class="service-card"><h3>Dormidas</h3><p>Pombais premium com piscina privativa.</p></div><div class="service-card" style="background:rgba(212,175,55,0.05);"><h3>Bem-Estar</h3><p>Spa e rituais de Vinoterapia.</p></div><div class="service-card"><h3>Vinhos</h3><p>Provas comentadas na adega secular.</p></div></div>`,
    loja: `<h2 class="modal-title">Garrafeira Haute Couture</h2><div class="shop-showcase"><div class="wine-vessel"><h3>🍷</h3><div class="wine-vintage">2021</div><h4 class="wine-name">Grande Reserva</h4><div class="wine-pricing">28,00€</div><button class="btn-submit hover-target" onclick="alert('Adicionado!')">Comprar</button></div><div class="wine-vessel" style="border-color:var(--accent-color);"><h3>🍾</h3><div class="wine-vintage">Vintage</div><h4 class="wine-name">Colheita Tardia</h4><div class="wine-pricing">45,00€</div><button class="btn-submit hover-target" style="background:#fff;" onclick="alert('Adicionado!')">Comprar</button></div></div>`,
    reservas: `<h2 class="modal-title">Reservas</h2><form class="narrative-form hover-target" onsubmit="event.preventDefault(); alert('Submetido!');">"Desejo hospedar-me a partir de <input type="date" required>."<button type="submit" class="btn-submit hover-target">Confirmar</button></form>`,
    contactos: `<h2 class="modal-title">Fale Connosco</h2><p class="modal-text">Email: refugio@quintadoparaiso.pt | Tel: +351 279 000 000</p>`,
    galeria: `<h2 class="modal-title">Galeria 3D Dinâmica</h2><div class="dynamic-gallery"><div class="gal-card hover-target" style="background-image:url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&w=600')" onclick="openLb(this)"></div><div class="gal-card hover-target" style="background-image:url('https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-1.2.1&w=600')" onclick="openLb(this)"></div><div class="gal-card hover-target" style="background-image:url('https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&w=600')" onclick="openLb(this)"></div></div>`,
    reviews: `<h2 class="modal-title">Testemunhos Editoriais</h2><div class="star-filter-container"><span class="filter-star" onclick="filterRev(1)">★</span><span class="filter-star" onclick="filterRev(2)">★</span><span class="filter-star" onclick="filterRev(3)">★</span><span class="filter-star" onclick="filterRev(4)">★</span><span class="filter-star active" onclick="filterRev(5)">★</span></div><div class="reviews-wrapper" id="reviews-container"><div class="review-card show r5"><div class="rev-stars">⭐⭐⭐⭐•</div><p class="rev-text">"Pequeno-almoço divinal com vista rio Douro."</p><p class="rev-author">— Sarah T., Londres</p></div></div>`,
    mural: `<h2 class="modal-title">Mural da Comunidade</h2><div class="insta-header"><div class="insta-profile"></div><div class="insta-stats"><div><strong>56</strong> Postais</div></div></div><div class="insta-grid"><div class="insta-post hover-target"><img src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&w=400"><div class="insta-overlay">❤️ 340</div></div></div>`,
    jogos: `<h2 class="modal-title">Academia da Vinha</h2><div class="game-zone"><div class="game-tab-buttons"><button class="game-selector-pill active" onclick="switchGame('clicker')">Apanha a Uva</button><button class="game-selector-pill" onclick="switchGame('quiz')">Quiz D'Ouro</button><button class="game-selector-pill" onclick="switchGame('memory')">Jogo de Memória</button></div><div class="game-panel active" id="g-clicker"><h4>Vindima Express</h4><button class="btn-submit hover-target" onclick="initGrapeGame()">Iniciar Vindima</button><div id="grape-drop-field" style="position:relative; height:200px; margin-top:15px; border:1px dashed #D4AF37; border-radius:10px; overflow:hidden;"></div></div><div class="game-panel" id="g-quiz"><h4>Desafio dos Socalcos</h4><p>Casta rainha do Douro?</p><button class="quiz-option" onclick="alert('Incorreto!')">Arinto</button><button class="quiz-option" onclick="this.style.background='#4CAF50'; alert('Correto!')">Touriga Nacional</button></div><div class="game-panel" id="g-memory"><h4>Pares da Quinta</h4><button class="btn-submit" onclick="initMemoryGame()">Jogar Memória</button><div class="memory-grid" id="mem-grid"></div></div></div>`
};

const modalOverlay = document.getElementById('main-modal');
const modalBody = document.getElementById('modal-body-content');

window.openSection = function(type) {
    modalBody.innerHTML = sectionData[type];
    modalOverlay.classList.add('active');
    updateHoverTargets();
}
window.closeSection = function() { modalOverlay.classList.remove('active'); if(clickerInterval) clearInterval(clickerInterval); }

// REVIEWS
window.filterRev = function(stars) {
    const starEls = document.querySelectorAll('.filter-star');
    starEls.forEach((el, idx) => el.style.color = idx < stars ? 'var(--accent-color)' : '#444');
    document.querySelectorAll('.review-card').forEach(card => card.classList.toggle('show', card.classList.contains('r' + stars)));
}

// LIGHTBOX
window.openLb = function(el) {
    document.getElementById('lb-img').src = el.style.backgroundImage.slice(4, -1).replace(/"/g, "");
    document.getElementById('lightbox').classList.add('active');
}
window.closeLb = function() { document.getElementById('lightbox').classList.remove('active'); }

// MOTOR DE JOGOS
let clickerInterval;
window.switchGame = function(g) {
    document.querySelectorAll('.game-selector-pill').forEach(p=>p.classList.remove('active'));
    document.querySelectorAll('.game-panel').forEach(p=>p.classList.remove('active'));
    document.getElementById('g-' + g).classList.add('active'); event.target.classList.add('active');
    if(clickerInterval) clearInterval(clickerInterval);
    updateHoverTargets();
}

window.initGrapeGame = function() {
    const field = document.getElementById('grape-drop-field');
    field.innerHTML = '<div style="display:flex; justify-content:space-between; padding:10px; color:var(--accent-color);"><span>Tempo: <span id="time">15</span>s</span><span>Pontos: <span id="score">0</span></span></div>';
    let score = 0; let timeLeft = 15;
    clickerInterval = setInterval(() => {
        timeLeft--; document.getElementById('time').innerText = timeLeft;
        if(timeLeft <= 0) { clearInterval(clickerInterval); field.innerHTML = `<h2>Fim! Pontuação: ${score}</h2>`; }
    }, 1000);
    let spawner = setInterval(() => {
        if(timeLeft <= 0) { clearInterval(spawner); return; }
        const g = document.createElement('div'); g.className = 'interactive-grape'; g.innerText = '🍇';
        g.style.left = Math.random() * 90 + '%'; g.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
        g.onclick = function() { score++; document.getElementById('score').innerText = score; this.remove(); };
        field.appendChild(g); updateHoverTargets();
    }, 500);
}

// JOGO DE MEMÓRIA
let memCards = ['🍷','🍷','🍇','🍇','🏺','🏺','🫒','🫒'];
let firstCard = null; let lockBoard = false; let matched = 0;
window.initMemoryGame = function() {
    const grid = document.getElementById('mem-grid'); grid.innerHTML = ''; firstCard = null; lockBoard = false; matched = 0;
    memCards.sort(() => Math.random() - 0.5);
    memCards.forEach(icon => {
        let card = document.createElement('div'); card.className = 'mem-card'; card.dataset.icon = icon;
        card.onclick = function() {
            if(lockBoard || this === firstCard || this.classList.contains('flipped')) return;
            this.innerText = this.dataset.icon; this.classList.add('flipped');
            if(!firstCard) { firstCard = this; return; }
            if(firstCard.dataset.icon === this.dataset.icon) { firstCard = null; matched++; } 
            else { lockBoard = true; setTimeout(() => { this.innerText = ''; this.classList.remove('flipped'); firstCard.innerText = ''; firstCard.classList.remove('flipped'); firstCard = null; lockBoard = false; }, 1000); }
        };
        grid.appendChild(card);
    });
    updateHoverTargets();
}

// IA SOMMELIER FALANTE
const aiInterface = document.getElementById('ai-interface');
const aiMessage = document.getElementById('ai-message');
const aiTextMap = {
    "Que vinho acompanha bem polvo à lagareiro?": "Para o polvo à lagareiro, recomendo o nosso Reserva Branco. A acidez equilibra a gordura do azeite.",
    "Quais as atividades relaxantes para amanhã?": "Sugiro um pequeno-almoço no terraço, seguido de uma sessão no Spa de Vinoterapia.",
    "Conta-me a história do vosso vinho Reserva.": "O Reserva nasce das vinhas mais antigas, estagiando 12 meses em carvalho francês.",
    "Qual a melhor altura do ano para visitar as vinhas?": "As vindimas, entre setembro e outubro, oferecem a vivência mais autêntica.",
    "Aceitam crianças na Quinta?": "Absolutamente. Desenvolvemos a Academia da Vinha com jogos didáticos para os mais novos.",
    "Qual o melhor vinho para acompanhar uma sobremesa doce?": "O nosso Vintage de Colheita Tardia harmoniza divinalmente com a doçaria.",
    "Como funcionam as provas de vinho na adega?": "Ocorrem diariamente às 15h na adega antiga, guiadas pela nossa Sommelier principal."
};

window.openAI = function() { aiInterface.classList.add('active'); speakText("Olá. Sou a inteligência da Quinta. O que deseja explorar hoje?"); }
window.closeAI = function() { aiInterface.classList.remove('active'); window.speechSynthesis.cancel(); }
window.askAI = function(q) {
    window.speechSynthesis.cancel();
    aiMessage.innerHTML = "A consultar as caves...";
    setTimeout(() => { aiMessage.innerHTML = `"${aiTextMap[q]}"`; speakText(aiTextMap[q]); }, 1000);
}

function speakText(txt) {
    if ('speechSynthesis' in window) {
        let utter = new SpeechSynthesisUtterance(txt); utter.lang = 'pt-PT'; utter.pitch = 1.1; utter.rate = 0.95;
        let v = window.speechSynthesis.getVoices().find(vo => vo.lang === 'pt-PT' && vo.name.includes('Female'));
        if(v) utter.voice = v; window.speechSynthesis.speak(utter);
    }
}

updateHoverTargets();
