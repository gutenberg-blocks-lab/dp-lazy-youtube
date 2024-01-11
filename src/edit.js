import { useState, useEffect } from "@wordpress/element";
import {
    TextControl,
    ToolbarGroup,
    ToolbarButton,
} from "@wordpress/components";
import { BlockControls, useBlockProps } from "@wordpress/block-editor";
import "./editor.scss";

const Edit = ({ attributes, setAttributes }) => {
    const { url } = attributes;
    let { containerId } = attributes; // Add this line
    const [youtubeId, setYoutubeId] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!containerId) {
            containerId = `youtube-container-${Math.floor(
                Math.random() * 1000000
            )}`;
            setAttributes({ containerId }); // Ensure containerId is set
        }
        setYoutubeId(extractYoutubeId(url));
    }, [url, containerId, setAttributes]); // Add containerId dependency

   const extractYoutubeId = (url) => {
       if (!url) return "";

       // Regular expression for extracting the video ID from YouTube URLs
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
