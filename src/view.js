document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", function (event) {
        if (
            event.target &&
            event.target.matches(".lazy-youtube-player-container .play-button")
        ) {
            const button = event.target;
            const youtubeId = button.getAttribute("data-youtube-id");
            const containerId = button.parentElement.id;
            loadYouTubeVideo(youtubeId, containerId);
        }
    });
});

function loadYouTubeVideo(youtubeId, containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <iframe 
                style="width: 100%; aspect-ratio: 16/9; position: relative; height: auto;"
                src="https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0" 
                frameborder="0" 
                allow="autoplay; encrypted-media" 
                allowfullscreen>
            </iframe>`;
    } else {
        console.error("Container not found for ID:", containerId);
    }
}