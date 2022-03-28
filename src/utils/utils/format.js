export function financial(x) {
    return "$ " + Number.parseFloat(x).toFixed(2);
}

export const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
});