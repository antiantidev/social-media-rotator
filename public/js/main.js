/* ================= PLATFORM DEFINITIONS ================= */
const PLATFORMS = {
  tiktok: {
    name: "TikTok",
    icon: "./assets/icons8-tiktok-480.png",
    bg: "border bg-black/40 border-white/20 text-white backdrop-blur-md",
    cta: {
      text: "Follow",
      bg: "border bg-black/40 border-white/20 text-white backdrop-blur-md",
      icon: "./assets/icons8-heart-90-white.png",
    },
  },
  discord: {
    name: "Discord",
    icon: "./assets/icons8-discord-480.png",
    bg: "bg-white text-black",
    cta: {
      text: "Join",
      bg: "bg-[#5865F2] text-white",
      icon: "./assets/icons8-heart-90-white.png",
    },
  },
  youtube: {
    name: "YouTube",
    icon: "./assets/icons8-youtube-480.png",
    bg: "bg-white text-black",
    cta: {
      text: "Subscribe",
      bg: "bg-red-600 text-white",
      icon: "./assets/icons8-heart-90-white.png",
    },
  },
  twitch: {
    name: "Twitch",
    icon: "./assets/icons8-twitch-480.png",
    bg: "bg-white text-black",
    cta: {
      text: "Follow",
      bg: "bg-[#9146FF] text-white",
      icon: "./assets/icons8-heart-90-white.png",
    },
  },
  facebook: {
    name: "Facebook",
    icon: "./assets/icons8-facebook-480.png",
    bg: "bg-white text-black",
    cta: {
      text: "Follow",
      bg: "bg-[#1877F2] text-white",
      icon: "./assets/icons8-heart-90-white.png",
    },
  },
  instagram: {
    name: "Instagram",
    icon: "./assets/icons8-instagram-480.png",
    bg: "bg-white text-black",
    cta: {
      text: "Follow",
      bg: "bg-gradient-to-r from-pink-500 to-purple-600 text-white",
      icon: "./assets/icons8-heart-90-white.png",
    },
  },
  x: {
    name: "X",
    icon: "./assets/icons8-x-480.png",
    bg: "bg-white text-black",
    cta: {
      text: "Follow",
      bg: "bg-black text-white",
      icon: "./assets/icons8-heart-90-white.png",
    },
  },
};

/* ================= ROTATION DATA ================= */
const ROTATION_DATA = [
  { platform: "tiktok", text: "@nguyennhatlinh.official" },
  { platform: "discord", text: "discord.gg/xunAChFVkc" },
  { platform: "youtube", text: "@chokernguyen" },
];

/* ================= CONFIG ================= */
const CONFIG = {
  BASE_CLASS:
    "flex items-center gap-2 p-1 px-2 rounded-md shadow-lg animate__animated",
  ANIMATION: {
    in: "animate__bounceIn",
    out: "animate__bounceOut",
  },
  TIMING: {
    in: 1000,
    out: 1000,
    hold: 9000,
  },
};

/* ================= OVERLAY CONTROLLER ================= */
class OverlayController {
  constructor() {
    this.currentIndex = 0;
    this.elements = this.cacheElements();
    this.init();
  }

  cacheElements() {
    return {
      card: document.getElementById("card"),
      icon: document.getElementById("icon"),
      text: document.getElementById("text"),
      cta: document.getElementById("cta"),
      ctaBox: document.getElementById("ctaBox"),
      ctaIcon: document.getElementById("ctaIcon"),
    };
  }

  updateContent(item) {
    const platform = PLATFORMS[item.platform];
    if (!platform) return;

    const { icon, text, cta, ctaBox, ctaIcon } = this.elements;

    // Update content
    icon.src = platform.icon;
    text.textContent = item.text;
    cta.textContent = platform.cta.text;
    ctaIcon.src = platform.cta.icon;

    // Update styles
    ctaBox.className = `flex gap-2 items-center justify-center ml-auto px-3 py-1.5 rounded-md text-sm font-medium ${platform.cta.bg}`;
  }

  updateBackground(platform) {
    this.elements.card.className = `${CONFIG.BASE_CLASS} ${platform.bg}`;
  }

  animate(item) {
    const platform = PLATFORMS[item.platform];
    if (!platform) return;

    const { card } = this.elements;
    const { in: animIn, out: animOut } = CONFIG.ANIMATION;

    // Start exit animation
    card.classList.remove(animIn);
    card.classList.add(animOut);

    // After exit, update content and animate in
    setTimeout(() => {
      this.updateContent(item);
      this.updateBackground(platform);

      // Start enter animation
      card.classList.remove(animOut);
      card.classList.add(animIn);
    }, CONFIG.TIMING.out);
  }

  init() {
    const firstItem = ROTATION_DATA[0];
    const platform = PLATFORMS[firstItem.platform];

    if (!platform) return;

    this.updateContent(firstItem);
    this.updateBackground(platform);
    this.elements.card.classList.add(CONFIG.ANIMATION.in);
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % ROTATION_DATA.length;
    this.animate(ROTATION_DATA[this.currentIndex]);
  }

  start() {
    const interval = CONFIG.TIMING.hold + CONFIG.TIMING.in + CONFIG.TIMING.out;
    setInterval(() => this.next(), interval);
  }
}

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
  const overlay = new OverlayController();
  overlay.start();
});
