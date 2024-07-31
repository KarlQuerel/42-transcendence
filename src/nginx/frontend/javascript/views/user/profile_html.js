export default function renderProfile()
{
	return `
    
    <div class="container">
        <div class="profile-header text-center">
            <h1>My Profile</h1>
        </div>

        <div class="section">
            <h2>User Information</h2>
            <div class="row">
                <div class="col-md-3 text-center">
                    <img src="avatar/default.png" alt="User Avatar" class="avatar img-fluid">
                    <p><strong>Status:</strong> <span class="status-online">Online</span></p>
                </div>
                <div class="col-md-9">
                </div>
            </div>
        </div>

        <div class="friends-list">
            <h2>Friends List</h2>
            <div class="row">
                <div class="col-md-6">
                    <ul class="list-group" id="friends-list-container">
                    </ul>
                </div>
            </div>
        </div>

        <!-- Stats Display Section -->
        <div class="stats-display-section">
            <h2>Stats Display</h2>
            <div class="stats-container"></div> <!-- Container for displayGeneralStats -->
        </div>

        <!-- Match History Section -->
        <div class="match-history-section">
            <h2>Match History</h2>
            <div class="match-history-container"></div> <!-- Container for displayMatchHistory -->
        </div>
    </div>
    `;
}