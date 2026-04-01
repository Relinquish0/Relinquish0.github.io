(function () {
  const STORAGE_KEY = 'preferred-lang';
  const DEFAULT_LANG = 'en';

  function setText(lang) {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    document.querySelectorAll('[data-i18n-en]').forEach((element) => {
      const text = lang === 'zh' ? element.dataset.i18nZh : element.dataset.i18nEn;
      if (text) {
        element.textContent = text;
      }
    });

    const toggle = document.getElementById('lang-toggle');

    if (!toggle) {
      return;
    }

    const nextLabel = lang === 'zh' ? 'EN' : '中';
    const nextTitle = lang === 'zh' ? 'Switch to English' : 'Switch to Chinese';

    toggle.setAttribute('title', nextTitle);
    toggle.setAttribute('aria-label', nextTitle);
    toggle.dataset.lang = nextLabel;
  }

  function init() {
    const toggle = document.getElementById('lang-toggle');
    let currentLang = window.localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;

    setText(currentLang);

    if (!toggle) {
      return;
    }

    toggle.addEventListener('click', function () {
      currentLang = currentLang === 'zh' ? 'en' : 'zh';
      window.localStorage.setItem(STORAGE_KEY, currentLang);
      setText(currentLang);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
