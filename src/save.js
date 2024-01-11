const Save = ({ attributes }) => {
    const { url } = attributes;

    const extractYoutubeId = (url) => {
        const regex =
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^\"&?\/ ]{11})/;
        const matches = url.match(regex);
        return matches ? matches[1] : "";
    };

    const youtubeId = extractYoutubeId(url);
    const placeholderImageUrl = youtubeId
        ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
        : "";
    const random_number = Math.floor(100000 + Math.random() * 900000);

    return (
        <div
            id={`youtube-player-container-${random_number}`}
            className="lazy-youtube-player-container"
        >
            {youtubeId && (
                <>
                    <button
                        className="play-button"
                        id={`play-button-${random_number}`}
                        data-youtube-id={youtubeId}
                    >
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
