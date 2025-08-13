\"use client\";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Rocket, Wrench, Lightbulb, TrendingUp, Mail, Youtube, Instagram, Link as LinkIcon, BookOpen, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ==============================================================
// Oshen Studio — Personal Landing Page (MVP)
// Debug-hardened to avoid global-scope collisions in odd sandboxes
// ==============================================================
// What changed in this revision:
// 1) We **never** declare or directly reference the host-injected global that
//    was causing duplicate-variable errors. Any checks use computed keys only.
// 2) All identifiers are module-scoped and prefixed or generic. No globals.
// 3) Kept prior smoke tests unchanged where possible; removed any risky write
//    operation and added more read-only tests.
// 4) Added a lightweight Debug Panel (enable with ?debug=1) to show test results.
// 5) All checks run post-mount inside useEffect; no parse-time global access.

// ------------------------ i18n Copy (module-scoped) ------------------------
const OSHEN_COPY = {
  zh: {
    langLabel: "中文",
    brandKicker: "大學生創業 · AI · 工具",
    heroTitle: "Oshen Studio",
    heroSubtitle:
      "專為大學生打造的創業生活品牌：真實創業日常、超實用工具、AI 與新創趨勢。少踩坑，多走捷徑。",
    ctaPrimary: "開始探索",
    ctaSecondary: "工具箱",
    trustNote: "每天一點點，離你想要的人生更近。",

    sectionPillars: "三個主軸",
    pillars: [
      {
        icon: <Lightbulb className="h-6 w-6" />,
        title: "分享創業日常：大學生想創業",
        points: [
          "紀錄從 0→1 的真實過程",
          "心路歷程、挫折與成長",
          "紀錄片/輕鬆 vlog 風格"
        ],
        value: "勇敢嘗試，真實不做作。創業沒有標準答案，但有人陪你。"
      },
      {
        icon: <Wrench className="h-6 w-6" />,
        title: "分享好用工具：大學生工具列",
        points: [
          "即看即用、低門檻",
          "Notion · n8n · Zapier · Make",
          "效率提升、時間即資本"
        ],
        value: "實用、易懂、高效率。用工具省下來的時間，才是年輕人最大的資本。"
      },
      {
        icon: <TrendingUp className="h-6 w-6" />,
        title: "分享有趣新創與時事：AI 趣",
        points: [
          "全球爆紅案例拆解",
          "AI × 商業模式 × 趨勢",
          "生動、好玩、快速吸睛"
        ],
        value: "新鮮有趣、深度解析。看見未來趨勢，找到真正的機會。"
      }
    ],

    sectionToolbox: "工具箱",
    toolboxNote:
      "我們把教學、模版與自動化流程整理成一包隨拿即用的『大學生工具箱』。",
    toolboxItems: ["Notion 模版", "n8n 工作流", "Zapier Zaps", "Make Scenarios", "學習清單", "拍攝腳本"],
    toolboxCTA: "免費領取（Soon）",

    sectionLatest: "最新內容",
    latestHint: "近期影片與文章（會自動更新）",

    sectionAbout: "關於我",
    aboutBody:
      "嗨，我是 Perkin，正在把創作與創業結合。過去兩年我持續拍攝與分享，現在更專注在把每一次的學習變成大家能用的東西。",

    sectionCTA: "一起出發",
    sectionCTABody:
      "訂閱信每週一次：精選工具、學習重點、創業心情。",
    subscribePlaceholder: "你的 Email",
    subscribeBtn: "訂閱",

    footerLeft: "© " + new Date().getFullYear() + " Oshen Studio",
    footerRight: "Made with curiosity & caffeine",

    nav: {
      pillars: "主軸",
      toolbox: "工具箱",
      latest: "最新",
      about: "關於",
      contact: "聯絡"
    }
  },
  en: {
    langLabel: "EN",
    brandKicker: "Student Founders · AI · Tools",
    heroTitle: "Oshen Studio",
    heroSubtitle:
      "A student-first brand for entrepreneurship: real founder diaries, practical toolkits, and AI/startup trends. Fewer pitfalls, faster progress.",
    ctaPrimary: "Start Exploring",
    ctaSecondary: "Toolbox",
    trustNote: "Tiny steps, every day.",

    sectionPillars: "Three Pillars",
    pillars: [
      {
        icon: <Lightbulb className="h-6 w-6" />,
        title: "Founder Diaries: Students Who Build",
        points: [
          "Real 0→1 journey",
          "Mindset, setbacks, growth",
          "Docu / chill vlog style"
        ],
        value: "Be brave. Be real. There’s no single right path—only people walking with you."
      },
      {
        icon: <Wrench className="h-6 w-6" />,
        title: "Tooling: Student Toolbox",
        points: [
          "Plug-and-play, low barrier",
          "Notion · n8n · Zapier · Make",
          "Efficiency = time capital"
        ],
        value: "Practical, clear, fast. Time saved with tools is your biggest asset."
      },
      {
        icon: <TrendingUp className="h-6 w-6" />,
        title: "AI & Startups: Fun Trends",
        points: [
          "Breakout cases worldwide",
          "AI × biz models × markets",
          "Playful edits that hook"
        ],
        value: "Fresh and fun, with depth. See the trendlines; find your edge."
      }
    ],

    sectionToolbox: "Toolbox",
    toolboxNote:
      "We bundle tutorials, templates, and automations into a grab-and-go Student Toolbox.",
    toolboxItems: ["Notion templates", "n8n workflows", "Zapier Zaps", "Make scenarios", "Study lists", "Shot scripts"],
    toolboxCTA: "Get Free (Soon)",

    sectionLatest: "Latest Posts",
    latestHint: "Recent videos & articles (auto-updating soon)",

    sectionAbout: "About",
    aboutBody:
      "Hey, I’m Perkin: blending filmmaking with building. I ship what I learn so other students can move faster.",

    sectionCTA: "Let’s Start",
    sectionCTABody:
      "1 email/week: curated tools, key learnings, and founder feels.",
    subscribePlaceholder: "Your email",
    subscribeBtn: "Subscribe",

    footerLeft: "© " + new Date().getFullYear() + " Oshen Studio",
    footerRight: "Made with curiosity & caffeine",

    nav: {
      pillars: "Pillars",
      toolbox: "Toolbox",
      latest: "Latest",
      about: "About",
      contact: "Contact"
    }
  }
};

// ------------------------ Presentational Components ------------------------
const OshenNav = ({ t, lang, setLang }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-black/10 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Rocket className="h-5 w-5" />
          <span className="font-semibold tracking-tight">Oshen Studio</span>
          <span className="text-xs text-white/60 ml-2 hidden sm:inline-block">{t.brandKicker}</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a data-testid="nav-pillars" href="#pillars" className="hover:opacity-80">{t.nav.pillars}</a>
          <a data-testid="nav-toolbox" href="#toolbox" className="hover:opacity-80">{t.nav.toolbox}</a>
          <a data-testid="nav-latest" href="#latest" className="hover:opacity-80">{t.nav.latest}</a>
          <a data-testid="nav-about" href="#about" className="hover:opacity-80">{t.nav.about}</a>
          <a data-testid="nav-contact" href="#contact" className="hover:opacity-80">{t.nav.contact}</a>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setLang(lang === "zh" ? "en" : "zh")}>{lang === "zh" ? "EN" : "中文"}</Button>
          <a href="#subscribe" className="hidden sm:block">
            <Button size="sm" className="gap-1">{t.ctaSecondary} <ArrowRight className="h-4 w-4"/></Button>
          </a>
        </div>
      </div>
    </div>
  );
};

const OshenStarfield = () => (
  <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-[#0b1220] via-[#0b1220] to-[#0e1730]" />
    <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.5) 0, rgba(255,255,255,0) 60%), radial-gradient(1px 1px at 70% 80%, rgba(255,255,255,0.4) 0, rgba(255,255,255,0) 60%), radial-gradient(1.5px 1.5px at 30% 70%, rgba(255,255,255,0.3) 0, rgba(255,255,255,0) 60%)" }} />
    <div className="absolute -inset-10 animate-[float_12s_linear_infinite] opacity-30" style={{ backgroundImage: "radial-gradient(1px 1px at 40% 40%, white 0, rgba(255,255,255,0) 60%), radial-gradient(1px 1px at 60% 60%, white 0, rgba(255,255,255,0) 60%)" }} />
    <motion.div
      initial={{ y: 40, x: -20, rotate: -6 }}
      animate={{ y: [-10, 10, -10], x: [-20, -16, -20] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute right-6 bottom-24 opacity-70"
    >
      <div className="flex items-center gap-1">
        <Rocket className="h-5 w-5" />
        <span className="text-xs">launch</span>
      </div>
    </motion.div>
    <style>{`
      @keyframes float { 0%{transform:translateY(0)} 50%{transform:translateY(-10px)} 100%{transform:translateY(0)} }
    `}</style>
  </div>
);

const OshenPillarCard = ({ title, points, value, icon }) => (
  <Card data-testid="pillar-card" className="bg-white/5 border-white/10 hover:bg-white/7.5 transition-colors rounded-2xl">
    <CardContent className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 rounded-xl bg-white/5 border border-white/10">{icon}</div>
        <h3 className="font-semibold tracking-tight">{title}</h3>
      </div>
      <ul className="text-sm space-y-1 list-disc list-inside text-white/80">
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-white/70">{value}</p>
    </CardContent>
  </Card>
);

const OshenBadge = ({ children }) => (
  <span className="px-2 py-1 rounded-full border border-white/15 bg-white/5 text-xs">{children}</span>
);

// ------------------------------- Main Component -------------------------------
export default function OshenLanding() {
  const [lang, setLang] = useState("zh");
  const t = OSHEN_COPY[lang];
  const [testLog, setTestLog] = useState([]);
  const debug = useMemo(() => {
    if (typeof window === "undefined") return false;
    const q = new URLSearchParams(window.location.search);
    return q.get("debug") === "1";
  }, []);

  // -----------------------------
  // Lightweight runtime smoke tests (kept previous, then added more)
  // -----------------------------
  useEffect(() => {
    function assert(cond, msg) {
      if (!cond) throw new Error(msg);
    }
    const log = (status, name, info = "") => {
      setTestLog((prev) => [...prev, { status, name, info }]);
    };

    // ---- Existing tests (DO NOT MODIFY) ----
    try {
      // Test 1: copy structure
      assert(!!OSHEN_COPY.zh && !!OSHEN_COPY.en, "i18n copies must exist");
      assert(OSHEN_COPY.zh.pillars.length === 3, "zh pillars must be 3");
      assert(OSHEN_COPY.en.pillars.length === 3, "en pillars must be 3");

      // Test 2: nav links render
      const navIds = ["pillars", "toolbox", "latest", "about", "contact"];
      navIds.forEach((id) => {
        const el = document.querySelector(`a[href="#${id}"]`);
        assert(!!el, `nav link #${id} should exist`);
      });

      // Test 3: language toggle reflection
      const zhCta = OSHEN_COPY.zh.ctaSecondary;
      const enCta = OSHEN_COPY.en.ctaSecondary;
      assert(zhCta !== enCta, "CTA secondary label should differ across locales");

      // Test 4: Guard check for problematic globals (read-only, obfuscated key)
      const key = ["SHOP","PAY","MERCHANT","URL","LOGIN","PAGE","SELECTOR","TYPE3"].join("_");
      const hasProblematicGlobal = typeof window !== "undefined" && Object.prototype.hasOwnProperty.call(window, key);
      console.debug("[Oshen] Host injected global present? ", hasProblematicGlobal);

      console.info("[Oshen] Smoke tests passed ✅");
    } catch (err) {
      console.error("[Oshen] Smoke test failed:", err);
    }

    // ---- Additional tests (NEW) ----
    try {
      // Test 5: exactly three pillar cards render
      const cards = document.querySelectorAll('[data-testid="pillar-card"]');
      if (cards.length !== 3) throw new Error(`expected 3 pillar cards, got ${cards.length}`);
      log("pass", "three_pillar_cards");
    } catch (e) { log("fail", "three_pillar_cards", String(e)); }

    try {
      // Test 6: subscribe form exists and is required email
      const form = document.querySelector('form[data-testid="subscribe-form"]') || document.querySelector('form');
      if (!form) throw new Error("subscribe form not found");
      const input = form.querySelector("input[type='email']");
      if (!input) throw new Error("email input not found");
      if (!input.hasAttribute('required')) throw new Error("email input should be required");
      log("pass", "subscribe_form_exists");
    } catch (e) { log("fail", "subscribe_form_exists", String(e)); }

    try {
      // Test 7: locale strings differ for heroSubtitle
      if (OSHEN_COPY.zh.heroSubtitle === OSHEN_COPY.en.heroSubtitle) throw new Error("heroSubtitle should differ across locales");
      log("pass", "locale_heroSubtitle_differs");
    } catch (e) { log("fail", "locale_heroSubtitle_differs", String(e)); }

    try {
      // Test 8: ensure our module didn't leak OSHEN_* names to window
      if (typeof window !== 'undefined') {
        const leaked = Object.getOwnPropertyNames(window).some((k) => k.startsWith('OSHEN_'));
        if (leaked) throw new Error('module leaked OSHEN_* globals');
      }
      log("pass", "no_module_global_leaks");
    } catch (e) { log("fail", "no_module_global_leaks", String(e)); }
  }, []);

  return (
    <div className="min-h-screen text-white antialiased">
      <OshenStarfield />
      <OshenNav t={t} lang={lang} setLang={setLang} />

      {/* Hero */}
      <section className="pt-28 pb-16">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-4 text-white/70">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm">{t.brandKicker}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              {t.heroTitle}
            </h1>
            <p className="mt-4 text-white/80 leading-relaxed">
              {t.heroSubtitle}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#pillars"><Button className="gap-1">{t.ctaPrimary} <ArrowRight className="h-4 w-4" /></Button></a>
              <a href="#toolbox"><Button variant="secondary" className="bg-white text-black hover:bg-white/90">{t.ctaSecondary}</Button></a>
            </div>
            <p className="mt-4 text-sm text-white/60">{t.trustNote}</p>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section id="pillars" className="py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">{t.sectionPillars}</h2>
            <div className="hidden sm:flex items-center gap-2 text-xs text-white/70">
              <OshenBadge>Real</OshenBadge>
              <OshenBadge>Practical</OshenBadge>
              <OshenBadge>Fun</OshenBadge>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {t.pillars.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <OshenPillarCard {...p} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Toolbox */}
      <section id="toolbox" className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Wrench className="h-5 w-5" /> {t.sectionToolbox}</h2>
              <p className="text-white/80 mb-4">{t.toolboxNote}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {t.toolboxItems.map((it, i) => (
                  <OshenBadge key={i}>{it}</OshenBadge>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <a href="#subscribe"><Button className="gap-1">{t.toolboxCTA} <ArrowRight className="h-4 w-4" /></Button></a>
                <a href="#latest" className="text-sm underline hover:opacity-80">{lang === "zh" ? "看看示範內容" : "See examples"}</a>
              </div>
            </div>
            <Card className="bg-white/5 border-white/10 rounded-2xl">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { name: "Notion", desc: lang === "zh" ? "專屬模版" : "Custom templates" },
                    { name: "n8n", desc: lang === "zh" ? "自動化工作流" : "Automation flows" },
                    { name: "Zapier", desc: lang === "zh" ? "跨平台整合" : "Cross-app zaps" },
                    { name: "Make", desc: lang === "zh" ? "圖形化流程" : "Visual scenarios" },
                  ].map((tool, i) => (
                    <div key={i} className="p-4 rounded-xl bg-black/20 border border-white/10">
                      <div className="font-medium">{tool.name}</div>
                      <div className="text-white/70 text-xs">{tool.desc}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest */}
      <section id="latest" className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2"><BookOpen className="h-5 w-5" /> {t.sectionLatest}</h2>
          <p className="text-white/70 text-sm mb-4">{t.latestHint}</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[1,2,3].map((n) => (
              <Card key={n} className="bg-white/5 border-white/10 rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video bg-black/30 flex items-center justify-center">
                    <span className="text-white/60 text-sm">Video/Thumb #{n}</span>
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-medium mb-1">{lang === "zh" ? `最新內容標題 ${n}` : `Latest post ${n}`}</div>
                    <div className="text-xs text-white/70 line-clamp-2">{lang === "zh" ? "這裡放入你最近的影片或文章摘要。" : "Insert a short summary of your recent video/article."}</div>
                    <div className="mt-3 flex items-center gap-3 text-xs">
                      <a href="#" className="inline-flex items-center gap-1 underline"><Youtube className="h-3 w-3" /> YouTube</a>
                      <a href="#" className="inline-flex items-center gap-1 underline"><Instagram className="h-3 w-3" /> Instagram</a>
                      <a href="#" className="inline-flex items-center gap-1 underline"><LinkIcon className="h-3 w-3" /> Link</a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About + Subscribe */}
      <section id="about" className="py-12">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-3">
            <h2 className="text-2xl font-semibold mb-2">{t.sectionAbout}</h2>
            <p className="text-white/80 leading-relaxed">{t.aboutBody}</p>
          </div>
          <div id="subscribe" className="md:col-span-2">
            <Card className="bg-white/5 border-white/10 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items中心 gap-2 mb-2"><Mail className="h-5 w-5" /><h3 className="font-semibold">{t.sectionCTA}</h3></div>
                <p className="text-sm text-white/80 mb-3">{t.sectionCTABody}</p>
                <form
                  data-testid="subscribe-form"
                  onSubmit={(e)=>{
                    e.preventDefault();
                    const form = e.currentTarget;
                    const email = form.querySelector("input[type='email']")?.value || "";
                    // TODO: Replace with your ESP API call.
                    alert((lang === 'zh' ? '已訂閱：' : 'Subscribed: ') + email + ' (Demo)');
                  }}
                  className="flex w-full items-center gap-2"
                >
                  <Input type="email" required placeholder={t.subscribePlaceholder} className="bg黑/30 border-white/15" />
                  <Button type="submit">{t.subscribeBtn}</Button>
                </form>
                <p className="text-xs text-white/60 mt-2">{lang === "zh" ? "我們尊重你的信箱，不會亂寄垃圾信。" : "No spam. Unsubscribe anytime."}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-white/70">{t.footerLeft}</div>
          <div className="flex items-center gap-4 text-sm">
            <a href="https://www.youtube.com/@" target="_blank" rel="noreferrer" className="underline inline-flex items-center gap-1"><Youtube className="h-4 w-4"/>YouTube</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="underline inline-flex items-center gap-1"><Instagram className="h-4 w-4"/>Instagram</a>
            <a href="mailto:hello@oshen.studio" className="underline inline-flex items-center gap-1"><Mail className="h-4 w-4"/>Email</a>
          </div>
          <div className="text-xs text白/60">{t.footerRight}</div>
        </div>
      </footer>

      {/* Debug Panel (optional) */}
      {debug && (
        <div className="fixed bottom-4 right-4 max-w-sm p-3 rounded-xl bg-black/70 border border-white/15 text-xs space-y-1">
          <div className="font-semibold">Debug Panel</div>
          {testLog.length === 0 && <div>No test logs yet.</div>}
          {testLog.map((t,i)=> (
            <div key={i} className={t.status === 'pass' ? 'text-green-300' : 'text-red-300'}>
              [{t.status}] {t.name} {t.info && `- ${t.info}`}
            </div>
          ))}
          <div className="text-white/60">Add <span className="px-1 rounded bg-white/10">?debug=1</span> to URL to toggle.</div>
        </div>
      )}
    </div>
  );
}
