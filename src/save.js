const Save = ({ attributes }) => {
    const { url, containerId } = attributes;

    const extractYoutubeId = (url) => {
        if (!url) return "";
        const regex =
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^\"&?\/ ]{11})/;
        const matches = url.match(regex);
        return matches ? matches[1] : "";
    };

    const youtubeId = extractYoutubeId(url);
    const placeholderImageUrl = youtubeId
        ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
        : "";

    return (
        <div
            id={containerId} // This should reflect the containerId attribute
            className="lazy-youtube-player-container"
        >
            {youtubeId && (
                <>
                    <button className="play-button" data-youtube-id={youtubeId}>
                        {/* Put your play button SVG or icon here */}
                    </button>
                    <img
                        src={placeholderImageUrl}
                        alt="YouTube Video Placeholder"
                        className="youtube-placeholder-image"
                    />
                </>
            )}
        </div>
    );
};

export default Save;
