// ==========================================================================
// 1. CURSORES DOURADOS E PARALLAX
// ==========================================================================
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
    document.querySelectorAll('.hover-target, button, input, select, textarea, .carousel-card, .lone-icon, .gal-card, .ai-pill, .filter-star, .game-item, .btn-submit, .flip-card').forEach(target => {
        if (!target.dataset.hoverBound) {
            target.dataset.hoverBound = 'true';
            target.addEventListener('mouseenter', () => cursorOutline.classList.add('expand'));
            target.addEventListener('mouseleave', () => cursorOutline.classList.remove('expand'));
        }
    });
};

// ==========================================================================
// 2. ÍCONES FLUTUANTES MAGNÉTICOS
// ==========================================================================
const loneIcons = document.querySelectorAll('.lone-icon');
const infoScreen = document.getElementById('info-display');
const infoTitle = document.getElementById('info-title');
const infoDesc = document.getElementById('info-desc');
const logoMestreWrapper = document.getElementById('logo-mestre-wrapper');

loneIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        infoTitle.innerText = icon.getAttribute('data-t');
        infoDesc.innerText = icon.getAttribute('data-d');
        infoScreen.classList.add('active');
        if(logoMestreWrapper) logoMestreWrapper.classList.add('shift-up');
        
        loneIcons.forEach(other => {
            if (other !== icon) other.classList.add('flee');
        });
    });
    icon.addEventListener('mouseleave', () => {
        infoScreen.classList.remove('active');
        if(logoMestreWrapper) logoMestreWrapper.classList.remove('shift-up');
        loneIcons.forEach(other => other.classList.remove('flee'));
    });
});

// ==========================================================================
// 3. CARROSSEL 3D DRAGGABLE
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

document.querySelectorAll('.carousel-card').forEach(card => {
    card.addEventListener('mouseenter', () => { autoSpin = false; });
    card.addEventListener('mouseleave', () => { if (!isDragging) autoSpin = true; });
});

const carContainer = document.getElementById('carousel-container');
carContainer.addEventListener('mousedown', (e) => { isDragging = true; autoSpin = false; startX = e.clientX; });
window.addEventListener('mouseup', () => { isDragging = false; setTimeout(() => { autoSpin = true; }, 1500); });
carContainer.addEventListener('mousemove', (e) => {
    if(!isDragging) return;
    const deltaX = e.clientX - startX;
    currAngle += deltaX * 0.3;
    carousel.style.transform = `rotateX(-5deg) rotateY(${currAngle}deg)`;
    startX = e.clientX;
});

// ==========================================================================
// 4. CONTEÚDOS DOS MODAIS DA PLATAFORMA
// ==========================================================================
const sectionData = {
    quem: `
        <h2 class="modal-title">Quem Somos</h2>
        <div class="about-split-container hover-target">
            <div class="about-text-area">
                <div class="about-split-left">
                    <h3>Tradição,<br>Natureza &<br>Hospitalidade</h3>
                </div>
                <div class="about-split-right">
                    <p>Na Quinta do Paraíso acreditamos que as melhores experiências nascem da autenticidade. Situada no coração do Alto Douro Vinhateiro, a nossa quinta combina a tradição vitivinícola com o conforto, a natureza e a hospitalidade, proporcionando momentos únicos a todos os que nos visitam. Mais do que um alojamento, somos um espaço onde o vinho, a cultura, a gastronomia e a tranquilidade se unem para criar memórias que perduram no tempo.</p>
                </div>
            </div>
            
            <div class="bio-section">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Gestora" class="bio-img">
                <div class="bio-text">
                    <h4>Sara Reis</h4>
                    <span>Fundadora & Gestora de Enoturismo</span>
                    <p>Com uma paixão enraizada pelas encostas durienses desde a infância, a Sara transformou a herança familiar na Quinta do Paraíso. Especialista em gestão hoteleira e vitivinicultura, o seu toque pessoal garante que cada detalhe — desde a colheita na vinha até ao momento de receber os hóspedes — transmita a verdadeira alma e o luxo do Alto Douro.</p>
                </div>
            </div>
        </div>
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
                <div class="si-details"><h4>Visita à Adega + Degustação</h4><p>1h30 <span>•</span> 35€ / pax</p></div>
            </div>
        </div>
    `,
    loja: `
        <h2 class="modal-title">Garrafeira Haute Couture</h2>
        <p class="modal-text">A seleção oficial da nossa cave. Passe o rato sobre as garrafas para descobrir as notas de prova.</p>
        <div class="shop-grid">
            <div class="flip-card hover-target">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <img src="Vinho1.png" alt="Tavedo Rosé" class="wine-bottle-img" onerror="this.src='https://via.placeholder.com/100x250/111/D4AF37?text=Vinho1'">
                        <span class="wine-type">Rosé</span><h4 class="wine-name">Tavedo Rosé</h4>
                        <p class="wine-price">18.00€</p>
                    </div>
                    <div class="flip-card-back">
                        <h4>Notas de Prova</h4>
                        <p>Fresco e elegante, marcado por aromas de framboesa e morango silvestre. Final de boca persistente, ideal para pratos leves ou aperitivo ao pôr do sol.</p>
                        <button class="btn-buy hover-target" onclick="window.open('https://burmester.pt/vinhos/tavedo-rose/', '_blank')">Comprar Agora</button>
                    </div>
                </div>
            </div>
            <div class="flip-card hover-target">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <img src="Vinho2.png" alt="Branco" class="wine-bottle-img" onerror="this.src='https://via.placeholder.com/100x250/111/D4AF37?text=Vinho2'">
                        <span class="wine-type">Branco</span><h4 class="wine-name">Branco Clássico</h4>
                        <p class="wine-price">22.50€</p>
                    </div>
                    <div class="flip-card-back">
                        <h4>Notas de Prova</h4>
                        <p>Notas cítricas e florais num blend excecional de Rabigato e Viosinho. A acidez vibrante harmoniza na perfeição com pratos de peixe e marisco.</p>
                        <button class="btn-buy hover-target" onclick="window.open('https://burmester.pt/vinhos/burmester-branco/', '_blank')">Comprar Agora</button>
                    </div>
                </div>
            </div>
            <div class="flip-card hover-target">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <img src="Vinho4.png" alt="Tinto Reserva" class="wine-bottle-img" onerror="this.src='https://via.placeholder.com/100x250/111/D4AF37?text=Vinho4'">
                        <span class="wine-type">Tinto Reserva</span><h4 class="wine-name">Touriga Nacional</h4>
                        <p class="wine-price">45.00€</p>
                    </div>
                    <div class="flip-card-back">
                        <h4>Notas de Prova</h4>
                        <p>A rainha das castas a brilhar. Estágio de 12 meses em barrica de carvalho francês. Notas de violeta, chocolate negro e taninos sedosos. Potencial de guarda elevado.</p>
                        <button class="btn-buy hover-target" onclick="window.open('https://burmester.pt/vinhos/casa-burmester-touriga-nacional-2018/', '_blank')">Comprar Agora</button>
                    </div>
                </div>
            </div>
            <div class="flip-card hover-target">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <img src="Vinho7.png" alt="Vintage" class="wine-bottle-img" onerror="this.src='https://via.placeholder.com/100x250/111/D4AF37?text=Vinho7'">
                        <span class="wine-type">Vinho do Porto</span><h4 class="wine-name">Vintage 2019</h4>
                        <p class="wine-price">85.00€</p>
                    </div>
                    <div class="flip-card-back">
                        <h4>Notas de Prova</h4>
                        <p>A joia da coroa. Um Porto Vintage de colheita excecional. Estrutura profunda, sabores intensos de frutos pretos compotados e especiarias. Memorável.</p>
                        <button class="btn-buy hover-target" onclick="window.open('https://burmester.pt/vinhos/vintage-2018-quinta-do-arnozelo/', '_blank')">Comprar Agora</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    restaurante: `
        <h2 class="modal-title">Gastronomia de Autor</h2>
        <p class="modal-text">Uma viagem de sabores onde a matriz regional do Douro se cruza com a alta cozinha de autor.</p>
        <div class="rest-container">
            <div class="rest-image hover-target">
                <img src="https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Restaurante">
            </div>
            <div class="rest-menu custom-scroll">
                <div class="menu-category">
                    <h3>Para Iniciar</h3>
                    <div class="menu-item hover-target">
                        <div class="menu-item-info"><h4>Alheira e Broa Crocante</h4><p>Alheira de caça em cama de grelos e azeite DOP.</p></div>
                        <div class="menu-item-price">14€</div>
                    </div>
                    <div class="menu-item hover-target">
                        <div class="menu-item-info"><h4>Tábua de Queijos e Enchidos</h4><p>Seleção premium regional com compota de figo.</p></div>
                        <div class="menu-item-price">22€</div>
                    </div>
                </div>
                <div class="menu-category">
                    <h3>Da Nossa Terra & Rio</h3>
                    <div class="menu-item hover-target">
                        <div class="menu-item-info"><h4>Bacalhau à Quinta</h4><p>Lombo de bacalhau confitado em azeite, puré de grão e azeitona.</p></div>
                        <div class="menu-item-price">28€</div>
                    </div>
                    <div class="menu-item hover-target">
                        <div class="menu-item-info"><h4>Bochecha de Porco Preto</h4><p>Estufada lentamente em Vinho do Porto, com risoto de açafrão.</p></div>
                        <div class="menu-item-price">26€</div>
                    </div>
                    <div class="menu-item hover-target">
                        <div class="menu-item-info"><h4>Cabrito do Monte</h4><p>Assado no forno a lenha com batatinhas assadas e grelos saltados.</p></div>
                        <div class="menu-item-price">32€</div>
                    </div>
                </div>
                <div class="menu-category">
                    <h3>Doçura Final</h3>
                    <div class="menu-item hover-target">
                        <div class="menu-item-info"><h4>Pêra Bêbada</h4><p>Pêra rocha escalfada em tinto jovem, acompanhada de gelado de baunilha.</p></div>
                        <div class="menu-item-price">10€</div>
                    </div>
                    <div class="menu-item hover-target">
                        <div class="menu-item-info"><h4>Toucinho do Céu</h4><p>Receita conventual com amêndoa torrada do Douro.</p></div>
                        <div class="menu-item-price">12€</div>
                    </div>
                </div>
            </div>
        </div>
    `,
    reservas: `
        <h2 class="modal-title">O Seu Passaporte para o Paraíso</h2>
        <p class="modal-text">Reserve o seu refúgio de luxo entre os socalcos e o rio. Garanta a melhor tarifa através do nosso portal direto.</p>
        <div class="booking-split">
            <div class="booking-img-side"></div>
            <div class="booking-form-side">
                <form onsubmit="event.preventDefault(); alert('Reserva Solicitada com Sucesso! A nossa equipa de Concierge entrará em contacto brevemente.');">
                    <div class="booking-grid">
                        <div class="input-group full">
                            <label>Hóspede (Nome e Apelido)</label>
                            <input type="text" required placeholder="O seu nome completo">
                        </div>
                        <div class="input-group">
                            <label>Email de Contacto</label>
                            <input type="email" required placeholder="seu@email.com">
                        </div>
                        <div class="input-group">
                            <label>Telemóvel</label>
                            <input type="tel" required placeholder="+351 912 345 678">
                        </div>
                        <div class="input-group">
                            <label>Data de Check-in</label>
                            <input type="date" required>
                        </div>
                        <div class="input-group">
                            <label>Data de Check-out</label>
                            <input type="date" required>
                        </div>
                        <div class="input-group">
                            <label>Nº de Hóspedes</label>
                            <input type="number" min="1" max="10" value="2" required>
                        </div>
                        <div class="input-group">
                            <label>Tipologia do Refúgio</label>
                            <select required>
                                <option value="" disabled selected>Escolha o seu alojamento...</option>
                                <option value="branco">Casa Branco (Familiar, Vista Rio)</option>
                                <option value="tinto">Casa Tinto (Premium, Lareira)</option>
                                <option value="pombal1">Pombal Vintage (Piscina Privada)</option>
                                <option value="pombal2">Pombal Reserva (Piscina Privada)</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" class="btn-submit hover-target" style="margin-top: 30px; width: 100%;">Solicitar Reserva de Luxo</button>
                </form>
            </div>
        </div>
    `,
    contactos: `
        <h2 class="modal-title">Fale Connosco</h2>
        <div class="contacts-wrapper">
            <div class="contacts-info hover-target">
                <h3 style="color: var(--accent-color); font-family: 'Cinzel'; margin-bottom: 15px;">A Nossa Morada</h3>
                <p style="color: #ccc; line-height: 1.8; margin-bottom: 30px;">Quinta do Paraíso<br>Alto Douro Vinhateiro<br>Vila Nova de Foz Côa, Portugal</p>
                <h3 style="color: var(--accent-color); font-family: 'Cinzel'; margin-bottom: 15px;">Linha Direta</h3>
                <p style="color: #ccc; line-height: 1.8;">Email: refugio@quintadoparaiso.pt<br>Telefone: +351 279 000 000</p>
            </div>
            
            <div class="contact-form-box">
                <h3 style="color: var(--accent-color); font-family: 'Cinzel'; margin-bottom: 20px; font-size: 1.4rem;">Envie-nos uma Mensagem</h3>
                <form onsubmit="event.preventDefault(); alert('A sua mensagem foi enviada com sucesso! Responderemos num prazo de 24h.');">
                    <div class="input-group full" style="margin-bottom: 15px;">
                        <input type="text" required placeholder="O seu Nome">
                    </div>
                    <div class="input-group full" style="margin-bottom: 15px;">
                        <input type="email" required placeholder="O seu Email">
                    </div>
                    <div class="input-group full" style="margin-bottom: 15px;">
                        <input type="text" required placeholder="Assunto da Mensagem">
                    </div>
                    <div class="input-group full" style="margin-bottom: 20px;">
                        <textarea rows="4" required placeholder="Como podemos ajudar a planear a sua estadia?"></textarea>
                    </div>
                    <button type="submit" class="btn-submit hover-target" style="width: 100%; padding: 12px;">Enviar Mensagem ✉️</button>
                </form>
            </div>

            <div class="map-embed-container hover-target">
                <iframe src="https://www.google.com/maps/embed" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
    `,
    jogos: `
        <h2 class="modal-title">Academia: A Jornada do Vinho</h2>
        <div class="game-zone">
            
            <!-- FASE 1: Colheita -->
            <div id="vindima-1" class="vindima-stage active">
                <div class="stage-icon">✂️</div>
                <h3 class="stage-title">Fase 1: A Colheita Manual</h3>
                <p class="stage-desc">As uvas Touriga Nacional atingiram a maturação perfeita. Clique nas 4 uvas maduras para encher os cestos e avançar!</p>
                <div class="interactive-game-area" id="grape-area">
                    <span class="game-item grape" onclick="clickGrape(this)">🍇</span>
                    <span class="game-item grape" onclick="clickGrape(this)">🍇</span>
                    <span class="game-item grape" onclick="clickGrape(this)">🍇</span>
                    <span class="game-item grape" onclick="clickGrape(this)">🍇</span>
                </div>
            </div>

            <!-- FASE 2: Pisar -->
            <div id="vindima-2" class="vindima-stage">
                <div class="stage-icon">🦶</div>
                <h3 class="stage-title">Fase 2: A Pisar no Lagar</h3>
                <p class="stage-desc">A tradição manda pisar a pé! Clique no lagar várias vezes para esmagar as uvas e extrair o mosto.</p>
                <div class="interactive-game-area" style="flex-direction: column;">
                    <div class="game-progress-bar"><div class="game-progress-fill" id="lagar-bar"></div></div>
                    <span class="game-item" onclick="clickLagar()" style="font-size: 5rem;">🏺</span>
                </div>
            </div>

            <!-- FASE 3: Fermentação -->
            <div id="vindima-3" class="vindima-stage">
                <div class="stage-icon">🌡️</div>
                <h3 class="stage-title">Fase 3: Fermentação</h3>
                <p class="stage-desc">O açúcar transforma-se em álcool. Inicie o processo e aguarde que as leveduras façam a sua magia mágica.</p>
                <button class="btn-submit" id="btn-fermentar" onclick="startFermentation()">Iniciar Fermentação</button>
                <div class="interactive-game-area" style="margin-top: 20px;">
                    <div class="game-progress-bar"><div class="game-progress-fill" id="ferment-bar"></div></div>
                </div>
            </div>

            <!-- FASE 4: Estágio -->
            <div id="vindima-4" class="vindima-stage">
                <div class="stage-icon">🪵</div>
                <h3 class="stage-title">Fase 4: Estágio em Barrica</h3>
                <p class="stage-desc">O vinho precisa de descansar e ganhar corpo. Clique na barrica de carvalho francês para selar e iniciar o estágio.</p>
                <div class="interactive-game-area">
                    <span class="game-item" onclick="advanceVindima(5)" style="font-size: 6rem;">🛢️</span>
                </div>
            </div>

            <!-- FASE 5: Engarrafar -->
            <div id="vindima-5" class="vindima-stage">
                <div class="stage-icon">🍷</div>
                <h3 class="stage-title">Fase 5: Sucesso!</h3>
                <p class="stage-desc">Parabéns! Dominou o processo de vinificação da Quinta do Paraíso. O seu vinho Grande Reserva está pronto a servir.</p>
                <button class="btn-submit" onclick="resetVindima()">Jogar Novamente</button>
            </div>

        </div>
    `,
    galeria: `
        <h2 class="modal-title">Galeria 3D Dinâmica</h2>
        <div class="dynamic-gallery custom-scroll">
            <div class="gal-card hover-target" style="background-image: url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80');" onclick="openLb(this)"></div>
            <div class="gal-card hover-target" style="background-image: url('https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80');" onclick="openLb(this)"></div>
            <div class="gal-card hover-target" style="background-image: url('https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80');" onclick="openLb(this)"></div>
            <div class="gal-card hover-target" style="background-image: url('https://images.unsplash.com/photo-1437158941788-b210214c7dc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80');" onclick="openLb(this)"></div>
            <div class="gal-card hover-target" style="background-image: url('https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80');" onclick="openLb(this)"></div>
        </div>
    `,
    reviews: `
        <h2 class="modal-title">Testemunhos Editoriais</h2>
        <div style="text-align: center; margin-bottom: 10px; color:#aaa; font-family:'Manrope'; text-transform:uppercase; letter-spacing:2px; font-size:0.8rem;">Filtre a experiência por classificação:</div>
        <div class="star-filter-container hover-target" style="text-align: center;">
            <span class="filter-star s1" style="color: var(--accent-color); text-shadow: 0 0 20px var(--accent-color);" onclick="filterRev(1)">★</span>
            <span class="filter-star s2" style="color: var(--accent-color); text-shadow: 0 0 20px var(--accent-color);" onclick="filterRev(2)">★</span>
            <span class="filter-star s3" style="color: var(--accent-color); text-shadow: 0 0 20px var(--accent-color);" onclick="filterRev(3)">★</span>
            <span class="filter-star s4" style="color: var(--accent-color); text-shadow: 0 0 20px var(--accent-color);" onclick="filterRev(4)">★</span>
            <span class="filter-star s5" style="color: var(--accent-color); text-shadow: 0 0 20px var(--accent-color);" onclick="filterRev(5)">★</span>
        </div>
        <div class="reviews-wrapper" id="reviews-container">
            <div class="review-card show r5"><div class="rev-stars">⭐⭐⭐⭐⭐</div><p class="rev-text">"A autêntica alma duriense concentrada num só lugar. O pequeno-almoço com vista para o rio Douro é inesquecível!"</p><p class="rev-author">— Sarah T., Londres</p></div>
            <div class="review-card show r5"><div class="rev-stars">⭐⭐⭐⭐⭐</div><p class="rev-text">"O serviço de vinoterapia no Spa é do outro mundo. Saímos completamente renovados."</p><p class="rev-author">— João P., Lisboa</p></div>
            <div class="review-card r4"><div class="rev-stars">⭐⭐⭐⭐</div><p class="rev-text">"Lindo alojamento e vinhos incríveis, mas a estrada de acesso pela montanha é um pouco sinuosa para carros baixos."</p><p class="rev-author">— Manuel G., Porto</p></div>
            <div class="review-card r3"><div class="rev-stars">⭐⭐⭐</div><p class="rev-text">"A paisagem é incrivel, a adega é soberba, mas choveu a semana toda infelizmente."</p><p class="rev-author">— Carlos C., Braga</p></div>
        </div>
    `,
    mural: `
        <h2 class="modal-title">O Nosso Mural</h2>
        <div class="insta-header">
            <div class="insta-profile"></div>
            <div class="insta-stats">
                <div><strong>56</strong> Publicações</div>
                <div><strong>12.5k</strong> Seguidores</div>
                <button class="btn-submit hover-target" style="margin:0; padding: 10px 25px; font-size: 0.9rem;" onclick="window.open('https://www.instagram.com/quintadoparaiso_2026/', '_blank')">Seguir Conta</button>
            </div>
        </div>
        <div class="insta-grid">
            <div class="insta-post hover-target"><img src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"><div class="insta-overlay">❤️ 340 💬 12</div></div>
            <div class="insta-post hover-target"><img src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"><div class="insta-overlay">❤️ 512 💬 45</div></div>
            <div class="insta-post hover-target"><img src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"><div class="insta-overlay">❤️ 890 💬 112</div></div>
            <div class="insta-post hover-target" style="background:#222; display:flex; flex-direction:column; justify-content:center; align-items:center; cursor:pointer;" onclick="alert('Upload ativado. Escolha a sua foto com a hashtag #QuintaDoParaiso.')">
                <span style="font-size:3rem; color:var(--accent-color);">+</span><p style="color:#fff; font-family:'Manrope';">Partilhar Foto</p>
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
}

// ==========================================================================
// 5. REVIEWS E LIGHTBOX
// ==========================================================================
window.filterRev = function(stars) {
    // 1. Atualizar Estrelas (UI)
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

    // 2. Ocultar tudo
    document.querySelectorAll('.review-card').forEach(card => card.classList.remove('show'));
    document.querySelectorAll('.r-temp').forEach(el=>el.remove());

    // 3. Mostrar os do nível
    const targetCards = document.querySelectorAll('.r' + stars);
    if(targetCards.length > 0) { 
        targetCards.forEach(card => card.classList.add('show')); 
    } else { 
        document.getElementById('reviews-container').innerHTML += `<p class="rev-text r-temp" style="text-align:center; color:#888;">Ainda não existem avaliações de ${stars} estrelas. A excelência é a nossa regra!</p>`;
    }
}

window.openLb = function(el) {
    let bgImage = el.style.backgroundImage;
    let url = bgImage.slice(4, -1).replace(/"/g, ""); 
    document.getElementById('lb-img').src = url;
    document.getElementById('lightbox').classList.add('active');
}
window.closeLb = function() { document.getElementById('lightbox').classList.remove('active'); }

// ==========================================================================
// 6. ACADEMIA (LÓGICA JOGO DA VINDIMA)
// ==========================================================================
let grapesLeft = 4;
let lagarClicks = 0;

window.advanceVindima = function(stage) {
    document.querySelectorAll('.vindima-stage').forEach(el => el.classList.remove('active'));
    document.getElementById('vindima-' + stage).classList.add('active');
}

window.clickGrape = function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px) scale(0)';
    setTimeout(() => el.style.display = 'none', 300);
    grapesLeft--;
    if(grapesLeft <= 0) { setTimeout(() => advanceVindima(2), 600); }
}

window.clickLagar = function() {
    lagarClicks++;
    let perc = lagarClicks * 20;
    document.getElementById('lagar-bar').style.width = perc + '%';
    if(lagarClicks >= 5) { setTimeout(() => advanceVindima(3), 500); }
}

window.startFermentation = function() {
    document.getElementById('btn-fermentar').style.display = 'none';
    let w = 0;
    let int = setInterval(() => {
        w += 2;
        document.getElementById('ferment-bar').style.width = w + '%';
        if(w >= 100) { clearInterval(int); setTimeout(() => advanceVindima(4), 500); }
    }, 50);
}

window.resetVindima = function() {
    grapesLeft = 4;
    lagarClicks = 0;
    // Reseta o innerHTML repuxando dos dados puros:
    openSection('jogos'); 
}

// ==========================================================================
// 7. SOMMELIER IA
// ==========================================================================
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
        aiMessage.innerHTML = "A processar harmonização de dados...";
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

if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

updateHoverTargets();
