// Dailymotion doesn't always require a key for basic trending, 
// but it's better to get one for higher limits.
const grid = document.getElementById('video-grid');

async function fetchDailymotionTrends() {
    // This URL fetches the most visited videos globally
    const url = `https://api.dailymotion.com/videos?fields=id,title,thumbnail_720_url,url,created_time&list=what-to-watch&limit=12`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        renderDailymotion(data.list);
    } catch (err) {
        console.error("Dailymotion Fetch Error:", err);
        grid.innerHTML = `<p style="color:var(--parrot-green)">Connection to Dailymotion failed. Check your network.</p>`;
    }
}

function renderDailymotion(videos) {
    grid.innerHTML = '';
    videos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card';
        
        // SEO: Keep the Schema so Google still ranks you #1
        const schema = document.createElement('script');
        schema.type = 'application/ld+json';
        schema.text = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": video.title,
            "thumbnailUrl": video.thumbnail_720_url,
            "uploadDate": new Date(video.created_time * 1000).toISOString(),
            "contentUrl": video.url
        });
        document.head.appendChild(schema);

        card.innerHTML = `
            <img src="${video.thumbnail_720_url}" alt="${video.title} - Flawsk Play" loading="lazy">
            <div class="video-info">
                <h3>${video.title.substring(0, 60)}...</h3>
                <p>▶ REDIRECT TO DAILYMOTION</p>
            </div>
        `;

        card.onclick = () => window.open(video.url, '_blank');
        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', fetchDailymotionTrends);

