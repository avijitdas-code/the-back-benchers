// pages/_app.jsx
import '../app/globals.css'; // Points correctly to your app folder

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;