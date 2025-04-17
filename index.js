document.addEventListener('DOMContentLoaded', () => {

    // ======= PASSWORD VALIDATION =======
    const passwordInput = document.querySelector('.password-input');
    const toggleEye = document.querySelector('.toggle-eye');
    const eyeIcon = document.querySelector('.eye-icon');
    const passwordBox = document.querySelector('.password');
    const errorMessage = document.getElementById('error-message');
    const passwordContainer = document.getElementById('password-container');
    const transitionScreen = document.getElementById('transition-screen');
    const transitionText = document.querySelector('.transition-text');
    const transitionSound = document.getElementById('transition-sound');
    const sapaanPage = document.getElementById('sapaan-page');
    const nextPage = document.getElementById('next-page');
    const correctPassword = '253010';

    toggleEye.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordBox.classList.add('show-password');
            eyeIcon.name = 'eye-off-outline';
        } else {
            passwordInput.type = 'password';
            passwordBox.classList.remove('show-password');
            eyeIcon.name = 'eye-outline';
        }
    });

    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            validatePassword();
        }
    });

    function validatePassword() {
        if (passwordInput.value === correctPassword) {
            errorMessage.style.display = 'none';
            passwordBox.classList.remove('shake');
            passwordContainer.style.display = 'none';
            showTransitionScreen();
        } else {
            errorMessage.style.display = 'block';
            passwordBox.classList.add('shake');
            setTimeout(() => {
                passwordBox.classList.remove('shake');
            }, 400);
        }
    }
    // ======= TRANSITION SCREEN =======
let transitionShown = false;

function showTransitionScreen() {
    if (transitionShown) return;
    transitionShown = true;

    transitionScreen.classList.add('show');
    transitionScreen.classList.remove('fade-out');

    if (transitionSound) {
        transitionSound.currentTime = 0;
        transitionSound.play();
    }

    setTimeout(() => {
        transitionText.style.opacity = '1';
    }, 300);

    setTimeout(() => {
        transitionText.style.opacity = '0';
    }, 2500);

    setTimeout(() => {
        transitionScreen.classList.add('fade-out');
    }, 3000);

    setTimeout(() => {
        transitionScreen.classList.remove('show');
        showSapaanPage();
    }, 3800);
}

// ======= SAPAAN PAGE =======
function showSapaanPage() {
    const sapaanTextElement = document.getElementById('sapaan-text');
    const nextButton = document.getElementById('start-flipbook-btn');
    let currentTextIndex = 0;

    sapaanPage.style.display = 'flex';
    sapaanTextElement.innerHTML = '';
    nextButton.style.display = 'none';

    const sapaanTexts = [
        "Haii Cencenn!!",
        "Akhirnya kamu dateng jugaa 😆", 
        "Aku udah lama pengin nunjukin ini ke kamu…",
        "Tapi baru sekarang aku bisa."
    ];

    function typeText(text, callback) {
        let charIndex = 0;
        const lineElement = document.createElement('p');
        sapaanTextElement.appendChild(lineElement);

        const typingInterval = setInterval(() => {
            lineElement.textContent += text[charIndex];
            charIndex++;
            if (charIndex === text.length) {
                clearInterval(typingInterval);
                callback();
            }
        }, 100);
    }

    function showText() {
        if (currentTextIndex >= sapaanTexts.length) {
            nextButton.style.display = 'block';
            return;
        }

        const newText = sapaanTexts[currentTextIndex];
        typeText(newText, () => {
            currentTextIndex++;
            setTimeout(showText, 800);
        });
    }

    showText();
}

// ======= TRANSISI KE FLIPBOOK =======
const nextButton = document.getElementById('start-flipbook-btn');
const transisiKeFlipbook = document.getElementById('transisi-ke-flipbook');
const transisiTyping = document.getElementById('transisi-typing');
const mulaiFlipbookBtn = document.getElementById('mulai-flipbook-btn');
const fadeOverlay = document.getElementById('fade-overlay');
const bgMusic = document.getElementById('bg-music');
const halamanFlipbook = document.querySelector('.next-page');

nextButton.addEventListener('click', () => {
    sapaanPage.style.display = 'none';
    transisiKeFlipbook.style.display = 'flex';
    transisiTyping.innerHTML = '';
    mulaiFlipbookBtn.style.display = 'none';
    fadeOverlay.style.opacity = '1';

    const kalimat = [
        "Aku bingung mau mulai dari mana", 
        "Tapi aku ada cerita",
        "Cerita kali ini bukan lewat chat atau suara kaya biasanya"        
    ];
    let currentLine = 0;

    function ketikKalimat(teks, callback) {
        let charIndex = 0;
        const p = document.createElement('p');
        transisiTyping.appendChild(p);

        const typing = setInterval(() => {
            p.textContent += teks[charIndex];
            charIndex++;
            if (charIndex >= teks.length) {
                clearInterval(typing);
                callback();
            }
        }, 80);
    }

    function mulaiTyping() {
        if (currentLine < kalimat.length) {
            ketikKalimat(kalimat[currentLine], () => {
                currentLine++;
                setTimeout(mulaiTyping, 800);
            });
        } else {
            setTimeout(() => {
                mulaiFlipbookBtn.style.display = 'block';
                mulaiFlipbookBtn.classList.add('fade-in');
            }, 500);
        }
    }

    mulaiTyping();
});

// ======= MULAI FLIPBOOK =======
mulaiFlipbookBtn.addEventListener('click', () => {
    transisiKeFlipbook.classList.add('fade-out');

    if (bgMusic) {
        bgMusic.currentTime = 0;
        bgMusic.play();
    }

    setTimeout(() => {
        transisiKeFlipbook.style.display = 'none';
        transisiKeFlipbook.classList.remove('fade-out');
        halamanFlipbook.style.display = 'flex';
        halamanFlipbook.style.zIndex = '1';

        const bookWrapper = document.querySelector('.book-wrapper');
        const flipbook = document.getElementById('flipbook');

        $('#flipbook').turn({
            width: bookWrapper.offsetWidth,
            height: bookWrapper.offsetHeight,
            autoCenter: false,
            display: 'single',
            acceleration: true,
            gradients: true,
            elevation: 50
        });

        flipbook.setAttribute('tabindex', '0');
        flipbook.focus();

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                $('#flipbook').turn('next');
            }
        });

        flipbook.addEventListener('click', () => {
            $('#flipbook').turn('next');
        });
    }, 800);
});

let currentApresiasiIndex = 0;

const grupList = Array.from(document.querySelectorAll("#apresiasi-teks-list .apresiasi-grup"));
const apresiasiText = document.getElementById("apresiasi-text");
const tapArea = document.getElementById("tap-area-apresiasi");
const stikerElement = document.getElementById("apresiasi-sticker");
const harapanIcon = document.getElementById("harapan-icon");
const lanjutText = document.querySelector(".lanjut-text");

// Buat elemen cursor berkedip
const cursor = document.createElement("span");
cursor.classList.add("blinking-cursor");

// ================================
// BAGIAN UTAMA UNTUK GRUP 1–7
// ================================

const stikerList = ["st1.gif", "st2.gif", "st3.gif", "st4.gif"]; // Tambah sesuai jumlah stikermu
const stikerCache = {};

stikerList.forEach(src => {
  const img = new Image();
  img.src = src;
  stikerCache[src] = img;
});

function gantiStiker(index) {
  const stikerSrc = `st${index + 1}.gif`;
  const stiker = document.querySelector(".apresiasi-sticker");

  // Animasi keluar dulu
  stiker.classList.remove("show");
  stiker.classList.add("hide");

  setTimeout(() => {
    // Cek apakah stikernya sudah di-preload
    if (stikerCache[stikerSrc]) {
      stiker.src = stikerCache[stikerSrc].src;
    } else {
      stiker.src = stikerSrc; // fallback kalau belum di-preload
    }

    setTimeout(() => {
      stiker.classList.remove("hide");
      stiker.classList.add("show");
    }, 50);
  }, 500);
}

function ketikTeksKeElemen(elemen, teks, i, callback) {
  if (i < teks.length) {
    cursor.remove();
    elemen.innerHTML += teks.charAt(i);
    elemen.appendChild(cursor);

    setTimeout(() => {
      ketikTeksKeElemen(elemen, teks, i + 1, callback);
    }, 40);
  } else {
    cursor.remove();
    callback();
  }
}

// Untuk halaman apresiasi pertama kali
window.slideOutFlipbook = function () {
  const bookWrapper = document.querySelector('.book-wrapper');
  if (!bookWrapper) return;

  bookWrapper.classList.add('slide-out-left');

  setTimeout(() => {
    document.getElementById('next-page').style.display = 'none';
    document.getElementById('apresiasi-page').style.display = 'flex';

    const firstGrup = grupList[0];
    if (!firstGrup) return;

    const teksArray = Array.from(firstGrup.querySelectorAll('div')).map(div => div.textContent.trim());

    gantiStiker(0);
    ketikGrup(teksArray);
    currentApresiasiIndex = 1;
  }, 1000);
};

// Untuk grup 1–7
window.lanjutApresiasi = function () {
  tapArea.style.display = "none";
  apresiasiText.innerHTML = "";

  if (currentApresiasiIndex < grupList.length) {
    const nextGrup = grupList[currentApresiasiIndex];
    const teksArray = Array.from(nextGrup.querySelectorAll('div')).map(div => div.textContent.trim());

    gantiStiker(currentApresiasiIndex);
    ketikGrup(teksArray);
    currentApresiasiIndex++;
  } else {
    console.log("Semua grup apresiasi sudah selesai.");
  }
};

// ================================
// TAMBAHAN UNTUK GRUP 8 DAN 9
// ================================
function ketikGrup(teksArray, i = 0) {
  if (i < teksArray.length) {
    const p = document.createElement("p");
    p.appendChild(cursor);
    apresiasiText.appendChild(p);

    ketikTeksKeElemen(p, teksArray[i], 0, () => {
      ketikGrup(teksArray, i + 1);
    });
  } else {
    // GRUP 8: aktifkan icon & instruksi
    if (currentApresiasiIndex === 8) {
      if (harapanIcon) {
        harapanIcon.style.display = "block";
        harapanIcon.classList.add("aktifkan-icon");

        harapanIcon.onclick = () => {
          harapanIcon.style.display = "none";
          tapArea.style.display = "none"; // HILANGKAN teks 'tekan icon pojok kiri' SAAT icon ditekan
          masukKeGrup9();
        };
      }

      if (lanjutText) {
        lanjutText.textContent = "Tekan icon di pojok kiri atas";
        tapArea.style.display = "block";
        tapArea.onclick = null;
      }
    }

    // GRUP 9 (TERAKHIR): sembunyikan semua dan jalankan fitur tambahan
    else if (currentApresiasiIndex === 9) {
      tapArea.style.display = "none";
      if (harapanIcon) {
        harapanIcon.style.display = "none";
        harapanIcon.onclick = null;
      }

      // TUNGGU SEBENTAR setelah ketik selesai
      setTimeout(() => {
        // Ganti stiker baru
        gantiStiker(9); // pastikan stiker index ke-9 tersedia

        // Tampilkan tombol WhatsApp
        const waButton = document.querySelector(".wa-button");
        if (waButton) {
          apresiasiText.appendChild(waButton);
          waButton.style.display = "inline-block";
        }

        // Mulai efek hujan icon
        mulaiHujanIcon();
      }, 1000);
    }

    // GRUP 1–7
    else {
      tapArea.style.display = "block";
      if (lanjutText) {
        lanjutText.textContent = "Lanjut";
      }

      if (harapanIcon) {
        harapanIcon.style.display = "block";
        harapanIcon.onclick = null;
      }
    }
  }
}

function masukKeGrup9() {
  apresiasiText.innerHTML = "";

  const nextGrup = grupList[8]; // Index ke-8 = grup 9
  const teksArray = Array.from(nextGrup.querySelectorAll('div')).map(div => div.textContent.trim());

  gantiStiker(8);
  ketikGrup(teksArray);
  currentApresiasiIndex = 9;
}

// ================================
// EFEK HUJAN ICON
// ================================
function mulaiHujanIcon() {
  setInterval(() => {
    const icon = document.createElement("div");
    icon.classList.add("hujan-icon");
    icon.textContent = "🤍";
    icon.style.left = Math.random() * 100 + "vw";
    icon.style.fontSize = Math.random() * 10 + 20 + "px";
    icon.style.opacity = Math.random();

    document.body.appendChild(icon);

    setTimeout(() => icon.remove(), 4000);
  }, 300);
}

});