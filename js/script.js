/* ==========================================================================
   BOREAL — script.js
   JavaScript puro, sem dependências externas.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Menu hambúrguer (mobile) ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      nav.setAttribute('data-open', String(!isOpen));
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    /* Fecha o menu ao clicar em um link (mobile) */
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        nav.setAttribute('data-open', 'false');
        document.body.style.overflow = '';
      });
    });

    /* Fecha o menu com a tecla Esc */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        toggle.setAttribute('aria-expanded', 'false');
        nav.setAttribute('data-open', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- Header sólido ao rolar a página ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 12) {
        header.style.background = 'rgba(6, 15, 32, 0.96)';
      } else {
        header.style.background = 'rgba(6, 15, 32, 0.82)';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Ano dinâmico no rodapé ---------- */
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Validação simples do formulário de contato ---------- */
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var feedback = form.querySelector('.form-feedback');
      var required = form.querySelectorAll('[required]');
      var valid = true;

      required.forEach(function (field) {
        if (!field.value.trim()) {
          valid = false;
          field.setAttribute('aria-invalid', 'true');
        } else {
          field.removeAttribute('aria-invalid');
        }
      });

      if (!feedback) return;

      if (valid) {
        feedback.textContent = 'Mensagem pronta para envio! Conecte este formulário ao seu backend ou serviço de e-mail preferido.';
        feedback.dataset.state = 'success';
        form.reset();
      } else {
        feedback.textContent = 'Por favor, preencha os campos obrigatórios antes de enviar.';
        feedback.dataset.state = 'error';
      }
    });
  }
})();
