/* =========================================
   THOUGHT. - Main JavaScript
   RYK!LE
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -----------------------------------------
     1. LANGUAGE SETTINGS
     日本語・英語の切り替えと設定の保存
  ----------------------------------------- */

  const LANGUAGE_KEY = "thought-language";

  function applyLanguage(language) {
    const isEnglish = language === "en";

    document.body.classList.toggle("english", isEnglish);
    document.documentElement.lang = isEnglish ? "en" : "ja";
  }

  function saveLanguage(language) {
    try {
      localStorage.setItem(LANGUAGE_KEY, language);
    } catch (error) {
      console.warn("Language preference could not be saved.", error);
    }
  }

  function getSavedLanguage() {
    try {
      return localStorage.getItem(LANGUAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  // 保存された言語設定を読み込む
  const savedLanguage = getSavedLanguage();

  if (savedLanguage === "ja" || savedLanguage === "en") {
    applyLanguage(savedLanguage);
  }

  // 既存のtoggleLanguage()を維持しながら拡張
  const originalToggleLanguage = window.toggleLanguage;

  window.toggleLanguage = function () {

    if (typeof originalToggleLanguage === "function") {
      originalToggleLanguage();
    } else {
      const isEnglish = document.body.classList.contains("english");
      applyLanguage(isEnglish ? "ja" : "en");
    }

    const currentLanguage =
      document.body.classList.contains("english") ? "en" : "ja";

    applyLanguage(currentLanguage);
    saveLanguage(currentLanguage);
  };


  /* -----------------------------------------
     2. LANGUAGE DISPLAY FIX
     日本語・英語の表示崩れを防止
  ----------------------------------------- */

  const languageStyle = document.createElement("style");

  languageStyle.textContent = `
    .ja {
      display: revert;
    }

    .en {
      display: none;
    }

    body.english .ja {
      display: none !important;
    }

    body.english .en {
      display: revert !important;
    }
  `;

  document.head.appendChild(languageStyle);


  /* -----------------------------------------
     3. READING PROGRESS BAR
     ページの読書進捗を表示
  ----------------------------------------- */

  const progressContainer = document.createElement("div");
  progressContainer.id = "thought-reading-progress";

  const progressBar = document.createElement("div");
  progressBar.id = "thought-reading-progress-bar";

  progressContainer.appendChild(progressBar);
  document.body.prepend(progressContainer);

  const progressStyle = document.createElement("style");

  progressStyle.textContent = `
    #thought-reading-progress {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: rgba(36, 76, 58, 0.10);
      z-index: 9999;
      pointer-events: none;
    }

    #thought-reading-progress-bar {
      width: 0%;
      height: 100%;
      background: #244C3A;
      transition: width 0.08s linear;
    }

    @media (prefers-reduced-motion: reduce) {
      #thought-reading-progress-bar {
        transition: none;
      }
    }
  `;

  document.head.appendChild(progressStyle);

  function updateReadingProgress() {

    const scrollTop =
      window.scrollY || document.documentElement.scrollTop;

    const documentHeight =
      document.documentElement.scrollHeight;

    const windowHeight = window.innerHeight;

    const scrollableHeight = documentHeight - windowHeight;

    let progress = 0;

    if (scrollableHeight > 0) {
      progress = (scrollTop / scrollableHeight) * 100;
    }

    progress = Math.min(100, Math.max(0, progress));

    progressBar.style.width = progress + "%";
  }

  window.addEventListener(
    "scroll",
    updateReadingProgress,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    updateReadingProgress
  );

  updateReadingProgress();


  /* -----------------------------------------
     4. PAGE INFORMATION
     現在のページを判定
  ----------------------------------------- */

  const currentPath = window.location.pathname;

  const isChapterPage = currentPath.includes("/chapters/");
  const isThemePage = currentPath.includes("/themes/");
  const isHomePage = !isChapterPage && !isThemePage;

  document.body.dataset.page = isChapterPage
    ? "chapter"
    : isThemePage
      ? "theme"
      : "home";


  /* -----------------------------------------
     5. ACCESSIBILITY
     ページ表示後の基本設定
  ----------------------------------------- */

  document.documentElement.classList.add("js-enabled");

  /* -----------------------------------------
     6. SCROLL REVEAL
     スクロールに合わせて要素を表示
  ----------------------------------------- */

  const revealItems = document.querySelectorAll(".home-reveal");

  // IntersectionObserverが使えない場合も
  // コンテンツが表示されるようにする
  if (!("IntersectionObserver" in window)) {

    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });

  } else {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });

  }


  /* -----------------------------------------
     7. INITIAL DISPLAY CHECK
     初期表示の安全対策
  ----------------------------------------- */

  // JavaScriptの読み込み後も
  // 表示対象が残らないようにする
  window.addEventListener("load", () => {

    revealItems.forEach((item) => {

      const rect = item.getBoundingClientRect();

      if (rect.top < window.innerHeight) {
        item.classList.add("is-visible");
      }

    });

  });


  /* -----------------------------------------
     8. COMPLETE
  ----------------------------------------- */

  console.log("THOUGHT. Main JavaScript loaded.");

});
