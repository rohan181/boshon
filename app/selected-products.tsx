import Image from 'next/image';

// Storefront prices checked on 23 October 2026. Update alongside the live catalogue.
const products = [
  { name: 'Meroon Cotton Saree', category: 'SAREE / MAROON', price: 1429, image: 'maroon-saree', detail: 'maroon-detail', slug: 'meroon-cotton-saree-2', alt: 'Maroon and grey cotton saree with patterned borders' },
  { name: 'Off white Cotton Saree', category: 'SAREE / IVORY', price: 1851, image: 'white-saree', detail: 'flower-detail', slug: 'off-white-cotton-saree', alt: 'Off-white saree with yellow floral embroidery and tassels' },
  { name: 'Pink Cotton Saree', category: 'SAREE / PINK', price: 2587, image: 'pink-saree', detail: null, slug: 'pink-cotton-saree', alt: 'Bright pink cotton saree worn with an orange blouse' },
  { name: 'Burnt Orange Patchwork Cotton Kurti', category: 'KURTI / BURNT ORANGE', price: 999, image: 'orange-kurti', detail: null, slug: 'burnt-orange-patchwork-cotton-kurti-2', alt: 'Burnt orange cotton kurti with colourful patchwork trim' },
];

export default function SelectedProducts() {
  return <section className="selected-products" id="selected" aria-labelledby="selected-title">
    <div className="selected-heading"><div><p className="selected-eyebrow">A FEW PIECES TO BEGIN WITH</p><h2 id="selected-title">Selected <em>for you.</em></h2></div><div className="selected-intro"><p>Familiar colours. Thoughtful details.<br />Find a place for them in your everyday.</p><a href="https://boshon.shop/">Shop all pieces <span aria-hidden="true">↗</span></a></div></div>
    <div className="selected-grid">{products.map((product,index) => <article className="selected-card" key={product.slug}>
      <a href={`https://boshon.shop/product/${product.slug}/`} className="selected-photo" aria-label={`View ${product.name}`}>
        <Image src={`/images/${product.image}.webp`} alt={product.alt} fill sizes="(max-width: 540px) 88vw, (max-width: 1000px) 44vw, 22vw" className="selected-main-photo" />
        {product.detail && <Image src={`/images/${product.detail}.webp`} alt="" fill sizes="(max-width: 540px) 88vw, (max-width: 1000px) 44vw, 22vw" className="selected-detail-photo" />}
        <span className="selected-number" aria-hidden="true">0{index+1}</span><span className="selected-photo-arrow" aria-hidden="true">↗</span>
      </a>
      <p className="selected-category">{product.category}</p>
      <h3><a href={`https://boshon.shop/product/${product.slug}/`}>{product.name}</a></h3>
      <div className="selected-buy"><span className="selected-price">৳{product.price.toLocaleString('en-BD')}</span><a href={`https://boshon.shop/product/${product.slug}/`}>View product <span aria-hidden="true">↗</span></a></div>
    </article>)}</div>
    <div className="selected-note"><span>Choose your piece. Make it part of your story.</span><span>Current options and availability on each product page.</span></div>
  </section>;
}
