import { useState, useEffect } from "@wordpress/element";
import {
    TextControl,
    ToolbarGroup,
    ToolbarButton,
} from "@wordpress/components";
import { BlockControls, useBlockProps } from "@wordpress/block-editor";
import "./editor.scss";
import PlayIcon from "./playIcon";

const Edit = ({ attributes, setAttributes }) => {
    const { url } = attributes;
    let { containerId } = attributes;
    const [youtubeId, setYoutubeId] = useState("");
    const [isEditing, setIsEditing] = useState(!url);

    useEffect(() => {
        if (!containerId) {
            containerId = `youtube-container-${Math.floor(
                Math.random() * 1000000
            )}`;
            setAttributes({ containerId });
        }
        setYoutubeId(extractYoutubeId(url));
    }, [url, containerId, setAttributes]);

    const extractYoutubeId = (url) => {
        if (!url) return "";
        const regex =
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^\"&?\/\s]{11})/;
        const matches = url.match(regex);
        return matches ? matches[1] : "";
    };

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
                ) : youtubeId ? (
                    <div className="youtube-preview">
                        <PlayIcon />
                        <img
                            src={placeholderImageUrl}
                            alt="YouTube Video Placeholder"
                        />
                    </div>
                ) : (
                    <div className="empty-block-message">Video block is empty</div>
                )}
            </div>
        </>
    );
};

export default Edit;
