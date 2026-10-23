'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const categories = [
  { name: 'Sarees', slug: 'saree', line: 'A familiar drape. A feeling all your own.', poster: '/images/category-saree.jpg', film: '/videos/category-saree.mp4' },
  { name: 'Kurtis', slug: 'kurti', line: 'Colour and comfort, wherever the day leads.', poster: '/images/category-kurti.jpg', film: '/videos/category-kurti.mp4' },
  { name: 'Skirts', slug: 'skirt', line: 'A little movement. A little freedom.', poster: '/images/category-skirt.webp', film: null },
];

export default function Categories() {
  const root = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const clips = useRef<(HTMLVideoElement | null)[]>([]);
  const [playing, setPlaying] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [skirtDetail, setSkirtDetail] = useState(false);

  useEffect(() => {
    if (skirtDetail) dialog.current?.showModal();
    else dialog.current?.close();
  }, [skirtDetail]);

  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const preference = () => setReduced(motion.matches);
    preference(); motion.addEventListener('change', preference);
    const ratios = new Map<number, number>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => ratios.set(Number((entry.target as HTMLElement).dataset.category), entry.intersectionRatio));
      const visible = [...ratios.entries()].filter(([index, ratio]) => index < 2 && ratio > .3).sort((a,b) => b[1] - a[1]);
      setPlaying(visible[0]?.[0] ?? null);
    }, { threshold: [0, .2, .3, .5, .75, 1] });
    root.current?.querySelectorAll('[data-category]').forEach(card => observer.observe(card));
    return () => { observer.disconnect(); motion.removeEventListener('change', preference); };
  }, []);

  useEffect(() => { setPaused(false); }, [playing]);

  useEffect(() => {
    const sync = () => clips.current.forEach((clip,index) => {
      if (!clip) return;
      if (index === playing && !paused && !reduced && !document.hidden) { clip.muted = true; void clip.play().catch(() => {}); }
      else clip.pause();
    });
    sync(); document.addEventListener('visibilitychange', sync);
    return () => { document.removeEventListener('visibilitychange', sync); clips.current.forEach(clip => clip?.pause()); };
  }, [playing, paused, reduced]);

  return <section ref={root} className="categories" id="collections" aria-labelledby="categories-title">
    <div className="categories-heading"><div><p className="category-eyebrow">FROM OUR STORY TO YOUR WARDROBE</p><h2 id="categories-title">Find your <em>Boshon.</em></h2></div><p>A drape, a colour, a new favourite.<br />Start with what feels like you.</p></div>
    <div className="category-grid">{categories.map((item,index) => <article className="category-card" data-category={index} key={item.slug} onMouseEnter={() => {setPlaying(item.film ? index : null); setPaused(false);}} onFocus={() => {setPlaying(item.film ? index : null);}}>
      <div className="category-media">
        <a href={`https://boshon.shop/?s=${item.slug}&post_type=product`} aria-label={`Shop ${item.name}`} className="category-image-link">
          <Image src={item.poster} alt={item.name === 'Skirts' ? 'Blue skirt with a colourful border, worn beside a blue bus' : `Explore the Boshon ${item.name.toLowerCase()} collection`} fill sizes="(max-width: 700px) 90vw, 30vw" />
          {item.film && <video ref={element => {clips.current[index] = element;}} src={item.film} poster={item.poster} autoPlay={playing === index && !paused && !reduced} muted loop playsInline preload="metadata" aria-hidden="true" style={{opacity:playing === index && !reduced ? 1 : 0}} />}
        </a>
        <span className="category-index">0{index + 1}</span>
        {item.film && !reduced && <button className="category-play" onClick={() => { if (playing === index) setPaused(!paused); else {setPlaying(index);setPaused(false);} }} aria-label={`${playing === index && !paused ? 'Pause' : 'Play'} ${item.name.toLowerCase()} video`}>{playing === index && !paused ? 'Pause Ⅱ' : 'Play film ▷'}</button>}
        {index === 2 && <button className="skirt-thumbnail" onClick={() => setSkirtDetail(true)} aria-label="View second skirt photo"><Image src="/images/skirt-detail.webp" alt="Blue skirt shown in a courtyard" width={60} height={90} /><span>Another look ↗</span></button>}
      </div>
      <a className="category-title" href={`https://boshon.shop/?s=${item.slug}&post_type=product`}><h3>{item.name}</h3><span>Shop {item.name.toLowerCase()} ↗</span></a><p className="category-description">{item.line}</p>
    </article>)}</div>
    <div className="category-end"><span>Rooted in Bengal. Worn your way.</span><a href="https://boshon.shop/">Explore the whole collection ↗</a></div>
    <dialog ref={dialog} className="skirt-dialog" aria-label="Second skirt photo" onCancel={() => setSkirtDetail(false)} onClose={() => setSkirtDetail(false)}><button autoFocus onClick={() => setSkirtDetail(false)}>Close ×</button><Image src="/images/skirt-detail.webp" alt="Full view of the blue skirt in a courtyard" width={150} height={225} /><p>A second look at the skirt.</p></dialog>
  </section>;
}
