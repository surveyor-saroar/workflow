document.getElementById("highlightBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      document.querySelectorAll("h1, h2").forEach((el) => {
        el.style.backgroundColor = "#facc15";
        el.style.color = "#090d16";
        el.style.padding = "4px 8px";
        el.style.borderRadius = "6px";
      });
    }
  });
});