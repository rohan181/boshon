'use client';

import Image from 'next/image';
import Navigation from './navigation';
import Categories from './categories';
import SelectedProducts from './selected-products';
import ShoppingInfo from './shopping-info';
import { useEffect, useRef, useState } from 'react';

const scenes = [
  { name: 'Colour', kicker: '01 — A STORY IN EVERY FOLD', first: 'Earthy roots.', last: 'Vivid colour.', copy: 'A sweep of red. A pattern to linger over. Discover the colours and details that make a piece feel like yours.', image: 'harvest-red', alt: 'Film showing the red saree’s pattern and fabric in detail', position: 'center 50%' },
  { name: 'Home', kicker: '02 — WHERE THE STORY BEGINS', first: 'A little', last: 'closer to home.', copy: 'The deep red of a familiar saree. The quiet of an old courtyard. Colours that carry a sense of Bengal.', image: 'maroon-saree', detail: 'maroon-detail', alt: 'Burgundy and grey saree against an old wooden window', color: '#292622', position: 'center 40%' },
  { name: 'Everyday joy', kicker: '03 — EVERYDAY, WORTH REMEMBERING', first: 'A story', last: 'to live in.', copy: 'An unexpected laugh. A bright pink drape. An ordinary day that becomes a memory.', image: 'pink-saree', alt: 'A joyful moment in a vibrant pink saree on a blue tractor', color: '#172d2e', position: 'center 47%' },
  { name: 'Your story', kicker: '04 — TAKE IT FROM HERE', first: 'The rest', last: 'is yours.', copy: 'Out the door, into your day. Choose a piece that feels like you, and give it a story of its own.', image: 'orange-kurti', alt: 'Burnt orange patchwork kurti in a leafy garden', color: '#3c2922', position: 'center 42%' },
];
const lastScene = scenes.length - 1;
const videoScene = scenes.findIndex(scene => scene.image === 'harvest-red');
const clamp = (n: number) => Math.min(1, Math.max(0, n));
const ease = (n: number) => { const t = clamp(n); return t * t * (3 - 2 * t); };

export default function Home() {
  const track = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [videoPaused, setVideoPaused] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [position, setPosition] = useState(0);
  const [reduced, setReduced] = useState(false);
  const segment = Math.floor(position);
  const scenePosition = Math.min(lastScene, segment + ease((position - segment - .22) / .56));
  const active = Math.min(lastScene, Math.round(scenePosition));

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const preference = () => setReduced(media.matches);
    preference();
    let frame = 0;
    let target = 0;
    let current = 0;
    let lastTime = 0;
    const animate = (time: number) => {
      const elapsed = Math.min(64, time - (lastTime || time - 16));
      lastTime = time;
      current = media.matches ? target : current + (target - current) * (1 - Math.exp(-elapsed / 95));
      if (Math.abs(target - current) < .0002) current = target;
      setPosition(current);
      if (current !== target) frame = requestAnimationFrame(animate);
      else { frame = 0; lastTime = 0; }
    };
    let initialized = false;
    const queue = () => {
      const element = track.current;
      if (!element) return;
      const bounds = element.getBoundingClientRect();
      const stageHeight = stage.current?.getBoundingClientRect().height ?? window.innerHeight;
      target = clamp(-bounds.top / Math.max(1, bounds.height - stageHeight)) * lastScene;
      // Restore the current scene immediately; only ease subsequent scrolling.
      if (!initialized) { current = target; setPosition(current); initialized = true; }
      if (!frame) frame = requestAnimationFrame(animate);
    };
    queue();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    const observer = new ResizeObserver(queue);
    if (track.current) observer.observe(track.current);
    if (stage.current) observer.observe(stage.current);
    media.addEventListener('change', preference);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener('scroll', queue); window.removeEventListener('resize', queue); media.removeEventListener('change', preference); };
  }, []);

  useEffect(() => {
    // Each visit starts the film automatically, even after a manual pause.
    if (active !== videoScene) setVideoPaused(false);
  }, [active]);

  useEffect(() => {
    const clip = video.current;
    if (!clip) return;
    const syncPlayback = () => {
      if (active === videoScene && !reduced && !videoPaused && !document.hidden) {
        clip.muted = true;
        // Interrupted play requests are normal during chapter transitions.
        // Keep autoplay enabled so a later readiness/visibility event can retry.
        void clip.play().catch(() => {});
      } else clip.pause();
    };
    syncPlayback();
    document.addEventListener('visibilitychange', syncPlayback);
    clip.addEventListener('canplay', syncPlayback);
    return () => { clip.removeEventListener('canplay', syncPlayback); clip.pause(); document.removeEventListener('visibilitychange', syncPlayback); };
  }, [active, reduced, videoPaused]);

  function goTo(index: number) {
    if (!track.current) return;
    const top = window.scrollY + track.current.getBoundingClientRect().top;
    const distance = track.current.getBoundingClientRect().height - (stage.current?.getBoundingClientRect().height ?? window.innerHeight);
    window.scrollTo({ top: top + distance * index / lastScene, behavior: reduced ? 'instant' : 'smooth' });
  }

  return <><Navigation /><main ref={track} className="story-track" id="story">
    <div ref={stage} className="story-stage">
      <div className="visuals" aria-hidden="true">
        {scenes.map((scene, index) => {
          const reveal = index === 0 ? 1 : clamp(scenePosition - index + 1);
          return <div className="scene-photo" key={scene.image} style={{ zIndex: index, opacity: reduced ? Number(active === index) : reveal }}>
            <Image src={index === videoScene ? "/images/video-poster.jpg" : `/images/${scene.image}.webp`} alt="" fill priority={index === 0} loading="eager" sizes="(max-width: 760px) 100vw, 70vw" style={{ objectPosition: scene.position, transform: reduced ? 'none' : `scale(${1.015 + clamp(position - index + .5) * .025})` }} />
            {index === videoScene && <video ref={video} className="hero-video" src="/videos/boshon-fabric-loop.mp4" poster="/images/video-poster.jpg" autoPlay={active === videoScene && !reduced && !videoPaused} muted loop playsInline preload="auto" onError={() => setVideoFailed(true)} style={{ opacity: !videoFailed && !reduced ? 1 : 0 }} />}
          </div>;
        })}
      </div>
      <div className="shade" />

      <div className="edition"><span /> ROOTED IN BENGAL</div>
      <div className="story-copy">
        {scenes.map((scene, index) => {
          const opacity = reduced ? Number(active === index) : ease(clamp(1 - Math.abs(scenePosition - index) * 2));
          return <section className="scene-copy" key={scene.name} aria-hidden={active !== index} style={{ opacity, transform: reduced ? 'none' : `translateY(${Math.max(-1, Math.min(1, index - scenePosition)) * 18}px)` }}>
            <p className="eyebrow">{scene.kicker}</p>
            {index === 0 ? <h1>{scene.first}<br /><em>{scene.last}</em></h1> : <h2>{scene.first}<br /><em>{scene.last}</em></h2>}
            <p className="description">{scene.copy}</p>
          </section>;
        })}
      </div>
      <a className="collection-link" href="#collections">Find your Boshon<span aria-hidden="true">↗</span></a>
      {active === videoScene && !reduced && <button className="video-toggle" onClick={() => setVideoPaused(value => !value)} aria-label={videoPaused ? 'Play background video' : 'Pause background video'}>{videoPaused ? 'Play film ▷' : 'Pause film Ⅱ'}</button>}
      <footer className="story-controls">
        <button className="scroll-cue" onClick={() => active === lastScene ? document.getElementById('collections')?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' }) : goTo(active + 1)}><span className="scroll-icon" aria-hidden="true">{'↓'}</span><span>{active === lastScene ? 'EXPLORE THE COLLECTIONS' : 'SCROLL THROUGH THE STORY'}<small>{active === lastScene ? 'Find your next favourite' : 'From Bengal to your everyday'}</small></span></button>
        <nav className="chapter-nav" aria-label="Story chapters">{scenes.map((scene, index) => <button key={scene.name} onClick={() => goTo(index)} aria-current={active === index ? 'step' : undefined} aria-label={`Chapter ${index + 1}: ${scene.name}`}><span className="chapter-line"><i style={{ transform: `scaleX(${clamp(position - index + 1)})` }} /></span><span className="chapter-label"><b>0{index + 1}</b>{scene.name}</span></button>)}</nav>
        <span className="counter">0{active + 1}<span> / {String(scenes.length).padStart(2, '0')}</span></span>
      </footer>
      <p className="sr-only" aria-live="polite">Chapter {active + 1}: {scenes[active].name}. {scenes[active].alt}</p>
    </div>
  </main><Categories /><SelectedProducts /><ShoppingInfo /></>;
}

