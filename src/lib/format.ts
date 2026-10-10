const priceFormat = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
});

export const formatPrice = (price: number) => priceFormat.format(price);
