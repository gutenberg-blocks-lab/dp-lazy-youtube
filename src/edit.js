// Edit.js

import { useState, useEffect } from "@wordpress/element";
import { TextControl } from "@wordpress/components";
import { useBlockProps } from "@wordpress/block-editor";

const Edit = ({ attributes, setAttributes }) => {
    const { url } = attributes;
    const [youtubeId, setYoutubeId] = useState("");

    // Function to extract YouTube ID from the URL
    const extractYoutubeId = (url) => {
        const regex =
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^\"&?\/ ]{11})/;
        const matches = url.match(regex);
        return matches ? matches[1] : "";
    };

    // Effect to update the YouTube ID when the URL changes
    useEffect(() => {
        setYoutubeId(extractYoutubeId(url));
    }, [url]);

    // Function to handle URL input changes
    const handleUrlChange = (newUrl) => {
        setAttributes({ url: newUrl });
    };

    // URL for the YouTube thumbnail image
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
};

export default Edit;
