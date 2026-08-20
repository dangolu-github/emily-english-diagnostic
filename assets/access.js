(() => {
  "use strict";

  const ACCESS_KEY = "emily-diagnostic-access-v1";
  const PASSWORD_DIGEST = "e8e9689deac5bac977b64e85c1105bd1419608f1223bdafb8e5fbdf6cf939879";
  const SESSION_MAX_AGE_MS = 12 * 60 * 60 * 1000;
  const pageMode = document.documentElement.dataset.accessPage;

  function hasValidSession() {
    try {
      const stored = JSON.parse(sessionStorage.getItem(ACCESS_KEY) || "null");
      return stored?.granted === true && Date.now() - stored.grantedAt < SESSION_MAX_AGE_MS;
    } catch {
      sessionStorage.removeItem(ACCESS_KEY);
      return false;
    }
  }

  function revealProtectedPage() {
    const reveal = () => {
      document.body.hidden = false;
      document.documentElement.classList.add("access-granted");
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", reveal, { once: true });
    } else {
      reveal();
    }
  }

  if (pageMode === "protected") {
    if (!hasValidSession()) {
      window.location.replace("../../?locked=1");
    } else {
      revealProtectedPage();
    }
    return;
  }

  async function sha256(value) {
    const bytes = new TextEncoder().encode(value);
    const hash = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2, "0")).join("");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const gate = document.querySelector("#access-gate");
    const content = document.querySelector("#diagnostic-content");
    const form = document.querySelector("#access-form");
    const input = document.querySelector("#access-password");
    const status = document.querySelector("#access-status");

    const unlock = () => {
      gate.hidden = true;
      content.hidden = false;
      document.documentElement.classList.add("access-granted");
    };

    if (hasValidSession()) {
      unlock();
      return;
    }

    if (new URLSearchParams(window.location.search).has("locked")) {
      status.textContent = "请先输入密码，再进入摸底题。";
    }

    form.addEventListener("submit", async event => {
      event.preventDefault();
      status.textContent = "正在检查…";
      try {
        const digest = await sha256(input.value.trim());
        if (digest !== PASSWORD_DIGEST) {
          input.value = "";
          input.focus();
          status.textContent = "密码不正确，请再试一次。";
          return;
        }
        sessionStorage.setItem(ACCESS_KEY, JSON.stringify({ granted: true, grantedAt: Date.now() }));
        unlock();
        document.querySelector("#main")?.focus({ preventScroll: true });
      } catch {
        status.textContent = "这个浏览器暂时无法检查密码，请换用最新版浏览器。";
      }
    });

    input.focus();
  });
})();
