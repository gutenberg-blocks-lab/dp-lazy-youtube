// Edit.js

import { useState } from "@wordpress/element";
import { TextControl } from "@wordpress/components";
import { useBlockProps } from "@wordpress/block-editor";

export default function Edit({ attributes, setAttributes }) {
    const { url } = attributes;
    const [youtubeId, setYoutubeId] = useState("");

    const extractYoutubeId = (url) => {
        const regex =
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^\"&?\/ ]{11})/;
        const matches = url.match(regex);
        return matches ? matches[1] : "";
    };

    const handleUrlChange = (url) => {
        setAttributes({ url });
        setYoutubeId(extractYoutubeId(url));
    };

    const placeholderImageUrl = youtubeId
        ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
        : "";

    return (
        <div {...useBlockProps()}>
            <TextControl
                label="YouTube URL"
                value={url || ""}
                onChange={handleUrlChange}
                placeholder="Enter YouTube URL"
            />
            {youtubeId && (
                <div className="youtube-preview">
                    <img
                        src={placeholderImageUrl}
                        alt="YouTube Video Placeholder"
                    />
                </div>
            )}
        </div>
    );
}
