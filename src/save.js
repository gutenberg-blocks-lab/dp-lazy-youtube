import { extractYoutubeId, getPlaceholderImageUrl } from "./youtubeHelpers";
import PlayContent from "./playContent";

const Save = ({ attributes }) => {
    const { url, containerId, align } = attributes;
    const youtubeId = extractYoutubeId(url);

    // Construct the class name based on the alignment
    const className = `lazy-youtube-player-container ${
        align ? "align" + align : ""
    }`;

    return (
        <div id={containerId} className={className}>
            {youtubeId && <PlayContent url={url} />}
        </div>
    );
};

export default Save;

