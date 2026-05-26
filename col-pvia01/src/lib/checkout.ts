export const CHECKOUT_URL = "https://leandrostecca.com.br/r/check/col-tck02-2005";

export function goToCheckout() {
  // Propaga todos os params da URL atual (sck, cookiePageSlug, xcod, utm_*, pv, ck, ob)
  // pro Worker /r/check/, que então propaga pra URL Hotmart final via forwardParams.
  // Sem isso, sck_slug da venda chega bare → atribuição quebra no dashboard.
  const url = new URL(CHECKOUT_URL);
  const currentParams = new URLSearchParams(window.location.search);
  currentParams.forEach((value, key) => {
    if (!url.searchParams.has(key)) {
      url.searchParams.set(key, value);
    }
  });
  window.location.href = url.toString();
}

export function goToPricing() {
  document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
}
