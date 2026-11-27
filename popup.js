document.addEventListener("DOMContentLoaded", () => {
  const btn10 = document.getElementById("vol10Btn");
  const statusEl = document.getElementById("statusText");

  if (!btn10) return;

  btn10.addEventListener("click", async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab?.id) {
        if (statusEl) statusEl.textContent = "সক্রিয় ট্যাব পাওয়া যায়নি";
        return;
      }

      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const mediaElements = document.querySelectorAll("audio, video");
          let count = 0;

          mediaElements.forEach((el) => {
            el.volume = 0.1;
            el.muted = false;
            count++;
          });

          return count;
        }
      });

      const updatedCount = results?.[0]?.result ?? 0;
      if (statusEl) {
        statusEl.textContent =
          updatedCount > 0
            ? `${updatedCount}টি মিডিয়ার সাউন্ড 10% করা হয়েছে`
            : "এই পেজে কোনো audio/video পাওয়া যায়নি";
      }
    } catch (err) {
      if (statusEl) {
        statusEl.textContent = "পারমিশন বা ট্যাবে সমস্যা হয়েছে";
      }
      console.error("Volume set error:", err);
    }
  });
});
