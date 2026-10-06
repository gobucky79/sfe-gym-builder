import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Phone, 
  MapPin, 
  Star, 
  CheckCircle2, 
  ChevronRight, 
  Sliders, 
  Dumbbell, 
  ShieldCheck, 
  Truck, 
  Calculator, 
  X, 
  Eye, 
  Plus, 
  Minus, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Ruler, 
  Award, 
  Info,
  Clock,
  ChevronDown,
  Menu,
  Check
} from 'lucide-react';

const PRODUCTS = [
  {
    id: 'sfe-ft-01',
    name: 'SFE Industrial Dual-Stack Functional Trainer',
    category: 'strength',
    price: 3299,
    originalPrice: 4199,
    rating: 4.9,
    reviews: 48,
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800',
    specs: ['2x 220lb Weight Stacks', '11-Gauge Heavy Steel', '2:1 Cable Ratio', 'Multi-Grip Pull-Up Bar'],
    badge: 'Bestseller',
    description: 'Commercial-grade dual weight stack functional trainer designed for relentless continuous use in high-traffic gyms and home studios.'
  },
  {
    id: 'sfe-lc-02',
    name: 'SFE Commercial Leg Extension / Prone Leg Curl Combo',
    category: 'strength',
    price: 2499,
    originalPrice: 2999,
    rating: 4.8,
    reviews: 32,
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=800',
    specs: ['250lb Selectorized Stack', 'Space-Saving Design', 'Quick Pin Adjustment', 'Tear-Resistant Vinyl'],
    badge: 'Save $500',
    description: 'Dual-function isolation machine allowing seamless transition between knee extension and prone hamstrings curls in a single compact footprint.'
  },
  {
    id: 'sfe-ar-03',
    name: 'SFE Apex Curved Air Runner',
    category: 'cardio',
    price: 2899,
    originalPrice: 3499,
    rating: 5.0,
    reviews: 61,
    image: 'https://images.unsplash.com/photo-1576678927484-cc909957088c?auto=format&fit=crop&q=80&w=800',
    specs: ['Motorless Self-Powered', 'Slatted Rubber Track', '6 Resistance Levels', 'LCD Telemetry Console'],
    badge: 'Commercial Rated',
    description: 'Zero-motor curved treadmill designed to burn up to 30% more calories while reducing joint stress and eliminating power requirements.'
  },
  {
    id: 'sfe-sm-04',
    name: 'SFE Commercial Stepmill Pro',
    category: 'cardio',
    price: 3999,
    originalPrice: 4799,
    rating: 4.9,
    reviews: 29,
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=800',
    specs: ['Auto-Locking Safety Stop', 'Deep Ergonomic Steps', 'Heart Rate Grip Sensors', '20 Speed Settings'],
    badge: 'Top Rated',
    description: 'Heavy-duty stair climber with extra-wide revolving steps and intuitive telemetry console for intense cardio workouts.'
  },
  {
    id: 'sfe-hs-05',
    name: 'SFE Heavy-Duty Hack Squat & Leg Press Combo',
    category: 'strength',
    price: 2799,
    originalPrice: 3299,
    rating: 4.9,
    reviews: 55,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
    specs: ['1000lb Load Capacity', 'Linear Bearing Smoothness', 'Dual Safety Catch Hooks', '45-Degree Angle'],
    badge: 'Heavy Duty',
    description: 'Versatile plate-loaded leg train station featuring ultra-smooth quad and glute pressing with safety stop adjustments.'
  },
  {
    id: 'sfe-tm-06',
    name: 'SFE Pro-Series Commercial Treadmill',
    category: 'cardio',
    price: 3499,
    originalPrice: 4299,
    rating: 4.8,
    reviews: 41,
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=800',
    specs: ['4.5 HP AC Drive Motor', '22" x 60" Running Surface', '15% Incline Engine', 'High-Impact Cushioning'],
    badge: 'Showroom Fav',
    description: 'Built for continuous high-speed running in commercial environments, featuring commercial shock-absorption cushioning.'
  }
];

const PACKAGES = [
  {
    id: 'pkg-garage',
    title: 'The Ultimate Garage Gym Bundle',
    tagline: 'Turn your 1 or 2 car garage into a elite strength laboratory.',
    price: 5499,
    originalPrice: 6800,
    monthly: 149,
    footprint: '180 - 250 sq ft',
    target: 'Home Owners & Garage Athletes',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    equipment: [
      'SFE Dual-Stack Functional Trainer (2x 220lb stacks)',
      'SFE Commercial Leg Ext/Curl Combo Machine',
      'Heavy-Duty Adjustable Bench (0-90 degrees)',
      '500lb Rubber Virgin Bumper Plate Set + 20kg Barbell',
      'High-Impact Interlocking Rubber Tiles (200 sq ft)'
    ]
  },
  {
    id: 'pkg-pt-studio',
    title: 'PT Studio & Boutique Facility Setup',
    tagline: 'Complete turnkey package designed for high-density 1-on-1 personal training.',
    price: 12499,
    originalPrice: 15200,
    monthly: 329,
    footprint: '600 - 1,200 sq ft',
    target: 'Personal Trainers & Niche Gym Owners',
    image: 'https://images.unsplash.com/photo-1570829460005-c840387bb1ca?auto=format&fit=crop&q=80&w=800',
    equipment: [
      '2x Dual Functional Trainers with Multi-Grip Cable Attachments',
      'SFE Hack Squat & Leg Press Combo Station',
      'SFE Apex Curved Air Runner',
      'SFE Stepmill Pro Stair Climber',
      '5-50lb Urethane Dumbbell Set + Commercial Rack',
      'Full Vulcanized Rubber Flooring Roll Out (600 sq ft)'
    ]
  },
  {
    id: 'pkg-commercial',
    title: 'Full Commercial Gym Facility Package',
    tagline: 'Complete weight room suite for public gyms, apartment complexes, or corporate centers.',
    price: 48900,
    originalPrice: 62000,
    monthly: 1150,
    footprint: '2,500 - 6,000 sq ft',
    target: 'Gym Owners, HOAs & Commercial Developers',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
    equipment: [
      '12x Selectorized Machine Stations (Pin-Selected Stacks)',
      '4x Commercial Half Racks with Integrated Wood Platform',
      '6x Commercial Cardio Units (Treadmills, Ellipticals, Air Runners)',
      '5-100lb Dumbbell Set + Double Tier Racks',
      'Dedicated Cable Crossover System',
      'Full Delivery, Uncrating & On-Site Assembly Included'
    ]
  }
];

const ANNOUNCEMENTS = [
  '⚡ Shop In Store this Month and Save 10% on Commercial Packages!',
  '🏬 Visit Our Phoenix Showroom Direct: 1234 E Washington St, Phoenix AZ',
  '🚚 White-Glove Local Arizona Delivery & Professional Assembly Available',
  '💳 0% APR Financing Options Available via Affirm & Shop Pay'
];

export default function App() {
  // Navigation & UI States
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive Gym Builder States
  const [sqFt, setSqFt] = useState(350);
  const [spaceType, setSpaceType] = useState('garage'); // garage, pt-studio, commercial
  const [focus, setFocus] = useState('hybrid'); // strength, cardio, hybrid
  const [addFlooring, setAddFlooring] = useState(true);
  const [addInstallation, setAddInstallation] = useState(true);
  const [addWarranty, setAddWarranty] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const builderCalculations = useMemo(() => {
    let basePrice = 0;
    let baseWeight = 0;
    
    // Base tier by space type
    if (spaceType === 'garage') {
      basePrice = 3500 + (sqFt * 4.5);
      baseWeight = 1200 + (sqFt * 2.5);
    } else if (spaceType === 'pt-studio') {
      basePrice = 8500 + (sqFt * 6.0);
      baseWeight = 3500 + (sqFt * 4.0);
    } else {
      basePrice = 22000 + (sqFt * 8.0);
      baseWeight = 8500 + (sqFt * 6.0);
    }

    // Focus modifier
    if (focus === 'strength') basePrice *= 1.15;
    if (focus === 'cardio') basePrice *= 1.10;

    // Add-ons
    const flooringCost = addFlooring ? sqFt * 3.8 : 0;
    const installCost = addInstallation ? Math.round(basePrice * 0.12) : 0;
    const warrantyCost = addWarranty ? 499 : 0;

    const totalPrice = Math.round(basePrice + flooringCost + installCost + warrantyCost);
    const monthlyPayment = Math.round(totalPrice / 36);
    
    // Footprint capacity estimation (% of space utilized)
    const footprintPct = Math.min(95, Math.max(35, Math.round((sqFt / (spaceType === 'garage' ? 400 : spaceType === 'pt-studio' ? 1200 : 5000)) * 75)));

    return {
      totalPrice,
      monthlyPayment,
      flooringCost,
      installCost,
      warrantyCost,
      estimatedWeightStack: Math.round(baseWeight),
      footprintPct
    };
  }, [sqFt, spaceType, focus, addFlooring, addInstallation, addWarranty]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const freeShippingThreshold = 5000;
  const shippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-black">
      
      {}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-black py-2 px-4 text-xs md:text-sm font-semibold tracking-wide text-center flex items-center justify-between shadow-md">
        <div className="hidden lg:flex items-center space-x-2 text-black/80">
          <MapPin className="w-4 h-4" />
          <span>Phoenix Showroom Open Daily</span>
        </div>
        <div className="flex-1 text-center truncate transition-all duration-300">
          {ANNOUNCEMENTS[announcementIdx]}
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          <a href="tel:4807466216" className="flex items-center space-x-1 hover:underline font-bold">
            <Phone className="w-3.5 h-3.5" />
            <span>(480) 746-6216</span>
          </a>
        </div>
      </div>

      {}
      <header className="sticky top-0 z-40 bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* SFE Brand Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-amber-500 text-black p-2 rounded.xl font-black text-2xl tracking-tighter flex items-center justify-center shadow-lg shadow-amber-500/20">
              SFE
            </div>
            <div>
              <span className="text-lg font-black tracking-wider uppercase block leading-none">
                SPORTS & FITNESS
              </span>
              <span className="text-xs text-amber-500 font-bold uppercase tracking-widest block mt-0.5">
                EXCHANGE
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search functional trainers, leg press, treadmills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-full py-2 pl-10 pr-4 text-sm text-neutral-200 placeholder-neutral-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
          </div>

          {/* Contact & Navigation Action */}
          <div className="flex items-center space-x-4">
            <a 
              href="tel:4807466216" 
              className="hidden xl:flex flex-col text-right hover:text-amber-400 transition"
            >
              <span className="text-xs text-neutral-400 uppercase tracking-wider">Expert Equipment Advice</span>
              <span className="text-sm font-bold text-neutral-100 flex items-center gap-1 justify-end">
                <Phone className="w-3.5 h-3.5 text-amber-500" /> (480) 746-6216
              </span>
            </a>

            <button 
              onClick={() => setConsultationOpen(true)}
              className="hidden sm:inline-flex items-center space-x-1.5 bg-neutral-800 hover:bg-neutral-700 text-amber-400 border border-amber-500/30 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Showroom</span>
            </button>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative bg-amber-500 hover:bg-amber-400 text-black px-4 py-2.5 rounded-lg font-bold text-sm flex items-center space-x-2 transition shadow-lg shadow-amber-500/10 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cart.length > 0 && (
                <span className="bg-black text-amber-400 text-xs w-5 h-5 rounded-full flex items-center justify-center font-black">
                  {cart.reduce((sum, item) => sum + item.qty, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden border-b border-neutral-800">
        {/* Dark Video/Image Hero Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1920" 
            alt="Commercial Fitness Facility" 
            className="w-full h-full object-cover opacity-25 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Commercial-Grade Fitness Equipment • Factory Direct</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-none mb-6">
            BUILD YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">ULTIMATE GYM</span> TODAY
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
            Equipping garage gyms, boutique PT studios, and 10,000+ sq ft commercial weight rooms with heavy-duty 11-gauge steel machines and direct factory savings.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a 
              href="#gym-builder"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl shadow-amber-500/20 transition transform hover:-translate-y-0.5"
            >
              <Calculator className="w-5 h-5" />
              <span>Launch Gym Builder Tool</span>
            </a>
            
            <a 
              href="#shop-catalog"
              className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 text-neutral-100 border border-neutral-700 hover:border-neutral-500 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center space-x-2 transition"
            >
              <Dumbbell className="w-5 h-5 text-amber-500" />
              <span>Shop Commercial Gear</span>
            </a>
          </div>

          {/* Quick Value Pillars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-neutral-800/80 max-w-4xl mx-auto text-left">
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-6 h-6 text-amber-500 flex-shrink-0" />
              <div>
                <div className="text-xs font-bold uppercase text-neutral-200">11-Gauge Steel</div>
                <div className="text-[11px] text-neutral-400">Commercial Rated</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Truck className="w-6 h-6 text-amber-500 flex-shrink-0" />
              <div>
                <div className="text-xs font-bold uppercase text-neutral-200">AZ Local Install</div>
                <div className="text-[11px] text-neutral-400">White-Glove Delivery</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Award className="w-6 h-6 text-amber-500 flex-shrink-0" />
              <div>
                <div className="text-xs font-bold uppercase text-neutral-200">Wholesale Direct</div>
                <div className="text-[11px] text-neutral-400">Up to 30% Off Retail</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Star className="w-6 h-6 text-amber-500 flex-shrink-0" />
              <div>
                <div className="text-xs font-bold uppercase text-neutral-200">4.9 Star Rating</div>
                <div className="text-[11px] text-neutral-400">Phoenix Showroom</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section id="gym-builder" className="py-20 bg-neutral-900 border-b border-neutral-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3">
              <Sliders className="w-3.5 h-3.5" />
              <span>Interactive Space Estimator</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              DESIGN YOUR <span className="text-amber-500">CUSTOM GYM</span>
            </h2>
            <p className="text-neutral-400 mt-3 text-sm sm:text-base">
              Adjust room dimensions, machine focus, and installation options to receive an instant real-time package estimate and 3D layout advice.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Configurator Controls */}
            <div className="lg:col-span-7 bg-neutral-950 p-6 sm:p-8 rounded-2xl border border-neutral-800 space-y-8 shadow-2xl">
              
              {/* Step 1: Environment Type */}
              <div>
                <label className="block text-xs font-black uppercase text-amber-500 tracking-wider mb-3">
                  1. Select Facility Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'garage', label: 'Garage Gym', icon: Dumbbell, desc: '1-2 Car Space' },
                    { id: 'pt-studio', label: 'PT Studio', icon: Ruler, desc: 'Boutique Training' },
                    { id: 'commercial', label: 'Commercial', icon: ShieldCheck, desc: 'Full Scale Gym' }
                  ].map(item => {
                    const Icon = item.icon;
                    const active = spaceType === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSpaceType(item.id)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          active 
                            ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg shadow-amber-500/10' 
                            : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <Icon className={`w-5 h-5 mb-2 ${active ? 'text-amber-500' : 'text-neutral-500'}`} />
                        <div className="text-sm font-bold text-white">{item.label}</div>
                        <div className="text-[11px] text-neutral-400 mt-0.5">{item.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Square Footage Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-black uppercase text-amber-500 tracking-wider">
                    2. Available Space (Sq Ft)
                  </label>
                  <span className="text-lg font-black text-amber-400 font-mono">
                    {sqFt} SQ FT
                  </span>
                </div>
                <input 
                  type="range"
                  min="150"
                  max={spaceType === 'garage' ? 600 : spaceType === 'pt-studio' ? 2000 : 8000}
                  step="25"
                  value={sqFt}
                  onChange={(e) => setSqFt(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[11px] text-neutral-500 mt-2 font-mono">
                  <span>150 sq ft</span>
                  <span>{spaceType === 'garage' ? '600 sq ft' : spaceType === 'pt-studio' ? '2,000 sq ft' : '8,000+ sq ft'}</span>
                </div>
              </div>

              {/* Step 3: Equipment Focus */}
              <div>
                <label className="block text-xs font-black uppercase text-amber-500 tracking-wider mb-3">
                  3. Primary Training Focus
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'hybrid', label: 'Hybrid Balance' },
                    { id: 'strength', label: 'Heavy Strength' },
                    { id: 'cardio', label: 'Cardio Heavy' }
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setFocus(f.id)}
                      className={`py-3 px-4 rounded-xl text-xs font-bold uppercase transition ${
                        focus === f.id 
                          ? 'bg-amber-500 text-black shadow-md' 
                          : 'bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Turnkey Add-ons */}
              <div>
                <label className="block text-xs font-black uppercase text-amber-500 tracking-wider mb-3">
                  4. Turnkey Services & Flooring
                </label>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3.5 bg-neutral-900 border border-neutral-800 rounded-xl cursor-pointer hover:border-neutral-700 transition">
                    <div className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        checked={addFlooring}
                        onChange={(e) => setAddFlooring(e.target.checked)}
                        className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-neutral-800 border-neutral-700" 
                      />
                      <div>
                        <div className="text-xs font-bold text-white">Commercial Rubber Flooring Roll/Tiles</div>
                        <div className="text-[11px] text-neutral-400">High-impact 8mm shock reduction flooring</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-400">+${Math.round(sqFt * 3.8)}</span>
                  </label>

                  <label className="flex items-center justify-between p-3.5 bg-neutral-900 border border-neutral-800 rounded-xl cursor-pointer hover:border-neutral-700 transition">
                    <div className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        checked={addInstallation}
                        onChange={(e) => setAddInstallation(e.target.checked)}
                        className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-neutral-800 border-neutral-700" 
                      />
                      <div>
                        <div className="text-xs font-bold text-white">White-Glove Delivery & Installation</div>
                        <div className="text-[11px] text-neutral-400">Uncrating, assembly & floor placement (AZ Local)</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-400">+${builderCalculations.installCost}</span>
                  </label>

                  <label className="flex items-center justify-between p-3.5 bg-neutral-900 border border-neutral-800 rounded-xl cursor-pointer hover:border-neutral-700 transition">
                    <div className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        checked={addWarranty}
                        onChange={(e) => setAddWarranty(e.target.checked)}
                        className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-neutral-800 border-neutral-700" 
                      />
                      <div>
                        <div className="text-xs font-bold text-white">3-Year Commercial Bumper-to-Bumper Protection</div>
                        <div className="text-[11px] text-neutral-400">On-site cable, pad, and pulley replacements</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-400">+$499</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Dynamic Package Result Dashboard */}
            <div className="lg:col-span-5 bg-gradient-to-b from-neutral-950 to-neutral-900 p-6 sm:p-8 rounded-2xl border-2 border-amber-500/40 shadow-2xl relative sticky top-28">
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[11px] font-bold text-amber-500 uppercase tracking-widest block">Estimated Package Value</span>
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono mt-1">
                    ${builderCalculations.totalPrice.toLocaleString()}
                  </div>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-1.5 rounded-lg text-right">
                  <div className="text-[10px] uppercase font-bold text-neutral-400">Financing Option</div>
                  <div className="text-sm font-black font-mono">${builderCalculations.monthlyPayment}/mo</div>
                </div>
              </div>

              {/* Dynamic Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-neutral-900/80 p-3.5 rounded-xl border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 uppercase font-bold block">Weight Capacity Stack</span>
                  <span className="text-base font-black text-white font-mono mt-0.5 block">
                    ~{builderCalculations.estimatedWeightStack.toLocaleString()} lbs
                  </span>
                </div>
                <div className="bg-neutral-900/80 p-3.5 rounded-xl border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 uppercase font-bold block">Space Footprint Utilization</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex-1 bg-neutral-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-amber-500 h-full transition-all duration-500" 
                        style={{ width: `${builderCalculations.footprintPct}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold font-mono text-amber-400">{builderCalculations.footprintPct}%</span>
                  </div>
                </div>
              </div>

              {/* Summary Items Preview */}
              <div className="space-y-2 mb-8 text-xs text-neutral-300 bg-neutral-900/50 p-4 rounded-xl border border-neutral-800/80">
                <div className="font-bold text-amber-500 uppercase tracking-wider mb-2 text-[11px]">Included Equipment Suite:</div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  <span>Dual Weight Stack Cable Functional Trainer</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  <span>Commercial Combo Leg Isolation Machine</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  <span>Heavy-Duty Adjustable Bench & Dumbbell Station</span>
                </div>
                {addFlooring && (
                  <div className="flex items-center space-x-2 text-amber-400">
                    <Check className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{sqFt} Sq Ft Rubber Flooring Matting</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={() => setConsultationOpen(true)}
                className="w-full bg-amber-500 hover:bg-amber-400 text-black py-4 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl shadow-amber-500/20 transition"
              >
                <Calendar className="w-4 h-4" />
                <span>Lock In Quote & Request 3D CAD Floorplan</span>
              </button>

              <p className="text-[11px] text-neutral-400 text-center mt-3">
                *No payment required now. Official quotes include custom freight estimates.
              </p>

            </div>

          </div>

        </div>
      </section>

      {}
      <section className="py-20 bg-neutral-950 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Turnkey Commercial Bundles</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              PRE-CONFIGURED <span className="text-amber-500">GYM PACKAGES</span>
            </h2>
            <p className="text-neutral-400 mt-3 text-sm sm:text-base">
              Bundled by commercial fitness experts to give you maximum training variety and save up to $10,000 on multi-machine setups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PACKAGES.map((pkg) => (
              <div 
                key={pkg.id} 
                className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden flex flex-col justify-between hover:border-amber-500/50 transition duration-300 shadow-xl group"
              >
                <div>
                  <div className="relative h-52 overflow-hidden">
                    <img 
                      src={pkg.image} 
                      alt={pkg.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-amber-500/30 text-amber-400 px-3 py-1 rounded-md text-xs font-bold uppercase font-mono">
                      {pkg.footprint}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-xs font-bold uppercase text-amber-500 tracking-wider mb-1">
                      {pkg.target}
                    </div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">
                      {pkg.title}
                    </h3>
                    <p className="text-neutral-400 text-xs leading-relaxed mb-6">
                      {pkg.tagline}
                    </p>

                    <div className="space-y-2 mb-6 border-t border-b border-neutral-800/80 py-4">
                      <span className="text-[11px] font-bold text-neutral-300 uppercase block mb-1">Package Inclusions:</span>
                      {pkg.equipment.map((item, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-2xl font-black text-white font-mono">${pkg.price.toLocaleString()}</span>
                      <span className="text-xs text-neutral-500 line-through ml-2 font-mono">${pkg.originalPrice.toLocaleString()}</span>
                    </div>
                    <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded font-mono">
                      or ${pkg.monthly}/mo
                    </span>
                  </div>

                  <button
                    onClick={() => setConsultationOpen(true)}
                    className="w-full bg-neutral-800 hover:bg-amber-500 hover:text-black text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>Request Custom Quote</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {}
      <section id="shop-catalog" className="py-20 bg-neutral-900 border-b border-neutral-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3">
                <Dumbbell className="w-3.5 h-3.5" />
                <span>Commercial Inventory</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
                FEATURED <span className="text-amber-500">MACHINERY</span>
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Gear' },
                { id: 'strength', label: 'Strength & Selectorized' },
                { id: 'cardio', label: 'Commercial Cardio' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                    categoryFilter === cat.id 
                      ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' 
                      : 'bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-amber-500/50 transition-all duration-300 shadow-xl group"
              >
                <div>
                  <div className="relative h-60 overflow-hidden bg-neutral-900">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                    />
                    <div className="absolute top-3 left-3 bg-amber-500 text-black font-black text-[10px] uppercase px-2.5 py-1 rounded shadow">
                      {product.badge}
                    </div>

                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="absolute top-3 right-3 bg-black/70 hover:bg-black text-white p-2 rounded-lg backdrop-blur-md transition opacity-0 group-hover:opacity-100"
                      title="Quick View Specs"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-bold text-white font-mono">{product.rating}</span>
                      <span className="text-xs text-neutral-500">({product.reviews} reviews)</span>
                    </div>

                    <h3 className="text-base font-bold text-white uppercase tracking-tight line-clamp-2 mb-3">
                      {product.name}
                    </h3>

                    <ul className="space-y-1.5 mb-6">
                      {product.specs.slice(0, 3).map((spec, i) => (
                        <li key={i} className="text-[11px] text-neutral-400 flex items-center space-x-1.5">
                          <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-neutral-900">
                  <div className="flex items-baseline justify-between my-4">
                    <div>
                      <span className="text-2xl font-black text-white font-mono">${product.price.toLocaleString()}</span>
                      <span className="text-xs text-neutral-500 line-through ml-2 font-mono">${product.originalPrice.toLocaleString()}</span>
                    </div>
                    <span className="text-[11px] font-bold text-amber-400 font-mono">
                      ${Math.round(product.price / 24)}/mo
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="bg-neutral-900 hover:bg-neutral-800 text-neutral-300 py-2.5 rounded-lg text-xs font-bold uppercase transition"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-amber-500 hover:bg-amber-400 text-black py-2.5 rounded-lg text-xs font-black uppercase transition flex items-center justify-center space-x-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add Cart</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {}
      <section className="py-20 bg-neutral-950 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                <MapPin className="w-3.5 h-3.5" />
                <span>Phoenix Arizona Showroom</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-none">
                TEST & TRY BEFORE <span className="text-amber-500">YOU BUY</span>
              </h2>

              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                Step inside our flagship Phoenix showroom to physically test smooth cable ratios, heavy-duty selectorized stacks, and curved air runners. Talk directly with certified gym equipment specialists.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800">
                  <div className="flex items-center space-x-1 text-amber-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <div className="text-lg font-black text-white">4.9 / 5.0 Google Rating</div>
                  <div className="text-xs text-neutral-400 mt-0.5">Over 350+ Verified Local Reviews</div>
                </div>

                <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800">
                  <div className="text-xs text-amber-500 font-bold uppercase tracking-wider mb-1">Showroom Hours</div>
                  <div className="text-sm font-bold text-white">Mon - Sat: 9am - 6pm</div>
                  <div className="text-xs text-neutral-400 mt-0.5">Sunday: By Appointment</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => setConsultationOpen(true)}
                  className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Private Showroom Walkthrough</span>
                </button>
                
                <a 
                  href="tel:4807466216"
                  className="bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition"
                >
                  <Phone className="w-4 h-4 text-amber-500" />
                  <span>Call (480) 746-6216</span>
                </a>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=600" 
                alt="SFE Gym Installation" 
                className="rounded-2xl h-52 w-full object-cover border border-neutral-800"
              />
              <img 
                src="https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=600" 
                alt="SFE Commercial Machines" 
                className="rounded-2xl h-52 w-full object-cover border border-neutral-800 mt-6"
              />
              <img 
                src="https://images.unsplash.com/photo-1576678927484-cc909957088c?auto=format&fit=crop&q=80&w=600" 
                alt="SFE Treadmills" 
                className="rounded-2xl h-52 w-full object-cover border border-neutral-800 -mt-6"
              />
              <img 
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600" 
                alt="SFE Dumbbell Racks" 
                className="rounded-2xl h-52 w-full object-cover border border-neutral-800"
              />
            </div>

          </div>

        </div>
      </section>

      {}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-3xl rounded-2xl overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-200">
            
            <button 
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 bg-black/60 text-neutral-400 hover:text-white p-2 rounded-full z-10 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-72 md:h-full bg-neutral-950 relative">
                <img 
                  src={quickViewProduct.image} 
                  alt={quickViewProduct.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-1">
                    Commercial Equipment Specs
                  </span>
                  <h3 className="text-xl font-black text-white uppercase">{quickViewProduct.name}</h3>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{quickViewProduct.description}</p>
                </div>

                <div>
                  <span className="text-xs font-bold text-neutral-300 uppercase block mb-2">Key Construction Specs:</span>
                  <ul className="space-y-2">
                    {quickViewProduct.specs.map((s, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-xs text-neutral-300">
                        <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-black text-white font-mono">${quickViewProduct.price.toLocaleString()}</div>
                    <div className="text-xs text-amber-400 font-mono">Financing available from ${Math.round(quickViewProduct.price/24)}/mo</div>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center space-x-2 transition"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add To Cart</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {}
      {consultationOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-md rounded-2xl p-6 sm:p-8 relative shadow-2xl">
            
            <button 
              onClick={() => setConsultationOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white uppercase">Request Equipment Consultation</h3>
              <p className="text-xs text-neutral-400 mt-1">Speak directly with an SFE Phoenix Gym Specialist</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert('Consultation Request Submitted! An SFE rep will call you shortly.'); setConsultationOpen(false); }} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">Full Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="John Doe" 
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none focus:border-amber-500" 
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="(480) 000-0000" 
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none focus:border-amber-500" 
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">Facility Interest</label>
                <select className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none focus:border-amber-500">
                  <option>Garage / Home Gym</option>
                  <option>Boutique PT Studio</option>
                  <option>Full Commercial Gym Facility</option>
                  <option>High School / University Weight Room</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-black py-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/10"
              >
                Submit Consultation Request
              </button>
            </form>

          </div>
        </div>
      )}

      {}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xs" onClick={() => setCartOpen(false)} />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-neutral-950 border-l border-neutral-800 flex flex-col justify-between shadow-2xl">
              
              {/* Header */}
              <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-amber-500" />
                  <span className="font-black text-lg text-white uppercase tracking-wider">Your Order Cart</span>
                </div>
                <button onClick={() => setCartOpen(false)} className="text-neutral-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Meter */}
              <div className="bg-neutral-900 px-6 py-3 border-b border-neutral-800">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-neutral-400">Freight Allowance Progress</span>
                  <span className="font-bold text-amber-400">${cartSubtotal.toLocaleString()} / $5,000</span>
                </div>
                <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full transition-all duration-300" style={{ width: `${shippingProgress}%` }} />
                </div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-neutral-500 space-y-3">
                    <Dumbbell className="w-12 h-12 mx-auto text-neutral-700" />
                    <p className="text-sm font-bold">Your cart is currently empty.</p>
                    <button 
                      onClick={() => setCartOpen(false)}
                      className="text-xs text-amber-500 font-bold uppercase hover:underline"
                    >
                      Browse Equipment Catalog
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex space-x-4 bg-neutral-900 p-3.5 rounded-xl border border-neutral-800">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-neutral-950" />
                      <div className="flex-1">
                        <div className="text-xs font-bold text-white uppercase line-clamp-1">{item.name}</div>
                        <div className="text-xs text-amber-400 font-mono font-bold mt-1">${item.price.toLocaleString()}</div>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2 bg-neutral-950 px-2 py-1 rounded border border-neutral-800">
                            <button onClick={() => updateCartQty(item.id, -1)} className="text-neutral-400 hover:text-white">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono text-white font-bold">{item.qty}</span>
                            <button onClick={() => updateCartQty(item.id, 1)} className="text-neutral-400 hover:text-white">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button onClick={() => updateCartQty(item.id, -item.qty)} className="text-[11px] text-red-400 hover:underline">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Checkout Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-neutral-800 bg-neutral-900 space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold uppercase text-neutral-400">Subtotal</span>
                    <span className="text-2xl font-black text-white font-mono">${cartSubtotal.toLocaleString()}</span>
                  </div>

                  <button 
                    onClick={() => alert('Proceeding to Secure SFE Commercial Checkout...')}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-black py-4 rounded-xl font-black text-xs uppercase tracking-wider transition flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/10"
                  >
                    <span>Proceed To Secure Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {}
      <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-white font-black text-xl tracking-wider uppercase mb-2">SPORTS & FITNESS EXCHANGE</div>
            <p className="text-neutral-500 leading-relaxed">
              Arizona’s premier supplier for commercial-grade selectorized machinery, plate-loaded stations, and turnkey weight room layouts.
            </p>
          </div>

          <div>
            <div className="text-white font-bold uppercase tracking-wider mb-3">Phoenix Showroom</div>
            <p className="leading-relaxed">
              1234 E Washington St<br />
              Phoenix, AZ 85034<br />
              Direct: (480) 746-6216
            </p>
          </div>

          <div>
            <div className="text-white font-bold uppercase tracking-wider mb-3">Quick Links</div>
            <ul className="space-y-2">
              <li><a href="#gym-builder" className="hover:text-amber-500">Interactive Gym Builder</a></li>
              <li><a href="#shop-catalog" className="hover:text-amber-500">Commercial Selectorized Gear</a></li>
              <li><a href="#shop-catalog" className="hover:text-amber-500">Commercial Cardio Units</a></li>
              <li><button onClick={() => setConsultationOpen(true)} className="hover:text-amber-500">Book Showroom Tour</button></li>
            </ul>
          </div>

          <div>
            <div className="text-white font-bold uppercase tracking-wider mb-3">Wholesale Alerts</div>
            <p className="mb-3 text-neutral-500">Get direct alerts when new commercial inventory drops arrive.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-neutral-900 border border-neutral-800 rounded-l-lg py-2 px-3 text-white focus:outline-none text-xs flex-1"
              />
              <button className="bg-amber-500 text-black font-bold px-4 rounded-r-lg uppercase text-[10px]">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-neutral-900 text-center text-neutral-600">
          © {new Date().getFullYear()} Sports & Fitness Exchange. All Rights Reserved. Built for high-ticket performance.
        </div>
      </footer>

    </div>
  );
}