export function offerPercent(mrp, offer) {
    let off = Math.round(((mrp - offer) / mrp) * 100)
    return off;
}
