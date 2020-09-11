let switchInput = document.querySelector(".switch");
let switchInputElement = document.querySelector(".switch > .switch__input");

chrome.storage.sync.get("enabled", function (data) {
  switchInput.classList.toggle("switch--checked", data.enabled);
  switchInputElement.checked = data.enabled;
});

switchInput.onclick = function () {
  let enabled = switchInputElement.checked;
  switchInputElement.checked = !enabled;
  chrome.storage.sync.set({ enabled: !enabled });
  switchInput.classList.toggle("switch--checked", !enabled);

  if (!enabled) {
    setPlatziTheme();
  }
};

function setPlatziTheme() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.insertCSS(tabs[0].id, {
      file: "platzitheme.css",
    });
  });
}
