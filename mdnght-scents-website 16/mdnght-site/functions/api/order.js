const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyeN6GhWI7GM5aJ2GUDG4qv6jPWiEg6FQo-NH48VrusGO2QRMPqX3kNARIGmzPhuXnZSw/exec';

export async function onRequestPost({ request }) {
  try {
    const order = await request.json();

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
      redirect: 'follow',
    });

    const result = await response.json();

    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Unable to submit order. Please try again.',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
