import { useState, type FormEvent } from "react";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  Tag,
  Truck,
  RefreshCw,
  MessageCircle,
  ArrowRight,
  MapPin,
  Star,
  Camera,
  Home,
  Package,
  ShoppingCart,
  Users,
  FileText,
  Wallet,
  BarChart3,
  Megaphone,
  Store,
  Monitor,
  Settings,
  Plus,
  Download,
  Pencil,
  Trash2,
  Filter,
  ChevronDown,
  Bell,
  CircleDollarSign,
} from "lucide-react";

// ===============================
// TYPE DATA
// ===============================

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  label: string;
  stock?: number;
  status?: "Published" | "Draft" | "Inactive";
  options?: string[];
  optionLabel?: string;
};

type CartItem = Product & {
  selectedOption: string;
};

type NavbarProps = {
  cartCount: number;
  onSelectCategory: (category: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onOpenCart: () => void;
  onOpenDashboard: () => void;
};

type ProductsProps = {
  addToCart: (product: Product, size: string) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  products: Product[];
};

type DashboardProps = {
  products: Product[];
  onProductsChange: (products: Product[]) => void;
  onClose: () => void;
};

// ===============================
// DATA KATEGORI
// ===============================

const categories = [
  {
    name: "Atasan",
    image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=600",
  },
  {
    name: "Bawahan",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600",
  },
  {
    name: "Dress",
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600",
  },
  {
    name: "Outer",
    image:
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Pria",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600",
  },
  {
    name: "Jilbab",
    image:
      "https://images.unsplash.com/photo-1662806407800-56793fa8e924?auto=format&fit=crop&w=800&q=85",
  },
];

// ===============================
// DATA PRODUK
// ===============================

const products: Product[] = [
  {
    id: 1,
    name: "Blouse Casual Wanita",
    category: "Atasan",
    price: 125000,
    image: "https://images.unsplash.com/photo-1566206091558-7f218b696731?w=600",
    label: "Baru",
    stock: 24,
  },
  {
    id: 2,
    name: "Celana Kulot Premium",
    category: "Bawahan",
    price: 150000,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=85",
    label: "",
    stock: 18,
  },
  {
    id: 3,
    name: "Elegant Dress",
    category: "Dress",
    price: 185000,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600",
    label: "Terlaris",
    stock: 12,
  },
  {
    id: 4,
    name: "Outer Korean Style",
    category: "Outer",
    price: 175000,
    image:
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=85",
    label: "",
    stock: 9,
  },
  {
    id: 5,
    name: "Kemeja Casual Pria",
    category: "Pria",
    price: 165000,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600",
    label: "Baru",
    stock: 16,
  },
  {
    id: 6,
    name: "Kaos Basic Pria",
    category: "Pria",
    price: 89000,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85",
    label: "",
    stock: 22,
  },
  {
    id: 7,
    name: "Kaos Casual Pria",
    category: "Pria",
    price: 99000,
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=85",
    label: "Baru",
    stock: 18,
  },
  {
    id: 8,
    name: "Jilbab Pashmina Polos",
    category: "Jilbab",
    price: 65000,
    image:
      "https://images.unsplash.com/photo-1662806407800-56793fa8e924?auto=format&fit=crop&w=800&q=85",
    label: "Baru",
    stock: 30,
    options: ["Voal", "Ceruty", "Jersey"],
    optionLabel: "Bahan",
  },
  {
    id: 9,
    name: "Jilbab Segi Empat",
    category: "Jilbab",
    price: 55000,
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=85",
    label: "",
    stock: 26,
    options: ["Voal", "Katun", "Paris"],
    optionLabel: "Bahan",
  },
];

// ===============================
// DATA TESTIMONI
// ===============================

const testimonials = [
  {
    review:
      "Bahannya bagus, nyaman dipakai sehari-hari. Pengiriman juga cepat!",
    name: "Sarah",
    city: "Bandung",
  },
  {
    review: "Model bajunya cantik dan sesuai foto. Pasti akan belanja lagi.",
    name: "Putri",
    city: "Jakarta",
  },
  {
    review: "Harga terjangkau, kualitas bagus. Cocok untuk kebutuhan toko.",
    name: "Dina",
    city: "Cimahi",
  },
];

// ===============================
// ANNOUNCEMENT BAR
// ===============================

function AnnouncementBar() {
  return (
    <div className="bg-[#304037] px-4 py-2.5 text-center text-[10px] font-medium tracking-[0.16em] text-white sm:text-xs">
      KOLEKSI PILIHAN STELLA · TAMPIL NYAMAN, TETAP PERCAYA DIRI
    </div>
  );
}

// ===============================
// NAVBAR
// ===============================

function Navbar({
  cartCount,
  onSelectCategory,
  searchTerm,
  onSearchChange,
  onOpenCart,
  onOpenDashboard,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  const links = ["Wanita", "Pria", "Koleksi Baru", "Grosir", "Tentang Kami"];

  const getLinkTarget = (link: string): string => {
    if (link === "Grosir") return "#grosir";
    if (link === "Tentang Kami") return "#tentang";
    return "#produk";
  };

  const handleNavigation = (link: string): void => {
    if (["Wanita", "Pria", "Koleksi Baru"].includes(link)) {
      onSelectCategory(link);
    }
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[#eae5dc] bg-[#faf8f4]/95 shadow-[0_4px_20px_rgba(41,40,33,0.03)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <a
          href="#home"
          className="font-heading text-3xl font-bold tracking-[0.18em] transition hover:text-[#a84a30]"
        >
          STELLA
        </a>

        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          {links.map((link) => (
            <a
              key={link}
              href={getLinkTarget(link)}
              onClick={() => handleNavigation(link)}
              className="transition hover:text-[#a84a30]"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Cari produk"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((open) => !open)}
          >
            <Search size={20} />
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Buka keranjang, ${cartCount} barang`}
            className="relative"
          >
            <ShoppingBag size={21} />

            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#a84a30] text-[10px] text-white">
              {cartCount}
            </span>
          </button>

          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noreferrer"
            className="hidden bg-[#304037] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a84a30] sm:block"
          >
            Chat WhatsApp
          </a>

          <button
            type="button"
            onClick={onOpenDashboard}
            className="hidden rounded-md border border-[#e5ded3] px-4 py-2.5 text-xs font-semibold transition hover:border-[#a84a30] hover:text-[#a84a30] lg:block"
          >
            Admin
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
            aria-label="Menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <form
          className="border-t border-[#eae5dc] px-5 py-4"
          onSubmit={(event) => {
            event.preventDefault();
            onSelectCategory("Semua");
            document
              .getElementById("produk")
              ?.scrollIntoView({ behavior: "smooth" });
            setSearchOpen(false);
          }}
        >
          <label className="mx-auto flex max-w-7xl items-center gap-3">
            <Search size={18} className="shrink-0 text-gray-500" />
            <input
              type="search"
              autoFocus
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Cari nama atau kategori produk..."
              className="w-full bg-transparent py-2 text-sm outline-none"
            />
            <button
              type="submit"
              className="text-sm font-semibold text-[#a84a30]"
            >
              Cari
            </button>
          </label>
        </form>
      )}

      {menuOpen && (
        <div className="border-t border-[#eae5dc] bg-[#faf8f4] px-6 py-5 md:hidden">
          {links.map((link) => (
            <a
              key={link}
              href={getLinkTarget(link)}
              onClick={() => handleNavigation(link)}
              className="block border-b border-[#eae5dc] py-3 text-sm"
            >
              {link}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onOpenDashboard();
            }}
            className="block w-full py-3 text-left text-sm font-semibold text-[#a84a30]"
          >
            Dashboard Admin
          </button>
        </div>
      )}
    </nav>
  );
}

// ===============================
// HERO SECTION
// ===============================

function Hero() {
  return (
    <section
      id="home"
      className="hero-section mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 md:grid-cols-2 md:py-20"
    >
      <div>
        <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#a84a30]/10 px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-[#a84a30]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#a84a30]" />
          KOLEKSI TERBARU · BANDUNG
        </p>

        <h1 className="font-heading text-5xl font-semibold leading-[1.08] tracking-tight md:text-6xl lg:text-7xl">
          Pakai STELLA,
          <br />
          <span className="text-[#a84a30]">pede maksimal</span>
        </h1>

        <p className="mt-6 max-w-lg text-base leading-8 text-[#77736b]">
          Pilihan busana nyaman dengan potongan timeless untuk menemani setiap
          momen. Temukan gaya favoritmu, untuk wanita maupun pria.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#produk"
            className="inline-flex items-center gap-3 bg-[#a84a30] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-[#a84a30]/20 transition hover:-translate-y-0.5 hover:bg-[#843922]"
          >
            Belanja Sekarang
            <ArrowRight size={16} />
          </a>

          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noreferrer"
            className="border border-[#39372f]/30 bg-white/50 px-7 py-4 text-sm font-semibold transition hover:border-[#304037] hover:bg-[#304037] hover:text-white"
          >
            Pesan via WhatsApp
          </a>
        </div>
      </div>

      <div className="hero-photo-wrap relative p-3 sm:p-5">
        <img
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85"
          alt="Koleksi fashion Stella"
          className="hero-photo h-105 w-full object-cover md:h-125"
        />

        <div className="absolute left-0 top-10 bg-white px-4 py-3 text-[10px] font-bold tracking-[0.18em] text-[#a84a30] shadow-lg sm:left-1 sm:top-14">
          NEW SEASON
        </div>
        <div className="absolute bottom-7 right-0 bg-white px-5 py-4 shadow-xl sm:bottom-10 sm:right-1 sm:px-7">
          <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500">
            Dikurasi untukmu
          </p>
          <p className="mt-1 font-heading text-xl font-bold">
            Stella · Bandung
          </p>
        </div>
      </div>
    </section>
  );
}

// ===============================
// INFORMASI LAYANAN
// ===============================

function ServiceInfo() {
  const services = [
    {
      icon: Tag,
      title: "Eceran & Grosir",
      desc: "Belanja satuan atau tanyakan penawaran grosir.",
      href: "#grosir",
      external: false,
    },
    {
      icon: Truck,
      title: "Pengiriman",
      desc: "Tanyakan ongkos kirim dan estimasi ke alamatmu.",
      href: `https://wa.me/6281234567890?text=${encodeURIComponent("Halo Stella, saya ingin bertanya tentang pengiriman dan ongkos kirim.")}`,
      external: true,
    },
    {
      icon: RefreshCw,
      title: "Tukar Ukuran",
      desc: "Hubungi kami untuk informasi penukaran ukuran.",
      href: `https://wa.me/6281234567890?text=${encodeURIComponent("Halo Stella, saya ingin bertanya tentang kebijakan tukar ukuran.")}`,
      external: true,
    },
    {
      icon: MessageCircle,
      title: "Layanan WhatsApp",
      desc: "Konsultasi produk dan pemesanan langsung via WhatsApp.",
      href: "https://wa.me/6281234567890",
      external: true,
    },
  ];

  return (
    <section
      id="layanan"
      className="grid grid-cols-1 gap-5 rounded-2xl border border-[#eae5dc] bg-white px-7 py-7 shadow-[0_15px_50px_rgba(41,40,33,0.05)] sm:grid-cols-2 lg:grid-cols-4"
    >
      {services.map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.title}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noreferrer" : undefined}
            className="group flex items-start gap-3 rounded-xl p-2 transition hover:bg-[#faf7f4] focus-visible:outline-[#a84a30]"
          >
            <span className="rounded-xl bg-[#a84a30]/10 p-2.5">
              <Icon className="shrink-0 text-[#a84a30]" size={20} />
            </span>

            <div className="min-w-0">
              <h3 className="text-sm font-bold transition group-hover:text-[#a84a30]">
                {item.title}
              </h3>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                {item.desc}
              </p>
            </div>
            <ArrowRight
              size={14}
              className="ml-auto mt-1 shrink-0 text-gray-300 transition group-hover:translate-x-1 group-hover:text-[#a84a30]"
            />
          </a>
        );
      })}
    </section>
  );
}

// ===============================
// KATEGORI
// ===============================

function Categories({
  onSelectCategory,
}: {
  onSelectCategory: (category: string) => void;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <p className="mb-3 text-[10px] font-bold tracking-[0.22em] text-[#a84a30]">
        TEMUKAN GAYAMU
      </p>
      <h2 className="font-heading text-3xl font-semibold md:text-4xl">
        Belanja per Kategori
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-7 text-[#77736b]">
        Kurasi pilihan untuk melengkapi penampilanmu, dari hari kerja sampai
        akhir pekan.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((category) => (
          <a
            href="#produk"
            key={category.name}
            onClick={() => onSelectCategory(category.name)}
            className="group relative h-64 overflow-hidden rounded-xl bg-[#e7dac8] shadow-sm md:h-72"
          >
            <img
              src={category.image}
              alt={category.name}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/5 to-transparent transition group-hover:from-black/60" />

            <div className="absolute bottom-0 flex w-full items-center justify-between px-4 py-5 text-white">
              <span className="font-semibold">{category.name}</span>
              <span className="rounded-full bg-white/20 p-2 backdrop-blur-sm transition group-hover:bg-white group-hover:text-[#304037]">
                <ArrowRight size={16} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ===============================
// PRODUK
// ===============================

function Products({
  addToCart,
  activeCategory,
  onCategoryChange,
  searchTerm,
  products: productList,
}: ProductsProps) {
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>(
    {},
  );
  const filters = [
    "Semua",
    "Wanita",
    "Pria",
    "Koleksi Baru",
    "Atasan",
    "Bawahan",
    "Dress",
    "Outer",
    "Jilbab",
  ];

  const categoryProducts =
    activeCategory === "Semua"
      ? productList
      : activeCategory === "Wanita"
        ? productList.filter((product) => product.category !== "Pria")
        : activeCategory === "Koleksi Baru"
          ? productList.filter((product) => product.label === "Baru")
          : productList.filter(
              (product) => product.category === activeCategory,
            );
  const normalizedSearch = searchTerm.trim().toLocaleLowerCase("id-ID");
  const filteredProducts = categoryProducts.filter((product) =>
    `${product.name} ${product.category}`
      .toLocaleLowerCase("id-ID")
      .includes(normalizedSearch),
  );

  return (
    <section id="produk" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <p className="mb-2 text-[10px] font-bold tracking-[0.22em] text-[#a84a30]">
            FAVORIT PELANGGAN
          </p>
          <h2 className="font-heading text-3xl font-semibold md:text-4xl">
            Pilihan untukmu
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => onCategoryChange(filter)}
              className={`rounded-full border px-4 py-2.5 text-xs font-medium transition ${
                activeCategory === filter
                  ? "border-[#292821] bg-[#292821] text-white"
                  : "border-[#e5ded3] bg-white hover:border-[#a84a30]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 && (
        <p className="mt-8 text-sm text-gray-500">
          Produk tidak ditemukan. Coba kata kunci atau kategori lain.
        </p>
      )}

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {filteredProducts.map((product) => {
          const options =
            product.options ??
            (product.category === "Jilbab"
              ? ["Voal", "Ceruty", "Jersey"]
              : ["S", "M", "L", "XL"]);
          const optionLabel =
            product.optionLabel ??
            (product.category === "Jilbab" ? "Pilih bahan" : "Pilih ukuran");

          return (
            <div
              key={product.id}
              className="group overflow-hidden rounded-xl border border-[#eae5dc] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#292821]/10"
            >
              <div className="relative overflow-hidden bg-[#eee8df]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-64 w-full object-cover transition duration-700 group-hover:scale-105 md:h-80"
                />

                {product.label && (
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold text-[#304037] shadow-sm">
                    {product.label}
                  </span>
                )}
              </div>

              <div className="p-4">
                <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500">
                  {product.category}
                </p>
                <p className="mt-1 text-sm font-semibold">{product.name}</p>

                <p className="mt-2 font-medium text-[#a84a30]">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>

                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#77736b]">
                  {optionLabel}
                  {selectedSizes[product.id] && (
                    <span className="ml-1.5 normal-case tracking-normal text-[#304037]">
                      · {selectedSizes[product.id]} dipilih
                    </span>
                  )}
                </p>
                <div
                  className="mt-2 flex flex-wrap gap-2"
                  role="group"
                  aria-label={`${optionLabel} untuk ${product.name}`}
                >
                  {options.map((size) => (
                    <button
                      key={size}
                      type="button"
                      aria-pressed={selectedSizes[product.id] === size}
                      onClick={() =>
                        setSelectedSizes((current) => ({
                          ...current,
                          [product.id]: size,
                        }))
                      }
                      className={`flex h-10 min-w-10 items-center justify-center rounded-lg border text-xs font-semibold transition duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a84a30] ${
                        selectedSizes[product.id] === size
                          ? "border-[#304037] bg-[#304037] text-white shadow-md shadow-[#304037]/20"
                          : "border-[#e5ded3] bg-[#faf8f4] text-[#39372f] hover:border-[#a84a30] hover:bg-[#a84a30]/5 hover:text-[#a84a30]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  disabled={!selectedSizes[product.id]}
                  onClick={() => addToCart(product, selectedSizes[product.id])}
                  className="mt-4 w-full rounded-md bg-[#304037] px-3 py-3 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#a84a30] disabled:cursor-not-allowed disabled:bg-[#eeeae2] disabled:text-[#77736b]"
                >
                  {selectedSizes[product.id]
                    ? `Tambah ke Keranjang · ${selectedSizes[product.id]}`
                    : product.category === "Jilbab"
                      ? "Pilih Bahan"
                      : "Pilih Ukuran"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ===============================
// GROSIR
// ===============================

function Wholesale() {
  return (
    <section id="grosir" className="mx-auto max-w-7xl px-5 py-12">
      <div className="flex flex-col items-start justify-between gap-7 bg-[#304037] px-8 py-12 text-white md:flex-row md:items-center md:px-14">
        <div>
          <p className="mb-4 text-xs font-bold tracking-[0.2em] text-[#e6b49d]">
            UNTUK RESELLER & TOKO
          </p>

          <h2 className="font-heading text-3xl font-semibold md:text-4xl">
            Belanja grosir langsung dari Bandung
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-gray-300">
            Tanyakan harga grosir, syarat pembelian, katalog lengkap, dan
            ketersediaan stok langsung kepada tim kami.
          </p>
        </div>

        <a
          href={`https://wa.me/6281234567890?text=${encodeURIComponent("Halo Stella, saya ingin meminta katalog dan informasi pembelian grosir.")}`}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 bg-[#a84a30] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#843922]"
        >
          Minta Katalog Grosir
        </a>
      </div>
    </section>
  );
}

// ===============================
// TESTIMONI
// ===============================

function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <h2 className="font-heading text-center text-3xl font-semibold">
        Kata Pelanggan
      </h2>

      <div className="mt-9 grid gap-5 md:grid-cols-3">
        {testimonials.map((item) => (
          <div key={item.name} className="border border-[#eae5dc] bg-white p-7">
            <div className="flex gap-1 text-[#c17a43]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={15} fill="currentColor" />
              ))}
            </div>

            <p className="mt-5 text-sm leading-7 text-gray-600">
              "{item.review}"
            </p>

            <div className="mt-6 border-t border-[#eee8df] pt-5">
              <p className="font-semibold">{item.name}</p>
              <p className="mt-1 text-xs text-gray-500">{item.city}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ===============================
// LOKASI TOKO
// ===============================

function StoreLocation() {
  return (
    <section id="tentang" className="mx-auto max-w-7xl px-5 py-12">
      <div className="grid items-center gap-8 bg-[#eee8df] p-8 md:grid-cols-2 md:p-12">
        <div>
          <h2 className="font-heading text-3xl font-semibold">
            Kunjungi Toko Kami
          </h2>

          <div className="mt-6 space-y-4 text-sm text-gray-600">
            <p className="flex items-start gap-3">
              <MapPin className="shrink-0 text-[#a84a30]" size={19} />
              Bandung, Jawa Barat
            </p>

            <p>Hubungi kami untuk informasi jam operasional.</p>

            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition hover:text-[#a84a30]"
            >
              <MessageCircle className="shrink-0 text-[#a84a30]" size={19} />
              Tanya melalui WhatsApp
            </a>
          </div>

          <a
            href="https://maps.google.com/?q=Bandung"
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 bg-[#304037] px-6 py-3 text-sm font-semibold text-white"
          >
            Petunjuk Arah
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="h-64 overflow-hidden bg-[#ddd3c5] md:h-72">
          <iframe
            title="Lokasi toko Stella Bandung"
            src="https://maps.google.com/maps?q=Bandung&t=&z=12&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            className="border-0"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

// ===============================
// FOOTER
// ===============================

function Footer({
  onSelectCategory,
}: {
  onSelectCategory: (category: string) => void;
}) {
  return (
    <footer className="mt-12 bg-[#304037] px-5 py-14 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <h2 className="font-heading text-3xl font-bold tracking-widest">
            STELLA
          </h2>

          <p className="mt-5 max-w-xs text-sm leading-7 text-gray-300">
            Fashion boutique di Bandung. Melayani eceran dan grosir.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Belanja</h3>

          <ul className="mt-5 space-y-3 text-sm text-gray-300">
            <li>
              <a href="#produk" onClick={() => onSelectCategory("Wanita")}>
                Wanita
              </a>
            </li>
            <li>
              <a href="#produk" onClick={() => onSelectCategory("Pria")}>
                Pria
              </a>
            </li>
            <li>
              <a
                href="#produk"
                onClick={() => onSelectCategory("Koleksi Baru")}
              >
                Koleksi Baru
              </a>
            </li>
            <li>
              <a href="#grosir">Grosir</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Bantuan</h3>

          <ul className="mt-5 space-y-3 text-sm text-gray-300">
            <li>
              <a href="#produk">Cara Pemesanan</a>
            </li>
            <li>
              <a href="#layanan">Pengiriman</a>
            </li>
            <li>
              <a href="#layanan">Tukar & Retur</a>
            </li>
            <li>
              <a href="#produk">Panduan Ukuran</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Hubungi Kami</h3>

          <div className="mt-5 flex gap-4">
            <a href="https://wa.me/6281234567890" aria-label="WhatsApp">
              <MessageCircle />
            </a>

            <a href="https://instagram.com" aria-label="Instagram">
              <Camera />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/20 pt-7 text-center text-xs text-gray-300">
        © 2026 Stella. Semua hak dilindungi.
      </div>
    </footer>
  );
}

// ===============================
// DASHBOARD ADMIN
// ===============================

const adminSections = [
  { name: "Home", icon: Home, group: "MAIN" },
  { name: "Pesanan", icon: ShoppingCart, group: "MAIN" },
  { name: "Produk", icon: Package, group: "MAIN" },
  { name: "Pelanggan", icon: Users, group: "MAIN" },
  { name: "Konten", icon: FileText, group: "MAIN" },
  { name: "Keuangan", icon: Wallet, group: "MAIN" },
  { name: "Analitik", icon: BarChart3, group: "MAIN" },
  { name: "Marketing", icon: Megaphone, group: "MAIN" },
  { name: "Diskon", icon: Tag, group: "MAIN" },
  { name: "Toko Online", icon: Store, group: "SALURAN PENJUALAN" },
  { name: "Point of Sale", icon: Monitor, group: "SALURAN PENJUALAN" },
  { name: "Shop", icon: ShoppingBag, group: "SALURAN PENJUALAN" },
  { name: "Pengaturan", icon: Settings, group: "PENGATURAN" },
];

const statusLabels = ["Semua", "Published", "Draft", "Inactive"] as const;
type AdminStatusFilter = (typeof statusLabels)[number];
type ProductForm = {
  name: string;
  category: string;
  price: string;
  stock: string;
  image: string;
  status: "Published" | "Draft" | "Inactive";
};

const emptyProductForm: ProductForm = {
  name: "",
  category: "Atasan",
  price: "",
  stock: "10",
  image: "",
  status: "Published",
};

function AdminDashboard({
  products: inventory,
  onProductsChange,
  onClose,
}: DashboardProps) {
  const [section, setSection] = useState("Produk");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<AdminStatusFilter>("Semua");
  const [categoryFilter, setCategoryFilter] = useState("Semua kategori");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyProductForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const publishedCount = inventory.filter(
    (product) => (product.status ?? "Published") === "Published",
  ).length;
  const draftCount = inventory.filter(
    (product) => (product.status ?? "Published") === "Draft",
  ).length;
  const filteredInventory = inventory.filter((product) => {
    const matchesSearch = `${product.name} ${product.category}`
      .toLocaleLowerCase("id-ID")
      .includes(search.trim().toLocaleLowerCase("id-ID"));
    const matchesStatus =
      statusFilter === "Semua" ||
      (product.status ?? "Published") === statusFilter;
    const matchesCategory =
      categoryFilter === "Semua kategori" ||
      product.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const exportProducts = (): void => {
    const csvRows = [
      ["Nama Produk", "Kategori", "Harga", "Stok", "Status"],
      ...filteredInventory.map((product) => [
        product.name,
        product.category,
        String(product.price),
        String(product.stock ?? 0),
        product.status ?? "Published",
      ]),
    ];
    const csv = csvRows
      .map((row) =>
        row.map((value) => `"${value.replaceAll('"', '""')}"`).join(","),
      )
      .join("\r\n");
    const downloadUrl = URL.createObjectURL(
      new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "produk-stella.csv";
    link.click();
    URL.revokeObjectURL(downloadUrl);
  };

  const openNewProductForm = (): void => {
    setEditingId(null);
    setForm(emptyProductForm);
    setFormOpen(true);
  };

  const openEditProductForm = (product: Product): void => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock ?? 0),
      image: product.image,
      status: product.status ?? "Published",
    });
    setFormOpen(true);
  };

  const saveProduct = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const price = Number(form.price);
    const stock = Number(form.stock);
    if (
      !Number.isFinite(price) ||
      price <= 0 ||
      !Number.isFinite(stock) ||
      stock < 0
    ) {
      setNotice("Harga harus lebih dari 0 dan stok tidak boleh negatif.");
      return;
    }

    const updatedProduct: Product = {
      id: editingId ?? Date.now(),
      name: form.name.trim(),
      category: form.category,
      price,
      stock,
      image:
        form.image.trim() ||
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85",
      status: form.status,
      label: form.status === "Published" ? "Baru" : "",
      ...(form.category === "Jilbab"
        ? {
            options: ["Voal", "Ceruty", "Jersey"],
            optionLabel: "Bahan",
          }
        : {}),
    };

    if (editingId === null) {
      onProductsChange([...inventory, updatedProduct]);
      setNotice("Produk berhasil ditambahkan.");
    } else {
      onProductsChange(
        inventory.map((product) =>
          product.id === editingId ? updatedProduct : product,
        ),
      );
      setNotice("Perubahan produk berhasil disimpan.");
    }
    setFormOpen(false);
  };

  const toggleProductSelection = (id: number): void => {
    setSelectedIds((ids) =>
      ids.includes(id)
        ? ids.filter((selectedId) => selectedId !== id)
        : [...ids, id],
    );
  };

  const deleteSelectedProducts = (): void => {
    onProductsChange(
      inventory.filter((product) => !selectedIds.includes(product.id)),
    );
    setSelectedIds([]);
    setNotice("Produk terpilih berhasil dihapus.");
  };

  const placeholderDescriptions: Record<string, string> = {
    Home: "Ringkasan katalog dan aktivitas toko Stella.",
    Pesanan: "Kelola pesanan pelanggan ketika data pesanan sudah dihubungkan.",
    Pelanggan:
      "Daftar pelanggan akan tampil setelah sistem pelanggan tersedia.",
    Konten: "Kelola banner dan konten toko dari halaman ini.",
    Keuangan: "Ringkasan transaksi akan tersedia setelah pembayaran terhubung.",
    Analitik:
      "Statistik kunjungan dan penjualan akan tampil setelah analitik aktif.",
    Marketing: "Kelola kampanye pemasaran toko Stella.",
    Diskon: "Atur promo dan diskon untuk produk pilihan.",
    "Toko Online": "Pengaturan tampilan dan informasi toko online.",
    "Point of Sale": "Fitur kasir akan tersedia di bagian ini.",
    Shop: "Hubungkan kanal penjualan Shop untuk mengelola produk.",
    Pengaturan: "Atur preferensi dashboard dan toko.",
  };

  return (
    <div className="admin-shell min-h-screen bg-[#f4f3f8] text-[#25232d]">
      <aside className="admin-sidebar fixed inset-y-0 left-0 z-30 flex w-60 flex-col border-r border-[#ecebf1] bg-white">
        <button
          type="button"
          onClick={onClose}
          className="flex h-18 items-center gap-3 border-b border-[#f0eff4] px-6 text-left"
          aria-label="Kembali ke toko Stella"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7952d6] text-sm font-bold text-white">
            S
          </span>
          <span>
            <span className="block text-sm font-bold">Stella</span>
            <span className="block text-[10px] text-gray-500">
              Store dashboard
            </span>
          </span>
        </button>

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          {["MAIN", "SALURAN PENJUALAN", "PENGATURAN"].map((group) => (
            <div key={group} className="mb-5">
              <p className="px-3 pb-2 text-[9px] font-bold tracking-[0.16em] text-gray-400">
                {group}
              </p>
              <div className="space-y-1">
                {adminSections
                  .filter((item) => item.group === group)
                  .map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => {
                          setSection(item.name);
                          setNotice("");
                        }}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs transition ${
                          section === item.name
                            ? "bg-[#f0ecfb] font-semibold text-[#7048cf]"
                            : "text-[#65636c] hover:bg-[#f7f6fa] hover:text-[#25232d]"
                        }`}
                      >
                        <Icon size={16} />
                        {item.name}
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-[#f0eff4] p-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg border border-[#e9e7ef] px-3 py-2.5 text-xs font-semibold transition hover:bg-[#f7f6fa]"
          >
            Kembali ke toko
          </button>
        </div>
      </aside>

      <main className="admin-main min-h-screen pl-60">
        <header className="sticky top-0 z-20 flex min-h-18] items-center justify-between gap-4 border-b border-[#ecebf1] bg-white/95 px-5 backdrop-blur md:px-8">
          <label className="flex w-full max-w-sm items-center gap-2 rounded-lg border border-[#ecebf1] bg-[#fbfbfd] px-3 py-2">
            <Search size={15} className="text-gray-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari produk..."
              className="w-full bg-transparent text-xs outline-none"
            />
          </label>
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              aria-label="Notifikasi"
              onClick={() => setNotice("Tidak ada notifikasi baru.")}
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
            >
              <Bell size={17} />
            </button>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f4d8c8] text-xs font-bold text-[#7048cf]">
              S
            </span>
            <span className="hidden text-xs sm:block">
              <strong className="block">Stella</strong>
              <span className="text-gray-500">Pemilik toko</span>
            </span>
          </div>
        </header>

        <div className="p-5 md:p-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8b8796]">
                Manajemen toko
              </p>
              <h1 className="text-2xl font-bold tracking-tight">{section}</h1>
              <p className="mt-1 text-xs text-[#85828d]">
                {section === "Produk"
                  ? "Kelola katalog, harga, stok, dan ketersediaan produk."
                  : placeholderDescriptions[section]}
              </p>
            </div>
            <div className="flex gap-2">
              {section === "Produk" && (
                <>
                  <button
                    type="button"
                    onClick={exportProducts}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#e7e5ec] bg-white px-3 py-2.5 text-xs font-semibold hover:bg-[#faf9fc]"
                  >
                    <Download size={14} /> Ekspor
                  </button>
                  <button
                    type="button"
                    onClick={openNewProductForm}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#7952d6] px-3 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#6842c2]"
                  >
                    <Plus size={15} /> Tambah produk
                  </button>
                </>
              )}
            </div>
          </div>

          {notice && (
            <div
              role="status"
              className="mb-5 flex items-center justify-between rounded-lg border border-[#d9efdf] bg-[#f0faf3] px-4 py-3 text-xs text-[#267442]"
            >
              {notice}
              <button
                type="button"
                onClick={() => setNotice("")}
                aria-label="Tutup notifikasi"
              >
                <X size={14} />
              </button>
            </div>
          )}

          <div className="mb-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
            {[
              {
                title: "TOTAL PRODUK",
                value: inventory.length.toLocaleString("id-ID"),
                note: `${publishedCount} produk aktif`,
                icon: Package,
                color: "text-[#7952d6]",
              },
              {
                title: "TOTAL STOK",
                value: inventory
                  .reduce((sum, product) => sum + (product.stock ?? 0), 0)
                  .toLocaleString("id-ID"),
                note: "Unit dalam katalog",
                icon: ShoppingCart,
                color: "text-[#308c70]",
              },
              {
                title: "PRODUK DRAFT",
                value: String(draftCount),
                note: "Belum dipublikasikan",
                icon: FileText,
                color: "text-[#d19137]",
              },
              {
                title: "KATEGORI",
                value: String(
                  new Set(inventory.map((product) => product.category)).size,
                ),
                note: "Kategori terdaftar",
                icon: CircleDollarSign,
                color: "text-[#3882bd]",
              },
            ].map((metric) => {
              const Icon = metric.icon;
              return (
                <article
                  key={metric.title}
                  className="rounded-xl border border-[#ecebf1] bg-white p-4 shadow-[0_2px_8px_rgba(25,20,45,0.02)]"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] font-bold tracking-[0.12em] text-[#85828d]">
                      {metric.title}
                    </p>
                    <Icon size={15} className={metric.color} />
                  </div>
                  <p className="mt-3 text-2xl font-bold tracking-tight">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-[10px] text-[#96939e]">
                    {metric.note}
                  </p>
                </article>
              );
            })}
          </div>

          {section === "Produk" ? (
            <section className="overflow-hidden rounded-xl border border-[#ecebf1] bg-white">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f0eff4] p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <label className="flex items-center gap-2 rounded-lg border border-[#ecebf1] px-3 py-2">
                    <Search size={14} className="text-gray-400" />
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Cari nama produk..."
                      className="w-40 text-[11px] outline-none"
                    />
                  </label>
                  <label className="flex items-center gap-2 rounded-lg border border-[#ecebf1] px-3 py-2 text-[11px] text-[#65636c]">
                    <Filter size={13} />
                    <select
                      value={categoryFilter}
                      onChange={(event) =>
                        setCategoryFilter(event.target.value)
                      }
                      className="max-w-32 bg-transparent outline-none"
                    >
                      <option>Semua kategori</option>
                      {[
                        ...new Set(
                          inventory.map((product) => product.category),
                        ),
                      ].map((category) => (
                        <option key={category}>{category}</option>
                      ))}
                    </select>
                    <ChevronDown size={12} />
                  </label>
                </div>
                <div className="flex items-center gap-1 rounded-lg bg-[#f5f4f8] p-1">
                  {statusLabels.map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setStatusFilter(status)}
                      className={`rounded-md px-2.5 py-1.5 text-[10px] transition ${statusFilter === status ? "bg-white font-semibold shadow-sm" : "text-gray-500 hover:text-gray-800"}`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {selectedIds.length > 0 && (
                <div className="flex items-center justify-between border-b border-[#f0eff4] bg-[#faf9fd] px-4 py-2.5 text-xs">
                  <span>{selectedIds.length} produk dipilih</span>
                  <button
                    type="button"
                    onClick={deleteSelectedProducts}
                    className="inline-flex items-center gap-1.5 font-semibold text-[#c33f53] hover:underline"
                  >
                    <Trash2 size={13} /> Hapus pilihan
                  </button>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full min-w-180 text-left">
                  <thead className="bg-[#fbfbfd] text-[9px] font-semibold uppercase tracking-widest text-[#898692]">
                    <tr>
                      <th className="w-10 px-4 py-3">
                        <input
                          type="checkbox"
                          aria-label="Pilih semua produk"
                          checked={
                            filteredInventory.length > 0 &&
                            filteredInventory.every((product) =>
                              selectedIds.includes(product.id),
                            )
                          }
                          onChange={(event) =>
                            setSelectedIds(
                              event.target.checked
                                ? filteredInventory.map((product) => product.id)
                                : [],
                            )
                          }
                        />
                      </th>
                      <th className="px-2 py-3">Nama produk</th>
                      <th className="px-2 py-3">Kategori</th>
                      <th className="px-2 py-3">Harga</th>
                      <th className="px-2 py-3">Stok</th>
                      <th className="px-2 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f0f4] text-[11px]">
                    {filteredInventory.map((product) => {
                      const status = product.status ?? "Published";
                      return (
                        <tr
                          key={product.id}
                          className="transition hover:bg-[#fcfbfe]"
                        >
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              aria-label={`Pilih ${product.name}`}
                              checked={selectedIds.includes(product.id)}
                              onChange={() =>
                                toggleProductSelection(product.id)
                              }
                            />
                          </td>
                          <td className="px-2 py-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image}
                                alt=""
                                className="h-10 w-9 rounded-md bg-[#f2f0f5] object-cover"
                              />
                              <div>
                                <p className="font-semibold">{product.name}</p>
                                <p className="mt-1 text-[9px] text-gray-400">
                                  ID #{product.id}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-2 py-3 text-[#716e79]">
                            {product.category}
                          </td>
                          <td className="px-2 py-3 font-medium">
                            Rp {product.price.toLocaleString("id-ID")}
                          </td>
                          <td className="px-2 py-3">{product.stock ?? 0}</td>
                          <td className="px-2 py-3">
                            <span
                              className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${status === "Published" ? "bg-[#e2f7ed] text-[#218250]" : status === "Draft" ? "bg-[#f0eff2] text-[#77747d]" : "bg-[#fff0da] text-[#b16c13]"}`}
                            >
                              {status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex justify-end gap-1">
                              <button
                                type="button"
                                onClick={() => openEditProductForm(product)}
                                aria-label={`Edit ${product.name}`}
                                className="rounded-md p-2 text-gray-500 hover:bg-[#f0ecfb] hover:text-[#7048cf]"
                              >
                                <Pencil size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  onProductsChange(
                                    inventory.filter(
                                      (item) => item.id !== product.id,
                                    ),
                                  );
                                  setNotice("Produk berhasil dihapus.");
                                }}
                                aria-label={`Hapus ${product.name}`}
                                className="rounded-md p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredInventory.length === 0 && (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-4 py-12 text-center text-xs text-gray-500"
                        >
                          Produk tidak ditemukan. Coba ubah pencarian atau
                          filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-[#f0eff4] px-4 py-3 text-[10px] text-gray-500">
                Menampilkan {filteredInventory.length} dari {inventory.length}{" "}
                produk
              </div>
            </section>
          ) : (
            <section className="rounded-xl border border-[#ecebf1] bg-white p-8 text-center md:p-14">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0ecfb] text-[#7952d6]">
                {(() => {
                  const SectionIcon =
                    adminSections.find((item) => item.name === section)?.icon ??
                    Home;
                  return <SectionIcon size={22} />;
                })()}
              </span>
              <h2 className="mt-4 text-lg font-bold">{section}</h2>
              <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-gray-500">
                {placeholderDescriptions[section] ?? "Ringkasan toko Stella."}
              </p>
              <p className="mt-3 text-[10px] text-gray-400">
                Bagian ini belum terhubung ke data toko.
              </p>
              <button
                type="button"
                onClick={() => setSection("Produk")}
                className="mt-6 rounded-lg bg-[#7952d6] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#6842c2]"
              >
                Kelola produk
              </button>
            </section>
          )}
        </div>
      </main>

      {formOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#211d2b]/40 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) setFormOpen(false);
          }}
        >
          <form
            onSubmit={saveProduct}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7952d6]">
                  Katalog Stella
                </p>
                <h2 className="mt-1 text-xl font-bold">
                  {editingId === null ? "Tambah produk" : "Edit produk"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                aria-label="Tutup formulir"
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-medium sm:col-span-2">
                Nama produk
                <input
                  required
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  className="mt-1.5 w-full rounded-lg border border-[#e7e5ec] px-3 py-2.5 font-normal outline-none focus:border-[#7952d6]"
                  placeholder="Contoh: Blouse Linen"
                />
              </label>
              <label className="text-xs font-medium">
                Kategori
                <select
                  value={form.category}
                  onChange={(event) =>
                    setForm({ ...form, category: event.target.value })
                  }
                  className="mt-1.5 w-full rounded-lg border border-[#e7e5ec] bg-white px-3 py-2.5 font-normal"
                >
                  {[
                    "Atasan",
                    "Bawahan",
                    "Dress",
                    "Outer",
                    "Pria",
                    "Jilbab",
                  ].map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </label>
              <label className="text-xs font-medium">
                Status
                <select
                  value={form.status}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      status: event.target.value as ProductForm["status"],
                    })
                  }
                  className="mt-1.5 w-full rounded-lg border border-[#e7e5ec] bg-white px-3 py-2.5 font-normal"
                >
                  <option>Published</option>
                  <option>Draft</option>
                  <option>Inactive</option>
                </select>
              </label>
              <label className="text-xs font-medium">
                Harga (Rp)
                <input
                  required
                  type="number"
                  min="1"
                  value={form.price}
                  onChange={(event) =>
                    setForm({ ...form, price: event.target.value })
                  }
                  className="mt-1.5 w-full rounded-lg border border-[#e7e5ec] px-3 py-2.5 font-normal"
                  placeholder="150000"
                />
              </label>
              <label className="text-xs font-medium">
                Stok
                <input
                  required
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={(event) =>
                    setForm({ ...form, stock: event.target.value })
                  }
                  className="mt-1.5 w-full rounded-lg border border-[#e7e5ec] px-3 py-2.5 font-normal"
                />
              </label>
              <label className="text-xs font-medium sm:col-span-2">
                URL gambar
                <input
                  type="url"
                  value={form.image}
                  onChange={(event) =>
                    setForm({ ...form, image: event.target.value })
                  }
                  className="mt-1.5 w-full rounded-lg border border-[#e7e5ec] px-3 py-2.5 font-normal"
                  placeholder="https://..."
                />
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="rounded-lg border border-[#e7e5ec] px-4 py-2.5 text-xs font-semibold"
              >
                Batal
              </button>
              <button
                type="submit"
                className="rounded-lg bg-[#7952d6] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#6842c2]"
              >
                Simpan produk
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// ===============================
// MAIN APP
// ===============================

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [dashboardOpen, setDashboardOpen] = useState<boolean>(false);
  const [storeProducts, setStoreProducts] = useState<Product[]>(products);
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const selectCategory = (category: string): void => {
    setActiveCategory(category);
    document.getElementById("produk")?.scrollIntoView({ behavior: "smooth" });
  };

  const addToCart = (product: Product, selectedOption: string): void => {
    setCart((currentCart) => [...currentCart, { ...product, selectedOption }]);
    setCartOpen(true);
  };

  const cartTotal = cart.reduce((total, product) => total + product.price, 0);
  const orderMessage = encodeURIComponent(
    `Halo, saya ingin memesan:\n${cart.map((product) => `- ${product.name} (${product.optionLabel ?? (product.category === "Jilbab" ? "Bahan" : "Ukuran")}: ${product.selectedOption}): Rp ${product.price.toLocaleString("id-ID")}`).join("\n")}\n\nTotal: Rp ${cartTotal.toLocaleString("id-ID")}`,
  );

  if (dashboardOpen) {
    return (
      <AdminDashboard
        products={storeProducts}
        onProductsChange={setStoreProducts}
        onClose={() => setDashboardOpen(false)}
      />
    );
  }

  return (
    <>
      <AnnouncementBar />

      <Navbar
        cartCount={cart.length}
        onSelectCategory={selectCategory}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onOpenCart={() => setCartOpen(true)}
        onOpenDashboard={() => setDashboardOpen(true)}
      />

      <main>
        <Hero />

        <div className="mx-auto max-w-7xl px-5">
          <ServiceInfo />
        </div>

        <Categories onSelectCategory={selectCategory} />

        <Products
          addToCart={addToCart}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchTerm={searchTerm}
          products={storeProducts}
        />

        <Wholesale />

        <Testimonials />

        <StoreLocation />
      </main>

      <Footer onSelectCategory={selectCategory} />

      {cartOpen && (
        <div
          className="fixed inset-0 z-60 flex justify-end bg-black/40"
          onClick={(event) => {
            if (event.target === event.currentTarget) setCartOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="h-full w-full max-w-md overflow-y-auto bg-[#faf8f4] p-6 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-[#eae5dc] pb-5">
              <h2
                id="cart-title"
                className="font-heading text-2xl font-semibold"
              >
                Keranjang ({cart.length})
              </h2>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Tutup keranjang"
              >
                <X />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-sm text-gray-600">Keranjang masih kosong.</p>
                <button
                  type="button"
                  onClick={() => {
                    setCartOpen(false);
                    document
                      .getElementById("produk")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-5 bg-[#304037] px-5 py-3 text-sm font-semibold text-white"
                >
                  Lihat Produk
                </button>
              </div>
            ) : (
              <>
                <ul className="divide-y divide-[#eae5dc]">
                  {cart.map((product, index) => (
                    <li
                      key={`${product.id}-${index}`}
                      className="flex items-center gap-4 py-4"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-20 w-16 object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">{product.name}</p>
                        <p className="mt-1 text-xs text-gray-500">
                          {product.optionLabel ??
                            (product.category === "Jilbab"
                              ? "Bahan"
                              : "Ukuran")}
                          : {product.selectedOption}
                        </p>
                        <p className="mt-1 text-sm text-[#a84a30]">
                          Rp {product.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label={`Hapus ${product.name} dari keranjang`}
                        onClick={() =>
                          setCart((items) =>
                            items.filter((_, itemIndex) => itemIndex !== index),
                          )
                        }
                        className="text-sm text-gray-500 hover:text-[#a84a30]"
                      >
                        Hapus
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 border-t border-[#eae5dc] pt-5">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>Rp {cartTotal.toLocaleString("id-ID")}</span>
                  </div>
                  <a
                    href={`https://wa.me/6281234567890?text=${orderMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 block bg-[#304037] px-5 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#a84a30]"
                  >
                    Pesan via WhatsApp
                  </a>
                </div>
              </>
            )}
          </section>
        </div>
      )}

      <a
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-110"
      >
        <MessageCircle size={27} />
      </a>
    </>
  );
}
