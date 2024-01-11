// Edit.js

import { useState, useEffect } from "@wordpress/element";
import {
    TextControl,
    ToolbarGroup,
    ToolbarButton,
} from "@wordpress/components";
import { BlockControls, useBlockProps } from "@wordpress/block-editor";

const Edit = ({ attributes, setAttributes }) => {
    const { url } = attributes;
    const [youtubeId, setYoutubeId] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const extractYoutubeId = (url) => {
        const regex =
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^\"&?\/ ]{11})/;
        const matches = url.match(regex);
        return matches ? matches[1] : "";
    };

    useEffect(() => {
        setYoutubeId(extractYoutubeId(url));
    }, [url]);

    const handleUrlChange = (newUrl) => {
        setAttributes({ url: newUrl });
    };

    const placeholderImageUrl = youtubeId
        ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
        : "";

    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon={isEditing ? "edit" : "visibility"}
                        label={isEditing ? "Edit URL" : "View Image"}
                        onClick={() => setIsEditing(!isEditing)}
                    />
                </ToolbarGroup>
            </BlockControls>
            <div {...useBlockProps()}>
                {isEditing ? (
                    <TextControl
                        label="YouTube URL"
                        value={url || ""}
                        onChange={handleUrlChange}
                        placeholder="Enter YouTube URL"
                    />
                ) : (
                    youtubeId && (
                        <div className="youtube-preview">
                            <img
                                src={placeholderImageUrl}
                                alt="YouTube Video Placeholder"
                            />
                        </div>
                    )
                )}
            </div>
        </>
    );
};

export default Edit;
