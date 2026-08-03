"use client";

import { FormEvent, useState } from "react";

const services = [
  ["01", "Signature signage", "Built-up letters, LED boards and storefront identities made to be noticed."],
  ["02", "Brand environments", "Thoughtful wayfinding, retail graphics and interiors that carry your brand through every detail."],
  ["03", "Design to install", "One accountable Delhi team—from concept and production to a precise, dependable installation."],
];

const projects = ["Retail Facade", "Restaurant Identity", "Corporate Wayfinding", "Event & Exhibition", "Illuminated Letters", "In-store Graphics"];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true); setStatus("");
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setStatus(result.message); form.reset();
    } catch (error) { setStatus(error instanceof Error ? error.message : "Something went wrong."); }
    finally { setSending(false); }
  };

  return <main>
    <header className="nav">
      <a className="brand" href="#home" aria-label="Apex Signworks home">APEX <span>SIGNWORKS</span></a>
      <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>Menu <i /></button>
      <nav className={menuOpen ? "open" : ""}>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#work" onClick={() => setMenuOpen(false)}>Projects</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
      </nav>
    </header>

    <section className="hero" id="home">
      <div className="hero-copy"><p className="eyebrow">Delhi · Signage & Branding</p><h1>Make your<br /><em>presence</em> felt.</h1><p className="intro">Apex Signworks creates memorable physical brand experiences for businesses ready to stand out.</p><a className="button" href="#contact">Start a project <span>↘</span></a></div>
      <div className="hero-art" aria-label="Abstract illuminated sign artwork"><div className="orb" /><div className="sign-shape"><span>A</span><span>S</span></div><p>DESIGNED<br />TO BE SEEN</p></div>
      <div className="scroll">SCROLL TO EXPLORE <b>↓</b></div>
    </section>

    <section className="about section" id="about">
      <p className="eyebrow">01 — About the studio</p><div className="about-grid"><h2>A clear vision.<br /><em>Beautifully built.</em></h2><div><p className="large-copy">I’m Arshi Javed, a Delhi-based signage and graphic professional who believes a great sign should do more than look good—it should make your business unforgettable.</p><p>With a hands-on approach from first sketch to final installation, I create customised, practical and cost-conscious signage solutions. Every project comes with honest communication, thoughtful design and an eye for the details that help your brand get noticed.</p><p className="signature">Arshi Javed <span>Founder, Apex Signworks</span></p></div></div>
      <div className="stats"><div><strong>100%</strong><span>transparent process</span></div><div><strong>End-to-end</strong><span>design & installation</span></div><div><strong>PAN India</strong><span>SERVICES</span></div></div>
    </section>

    <section className="services section"><p className="eyebrow">02 — What we do</p><div className="service-list">{services.map(([number,title,text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><b>↗</b></article>)}</div></section>

    <section className="work section" id="work"><div className="section-heading"><div><p className="eyebrow">03 — Selected work</p><h2>Built for a<br /><em>double take.</em></h2></div><p>Our project gallery is being prepared. A selection of our latest work will appear here soon.</p></div><div className="project-grid">{projects.map((project, index) => <article className={`project p${index + 1}`} key={project}><div><span>0{index + 1}</span><h3>{project}</h3><p>Project images coming soon</p></div><b>↗</b></article>)}</div></section>

    <section className="contact section" id="contact"><div className="contact-top"><div><p className="eyebrow">04 — Let’s create</p><h2>Have a space<br />to <em>transform?</em></h2></div><p>Tell us what you have in mind. We’ll get back to you with a clear next step.</p></div><div className="contact-grid"><form onSubmit={submit}><label>Your name<input required name="name" placeholder="Name" /></label><label>Phone number<input required name="phone" type="tel" placeholder="+91" /></label><label>Email address<input name="email" type="email" placeholder="you@company.com" /></label><label>What do you need?<select name="projectType" defaultValue=""><option value="" disabled>Select a service</option><option>Signage</option><option>Branding & graphics</option><option>Wayfinding</option><option>Something else</option></select></label><label className="message">Tell us a little about it<textarea required name="message" placeholder="Project, location, timeline..." /></label><button className="button" disabled={sending}>{sending ? "Sending…" : "Send enquiry"} <span>↗</span></button>{status && <p className="form-status" role="status">{status}</p>}</form><aside><p>Prefer to talk?</p><a href="tel:+919999999999">+91 99999 99999</a><a href="mailto:hello@apexsignworks.in">hello@apexsignworks.in</a><a className="instagram" href="https://instagram.com" target="_blank" rel="noreferrer">Instagram <span>↗</span></a></aside></div></section>
    <footer><a className="brand" href="#home">APEX <span>SIGNWORKS</span></a><p>© {new Date().getFullYear()} Apex Signworks · Delhi</p><a href="#home">Back to top ↑</a></footer>
  </main>;
}
