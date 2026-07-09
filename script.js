// ==========================================================================
// 1. CURSORES DOURADOS E PARALLAX
// ==========================================================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = `${e.clientX}px`; 
    cursorDot.style.top = `${e.clientY}px`;
    cursorOutline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 500, fill: "forwards" });
    
    // Parallax suave no fundo
    const x = (window.innerWidth - e.pageX * 2) / 90;
    const y = (window.innerHeight - e.pageY * 2) / 90;
    document.documentElement.style.setProperty('--px', `${x}px`);
    document.documentElement.style.setProperty('--py', `${y}px`);
});

const updateHoverTargets = () => {
    document.querySelectorAll('.hover-target, button, input, select, .carousel-card, .lone-icon, .gal-card, .ai-pill, .filter-star, .game-selector-pill, .quiz-option, .mem-card, .btn-submit, .map-overlay, .wine-vessel').forEach(target => {
        target.addEventListener('mouseenter', () => cursorOutline.classList.add('expand'));
        target.addEventListener('mouseleave', () => cursorOutline.classList.remove('expand'));
    });
};

// ==========================================================================
// 2. ÍCONES FLUTUANTES (FUGA E DESTAQUE CINEMATOGRÁFICO)
// ==========================================================================
const loneIcons = document.querySelectorAll('.lone-icon');
const infoScreen = document.getElementById('info-display');
const infoTitle = document.getElementById('info-title');
const infoDesc = document.getElementById('info-desc');

loneIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        infoTitle.innerText = icon.getAttribute('data-t');
        infoDesc.innerText = icon.getAttribute('data-d');
        infoScreen.classList.add('active');
        
        // Fuga dos restantes ícones
        loneIcons.forEach(other => {
            if (other !== icon) other.classList.add('flee');
        });
    });
    icon.addEventListener('mouseleave', () => {
        infoScreen.classList.remove('active');
        loneIcons.forEach(other => other.classList.remove('flee'));
    });
});

// ==========================================================================
// 3. CARROSSEL 3D DRAGGABLE (Menu Principal)
// ==========================================================================
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
        document.getElementById('modal-body-content').innerHTML = ''; // Limpa o modal para evitar bugs
        mapaContainer.classList.add('menu-open');
        
        // Posicionar cartões em círculo 3D (360 / 9 = 40 graus)
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

// Rotação Automática
function animateCarousel() {
    if(menuOpen && autoSpin && !isDragging) {
        currAngle -= 0.15; 
        carousel.style.transform = `rotateX(-5deg) rotateY(${currAngle}deg)`;
    }
    requestAnimationFrame(animateCarousel);
}
animateCarousel();

// Arrastar com o rato (Drag)
const carContainer = document.getElementById('carousel-container');
carContainer.addEventListener('mousedown', (e) => { isDragging = true; autoSpin = false; startX = e.clientX; });
window.addEventListener('mouseup', () => { isDragging = false; setTimeout(() => { autoSpin = true; }, 1500); });
window.addEventListener('mousemove', (e) => {
    if(!isDragging) return;
    const deltaX = e.clientX - startX;
    currAngle += deltaX * 0.3; // Sensibilidade
    carousel.style.transform = `rotateX(-5deg) rotateY(${currAngle}deg)`;
    startX = e.clientX;
});

// ==========================================================================
// 4. BASE DE DADOS DE CONTEÚDOS (Secções do Site)
// ==========================================================================
const sectionData = {
    quem: `
        <h2 class="modal-title">A Nossa Essência</h2>
        <p class="modal-text" style="font-size: 1.25rem; line-height: 2; max-width: 900px;">Na Quinta do Paraíso acreditamos que as melhores experiências nascem da autenticidade. Situada no coração do Alto Douro Vinhateiro, a nossa quinta combina a tradição vitivinícola com o conforto, a natureza e a hospitalidade, proporcionando momentos únicos a todos os que nos visitam. Mais do que um alojamento, somos um espaço onde o vinho, a cultura, a gastronomia e a tranquilidade se unem para criar memórias que perduram no tempo.</p>
    `,
    servicos: `
        <h2 class="modal-title">Atividades & Serviços</h2>
        <p class="modal-text">Experiências imersivas desenhadas para despertar os sentidos no Alto Douro Vinhateiro.</p>
        <div class="services-luxury-grid">
            <div class="service-item hover-target">
                <div class="si-icon">🚤</div>
                <div class="si-details"><h4>Passeio de Barco no Rio Douro</h4><p>1h30 <span>•</span> 45€ / pax</p></div>
            </div>
            <div class="service-item hover-target">
                <div class="si-icon">🚙</div>
                <div class="si-details"><h4>Passeio de Jipe pelas Vinhas</h4><p>2h00 <span>•</span> 40€ / pax</p></div>
            </div>
            <div class="service-item hover-target">
                <div class="si-icon">🧺</div>
                <div class="si-details"><h4>Piquenique na Vinha</h4><p>Até 3h00 <span>•</span> 35€ / pax</p></div>
            </div>
            <div class="service-item hover-target">
                <div class="si-icon">🧖‍♀️</div>
                <div class="si-details"><h4>Spa de Vinoterapia</h4><p>1h00 <span>•</span> 65€ / pax</p></div>
            </div>
            <div class="service-item hover-target">
                <div class="si-icon">🏺</div>
                <div class="si-details"><h4>Visita à Adega</h4><p>45 min <span>•</span> 15€ / pax</p></div>
            </div>
            <div class="service-item hover-target">
                <div class="si-icon">🍷</div>
                <div class="si-details"><h4>Degustação de Vinhos</h4><p>1h00 <span>•</span> 25€ / pax</p></div>
            </div>
            <div class="service-item service-highlight hover-target">
                <div class="si-icon">🍇</div>
                <div class="si-details"><h4>Visita à Adega + Degustação de Vinhos</h4><p>1h30 <span>•</span> 35€ / pax</p></div>
            </div>
        </div>
    `,
    loja: `
        <h2 class="modal-title">Garrafeira Haute Couture</h2>
        <p class="modal-text">A seleção oficial da nossa cave. Explore as referências e encomende online.</p>
        <div class="shop-showcase">
            <div class="wine-vessel hover-target">
                <img src="Vinho1.png" alt="Tavedo Rosé" class="wine-bottle-img" onerror="this.src='https://via.placeholder.com/100x250/111/D4AF37?text=Vinho1'">
                <span class="wine-type">Rosé</span><h4 class="wine-name">Tavedo Rosé</h4>
                <button class="btn-buy hover-target" onclick="window.open('https://burmester.pt/vinhos/tavedo-rose/', '_blank')">Ver Detalhes</button>
            </div>
            <div class="wine-vessel hover-target">
                <img src="Vinho2.png" alt="Burmester Branco" class="wine-bottle-img" onerror="this.src='https://via.placeholder.com/100x250/111/D4AF37?text=Vinho2'">
                <span class="wine-type">Branco</span><h4 class="wine-name">Branco Clássico</h4>
                <button class="btn-buy hover-target" onclick="window.open('https://burmester.pt/vinhos/burmester-branco/', '_blank')">Ver Detalhes</button>
            </div>
            <div class="wine-vessel hover-target">
                <img src="Vinho3.png" alt="Casa Branco" class="wine-bottle-img" onerror="this.src='https://via.placeholder.com/100x250/111/D4AF37?text=Vinho3'">
                <span class="wine-type">Branco Reserva</span><h4 class="wine-name">Casa Branco</h4>
                <button class="btn-buy hover-target" onclick="window.open('https://burmester.pt/vinhos/casa-burmester-branco/', '_blank')">Ver Detalhes</button>
            </div>
            <div class="wine-vessel hover-target" style="border-color:var(--accent-color);">
                <img src="Vinho4.png" alt="Casa Touriga Nacional" class="wine-bottle-img" onerror="this.src='https://via.placeholder.com/100x250/111/D4AF37?text=Vinho4'">
                <span class="wine-type">Tinto Reserva</span><h4 class="wine-name">Casa Touriga Nacional</h4>
                <button class="btn-buy hover-target" style="background:var(--accent-color); color:#000;" onclick="window.open('https://burmester.pt/vinhos/casa-burmester-touriga-nacional-2018/', '_blank')">Ver Detalhes</button>
            </div>
            <div class="wine-vessel hover-target">
                <img src="Vinho5.png" alt="Casa Tinto" class="wine-bottle-img" onerror="this.src='https://via.placeholder.com/100x250/111/D4AF37?text=Vinho5'">
                <span class="wine-type">Tinto</span><h4 class="wine-name">Casa Tinto</h4>
                <button class="btn-buy hover-target" onclick="window.open('https://burmester.pt/vinhos/casa-burmester-tinto/', '_blank')">Ver Detalhes</button>
            </div>
            <div class="wine-vessel hover-target">
                <img src="Vinho6.png" alt="Tawny Port" class="wine-bottle-img" onerror="this.src='https://via.placeholder.com/100x250/111/D4AF37?text=Vinho6'">
                <span class="wine-type">Vinho do Porto</span><h4 class="wine-name">Tawny Clássico</h4>
                <button class="btn-buy hover-target" onclick="window.open('https://burmester.pt/vinhos/burmester-tawny-port/', '_blank')">Ver Detalhes</button>
            </div>
            <div class="wine-vessel hover-target" style="border-color:var(--accent-color);">
                <img src="Vinho7.png" alt="Vintage 2019" class="wine-bottle-img" onerror="this.src='https://via.placeholder.com/100x250/111/D4AF37?text=Vinho7'">
                <span class="wine-type">Vintage Port</span><h4 class="wine-name">Quinta do Paraíso Vintage</h4>
                <button class="btn-buy hover-target" style="background:var(--accent-color); color:#000;" onclick="window.open('https://burmester.pt/vinhos/vintage-2018-quinta-do-arnozelo/', '_blank')">Ver Detalhes</button>
            </div>
        </div>
    `,
    reservas: `
        <h2 class="modal-title">O Seu Passaporte para o Paraíso</h2>
        <div class="booking-card hover-target">
            <form onsubmit="event.preventDefault(); alert('Reserva Solicitada com Sucesso! A nossa equipa entrará em contacto brevemente.');">
                <div class="booking-grid">
                    <div class="input-group">
                        <label>Hóspede (Nome)</label>
                        <input type="text" required placeholder="O seu nome completo">
                    </div>
                    <div class="input-group">
                        <label>Correio Eletrónico</label>
                        <input type="email" required placeholder="seu@email.com">
                    </div>
                    <div class="input-group">
                        <label>Check-in</label>
                        <input type="date" required>
                    </div>
                    <div class="input-group">
                        <label>Check-out</label>
                        <input type="date" required>
                    </div>
                    <div class="input-group">
                        <label>Acompanhantes</label>
                        <input type="number" min="1" max="10" value="2" required>
                    </div>
                    <div class="input-group">
                        <label>Refúgio (Alojamento)</label>
                        <select required>
                            <option value="branco">Casa Branco</option>
                            <option value="rose">Casa Rosé</option>
                            <option value="tinto">Casa Tinto</option>
                            <option value="ruby">Casa Ruby</option>
                            <option value="tawny">Casa Tawny</option>
                        </select>
                    </div>
                </div>
                <button type="submit" class="btn-submit hover-target" style="margin-top: 50px;">Confirmar Reserva</button>
            </form>
        </div>
    `,
    contactos: `
        <h2 class="modal-title">Fale Connosco</h2>
        <div class="contacts-wrapper">
            <div class="contacts-info hover-target">
                <h3 style="color: var(--accent-color); font-family: 'Cinzel'; margin-bottom: 15px;">Localização</h3>
                <p style="color: #ccc; line-height: 1.8; margin-bottom: 30px;">Quinta do Paraíso<br>Alto Douro Vinhateiro<br>Vila Nova de Foz Côa</p>
                <h3 style="color: var(--accent-color); font-family: 'Cinzel'; margin-bottom: 15px;">Linha Direta</h3>
                <p style="color: #ccc; line-height: 1.8;">Email: refugio@quintadoparaiso.pt<br>Telefone: +351 279 000 000</p>
            </div>
            <div class="map-embed-container hover-target">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000.320490123!2d-7.140880000000001!3d41.08051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA0JzQ5LjgiTiA3wrAwOCcyNy4yIlc!5e0!3m2!1spt-PT!2spt!4v1615468759328!5m2!1spt-PT!2spt" width="100%" height="100%" style="border:0; min-height: 350px;" allowfullscreen="" loading="lazy"></iframe>
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
            <div class="gal-card hover-target" style="background-image: url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80');" onclick="openLb(this)"></div>
            <div class="gal-card hover-target" style="background-image: url('https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80');" onclick="openLb(this)"></div>
            <div class="gal-card hover-target" style="background-image: url('https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80');" onclick="openLb(this)"></div>
            <div class="gal-card hover-target" style="background-image: url('https://images.unsplash.com/photo-1437158941788-b210214c7dc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80');" onclick="openLb(this)"></div>
            <div class="gal-card hover-target" style="background-image: url('https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80');" onclick="openLb(this)"></div>
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
        <h2 class="modal-title">O Nosso Mural</h2>
        <div class="insta-container-feed">
            <div class="insta-top-row hover-target">
                <div class="insta-avatar"></div>
                <div class="insta-metrics">
                    <div><strong>56</strong> Publicações</div>
                    <div><strong>12.5k</strong> Seguidores</div>
                    <button class="btn-submit hover-target" style="margin:0; padding: 10px 25px; font-size: 0.9rem;" onclick="alert('Começou a seguir @QuintaDoParaiso!')">Seguir</button>
                </div>
            </div>
            <div class="insta-grid">
                <div class="insta-post hover-target"><img src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"><div class="insta-overlay">❤️ 340 💬 12</div></div>
                <div class="insta-post hover-target"><img src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"><div class="insta-overlay">❤️ 512 💬 45</div></div>
                <div class="insta-post hover-target"><img src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"><div class="insta-overlay">❤️ 890 💬 112</div></div>
                <div class="insta-post hover-target" style="background:#222; display:flex; flex-direction:column; justify-content:center; align-items:center; cursor:pointer;" onclick="alert('Upload ativado. Escolha a sua foto.')">
                    <span style="font-size:3rem; color:var(--accent-color);">+</span><p style="color:#fff; font-family:'Manrope';">Partilhar Foto</p>
                </div>
            </div>
        </div>
    `
};

const modalOverlay = document.getElementById('main-modal');
const modalBody = document.getElementById('modal-body-content');

// Abrir e Fechar Secções
window.openSection = function(type) {
    modalBody.innerHTML = sectionData[type];
    modalOverlay.classList.add('active');
    updateHoverTargets();
}

window.closeSection = function() {
    modalOverlay.classList.remove('active');
    if(clickerInterval) clearInterval(clickerInterval); // Para os jogos se estiverem a correr
}

// ==========================================================================
// 5. LÓGICA DE REVIEWS (ESTRELAS)
// ==========================================================================
window.filterRev = function(stars) {
    const starEls = document.querySelectorAll('.filter-star');
    starEls.forEach((el, index) => {
        if(index < stars) { 
            el.style.color = 'var(--accent-color)'; 
            el.style.textShadow = '0 0 20px var(--accent-color)'; 
        } else { 
            el.style.color = '#444'; 
            el.style.textShadow = '0 5px 10px rgba(0,0,0,0.8)'; 
        }
    });
    const cards = document.querySelectorAll('.review-card');
    cards.forEach(card => card.classList.remove('show'));
    
    const targetCards = document.querySelectorAll('.r' + stars);
    if(targetCards.length > 0) { 
        targetCards.forEach(card => card.classList.add('show')); 
    } else { 
        document.getElementById('reviews-container').innerHTML += `<p class="rev-text r-temp" style="text-align:center; color:#888;">Ainda não existem avaliações de ${stars} estrelas. A excelência é a nossa regra!</p>`;
        setTimeout(() => { document.querySelectorAll('.r-temp').forEach(el=>el.remove())}, 2000);
    }
}

// ==========================================================================
// 6. LÓGICA LIGHTBOX DA GALERIA
// ==========================================================================
window.openLb = function(el) {
    let bgImage = el.style.backgroundImage;
    let url = bgImage.slice(4, -1).replace(/"/g, ""); 
    document.getElementById('lb-img').src = url;
    document.getElementById('lightbox').classList.add('active');
}
window.closeLb = function() { document.getElementById('lightbox').classList.remove('active'); }

// ==========================================================================
// 7. ACADEMIA DE JOGOS (Mudança de Aba e Execução)
// ==========================================================================
window.switchGame = function(g) {
    document.querySelectorAll('.game-selector-pill').forEach(p=>p.classList.remove('active'));
    document.querySelectorAll('.game-panel').forEach(p=>p.classList.remove('active'));
    document.getElementById('g-' + g).classList.add('active'); 
    event.target.classList.add('active');
    if(clickerInterval) clearInterval(clickerInterval);
    updateHoverTargets();
}

// Jogo 1: Vindima (Clicker de Queda)
let clickerInterval;
window.initGrapeGame = function() {
    const field = document.getElementById('grape-drop-field');
    field.innerHTML = '<div style="display:flex; justify-content:space-between; padding:10px 20px; font-family:Cinzel; font-size:1.2rem; color:var(--accent-color); border-bottom:1px solid #444;"><span>Tempo: <span id="time">15</span>s</span><span>Cestos: <span id="score">0</span></span></div>';
    let score = 0; let timeLeft = 15;
    
    clickerInterval = setInterval(() => {
        timeLeft--; document.getElementById('time').innerText = timeLeft;
        if(timeLeft <= 0) { 
            clearInterval(clickerInterval); 
            field.innerHTML = `<h2 style="color:var(--accent-color); font-family:'Cinzel'; padding-top:60px; font-size:2rem;">Fim da Vindima!</h2><p style="color:#fff;">Conseguiu encher ${score} cestos!</p>`; 
        }
    }, 1000);

    let spawner = setInterval(() => {
        if(timeLeft <= 0) { clearInterval(spawner); return; }
        const g = document.createElement('div');
        g.className = 'interactive-grape hover-target'; g.innerText = '🍇';
        g.style.left = Math.random() * 85 + 5 + '%';
        g.style.top = '-20%'; 
        
        let dur = (Math.random() * 1.5 + 1.5);
        g.style.animation = `dropG ${dur}s linear forwards`;
        
        g.onclick = function() { score++; document.getElementById('score').innerText = score; this.remove(); };
        field.appendChild(g);
        updateHoverTargets();
        setTimeout(() => { if(g.parentElement) g.remove(); }, dur * 1000);
    }, 600);
}

// Jogo 3: Jogo da Memória
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

// ==========================================================================
// 8. IA SOMMELIER FALANTE ON-DEMAND (Texto-para-Voz)
// ==========================================================================
const aiInterface = document.getElementById('ai-interface');
const aiMessage = document.getElementById('ai-message');
const aiTextMap = {
    "Que vinho acompanha bem polvo à lagareiro?": "Para a textura rica e o alho do polvo à lagareiro, recomendo vivamente o nosso Reserva Branco. A sua acidez equilibrada corta a gordura do azeite na perfeição.",
    "Quais as atividades relaxantes para amanhã?": "Amanhã as temperaturas estão perfeitas. Sugiro começar com o pequeno-almoço no terraço, seguido de uma sessão de relaxamento no nosso Spa de Vinoterapia.",
    "Conta-me a história do vosso vinho Reserva.": "O nosso Reserva é uma homenagem à família. Nasce das vinhas mais antigas da propriedade em socalcos de xisto, e estagia doze meses em barrica francesa.",
    "Qual a melhor altura do ano para visitar as vinhas?": "A altura das vindimas, entre setembro e outubro, oferece a vivência mais rica, autêntica e aromática de todo o ecossistema da nossa quinta.",
    "Aceitam crianças na Quinta?": "Absolutamente. Desenvolvemos o módulo Academia da Vinha com jogos didáticos seguros para que toda a família possa aproveitar o Douro.",
    "Qual o melhor vinho para acompanhar uma sobremesa doce?": "Sem dúvida o nosso Vintage de Colheita Tardia. As suas notas de figo seco harmonizam de forma celestial com doçaria tradicional.",
    "Como funcionam as provas de vinho na adega?": "As provas são guiadas pela nossa Sommelier. Ocorrem diariamente às quinze horas na adega antiga e incluem uma degustação rigorosa de três referências com queijos locais."
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

// Função para invocar a voz do navegador
function speakText(txt) {
    if ('speechSynthesis' in window) {
        let utter = new SpeechSynthesisUtterance(txt);
        utter.lang = 'pt-PT';
        utter.pitch = 1.1; 
        utter.rate = 0.95; // Velocidade mais elegante
        
        // Procura voz feminina em PT-PT
        let voices = window.speechSynthesis.getVoices();
        let v = voices.find(vo => vo.lang === 'pt-PT' && (vo.name.includes('Female') || vo.name.includes('Raquel') || vo.name.includes('Joana')));
        if(!v) v = voices.find(vo => vo.lang.includes('pt'));
        if(v) utter.voice = v;
        
        window.speechSynthesis.speak(utter);
    }
}

// Carregar o pacote de vozes logo no carregamento
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

// Chamada inicial para garantir cursores
updateHoverTargets();
