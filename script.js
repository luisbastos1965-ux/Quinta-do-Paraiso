// CURSORES DOURADOS E PARALLAX
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
    document.querySelectorAll('.hover-target, button, input, select, .carousel-card, .lone-icon, .gal-card, .ai-pill, .filter-star, .game-selector-pill, .quiz-option, .mem-card, .btn-submit').forEach(target => {
        target.addEventListener('mouseenter', () => cursorOutline.classList.add('expand'));
        target.addEventListener('mouseleave', () => cursorOutline.classList.remove('expand'));
    });
};

// ÍCONES FLUTUANTES (FUGA E DESTAQUE NO CENTRO)
const loneIcons = document.querySelectorAll('.lone-icon');
const infoScreen = document.getElementById('info-display');
const infoTitle = document.getElementById('info-title');
const infoDesc = document.getElementById('info-desc');

loneIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        infoTitle.innerText = icon.getAttribute('data-t');
        infoDesc.innerText = icon.getAttribute('data-d');
        infoScreen.classList.add('active');
        
        loneIcons.forEach(other => {
            if (other !== icon) other.classList.add('flee');
        });
    });
    icon.addEventListener('mouseleave', () => {
        infoScreen.classList.remove('active');
        loneIcons.forEach(other => other.classList.remove('flee'));
    });
});

// CARROSSEL 3D (Desaparece Logo, Aparece Carrossel Draggeable)
let menuOpen = false;
const mapaContainer = document.getElementById('mapa-interativo');
const carousel = document.getElementById('carousel');

let currAngle = 0;
let isDragging = false;
let startX = 0;
let autoSpin = true;

window.toggleMenu = function() {
    menuOpen = !menuOpen;
    if(menuOpen) {
        document.getElementById('modal-body-content').innerHTML = ''; 
        mapaContainer.classList.add('menu-open');
        const cards = document.querySelectorAll('.carousel-card');
        const angleStep = 360 / cards.length;
        cards.forEach((card, i) => {
            card.style.transform = `rotateY(${i * angleStep}deg) translateZ(450px)`;
        });
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

// CONTEÚDOS DOS MODAIS (Páginas do Site)
const sectionData = {
    quem: `<h2 class="modal-title">A Nossa Essência</h2><p class="modal-text">Mais do que um projeto turístico, a Quinta do Paraíso nasce de uma forte ligação familiar ao Douro e do desejo de preservar a sua identidade, criando experiências únicas para quem o visita. A requalificação dos pombais funde o luxo contemporâneo com o respeito solene pela paisagem duriense.</p>`,
    servicos: `
        <h2 class="modal-title">Atividades & Serviços</h2>
        <div style="display:flex; justify-content:center; gap:30px; margin-top:40px;">
            <div style="background:rgba(0,0,0,0.5); border:1px solid var(--accent-color); padding:40px; border-radius:15px; text-align:center; width:300px;">
                <h3 style="color:var(--accent-color); font-family:'Cinzel'; font-size:1.8rem; margin-bottom:15px;">Dormidas</h3>
                <p style="color:#ccc; line-height:1.6;">Os Pombais exclusivos com piscina privativa, pequenos-almoços com vista para os socalcos e total integração com a natureza.</p>
            </div>
            <div style="background:rgba(212,175,55,0.05); border:1px solid rgba(212,175,55,0.5); padding:40px; border-radius:15px; text-align:center; width:300px; transform:translateY(-20px);">
                <h3 style="color:var(--accent-color); font-family:'Cinzel'; font-size:1.8rem; margin-bottom:15px;">Bem-Estar</h3>
                <p style="color:#ccc; line-height:1.6;">Cruzeiros fluviais em barcos privados, passeios de jipe e o nosso luxuoso Spa com tratamentos de Vinoterapia.</p>
            </div>
            <div style="background:rgba(0,0,0,0.5); border:1px solid var(--accent-color); padding:40px; border-radius:15px; text-align:center; width:300px;">
                <h3 style="color:var(--accent-color); font-family:'Cinzel'; font-size:1.8rem; margin-bottom:15px;">Vinhos</h3>
                <p style="color:#ccc; line-height:1.6;">Visitas guiadas às adegas, provas comentadas e harmonizações com a gastronomia típica de Vila Nova de Foz Côa.</p>
            </div>
        </div>
    `,
    loja: `
        <h2 class="modal-title">Garrafeira Haute Couture</h2>
        <p class="modal-text">Seleção exclusiva de colheitas engarrafadas na propriedade. O esplendor do Douro na sua mesa.</p>
        <div class="shop-showcase">
            <div class="wine-vessel hover-target">
                <div class="wine-bottle-art">🍷</div>
                <div class="wine-vintage">Colheita 2021</div>
                <h4 class="wine-name">Paraíso Grande Reserva</h4>
                <p class="wine-desc">Notas intensas de frutos vermelhos silvestres e especiarias de barrica francesa. Acabamento longo.</p>
                <div class="wine-pricing">28,00€</div>
                <button class="btn-submit hover-target" style="margin:0 auto; padding: 10px 30px;" onclick="alert('Adicionado!')">Adicionar</button>
            </div>
            <div class="wine-vessel hover-target" style="border-color:var(--accent-color);">
                <div class="wine-bottle-art">🍾</div>
                <div class="wine-vintage">Edição Limitada</div>
                <h4 class="wine-name">Colheita Tardia Vintage</h4>
                <p class="wine-desc">Aroma complexo a figo secos, mel e notas subtis de xisto profundo. Uma sobremesa engarrafada.</p>
                <div class="wine-pricing">45,00€</div>
                <button class="btn-submit hover-target" style="margin:0 auto; padding: 10px 30px; background:#fff;" onclick="alert('Adicionado!')">Adicionar</button>
            </div>
            <div class="wine-vessel hover-target">
                <div class="wine-bottle-art">🫒</div>
                <div class="wine-vintage">Azeite Biológico</div>
                <h4 class="wine-name">Lágrimas do Douro Extra</h4>
                <p class="wine-desc">Extração a frio de olival secular com acidez extremamente baixa. Sabor frutado intenso.</p>
                <div class="wine-pricing">18,50€</div>
                <button class="btn-submit hover-target" style="margin:0 auto; padding: 10px 30px;" onclick="alert('Adicionado!')">Adicionar</button>
            </div>
        </div>
    `,
    reservas: `
        <h2 class="modal-title">O Seu Refúgio</h2>
        <form class="narrative-form hover-target" onsubmit="event.preventDefault(); alert('A sua reserva foi registada! (Pronto a integrar login Google/Phone).');">
            "Desejo refugiar-me na Quinta a partir de <input type="date" required>. 
            No total seremos <input type="number" min="1" max="10" value="2" style="width: 60px;"> pessoas. 
            A nossa prioridade será <select><option>O Alojamento Pombais</option><option>Experiência Vínica</option><option>Spa e Bem-Estar</option></select>. 
            Contactem-me pelo email <input type="email" placeholder="seu@email.com" required style="width:250px;">."
            <button type="submit" class="btn-submit hover-target">Efetuar Pedido de Reserva</button>
        </form>
    `,
    contactos: `
        <h2 class="modal-title">Fale Connosco</h2>
        <div style="display: flex; gap: 40px; justify-content: center; text-align: left; max-width: 800px; margin: 0 auto;">
            <div style="flex: 1; background: rgba(0,0,0,0.5); padding: 30px; border-radius: 15px; border-left: 2px solid var(--accent-color);">
                <h3 style="color: var(--accent-color); font-family: 'Cinzel'; margin-bottom: 15px;">Localização</h3>
                <p style="color: #ccc; line-height: 1.8;">Quinta do Paraíso<br>Alto Douro Vinhateiro<br>Vila Nova de Foz Côa</p>
            </div>
            <div style="flex: 1; background: rgba(0,0,0,0.5); padding: 30px; border-radius: 15px; border-left: 2px solid var(--accent-color);">
                <h3 style="color: var(--accent-color); font-family: 'Cinzel'; margin-bottom: 15px;">Linha Direta</h3>
                <p style="color: #ccc; line-height: 1.8;">Email: refugio@quintadoparaiso.pt<br>Telefone: +351 279 000 000</p>
            </div>
        </div>
    `,
    jogos: `
        <h2 class="modal-title">Academia da Vinha</h2>
        <div class="game-zone">
            <div class="game-tab-buttons">
                <button class="game-selector-pill active hover-target" onclick="switchGame('clicker')">Apanha a Uva</button>
                <button class="game-selector-pill hover-target" onclick="switchGame('quiz')">Quiz D'Ouro</button>
                <button class="game-selector-pill hover-target" onclick="switchGame('memory')">Jogo de Memória</button>
            </div>
            
            <div class="game-panel active" id="g-clicker">
                <h4 style="color:var(--accent-color); font-family:'Cinzel'; font-size:1.3rem;">Vindima Express</h4>
                <p style="color:#bbb; margin-bottom:15px;">Clique nas uvas que caem para abastecer a adega!</p>
                <button class="btn-submit hover-target" style="padding:10px 20px; margin:0 auto;" onclick="initGrapeGame()">Iniciar Jogo</button>
                <div id="grape-drop-field" style="position:relative; height:200px; margin-top:15px; border:1px dashed rgba(212,175,55,0.3); border-radius:10px; overflow:hidden;"></div>
            </div>
            
            <div class="game-panel" id="g-quiz">
                <h4 style="color:var(--accent-color); font-family:'Cinzel'; font-size:1.3rem;">Desafio dos Socalcos</h4>
                <p style="color:#fff; margin-bottom:15px;">Qual é a casta rainha do Alto Douro para vinhos de grande guarda?</p>
                <button class="quiz-option hover-target" onclick="alert('Incorreto!')">Arinto</button>
                <button class="quiz-option hover-target" onclick="this.style.background='#4CAF50'; alert('Correto! A Touriga Nacional é a verdadeira rainha.')">Touriga Nacional</button>
                <button class="quiz-option hover-target" onclick="alert('Incorreto!')">Moscatel</button>
            </div>

            <div class="game-panel" id="g-memory">
                <h4 style="color:var(--accent-color); font-family:'Cinzel'; font-size:1.3rem;">Pares da Quinta</h4>
                <p style="color:#bbb; margin-bottom:15px;">Encontre as garrafas e os cachos idênticos!</p>
                <button class="btn-submit hover-target" style="padding:10px 20px; margin:0 auto;" onclick="initMemoryGame()">Baralhar e Jogar</button>
                <div class="memory-grid" id="mem-grid"></div>
            </div>
        </div>
    `,
    galeria: `
        <h2 class="modal-title">Galeria 3D Dinâmica</h2>
        <div class="dynamic-gallery">
            <div class="gal-card hover-target" style="background-image: url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&w=600');" onclick="openLb(this)"></div>
            <div class="gal-card hover-target" style="background-image: url('https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-1.2.1&w=600');" onclick="openLb(this)"></div>
            <div class="gal-card hover-target" style="background-image: url('https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&w=600');" onclick="openLb(this)"></div>
            <div class="gal-card hover-target" style="background-image: url('https://images.unsplash.com/photo-1437158941788-b210214c7dc9?ixlib=rb-1.2.1&w=600');" onclick="openLb(this)"></div>
            <div class="gal-card hover-target" style="background-image: url('https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?ixlib=rb-1.2.1&w=600');" onclick="openLb(this)"></div>
        </div>
    `,
    reviews: `
        <h2 class="modal-title">Testemunhos Editoriais</h2>
        <div class="star-filter-container hover-target">
            <span class="filter-star s1" onmouseover="filterRev(1)">★</span>
            <span class="filter-star s2" onmouseover="filterRev(2)">★</span>
            <span class="filter-star s3" onmouseover="filterRev(3)">★</span>
            <span class="filter-star s4" onmouseover="filterRev(4)">★</span>
            <span class="filter-star s5 active" onmouseover="filterRev(5)">★</span>
        </div>
        <div class="reviews-wrapper" id="reviews-container">
            <div class="review-card show r5"><div class="rev-stars">⭐⭐⭐⭐⭐</div><p class="rev-text">"A autêntica alma duriense concentrada num só lugar. O pequeno-almoço com vista para o rio Douro é inesquecível!"</p><p class="rev-author">— Sarah T., Londres</p></div>
            <div class="review-card show r5"><div class="rev-stars">⭐⭐⭐⭐⭐</div><p class="rev-text">"O serviço de vinoterapia no Spa é do outro mundo. Saímos completamente renovados."</p><p class="rev-author">— João P., Lisboa</p></div>
            <div class="review-card r4"><div class="rev-stars">⭐⭐⭐⭐</div><p class="rev-text">"Lindo alojamento e vinhos incríveis, mas a estrada de acesso pela montanha é um pouco sinuosa."</p><p class="rev-author">— Manuel G., Porto</p></div>
            <div class="review-card r3"><div class="rev-stars">⭐⭐⭐</div><p class="rev-text">"A paisagem é incrivel, a adega é soberba, mas choveu a semana toda infelizmente."</p><p class="rev-author">— Carlos C., Braga</p></div>
        </div>
    `,
    mural: `
        <h2 class="modal-title">Mural da Comunidade</h2>
        <div class="insta-container-feed">
            <div class="insta-top-row hover-target">
                <div class="insta-avatar"></div>
                <div class="insta-metrics">
                    <div><strong>48</strong> Postais</div>
                    <div><strong>14.2k</strong> Amantes de Vinho</div>
                    <button class="btn-submit hover-target" style="margin:0; padding:10px 30px; font-size:0.9rem;" onclick="alert('Começou a seguir @QuintaDoParaiso!')">Seguir</button>
                </div>
            </div>
            <div class="insta-photo-grid">
                <div class="insta-grid-cell hover-target"><img src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&w=400"><div class="insta-cell-hover">❤️ 340</div></div>
                <div class="insta-grid-cell hover-target"><img src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-1.2.1&w=400"><div class="insta-cell-hover">❤️ 512</div></div>
                <div class="insta-grid-cell hover-target"><img src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&w=400"><div class="insta-cell-hover">❤️ 890</div></div>
                <div class="insta-grid-cell hover-target" style="background:#222; display:flex; flex-direction:column; justify-content:center; align-items:center; cursor:pointer;" onclick="alert('Upload ativado. Escolha a sua foto.')">
                    <span style="font-size:3rem; color:var(--accent-color);">+</span><p style="color:#fff; font-family:'Manrope';">Partilhar Foto</p>
                </div>
            </div>
        </div>
    `
};

const modalOverlay = document.getElementById('main-modal');
const modalBody = document.getElementById('modal-body-content');

window.openSection = function(type) {
    modalBody.innerHTML = sectionData[type];
    modalOverlay.classList.add('active');
    updateHoverTargets();
}

window.closeSection = function() {
    modalOverlay.classList.remove('active');
    if(clickerInterval) clearInterval(clickerInterval);
}

// LÓGICA DE REVIEWS (ESTRELAS)
window.filterRev = function(stars) {
    const starEls = document.querySelectorAll('.filter-star');
    starEls.forEach((el, index) => {
        if(index < stars) { el.style.color = 'var(--accent-color)'; el.style.textShadow = '0 0 20px var(--accent-color)'; } 
        else { el.style.color = '#444'; el.style.textShadow = '0 5px 10px rgba(0,0,0,0.8)'; }
    });
    const cards = document.querySelectorAll('.review-card');
    cards.forEach(card => card.classList.remove('show'));
    const targetCards = document.querySelectorAll('.r' + stars);
    if(targetCards.length > 0) { targetCards.forEach(card => card.classList.add('show')); }
    else { 
        document.getElementById('reviews-container').innerHTML += `<p class="rev-text r-temp" style="text-align:center; color:#888;">Ainda não existem avaliações de ${stars} estrelas. A excelência é a nossa regra!</p>`;
        setTimeout(() => { document.querySelectorAll('.r-temp').forEach(el=>el.remove())}, 2000);
    }
}

// LÓGICA LIGHTBOX DA GALERIA
window.openLb = function(el) {
    let bgImage = el.style.backgroundImage;
    let url = bgImage.slice(4, -1).replace(/"/g, ""); 
    document.getElementById('lb-img').src = url;
    document.getElementById('lightbox').classList.add('active');
}
window.closeLb = function() { document.getElementById('lightbox').classList.remove('active'); }

// LÓGICA DAS ABAS DA ACADEMIA DE JOGOS
window.switchGame = function(g) {
    document.querySelectorAll('.game-selector-pill').forEach(p=>p.classList.remove('active'));
    document.querySelectorAll('.game-panel').forEach(p=>p.classList.remove('active'));
    document.getElementById('g-' + g).classList.add('active'); 
    event.target.classList.add('active');
    if(clickerInterval) clearInterval(clickerInterval);
    updateHoverTargets();
}

// JOGO 1: APANHA A UVA
let clickerInterval;
window.initGrapeGame = function() {
    const field = document.getElementById('grape-drop-field');
    field.innerHTML = '<div style="display:flex; justify-content:space-between; padding:10px 20px; font-family:Cinzel; font-size:1.2rem; color:var(--accent-color); border-bottom:1px solid #444;"><span>Tempo: <span id="time">15</span>s</span><span>Cestos: <span id="score">0</span></span></div>';
    let score = 0; let timeLeft = 15;
    
    clickerInterval = setInterval(() => {
        timeLeft--; document.getElementById('time').innerText = timeLeft;
        if(timeLeft <= 0) { 
            clearInterval(clickerInterval); 
            field.innerHTML = `<h2 style="color:var(--accent-color); font-family:'Cinzel'; padding-top:60px; font-size:2rem;">Fim da Vindima!</h2><p>Conseguiu encher ${score} cestos!</p>`; 
        }
    }, 1000);

    let spawner = setInterval(() => {
        if(timeLeft <= 0) { clearInterval(spawner); return; }
        const g = document.createElement('div');
        g.className = 'interactive-grape hover-target'; g.innerText = '🍇';
        g.style.left = Math.random() * 85 + 5 + '%';
        g.style.top = '-20%'; // Inicia de cima
        
        let dur = (Math.random() * 1.5 + 1.5);
        g.style.animation = `dropG ${dur}s linear forwards`;
        
        g.onclick = function() { score++; document.getElementById('score').innerText = score; this.remove(); };
        field.appendChild(g);
        updateHoverTargets();
        setTimeout(() => { if(g.parentElement) g.remove(); }, dur * 1000);
    }, 600);
}

// JOGO 3: MEMÓRIA
let memCards = ['🍷','🍷','🍇','🍇','🏺','🏺','🫒','🫒'];
let firstCard = null; let lockBoard = false; let matched = 0;

window.initMemoryGame = function() {
    const grid = document.getElementById('mem-grid');
    grid.innerHTML = ''; firstCard = null; lockBoard = false; matched = 0;
    memCards.sort(() => Math.random() - 0.5); 
    
    memCards.forEach((icon) => {
        let card = document.createElement('div');
        card.className = 'mem-card hover-target';
        card.dataset.icon = icon;
        card.onclick = function() {
            if(lockBoard || this === firstCard || this.classList.contains('flipped')) return;
            this.innerText = this.dataset.icon;
            this.classList.add('flipped');
            
            if(!firstCard) { firstCard = this; return; }
            
            if(firstCard.dataset.icon === this.dataset.icon) {
                firstCard = null; matched++;
                if(matched === 4) setTimeout(() => alert('Parabéns! Encontrou todos os pares da Quinta.'), 500);
            } else {
                lockBoard = true;
                setTimeout(() => {
                    this.innerText = ''; this.classList.remove('flipped');
                    firstCard.innerText = ''; firstCard.classList.remove('flipped');
                    firstCard = null; lockBoard = false;
                }, 1000);
            }
        };
        grid.appendChild(card);
    });
    updateHoverTargets();
}

// IA SOMMELIER FALANTE ON-DEMAND
const aiInterface = document.getElementById('ai-interface');
const aiMessage = document.getElementById('ai-message');
const aiTextMap = {
    "Que vinho acompanha bem polvo à lagareiro?": "Para a textura rica e o alho do polvo à lagareiro, recomendo vivamente o nosso Reserva Branco. A sua acidez equilibrada corta a gordura do azeite na perfeição.",
    "Quais as atividades relaxantes para amanhã?": "Amanhã as temperaturas estão perfeitas. Sugiro começar com o pequeno-almoço no terraço, seguido de uma sessão de relaxamento no nosso Spa de Vinoterapia.",
    "Conta-me a história do vosso vinho Reserva.": "O nosso Reserva é uma homenagem à família. Nasce das vinhas mais antigas da propriedade em socalcos de xisto, e estagia 12 meses em barrica francesa.",
    "Qual a melhor altura do ano para visitar as vinhas?": "A altura das vindimas, entre setembro e outubro, oferece a vivência mais rica, autêntica e aromática de todo o ecossistema da nossa quinta.",
    "Aceitam crianças na Quinta?": "Absolutamente. Desenvolvemos o módulo Academia da Vinha com jogos didáticos seguros para que toda a família possa aproveitar o Douro.",
    "Qual o melhor vinho para acompanhar uma sobremesa doce?": "Sem dúvida o nosso Vintage de Colheita Tardia. As suas notas de figos secos harmonizam de forma celestial com doçaria tradicional.",
    "Como funcionam as provas de vinho na adega?": "As provas são guiadas pela nossa Sommelier. Ocorrem diariamente às 15 horas na adega antiga e incluem uma degustação rigorosa de três referências com queijos locais."
};

window.openAI = function() {
    aiInterface.classList.add('active');
    let welcome = "Olá. Sou a assistente de Inteligência Artificial da Quinta do Paraíso. Em que posso ajudar a harmonizar o seu dia?";
    aiMessage.innerText = `"${welcome}"`;
    if('speechSynthesis' in window) window.speechSynthesis.cancel();
}

window.closeAI = function() {
    aiInterface.classList.remove('active');
    if('speechSynthesis' in window) window.speechSynthesis.cancel();
}

window.askAI = function(q) {
    if('speechSynthesis' in window) window.speechSynthesis.cancel();
    aiMessage.style.opacity = 0;
    
    setTimeout(() => {
        aiMessage.style.color = "var(--accent-color)";
        aiMessage.innerHTML = "A processar dados e notas de prova...";
        aiMessage.style.opacity = 1;
        
        setTimeout(() => {
            aiMessage.style.opacity = 0;
            setTimeout(() => {
                aiMessage.style.color = "#fff";
                aiMessage.innerHTML = `"${aiTextMap[q]}"`;
                aiMessage.style.opacity = 1;
                speakText(aiTextMap[q]); 
            }, 400);
        }, 1200);
    }, 300);
}

function speakText(txt) {
    if ('speechSynthesis' in window) {
        let utter = new SpeechSynthesisUtterance(txt);
        utter.lang = 'pt-PT';
        utter.pitch = 1.1; 
        utter.rate = 0.95; 
        
        let voices = window.speechSynthesis.getVoices();
        let v = voices.find(vo => vo.lang === 'pt-PT' && (vo.name.includes('Female') || vo.name.includes('Raquel') || vo.name.includes('Joana')));
        if(!v) v = voices.find(vo => vo.lang.includes('pt'));
        if(v) utter.voice = v;
        
        window.speechSynthesis.speak(utter);
    }
}

// Carregar vozes logo
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

updateHoverTargets();
