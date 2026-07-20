// ==========================================================================
// 1. CURSORES DOURADOS E PARALLAX
// ==========================================================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    if(cursorDot) {
        cursorDot.style.left = `${e.clientX}px`; 
        cursorDot.style.top = `${e.clientY}px`;
    }
    if(cursorOutline) {
        cursorOutline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 500, fill: "forwards" });
    }
    
    const x = (window.innerWidth - e.pageX * 2) / 90;
    const y = (window.innerHeight - e.pageY * 2) / 90;
    document.documentElement.style.setProperty('--px', `${x}px`);
    document.documentElement.style.setProperty('--py', `${y}px`);
});

const updateHoverTargets = () => {
    document.querySelectorAll('.hover-target, button, input, select, textarea, .carousel-card, .lone-icon, .gal-card, .ai-pill, .filter-star, .game-item, .btn-submit, .wine-card, .service-item, .review-card, .insta-post, .moving-grape, .lagar-area, .wine-flip-card, .deck-container, .btn-back-gallery, .exp-gal-card').forEach(target => {
        if (!target.dataset.hoverBound) {
            target.dataset.hoverBound = 'true';
            target.addEventListener('mouseenter', () => { if(cursorOutline) cursorOutline.classList.add('expand'); });
            target.addEventListener('mouseleave', () => { if(cursorOutline) cursorOutline.classList.remove('expand'); });
        }
    });
};

// ==========================================================================
// 2. ÍCONES FLUTUANTES MAGNÉTICOS E CARROSSEL
// ==========================================================================
const loneIcons = document.querySelectorAll('.lone-icon');
const infoScreen = document.getElementById('info-display');
const infoTitle = document.getElementById('info-title');
const infoDesc = document.getElementById('info-desc');
const logoMestreWrapper = document.getElementById('logo-mestre-wrapper');

loneIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        if(infoTitle && infoDesc && infoScreen) {
            infoTitle.innerText = icon.getAttribute('data-t');
            infoDesc.innerText = icon.getAttribute('data-d');
            infoScreen.classList.add('active');
        }
        if(logoMestreWrapper) logoMestreWrapper.classList.add('shift-up');
        
        loneIcons.forEach(other => {
            if (other !== icon) other.classList.add('flee');
        });
    });
    icon.addEventListener('mouseleave', () => {
        if(infoScreen) infoScreen.classList.remove('active');
        if(logoMestreWrapper) logoMestreWrapper.classList.remove('shift-up');
        loneIcons.forEach(other => other.classList.remove('flee'));
    });
});

let menuOpen = false;
let curatorOpen = false;
let isSectionOpen = false; 
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
        if(mapaContainer) mapaContainer.classList.add('menu-open');
        const cards = document.querySelectorAll('.carousel-card');
        const angleStep = 360 / cards.length;
        cards.forEach((card, i) => {
            card.style.transform = `rotateY(${i * angleStep}deg) translateZ(450px)`;
        });
    } else {
        if(mapaContainer) mapaContainer.classList.remove('menu-open');
        autoSpin = true;
    }
}

window.toggleCurator = function() {
    const panel = document.getElementById('curator-panel');
    curatorOpen = !curatorOpen;
    if(curatorOpen) {
        if(panel) panel.classList.add('active');
    } else {
        if(panel) panel.classList.remove('active');
    }
}

function animateCarousel() {
    if(menuOpen && autoSpin && !isDragging && carousel) {
        currAngle -= 0.15; 
        carousel.style.transform = `rotateX(-5deg) rotateY(${currAngle}deg)`;
    }
    requestAnimationFrame(animateCarousel);
}
animateCarousel();

document.querySelectorAll('.carousel-card').forEach(card => {
    card.addEventListener('mouseenter', () => { autoSpin = false; });
    card.addEventListener('mouseleave', () => { if (!isDragging && !isSectionOpen) autoSpin = true; });
});

const carContainer = document.getElementById('carousel-container');
if(carContainer) {
    carContainer.addEventListener('mousedown', (e) => { isDragging = true; autoSpin = false; startX = e.clientX; });
    window.addEventListener('mouseup', () => { isDragging = false; setTimeout(() => { if(!isSectionOpen) autoSpin = true; }, 1500); });
    carContainer.addEventListener('mousemove', (e) => {
        if(!isDragging || !carousel) return;
        const deltaX = e.clientX - startX;
        currAngle += deltaX * 0.3;
        carousel.style.transform = `rotateX(-5deg) rotateY(${currAngle}deg)`;
        startX = e.clientX;
    });
}

// ==========================================================================
// 4. CONTEÚDOS DOS MODAIS DA PLATAFORMA
// ==========================================================================

const wineDetails = {
    w1: { type: "Rosé", name: "Tavedo Rosé", price: "18.00€", img: "Vinho1.png", link: "https://burmester.pt/vinhos/tavedo-rose/", desc: "De cor suave e apetecível, este rosé demonstra uma frescura imediata no nariz. As notas de frutos vermelhos de acidez elevada como groselha e framboesa imiscuem-se com nuances mentoladas. Na boca é equilibrado e guloso, conseguindo manter esse registo no tempo. Ideal para acompanhar sushi, pratos de peixe e saladas." },
    w2: { type: "Branco", name: "Branco Clássico", price: "22.50€", img: "Vinho2.png", link: "https://burmester.pt/vinhos/burmester-branco/", desc: "De aroma elegante e frutado, a elegância do nariz é pautada pela frescura das notas cítricas envoltas num conjunto de ervas frescas. Envolvente na prova de boca, este é um vinho que se revela guloso e fresco, proporcionando bons momentos de descontração. Ideal para acompanhar saladas e pratos de peixe." },
    w3: { type: "Branco Reserva", name: "Casa Branco", price: "35.00€", img: "Vinho3.png", link: "https://burmester.pt/vinhos/casa-burmester-branco/", desc: "Um Reserva de grande elegância e carácter, que cativa pelas notas a fruta amarela e ervas aromáticas frescas. Vibrante na frescura, cheio no corpo, pleno de garra, revela ligeiras notas fumadas que realçam a sua complexidade. Um vinho bem estruturado com um final longo e muito refrescante. Ideal para acompanhar mariscos, peixes gordos e carnes brancas." },
    w4: { type: "Tinto Reserva", name: "Touriga Nacional", price: "45.00€", img: "Vinho4.png", link: "https://burmester.pt/vinhos/casa-burmester-touriga-nacional-2018/", desc: "Concentrado e pleno de frescura, apresenta delicadas notas florais envolvidas pela exuberância de fruta preta. Um conjunto elegante, marcado pelos taninos maduros e redondos, demonstrando um excelente volume em boca que se prolonga no tempo. Um vinho que cativa pela persistência e cremosidade. Ideal para acompanhar carnes vermelhas, carnes de caça e também queijos." },
    w5: { type: "Tinto", name: "Casa Tinto", price: "28.00€", img: "Vinho5.png", link: "https://burmester.pt/vinhos/casa-burmester-tinto/", desc: "Nariz profundo e denso, onde a fruta preta sobressai num fundo de leves notas de especiarias. Barrica muito fina e bem integrada, fazendo sobressair a frescura do bouquet. Boca estruturada revelando uma textura elegante e aveludada com a fruta bem presente. Termina longo e recheado de pormenores muito sedutores. Ideal para acompanhar carnes vermelhas, carnes de caça e queijos." },
    w6: { type: "Vinho do Porto", name: "Tawny Clássico", price: "32.00€", img: "Vinho6.png", link: "https://burmester.pt/vinhos/burmester-tawny-port/", desc: "Brilhante cor castanha-aloirada. Nariz repleto de fruta madura com sedutoras nuances abaunilhadas. No palato mostra uma apetitosa frescura e um pronunciado caráter frutado. Aveludado, redondo e de notável envolvência. Servido bem fresco, é o aperitivo ideal para acompanhar com frutos secos e sobremesas." },
    w7: { type: "Vinho do Porto", name: "Quinta do Paraíso Vintage", price: "85.00€", img: "Vinho7.png", link: "https://burmester.pt/vinhos/vintage-2018-quinta-do-arnozelo/", desc: "De cor vermelho opaco com laivos violetas, este Vintage marca por uma expressão aromática bastante floral e pelas notas de fruta tropical, onde se destacam as notas de flor de laranjeira, cassis, rosmaninho, frutos do bosque e ameixas. Com taninos bem marcados, tensos e musculados, envolvidos em notas de alcaçuz e fruta fresca, revela o vigor do terroir da Quinta. Final longo e elegante." }
};

const sectionData = {
    quem: `
        <h2 class="modal-title" style="margin-bottom: 10px;">A Nossa História</h2>
        <div class="editorial-layout hover-target">
            <div class="editorial-image-box">
                <img src="sara.jpg" alt="Sara Reis" onerror="this.src='https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'">
                <div class="editorial-signature">
                    <h4>Sara Reis</h4>
                    <span>Fundadora</span>
                </div>
            </div>
            
            <div class="editorial-text-box custom-scroll">
                <p class="lead">Sou apaixonada pelo Douro, pelas suas paisagens e pelas tradições que fazem desta região um dos maiores tesouros de Portugal. Cresci rodeada pela cultura da vinha e pelo respeito pelo trabalho da terra, aprendendo desde cedo que cada colheita conta uma história e que cada garrafa de vinho transporta consigo a dedicação de quem a produz.</p>
                <p>Foi dessa ligação à região que nasceu o sonho de criar um espaço onde a autenticidade do Douro pudesse ser vivida por todos. Mais do que uma quinta de produção vinícola, imaginei um lugar onde os visitantes encontrassem tranquilidade, conforto e experiências memoráveis, rodeados pelas vinhas, pela gastronomia local e pelas paisagens classificadas como Património Mundial.</p>
                <p>Na nossa quinta, acreditamos que o enoturismo vai muito além da prova de vinhos. É uma oportunidade para conhecer as tradições durienses, participar em momentos únicos da vida da vinha, desfrutar de alojamentos acolhedores e criar memórias inesquecíveis num ambiente onde a natureza e a hospitalidade caminham lado a lado.</p>
                <p>Cada detalhe foi pensado para proporcionar uma experiência genuína, combinando a riqueza da tradição com o conforto contemporâneo. O nosso compromisso é receber cada visitante como parte da nossa história, partilhando a paixão pelo vinho, pela cultura e pela beleza incomparável do Douro.</p>
                <p class="welcome">Seja bem-vindo(a) à nossa quinta. Esperamos que cada visita seja uma celebração dos sentidos e uma oportunidade para descobrir tudo aquilo que torna o Douro verdadeiramente único.</p>
            </div>
        </div>
    `,
    servicos: `
        <h2 class="modal-title">Atividades & Serviços</h2>
        <div class="services-luxury-grid">
            <div class="service-item hover-target" onclick="this.classList.toggle('expanded')">
                <div class="si-icon">🚤</div>
                <div class="si-details">
                    <h4>Passeio de Barco no Rio Douro</h4>
                    <p>1h30 <span>•</span> 45€ / pax</p>
                    <div class="si-extra">Navegue pelas águas calmas do Douro num barco rabelo privado. Inclui prova de vinhos a bordo e paragem num cais secreto para fotografias fantásticas.</div>
                </div>
            </div>
            <div class="service-item hover-target" onclick="this.classList.toggle('expanded')">
                <div class="si-icon">🚙</div>
                <div class="si-details">
                    <h4>Passeio de Jipe pelas Vinhas</h4>
                    <p>2h00 <span>•</span> 40€ / pax</p>
                    <div class="si-extra">Aventure-se pelos socalcos mais altos da quinta num veículo todo-o-terreno. A melhor forma de ver o pôr-do-sol entre as videiras centenárias.</div>
                </div>
            </div>
            <div class="service-item hover-target" onclick="this.classList.toggle('expanded')">
                <div class="si-icon">🧺</div>
                <div class="si-details">
                    <h4>Piquenique na Vinha</h4>
                    <p>Até 3h00 <span>•</span> 35€ / pax</p>
                    <div class="si-extra">Preparamos um cesto luxuoso com queijos, enchidos regionais e pão rústico, harmonizado com o nosso melhor vinho, num cenário idílico isolado.</div>
                </div>
            </div>
            <div class="service-item hover-target" onclick="this.classList.toggle('expanded')">
                <div class="si-icon">🧖‍♀️</div>
                <div class="si-details">
                    <h4>Spa de Vinoterapia</h4>
                    <p>1h00 <span>•</span> 65€ / pax</p>
                    <div class="si-extra">Tratamentos de relaxamento profundo utilizando as propriedades antioxidantes das nossas uvas. Um renascer do corpo e da mente.</div>
                </div>
            </div>
            <div class="service-item hover-target" onclick="this.classList.toggle('expanded')">
                <div class="si-icon">🏺</div>
                <div class="si-details">
                    <h4>Visita à Adega</h4>
                    <p>45 min <span>•</span> 15€ / pax</p>
                    <div class="si-extra">Uma visita guiada ao coração da nossa produção. Desça às caves antigas e entenda o nosso processo de estágio em barrica.</div>
                </div>
            </div>
            <div class="service-item hover-target" onclick="this.classList.toggle('expanded')">
                <div class="si-icon">🍷</div>
                <div class="si-details">
                    <h4>Degustação de Vinhos</h4>
                    <p>1h00 <span>•</span> 25€ / pax</p>
                    <div class="si-extra">Uma prova orientada pela nossa Sommelier. Inclui degustação de 3 referências premium e harmonização com queijos e compotas locais.</div>
                </div>
            </div>
            
            <div class="service-item span-2-col hover-target" onclick="this.classList.toggle('expanded')">
                <div class="si-icon">🍇</div>
                <div class="si-details">
                    <h4>Visita à Adega + Degustação</h4>
                    <p>1h30 <span>•</span> 35€ / pax</p>
                    <div class="si-extra">A experiência completa. Explore as nossas caves históricas e termine com uma prova de vinhos de luxo na nossa sala panorâmica.</div>
                </div>
            </div>
            
            <div class="service-item service-highlight-custom hover-target" onclick="closeSection(); openAI();" style="cursor: pointer;">
                <div class="si-icon" style="margin-bottom: 5px;">✨</div>
                <div class="si-details">
                    <h4 style="font-size: 1.3rem; margin-bottom: 5px; font-family: 'Cinzel'; color: #fff;">Personalizar Experiência</h4>
                    <p style="color: #ccc; font-weight: 400; font-size: 0.9rem; margin: 0;">Fale com a IA Concierge</p>
                </div>
            </div>
        </div>
    `,
    loja: `
        <h2 class="modal-title">Garrafeira Haute Couture</h2>
        
        <div id="wine-grid-view" class="shop-grid custom-scroll">
            
            <!-- VINHO 7 (VINTAGE - DESTAQUE HORIZONTAL) -->
            <div class="wine-flip-card vintage-highlight hover-target" onclick="flipWineCard(this)">
                <div class="recomendacao-badge">★ A Nossa Recomendação ★</div>
                <div class="wine-flip-inner">
                    <div class="wine-flip-front" style="border-color: var(--accent-color); box-shadow: 0 0 30px rgba(212,175,55,0.2);">
                        <div class="vintage-front-content">
                            <div class="vintage-text-area">
                                <span class="wine-type">Vinho do Porto</span>
                                <h4 class="wine-name">Quinta do Paraíso Vintage</h4>
                                <div class="vintage-price">85.00€</div>
                                <p class="vintage-desc">A joia da nossa coroa. Produção extremamente limitada para os verdadeiros apreciadores. Clique na carta para explorar.</p>
                            </div>
                            <div class="vintage-img-area">
                                <img src="Vinho7.png" alt="Vintage" class="wine-bottle-img" onerror="this.src='https://via.placeholder.com/100x250/111/D4AF37?text=Vinho7'">
                            </div>
                        </div>
                    </div>
                    <div class="wine-flip-back" style="border-color: var(--accent-color);">
                        <div class="vintage-back-content">
                            <div class="vintage-text-area">
                                <h4 class="wine-name" style="color:var(--accent-color); margin-bottom:5px;">Vintage</h4>
                                <div class="vintage-price" style="color:#fff;">85.00€</div>
                                <p class="vintage-desc" style="color:#ccc; font-style: italic;">Cor vermelho opaco. Expressão aromática floral com notas de flor de laranjeira, cassis e frutos do bosque. Taninos tensos e musculados.</p>
                                <div class="vintage-actions">
                                    <button class="btn-buy hover-target" onclick="openDetails(event, 'w7')">Informações</button>
                                    <button class="btn-buy hover-target" style="background: var(--accent-color); color: #000;" onclick="buyWine(event, 'w7')">Comprar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- VINHO 1 -->
            <div class="wine-flip-card hover-target" onclick="flipWineCard(this)">
                <div class="wine-flip-inner">
                    <div class="wine-flip-front">
                        <div>
                            <span class="wine-type">Rosé</span>
                            <h4 class="wine-name">Tavedo Rosé</h4>
                            <div style="color:var(--accent-color); font-weight: bold; font-size: 1.1rem; margin-top: -5px; margin-bottom: 15px;">18.00€</div>
                        </div>
                        <img src="Vinho1.png" alt="Tavedo Rosé" class="wine-bottle-img" onerror="this.src='https://via.placeholder.com/100x250/111/D4AF37?text=Vinho1'">
                    </div>
                    <div class="wine-flip-back">
                        <h4 class="wine-name" style="color:var(--accent-color); font-size: 1.5rem; margin-bottom:5px;">Tavedo Rosé</h4>
                        <span style="color:#fff; font-size: 1.1rem; font-weight: bold;">18.00€</span>
                        <p>De cor suave e apetecível, demonstra uma frescura imediata. Frutos vermelhos imiscuem-se com nuances mentoladas.</p>
                        <div class="wine-back-actions">
                            <button class="btn-buy hover-target" onclick="openDetails(event, 'w1')">Informações</button>
                            <button class="btn-buy hover-target" style="background: var(--accent-color); color: #000;" onclick="buyWine(event, 'w1')">Comprar</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- VINHO 2 -->
            <div class="wine-flip-card hover-target" onclick="flipWineCard(this)">
                <div class="wine-flip-inner">
                    <div class="wine-flip-front">
                        <div>
                            <span class="wine-type">Branco</span>
                            <h4 class="wine-name">Branco Clássico</h4>
                            <div style="color:var(--accent-color); font-weight: bold; font-size: 1.1rem; margin-top: -5px; margin-bottom: 15px;">22.50€</div>
                        </div>
                        <img src="Vinho2.png" alt="Branco Clássico" class="wine-bottle-img" onerror="this.src='https://via.placeholder.com/100x250/111/D4AF37?text=Vinho2'">
                    </div>
                    <div class="wine-flip-back">
                        <h4 class="wine-name" style="color:var(--accent-color); font-size: 1.5rem; margin-bottom:5px;">Branco Clássico</h4>
                        <span style="color:#fff; font-size: 1.1rem; font-weight: bold;">22.50€</span>
                        <p>Aroma elegante e frutado. A elegância do nariz é pautada pela frescura das notas cítricas envoltas em ervas frescas.</p>
                        <div class="wine-back-actions">
                            <button class="btn-buy hover-target" onclick="openDetails(event, 'w2')">Informações</button>
                            <button class="btn-buy hover-target" style="background: var(--accent-color); color: #000;" onclick="buyWine(event, 'w2')">Comprar</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- VINHO 3 -->
            <div class="wine-flip-card hover-target" onclick="flipWineCard(this)">
                <div class="wine-flip-inner">
                    <div class="wine-flip-front">
                        <div>
                            <span class="wine-type">Branco Reserva</span>
                            <h4 class="wine-name">Casa Branco</h4>
                            <div style="color:var(--accent-color); font-weight: bold; font-size: 1.1rem; margin-top: -5px; margin-bottom: 15px;">35.00€</div>
                        </div>
                        <img src="Vinho3.png" alt="Casa Branco" class="wine-bottle-img" onerror="this.src='https://via.placeholder.com/100x250/111/D4AF37?text=Vinho3'">
                    </div>
                    <div class="wine-flip-back">
                        <h4 class="wine-name" style="color:var(--accent-color); font-size: 1.5rem; margin-bottom:5px;">Casa Branco</h4>
                        <span style="color:#fff; font-size: 1.1rem; font-weight: bold;">35.00€</span>
                        <p>Reserva de grande elegância, cativa pela fruta amarela e ervas frescas. Vibrante, cheio no corpo e pleno de garra.</p>
                        <div class="wine-back-actions">
                            <button class="btn-buy hover-target" onclick="openDetails(event, 'w3')">Informações</button>
                            <button class="btn-buy hover-target" style="background: var(--accent-color); color: #000;" onclick="buyWine(event, 'w3')">Comprar</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- VINHO 4 -->
            <div class="wine-flip-card hover-target" onclick="flipWineCard(this)">
                <div class="wine-flip-inner">
                    <div class="wine-flip-front">
                        <div>
                            <span class="wine-type">Tinto Reserva</span>
                            <h4 class="wine-name">Touriga Nacional</h4>
                            <div style="color:var(--accent-color); font-weight: bold; font-size: 1.1rem; margin-top: -5px; margin-bottom: 15px;">45.00€</div>
                        </div>
                        <img src="Vinho4.png" alt="Touriga Nacional" class="wine-bottle-img" onerror="this.src='https://via.placeholder.com/100x250/111/D4AF37?text=Vinho4'">
                    </div>
                    <div class="wine-flip-back">
                        <h4 class="wine-name" style="color:var(--accent-color); font-size: 1.5rem; margin-bottom:5px;">Touriga Nacional</h4>
                        <span style="color:#fff; font-size: 1.1rem; font-weight: bold;">45.00€</span>
                        <p>Concentrado e pleno de frescura, apresenta delicadas notas florais envolvidas pela exuberância de fruta preta.</p>
                        <div class="wine-back-actions">
                            <button class="btn-buy hover-target" onclick="openDetails(event, 'w4')">Informações</button>
                            <button class="btn-buy hover-target" style="background: var(--accent-color); color: #000;" onclick="buyWine(event, 'w4')">Comprar</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- VINHO 5 -->
            <div class="wine-flip-card hover-target" onclick="flipWineCard(this)">
                <div class="wine-flip-inner">
                    <div class="wine-flip-front">
                        <div>
                            <span class="wine-type">Tinto</span>
                            <h4 class="wine-name">Casa Tinto</h4>
                            <div style="color:var(--accent-color); font-weight: bold; font-size: 1.1rem; margin-top: -5px; margin-bottom: 15px;">28.00€</div>
                        </div>
                        <img src="Vinho5.png" alt="Casa Tinto" class="wine-bottle-img" onerror="this.src='https://via.placeholder.com/100x250/111/D4AF37?text=Vinho5'">
                    </div>
                    <div class="wine-flip-back">
                        <h4 class="wine-name" style="color:var(--accent-color); font-size: 1.5rem; margin-bottom:5px;">Casa Tinto</h4>
                        <span style="color:#fff; font-size: 1.1rem; font-weight: bold;">28.00€</span>
                        <p>Nariz profundo onde a fruta preta sobressai num fundo de especiarias. Textura elegante, aveludada e final longo.</p>
                        <div class="wine-back-actions">
                            <button class="btn-buy hover-target" onclick="openDetails(event, 'w5')">Informações</button>
                            <button class="btn-buy hover-target" style="background: var(--accent-color); color: #000;" onclick="buyWine(event, 'w5')">Comprar</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- VINHO 6 -->
            <div class="wine-flip-card hover-target" onclick="flipWineCard(this)">
                <div class="wine-flip-inner">
                    <div class="wine-flip-front">
                        <div>
                            <span class="wine-type">Vinho do Porto</span>
                            <h4 class="wine-name">Tawny Clássico</h4>
                            <div style="color:var(--accent-color); font-weight: bold; font-size: 1.1rem; margin-top: -5px; margin-bottom: 15px;">32.00€</div>
                        </div>
                        <img src="Vinho6.png" alt="Tawny Clássico" class="wine-bottle-img" onerror="this.src='https://via.placeholder.com/100x250/111/D4AF37?text=Vinho6'">
                    </div>
                    <div class="wine-flip-back">
                        <h4 class="wine-name" style="color:var(--accent-color); font-size: 1.5rem; margin-bottom:5px;">Tawny Clássico</h4>
                        <span style="color:#fff; font-size: 1.1rem; font-weight: bold;">32.00€</span>
                        <p>Brilhante cor castanha-aloirada. Nariz repleto de fruta madura com sedutoras nuances abaunilhadas. Aveludado e redondo.</p>
                        <div class="wine-back-actions">
                            <button class="btn-buy hover-target" onclick="openDetails(event, 'w6')">Informações</button>
                            <button class="btn-buy hover-target" style="background: var(--accent-color); color: #000;" onclick="buyWine(event, 'w6')">Comprar</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div id="wine-detail-view" class="wine-detail-wrapper" style="display:none;">
            <div class="wd-img-container">
                <img id="wd-img" src="" alt="Garrafa">
            </div>
            <div class="wd-info-container">
                <span id="wd-type" class="wd-type"></span>
                <h3 id="wd-title" class="wd-title"></h3>
                <p id="wd-desc" class="wd-desc">As notas de prova da adega serão exibidas aqui para análise.</p>
                <div id="wd-price" class="wd-price"></div>
                <div class="wd-actions">
                    <button class="btn-back hover-target" onclick="hideWineDetail()">Voltar à Garrafeira</button>
                </div>
            </div>
        </div>
    `,
    restaurante: `
        <h2 class="modal-title">Gastronomia de Autor</h2>
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
                        <div class="menu-item-info"><h4>Pêra Bêbada</h4><p>Pêra rocha escalfada em tinto jovem, com gelado de baunilha.</p></div>
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
                                <option value="branco">Refúgio Branco (2 a 4 pax)</option>
                                <option value="rose">Refúgio Rosé (2 a 4 pax)</option>
                                <option value="tinto">Refúgio Tinto (2 a 4 pax)</option>
                                <option value="tawny">Casa Tawny (4 a 8 pax, Familiar)</option>
                                <option value="ruby">Casa Ruby (4 a 8 pax, Familiar)</option>
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
                    <button type="submit" class="btn-submit hover-target" style="width: 100%; padding: 12px;">Enviar Mensagem</button>
                </form>
            </div>

            <div class="map-embed-container hover-target">
                <iframe src="https://maps.google.com/maps?q=41.136054,-7.3031649&hl=pt&z=14&output=embed" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
    `,
    jogos: `
        <h2 class="modal-title">Academia: A Jornada do Vinho</h2>
        <div class="game-zone">
            
            <!-- FASE 1: Colheita -->
            <div id="vindima-1" class="vindima-stage active" style="padding: 40px;">
                <h3 class="stage-title">Fase 1: A Colheita Manual</h3>
                <p class="stage-desc">As uvas maduras começaram a surgir nas videiras. Seja rápido! Clique nas 5 uvas maduras para as apanhar antes que desapareçam.</p>
                
                <div class="vine-container" id="vine-container"></div>
                <div class="game-progress-bar"><div class="game-progress-fill" id="colheita-bar"></div></div>
                
                <button class="btn-submit hover-target" id="btn-start-1" onclick="startColheita()">Iniciar Colheita</button>
                <button class="btn-submit hover-target" id="btn-next-1" style="display:none;" onclick="advanceVindima(2)">Ir para o Lagar</button>
            </div>

            <!-- FASE 2: Pisar -->
            <div id="vindima-2" class="vindima-stage" style="padding: 40px;">
                <h3 class="stage-title">Fase 2: A Pisar no Lagar</h3>
                <p class="stage-desc">A tradição manda pisar a pé! Clique no lagar o mais rápido que conseguir para esmagar as uvas e extrair o mosto.</p>
                <div class="interactive-game-area" style="flex-direction: column;">
                    <div class="game-progress-bar"><div class="game-progress-fill" id="lagar-bar"></div></div>
                    <div class="lagar-area hover-target" onclick="clickLagar(event)"></div>
                </div>
                <button class="btn-submit hover-target" id="btn-next-2" style="display:none; margin-top:20px;" onclick="advanceVindima(3)">Ir para a Fermentação</button>
            </div>

            <!-- FASE 3: Fermentação -->
            <div id="vindima-3" class="vindima-stage" style="padding: 40px;">
                <h3 class="stage-title">Fase 3: Controlo da Fermentação</h3>
                <p class="stage-desc">Cuidado com o calor! O processo faz a temperatura subir. Clique no botão de arrefecer para manter o mosto na <strong>zona verde</strong> até a barra encher.</p>
                
                <div class="temp-meter"><div class="temp-pointer" id="temp-pointer"></div></div>
                <div class="game-progress-bar"><div class="game-progress-fill" id="ferment-bar"></div></div>
                
                <button class="btn-submit hover-target" id="btn-cool" onclick="coolDown()" style="display:none; background:#2196F3; color:#fff; border-color:#2196F3; margin-bottom:15px;">❄️ Arrefecer Cuba</button>
                <button class="btn-submit hover-target" id="btn-start-3" onclick="startFermentation()">Ligar Cubas</button>
                <button class="btn-submit hover-target" id="btn-next-3" style="display:none;" onclick="advanceVindima(4)">Ir para o Estágio</button>
            </div>

            <!-- FASE 4: Estágio -->
            <div id="vindima-4" class="vindima-stage" style="padding: 40px;">
                <h3 class="stage-title">Fase 4: Estágio em Barrica</h3>
                <p class="stage-desc">Precisão é fundamental. Tente selar a barrica exatamente quando a linha cruzar a marca dourada central!</p>
                
                <div class="timing-bar-container">
                    <div class="timing-target"></div>
                    <div class="timing-cursor" id="timing-cursor"></div>
                </div>
                
                <button class="btn-submit hover-target" id="btn-start-4" onclick="startEstagio()">Preparar Barrica</button>
                <button class="btn-submit hover-target" id="btn-stop-4" onclick="stopEstagio()" style="display:none; background:#FF9800;">Selar Barrica!</button>
                <button class="btn-submit hover-target" id="btn-next-4" style="display:none;" onclick="advanceVindima(5)">Ver Resultado</button>
            </div>

            <!-- FASE 5: Engarrafar -->
            <div id="vindima-5" class="vindima-stage" style="padding: 40px;">
                <h3 class="stage-title" style="font-size: 2.5rem; margin-bottom: 20px;">Sucesso de Ouro!</h3>
                <p class="stage-desc">Parabéns! Dominou o processo de vinificação com mestria. É oficialmente um <strong>Mestre do Douro</strong>. O seu vinho Grande Reserva está pronto a servir.</p>
                <button class="btn-submit hover-target" onclick="resetVindima()" style="margin-top:20px;">Tentar Outra Colheita</button>
            </div>

        </div>
    `,
    galeria: `
        <h2 class="modal-title" id="gal-main-title">Galeria</h2>
        
        <!-- Vista dos Baralhos -->
        <div class="gallery-decks-wrapper" id="gal-decks">
            <div class="deck-container hover-target" onclick="openGalleryCategory('ext', 45, 'O Exterior')">
                <div class="deck-layer layer-1" style="background-image: url('ext3.jpeg');"></div>
                <div class="deck-layer layer-2" style="background-image: url('ext2.jpeg');"></div>
                <div class="deck-layer layer-3" style="background-image: url('ext1.jpeg');"></div>
                <div class="deck-title">O Exterior</div>
            </div>
            
            <div class="deck-container hover-target" onclick="openGalleryCategory('int', 16, 'O Interior')">
                <div class="deck-layer layer-1" style="background-image: url('int3.jpeg');"></div>
                <div class="deck-layer layer-2" style="background-image: url('int2.jpeg');"></div>
                <div class="deck-layer layer-3" style="background-image: url('int1.jpeg');"></div>
                <div class="deck-title">O Interior</div>
            </div>
            
            <div class="deck-container hover-target" onclick="openGalleryCategory('ute', 31, 'Arte & Ofício')">
                <div class="deck-layer layer-1" style="background-image: url('ute3.jpeg');"></div>
                <div class="deck-layer layer-2" style="background-image: url('ute2.jpeg');"></div>
                <div class="deck-layer layer-3" style="background-image: url('ute1.jpeg');"></div>
                <div class="deck-title">Arte & Ofício</div>
            </div>
        </div>

        <!-- Vista Expandida -->
        <div class="gallery-expanded" id="gal-expanded">
            <div class="gallery-header">
                <h3 id="gal-cat-title">Categoria</h3>
                <button class="btn-back-gallery hover-target" onclick="closeGalleryCategory()">← Voltar aos Baralhos</button>
            </div>
            <div class="expanded-grid custom-scroll" id="gal-grid">
                <!-- Imagens injetadas via JS -->
            </div>
        </div>
    `,
    reviews: `
        <h2 class="modal-title">Testemunhos Editoriais</h2>
        <div style="text-align: center; margin-bottom: 10px; color:#aaa; font-family:'Manrope'; text-transform:uppercase; letter-spacing:2px; font-size:0.8rem;">Filtrar Experiências</div>
        <div class="star-filter-container hover-target" style="text-align: center; margin-bottom: 30px;">
            <span class="filter-star s1" style="color: var(--accent-color); text-shadow: 0 0 20px var(--accent-color);" onclick="filterRev(1)">★</span>
            <span class="filter-star s2" style="color: var(--accent-color); text-shadow: 0 0 20px var(--accent-color);" onclick="filterRev(2)">★</span>
            <span class="filter-star s3" style="color: var(--accent-color); text-shadow: 0 0 20px var(--accent-color);" onclick="filterRev(3)">★</span>
            <span class="filter-star s4" style="color: var(--accent-color); text-shadow: 0 0 20px var(--accent-color);" onclick="filterRev(4)">★</span>
            <span class="filter-star s5" style="color: var(--accent-color); text-shadow: 0 0 20px var(--accent-color);" onclick="filterRev(5)">★</span>
        </div>
        
        <div class="reviews-grid custom-scroll" id="reviews-container">
            <div class="review-card show r5 hover-target">
                <div class="quote-mark">"</div>
                <div class="rev-header">
                    <div class="rev-avatar">ST</div>
                    <div>
                        <div class="rev-author">Sarah T., Londres</div>
                        <div class="rev-stars">⭐⭐⭐⭐⭐</div>
                    </div>
                </div>
                <p class="rev-text">A autêntica alma duriense concentrada num só lugar. O pequeno-almoço com vista para o rio Douro é inesquecível!</p>
            </div>
            
            <div class="review-card show r5 hover-target">
                <div class="quote-mark">"</div>
                <div class="rev-header">
                    <div class="rev-avatar">JP</div>
                    <div>
                        <div class="rev-author">João P., Lisboa</div>
                        <div class="rev-stars">⭐⭐⭐⭐⭐</div>
                    </div>
                </div>
                <p class="rev-text">O serviço de vinoterapia no Spa é do outro mundo. Saímos completamente renovados e prontos para regressar à cidade.</p>
            </div>
            
            <div class="review-card show r5 hover-target">
                <div class="quote-mark">"</div>
                <div class="rev-header">
                    <div class="rev-avatar">CM</div>
                    <div>
                        <div class="rev-author">Claire M., Paris</div>
                        <div class="rev-stars">⭐⭐⭐⭐⭐</div>
                    </div>
                </div>
                <p class="rev-text">Excelência a todos níveis. O staff é de uma simpatia formidável e o nosso pombal privado era um autêntico sonho. Voltaremos certamente!</p>
            </div>
            
            <div class="review-card show r5 hover-target">
                <div class="quote-mark">"</div>
                <div class="rev-header">
                    <div class="rev-avatar">AV</div>
                    <div>
                        <div class="rev-author">António V., Madrid</div>
                        <div class="rev-stars">⭐⭐⭐⭐⭐</div>
                    </div>
                </div>
                <p class="rev-text">Uma experiência imersiva e luxuosa. O jantar harmonizado no restaurante superou todas as nossas expectativas gastronómicas.</p>
            </div>
            
            <div class="review-card show r5 hover-target">
                <div class="quote-mark">"</div>
                <div class="rev-header">
                    <div class="rev-avatar">ER</div>
                    <div>
                        <div class="rev-author">Emily R., Nova Iorque</div>
                        <div class="rev-stars">⭐⭐⭐⭐⭐</div>
                    </div>
                </div>
                <p class="rev-text">We loved every second of our stay. The wine tasting with the sommelier was the highlight of our trip to Portugal!</p>
            </div>
            
            <div class="review-card show r5 hover-target">
                <div class="quote-mark">"</div>
                <div class="rev-header">
                    <div class="rev-avatar">PN</div>
                    <div>
                        <div class="rev-author">Pedro N., Porto</div>
                        <div class="rev-stars">⭐⭐⭐⭐⭐</div>
                    </div>
                </div>
                <p class="rev-text">As vistas dos quartos são de cortar a respiração. Acordar com o nevoeiro sobre o rio e o sol a bater nas vinhas é mágico.</p>
            </div>
            
            <div class="review-card show r5 hover-target">
                <div class="quote-mark">"</div>
                <div class="rev-header">
                    <div class="rev-avatar">AS</div>
                    <div>
                        <div class="rev-author">Ana S., Faro</div>
                        <div class="rev-stars">⭐⭐⭐⭐⭐</div>
                    </div>
                </div>
                <p class="rev-text">Tudo pensado ao detalhe, desde o cabaz de boas-vindas até ao requinte da decoração. Um verdadeiro paraíso escondido.</p>
            </div>
            
            <div class="review-card show r5 hover-target">
                <div class="quote-mark">"</div>
                <div class="rev-header">
                    <div class="rev-avatar">HM</div>
                    <div>
                        <div class="rev-author">Hans M., Berlim</div>
                        <div class="rev-stars">⭐⭐⭐⭐⭐</div>
                    </div>
                </div>
                <p class="rev-text">Ein wunderbarer Ort! Der Vintage Portwein ist fantastisch und die Bootsfahrt bei Sonnenuntergang war unbeschreiblich schön.</p>
            </div>
            
            <div class="review-card show r4 hover-target">
                <div class="quote-mark">"</div>
                <div class="rev-header">
                    <div class="rev-avatar">MG</div>
                    <div>
                        <div class="rev-author">Manuel G., Porto</div>
                        <div class="rev-stars">⭐⭐⭐⭐</div>
                    </div>
                </div>
                <p class="rev-text">Lindo alojamento e vinhos incríveis, mas a estrada de acesso pela montanha é um pouco sinuosa para carros muito baixos.</p>
            </div>
            
            <div class="review-card show r4 hover-target">
                <div class="quote-mark">"</div>
                <div class="rev-header">
                    <div class="rev-avatar">LK</div>
                    <div>
                        <div class="rev-author">Laura K., Zurique</div>
                        <div class="rev-stars">⭐⭐⭐⭐</div>
                    </div>
                </div>
                <p class="rev-text">A quinta é maravilhosa e o design de interiores deslumbrante. Apenas achei a água da piscina exterior um pouco fria pela manhã.</p>
            </div>
            
            <div class="review-card show r4 hover-target">
                <div class="quote-mark">"</div>
                <div class="rev-header">
                    <div class="rev-avatar">RS</div>
                    <div>
                        <div class="rev-author">Rui S., Coimbra</div>
                        <div class="rev-stars">⭐⭐⭐⭐</div>
                    </div>
                </div>
                <p class="rev-text">Adoramos o passeio de jipe e o contacto com a natureza. O Wi-Fi na zona mais isolada das vinhas falha um pouco, mas serve para desligar.</p>
            </div>
            
            <div class="review-card show r4 hover-target">
                <div class="quote-mark">"</div>
                <div class="rev-header">
                    <div class="rev-avatar">SL</div>
                    <div>
                        <div class="rev-author">Sofia L., Lisboa</div>
                        <div class="rev-stars">⭐⭐⭐⭐</div>
                    </div>
                </div>
                <p class="rev-text">A comida do restaurante é divina, mas aconselho a reservar com muita antecedência pois as mesas com melhor vista esgotam rápido.</p>
            </div>
        </div>
    `,
    mural: `
        <h2 class="modal-title">O Nosso Mural</h2>
        <div class="insta-header">
            <div class="insta-profile"></div>
            <div class="insta-stats">
                <div><strong>9</strong> Publicações</div>
                <div><strong>1.2k</strong> Visitantes</div>
                <button class="btn-submit hover-target" style="margin:0; padding: 10px 25px; font-size: 0.9rem;" onclick="alert('Funcionalidade de Upload a carregar...')">Solicitar Partilha</button>
            </div>
        </div>
        
        <div class="insta-grid">
            <div class="insta-post hover-target" onclick="openInstaPost(1)"><img src="MU1.jpg" onerror="this.src='https://via.placeholder.com/400/111/D4AF37?text=MU1'"><div class="insta-overlay">❤️ 340 💬 12</div></div>
            <div class="insta-post hover-target" onclick="openInstaPost(2)"><img src="MU2.jpg" onerror="this.src='https://via.placeholder.com/400/111/D4AF37?text=MU2'"><div class="insta-overlay">❤️ 215 💬 8</div></div>
            <div class="insta-post hover-target" onclick="openInstaPost(3)"><img src="MU3.jpg" onerror="this.src='https://via.placeholder.com/400/111/D4AF37?text=MU3'"><div class="insta-overlay">❤️ 890 💬 112</div></div>
            <div class="insta-post hover-target" onclick="openInstaPost(4)"><img src="MU4.jpg" onerror="this.src='https://via.placeholder.com/400/111/D4AF37?text=MU4'"><div class="insta-overlay">❤️ 450 💬 31</div></div>
            <div class="insta-post hover-target" onclick="openInstaPost(5)"><img src="MU5.jpg" onerror="this.src='https://via.placeholder.com/400/111/D4AF37?text=MU5'"><div class="insta-overlay">❤️ 320 💬 15</div></div>
            <div class="insta-post hover-target" onclick="openInstaPost(6)"><img src="MU6.jpg" onerror="this.src='https://via.placeholder.com/400/111/D4AF37?text=MU6'"><div class="insta-overlay">❤️ 610 💬 42</div></div>
            <div class="insta-post hover-target" onclick="openInstaPost(7)"><img src="MU7.jpg" onerror="this.src='https://via.placeholder.com/400/111/D4AF37?text=MU7'"><div class="insta-overlay">❤️ 280 💬 9</div></div>
            <div class="insta-post hover-target" onclick="openInstaPost(8)"><img src="MU8.jpg" onerror="this.src='https://via.placeholder.com/400/111/D4AF37?text=MU8'"><div class="insta-overlay">❤️ 540 💬 38</div></div>
            <div class="insta-post hover-target" onclick="openInstaPost(9)"><img src="MU9.jpg" onerror="this.src='https://via.placeholder.com/400/111/D4AF37?text=MU9'"><div class="insta-overlay">❤️ 412 💬 22</div></div>
        </div>

        <div class="post-modal-overlay" id="post-modal" onclick="closeInstaPost()">
            <div class="post-modal-content" onclick="event.stopPropagation()">
                <button class="post-close hover-target" onclick="closeInstaPost()">✕</button>
                <div class="post-img-col">
                    <img id="pi-img" src="">
                </div>
                <div class="post-info-col">
                    <div class="post-header">
                        <div class="post-avatar" id="pi-avatar"></div>
                        <div class="post-author" id="pi-author"></div>
                    </div>
                    <div class="post-comments custom-scroll" id="pi-comments"></div>
                    <div class="post-actions">
                        <div class="post-likes" id="pi-likes"></div>
                        <div class="post-date" id="pi-date">HÁ 2 DIAS</div>
                    </div>
                </div>
            </div>
        </div>
    `
};

window.openSection = function(type) {
    const modalBody = document.getElementById('modal-body-content');
    const modalOverlay = document.getElementById('main-modal');
    if(modalBody && modalOverlay) {
        modalBody.innerHTML = sectionData[type];
        modalOverlay.classList.add('active');
        isSectionOpen = true; 
        autoSpin = false;
        updateHoverTargets();
    }
}

window.closeSection = function() {
    const modalOverlay = document.getElementById('main-modal');
    if(modalOverlay) {
        modalOverlay.classList.remove('active');
        isSectionOpen = false; 
        autoSpin = true;
        clearGameIntervals();
    }
}

// ==========================================================================
// MURAL SOCIAL INSTAGRAM - POST INDIVIDUAL
// ==========================================================================
const instaData = {
    1: { img: 'MU1.jpg', author: 'joaomartins_88', av: 'JM', likes: '340 gostos', date: 'Há 5 Horas', comments: '<strong>joaomartins_88</strong> Um fim de semana inesquecível no Douro! O vinho é divinal.<br><br><strong>sarah_v</strong> Que vista fantástica 😍<br><br><strong>pedro.p</strong> Precisamos de lá voltar no verão.' },
    2: { img: 'MU2.jpg', author: 'marta.sousa', av: 'MS', likes: '215 gostos', date: 'Há 1 Dia', comments: '<strong>marta.sousa</strong> O melhor refúgio para desligar da cidade. Recomendo vivamente o Spa de Vinoterapia!<br><br><strong>anaclara</strong> Uau, que luxo autêntico.' },
    3: { img: 'MU3.jpg', author: 'carlos_travel', av: 'CT', likes: '890 gostos', date: 'Há 2 Dias', comments: '<strong>carlos_travel</strong> As vinhas do Arnozelo têm uma magia muito própria. Parabéns à Quinta do Paraíso pelo excelente trabalho.<br><br><strong>wine_lover</strong> Excelente colheita este ano 🍷' },
    4: { img: 'MU4.jpg', author: 'sofia.rodrigues', av: 'SR', likes: '450 gostos', date: 'Há 3 Dias', comments: '<strong>sofia.rodrigues</strong> Piquenique perfeito entre as vinhas. O cesto estava recheado de coisas deliciosas da região 🧺🧀<br><br><strong>ines_m</strong> Que inveja boa!' },
    5: { img: 'MU5.jpg', author: 'tiago_ferreira', av: 'TF', likes: '320 gostos', date: 'Há 4 Dias', comments: '<strong>tiago_ferreira</strong> Passeio de barco no Douro ao pôr do sol. Sem palavras! 🚤🌅<br><br><strong>rita.g</strong> Magnífico, a não perder.' },
    6: { img: 'MU6.jpg', author: 'lucas.explore', av: 'LE', likes: '610 gostos', date: 'Há 1 Semana', comments: '<strong>lucas.explore</strong> A adega histórica é lindíssima. Aprendemos imenso na prova de vinhos com a sommelier.<br><br><strong>winetours_pt</strong> Sem dúvida, uma das melhores experiências da região!' },
    7: { img: 'MU7.jpg', author: 'beatriz.silva', av: 'BS', likes: '280 gostos', date: 'Há 1 Semana', comments: '<strong>beatriz.silva</strong> Casa Tawny: super acolhedora para toda a família! As crianças adoraram a piscina privada.<br><br><strong>familia_v</strong> O lugar perfeito para relaxar e fugir à rotina.' },
    8: { img: 'MU8.jpg', author: 'daniel_c', av: 'DC', likes: '540 gostos', date: 'Há 2 Semanas', comments: '<strong>daniel_c</strong> Jantar harmonizado incrível. A Bochecha de Porco Preto estava literalmente a desfazer-se 🍽️🍷<br><br><strong>chef.marco</strong> Grande prato e excelente execução.' },
    9: { img: 'MU9.jpg', author: 'mariana.luz', av: 'ML', likes: '412 gostos', date: 'Há 3 Semanas', comments: '<strong>mariana.luz</strong> Paisagens que parecem pinturas. Um lugar que fica para sempre guardado no coração ❤️<br><br><strong>clara.t</strong> Lindo, lindo, lindo! Mal posso esperar para ir.' }
};

window.openInstaPost = function(id) {
    const data = instaData[id];
    const imgEl = document.getElementById('pi-img');
    if(imgEl) {
        imgEl.src = data.img;
        imgEl.onerror = function() { this.src = 'https://via.placeholder.com/600x600/111/D4AF37?text=Foto+Mural+'+id; };
    }
    
    if(document.getElementById('pi-avatar')) document.getElementById('pi-avatar').innerText = data.av;
    if(document.getElementById('pi-author')) document.getElementById('pi-author').innerText = data.author;
    if(document.getElementById('pi-comments')) document.getElementById('pi-comments').innerHTML = data.comments;
    if(document.getElementById('pi-likes')) document.getElementById('pi-likes').innerText = data.likes;
    if(document.getElementById('pi-date')) document.getElementById('pi-date').innerText = data.date;
    
    if(document.getElementById('post-modal')) document.getElementById('post-modal').classList.add('active');
}

window.closeInstaPost = function() {
    if(document.getElementById('post-modal')) document.getElementById('post-modal').classList.remove('active');
}

// ==========================================================================
// GALERIA DE FOTOS (DINÂMICA EM BARALHOS)
// ==========================================================================
window.openGalleryCategory = function(prefix, count, title) {
    if(document.getElementById('gal-decks')) document.getElementById('gal-decks').style.display = 'none';
    if(document.getElementById('gal-main-title')) document.getElementById('gal-main-title').style.display = 'none';
    
    if(document.getElementById('gal-cat-title')) document.getElementById('gal-cat-title').innerText = title;
    
    const grid = document.getElementById('gal-grid');
    if(grid) {
        grid.innerHTML = ''; 
        for(let i = 1; i <= count; i++) {
            let card = document.createElement('div');
            card.className = 'exp-gal-card hover-target';
            card.style.backgroundImage = `url('${prefix}${i}.jpeg')`;
            card.style.animationDelay = `${i * 0.02}s`; 
            card.setAttribute('onerror', `this.style.backgroundImage="url('https://via.placeholder.com/600x400/111/D4AF37?text=${prefix}+${i}')"`);
            card.onclick = function() { openLb(this); };
            grid.appendChild(card);
        }
    }
    
    if(document.getElementById('gal-expanded')) document.getElementById('gal-expanded').classList.add('active');
    updateHoverTargets(); 
}

window.closeGalleryCategory = function() {
    if(document.getElementById('gal-expanded')) document.getElementById('gal-expanded').classList.remove('active');
    if(document.getElementById('gal-decks')) document.getElementById('gal-decks').style.display = 'flex';
    if(document.getElementById('gal-main-title')) document.getElementById('gal-main-title').style.display = 'block';
}

window.openLb = function(el) {
    let bgImage = el.style.backgroundImage;
    let url = bgImage.slice(4, -1).replace(/['"]/g, ""); 
    const lbImg = document.getElementById('lb-img');
    const lightbox = document.getElementById('lightbox');
    if(lbImg && lightbox) {
        lbImg.src = url;
        lightbox.classList.add('active');
    }
}
window.closeLb = function() { 
    if(document.getElementById('lightbox')) document.getElementById('lightbox').classList.remove('active'); 
}

// ==========================================================================
// LOJA VÍNICA (DETALHES DA GARRAFEIRA)
// ==========================================================================
window.flipWineCard = function(card) {
    document.querySelectorAll('.wine-flip-card').forEach(c => {
        if(c !== card) c.classList.remove('flipped');
    });
    card.classList.toggle('flipped');
}

window.openDetails = function(e, id) {
    if(e) e.stopPropagation(); 
    showWineDetail(id);
}

window.buyWine = function(e, id) {
    if(e) e.stopPropagation();
    if(wineDetails[id] && wineDetails[id].link) {
        window.open(wineDetails[id].link, '_blank');
    }
}

window.showWineDetail = function(id) {
    const w = wineDetails[id];
    if(!w) return;
    
    if(document.getElementById('wine-grid-view')) document.getElementById('wine-grid-view').style.display = 'none';
    if(document.getElementById('wd-type')) document.getElementById('wd-type').innerText = w.type;
    if(document.getElementById('wd-title')) document.getElementById('wd-title').innerText = w.name;
    if(document.getElementById('wd-desc')) document.getElementById('wd-desc').innerText = w.desc;
    if(document.getElementById('wd-price')) document.getElementById('wd-price').innerText = w.price;
    if(document.getElementById('wd-img')) document.getElementById('wd-img').src = w.img;
    
    if(document.getElementById('wine-detail-view')) document.getElementById('wine-detail-view').style.display = 'flex';
}

window.hideWineDetail = function() {
    if(document.getElementById('wine-detail-view')) document.getElementById('wine-detail-view').style.display = 'none';
    if(document.getElementById('wine-grid-view')) document.getElementById('wine-grid-view').style.display = 'grid';
}

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

    document.querySelectorAll('.review-card').forEach(card => card.classList.remove('show'));
    document.querySelectorAll('.r-temp').forEach(el=>el.remove());

    const targetCards = document.querySelectorAll('.r' + stars);
    const container = document.getElementById('reviews-container');
    if(targetCards.length > 0) { 
        targetCards.forEach(card => card.classList.add('show')); 
    } else if(container) { 
        container.innerHTML += `<p class="rev-text r-temp" style="text-align:center; color:#888;">Ainda não existem avaliações de ${stars} estrelas.</p>`;
    }
}

// ==========================================================================
// 6. ACADEMIA (LÓGICA JOGO DA VINDIMA - DINÂMICO)
// ==========================================================================
let colheitaScore = 0;
let lagarScore = 0;
let fermProgress = 0;
let tempPos = 10;
let timingPos = 0;
let timingDir = 1;

window.advanceVindima = function(stage) {
    clearGameIntervals();
    document.querySelectorAll('.vindima-stage').forEach(el => el.classList.remove('active'));
    const nxtStage = document.getElementById('vindima-' + stage);
    if(nxtStage) nxtStage.classList.add('active');
}

window.startColheita = function() {
    if(document.getElementById('btn-start-1')) document.getElementById('btn-start-1').style.display = 'none';
    colheitaScore = 0;
    let container = document.getElementById('vine-container');
    if(!container) return;
    container.innerHTML = '';
    
    let spawnGrape = setInterval(() => {
        let grape = document.createElement('span');
        grape.className = 'moving-grape hover-target';
        grape.innerText = '🍇';
        grape.style.left = (Math.random() * 80 + 10) + '%';
        grape.style.top = (Math.random() * 70 + 10) + '%';
        
        grape.onclick = function() {
            this.remove();
            colheitaScore++;
            if(document.getElementById('colheita-bar')) document.getElementById('colheita-bar').style.width = (colheitaScore * 20) + '%';
            if(colheitaScore >= 5) {
                clearGameIntervals();
                container.innerHTML = '<h3 style="color:#4CAF50; margin-top:80px; text-shadow: 0 2px 5px #000; font-family: Cinzel; font-size: 2rem;">Colheita Perfeita!</h3>';
                if(document.getElementById('btn-next-1')) document.getElementById('btn-next-1').style.display = 'inline-block';
            }
        };
        container.appendChild(grape);
        setTimeout(() => { if(container.contains(grape)) grape.remove(); }, 1200);
    }, 800);
    gameIntervals.push(spawnGrape);
}

window.clickLagar = function(e) {
    if(lagarScore >= 20) return;
    lagarScore++;
    if(document.getElementById('lagar-bar')) document.getElementById('lagar-bar').style.width = (lagarScore * 5) + '%';
    
    let splash = document.createElement('div');
    splash.className = 'splash-particle';
    splash.innerText = '💧';
    splash.style.left = e.offsetX + 'px';
    splash.style.top = e.offsetY + 'px';
    splash.style.setProperty('--sx', (Math.random() - 0.5) * 100);
    splash.style.setProperty('--sy', (Math.random() - 1) * 100);
    e.currentTarget.appendChild(splash);
    
    setTimeout(() => splash.remove(), 500);

    if(lagarScore >= 20) {
        if(document.getElementById('btn-next-2')) document.getElementById('btn-next-2').style.display = 'inline-block';
    }
}

window.startFermentation = function() {
    if(document.getElementById('btn-start-3')) document.getElementById('btn-start-3').style.display = 'none';
    if(document.getElementById('btn-cool')) document.getElementById('btn-cool').style.display = 'inline-block';
    tempPos = 10; fermProgress = 0;
    
    let fermInt = setInterval(() => {
        tempPos += 3; 
        if(tempPos > 100) tempPos = 100;
        if(document.getElementById('temp-pointer')) document.getElementById('temp-pointer').style.left = tempPos + '%';
        
        if(tempPos >= 40 && tempPos <= 60) {
            fermProgress += 4;
            if(document.getElementById('ferment-bar')) document.getElementById('ferment-bar').style.width = fermProgress + '%';
        } else if(tempPos > 80) {
            fermProgress -= 2; 
            if(fermProgress < 0) fermProgress = 0;
            if(document.getElementById('ferment-bar')) document.getElementById('ferment-bar').style.width = fermProgress + '%';
        }

        if(fermProgress >= 100) {
            clearGameIntervals();
            if(document.getElementById('btn-cool')) document.getElementById('btn-cool').style.display = 'none';
            if(document.getElementById('btn-next-3')) document.getElementById('btn-next-3').style.display = 'inline-block';
        }
    }, 150);
    gameIntervals.push(fermInt);
}

window.coolDown = function() {
    tempPos -= 15;
    if(tempPos < 0) tempPos = 0;
    if(document.getElementById('temp-pointer')) document.getElementById('temp-pointer').style.left = tempPos + '%';
}

window.startEstagio = function() {
    if(document.getElementById('btn-start-4')) document.getElementById('btn-start-4').style.display = 'none';
    if(document.getElementById('btn-stop-4')) document.getElementById('btn-stop-4').style.display = 'inline-block';
    timingPos = 0;
    
    let timeInt = setInterval(() => {
        timingPos += 3 * timingDir;
        if(timingPos >= 100 || timingPos <= 0) timingDir *= -1;
        if(document.getElementById('timing-cursor')) document.getElementById('timing-cursor').style.left = timingPos + '%';
    }, 30);
    gameIntervals.push(timeInt);
}

window.stopEstagio = function() {
    clearGameIntervals();
    if(timingPos >= 40 && timingPos <= 60) {
        if(document.getElementById('btn-stop-4')) document.getElementById('btn-stop-4').style.display = 'none';
        if(document.getElementById('btn-next-4')) document.getElementById('btn-next-4').style.display = 'inline-block';
    } else {
        alert('Falhou o momento perfeito (Tem de selar na área central delimitada). Tente novamente.');
        startEstagio();
    }
}

window.resetVindima = function() {
    clearGameIntervals();
    colheitaScore = 0;
    lagarScore = 0;
    fermProgress = 0;
    tempPos = 10;
    timingPos = 0;
    openSection('jogos'); 
}

// ==========================================================================
// 7. SOMMELIER IA (CÉREBRO DO SITE - 100% BLINDADO)
// ==========================================================================
const aiInterface = document.getElementById('ai-interface');
const aiMessage = document.getElementById('ai-message');

if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
}

const siteBrain = [
    { k: ['reserva', 'reservar', 'quarto', 'dormir', 'preço', 'alojamento', 'tarifa', 'estadia', 'noite', 'disponibilidade'], r: "Temos refúgios perfeitos para si: Refúgios para 2 a 4 pax (Branco, Rosé e Tinto) entre 150€ a 250€/noite, e as Casas Familiares Tawny e Ruby. Feche o assistente e abra a aba 'Reservas' para pedir a sua." },
    { k: ['vinho', 'loja', 'comprar', 'garrafa', 'rosé', 'branco', 'tinto', 'porto', 'compras', 'garrafeira', 'tawny', 'vintage'], r: "A nossa Garrafeira Haute Couture possui vinhos de excelência, do fresco Tavedo Rosé ao nosso icónico Quinta do Paraíso Vintage. Dirija-se à secção 'Loja Vínica' no menu principal." },
    { k: ['restaurante', 'comer', 'jantar', 'almoço', 'menu', 'prato', 'fome', 'gastronomia', 'alheira', 'bacalhau', 'bochecha', 'cabrito'], r: "O nosso restaurante oferece Gastronomia de Autor. Delicie-se com Bochecha de Porco Preto estufada ou Cabrito do Monte. Consulte a secção 'Restaurante' para ver a ementa completa." },
    { k: ['atividade', 'barco', 'jipe', 'spa', 'prova', 'massagem', 'piscina', 'tour', 'piquenique', 'passeio', 'adega', 'vinoterapia', 'experiência', 'roteiro'], r: "Temos experiências imersivas: Passeio de Barco Rabelo (45€), Jipe (40€), Spa de Vinoterapia (65€), Piquenique (35€) e visitas à Adega. Feche a IA e abra 'Atividades' para agendar." },
    { k: ['personalizar', 'exclusivo', 'à medida', 'casamento', 'evento', 'helicóptero', 'surpresa'], r: "Como seu Concierge, posso desenhar um roteiro à medida! Seja um pedido de casamento nas vinhas, um voo privado ou uma prova cega exclusiva. Envie-nos uma mensagem nos 'Contactos'." },
    { k: ['onde fica', 'localização', 'morada', 'contactos', 'falar', 'mensagem', 'mapa', 'telefone', 'email', 'coordenadas', 'foz', 'côa'], r: "A Quinta do Paraíso está localizada em Vila Nova de Foz Côa (Coordenadas: 41.136054, -7.303164). Fale connosco pelo email refugio@quintadoparaiso.pt ou +351 279 000 000." },
    { k: ['quem', 'história', 'dona', 'gerente', 'sobre', 'família', 'sara', 'reis', 'fundadora', 'origem'], r: "Somos um projeto familiar impulsionado pela paixão da nossa fundadora, Sara Reis. Transformámos a herança duriense num espaço de cultura e hospitalidade. Explore a nossa 'História'." },
    { k: ['jogo', 'vindima', 'academia', 'jogar', 'interativo', 'colheita', 'lagar', 'fermentação', 'estágio', 'barrica'], r: "Pronto para ser um Mestre do Douro? Na nossa 'Academia', pode jogar a Jornada da Vindima: desde a colheita manual até ao estágio em barrica. Abra a Academia e divirta-se!" },
    { k: ['testemunho', 'review', 'avaliação', 'opinião', 'estrelas', 'comentários', 'clientes', 'feedback'], r: "A excelência é a nossa assinatura. Leia os testemunhos de clientes de todo o mundo na nossa secção 'Testemunhos Editoriais'." },
    { k: ['galeria', 'fotos', 'imagens', 'ver', 'fotografia', 'exterior', 'interior', 'utensílios', 'baralhos'], r: "O nosso arquivo visual divide-se em baralhos interativos 3D. Selecione a aba 'Galeria' no carrossel para explorar coleções do Exterior, Interior e Arte & Ofício." },
    { k: ['curador', 'imprensa', 'linha', 'tempo', 'timeline', 'notícias', 'documentário', 'podcast'], r: "Explore a 'Coleção do Curador' através da aba lateral esquerda para ver as nossas menções na imprensa, documentários e a linha cronológica." },
    { k: ['mural', 'instagram', 'social', 'partilhar', 'visitantes', 'redes'], r: "Na secção 'Mural Social', encontra fotografias e memórias partilhadas pelos nossos visitantes. Aproveite e solicite a partilha da sua própria fotografia!" },
    { k: ['ola', 'olá', 'bom dia', 'boa tarde', 'boa noite', 'ajuda', 'hey'], r: "Olá! Sou a Orbe, o seu Concierge e Sommelier de Inteligência Artificial. Posso esclarecer dúvidas sobre reservas, recomendar-lhe pratos ou sugerir atividades. Como posso ajudar?" }
];

const siteDefaultResp = "Sou o guia digital da plataforma. Posso ajudá-lo a encontrar reservas, o menu do restaurante, a loja de vinhos ou detalhes sobre as atividades no nosso site.";

window.openAI = function() {
    if(aiInterface) {
        aiInterface.classList.add('active');
        if(aiMessage) aiMessage.innerText = '"Olá. Sou o guia digital da plataforma. O que procura ou gostaria de saber sobre o nosso refúgio?"';
    }
    if('speechSynthesis' in window) window.speechSynthesis.cancel();
}

window.closeAI = function() {
    if(aiInterface) aiInterface.classList.remove('active');
    if('speechSynthesis' in window) window.speechSynthesis.cancel(); 
}

window.askAI = function(q) {
    if(!q || q.trim() === '') return;
    if('speechSynthesis' in window) window.speechSynthesis.cancel(); 
    if(aiMessage) aiMessage.style.opacity = 0;
    
    setTimeout(() => {
        if(aiMessage) {
            aiMessage.style.color = "var(--accent-color)";
            aiMessage.innerHTML = "A pesquisar na plataforma...";
            aiMessage.style.opacity = 1;
        }
        
        setTimeout(() => {
            const pNormalizada = q.toLowerCase();
            let respostaEncontrada = siteDefaultResp;

            for (let i = 0; i < siteBrain.length; i++) {
                if (siteBrain[i].k.some(kw => pNormalizada.includes(kw))) {
                    respostaEncontrada = siteBrain[i].r;
                    break;
                }
            }

            if(aiMessage) aiMessage.style.opacity = 0;
            setTimeout(() => {
                if(aiMessage) {
                    aiMessage.style.color = "#fff";
                    aiMessage.innerHTML = `"${respostaEncontrada}"`;
                    aiMessage.style.opacity = 1;
                }
                
                const inputEl = document.getElementById('ai-input');
                if(inputEl) inputEl.value = '';
                
                if (aiInterface && aiInterface.classList.contains('active')) {
                    speakText(respostaEncontrada); 
                }
            }, 400);
        }, 1000);
    }, 300);
}

const inputAI = document.getElementById('ai-input');
if(inputAI) {
    inputAI.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            askAI(this.value);
        }
    });
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

updateHoverTargets();
