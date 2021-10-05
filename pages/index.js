import { useEffect, useState } from 'react';
import netlifyAuth from '../netlifyAuth.js';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';

export default function Home() {
  let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated);
  let [user, setUser] = useState(null);

  let login = () => {
    netlifyAuth.authenticate((user) => {
      setLoggedIn(!!user);
      setUser(user);
      netlifyAuth.closeModal();
    });
  };

  let logout = () => {
    netlifyAuth.signout(() => {
      setLoggedIn(false);
      setUser(null);
    });
  };

  useEffect(() => {
    netlifyAuth.initialize((user) => {
      setLoggedIn(!!user);
    });
  }, [loggedIn]);
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        {loggedIn ? (
          <div>You are logged in!</div>
        ) : (
          <button onClick={login}>Log in here.</button>
        )}
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
      </main>

      <Footer />
    </div>
  );
}
