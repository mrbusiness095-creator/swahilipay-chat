import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import logoImg from "@/assets/swahili-paychat-logo.png";
import posterImg from "@/assets/swahili-paychat-poster.png";

const WHATSAPP_NUMBER = "255761883444";
const WHATSAPP_DISPLAY = "0761 883 444";
const GROUP_LINK = "https://chat.whatsapp.com/HJR16xnRf53J54yvIrIJwA?s=cl&p=a&ilr=4&amv=3";
const REGISTER_LINK = "https://kozenasite.site/register?ref=Salma255";
const SMS_NUMBER = "0743871339";
/** Idadi ya majibu ya mtumiaji kabla ya pop-up */
const CHAT_TURNS = 3;

const guests = [
  { name: "Emma W.", country: "United Kingdom", flag: "🇬🇧", age: 24, status: "Looking to talk", price: "$14.5", tzs: "37,700", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80", intro: "Hi! I'm Emma from London. I'd love to learn Swahili!" },
  { name: "Alexandro G.", country: "Italy", flag: "🇮🇹", age: 34, status: "Looking to talk", price: "$13.8", tzs: "35,880", img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=400&auto=format&fit=crop&q=80", intro: "Ciao! I want to visit Tanzania — teach me some words!" },
  { name: "Lucas M.", country: "Germany", flag: "🇩🇪", age: 33, status: "typing…", price: "$12.8", tzs: "33,280", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80", intro: "Hallo! I'm Lucas from Berlin. I want to learn Swahili!" },
  { name: "David K.", country: "USA", flag: "🇺🇸", age: 45, status: "Looking to talk", price: "$16", tzs: "41,600", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80", intro: "Hey! David here from NYC. Excited to chat with you!" },
  { name: "Maria C.", country: "Brazil", flag: "🇧🇷", age: 29, status: "typing…", price: "$13.5", tzs: "35,100", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80", intro: "Oi! I'm Maria. Swahili sounds beautiful — help me learn!" },
  { name: "Ji-Woo N.", country: "South Korea", flag: "🇰🇷", age: 25, status: "typing…", price: "$15.5", tzs: "40,300", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80", intro: "Annyeong! I want to make friends in Africa." },
  { name: "Kenji T.", country: "Japan", flag: "🇯🇵", age: 41, status: "Looking to talk", price: "$14", tzs: "36,400", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80", intro: "Konnichiwa! Please teach me basic Swahili greetings." },
  { name: "Sophie L.", country: "France", flag: "🇫🇷", age: 26, status: "Looking to talk", price: "$14.2", tzs: "36,920", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80", intro: "Bonjour! I'd love to learn Swahili with you." },
  { name: "Anna S.", country: "Netherlands", flag: "🇳🇱", age: 31, status: "typing…", price: "$14.4", tzs: "37,440", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80", intro: "Hoi! Anna here. Let's chat and learn together!" },
  { name: "Isabella R.", country: "Spain", flag: "🇪🇸", age: 28, status: "Looking to talk", price: "$13.7", tzs: "35,620", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80", intro: "Hola! I'm planning a trip to Zanzibar — help me!" },
  { name: "Ahmed F.", country: "UAE", flag: "🇦🇪", age: 37, status: "typing…", price: "$16.5", tzs: "42,900", img: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=400&auto=format&fit=crop&q=80", intro: "Marhaba! I do business in East Africa. Teach me!" },
  { name: "Priya S.", country: "India", flag: "🇮🇳", age: 27, status: "typing…", price: "$12.5", tzs: "32,500", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80", intro: "Namaste! I love learning new languages — Swahili next!" },
  { name: "Olivia B.", country: "Australia", flag: "🇦🇺", age: 30, status: "Looking to talk", price: "$15.2", tzs: "39,520", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80", intro: "Hey mate! I'm visiting Serengeti soon — teach me Swahili!" },
  { name: "Thomas R.", country: "Canada", flag: "🇨🇦", age: 38, status: "typing…", price: "$15.8", tzs: "41,080", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80", intro: "Hi from Toronto! I want to learn a few Swahili phrases." },
  { name: "Elena V.", country: "Sweden", flag: "🇸🇪", age: 27, status: "Looking to talk", price: "$14.9", tzs: "38,740", img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&auto=format&fit=crop&q=80", intro: "Hej! Swahili sounds so warm. Can you teach me?" },
  { name: "Marco P.", country: "Switzerland", flag: "🇨🇭", age: 43, status: "typing…", price: "$17", tzs: "44,200", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80", intro: "Grüezi! I need Swahili for my safari trip." },
  { name: "Chloe D.", country: "Belgium", flag: "🇧🇪", age: 25, status: "Looking to talk", price: "$13.9", tzs: "36,140", img: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&auto=format&fit=crop&q=80", intro: "Hallo! Teach me some daily Swahili words please." },
  { name: "Ryan H.", country: "Ireland", flag: "🇮🇪", age: 32, status: "typing…", price: "$14.6", tzs: "37,960", img: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&auto=format&fit=crop&q=80", intro: "Hello! Ryan here from Dublin, ready to learn." },
  { name: "Nadia H.", country: "Norway", flag: "🇳🇴", age: 29, status: "Looking to talk", price: "$16.2", tzs: "42,120", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&auto=format&fit=crop&q=80", intro: "Hei! I want to speak Swahili with locals." },
  { name: "Peter M.", country: "Austria", flag: "🇦🇹", age: 36, status: "typing…", price: "$15", tzs: "39,000", img: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&auto=format&fit=crop&q=80", intro: "Servus! Let's start with greetings in Swahili." },
];

function shuffle<T>(arr: T[]) {
  const pool = [...arr];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

const payouts = [
  { net: "M-Pesa", user: "Shadrich M.", amount: "+45,000", when: "sekunde 2 zilizopita" },
  { net: "Airtel", user: "QueenBiz A.", amount: "+32,000", when: "sekunde 18 zilizopita" },
  { net: "Mix by Yas", user: "Amtin K.", amount: "+60,000", when: "dakika 1 iliyopita" },
  { net: "M-Pesa", user: "Idd S.", amount: "+35,000", when: "dakika 2 zilizopita" },
  { net: "Airtel", user: "Amina K.", amount: "+43,000", when: "dakika 3 zilizopita" },
  { net: "Mix by Yas", user: "Kelvin M.", amount: "+50,000", when: "dakika 5 zilizopita" },
  { net: "M-Pesa", user: "Neema J.", amount: "+28,000", when: "dakika 7 zilizopita" },
  { net: "Airtel", user: "Izack P.", amount: "+55,000", when: "dakika 9 zilizopita" },
  { net: "Halopesa", user: "Baraka A.", amount: "+65,000", when: "dakika 12 zilizopita" },
];

const testimonials = [
  { name: "Neema J.", city: "Dar es Salaam", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&auto=format&fit=crop&q=80", text: "Nimelipwa mara 3 wiki hii kupitia M-Pesa. Kazi ni rahisi — kuchat tu na kufundisha maneno ya Kiswahili!", earned: "185,000 TZS" },
  { name: "Baraka A.", city: "Mwanza", img: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=200&auto=format&fit=crop&q=80", text: "Nilianza kwa mtaji wa 14,500 TZS. Mwezi mmoja nimeshavuka 500,000 TZS. Swahili-paychat ni halali!", earned: "512,000 TZS" },
  { name: "Amina K.", city: "Arusha", img: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=200&auto=format&fit=crop&q=80", text: "Napenda kwa sababu naweza kufanya kazi nikiwa nyumbani. Wageni ni wapole na malipo yanakuja Airtel haraka.", earned: "263,500 TZS" },
  { name: "Shadrich M.", city: "Dodoma", img: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=200&auto=format&fit=crop&q=80", text: "Mazungumzo matano tu kwa siku yananitosha kulipa kodi ya nyumba. Halopesa inaingia dakika chache.", earned: "342,000 TZS" },
  { name: "Queen B.", city: "Mbeya", img: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&auto=format&fit=crop&q=80", text: "Nilikuwa sina kazi. Sasa nafundisha wazungu maneno kama ASANTE na KARIBU na nalipwa kila siku.", earned: "228,400 TZS" },
  { name: "Kelvin M.", city: "Tanga", img: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=200&auto=format&fit=crop&q=80", text: "Mix by Yas yangu inapokea malipo bila usumbufu. Wageni wapo wengi masaa yote ya usiku na mchana.", earned: "410,900 TZS" },
  { name: "Halima S.", city: "Zanzibar", img: "https://images.unsplash.com/photo-1621784563330-caee0b138a00?w=200&auto=format&fit=crop&q=80", text: "Kila mazungumzo yanaisha nalipwa papo hapo. Sikuamini mpaka nilipopokea SMS ya M-Pesa.", earned: "156,700 TZS" },
  { name: "Izack P.", city: "Morogoro", img: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=200&auto=format&fit=crop&q=80", text: "Naitumia simu yangu tu. Nafundisha Kiswahili, wanafurahi, na mimi napata pesa ya matumizi.", earned: "298,300 TZS" },
];


/** Malipo ya wanachama yanayoonyeshwa kama toast */
const payoutFeed = [
  { name: "Neema J.", city: "Dar es Salaam", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&auto=format&fit=crop&q=80", msg: "Nimemaliza kuchat na Emma, nimelipwa papo hapo!", amount: "37,700 TZS" },
  { name: "Baraka A.", city: "Mwanza", img: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=200&auto=format&fit=crop&q=80", msg: "Somo moja tu na Lucas — M-Pesa imeingia dakika 2.", amount: "33,280 TZS" },
  { name: "Amina K.", city: "Arusha", img: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=200&auto=format&fit=crop&q=80", msg: "Nimemfundisha David maneno ASANTE na KARIBU.", amount: "41,600 TZS" },
  { name: "Shadrich M.", city: "Dodoma", img: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=200&auto=format&fit=crop&q=80", msg: "Halopesa imeingia baada ya kuchat na Sophie.", amount: "36,920 TZS" },
  { name: "Queen B.", city: "Mbeya", img: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&auto=format&fit=crop&q=80", msg: "Kuchat na Maria kulikuwa rahisi sana, nimelipwa!", amount: "35,100 TZS" },
  { name: "Kelvin M.", city: "Tanga", img: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=200&auto=format&fit=crop&q=80", msg: "Mix by Yas imepokea malipo ya somo la Kenji.", amount: "36,400 TZS" },
  { name: "Halima S.", city: "Zanzibar", img: "https://images.unsplash.com/photo-1621784563330-caee0b138a00?w=200&auto=format&fit=crop&q=80", msg: "Nimemaliza mazungumzo na Anna — pesa zimeingia.", amount: "37,440 TZS" },
  { name: "Izack P.", city: "Morogoro", img: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=200&auto=format&fit=crop&q=80", msg: "Airtel Money imeingia baada ya kuchat na Ahmed.", amount: "42,900 TZS" },
  { name: "Zainabu H.", city: "Iringa", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80", msg: "Nimefundisha Priya salamu za Kiswahili, nimelipwa.", amount: "32,500 TZS" },
  { name: "Godfrey L.", city: "Mtwara", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80", msg: "Olivia amenishukuru na malipo yameingia haraka.", amount: "39,520 TZS" },
];

function showPayoutToast(p: (typeof payoutFeed)[number]) {
  toast.custom(() => (
    <div className="glass gold-border flex w-[330px] max-w-[88vw] items-start gap-3 rounded-2xl p-3 shadow-2xl">
      <img src={p.img} alt={p.name} className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-[hsl(var(--gold,45_90%_55%))]/60" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-bold">{p.name}</span>
          <span className="shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-bold text-emerald-400">
            +{p.amount}
          </span>
        </div>
        <p className="text-[11px] opacity-60">{p.city}</p>
        <p className="mt-1 text-xs leading-snug opacity-90">“{p.msg}”</p>
      </div>
    </div>
  ), { duration: 5000 });
}

function pickThree() {
  const pool = [...testimonials];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 3);
}

/** Mazungumzo halisi: mgeni anauliza, mtumiaji anafundisha (maneno yametiwa alama **neno**) */
const chatScript: { ask: string; suggest: string; reply: string }[] = [
  {
    ask: "Hi! How do you say **Thank you** in Swahili?",
    suggest: "Unasema ASANTE",
    reply: "Oh, **Asante**! That's nice. I will use it today 😊",
  },
  {
    ask: "Nice! And what about **Hello, how are you?**",
    suggest: "Unasema HABARI YAKO",
    reply: "**Habari yako** — I love how it sounds! Let me write it down.",
  },
  {
    ask: "Great teacher! How do I say **I am fine** when someone asks me?",
    suggest: "Jibu ni NZURI, ASANTE",
    reply: "So: Habari yako? — **Nzuri, asante**. Perfect! 🙌",
  },
  {
    ask: "One more please 🙏 How do you say **You are welcome**?",
    suggest: "Unasema KARIBU",
    reply: "**Karibu**! Such a warm word. Swahili is beautiful.",
  },
  {
    ask: "Last one — how do I say **Goodbye, see you later**?",
    suggest: "Unasema KWAHERI, TUTAONANA",
    reply: "**Kwaheri, tutaonana**! Asante sana my teacher — sending your payment now 💸",
  },
];

function Tagged({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <b key={i} className="gold-text">
            {part.slice(2, -2)}
          </b>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Swahili-paychat — Wafundishe wazungu Kiswahili, ulipwe" },
      { name: "description", content: "Jiunge Swahili-paychat: fundisha wazungu Kiswahili na ulipwe kupitia M-Pesa, Airtel, Halopesa na Mix by Yas moja kwa moja kwenye simu yako." },
      { property: "og:title", content: "Swahili-paychat — Wafundishe wazungu Kiswahili, ulipwe" },
      { property: "og:description", content: "Jiunge Swahili-paychat: fundisha wazungu Kiswahili na ulipwe kupitia M-Pesa, Airtel, Halopesa na Mix by Yas moja kwa moja kwenye simu yako." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Guest = (typeof guests)[number];

function Index() {
  const [online, setOnline] = useState(21980);
  const [balance, setBalance] = useState(0);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [showRegisterGate, setShowRegisterGate] = useState(false);
  const [chatGuest, setChatGuest] = useState<Guest | null>(null);
  const [paid, setPaid] = useState<{ guest: Guest; amount: number } | null>(null);
  const [shownTestimonials, setShownTestimonials] = useState(testimonials.slice(0, 3));
  const [shownGuests, setShownGuests] = useState(guests.slice(0, 8));

  useEffect(() => {
    setShownTestimonials(pickThree());
    setShownGuests(shuffle(guests).slice(0, 8));
  }, []);

  useEffect(() => {
    let i = Math.floor(Math.random() * payoutFeed.length);
    const first = setTimeout(() => showPayoutToast(payoutFeed[i % payoutFeed.length]!), 3500);
    const loop = setInterval(() => {
      i += 1;
      showPayoutToast(payoutFeed[i % payoutFeed.length]!);
    }, 9000);
    return () => {
      clearTimeout(first);
      clearInterval(loop);
    };
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setOnline((n) => n + Math.floor(Math.random() * 5) - 2);
    }, 3000);
    return () => clearInterval(t);
  }, []);


  return (
    <div className="min-h-screen">
      {/* NAV */}
      <header className="sticky top-0 z-40 px-4 pt-4">
        <nav className="glass mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3">
          <a href="#" className="flex min-w-0 items-center gap-2 sm:gap-3">
            <img
              src={logoImg}
              alt="Swahili-paychat logo"
              className="h-11 w-11 shrink-0 rounded-xl bg-white/90 object-contain p-0.5 shadow-[var(--shadow-gold)]"
            />
            <div className="min-w-0 leading-tight">
              <div className="font-display truncate text-base font-bold sm:text-lg">
                <span className="gold-text">Swahili</span>-paychat
              </div>
              <div className="truncate text-[10px] text-muted-foreground sm:text-[11px]">
                Fundisha • Ulipwe kila siku
              </div>
            </div>
          </a>

          {/* Balance + Jisajili top-right (balance is clickable to withdraw) */}
          <button
            type="button"
            onClick={() => setWithdrawOpen(true)}
            className="shrink-0 flex flex-col items-end rounded-xl gold-border bg-black/40 px-3 py-1.5 text-right hover:bg-black/60 transition"
            aria-label="Toa fedha"
          >
            <span className="text-[9px] uppercase tracking-widest text-muted-foreground sm:text-[10px]">
              Balance · Toa
            </span>
            <span className="gold-text text-xs font-bold tabular-nums sm:text-sm">
              {balance.toLocaleString()} TZS
            </span>
          </button>
        </nav>
      </header>

      {/* HERO */}
      <section className="mx-auto mt-8 max-w-6xl px-4 md:mt-16">
        <div className="max-w-3xl">

          <div className="inline-flex items-center gap-2 rounded-full gold-border bg-black/30 px-3 py-1 text-xs">
            <span className="live-dot inline-block h-2 w-2 rounded-full bg-[oklch(0.8_0.18_140)]" />
            <span className="tabular-nums font-semibold">{online.toLocaleString()}</span>
            <span className="text-muted-foreground">online sasa hivi</span>
          </div>

          <h1 className="mt-5 text-4xl leading-[1.05] font-bold md:text-6xl">
            Wafundishe wazungu <span className="gold-text">Kiswahili</span>,
            <br />
            <span className="gold-text">ulipwe</span> kila siku.
          </h1>

          <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            Shiriki mazungumzo ya kirafiki na wazungu kutoka duniani kote, wafundishe Kiswahili hatua kwa hatua, na
            ulipwe kupitia <b className="text-foreground">M-Pesa</b>, <b className="text-foreground">Airtel</b>,{" "}
            <b className="text-foreground">Halopesa</b> na <b className="text-foreground">Mix by Yas</b> —
            moja kwa moja kwenye simu yako.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href={REGISTER_LINK} target="_blank" rel="noreferrer" className="btn-gold rounded-xl px-5 py-3 text-sm">
              Jisajili sasa →
            </a>
            <a
              href={GROUP_LINK}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl gold-border bg-black/30 px-5 py-3 text-sm font-semibold hover:bg-black/50"
            >
              Jiunge WhatsApp Group
            </a>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3">
            <Stat label="Nchi" value="42+" sub="🇬🇧🇺🇸🇩🇪🇯🇵🇮🇹🇧🇷🇰🇷" />
            <Stat label="Payouts leo" value="4.2M" sub="TZS zimelipwa" />
            <Stat label="Kiwango" value="14.5K" sub="TZS mtaji" />
          </div>
        </div>

        {/* Poster */}
        <div className="mx-auto mt-10 max-w-md overflow-hidden rounded-3xl gold-border bg-black/30 p-2 shadow-2xl">
          <img
            src={posterImg}
            alt="Swahili-paychat — fundisha Kiswahili, ulipwe. Mtaji wa kuanzia 14,500 TZS"
            className="w-full rounded-2xl"
            loading="lazy"
          />
        </div>
      </section>


      {/* TESTIMONIALS */}
      <section className="mx-auto mt-16 max-w-6xl px-4 md:mt-20">
        <div className="mb-6 text-center">
          <div className="text-xs uppercase tracking-[.25em] text-[color:var(--gold)]">Ushuhuda</div>
          <h2 className="mt-1 text-2xl font-bold md:text-3xl">Wanachama wanasemaje?</h2>
          <p className="mt-2 text-sm text-muted-foreground">Watu halisi, malipo halisi kupitia M-Pesa, Airtel, Halopesa na Mix by Yas.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {shownTestimonials.map((t) => (
            <div key={t.name} className="glass rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <img src={t.img} alt={t.name} className="h-12 w-12 rounded-full object-cover gold-border" />
                <div className="min-w-0">
                  <div className="truncate font-semibold">{t.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{t.city}</div>
                </div>
                <div className="ml-auto text-[10px] text-[color:var(--gold)]">★★★★★</div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
              <div className="mt-4 flex items-center justify-between border-t border-[color:var(--border)] pt-3">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Amelipwa</span>
                <span className="gold-text text-sm font-bold tabular-nums">{t.earned}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GUESTS */}
      <section className="mx-auto mt-20 max-w-6xl px-4">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-[.25em] text-[color:var(--gold)]">Chagua wa kuchat naye</div>
            <h2 className="mt-1 text-2xl font-bold md:text-3xl">Wageni waliopo online</h2>
          </div>
          <div className="text-sm text-muted-foreground">{shownGuests.length} watu wanapatikana</div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {shownGuests.map((g) => (
            <div key={g.name} className="glass overflow-hidden rounded-2xl">
              <div className="relative">
                <img src={g.img} alt={g.name} className="h-40 w-full object-cover" />
                <div className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-[10px]">
                  {g.flag} {g.country}
                </div>
                <div className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[oklch(0.8_0.18_140)] shadow-[0_0_0_3px_oklch(0.8_0.18_140/25%)] live-dot" />
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold">
                    {g.name} <span className="text-muted-foreground">· {g.age}</span>
                  </h3>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">💬 {g.status}</div>
                <div className="mt-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setChatGuest(g)}
                    className="btn-gold rounded-lg px-3 py-1.5 text-xs"
                  >
                    Start
                  </button>
                  <div className="text-right leading-tight">
                    <div className="gold-text text-sm font-bold">{g.price}</div>
                    <div className="text-[10px] text-muted-foreground">{g.tzs} TZS</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PAYOUTS */}
      <section className="mx-auto mt-20 max-w-6xl px-4">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-[.25em] text-[color:var(--gold)]">Live payouts</div>
            <h2 className="mt-1 text-2xl font-bold md:text-3xl">Miamala ya hivi karibuni</h2>
          </div>
          <div className="inline-flex items-center gap-2 text-xs">
            <span className="live-dot h-2 w-2 rounded-full bg-[oklch(0.8_0.18_140)]" /> Live
          </div>
        </div>

        <div className="glass max-h-[380px] overflow-hidden rounded-2xl">
          <div className="ticker-anim">
            {[...payouts, ...payouts].map((p, i) => (
              <div key={i} className="flex items-center justify-between border-b border-[color:var(--border)] px-4 py-3 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-black/40 text-xs font-bold gold-border">
                    {p.net.slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{p.user}</div>
                    <div className="text-[11px] text-muted-foreground">{p.net} • {p.when}</div>
                  </div>
                </div>
                <div className="gold-text font-bold tabular-nums">{p.amount} TZS</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto my-20 max-w-6xl px-4">
        <div className="glass relative overflow-hidden rounded-3xl p-8 md:p-14">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--gradient-gold)] opacity-20 blur-3xl" />
          <div className="text-xs uppercase tracking-[.25em] text-[color:var(--gold)]">Jiunge sasa</div>
          <h2 className="mt-2 text-3xl font-bold md:text-5xl">
            Anza <span className="gold-text">kupata pesa</span> leo.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Jisajili kwa mtaji wa <b className="text-foreground">14,500 TZS</b> na uanze kulipwa kwa kuwafundisha
            wazungu Kiswahili hapa Swahili-paychat.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={REGISTER_LINK} target="_blank" rel="noreferrer" className="btn-gold rounded-xl px-6 py-3 text-sm">
              Jisajili sasa →
            </a>
          </div>

        </div>
      </section>

      <footer className="border-t border-[color:var(--border)] py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} <span className="gold-text font-semibold">Swahili-paychat</span> — Fundisha, ulipwe.
      </footer>

      {/* Floating WhatsApp with options */}
      <WhatsAppFab />

      {/* WITHDRAW MODAL */}
      {withdrawOpen && (
        <WithdrawModal
          balance={balance}
          onClose={() => setWithdrawOpen(false)}
          onSubmit={() => {
            setWithdrawOpen(false);
            setShowRegisterGate(true);
          }}
        />
      )}

      {/* REGISTER GATE */}
      {showRegisterGate && <RegisterGate onClose={() => setShowRegisterGate(false)} />}

      {/* CHAT MODAL */}
      {chatGuest && (
        <ChatWindow
          guest={chatGuest}
          onClose={() => setChatGuest(null)}
          onComplete={(g) => {
            const amount = Number(g.tzs.replace(/,/g, ""));
            setBalance((b) => b + amount);
            setChatGuest(null);
            setPaid({ guest: g, amount });
          }}
        />
      )}

      {/* PAID POPUP */}
      {paid && (
        <PaidModal
          guest={paid.guest}
          amount={paid.amount}
          onClose={() => setPaid(null)}
        />
      )}

    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="glass rounded-2xl p-3">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 gold-text text-2xl font-bold">{value}</div>
      <div className="mt-0.5 text-[11px] text-muted-foreground truncate">{sub}</div>
    </div>
  );
}

function WithdrawModal({
  balance,
  onClose,
  onSubmit,
}: {
  balance: number;
  onClose: () => void;
  onSubmit: () => void;
}) {
  const [network, setNetwork] = useState("M-Pesa");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/80 px-4" onClick={onClose}>
      <div
        className="glass w-full max-w-md rounded-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[color:var(--gold)]">Toa fedha</div>
            <div className="text-lg font-bold">Balance yako</div>
            <div className="gold-text mt-0.5 text-2xl font-bold tabular-nums">
              {balance.toLocaleString()} TZS
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full gold-border bg-black/40 hover:bg-black/60"
            aria-label="Funga"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="mt-5 space-y-4"
        >
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Mtandao</label>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {["M-Pesa", "Airtel", "Halopesa", "Mix by Yas"].map((n) => (
                <button
                  type="button"
                  key={n}
                  onClick={() => setNetwork(n)}
                  className={`rounded-lg border px-2 py-2 text-[11px] font-semibold transition ${
                    network === n
                      ? "gold-border bg-[var(--gradient-gold)] text-primary-foreground"
                      : "border-[color:var(--border)] bg-black/30 text-muted-foreground hover:bg-black/50"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground">Namba ya simu</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="tel"
              placeholder="07XX XXX XXX"
              required
              className="mt-2 w-full rounded-lg gold-border bg-black/40 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[color:var(--gold)]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground">Kiasi (TZS)</label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              inputMode="numeric"
              placeholder="mfano 50000"
              required
              className="mt-2 w-full rounded-lg gold-border bg-black/40 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[color:var(--gold)]"
            />
          </div>

          <button type="submit" className="btn-gold w-full rounded-xl py-3 text-sm font-bold">
            🟢 Toa fedha sasa →
          </button>
          <p className="text-center text-[10px] text-muted-foreground">
            Miamala inatumwa mara moja kupitia mtandao uliochagua.
          </p>
        </form>
      </div>
    </div>
  );
}

function RegisterGate({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-black/85 px-4" onClick={onClose}>
      <div
        className="glass w-full max-w-md rounded-2xl gold-border p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--gradient-gold)] text-3xl shadow-[var(--shadow-gold)]">
          🔒
        </div>
        <h3 className="mt-4 text-xl font-bold">Jisajili ili utoe pesa</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Ili kuhakikisha pesa yako inafika salama, jisajili kwa mtaji wa{" "}
          <b className="gold-text">TSh 14,500</b> tu kupata akaunti kamili ya Swahili-paychat.
        </p>

        <ul className="mt-5 space-y-2 text-left text-sm">
          <li>✅ Toa pesa moja kwa moja M-Pesa, Airtel, Halopesa, Mix by Yas.</li>
          <li>✅ Endelea kuchat na wageni bila kikomo.</li>
          <li>✅ Uanze kulipwa kwa kila mazungumzo.</li>
        </ul>

        <a
          href={REGISTER_LINK}
          target="_blank"
          rel="noreferrer"
          className="btn-gold mt-6 block rounded-xl py-3 text-sm font-bold"
        >
          🟢 JISAJILI SASA →
        </a>
        <button
          onClick={onClose}
          className="mt-3 w-full rounded-xl gold-border bg-black/40 py-2.5 text-sm font-semibold hover:bg-black/60"
        >
          Funga
        </button>
      </div>
    </div>
  );
}

function ChatWindow({
  guest,
  onClose,
  onComplete,
}: {
  guest: Guest;
  onClose: () => void;
  onComplete: (g: Guest) => void;
}) {
  const [messages, setMessages] = useState<{ from: "them" | "me"; text: string }[]>([
    { from: "them", text: `${guest.intro} ${chatScript[0].ask}` },
  ]);
  const [turn, setTurn] = useState(0); // idadi ya majibu ya user
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);

  const done = turn >= CHAT_TURNS;

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || typing || done) return;
    const next = turn + 1;
    setMessages((m) => [...m, { from: "me", text }]);
    setDraft("");
    setTurn(next);
    setTyping(true);

    window.setTimeout(() => {
      setTyping(false);
      if (next < CHAT_TURNS) {
        setMessages((m) => [
          ...m,
          { from: "them", text: `${chatScript[next - 1].reply} ${chatScript[next].ask}` },
        ]);
      } else {
        setMessages((m) => [...m, { from: "them", text: chatScript[next - 1].reply }]);
        window.setTimeout(() => onComplete(guest), 1200);
      }
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-[color:var(--background)]">
      {/* Header */}
      <div className="glass flex items-center gap-3 px-4 py-3">
        <img src={guest.img} alt={guest.name} className="h-11 w-11 rounded-full object-cover gold-border" />
        <div className="min-w-0 flex-1">
          <div className="truncate font-semibold">
            {guest.name} <span>{guest.flag}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[oklch(0.8_0.18_140)]">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-[oklch(0.8_0.18_140)]" />
            {typing ? "anaandika…" : "online sasa"}
          </div>
        </div>
        <div className="rounded-full gold-border bg-black/40 px-2.5 py-1 text-[10px] font-semibold">
          {Math.min(turn, CHAT_TURNS)}/{CHAT_TURNS}
        </div>
        <button
          onClick={onClose}
          className="grid h-9 w-9 place-items-center rounded-full gold-border bg-black/40 hover:bg-black/60"
          aria-label="Funga"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-5">
        {messages.map((m, i) => (
          <div
            key={i}
            style={m.from === "me" ? { background: "var(--gradient-gold)" } : undefined}
            className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
              m.from === "them"
                ? "bg-black/40 gold-border"
                : "ml-auto text-primary-foreground font-medium shadow-[var(--shadow-gold)]"
            }`}
          >
            <Tagged text={m.text} />
          </div>
        ))}
        {typing && (
          <div className="max-w-[60%] rounded-2xl gold-border bg-black/40 px-4 py-2.5 text-sm text-muted-foreground">
            {guest.name.split(" ")[0]} anaandika…
          </div>
        )}
      </div>

      {/* Composer */}

      <form onSubmit={send} className="glass flex items-center gap-2 border-t border-[color:var(--border)] px-3 py-3">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Andika ujumbe wako..."
          disabled={done}
          className="flex-1 rounded-full gold-border bg-black/40 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[color:var(--gold)] disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!draft.trim() || typing || done}
          className="btn-gold flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold disabled:opacity-40"
        >
          Send ➤
        </button>
      </form>
    </div>
  );
}

function PaidModal({ guest, amount, onClose }: { guest: Guest; amount: number; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-black/85 px-4" onClick={onClose}>
      <div className="glass w-full max-w-md rounded-3xl gold-border p-6 text-center" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[var(--gradient-gold)] text-4xl shadow-[var(--shadow-gold)]">
          🔒
        </div>
        <h3 className="mt-4 text-2xl font-bold leading-tight">
          Endelea Kuchat na <span className="gold-text">Kulipwa</span>
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Umefikia mwisho wa mazungumzo ya bure na <b className="gold-text">{guest.name}</b> (
          {amount.toLocaleString()} TZS). Jisajili sasa kwa mtaji wa <b className="gold-text">TSh 14,500 Tu</b> ili:
        </p>

        <ul className="mt-5 space-y-2.5 text-left text-sm">
          <li>✅ Uendelee kuchat na wageni bila kikomo kwa kuwafundisha Kiswahili.</li>
          <li>✅ Uanze kulipwa kwa kila mazungumzo unayofanya.</li>
          <li>✅ Upate huduma zote za SWAHILI-PAYCHAT.</li>
        </ul>


        <a
          href={REGISTER_LINK}
          target="_blank"
          rel="noreferrer"
          className="btn-gold mt-5 block rounded-xl py-3 text-sm font-bold"
        >
          🟢 JISAJILI SASA →
        </a>
        <button
          onClick={onClose}
          className="mt-3 w-full rounded-xl gold-border bg-black/40 py-2.5 text-sm font-semibold hover:bg-black/60"
        >
          Funga
        </button>
      </div>
    </div>
  );
}

function WhatsAppFab() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-64 overflow-hidden rounded-2xl glass gold-border">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 border-b border-[color:var(--border)] px-3 py-3 hover:bg-black/40"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[oklch(0.68_0.17_150)] text-white">
              <WaIcon size={18} />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold">Customer Service</span>
              <span className="block text-[11px] text-muted-foreground">Ongea na msaidizi · {WHATSAPP_DISPLAY}</span>
            </span>
          </a>
          <a
            href={`sms:${SMS_NUMBER}`}
            className="flex items-center gap-3 border-b border-[color:var(--border)] px-3 py-3 hover:bg-black/40"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--gradient-gold)] text-lg text-primary-foreground">
              ✉️
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold">SMS ya kawaida</span>
              <span className="block text-[11px] text-muted-foreground">Tuma SMS · {SMS_NUMBER}</span>
            </span>
          </a>
          <a
            href={GROUP_LINK}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-3 py-3 hover:bg-black/40"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[oklch(0.68_0.17_150)] text-white">
              <WaIcon size={18} />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold">JOIN GROUP</span>
              <span className="block text-[11px] text-muted-foreground">Ingia kwenye group letu</span>
            </span>
          </a>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`grid h-14 w-14 place-items-center rounded-full bg-[oklch(0.68_0.17_150)] text-white shadow-[var(--shadow-gold)] transition hover:scale-105 ${open ? "" : "wa-blink"}`}
        aria-label="WhatsApp"
        aria-expanded={open}
      >
        {open ? <span className="text-2xl leading-none">✕</span> : <WaIcon size={26} />}
      </button>
    </div>
  );
}

function WaIcon({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M20.52 3.48A11.94 11.94 0 0 0 12.02 0C5.39 0 .02 5.37.02 12c0 2.11.55 4.17 1.6 6L0 24l6.2-1.62A11.98 11.98 0 0 0 12.02 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.5-8.52ZM12.02 22c-1.86 0-3.68-.5-5.27-1.44l-.38-.22-3.68.96.98-3.59-.25-.37A9.94 9.94 0 0 1 2.02 12C2.02 6.48 6.5 2 12.02 2c2.67 0 5.18 1.04 7.07 2.93A9.93 9.93 0 0 1 22.02 12c0 5.52-4.48 10-10 10Zm5.47-7.5c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.5 1.69.64.71.22 1.36.19 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

