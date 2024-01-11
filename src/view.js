document.addEventListener("DOMContentLoaded", () => {
    const playButtons = document.querySelectorAll(
        ".lazy-youtube-player-container .play-button"
    );

    playButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const youtubeId = this.getAttribute("data-youtube-id");
            const containerId = this.parentElement.id;
            loadYouTubeVideo(youtubeId, containerId);
        });
    });

    function loadYouTubeVideo(youtubeId, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = `
            <iframe 
                style="width: 100%; aspect-ratio: 16/9; position: relative; height: auto;"
                src="https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0" 
                frameborder="0" 
                allow="autoplay; encrypted-media" 
                allowfullscreen>
            </iframe>`;
    }
});

/* eslint-disable no-console */
console.log("Hello World! (from create-block-dp-lazy-youtube block)");
/* eslint-enable no-console */
