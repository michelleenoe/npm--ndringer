const baseURL = process.env.NEXT_PUBLIC_API;
const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE;
const supabaseKey = process.env.NEXT_PUBLIC_KEY;

export const fetchAPI = async (endpoint, options = {}) => {
  const url = `${baseURL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const reserveSpot = (area, amount) =>
  fetchAPI("/reserve-spot", {
    method: "PUT",
    body: JSON.stringify({ area, amount }),
  });

export const fullfillReservation = (id) =>
  fetchAPI("/fullfill-reservation", {
    method: "POST",
    body: JSON.stringify({ id }),
  });

export const saveOrderToSupabase = async (orderData) => {
  const url = `${supabaseURL}/rest/v1/orders`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Network response was not ok: ${response.status} - ${errorText}`
    );
  }
  const responseText = await response.text();
  return responseText ? JSON.parse(responseText) : {};
};
