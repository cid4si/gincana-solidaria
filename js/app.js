// ================================================
// GINCANA SOLIDÁRIA CURITIBA - 
// ================================================

// DADOS SIMULADOS
const userData = {
    name: "Visitante",
    neighborhood: "Centro Cívico",
    points: 50,  // CADASTRO LIBERA 50 PONTOS + MEDALHA 5
    rank: "Doador Novato",
    badges: [5],  // MEDALHA 5 LIBERADA NO CADASTRO
    donations: 1  // Contador de doações
};

const pointsTable = {
    food: 10,
    clothes: 15,
    school: 20,
    furniture: 50,
    volunteer: 30
};

// SISTEMA DE MEDALHAS (1=MAIS VALIOSA, 5=MENOS VALIOSA)
const medalhasConquistas = [
    { id: 1, name: "Lenda da Solidariedade", icon: "🏆", pointsRequired: 7000, desc: "Maior conquista - 7.000+ pts" },
    { id: 2, name: "Herói Eterno", icon: "⭐", pointsRequired: 5000, desc: "5.000 pontos de impacto" },
    { id: 3, name: "Guardião Dourado", icon: "👑", pointsRequired: 3000, desc: "3.000 pontos de ouro" },
    { id: 4, name: "Mestre das Doações", icon: "⚡", pointsRequired: 1000, desc: "1.000 pontos relâmpago" },
    { id: 5, name: "Primeira Vitória", icon: "🎉", pointsRequired: 0, desc: "Bem-vindo à gincana!" }
];

const rankLevels = [
    { name: "Doador Novato", minPoints: 0 },
    { name: "Guardião Local", minPoints: 500 },
    { name: "Herói do Bairro", minPoints: 2000 },
    { name: "Mestre Solidário", minPoints: 5000 },
    { name: "Ranger Solidário", minPoints: 10000 }
];

const missions = [
    { id: 1, title: "Doe 3 roupas", points: 45, difficulty: "Fácil" },
    { id: 2, title: "5kg alimentos + foto #GincanaCuritiba", points: 75, difficulty: "Médio" },
    { id: 3, title: "Recrute 3 amigos (móvel grande)", points: 150, difficulty: "Difícil" },
    { id: 4, title: "Voluntarie 2 horas esta semana", points: 60, difficulty: "Médio" }
];

// RANKINGS DINÂMICOS (USUÁRIO APARECE!)
let rankings = {
    weekly: [
        { name: "Maria Silva", neighborhood: "Boqueirão", points: 450 },
        { name: "João Santos", neighborhood: "Centro", points: 380 },
        { name: "Ana Costa", neighborhood: "Parolin", points: 320 },
        { name: "Pedro Oliveira", neighborhood: "Água Verde", points: 290 },
        { name: "Lucas Ferreira", neighborhood: "Cristo Rei", points: 250 }
    ],
    monthly: [
        { name: "Ana Costa", neighborhood: "Parolin", points: 1850 },
        { name: "Maria Silva", neighborhood: "Boqueirão", points: 1620 },
        { name: "Carlos Mendes", neighborhood: "Centro", points: 1450 },
        { name: "João Santos", neighborhood: "Centro", points: 1380 },
        { name: "Juliana Lima", neighborhood: "Água Verde", points: 1200 }
    ],
    overall: [
        { name: "Carlos Mendes", neighborhood: "Centro", points: 5420 },
        { name: "Ana Costa", neighborhood: "Parolin", points: 4850 },
        { name: "Maria Silva", neighborhood: "Boqueirão", points: 3920 },
        { name: "Juliana Lima", neighborhood: "Água Verde", points: 3650 },
        { name: "Pedro Oliveira", neighborhood: "Água Verde", points: 2890 }
    ]
};

// ================================================
// FUNÇÕES DE NAVEGAÇÃO
// ================================================
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    document.getElementById(pageId).classList.remove('hidden');
    
    if (pageId === 'rankings') loadRankings();
    if (pageId === 'medalhas') loadMedalhas();  // CORRIGIDO
    if (pageId === 'missions') loadMissions();
    if (pageId === 'profile') loadProfile();
}

function showTab(event, tabId) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    event.currentTarget.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// ================================================
// CARREGAR CONTEÚDO
// ================================================
function loadRankings() {
    ['weekly', 'monthly', 'overall'].forEach(period => {
        const tbody = document.getElementById(`${period}Ranking`);
        if (tbody) {
            // INSERE USUÁRIO NO RANKING POR PONTOS
            const userRankingEntry = { 
                name: userData.name, 
                neighborhood: userData.neighborhood, 
                points: userData.points 
            };
            
            let periodRanking = [...rankings[period], userRankingEntry];
            periodRanking.sort((a, b) => b.points - a.points);
            periodRanking = periodRanking.slice(0, 10); // Top 10
            
            tbody.innerHTML = periodRanking.map((user, index) => {
                const medals = ['🥇', '🥈', '🥉'];
                const medal = index < 3 ? medals[index] : `${index + 1}º`;
                const isCurrentUser = user.name === userData.name;
                return `
                    <tr ${isCurrentUser ? 'style="background: rgba(23, 249, 255, 0.2);"' : ''}>
                        <td class="medal-position">${medal}</td>
                        <td>${user.name}</td>
                        <td>${user.neighborhood}</td>
                        <td>${user.points} pts</td>
                    </tr>
                `;
            }).join('');
        }
    });
}

function loadMedalhas() {
    const grid = document.getElementById('badgesGrid');
    if (grid) {
        grid.innerHTML = medalhasConquistas.map(medalha => {
            const unlocked = userData.badges.includes(medalha.id);
            return `
                <div class="badge ${unlocked ? 'unlocked' : ''}">
                    <div class="badge-icon">${medalha.icon}</div>
                    <div class="badge-name">${medalha.name}</div>
                    <div class="badge-desc">${medalha.desc}</div>
                    <div class="badge-pts">${unlocked ? '✅ CONQUISTADA!' : `${medalha.pointsRequired} pts`}</div>
                </div>
            `;
        }).join('');
    }
}

function loadMissions() {
    const list = document.getElementById('missionsList');
    if (list) {
        list.innerHTML = missions.map(mission => `
            <div class="mission-card">
                <div class="mission-info">
                    <h3>${mission.title}</h3>
                    <p>Dificuldade: ${mission.difficulty}</p>
                </div>
                <div class="mission-points">${mission.points} pts</div>
            </div>
        `).join('');
    }
}

function loadProfile() {
    const nameEl = document.getElementById('userName');
    if (nameEl) nameEl.textContent = userData.name;
    
    const rankEl = document.getElementById('userRank');
    if (rankEl) rankEl.textContent = userData.rank;
    
    const neighborhoodEl = document.getElementById('userNeighborhood');
    if (neighborhoodEl) neighborhoodEl.textContent = userData.neighborhood;
    
    const pointsEl = document.getElementById('userPoints');
    if (pointsEl) pointsEl.textContent = userData.points;
    
    // Barra de progresso
    const nextRank = rankLevels.find(r => r.minPoints > userData.points);
    const progressBar = document.getElementById('progressBar');
    if (nextRank && progressBar) {
        const progress = (userData.points / nextRank.minPoints) * 100;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
        progressBar.textContent = `${Math.round(progress)}%`;
    }
}

// ================================================
// SALVAR PERFIL
// ================================================
function saveProfile() {
    userData.name = document.getElementById('profileName').value || 'Visitante';
    userData.neighborhood = document.getElementById('profileNeighborhood').value || 'Centro Cívico';
    loadProfile();
    alert('Perfil salvo! Você agora aparece nos rankings!');
}

// ================================================
// REGISTRAR DOAÇÃO
// ================================================
function registerDonation() {
    const typeSelect = document.getElementById('donationType');
    const amountInput = document.getElementById('donationAmount');
    const resultDiv = document.getElementById('donationResult');
    
    if (!typeSelect || !amountInput || !resultDiv) return;
    
    const type = typeSelect.value;
    const amount = parseInt(amountInput.value);
    
    if (!amount || amount <= 0) {
        alert('Quantidade inválida!');
        return;
    }
    
    const pointsPerUnit = pointsTable[type] || 0;
    const earnedPoints = pointsPerUnit * amount;
    
    // ADICIONA PONTOS
    userData.points += earnedPoints;
    userData.donations += 1;
    
    // ATUALIZA RANK
    for (let i = rankLevels.length - 1; i >= 0; i--) {
        if (userData.points >= rankLevels[i].minPoints) {
            userData.rank = rankLevels[i].name;
            break;
        }
    }
    
    // VERIFICA E LIBERA NOVAS MEDALHAS
    checkNewMedals(earnedPoints);
    
    // FEEDBACK
    resultDiv.style.border = '1px solid #17F9FF';
    resultDiv.style.color = '#17F9FF';
    resultDiv.innerHTML = `
        <strong>SUCESSO!</strong><br>
        +${earnedPoints} PONTOS<br>
        <strong>TOTAL: ${userData.points} PTS</strong><br>
        ${userData.badges.length > 1 ? `🎉 Nova medalha conquistada!` : ''}
    `;
    
    loadProfile();
    amountInput.value = 1;
    
    setTimeout(() => {
        resultDiv.innerHTML = '';
        resultDiv.style.border = 'none';
    }, 5000);
}

// VERIFICA E LIBERA MEDALHAS
function checkNewMedals(earnedPoints) {
    let newMedals = 0;
    medalhasConquistas.forEach(medalha => {
        if (userData.points >= medalha.pointsRequired && !userData.badges.includes(medalha.id)) {
            userData.badges.push(medalha.id);
            newMedals++;
        }
    });
    
    if (newMedals > 0) {
        alert(`🎉 ${newMedals} NOVA(S) MEDALHA(S) CONQUISTADA(S)!\nMedalhas totais: ${userData.badges.length}/5`);
    }
}



// ================================================
// INICIALIZAÇÃO
// ================================================
window.onload = function() {
    loadProfile();
    showPage('home');
};
