import Image from 'next/image';

export default function ShoppingInfo() {
  return <>
    <section className="shopping-info" id="shopping-info" aria-labelledby="shopping-title">
      <div className="shopping-heading"><p>BEFORE IT BECOMES YOURS</p><h2 id="shopping-title">A little help,<br /><em>along the way.</em></h2><span>From choosing a piece to placing your order.</span></div>
      <div className="shopping-details">
        <article><span className="shopping-number">01</span><div><h3>Across Bangladesh</h3><p>Cash on delivery is available across Bangladesh. Contact us for delivery details for your location.</p><a href="tel:+8801522134588">Ask about delivery ↗</a></div></article>
        <article><span className="shopping-number">02</span><div><h3>Find your fit</h3><p>Questions about a fabric, colour or size? Get in touch before you choose your piece.</p><a href="mailto:boshonbdltd@gmail.com?subject=Help%20choosing%20a%20Boshon%20piece">Talk to Boshon ↗</a></div></article>
        <article><span className="shopping-number">03</span><div><h3>A question about your order?</h3><p>For order updates or questions about exchanges, contact us with your order number.</p><a href="mailto:boshonbdltd@gmail.com?subject=Boshon%20order%20enquiry">Get order help ↗</a></div></article>
      </div>
    </section>
    <footer className="site-footer">
      <div className="footer-top"><div className="footer-brand"><Image src="/images/boshon-logo.jpg" alt="Boshon" width={72} height={72} /><p>Rooted in Bengal.<br /><em>Part of your everyday.</em></p></div><nav aria-label="Footer shopping links"><h3>Explore</h3><a href="#collections">The collections</a><a href="#selected">Selected for you</a><a href="https://boshon.shop/">Shop all pieces ↗</a></nav><div className="footer-contact"><h3>Let’s keep in touch</h3><a href="tel:+8801522134588">+880 1522-134588</a><a href="mailto:boshonbdltd@gmail.com">boshonbdltd@gmail.com</a><p>Wholesale & retail enquiries welcome.</p></div></div>
      <div className="footer-social" id="social"><div><p className="social-eyebrow">A LITTLE MORE BOSHON</p><h3>Stay close to the story.</h3><p>Colours, details, and everyday moments.</p></div><div className="social-demo"><span className="social-demo-label">SOCIAL PREVIEW · DEMO</span><div className="social-platforms">{['Instagram', 'Facebook', 'Pinterest'].map(platform => <span key={platform} className="social-placeholder" aria-label={`${platform} demo — profile link coming soon`}><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">{platform === 'Instagram' ? <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none"/></> : platform === 'Facebook' ? <path stroke="none" fill="currentColor" d="M14 22v-9h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.4A24 24 0 0 0 15 1c-3.1 0-5 1.9-5 5.4V9H7v4h3v9z"/> : <path fill="currentColor" stroke="none" d="M12 2a10 10 0 0 0-3.6 19.3c0-.8 0-1.8.2-2.7l1.3-5.4s-.3-.7-.3-1.7c0-1.6.9-2.8 2.1-2.8 1 0 1.4.7 1.4 1.6 0 1-.7 2.5-1 3.9-.3 1.2.6 2.1 1.8 2.1 2.1 0 3.7-2.2 3.7-5.4 0-2.8-2-4.7-4.8-4.7-3.3 0-5.2 2.5-5.2 5 0 1 .4 2.1.9 2.7l-.3 1.2c0 .2-.2.3-.4.2-1.5-.7-2.4-2.6-2.4-4.2 0-3.4 2.5-6.6 7.1-6.6 3.7 0 6.6 2.7 6.6 6.3 0 3.8-2.4 6.9-5.7 6.9-1.1 0-2.1-.6-2.5-1.2l-.7 2.6c-.2 1-.9 2-1.3 2.7A10 10 0 1 0 12 2z"/>}</svg><span className="social-platform-name">{platform}</span></span>)}</div><small>Profile links coming soon.</small></div></div>
      <div className="footer-base"><span>© {new Date().getFullYear()} Boshon</span><span>A story to live in.</span><a href="#story">Back to the beginning ↑</a></div>
    </footer>
  </>;
}
