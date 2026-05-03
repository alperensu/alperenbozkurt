const tr = {
  nav: {
    home: "Ana Sayfa",
    solutions: "Çözümler",
    projects: "Projeler",
    sectors: "Sektörler",
    cta: "Teklif Al",
  },
  clip: {
    tagline: "Yazılım Geliştirici",
  },
  hero: {
    badge: "Full-Stack Developer & GEO Stratejisti",
    h1_1: "Alperen ",
    h1_2: "Bozkurt",
    h1_3: "",
    h1_4: "",
    subtitle:
      "Yazılım dünyasına olan tutkumu, akademik bilgisayar programcılığı temellerim ve tam donanımlı bir full-stack geliştirici vizyonumla harmanlıyorum. Kod yazmanın ötesinde; grafik tasarım ve video kurgu gibi kreatif alanlarda projeler üretiyor, teknoloji dünyasındaki yenilikleri derinlemesine araştırıyorum. Disiplinimi ve enerjimi fitness ile koruyan, teknik mükemmeliyeti estetik bir bakış açısıyla birleştirerek her zaman daha yenilikçi ve optimize edilmiş çözümler üretmeyi hedefleyen çok yönlü bir geliştiriciyim.",
    btnProjects: "Projeleri Keşfet",
    btnContact: "İletişime Geç",
    scroll: "Kaydır",
  },
  solutions: {
    badge: "Stratejik Çözümler",
    heading1: "Dijital Büyümeniz İçin",
    heading2: "Kapsamlı Çözümler",
    subtitle:
      "End-to-end dijital dönüşüm hizmetleriyle işletmenizi bir üst seviyeye taşıyın.",
    items: [
      {
        title: "Kurumsal Web Çözümleri",
        description:
          "Modern, kurumsal ve tamamen SEO uyumlu web sitelerinin oluşturulması, güvenli sunucularda barındırılması ve teknik bakım süreçleri.",
      },
      {
        title: "GEO & AI Stratejisi",
        description:
          "Yapay zeka çağında GEO (Generative Engine Optimization) uygulayarak şirketleri yeni nesil AI arama motorlarında öne çıkarıyorum.",
      },
      {
        title: "Kurumsal Medya & Tasarım",
        description:
          "Marka kimliğine uygun profesyonel düzeyde video kurgusu, sosyal medya yönetimi ve yüksek kaliteli grafik tasarımlar.",
      },
      {
        title: "Next.js Kurumsal Kimlik",
        description:
          "Next.js mimarisiyle sıfırdan inşa edilen ultra hızlı, SEO dostu ve ölçeklenebilir modern kurumsal portfolyolar.",
      },
      {
        title: "İşletme İçi Otomasyon",
        description:
          "C# ve Python kullanarak şirket içi süreçleri hızlandıran özel masaüstü/web otomasyonları ve kapsamlı yönetim panelleri.",
      },
      {
        title: "Veri Paneli & Raporlama",
        description:
          "İşletme verilerini anlamlı metriklere dönüştüren, karar alma süreçlerini hızlandıran özel dashboard ve raporlama arayüzleri.",
      },
    ],
  },
  projects: {
    badge: "PORTFOLIO",
    heading1: "Featured",
    heading2: "Projects",
    freelanceTitle: "Freelance Script & Çözüm Arşivi",
    freelanceDesc:
      "Geçmişte freelance platformlarında talebe özel geliştirdiğim, portföyümü ve sektörel yetkinliğimi genişleten niş endüstri yazılımları.",
    confidentialBanner:
      "Gizlilik politikaları gereği gerçek mekanik ve arayüz fotoğrafları paylaşılamamaktadır. Görseller teorik yapay zeka konseptleridir.",
    confidentialTitle: "Yarışma Gizliliği",
    confidentialModal:
      "Bu görsel yarışma kuralları gereği yapay zeka ile oluşturulmuş teorik bir konsepttir.",
    showDetails: "Sistem Özelliklerini İncele",
    hideDetails: "Detayları Gizle",
    items: [
      {
        title: "Borsa Analiz Botu",
        category: "AI-POWERED FİNANS",
        description:
          "Borsa İstanbul (BIST) verilerini kullanarak hisse senedi trendlerini tahmin eden, gelişmiş makine öğrenimi modellerine dayalı bir finansal analiz platformu. LightGBM algoritmaları, Triple-Barrier etiketleme ve Purged K-Fold Cross-Validation gibi ileri düzey finansal veri bilimi teknikleriyle piyasa sinyalleri üretir.",
        techInfo:
          "Python (LightGBM, Pandas, Scikit-learn) ML Pipeline, 150+ teknik indikatör entegrasyonu, TA-Lib, Kysely query builder ve React tabanlı gerçek zamanlı veri dashboard'u.",
        role: "Tam yığın geliştirme yaptım — backend API, ML pipeline, frontend dashboard ve gerçek zamanlı veri akışını yönettim.",
        result:
          "417+ BIST hissesi için anlık teknik analiz, AI sinyal üretimi ve otomatik formasyon tanıma sistemlerini hayata geçirdim.",
        expandedContent: [
          {
            title: "Otomatik Formasyon Tespiti",
            desc: "Grafik üzerindeki 13 farklı teknik formasyonu (İkili Tepe, OBO vb.) eş zamanlı tarar ve güven skorlarıyla işaretler.",
          },
          {
            title: "Makine Öğrenmesi & Tahmin",
            desc: "Özel etiketleme teknikleri (Triple-Barrier) ve Ensemble modeller kullanarak yön tahminleri (AL/SAT/TUT) üretir.",
          },
          {
            title: "Doğal Dil İşleme (NLP)",
            desc: "Piyasa haberlerini eş zamanlı çekerek duygu analizi (sentiment) yapar ve teknik verilerle harmanlar.",
          },
          {
            title: "Dinamik Risk Yönetimi",
            desc: "Piyasa volatilitesine göre model karar eşiklerini (threshold) otonom şekilde ayarlar ve risk/ödül oranını korur.",
          },
        ],
      },
      {
        title: "VibeKoc",
        category: "AI EĞİTİM PLATFORMU",
        description:
          "Öğrencilerin sınav hazırlık süreçlerini oyunlaştıran ve kişiselleştiren, her kullanıcıya özel bir AI Eğitim Koçu sunan SaaS EdTech platformu. Davranışsal analiz algoritmalarıyla çalışma verimliliğini ölçer, eksik konuları tespit eder ve Llama 3/Gemini tabanlı hibrit AI motoruyla anlık rehberlik sağlar.",
        techInfo:
          "React 19 + Vite, Node.js & TypeScript, MySQL + Kysely, Redis caching, Socket.io real-time düello motoru, Google Gemini (2.0 Flash) ve OpenAI GPT-4o hibrit entegrasyonu.",
        role: "Tam yığın geliştirme süreçlerini yönettim — AI koçluk motoru, Vibe Analytics davranışsal analiz algoritmaları, sınav simülatörü ve gamification sistemlerini inşa ettim.",
        result:
          "Başarı projeksiyonu (Linear Regression), tükenmişlik (burnout) detektörü, ÖSYM tarzı soru üretimi ve %99.9 AI servis devamlılığı sağladım.",
        expandedContent: [
          {
            title: "Advanced Analytics",
            desc: "Linear Regression ile 30 günlük başarı projeksiyonu, çözme hızı-doğruluk korelasyonuyla burnout tespiti ve zaman verimlilik indeksi.",
          },
          {
            title: "Akıllı Sınav Simülasyonu",
            desc: "AI ile ÖSYM/MEB soru tarzlarını birebir taklit eden soru üretimi ve Normal Dağılım bazlı dinamik zorluk dağıtımı.",
          },
          {
            title: "Gamification & Düellolar",
            desc: "Bronzdan Şampiyonlar Ligi'ne haftalık lig döngüleri, Socket.io ile 1v1 real-time düellolar ve streak mekaniği.",
          },
          {
            title: "Kurumsal (B2B) Analiz Paneli",
            desc: "Dershaneler ve okullar için riskli öğrenci tespiti, sınıf bazında konu ısı haritaları ve yönetici dashboard'u.",
          },
        ],
      },
      {
        title: "UMAY Arama-Kurtarma İHA'sı",
        category: "OTONOM IHA SİSTEMİ",
        description:
          "AFAD ve JAK gibi arama-kurtarma ekiplerine havadan stratejik destek sağlayan, çift sensörlü (Termal + RGB) ve yapay zeka destekli otonom hexacopter sistemi (Ekip Projesi).",
        techInfo:
          "YOLO ile görüntü işleme üzerinden canlı/hedef tespiti, Termal ve RGB kamera füzyonu, otonom rota planlama.",
        role: "Sistem Mühendisliği & Görüntü İşleme süreçlerini üstlendim (Ekip Projesi) — otonom uçuş algoritmaları, sensör entegrasyonu ve hedef tespiti üzerine çalıştım.",
        result:
          "Otonom intikal, hedefe hassas faydalı yük bırakma ve gece karanlığında bile canlı tespiti yapabilen prototipi geliştirdim.",
        expandedContent: [
          {
            title: "Otonom İntikal ve Keşif",
            desc: "Pilot müdahalesine gerek kalmadan GPS ile afet bölgesine uçuş ve algoritmik arama-tarama rotası oluşturma.",
          },
          {
            title: "Sensör Füzyonu",
            desc: "Termal ve RGB hibrit kamera ile gece karanlığında, yoğun sis veya duman altında yüksek doğrulukla canlı tespiti.",
          },
          {
            title: "Hassas Otonom Müdahale",
            desc: "Yapay zeka ile yardım kutularının tespiti sonrası otonom ve milimetrik hassasiyetle faydalı yük bırakma.",
          },
          {
            title: "Psikolojik İlk Yardım",
            desc: "Drone üzerinde bulunan anons ve ses iletim sistemiyle kazazedelere havadan psikolojik ilk yardım sağlama.",
          },
        ],
      },
      {
        title: "VibeFlow",
        category: "AI KODLAMA OPTIMIZASYONU",
        description:
          "AI kodlama akislari icin gelistirilmis, yerel calisan ve editorden bagimsiz bir context optimization sidecar. Projeyi izleyerek AST farkindalikli kompakt bir hafiza olusturur, gereksiz dosyalari ayiklar ve modele yalnizca ilgili baglami gondererek token kullanimini optimize eder.",
        techInfo:
          "FastAPI tabanli lokal API, watchdog ile anlik dosya izleme, tree-sitter ile AST tabanli ayristirma, ChromaDB vektor cache ve CLI odakli terminal yonetimi.",
        role: "Ürün tasarımı ve geliştirmesini yaptım - context builder, dosya izleyici, CLI komutları, optimizasyon profilleri ve agent entegrasyon akışını kurguladım.",
        result:
          "Kodlama ajanlarının tüm repoyu okumadan, seçilmiş ve özetlenmiş bağlamla çalışmasını sağlayan yerel geliştirici aracını ürettim.",
        expandedContent: [
          {
            title: "Token Tasarrufu",
            desc: "Semantik budama, skeletonization ve butce limitleriyle model baglamini kompakt hale getirir.",
          },
          {
            title: "Yerel Sidecar API",
            desc: "FastAPI uzerinden /context, /index ve /settings uclariyla editorden bagimsiz kullanim sunar.",
          },
          {
            title: "Canli Proje Izleme",
            desc: "watchdog ile dosya degisikliklerini yakalar ve index'i gelistirme sureci boyunca sicak tutar.",
          },
          {
            title: "Agent Dostu Cikti",
            desc: "Kodlama ajanlari icin model-ready context ve diff odakli cikti kontrati uretir.",
          },
        ],
      },
      {
        title: "Flowy",
        category: "MUSIC STREAMING APP",
        description:
          "YouTube tabanli, modern bir muzik dinleme deneyimi sunan web ve masaustu odakli streaming uygulamasi. Spotify benzeri premium bir arayuzu Electron destegiyle birlestirerek tarayici ve desktop deneyimini tek kod tabaninda sunar.",
        techInfo:
          "Next.js, Electron, React 19, Tailwind CSS, Framer Motion, YouTube Data API v3 ve istemci tarafli oynatici kontrol sistemi.",
        role: "Ürün tasarımı ve geliştirmesini üstlendim - oynatıcı deneyimi, arayüz mimarisi, desktop wrapper entegrasyonu ve müzik keşif akışlarını oluşturdum.",
        result:
          "Tek kod tabanından hem web hem de masaüstü deneyimi veren, karanlık temalı ve performans odaklı müzik uygulamasını yayınladım.",
        expandedContent: [
          {
            title: "Cross-Platform Deneyim",
            desc: "Next.js arayuzu Electron ile birlestirerek web ve native desktop kullanimini ayni urun deneyiminde toplar.",
          },
          {
            title: "Modern Player UI",
            desc: "Tam ekran oynatici, alt player cubugu, kutuphane yapisi ve premium muzik uygulamasi hissi veren akici arayuzler sunar.",
          },
          {
            title: "YouTube Tabanli Icerik Akisi",
            desc: "Genis sarki havuzuna erisim icin YouTube arama ve oynatma mantigini uygulama akislarina entegre eder.",
          },
          {
            title: "Kesif ve Karisimlar",
            desc: "Gunun karisimlari, oneriler ve kutuphane odakli gezinme yapisiyla kullaniciyi uzun sure uygulama icinde tutacak akislar kurar.",
          },
        ],
      },
    ],
    labels: {
      techStack: "TECH STACK",
      role: "ROL",
      result: "SONUÇ",
      demo: "DEMO",
      github: "GITHUB",
    },
  },
  marquee: {
    badge: "Sektörel Çözümler",
    heading1: "Her Sektöre Özel",
    heading2: "Dijital Modüller",
    subtitle:
      "İşletmenizin sektörüne uygun, hazır ve özelleştirilebilir dijital çözümler.",
    items: [
      { title: "E-Ticaret", description: "Online satış platformları ve ödeme entegrasyonları" },
      { title: "QR Menü", description: "Restoran ve kafe dijital menü çözümleri" },
      { title: "Randevu Sistemi", description: "Online randevu ve takvim yönetimi" },
      { title: "CRM", description: "Müşteri ilişkileri yönetim sistemleri" },
      { title: "Eğitim Platformu", description: "Online eğitim ve öğrenme yönetim sistemleri" },
      { title: "Lojistik", description: "Kargo takip ve filo yönetim sistemleri" },
      { title: "Sağlık", description: "Hasta takip ve sağlık hizmetleri yönetimi" },
      { title: "Finans", description: "Finansal analiz ve ödeme altyapıları" },
    ],
  },
  footer: {
    tagline: "Yazılım Geliştirici",
    copyright: "Tüm hakları saklıdır.",
    visitorCounter: {
      label: "Canlı Analitik",
      total: "Toplam Görüntüleme",
      today: "Bugün",
    },
  },
  profile: {
    badge: "Geliştirici Profili",
    title: "Yazılım Geliştirme Yaklaşımı",
    bio: "Yazılım dünyasına olan tutkumu, bilgisayar programcılığı eğitimim ve tam donanımlı bir full-stack geliştirici olma vizyonumla birleştiriyorum. Özellikle AI entegrasyonu, finansal veri analitiği ve yüksek performanslı web uygulamaları geliştirme konusunda uzmanlaşıyorum. Kreatif tarafta Premiere Pro ve After Effects ile görsel hikaye anlatıcılığı yaparken, teknik tarafta modern JavaScript ekosistemi ve makine öğrenimi modelleriyle katma değer üretiyorum. Her zaman daha yenilikçi, optimize edilmiş ve estetik çözümler üretmeyi hedefliyorum.",
    experienceTitle: "İş Deneyimi",
    educationTitle: "Eğitim",
    skillsTitle: "Teknik Yetkinlikler",
    techStudio: {
      role: "Full-Stack Developer",
      duration: "2023 - Günümüz",
      desc: "Modern web teknolojileri (React 19, Next.js 15, Node.js) kullanarak uçtan uca kurumsal çözümler geliştirdim. Mikroservis mimarisi ile veri işleme süreçlerini optimize ettim, RESTful API tasarımı ve veritabanı yönetimini üstlendim. Kullanıcı deneyimini (UX) önceliklendirerek arayüz performansını artıran optimizasyon çalışmaları ve ölçeklenebilir mimari tasarımları yaptım.",
    },
    pamukkale: {
      school: "Pamukkale Üniversitesi",
      major: "Bilgisayar Programcılığı",
      status: "Devam ediyor",
    },
    orhan: {
      school: "Orhan Abalıoğlu MTAL",
      major: "Yazılım Geliştirme Bölümü",
      status: "Mezun",
    },
    skills: {
      languages: "TypeScript, JavaScript, Python, Node.js, React 19, Next.js 15, MySQL, PostgreSQL, Redis, Tailwind CSS v4",
      ai: "Generative Engine Optimization (GEO), LLM Integration (OpenAI, Gemini), Machine Learning (Scikit-learn, LightGBM), Prompt Engineering",
      multimedia: "Adobe Premiere Pro, After Effects, Photoshop, Illustrator, Visual Storytelling, Video Editing & Motion Graphics",
    }
  },
};

export default tr;
