"use client";
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

import { useEffect, useRef } from "react";

export default function InterviewsGlobe() {
  const sectionRef = useRef<HTMLElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const section = sectionRef.current;
    if (!section) return;

    // Load GSAP from CDN (used by original Anthropic code)
    let destroyGlobe: (() => void) | undefined;
    const gsapScript = document.createElement("script");
    gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    gsapScript.onload = () => {
      const stScript = document.createElement("script");
      stScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
      stScript.onload = () => {
        initAnimations(section);
        destroyGlobe = loadTopojsonThenGlobe(section);
      };
      document.head.appendChild(stScript);
    };
    document.head.appendChild(gsapScript);

    return () => {
      destroyGlobe?.();

      // Cleanup ScrollTrigger instances on unmount
      if (typeof window !== "undefined" && (window as any).ScrollTrigger) {
        (window as any).ScrollTrigger.getAll().forEach((st: any) => st.kill());
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-scroll="section"
      className="_81k-interviews-cta_section"
    >
      <div data-scroll="bg" className="_81k-cta_scroll-bg">
        <div className="_81k-cta_overlay" />
        <div data-scroll="container" className="_81k-cta_container">
          <div data-scroll="title-wrap" className="_81k-cta_title-wrap">
            <h2 data-scroll="title" className="_81k-cta_title">
              What 81,000 people want from&nbsp;AI
            </h2>
            <p data-scroll="subtitle" className="_81k-cta_subtitle">
              The largest study ever done on AI and how it&apos;s shaping lives
              around the world.
            </p>
            <div data-scroll="button">
              <div className="btn_main_wrap is-tertiary-fill">
                <div className="u-hide-if-empty u-icon-16 tertiary-5" />
                <div aria-hidden="true" className="btn_main_text tertiary-4">
                  Read more
                </div>
                <div className="u-hide-if-empty u-icon-16 tertiary-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    className="g_svg"
                  >
                    <path
                      d="M25.9758 15.6633L17.5383 24.1008C17.3624 24.2767 17.1238 24.3755 16.875 24.3755C16.6262 24.3755 16.3876 24.2767 16.2117 24.1008C16.0358 23.9248 15.937 23.6863 15.937 23.4375C15.937 23.1887 16.0358 22.9501 16.2117 22.7742L23.0496 15.9375H4.6875C4.43886 15.9375 4.2004 15.8387 4.02459 15.6629C3.84877 15.4871 3.75 15.2486 3.75 15C3.75 14.7513 3.84877 14.5129 4.02459 14.3371C4.2004 14.1612 4.43886 14.0625 4.6875 14.0625H23.0496L16.2117 7.22575C16.0358 7.04984 15.937 6.81125 15.937 6.56247C15.937 6.31369 16.0358 6.0751 16.2117 5.89919C16.3876 5.72328 16.6262 5.62445 16.875 5.62445C17.1238 5.62445 17.3624 5.72328 17.5383 5.89919L25.9758 14.3367C26.0629 14.4238 26.1321 14.5272 26.1793 14.641C26.2265 14.7548 26.2507 14.8768 26.2507 15C26.2507 15.1232 26.2265 15.2452 26.1793 15.359C26.1321 15.4728 26.0629 15.5762 25.9758 15.6633Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div data-scroll="embed" className="_81k-cta_embed">
            <div id="viewport">
              <svg
                id="globe-svg"
                className="globe-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1400 1000"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <clipPath id="fill-clip">
                    <circle id="fill-clip-c" cx="700" cy="500" r="559" />
                  </clipPath>
                  <filter
                    id="glow-blur"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feGaussianBlur stdDeviation="5" />
                  </filter>
                  <clipPath id="glow-clip">
                    <path id="glow-clip-path" d="" />
                  </clipPath>
                </defs>
                <rect x="0" y="0" width="1400" height="1000" fill="#E8E6DC" />
                <circle
                  id="disk"
                  cx="700"
                  cy="500"
                  r="560"
                  fill="#E8E6DC"
                  stroke="none"
                />
                {/* back-hemisphere grid */}
                <g fill="none">
                  <path
                    id="back-grid"
                    strokeWidth="0.35"
                    stroke="rgba(20,20,19,0.063)"
                    d=""
                  />
                </g>
                {/* country fills */}
                <path
                  id="country-fill"
                  fill="none"
                  fillRule="evenodd"
                  stroke="none"
                  clipPath="url(#fill-clip)"
                  style={{ opacity: 0, transition: "opacity 0.6s ease-in" }}
                  d=""
                />
                {/* front-hemisphere grid */}
                <g fill="none">
                  <path
                    id="front-grid"
                    strokeWidth="0.4"
                    stroke="rgba(20,20,19,0.18)"
                    d=""
                  />
                  <path
                    id="bold-grid"
                    strokeWidth="0.5"
                    stroke="rgba(20,20,19,0.25)"
                    d=""
                  />
                </g>
                {/* country borders */}
                <path
                  id="countries"
                  fill="none"
                  stroke="rgba(20,20,19,0.22)"
                  strokeWidth="0.45"
                  d=""
                  style={{ opacity: 0, transition: "opacity 0.8s ease-in" }}
                />
                {/* US state borders */}
                <path
                  id="states"
                  fill="none"
                  stroke="rgba(20,20,19,0.12)"
                  strokeWidth="0.3"
                  d=""
                  style={{ opacity: 0, transition: "opacity 0.8s ease-in" }}
                />
                {/* hover outline */}
                <path
                  id="hover-outline"
                  fill="none"
                  stroke="rgba(20,20,19,0.35)"
                  strokeWidth="0.6"
                  d=""
                />
                {/* glow */}
                <g
                  clipPath="url(#glow-clip)"
                  style={{ pointerEvents: "none" }}
                >
                  <path
                    id="glow"
                    fill="none"
                    stroke="#eda100"
                    strokeWidth="8"
                    filter="url(#glow-blur)"
                    strokeOpacity="0"
                    d=""
                  />
                </g>
                {/* focus outline */}
                <path
                  id="focus-outline"
                  fill="none"
                  stroke="#eda100"
                  strokeWidth="1.2"
                  strokeOpacity="0"
                  d=""
                />
                {/* dots */}
                <g
                  fill="none"
                  strokeLinecap="round"
                  style={{ pointerEvents: "none" }}
                >
                  <path
                    id="dots-dim"
                    stroke="rgba(20,20,19,0.28)"
                    strokeWidth="2.4"
                    d=""
                  />
                  <path
                    id="dots-fade"
                    stroke="#141413"
                    strokeWidth="2.4"
                    strokeOpacity="0"
                    d=""
                  />
                  <path
                    id="dots-main"
                    stroke="#141413"
                    strokeWidth="2.4"
                    strokeOpacity="0"
                    d=""
                  />
                  <path
                    id="dots-green"
                    stroke="#2d8a56"
                    strokeWidth="2.4"
                    d=""
                  />
                  <path
                    id="dots-blue"
                    stroke="#4a72b0"
                    strokeWidth="2.4"
                    d=""
                  />
                  <path
                    id="dots-green-pulse"
                    stroke="#2d8a56"
                    strokeWidth="4"
                    strokeOpacity="0"
                    d=""
                  />
                  <path
                    id="dots-blue-pulse"
                    stroke="#4a72b0"
                    strokeWidth="4"
                    strokeOpacity="0"
                    d=""
                  />
                  <path id="wiper-g" stroke="#2d8a56" strokeWidth="2.4" d="" />
                  <path id="wiper-b" stroke="#4a72b0" strokeWidth="2.4" d="" />
                </g>
                {/* labels */}
                <g id="labels" />
                {/* rim circles */}
                <circle
                  id="rim-in"
                  cx="700"
                  cy="500"
                  r="560"
                  fill="none"
                  stroke="rgba(20,20,19,0.55)"
                  strokeWidth="0.6"
                />
                <circle
                  id="rim-out"
                  cx="700"
                  cy="500"
                  r="566"
                  fill="none"
                  stroke="rgba(20,20,19,0.35)"
                  strokeWidth="0.4"
                />
              </svg>
              {/* Quote overlay */}
              <div id="quote-overlay">
                <div id="step-dots" />
                <div id="country-label" />
                <div id="quote-text" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── GSAP scroll animations ── */
function initAnimations(section: HTMLElement) {
  const gsap = (window as any).gsap;
  const ScrollTrigger = (window as any).ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReducedMotion) return;

  const containerMargin = window.matchMedia("(max-width: 479px)").matches
    ? "2rem"
    : "4rem";
  const bg = section.querySelector('[data-scroll="bg"]');
  const container = section.querySelector('[data-scroll="container"]');
  const titleWrap = section.querySelector('[data-scroll="title-wrap"]');
  const title = section.querySelector('[data-scroll="title"]');
  const subtitle = section.querySelector('[data-scroll="subtitle"]');
  const button = section.querySelector('[data-scroll="button"]');
  const embed = section.querySelector('[data-scroll="embed"]');

  gsap
    .timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 30%",
        end: "bottom 70%",
        scrub: 0.8,
      },
    })
    .to(bg, {
      maxWidth: "100%",
      marginTop: 0,
      marginBottom: 0,
      borderRadius: "0px",
      duration: 1.25,
      ease: "power2.out",
    }, 0)
    .to(container, {
      marginTop: containerMargin,
      marginBottom: containerMargin,
      duration: 1.25,
      ease: "power2.out",
    }, 0.05);

  gsap
    .timeline({
      scrollTrigger: {
        trigger: titleWrap,
        start: "top 80%",
        end: "bottom top",
        toggleActions: "play none none reverse",
      },
    })
    .to(title, { opacity: 1, y: "0%", duration: 0.6, ease: "power2.out" }, 0.5)
    .to(embed, { opacity: 1, duration: 2, ease: "power2.out" }, 0.5)
    .to(subtitle, { opacity: 1, y: "0%", duration: 0.9, ease: "power2.out" }, 0.6)
    .to(button, { opacity: 1, y: "0%", duration: 1.3, ease: "power2.out" }, 0.75);
}

/* ── Globe rendering engine ── */
function loadTopojsonThenGlobe(section: HTMLElement) {
  let destroyGlobe: (() => void) | undefined;
  let cancelled = false;
  const topoScript = document.createElement("script");
  topoScript.src =
    "https://cdn.prod.website-files.com/67ce28cfec624e2b733f8a52/69bad6d788beb39af77f187c_topojson-client.txt";
  topoScript.onload = () => {
    if (cancelled) {
      return;
    }

    destroyGlobe = initGlobe(section);
  };
  document.head.appendChild(topoScript);

  return () => {
    cancelled = true;
    destroyGlobe?.();
  };
}

function initGlobe(section: HTMLElement) {
  const topojson = (window as any).topojson;
  if (!topojson) return () => {};

  // ── Constants ──
  const GLOBE_W = 1400, GLOBE_H = 1000;
  const GLOBE_CX = GLOBE_W / 2, GLOBE_CY = GLOBE_H / 2;
  const RADIUS = 560;
  const DEG = Math.PI / 180;
  const GRID_STEP = 5;
  const DOT_RADIUS = 1.2;
  const SF_STEP_DUR = 7000;
  const SF_DWELL = 0.78;
  const SF_SCROLL_PER_STEP = 1000;
  const SF_IDLE_TILT = 0;
  const SF_IDLE_ROLL = 0;

  // ── Country names ──
  const COUNTRY_NAMES: Record<string, string> = {
    AF: "AFGHANISTAN", AL: "ALBANIA", DZ: "ALGERIA", AR: "ARGENTINA",
    AU: "AUSTRALIA", AT: "AUSTRIA", AZ: "AZERBAIJAN", BD: "BANGLADESH",
    BE: "BELGIUM", BO: "BOLIVIA", BR: "BRAZIL", BG: "BULGARIA",
    CA: "CANADA", CM: "CAMEROON", CL: "CHILE", CN: "CHINA",
    CO: "COLOMBIA", HR: "CROATIA", CZ: "CZECHIA", DK: "DENMARK",
    EC: "ECUADOR", EG: "EGYPT", ET: "ETHIOPIA", FI: "FINLAND",
    FR: "FRANCE", GE: "GEORGIA", DE: "GERMANY", GH: "GHANA",
    GR: "GREECE", GT: "GUATEMALA", HN: "HONDURAS", HU: "HUNGARY",
    IN: "INDIA", ID: "INDONESIA", IQ: "IRAQ", IE: "IRELAND",
    IL: "ISRAEL", IT: "ITALY", JP: "JAPAN", JO: "JORDAN",
    KZ: "KAZAKHSTAN", KE: "KENYA", KW: "KUWAIT", LB: "LEBANON",
    MY: "MALAYSIA", MX: "MEXICO", MA: "MOROCCO", MM: "MYANMAR",
    NP: "NEPAL", NL: "NETHERLANDS", NZ: "NEW ZEALAND", NG: "NIGERIA",
    NO: "NORWAY", PK: "PAKISTAN", PE: "PERU", PH: "PHILIPPINES",
    PL: "POLAND", PT: "PORTUGAL", QA: "QATAR", RO: "ROMANIA",
    RU: "RUSSIA", SA: "SAUDI ARABIA", RS: "SERBIA", SG: "SINGAPORE",
    ZA: "SOUTH AFRICA", KR: "SOUTH KOREA", ES: "SPAIN", LK: "SRI LANKA",
    SE: "SWEDEN", CH: "SWITZERLAND", TW: "TAIWAN", TZ: "TANZANIA",
    TH: "THAILAND", TN: "TUNISIA", TR: "TURKEY", UA: "UKRAINE",
    AE: "UNITED ARAB EMIRATES", GB: "UNITED KINGDOM", US: "UNITED STATES",
    UZ: "UZBEKISTAN", VE: "VENEZUELA", VN: "VIETNAM", ZW: "ZIMBABWE",
    RW: "RWANDA",
  };

  // ── Step centroids [lon, lat] ──
  const CENTROIDS: Record<string, [number, number]> = {
    AF: [67.7, 33.9], AL: [20.2, 41.2], DZ: [1.7, 28], AR: [-63.6, -38.4],
    AU: [133.8, -25.3], AT: [14.5, 47.5], AZ: [47.6, 40.1], BD: [90.4, 23.7],
    BE: [4.5, 50.5], BO: [-64.7, -16.3], BR: [-51.9, -14.2], BG: [25.5, 42.7],
    CA: [-96.8, 60.2], CL: [-71.5, -35.7], CN: [104.2, 35.9], CO: [-74.3, 4.1],
    HR: [15.2, 45.1], CZ: [15.5, 49.8], DK: [10, 56.3], EC: [-78.1, -1.8],
    EG: [30.8, 26.8], ET: [40.5, 9.1], FI: [26, 64], FR: [2.2, 46.2],
    GE: [43.4, 42.3], DE: [10.5, 51.1], GH: [-1, 8], GR: [21.8, 39.1],
    GT: [-90.2, 15.8], HU: [19.5, 47.2], IN: [78.9, 20.6], ID: [113.9, -0.8],
    IQ: [43.7, 33.2], IE: [-8.2, 53.4], IL: [34.9, 31], IT: [12.6, 41.9],
    JP: [138.3, 36.2], JO: [36.2, 31.2], KZ: [66.9, 48], KE: [37.9, 0],
    KW: [47.5, 29.3], LB: [35.9, 33.9], MY: [109.7, 4.2], MX: [-102.6, 24],
    MA: [-7.1, 31.8], MM: [96.7, 19.2], NP: [84.1, 28.4], NL: [5.3, 52.1],
    NZ: [172.5, -40.9], NG: [8.7, 9.1], NO: [8.5, 60.5], PK: [69.3, 30.4],
    PE: [-75, -9.2], PH: [122.9, 12.9], PL: [19.1, 52], PT: [-8.2, 39.6],
    QA: [51.2, 25.4], RO: [24.9, 45.9], RU: [99, 61.5], SA: [45.1, 24.7],
    RS: [21, 44], SG: [103.8, 1.4], ZA: [22.9, -30.6], KR: [127.8, 36],
    ES: [-3.7, 40.5], LK: [80.7, 7.9], SE: [18.6, 62.2], CH: [8.2, 46.8],
    TW: [120.9, 23.7], TZ: [34.9, -6.4], TH: [101, 15.9], TN: [9.6, 33.9],
    TR: [35.2, 39], UA: [31.4, 49], AE: [53.8, 23.4], GB: [-3.4, 55.4],
    US: [-98.5, 39.5], UZ: [64.6, 41.4], VE: [-66.6, 8], VN: [108.3, 14.1],
    ZW: [29.2, -20], RW: [29.9, -2],
  };

  // ── Quote steps ──
  const STEPS = [
    { code: "US", label: "UNITED STATES", quote: "We\u2019ve found a unicorn and are using it to pull a plow." },
    { code: "GT", label: "GUATEMALA", quote: "I feel like I\u2019m creating more dependency than knowledge." },
    { code: "MA", label: "MOROCCO", quote: "It helps me finish my work faster so I can have time for my family." },
    { code: "NG", label: "NIGERIA", quote: "No need for me if AI can do my work." },
    { code: "DZ", label: "ALGERIA", quote: "I think I can even start a business alone and my partner will be AI." },
    { code: "DK", label: "DENMARK", quote: "Everybody wishes they could experience the first fire, the first glimpse of electricity. This is now." },
    { code: "IT", label: "ITALY", quote: "AI should learn to say two things: \u2018I don\u2019t know\u2019 and \u2018you\u2019re wrong.\u2019" },
    { code: "CH", label: "SWITZERLAND", quote: "Who else would be available at 2am in a moment of anxiety?" },
    { code: "DE", label: "GERMANY", quote: "I count myself lucky that I am living in a timeline where I can experience you." },
    { code: "ID", label: "INDONESIA", quote: "The good news is that everyone can use AI, and the bad news is that everyone can use AI." },
  ];

  // ── ISO numeric → alpha-2 ──
  const ISO_NUM: Record<string, string> = {
    "004": "AF", "008": "AL", "012": "DZ", "032": "AR", "036": "AU",
    "040": "AT", "031": "AZ", "050": "BD", "056": "BE", "068": "BO",
    "076": "BR", "100": "BG", "124": "CA", "120": "CM", "152": "CL",
    "156": "CN", "170": "CO", "191": "HR", "203": "CZ", "208": "DK",
    "218": "EC", "818": "EG", "231": "ET", "246": "FI", "250": "FR",
    "268": "GE", "276": "DE", "288": "GH", "300": "GR", "320": "GT",
    "340": "HN", "348": "HU", "356": "IN", "360": "ID", "368": "IQ",
    "372": "IE", "376": "IL", "380": "IT", "392": "JP", "400": "JO",
    "398": "KZ", "404": "KE", "414": "KW", "422": "LB", "458": "MY",
    "484": "MX", "504": "MA", "104": "MM", "524": "NP", "528": "NL",
    "554": "NZ", "566": "NG", "578": "NO", "586": "PK", "604": "PE",
    "608": "PH", "616": "PL", "620": "PT", "634": "QA", "642": "RO",
    "643": "RU", "682": "SA", "688": "RS", "702": "SG", "710": "ZA",
    "410": "KR", "724": "ES", "144": "LK", "752": "SE", "756": "CH",
    "158": "TW", "834": "TZ", "764": "TH", "788": "TN", "792": "TR",
    "804": "UA", "784": "AE", "826": "GB", "840": "US", "860": "UZ",
    "862": "VE", "704": "VN", "716": "ZW", "646": "RW",
  };

  // ── FIPS → postal for US states ──
  const FIPS: Record<string, string> = {
    "01": "AL", "04": "AZ", "05": "AR", "06": "CA", "08": "CO",
    "09": "CT", "10": "DE", "11": "DC", "12": "FL", "13": "GA",
    "16": "ID", "17": "IL", "18": "IN", "19": "IA", "20": "KS",
    "21": "KY", "22": "LA", "23": "ME", "24": "MD", "25": "MA",
    "26": "MI", "27": "MN", "28": "MS", "29": "MO", "30": "MT",
    "31": "NE", "32": "NV", "33": "NH", "34": "NJ", "35": "NM",
    "36": "NY", "37": "NC", "38": "ND", "39": "OH", "40": "OK",
    "41": "OR", "42": "PA", "44": "RI", "45": "SC", "46": "SD",
    "47": "TN", "48": "TX", "49": "UT", "50": "VT", "51": "VA",
    "53": "WA", "54": "WV", "55": "WI", "56": "WY",
  };

  const US_EXCLUDE = new Set([
    "Alaska", "Hawaii", "Puerto Rico", "Guam",
    "United States Virgin Islands", "American Samoa",
    "Commonwealth of the Northern Mariana Islands",
  ]);

  // ── Respondent data ──
  const BY_COUNTRY: Record<string, { n: number; sentiment: number }> = {
    US: { n: 27000, sentiment: 0.62 }, CA: { n: 2100, sentiment: 0.65 },
    GB: { n: 2900, sentiment: 0.58 }, DE: { n: 1800, sentiment: 0.55 },
    FR: { n: 1200, sentiment: 0.54 }, AU: { n: 1400, sentiment: 0.63 },
    IN: { n: 2300, sentiment: 0.72 }, BR: { n: 1000, sentiment: 0.68 },
    JP: { n: 780, sentiment: 0.48 }, KR: { n: 580, sentiment: 0.52 },
    MX: { n: 520, sentiment: 0.6 }, IT: { n: 460, sentiment: 0.53 },
    ES: { n: 420, sentiment: 0.56 }, NL: { n: 390, sentiment: 0.58 },
    SE: { n: 330, sentiment: 0.6 }, CH: { n: 290, sentiment: 0.57 },
    AT: { n: 260, sentiment: 0.55 }, PL: { n: 250, sentiment: 0.59 },
    NO: { n: 230, sentiment: 0.62 }, DK: { n: 210, sentiment: 0.61 },
    FI: { n: 200, sentiment: 0.63 }, IE: { n: 180, sentiment: 0.6 },
    PT: { n: 160, sentiment: 0.54 }, BE: { n: 160, sentiment: 0.55 },
    NZ: { n: 150, sentiment: 0.64 }, IL: { n: 140, sentiment: 0.5 },
    RO: { n: 130, sentiment: 0.58 }, CZ: { n: 120, sentiment: 0.56 },
    HU: { n: 120, sentiment: 0.54 }, GR: { n: 110, sentiment: 0.5 },
    UA: { n: 100, sentiment: 0.48 }, TR: { n: 100, sentiment: 0.52 },
    ZA: { n: 90, sentiment: 0.6 }, AR: { n: 80, sentiment: 0.62 },
    CL: { n: 80, sentiment: 0.58 }, CO: { n: 70, sentiment: 0.63 },
    PH: { n: 60, sentiment: 0.68 }, SG: { n: 60, sentiment: 0.65 },
    MY: { n: 50, sentiment: 0.62 }, TH: { n: 50, sentiment: 0.64 },
    ID: { n: 40, sentiment: 0.66 }, PK: { n: 30, sentiment: 0.58 },
    NG: { n: 30, sentiment: 0.7 }, EG: { n: 30, sentiment: 0.55 },
    KE: { n: 30, sentiment: 0.72 }, AL: { n: 20, sentiment: 0.6 },
    RU: { n: 130, sentiment: 0.45 }, CN: { n: 100, sentiment: 0.58 },
    TW: { n: 60, sentiment: 0.6 }, VN: { n: 40, sentiment: 0.65 },
    AE: { n: 50, sentiment: 0.62 }, SA: { n: 50, sentiment: 0.55 },
    JO: { n: 20, sentiment: 0.52 }, GT: { n: 20, sentiment: 0.58 },
    MA: { n: 30, sentiment: 0.56 }, DZ: { n: 20, sentiment: 0.54 },
  };

  const BY_STATE: Record<string, { n: number; sentiment: number }> = {
    CA: { n: 3280, sentiment: 0.6 }, TX: { n: 2460, sentiment: 0.58 },
    FL: { n: 1910, sentiment: 0.56 }, NY: { n: 1640, sentiment: 0.62 },
    PA: { n: 1090, sentiment: 0.55 }, IL: { n: 1090, sentiment: 0.58 },
    OH: { n: 980, sentiment: 0.54 }, GA: { n: 900, sentiment: 0.57 },
    NC: { n: 870, sentiment: 0.56 }, MI: { n: 820, sentiment: 0.55 },
    NJ: { n: 770, sentiment: 0.59 }, VA: { n: 720, sentiment: 0.6 },
    WA: { n: 660, sentiment: 0.63 }, AZ: { n: 620, sentiment: 0.57 },
    MA: { n: 600, sentiment: 0.62 }, TN: { n: 570, sentiment: 0.53 },
    IN: { n: 560, sentiment: 0.54 }, MO: { n: 510, sentiment: 0.53 },
    MD: { n: 510, sentiment: 0.6 }, WI: { n: 480, sentiment: 0.55 },
    CO: { n: 480, sentiment: 0.63 }, MN: { n: 470, sentiment: 0.59 },
    SC: { n: 430, sentiment: 0.54 }, AL: { n: 400, sentiment: 0.52 },
    LA: { n: 380, sentiment: 0.53 }, KY: { n: 360, sentiment: 0.52 },
    OR: { n: 350, sentiment: 0.62 }, OK: { n: 330, sentiment: 0.52 },
    CT: { n: 300, sentiment: 0.59 }, UT: { n: 270, sentiment: 0.58 },
    IA: { n: 260, sentiment: 0.55 }, NV: { n: 260, sentiment: 0.57 },
    AR: { n: 250, sentiment: 0.52 }, MS: { n: 250, sentiment: 0.51 },
    KS: { n: 240, sentiment: 0.54 }, NM: { n: 170, sentiment: 0.56 },
    NE: { n: 160, sentiment: 0.55 }, ID: { n: 160, sentiment: 0.56 },
    WV: { n: 140, sentiment: 0.5 }, ME: { n: 120, sentiment: 0.58 },
    NH: { n: 120, sentiment: 0.59 }, MT: { n: 90, sentiment: 0.56 },
    RI: { n: 90, sentiment: 0.58 }, DE: { n: 80, sentiment: 0.58 },
    SD: { n: 60, sentiment: 0.54 }, ND: { n: 60, sentiment: 0.55 },
    VT: { n: 50, sentiment: 0.6 }, WY: { n: 50, sentiment: 0.54 },
    DC: { n: 60, sentiment: 0.65 },
  };

  // ── Projection engine ──
  let _R = RADIUS;
  let _sinLat = 0, _cosLat = 1, _sinRoll = 0, _cosRoll = 1, _lon0 = 0;

  function setRotation(lon: number, lat: number, roll: number) {
    _lon0 = lon * DEG;
    const l = lat * DEG, r = roll * DEG;
    _sinLat = Math.sin(l); _cosLat = Math.cos(l);
    _sinRoll = Math.sin(r); _cosRoll = Math.cos(r);
  }

  function project(lon: number, lat: number): [number, number, number] {
    const lam = lon * DEG - _lon0, phi = lat * DEG;
    const cosPhi = Math.cos(phi), sinPhi = Math.sin(phi);
    const cosLam = Math.cos(lam), sinLam = Math.sin(lam);
    const x = cosPhi * cosLam, y = cosPhi * sinLam, z = sinPhi;
    const nx = x * _cosLat + z * _sinLat;
    const nz = -x * _sinLat + z * _cosLat;
    const ry = y * _cosRoll - nz * _sinRoll;
    const rz = y * _sinRoll + nz * _cosRoll;
    return [GLOBE_CX + _R * ry, GLOBE_CY - _R * rz, nx];
  }

  function projectLine(coords: number[][], front: boolean) {
    let d = "", wasVis = false, prevPt: [number, number, number] | null = null;
    for (let i = 0; i < coords.length; i++) {
      const pt = project(coords[i][0], coords[i][1]);
      const vis = front ? pt[2] > 0.001 : pt[2] < -0.001;
      if (vis && !wasVis) {
        if (prevPt) {
          const t = -prevPt[2] / (pt[2] - prevPt[2]);
          const hx = prevPt[0] + (pt[0] - prevPt[0]) * t;
          const hy = prevPt[1] + (pt[1] - prevPt[1]) * t;
          d += "M" + hx.toFixed(1) + " " + hy.toFixed(1) + "L" + pt[0].toFixed(1) + " " + pt[1].toFixed(1);
        } else {
          d += "M" + pt[0].toFixed(1) + " " + pt[1].toFixed(1);
        }
      } else if (vis && wasVis) {
        d += "L" + pt[0].toFixed(1) + " " + pt[1].toFixed(1);
      } else if (!vis && wasVis && prevPt) {
        const t2 = -prevPt[2] / (pt[2] - prevPt[2]);
        d += "L" + (prevPt[0] + (pt[0] - prevPt[0]) * t2).toFixed(1) + " " + (prevPt[1] + (pt[1] - prevPt[1]) * t2).toFixed(1);
      }
      wasVis = vis;
      prevPt = pt;
    }
    return d;
  }

  function projectRing(coords: number[][]) {
    const closed = coords[coords.length - 1][0] === coords[0][0] && coords[coords.length - 1][1] === coords[0][1];
    const ring = closed ? coords : coords.concat([coords[0]]);
    return projectLine(ring, true);
  }

  function geoPath(geom: any): string {
    if (!geom) return "";
    const t = geom.type;
    if (t === "LineString") return projectLine(geom.coordinates, true);
    if (t === "MultiLineString") return geom.coordinates.map((c: any) => projectLine(c, true)).join("");
    if (t === "Polygon") return geom.coordinates.map(projectRing).join("");
    if (t === "MultiPolygon") return geom.coordinates.map((p: any) => p.map(projectRing).join("")).join("");
    if (t === "GeometryCollection") return geom.geometries.map(geoPath).join("");
    return "";
  }

  // ── Graticule ──
  const SAMPLE = 2;
  function makeMeridian(lon: number) {
    const pts: number[][] = [];
    for (let lat = -90; lat <= 90; lat += SAMPLE) pts.push([lon, lat]);
    return pts;
  }
  function makeParallel(lat: number) {
    const pts: number[][] = [];
    for (let lon = -180; lon <= 180; lon += SAMPLE) pts.push([lon, lat]);
    return pts;
  }
  function buildGraticules(step: number) {
    const lines: number[][][] = [];
    for (let lon = -180; lon < 180; lon += step) lines.push(makeMeridian(lon));
    const pLat = Math.floor(85 / step) * step;
    for (let lat = -pLat; lat <= pLat; lat += step) lines.push(makeParallel(lat));
    return lines;
  }
  const gridLines = buildGraticules(GRID_STEP);
  const boldLines = [makeParallel(0)];

  // ── Dot generation ──
  function makeLcg(seed: number) {
    let s = seed >>> 0;
    return function () {
      s = (s * 1664525 + 1013904223) >>> 0;
      return (s >>> 0) / 0xffffffff;
    };
  }

  function pointInRing(lon: number, lat: number, ring: number[][]) {
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const xi = ring[i][0], yi = ring[i][1], xj = ring[j][0], yj = ring[j][1];
      if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }

  function pointInGeom(lon: number, lat: number, geom: any) {
    if (geom.type === "Polygon") {
      return pointInRing(lon, lat, geom.coordinates[0]) &&
        !geom.coordinates.slice(1).some((h: any) => pointInRing(lon, lat, h));
    }
    if (geom.type === "MultiPolygon") {
      return geom.coordinates.some((poly: any) =>
        pointInRing(lon, lat, poly[0]) && !poly.slice(1).some((h: any) => pointInRing(lon, lat, h))
      );
    }
    return false;
  }

  function geomBounds(geom: any) {
    let minLon = Infinity, minLat = Infinity, maxLon = -Infinity, maxLat = -Infinity;
    function visit(c: any) {
      if (typeof c[0] === "number") {
        if (c[0] < minLon) minLon = c[0]; if (c[0] > maxLon) maxLon = c[0];
        if (c[1] < minLat) minLat = c[1]; if (c[1] > maxLat) maxLat = c[1];
      } else c.forEach(visit);
    }
    visit(geom.coordinates);
    return [minLon, minLat, maxLon, maxLat];
  }

  function sampleInGeom(geom: any, count: number, rng: () => number) {
    const b = geomBounds(geom);
    const pts: number[][] = [], max = count * 60;
    for (let i = 0; pts.length < count && i < max; i++) {
      const lon = b[0] + rng() * (b[2] - b[0]);
      const sinMin = Math.sin(b[1] * DEG), sinMax = Math.sin(b[3] * DEG);
      const lat = Math.asin(sinMin + rng() * (sinMax - sinMin)) / DEG;
      if (pointInGeom(lon, lat, geom)) pts.push([lon, lat]);
    }
    return pts;
  }

  // ── Globe state ──
  let countryMesh: any = null;
  let stateMesh: any = null;
  let dots: number[][] | null = null;
  let hoverRegions: any[] | null = null;
  const rotation = [0, SF_IDLE_TILT, SF_IDLE_ROLL];

  // ── DOM refs ──
  const $frontGrid = document.getElementById("front-grid");
  const $boldGrid = document.getElementById("bold-grid");
  const $backGrid = document.getElementById("back-grid");
  const $countries = document.getElementById("countries");
  const $states = document.getElementById("states");
  const $focusOutline = document.getElementById("focus-outline");
  const $glow = document.getElementById("glow");
  const $glowClipPath = document.getElementById("glow-clip-path");
  const $dotsDim = document.getElementById("dots-dim");
  const $dotsFade = document.getElementById("dots-fade");
  const $dotsMain = document.getElementById("dots-main");
  const $quoteText = document.getElementById("quote-text");
  const $countryLabel = document.getElementById("country-label");
  const $stepDotsWrap = document.getElementById("step-dots");

  // ── Render ──
  let currentFocusISO: string | null = null;
  let focusRegion: any = null;

  function render(focusIdx: number, prevFocusIdx: number, focusAlpha: number) {
    _R = RADIUS;
    setRotation(rotation[0], rotation[1], rotation[2]);

    $frontGrid?.setAttribute("d", gridLines.map(l => projectLine(l, true)).join(""));
    $boldGrid?.setAttribute("d", boldLines.map(l => projectLine(l, true)).join(""));
    $backGrid?.setAttribute("d", "");

    if (countryMesh) $countries?.setAttribute("d", geoPath(countryMesh));
    if (stateMesh) $states?.setAttribute("d", geoPath(stateMesh));

    // Focus outline + glow
    if (focusRegion) {
      let fd = "";
      for (let ri = 0; ri < focusRegion.rings.length; ri++) fd += projectRing(focusRegion.rings[ri]);
      $focusOutline?.setAttribute("d", fd);
      $focusOutline?.setAttribute("stroke-opacity", String(focusAlpha));
      $glow?.setAttribute("d", fd);
      $glow?.setAttribute("stroke-opacity", String(focusAlpha * 0.25));
      if ($glowClipPath) $glowClipPath.setAttribute("d", fd);
    } else {
      $focusOutline?.setAttribute("d", "");
      $glow?.setAttribute("d", "");
      if ($glowClipPath) $glowClipPath.setAttribute("d", "");
    }

    // Dots
    if (dots) {
      let dBase = "", dDim = "", dFade = "";
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const pt = project(dot[0], dot[1]);
        if (pt[2] <= 0) continue;
        const seg = "M" + pt[0].toFixed(1) + " " + pt[1].toFixed(1) + "h0";
        const cIdx = dot[3];
        if (focusIdx >= 0 && cIdx !== undefined) {
          dDim += seg;
          if (cIdx === focusIdx) dBase += seg;
          else if (cIdx === prevFocusIdx) dFade += seg;
          continue;
        }
        dDim += seg;
      }
      $dotsMain?.setAttribute("d", dBase);
      $dotsDim?.setAttribute("d", dDim);
      $dotsFade?.setAttribute("d", dFade);
      $dotsMain?.setAttribute("stroke-opacity", String(0.8 * focusAlpha));
      $dotsFade?.setAttribute("stroke-opacity", String(0.8 * (1 - focusAlpha)));
    }
  }

  // ── Typewriter ──
  let twTimer: ReturnType<typeof setTimeout> | null = null;
  let twCode: string | null = null;
  let typewriterDone = true;

  function typewrite(text: string) {
    if (twTimer) { clearTimeout(twTimer); twTimer = null; }
    typewriterDone = false;
    if ($quoteText) $quoteText.innerHTML = '<span class="sf-tw-cursor sf-blinking"></span>';
    twTimer = setTimeout(function () {
      if ($quoteText) $quoteText.innerHTML = '\u201c<span id="sf-tw-text"></span><span class="sf-tw-cursor sf-blinking"></span>';
      const span = document.getElementById("sf-tw-text");
      if (!span) return;
      let i = 0;
      function tick() {
        if (i >= text.length) { typewriterDone = true; return; }
        span!.textContent += text[i++];
        twTimer = setTimeout(tick, 15);
      }
      tick();
    }, 1800);
  }

  // ── Step dots UI ──
  let stepDotEls: HTMLDivElement[] = [];
  function buildStepDots() {
    if (!$stepDotsWrap) return;
    $stepDotsWrap.innerHTML = "";
    stepDotEls = [];
    for (let i = 0; i < STEPS.length; i++) {
      const dot = document.createElement("div");
      dot.className = "step-dot";
      dot.dataset.idx = String(i);
      dot.addEventListener("click", function (e) {
        jumpToStep(parseInt((e.target as HTMLElement).dataset.idx!, 10));
      });
      $stepDotsWrap.appendChild(dot);
      stepDotEls.push(dot);
    }
  }
  buildStepDots();

  function updateStepDotActive(idx: number) {
    for (let i = 0; i < stepDotEls.length; i++) {
      if (i === idx) stepDotEls[i].classList.add("active");
      else stepDotEls[i].classList.remove("active");
    }
  }

  // ── Animation loop ──
  const sfLerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const sfEase = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const sfClamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));

  function sfLonDelta(from: number, to: number) {
    return ((((to - from) % 360) + 540) % 360) - 180;
  }

  const focusIndices: Record<string, number> = {};
  const TILT_OFF = 1.6;
  const targets = STEPS.map(s => {
    const c = CENTROIDS[s.code] || [0, 0];
    return [c[0], c[1] + TILT_OFF];
  });

  let curLon = targets[0][0], curLat = targets[0][1];
  let curMix = 1, virtual = 0;
  let autoStart: number | null = null, autoOffset = 0;
  let lastRenderedStep = -1, stepIdx = -1, prevStepIdx = -1;
  let lastTypingDone = true, manualJump = false;
  const EASE = 0.06;
  let animReady = false;
  let isSectionVisible = false;
  let isDocumentVisible = !document.hidden;
  let frameId: number | null = null;
  let destroyed = false;

  const syncLoopState = () => {
    const shouldRun = animReady && isSectionVisible && isDocumentVisible && !destroyed;

    if (!shouldRun) {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
      return;
    }

    if (frameId === null) {
      frameId = requestAnimationFrame(loop);
    }
  };

  const visibilityObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      isSectionVisible = entry?.isIntersecting ?? false;
      syncLoopState();
    },
    {
      threshold: 0.1
    }
  );

  visibilityObserver.observe(section);

  const onVisibilityChange = () => {
    isDocumentVisible = !document.hidden;
    syncLoopState();
  };

  document.addEventListener("visibilitychange", onVisibilityChange);

  function jumpToStep(i: number) {
    virtual = i * SF_SCROLL_PER_STEP;
    autoStart = null;
    typewriterDone = true;
    manualJump = true;
  }

  function loop(ts: number) {
    if (!animReady || !isSectionVisible || !isDocumentVisible || destroyed) {
      frameId = null;
      return;
    }

    if (autoStart === null) { autoStart = ts; autoOffset = virtual; }

    const wasManualJump = manualJump;
    if (wasManualJump) manualJump = false;

    if (!typewriterDone) {
      autoStart = ts; autoOffset = virtual;
    } else if (!lastTypingDone && !wasManualJump) {
      const postDwellMs = 800;
      const skipFrac = Math.max(0, SF_DWELL - postDwellMs / SF_STEP_DUR);
      autoOffset = lastRenderedStep * SF_SCROLL_PER_STEP + skipFrac * SF_SCROLL_PER_STEP;
      autoStart = ts;
      virtual = autoOffset;
    }

    if (wasManualJump) lastTypingDone = true;
    else lastTypingDone = typewriterDone;

    virtual = autoOffset + ((ts - autoStart) / SF_STEP_DUR) * SF_SCROLL_PER_STEP;
    const totalVirtual = STEPS.length * SF_SCROLL_PER_STEP;
    virtual = ((virtual % totalVirtual) + totalVirtual) % totalVirtual;

    const stepFloat = virtual / SF_SCROLL_PER_STEP;
    const i = sfClamp(Math.floor(stepFloat), 0, STEPS.length - 1);
    const j = (i + 1) % STEPS.length;
    const frac = sfClamp(stepFloat - i, 0, 1);
    const t = sfEase(Math.max(0, (frac - SF_DWELL) / (1 - SF_DWELL)));

    const lon0 = targets[i][0], lat0 = targets[i][1];
    const lon1 = targets[j][0], lat1 = targets[j][1];
    const wantLon = lon0 + sfLonDelta(lon0, lon1) * t;
    const wantLat = sfLerp(lat0, lat1, t);

    if (i !== lastRenderedStep) {
      const prev = lastRenderedStep;
      lastRenderedStep = i;
      if (prev >= 0) curMix = 0;
      prevStepIdx = prev;
      stepIdx = i;
      updateStepDotActive(i);

      const step = STEPS[i];
      if ($countryLabel) $countryLabel.innerHTML = '<span class="hl-yellow">' + step.label + "</span>";

      if (twCode !== step.code) {
        twCode = step.code;
        typewrite(step.quote);
      }

      currentFocusISO = step.code;
      focusRegion = null;
      if (hoverRegions) {
        for (let r = 0; r < hoverRegions.length; r++) {
          if (hoverRegions[r].key === step.code) { focusRegion = hoverRegions[r]; break; }
        }
      }
    }

    curLon += sfLonDelta(curLon, wantLon) * EASE;
    curLat += (wantLat - curLat) * EASE;
    rotation[0] = curLon;
    rotation[1] = curLat;
    rotation[2] = SF_IDLE_ROLL;

    curMix += (1 - curMix) * (EASE * 1.5);
    const currentFocusIdx = stepIdx >= 0 ? (focusIndices[STEPS[stepIdx].code] !== undefined ? focusIndices[STEPS[stepIdx].code] : -1) : -1;
    const prevFocusIdxVal = prevStepIdx >= 0 && STEPS[prevStepIdx] ? (focusIndices[STEPS[prevStepIdx].code] !== undefined ? focusIndices[STEPS[prevStepIdx].code] : -1) : -1;
    render(currentFocusIdx, prevFocusIdxVal, curMix);
    frameId = requestAnimationFrame(loop);
  }

  // ── Data loading ──
  const WORLD_URL = "https://cdn.prod.website-files.com/67ce28cfec624e2b733f8a52/69bad657e55cf57c0c2b1c89_countries-110m%202.txt";
  const US_STATES_URL = "https://cdn.prod.website-files.com/67ce28cfec624e2b733f8a52/69bad6578b4b6af7746b9171_states-10m%202.txt";

  Promise.all([
    fetch(WORLD_URL).then(r => r.json()),
    fetch(US_STATES_URL).then(r => r.json()),
  ]).then(function (results) {
    const world = results[0];
    const usTopo = results[1];

    const worldObj = world.objects.countries || world.objects[Object.keys(world.objects)[0]];
    countryMesh = topojson.mesh(world, worldObj);
    const features = topojson.feature(world, worldObj).features;

    const featureMap: Record<string, any> = {};
    features.forEach(function (f: any) {
      const numId = String(f.id).padStart(3, "0");
      const iso = ISO_NUM[numId];
      if (iso) { f._iso = iso; featureMap[iso] = f; }
    });

    const stObj = usTopo.objects.states || usTopo.objects[Object.keys(usTopo.objects)[0]];
    stateMesh = topojson.mesh(usTopo, stObj);
    const stateFeatures = topojson.feature(usTopo, stObj).features;

    const regions: any[] = [];
    features.forEach(function (f: any) {
      if (!f.geometry || !f._iso) return;
      const entry = BY_COUNTRY[f._iso];
      if (!entry) return;
      const rings: number[][][] = [];
      const g = f.geometry;
      if (g.type === "Polygon") rings.push(g.coordinates[0]);
      else if (g.type === "MultiPolygon") g.coordinates.forEach((poly: any) => rings.push(poly[0]));
      if (!rings.length) return;
      regions.push({
        key: f._iso,
        name: COUNTRY_NAMES[f._iso] || f.properties?.name || f._iso,
        n: entry.n,
        rings: rings,
      });
    });
    hoverRegions = regions;

    // Generate dots
    const isoList = Object.keys(BY_COUNTRY);
    const allDots: number[][] = [];

    isoList.forEach(function (iso, countryIdx) {
      if (iso === "US") return;
      const r = BY_COUNTRY[iso];
      if (!r || !r.n || r.sentiment == null) return;
      const feature = featureMap[iso];
      if (!feature || !feature.geometry) return;
      const targetDots = Math.max(1, Math.round(r.n / 4));
      const nGreen = Math.round(r.sentiment * targetDots);
      const nBlue = targetDots - nGreen;
      const seed = iso.toLowerCase().split("").reduce((s, c) => (s * 31 + c.charCodeAt(0)) & 0xffffffff, 0);
      const rng = makeLcg(seed);
      sampleInGeom(feature.geometry, nGreen, rng).forEach(pt => allDots.push([pt[0], pt[1], 0, countryIdx]));
      sampleInGeom(feature.geometry, nBlue, rng).forEach(pt => allDots.push([pt[0], pt[1], 1, countryIdx]));
    });

    // US: per state
    const usIdx = isoList.indexOf("US");
    stateFeatures.forEach(function (sf: any) {
      const fips = String(sf.id).padStart(2, "0");
      const postal = FIPS[fips];
      if (!postal) return;
      if (US_EXCLUDE.has(sf.properties?.name)) return;
      const stateInfo = BY_STATE[postal];
      if (!stateInfo || !stateInfo.n || stateInfo.sentiment == null) return;
      const targetDots = Math.max(1, Math.round(stateInfo.n / 4));
      const nGreen = Math.round(stateInfo.sentiment * targetDots);
      const nBlue = targetDots - nGreen;
      const seed = postal.toLowerCase().split("").reduce((s, c) => (s * 31 + c.charCodeAt(0)) & 0xffffffff, 0);
      const rng = makeLcg(seed);
      sampleInGeom(sf.geometry, nGreen, rng).forEach(pt => allDots.push([pt[0], pt[1], 0, usIdx]));
      sampleInGeom(sf.geometry, nBlue, rng).forEach(pt => allDots.push([pt[0], pt[1], 1, usIdx]));
    });

    dots = allDots;

    STEPS.forEach(s => { focusIndices[s.code] = isoList.indexOf(s.code); });

    if ($countries) $countries.style.opacity = "1";
    if ($states) $states.style.opacity = "1";

    if (stepIdx >= 0 && STEPS[stepIdx]) {
      currentFocusISO = STEPS[stepIdx].code;
      focusRegion = null;
      for (let fr = 0; fr < hoverRegions.length; fr++) {
        if (hoverRegions[fr].key === currentFocusISO) { focusRegion = hoverRegions[fr]; break; }
      }
    }

    curLon = targets[0][0];
    curLat = targets[0][1];
    animReady = true;
    syncLoopState();
  });

  return () => {
    destroyed = true;
    visibilityObserver.disconnect();
    document.removeEventListener("visibilitychange", onVisibilityChange);

    if (frameId !== null) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }

    if (twTimer) {
      clearTimeout(twTimer);
      twTimer = null;
    }
  };
}
