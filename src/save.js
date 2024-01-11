import { extractYoutubeId, getPlaceholderImageUrl } from "./youtubeHelpers";
import PlayContent from "./playContent";

const Save = ({ attributes }) => {
    const { url, containerId } = attributes;
    const youtubeId = extractYoutubeId(url);
    const placeholderImageUrl = getPlaceholderImageUrl(youtubeId);

    return (
        <div id={containerId} className="lazy-youtube-player-container">
            {youtubeId && <PlayContent url={url} />}
        </div>
    );
};

export default Save;
