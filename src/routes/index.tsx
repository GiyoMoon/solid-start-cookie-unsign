import { createCookieSessionStorage } from 'solid-start';
import { createServerAction$ } from 'solid-start/server';

const cookieStorage = createCookieSessionStorage({
  cookie: {
    name: 'cookie',
    secure: false,
    sameSite: true,
    secrets: ['very_secure_secret'],
    path: '/',
    maxAge: 60 * 60 * 1,
    httpOnly: true,
  },
})

export default function Home() {
  const [_, act] = createServerAction$(async (_, { request }) => {
    const cookieSession = await cookieStorage.getSession(
      request.headers.get('Cookie'),
    )
    // Try accessing the cookie
    console.log(cookieSession.get('any_value'))
  });

  return (
    <main>
      <p>Solid Start cookie unsign bug</p>
      <p>Steps:</p>
      <ol>
        <li>Manually set the cookie on the client side (in your browser inspect for example). Set the name to "cookie" and the value to a special character like "%" or "&"</li>
        <li>Click the "Get cookie" button and watch solid start explode</li>
        <li>If the cookie doesn't include a special character, it works just fine and you should see undefined printed in the server console because the cookie isn't signed properly (expected behaviour)</li>
      </ol>
      <button onClick={() => act()}>Get cookie</button>
    </main>
  );
}
