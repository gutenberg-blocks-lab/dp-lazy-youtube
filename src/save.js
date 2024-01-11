import { extractYoutubeId, getPlaceholderImageUrl } from "./youtubeHelpers";
import PlayIcon from "./playIcon";

const Save = ({ attributes }) => {
    const { url, containerId } = attributes;
    const youtubeId = extractYoutubeId(url);
    const placeholderImageUrl = getPlaceholderImageUrl(youtubeId);

    return (
        <div id={containerId} className="lazy-youtube-player-container">
            {youtubeId && (
                <>
                    <button className="play-button" data-youtube-id={youtubeId}>
                        <PlayIcon />
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
