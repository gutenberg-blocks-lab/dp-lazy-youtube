// youtubeHelpers.js

export const extractYoutubeId = (url) => {
    if (!url) return "";
    const regex =
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^\"&?\/ ]{11})/;
    return url.match(regex)?.[1] || "";
};

export const getPlaceholderImageUrl = (youtubeId, quality = 'maxresdefault') => {
    if (!youtubeId) return "";

    const validQualities = ['maxresdefault', 'sddefault', 'mqdefault', 'hqdefault', 'default'];
    if (!validQualities.includes(quality)) {
        quality = 'maxresdefault';
    }

    return `https://img.youtube.com/vi/${youtubeId}/${quality}.jpg`;
};
