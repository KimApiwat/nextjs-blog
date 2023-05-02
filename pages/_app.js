// _app.js is a top level React component that wraps all Pages
// use this component to keep state when navigate between pages

// Import global css
import '../styles/globals.css'

import Layout from '../components/layout'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}