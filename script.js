const API_KEY = 'YOUR_API_KEY_HERE'; // Get from Google Cloud Console
const grid = document.getElementById('video-grid');

async function fetchTrending() {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=12&key=${API_KEY}`);
        const data = await response.json();
        render(data.items);
    } catch (err) {
        grid.innerHTML = `<p style="color:red">API Error. Please verify your YouTube API Key.</p>`;
    }
}

function render(videos) {
    grid.innerHTML = '';
    videos.forEach(video => {
        const { id, snippet } = video;
        const card = document.createElement('div');
        card.className = 'video-card';
        
        // Dynamic SEO injection: Tells Google this is a Video Hub
        const schema = document.createElement('script');
        schema.type = 'application/ld+json';
        schema.text = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": snippet.title,
            "thumbnailUrl": snippet.thumbnails.high.url,
            "uploadDate": snippet.publishedAt,
            "contentUrl": `https://www.youtube.com/watch?v=${id}`
        });
        document.head.appendChild(schema);

        card.innerHTML = `
            <img src="${snippet.thumbnails.high.url}" alt="${snippet.title}" loading="lazy">
            <div class="video-info">
                <h3>${snippet.title}</h3>
                <p>▶ WATCH ON YOUTUBE</p>
            </div>
        `;

        card.onclick = () => window.open(`https://www.youtube.com/watch?v=${id}`, '_blank');
        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', fetchTrending);
