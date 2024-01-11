export function stringToColor(text: string) {
    let str = text;
    let hash = 0;
    for (let i = 0; i < str.length / 2; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const r = Math.floor(200 + ((Math.abs(Math.sin(hash + 0)) * 56) % 56));
    const g = Math.floor(200 + ((Math.abs(Math.sin(hash + 1)) * 56) % 56));
    const b = Math.floor(200 + ((Math.abs(Math.sin(hash + 2)) * 56) % 56));

    // modulo function on str.length to choose between aa, bb, cc, dd
    const append = ["88", "aa", "66", "99"][str.length % 4];
    return `#${toTwoDigits(r)}${toTwoDigits(g)}${toTwoDigits(b)}${append}`;
}

function toTwoDigits(value: number) {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
}

export const aspectRatio = 7 / 2;
