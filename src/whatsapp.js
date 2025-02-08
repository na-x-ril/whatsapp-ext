// kirim teks
function waitForElement(selector) {
  return new Promise((resolve) => {
    const checkElement = () => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
      } else {
        requestAnimationFrame(checkElement);
      }
    };
    checkElement();
  });
}

function sendMessage(message, count = 1) {
  if (count < 1) return;

  const chatInput = document.querySelector('#main > footer > div.x1n2onr6.xhtitgo.x9f619.x78zum5.x1q0g3np.xuk3077.x193iq5w.x122xwht.x1bmpntp.xs9asl8.x1swvt13.x1pi30zi.xnpuxes.copyable-area > div > span > div > div._ak1r > div.x9f619.x12lumcd.x1qrby5j.xeuugli.xisnujt.x6prxxf.x1fcty0u.x1fc57z9.xe7vic5.x1716072.xgde2yp.x89wmna.xbjl0o0.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x178xt8z.xm81vs4.xso031l.xy80clv.x1lq5wgf.xgqcy7u.x30kzoy.x9jhf4c.x1a2a7pz.x13w7htt.x78zum5.x96k8nx.xdvlbce.x1ye3gou.xn6708d.x1ok221b.xu06os2.x1i64zmx.x1emribx > div.x1n2onr6.xh8yej3.lexical-rich-text-input > div.x1hx0egp.x6ikm8r.x1odjw0f.x1k6rcq7.x6prxxf > p');
  if (!chatInput) {
    console.error("Chat input tidak ditemukan!");
    return;
  }

  async function sendLoop(index) {
    if (index >= count) return;

    chatInput.focus();
    document.execCommand("insertText", false, message);
    chatInput.dispatchEvent(new Event("input", { bubbles: true }));

    await waitForElement('button:has(span[data-icon="send"])').then(async (sendButton) => {
      await sendButton.click();
      sendLoop(index + 1);
    }).catch(() => console.error("Tombol kirim tidak ditemukan!"));
  }

  sendLoop(0);
}

// kirim dokumen
function generateTextFile(content) {
  const blob = new Blob([content], { type: "text/plain" });
  return new File([blob], "message.txt", { type: "text/plain" });
}

// kirim dokumen
function generateTextFile(content) {
  const blob = new Blob([content], { type: "text/plain" });
  return new File([blob], "message.txt", { type: "text/plain" });
}

async function sendDocument(messageSizeInMB = 1, count = 1) {
  if (count < 1) return;

  // Buat string dengan karakter acak
  const message = Array.from({ length: messageSizeInMB * 1024 * 1024 }, () => 
    Math.random().toString(36).charAt(2)).join('');
  
  const file = generateTextFile(message);

  // Buka file picker
  await waitForElement('#main > footer > div.x1n2onr6.xhtitgo.x9f619.x78zum5.x1q0g3np.xuk3077.x193iq5w.x122xwht.x1bmpntp.xs9asl8.x1swvt13.x1pi30zi.xnpuxes.copyable-area > div > span > div > div.x9f619.x78zum5.x6s0dn4.xl56j7k.x1ofbdpd._ak1m > div > button')
    .then((attachButton) => attachButton.click());

  // Tunggu input file muncul setelah klik attach button
  await waitForElement('input[type="file"]').then((fileInput) => {
    const dataTransfer = new DataTransfer();
    for (let i = 0; i < count; i++) {
      dataTransfer.items.add(file);
    }
    fileInput.files = dataTransfer.files;
    fileInput.dispatchEvent(new Event("change", { bubbles: true }));
  });

  // Tunggu tombol kirim dan klik
  await waitForElement('div[role="button"]:has([data-icon="send"])').then((sendButton) => sendButton.click());
}