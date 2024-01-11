// youtubeHelpers.js

export const extractYoutubeId = (url) => {
    if (!url) return "";
    const regex =
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^\"&?\/ ]{11})/;
    return url.match(regex)?.[1] || "";
};

export const getPlaceholderImageUrl = (youtubeId) => {
    return youtubeId
        ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
        : "";
};
