(() => {
  "use strict";

  // The password is checked by the server; this browser keeps only the credential it returns.
  const TRUST_KEY = "emily-diagnostic-trust-v1";
  const pageMode = document.documentElement.dataset.accessPage;

  try {
    sessionStorage.removeItem("emily-diagnostic-access-v1");
    sessionStorage.removeItem("emily-diagnostic-paper-session-v1");
  } catch {}

  function credential() {
    try { return localStorage.getItem(TRUST_KEY) || ""; } catch { return ""; }
  }
  function remember(value) {
    try { localStorage.setItem(TRUST_KEY, String(value || "")); } catch {}
  }
  function forget() {
    try { localStorage.removeItem(TRUST_KEY); } catch {}
  }
  // Only an explicit answer from the server signs this browser out; a failed request never does.
  function isSignedOut(result) {
    return Boolean(result && result.ok === false && (result.reason === "unknown" || result.reason === "revoked"));
  }
  async function call(action, payload = {}) {
    const endpoint = window.EMILY_SUBMISSION_ENDPOINT || "";
    if (!endpoint) throw new Error("offline");
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...payload, action }),
      signal: AbortSignal.timeout(30000)
    });
    if (!response.ok) throw new Error("offline");
    return response.json();
  }
  function verify() {
    return call("verifyAccess", { credential: credential() });
  }

  window.EmilyAccess = { credential, remember, forget, isSignedOut, call, verify };

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
    if (!credential()) {
      window.location.replace("../../?locked=1");
      return;
    }
    revealProtectedPage();
    document.addEventListener("DOMContentLoaded", async () => {
      try {
        if (isSignedOut(await verify())) {
          forget();
          window.location.replace("../../?locked=1");
        }
      } catch {
        // Keep the credential; the page and its saved draft stay usable.
      }
    }, { once: true });
    return;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const gate = document.querySelector("#access-gate");
    const content = document.querySelector("#diagnostic-content");
    const form = document.querySelector("#access-form");
    const input = document.querySelector("#access-password");
    const status = document.querySelector("#access-status");
    const retryBox = document.querySelector("#access-retry");
    const retryButton = document.querySelector("#access-retry-button");

    const unlock = () => {
      gate.hidden = true;
      content.hidden = false;
      document.documentElement.classList.add("access-granted");
    };
    const lock = (message) => {
      content.hidden = true;
      gate.hidden = false;
      if (retryBox) retryBox.hidden = true;
      document.documentElement.classList.remove("access-granted");
      status.textContent = message || "";
      input.focus();
    };
    const check = async () => {
      if (retryButton) retryButton.disabled = true;
      try {
        const result = await verify();
        if (isSignedOut(result)) {
          forget();
          lock("请重新输入密码。");
          return;
        }
        if (retryBox) retryBox.hidden = true;
      } catch {
        if (retryBox) retryBox.hidden = false;
      } finally {
        if (retryButton) retryButton.disabled = false;
      }
    };
    if (retryButton) retryButton.addEventListener("click", check);

    form.addEventListener("submit", async event => {
      event.preventDefault();
      const password = input.value.trim();
      if (!password) {
        status.textContent = "请输入密码。";
        input.focus();
        return;
      }
      status.textContent = "正在检查…";
      let result;
      try {
        result = await call("signIn", { password });
      } catch {
        status.textContent = "暂时无法连接，请检查网络后再试一次。";
        return;
      }
      if (result && result.ok && result.credential) {
        remember(result.credential);
        input.value = "";
        status.textContent = "";
        unlock();
        document.querySelector("#main")?.focus({ preventScroll: true });
        return;
      }
      input.value = "";
      input.focus();
      status.textContent = result && result.reason === "wait" ? "尝试次数较多，请几分钟后再试。" : "密码不正确，请再试一次。";
    });

    if (credential()) {
      unlock();
      check();
      return;
    }
    if (new URLSearchParams(window.location.search).has("locked")) {
      status.textContent = "请先输入密码，再进入摸底题。";
    }
    input.focus();
  });
})();
