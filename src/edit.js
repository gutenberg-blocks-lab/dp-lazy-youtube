import { useState, useEffect } from "@wordpress/element";
import {
    TextControl,
    ToolbarGroup,
    ToolbarButton,
} from "@wordpress/components";
import { BlockControls, useBlockProps } from "@wordpress/block-editor";
import { extractYoutubeId, getPlaceholderImageUrl } from "./youtubeHelpers";
import PlayIcon from "./playIcon";
import "./editor.scss";

const Edit = ({ attributes, setAttributes }) => {
    const { url } = attributes;
    let { containerId } = attributes;
    const [isEditing, setIsEditing] = useState(!url);

    useEffect(() => {
        if (!containerId) {
            const newContainerId = `youtube-container-${Math.floor(
                Math.random() * 1000000
            )}`;
            setAttributes({ containerId: newContainerId });
        }
    }, [url, containerId]);

    const handleUrlChange = (newUrl) => {
        setAttributes({ url: newUrl });
    };

    const youtubeId = extractYoutubeId(url);
    const placeholderImageUrl = getPlaceholderImageUrl(youtubeId);

    const renderPreview = () => (
        <div className="youtube-preview">
            <PlayIcon />
            <img src={placeholderImageUrl} alt="YouTube Video Placeholder" />
        </div>
    );

    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon={isEditing ? "edit" : "visibility"}
                        label={isEditing ? "Edit URL" : "View Image"}
                        onClick={() => setIsEditing((current) => !current)}
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
                    renderPreview()
                ) : (
                    <div className="empty-block-message">
                        Video block is empty
                    </div>
                )}
            </div>
        </>
    );
};

export default Edit;
