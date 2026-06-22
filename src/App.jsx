import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { content, termLines } from "./content.js";
import { Blog } from "./Blog.jsx";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function Reveal({ children, delay = 0, ...rest }) {
  const reduce = useReducedMotion();
  if (reduce) return <div {...rest}>{children}</div>;
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Firma: agent log animado ---------- */
function AgentLog() {
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ li: 0, ci: 0 });
  const flat = useMemo(() => termLines.map((l) => l.map((s) => s.t).join("")), []);
  const done = pos.li >= termLines.length;

  useEffect(() => {
    if (reduce || done) return;
    const target = flat[pos.li] ?? "";
    const delay =
      pos.li === 0 && pos.ci === 0 ? 600 : pos.ci < target.length ? 24 : 420;
    const timer = setTimeout(() => {
      setPos((p) => {
        const tg = flat[p.li] ?? "";
        if (p.ci < tg.length) return { li: p.li, ci: Math.min(p.ci + 2, tg.length) };
        return { li: p.li + 1, ci: 0 };
      });
    }, delay);
    return () => clearTimeout(timer);
  }, [pos, reduce, done, flat]);

  const lines = reduce ? termLines : termLines.slice(0, pos.li);
  const typing = !reduce && !done ? (flat[pos.li] ?? "").slice(0, pos.ci) : "";

  return (
    <div className="term" role="img" aria-label="Registro animado de agentes de IA reportando estado de sistemas">
      <div className="term-bar">
        <span className="term-dot live" />
        <span className="term-dot" />
        <span className="term-dot" />
        <span className="term-title">hermes — agent log</span>
      </div>
      <div className="term-body" aria-hidden="true">
        {lines.map((line, i) => (
          <div className="term-line" key={i}>
            {line.map((seg, j) => (
              <span key={j} className={seg.c}>{seg.t}</span>
            ))}
          </div>
        ))}
        {!reduce && !done && (
          <div className="term-line">
            <span>{typing}</span>
            <span className="term-cursor" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Navegación ---------- */
function Nav({ lang, setLang, t }) {
  const [open, setOpen] = useState(false);
  const link = (hash, label) => (
    <a href={hash} onClick={() => setOpen(false)}>{label}</a>
  );
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a href="#/" className="brand" onClick={() => setOpen(false)}>
          untal<b>Douglas</b>
        </a>
        <nav className={"nav-links" + (open ? " open" : "")}>
          {link("#proyectos", t.nav.projects)}
          {link("#servicios", t.nav.services)}
          {link("#trayectoria", t.nav.journey)}
          {link("#reconocimiento", t.nav.recognition)}
          <a href="#/blog" onClick={() => setOpen(false)}>{t.nav.blog}</a>
          {link("#contacto", t.nav.contact)}
          <button
            className="lang-toggle"
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
        </nav>
        <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menú">☰</button>
      </div>
    </header>
  );
}

/* ---------- Página principal ---------- */
function Home({ t }) {
  useEffect(() => {
    document.title = "untalDouglas — IT Director · IT Solutions Architect";
    document.querySelector('meta[name="description"]')
      ?.setAttribute("content", t.hero.sub);
  }, [t]);

  return (
    <main>
      <div className="wrap">
        <section className="hero" id="inicio">
          <div className="hero-grid">
            <Reveal>
              <p className="eyebrow">{t.hero.eyebrow}</p>
              <h1>
                {t.hero.titleA}<br />
                {t.hero.titleB}<em>{t.hero.titleEm}</em>{t.hero.titleC}
              </h1>
              <p className="hero-sub">{t.hero.sub}</p>
              <div className="hero-ctas">
                <a className="btn btn-primary" href="#proyectos">{t.hero.ctaProjects}</a>
                <a className="btn btn-ghost" href="#/blog">{t.hero.ctaBlog}</a>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <AgentLog />
            </Reveal>
          </div>
        </section>

        <Reveal>
          <div className="proof">
            {t.proof.map((p) => (
              <div className="proof-item" key={p.label}>
                <div className="proof-num">{p.num}</div>
                <div className="proof-label">{p.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <section id="proyectos">
          <Reveal className="sec-head">
            <p className="eyebrow">{t.projects.eyebrow}</p>
            <h2>{t.projects.title}</h2>
            <p>{t.projects.sub}</p>
          </Reveal>
          <div className="cards">
            {t.projects.items.map((p, i) => (
              <Reveal key={p.title} delay={Math.min(i * 0.06, 0.3)}>
                <div className="card">
                  <span className={"tag " + p.tagClass}>{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <span className="card-stack">{p.stack}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="servicios">
          <Reveal className="sec-head">
            <p className="eyebrow">{t.services.eyebrow}</p>
            <h2>{t.services.title}</h2>
            <p>{t.services.sub}</p>
          </Reveal>
          <div className="services">
            {t.services.items.map((s, i) => (
              <Reveal key={s.num} delay={Math.min(i * 0.08, 0.24)}>
                <div className="service">
                  <span className="num">{s.num}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="trayectoria">
          <Reveal className="sec-head">
            <p className="eyebrow">{t.journey.eyebrow}</p>
            <h2>{t.journey.title}</h2>
          </Reveal>
          <div className="timeline">
            {t.journey.items.map((j, i) => (
              <Reveal key={j.years} delay={Math.min(i * 0.06, 0.24)}>
                <div className="t-item">
                  <span className="t-years">{j.years}</span>
                  <h3>{j.title}</h3>
                  <p>{j.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="reconocimiento">
          <Reveal className="sec-head">
            <p className="eyebrow">{t.recognition.eyebrow}</p>
            <h2>{t.recognition.title}</h2>
            <p>{t.recognition.sub}</p>
          </Reveal>
          <div className="recog-grid">
            {t.recognition.groups.map((g, gi) => (
              <Reveal key={g.heading} delay={Math.min(gi * 0.1, 0.2)}>
                <div className="recog-col">
                  <h3 className="recog-heading">{g.heading}</h3>
                  <ul className="recog-list">
                    {g.items.map((it) => (
                      <li key={it.title}>
                        <span className="recog-title">{it.title}</span>
                        <span className="recog-body"> — {it.body}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contacto" className="contact">
          <Reveal>
            <h2>{t.contact.title}</h2>
            <p>{t.contact.sub}</p>
            <a className="contact-mail" href="mailto:galindo@untaldouglas.info">
              galindo@untaldouglas.info
            </a>
          </Reveal>
        </section>
      </div>
    </main>
  );
}

/* ---------- App con routing por hash ---------- */
function getRoute() {
  const h = window.location.hash;
  if (h.startsWith("#/blog/")) return { name: "post", slug: h.slice(7) };
  if (h.startsWith("#/blog")) return { name: "blog" };
  return { name: "home" };
}

export default function App() {
  const [lang, setLang] = useState("es");
  const [route, setRoute] = useState(getRoute());
  const t = content[lang];

  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash;
      setRoute(getRoute());
      if (h.startsWith("#/")) {
        window.scrollTo(0, 0);
      } else if (h.length > 1) {
        // Ancla de sección: esperar al render de Home si venimos del blog
        setTimeout(() => {
          document.getElementById(h.slice(1))?.scrollIntoView({ behavior: "smooth" });
        }, 60);
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <>
      <Nav lang={lang} setLang={setLang} t={t} />
      {route.name === "home" && <Home t={t} />}
      {route.name !== "home" && (
        <main className="wrap">
          <Blog route={route} t={t.blog} />
        </main>
      )}
      <footer className="footer">
        <div className="wrap footer-inner">
          <small>{t.footer.rights}</small>
          <div className="socials">
            <a href="https://github.com/untaldouglas" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/untaldouglas" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://x.com/untalDouglas" target="_blank" rel="noreferrer">X</a>
          </div>
        </div>
      </footer>
    </>
  );
}
