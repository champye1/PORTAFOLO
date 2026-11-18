// Portafolio · Esteban Venegas Cantillano
// Sin dependencias. El contenido es 100% visible aunque este script no cargue.

(function () {
    'use strict';

    const root = document.documentElement;
    root.classList.add('js');

    // ---------- Tema claro / oscuro ----------
    const THEME_KEY = 'theme';
    const readTheme = () => { try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; } };
    const saveTheme = (v) => { try { localStorage.setItem(THEME_KEY, v); } catch (e) { /* sin almacenamiento */ } };

    const saved = readTheme();
    if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;

    const prefersDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = () => root.dataset.theme || (prefersDark() ? 'dark' : 'light');

    document.addEventListener('DOMContentLoaded', () => {
        const themeBtn = document.querySelector('.theme-toggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                const next = currentTheme() === 'dark' ? 'light' : 'dark';
                root.dataset.theme = next;
                saveTheme(next);
            });
        }

        // ---------- Menú móvil ----------
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const closeMenu = () => {
            navMenu.classList.remove('is-open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Abrir menú');
        };
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                const open = navMenu.classList.toggle('is-open');
                navToggle.setAttribute('aria-expanded', String(open));
                navToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
            });
            navMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
            document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
        }

        // ---------- Borde del header al hacer scroll ----------
        const header = document.querySelector('.site-header');
        const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        // ---------- Enlace activo según la sección visible ----------
        const links = Array.from(document.querySelectorAll('.nav-menu a[href^="#"]'));
        const sections = links
            .map((a) => document.querySelector(a.getAttribute('href')))
            .filter(Boolean);
        if ('IntersectionObserver' in window && sections.length) {
            const spy = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id));
                });
            }, { rootMargin: '-45% 0px -50% 0px' });
            sections.forEach((s) => spy.observe(s));
        }

        // ---------- Aparición al hacer scroll ----------
        const reveals = document.querySelectorAll('.reveal');
        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver((entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
            reveals.forEach((el) => io.observe(el));
        } else {
            reveals.forEach((el) => el.classList.add('is-visible'));
        }

        // ---------- Filtro de proyectos ----------
        const filterBtns = document.querySelectorAll('.filter-btn');
        const cards = document.querySelectorAll('.project-card');
        const empty = document.querySelector('.filter-empty');
        filterBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                filterBtns.forEach((b) => {
                    const active = b === btn;
                    b.classList.toggle('is-active', active);
                    b.setAttribute('aria-pressed', String(active));
                });
                let shown = 0;
                cards.forEach((card) => {
                    const cats = (card.dataset.category || '').split(/\s+/);
                    const match = filter === 'all' || cats.includes(filter);
                    card.classList.toggle('is-hidden', !match);
                    if (match) {
                        shown++;
                        card.classList.add('is-visible');
                    }
                });
                if (empty) empty.hidden = shown > 0;
            });
        });

        // ---------- Copiar email ----------
        const copyBtn = document.querySelector('.copy-email');
        const feedback = document.querySelector('.copy-feedback');
        if (copyBtn) {
            copyBtn.addEventListener('click', async () => {
                const email = copyBtn.dataset.email;
                try {
                    await navigator.clipboard.writeText(email);
                    if (feedback) feedback.textContent = 'Email copiado: ' + email;
                } catch (e) {
                    if (feedback) feedback.textContent = email;
                }
                setTimeout(() => { if (feedback) feedback.textContent = ''; }, 4000);
            });
        }

        // ---------- Año del footer ----------
        const year = document.querySelector('.year');
        if (year) year.textContent = String(new Date().getFullYear());
    });
})();
