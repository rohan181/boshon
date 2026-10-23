'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function Navigation() {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState('');
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { if (search) input.current?.focus(); }, [search]);
  const close = () => {setMenu(false);setSearch(false);};
  return <header className="site-navigation" onKeyDown={event => {if(event.key === 'Escape') close();}}>
    <div className="nav-row">
      <a href="#story" className="nav-brand" aria-label="Boshon home" onClick={close}><Image src="/images/boshon-logo.jpg" alt="Boshon" width={52} height={52} priority /></a>
      <nav id="main-navigation" className={`nav-links ${menu ? 'is-open' : ''}`} aria-label="Main navigation">
        <a href="#story" onClick={close}>Home</a><a href="#collections" onClick={close}>Collections</a><a href="#selected" onClick={close}>Selected for you</a><a href="#shopping-info" onClick={close}>Contact & help</a>
      </nav>
      <div className="nav-actions"><button className="nav-search-toggle" aria-label={search ? 'Close product search' : 'Search products'} aria-expanded={search} aria-controls="product-search" onClick={() => {setSearch(!search);setMenu(false);}}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><span>Search</span></button><a className="nav-store" href="https://boshon.shop/">Shop ↗</a><button className="nav-menu-toggle" aria-expanded={menu} aria-controls="main-navigation" onClick={() => {setMenu(!menu);setSearch(false);}}>{menu ? 'Close −' : 'Menu +'}</button></div>
    </div>
    <div id="product-search" className="nav-search-panel" hidden={!search}>
      <form role="search" aria-label="Search Boshon products" action="https://boshon.shop/" method="get" onSubmit={event => {if(!query.trim()){event.preventDefault();input.current?.focus();}}}>
        <label htmlFor="nav-product-query">Find something you’ll love</label><div className="nav-search-field"><input ref={input} id="nav-product-query" name="s" type="search" required value={query} onChange={event => setQuery(event.target.value)} placeholder="Search sarees, kurtis, skirts…" autoComplete="off"/><input type="hidden" name="post_type" value="product"/><button type="submit">Search ↗</button></div>
      </form><button className="nav-search-close" onClick={() => setSearch(false)} aria-label="Close search">×</button>
    </div>
  </header>;
}
