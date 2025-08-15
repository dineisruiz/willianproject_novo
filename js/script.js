const contatoForm = document.getElementById('contatoForm');
if (contatoForm) {
  contatoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;
    // Envia os dados para o backend Node.js
    fetch('http://localhost:3001/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, email, mensagem })
    })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        var msg = document.getElementById('contatoEmailEnviadoMsg');
        if (msg) msg.style.display = 'block';
      } else {
        alert('Erro ao enviar e-mail. Tente novamente.');
      }
    })
    .catch(() => {
      alert('Erro ao enviar e-mail. Tente novamente.');
    });
    e.target.reset();
    var msg = document.getElementById('contatoEmailEnviadoMsg');
    if (msg) msg.style.display = 'block';
  });
}

// Fecha o modal de confirmação
const fecharContatoModal = document.getElementById('fecharContatoModal');
if (fecharContatoModal) {
  fecharContatoModal.onclick = function() {
    document.getElementById('contatoModal').style.display = 'none';
  };
}

// Carrossel simples para depoimentos
const carousel = document.querySelector('.depoimentos-carousel');
const cards = document.querySelectorAll('.depoimento-card');
let current = 0;
let autoPlayInterval = null;

function showCard(index) {
  cards.forEach((card, i) => {
    card.classList.remove('active');
    card.style.display = 'none';
  });
  cards[index].classList.add('active');
  cards[index].style.display = 'block';
}

function nextCard() {
  cards[current].classList.remove('active');
  current = (current + 1) % cards.length;
  showCard(current);
}

function prevCard() {
  cards[current].classList.remove('active');
  current = (current - 1 + cards.length) % cards.length;
  showCard(current);
}

function startAutoPlay() {
  if (autoPlayInterval) clearInterval(autoPlayInterval);
  autoPlayInterval = setInterval(nextCard, 5000); // 5 segundos
}

function stopAutoPlay() {
  if (autoPlayInterval) clearInterval(autoPlayInterval);
}

// Cria botões de navegação
if (carousel && cards.length > 1) {
  const prevBtn = document.createElement('button');
  prevBtn.innerText = '<';
  prevBtn.className = 'carousel-btn prev-btn';
  prevBtn.onclick = () => { prevCard(); startAutoPlay(); };
  const nextBtn = document.createElement('button');
  nextBtn.innerText = '>';
  nextBtn.className = 'carousel-btn next-btn';
  nextBtn.onclick = () => { nextCard(); startAutoPlay(); };
  carousel.parentNode.insertBefore(prevBtn, carousel);
  carousel.parentNode.insertBefore(nextBtn, carousel.nextSibling);
  showCard(current);
  startAutoPlay();
  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);
}

// Menu responsivo para todas as páginas
const menuToggle = document.querySelector('.menu-toggle');
const mainMenu = document.querySelector('.main-menu');
if (menuToggle && mainMenu) {
  menuToggle.addEventListener('click', () => {
    mainMenu.classList.toggle('show');
  });
  // Fecha menu ao clicar em um link (mobile UX)
  mainMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainMenu.classList.remove('show');
    });
  });
}