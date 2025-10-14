export const currencyFormat = (value, currencyCode = 'USD', locale = 'en-US') =>
  new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode }).format(value);

export const dateStr = (d, locale = 'en-GB') =>
  new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(d));


