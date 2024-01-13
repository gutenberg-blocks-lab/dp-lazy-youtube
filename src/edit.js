// Edit.js

import { useState, useEffect } from "@wordpress/element";
import {
    TextControl,
    ToolbarGroup,
    ToolbarButton,
    SelectControl
} from "@wordpress/components";
import { BlockControls, useBlockProps } from "@wordpress/block-editor";
import { extractYoutubeId, getPlaceholderImageUrl } from "./youtubeHelpers";
import PlayContent from "./playContent";
import { qualityOptions, defaultQuality } from './qualitySettings';
import "./editor.scss";

const Edit = ({ attributes, setAttributes }) => {
    const { url, quality } = attributes;
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

    const handleQualityChange = (newQuality) => {
        setAttributes({ quality: newQuality });
    };

    const youtubeId = extractYoutubeId(url);

    const renderPreview = () => (
        <div className="youtube-preview">
            <PlayContent url={url} quality={quality} />
        </div>
    );

    const renderToolbar = () => (
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton
                    icon={isEditing ? "edit" : "visibility"}
                    label={isEditing ? "Edit URL" : "View Image"}
                    onClick={() => setIsEditing((current) => !current)}
                />
            </ToolbarGroup>
        </BlockControls>
    );

    const renderQualitySelector = () => (
        <SelectControl
            label="Image Quality"
            value={quality || defaultQuality}
            options={qualityOptions}
            onChange={handleQualityChange}
        />
    );

    return (
        <>
            {youtubeId && renderToolbar()}
            <div {...useBlockProps()}>
                {isEditing ? (
                    <div className="lazy-load-edit-wrapper">
                        <div className="lazy-load__title">
                            YouTube URL
                        </div>

                        <div className="lazy-load__title__instructions">
                            Paste a link to the content you want to display on
                            your site.
                        </div>

                        <TextControl
                            value={url || ""}
                            onChange={handleUrlChange}
                            placeholder="Enter YouTube URL"
                        />
                        {renderQualitySelector()}
                    </div>
                ) : youtubeId ? (
                    renderPreview()
                ) : null}
            </div>
        </>
    );
};

export default Edit;
