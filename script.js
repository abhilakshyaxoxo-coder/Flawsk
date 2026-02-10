// Sample trending video IDs - You can replace these with a fetch call to an API later
const trendingVideos = [
    { id: 'dQw4w9WgXcQ', title: 'Viral Music Video - 2026' },
    { id: '9bZkp7q19f0', title: 'Top Gaming Moments This Week' },
    { id: 'aqz-KE-bpKQ', title: 'New Tech Innovations Explained' },
    { id: 'L_jWHffIx5E', title: 'World Record Speedrun' },
    { id: 'M7lc1UVf-VE', title: 'Nature in 8K Ultra HD' },
    { id: 'jNQXAC9IVRw', title: 'Me at the Zoo (Remastered)' }
];

const videoGrid = document.getElementById('video-grid');

function loadVideos() {
    trendingVideos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card';
        
        // Use high-res thumbnail URL
        const thumbUrl = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;
        const youtubeUrl = `https://www.youtube.com/watch?v=${video.id}`;

        card.innerHTML = `
            <div class="thumbnail-container">
                <img src="${thumbUrl}" alt="${video.title}" onerror="this.src='https://img.youtube.com/vi/${video.id}/hqdefault.jpg'">
                <div class="play-overlay">
                    <div class="play-icon">▶</div>
                </div>
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
                <p style="color: #888; font-size: 0.8rem;">Click to watch on YouTube</p>
            </div>
        `;

        // Redirect on click
        card.addEventListener('click', () => {
            window.open(youtubeUrl, '_blank');
        });

        videoGrid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', loadVideos);
