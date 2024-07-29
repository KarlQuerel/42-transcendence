// dashboard.js

export function renderDashboard() {
    return `
        <div id="dashboard">
            <h1>Welcome to the Dashboard</h1>
            <div id="chart_icon">Chart Icon</div>
            <div id="friends_icon">Friends Icon</div>
            <div id="trophee_icon">Trophee Icon</div>

            <div id="chartModal" class="modal"></div>
            <div id="avatarModal" class="modal"></div>
            <div id="badgeModal" class="modal">
                <div class="modal-body">
                    <img class="badge-icon" src="" alt="Badge">
                    <p></p>
                </div>
            </div>
            <div class="avatar-container"></div>
            <table>
                <thead id="tableHeaderRow"></thead>
                <tbody id="tableBody"></tbody>
            </table>
        </div>
    `;
}

export function initializeDashboard() {
    loadDashboardData();
    setupEventListeners();
    loadUserManagementData();
}

function setupEventListeners() {
    document.getElementById('chart_icon').addEventListener('click', function() {
        $('#chartModal').modal('show');
    });

    document.getElementById('friends_icon').addEventListener('click', function() {
        $('#avatarModal').modal('show');
    });

    document.getElementById('trophee_icon').addEventListener('click', function() {
        $('#badgeModal').modal('show');
    });
}

function loadDashboardData() {
    fetch('/dashboard/api/getData')
        .then(response => {
            if (!response.ok)
                throw new Error('Error : network response');
            return response.json();
        })
        .then(statsData => {
            console.log(statsData);
            ChartDoughnutData(statsData);
            GameHistoryTable(statsData);
            Badge(statsData);
        })
        .catch(error => console.error('Error : fetch statsData', error));
}

function loadUserManagementData() {
    fetch('/api/getData')
        .then(response => {
            if (!response.ok)
                throw new Error('Error : network response');
            return response.json();
        })
        .then(userData => {
            console.log(userData);
            Avatars(userData);
        })
        .catch(error => console.error('Error : fetch userData', error));
}

function Avatars(userData) {
    // Code for rendering avatars
}

function displayGameHistory(chosenOpponent) {
    // Code for displaying game history
}

function addGameHistory(chosenOpponent) {
    // Code for adding game history
}

function ChartDoughnutData(statsData) {
    // Code for rendering doughnut chart
}

function Badge(statsData) {
    // Code for handling badge display
}
