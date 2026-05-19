import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Package, 
  Search, 
  Filter, 
  Sparkles, 
  DollarSign, 
  Activity, 
  AlertTriangle, 
  Layers 
} from 'lucide-react';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'BBS FI-R Forged Wheels', brand: 'BBS', category: 'Wheels', price: '$8,400', stock: 12, description: 'Ultra-lightweight forged wheels designed for maximum performance clearance and high structural rigidity.' },
  { id: 2, name: 'Brembo GT Brakes Kit', brand: 'Brembo', category: 'Brakes', price: '$4,200', stock: 5, description: 'Gran Turismo high performance braking kit featuring ventilated multi-piston discs and performance pads.' },
  { id: 3, name: 'Recaro Podium Carbon Seat', brand: 'Recaro', category: 'Interior', price: '$3,150', stock: 2, description: 'FIA-approved legal racing seat built with carbon fiber shell, ergonomic pads, and Alcantara stitch.' },
  { id: 4, name: 'Akrapovic Titanium Exhaust', brand: 'Akrapovic', category: 'Exhaust', price: '$5,900', stock: 0, description: 'Bespoke slip-on line titanium exhaust systems for maximum weight drop and signature racing acoustic tones.' },
  { id: 5, name: 'KW Variant 4 Coilovers', brand: 'KW Suspensions', category: 'Suspension', price: '$4,850', stock: 8, description: '3-way adjustable coilovers featuring modern valve technology for independent rebound and compression damping.' },
];

export default function AdminStore() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [isSlideoverOpen, setIsSlideoverOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Controlled Form State
  const [editingProductId, setEditingProductId] = useState(null);
  const [formName, setFormName] = useState('');
  const [formBrand, setFormBrand] = useState('');
  const [formCategory, setFormCategory] = useState('Wheels');
  const [formPrice, setFormPrice] = useState('');
  const [formStock, setFormStock] = useState(0);
  const [formDescription, setFormDescription] = useState('');

  const categories = ['All', 'Wheels', 'Brakes', 'Interior', 'Exhaust', 'Suspension'];

  // Form Reset / Pre-fill Logic
  const handleOpenAdd = () => {
    setEditingProductId(null);
    setFormName('');
    setFormBrand('');
    setFormCategory('Wheels');
    setFormPrice('');
    setFormStock(0);
    setFormDescription('');
    setIsSlideoverOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProductId(product.id);
    setFormName(product.name);
    setFormBrand(product.brand);
    setFormCategory(product.category);
    setFormPrice(product.price);
    setFormStock(product.stock);
    setFormDescription(product.description || '');
    setIsSlideoverOpen(true);
  };

  // Delete handler
  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to remove this product from the inventory database?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  // Form submit (Save Details)
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formName || !formBrand || !formPrice) {
      alert('Please fill out Name, Brand, and Price.');
      return;
    }

    // Format price if missing '$'
    let formattedPrice = formPrice.trim();
    if (!formattedPrice.startsWith('$')) {
      formattedPrice = `$${formattedPrice}`;
    }

    if (editingProductId) {
      // Editing Mode
      setProducts(prev => prev.map(p => {
        if (p.id === editingProductId) {
          return {
            ...p,
            name: formName,
            brand: formBrand,
            category: formCategory,
            price: formattedPrice,
            stock: parseInt(formStock) || 0,
            description: formDescription
          };
        }
        return p;
      }));
    } else {
      // Adding Mode
      const newProduct = {
        id: Date.now(),
        name: formName,
        brand: formBrand,
        category: formCategory,
        price: formattedPrice,
        stock: parseInt(formStock) || 0,
        description: formDescription
      };
      setProducts(prev => [newProduct, ...prev]);
    }

    setIsSlideoverOpen(false);
  };

  // Searching and Filtering
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, activeCategory]);

  // Statistics Metrics
  const stats = useMemo(() => {
    const totalItems = products.length;
    const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
    const outOfStock = products.filter(p => p.stock === 0).length;
    
    // Calculate total valuation
    const valuation = products.reduce((acc, p) => {
      const numericPrice = parseFloat(p.price.replace(/[$,]/g, '')) || 0;
      return acc + (numericPrice * p.stock);
    }, 0);

    const formattedValuation = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(valuation);

    return { totalItems, totalStock, outOfStock, formattedValuation };
  }, [products]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 select-none">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#00C2FF]/10 text-[#00C2FF] text-[9px] px-2 py-0.5 rounded font-mono font-bold tracking-widest border border-[#00C2FF]/20 shadow-[0_0_8px_rgba(0,194,255,0.2)]">
              STORES TELEMETRY
            </span>
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tight">
            Performance Store
          </h1>
          <p className="text-stone-400 text-sm font-medium tracking-wide">
            Manage performance parts, wheels, titanium exhausts, and telemetry accessories.
          </p>
        </div>

        <button 
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 bg-[#00C2FF] hover:bg-[#00a3d6] text-black font-extrabold text-xs uppercase tracking-widest px-5 py-3 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.4)] transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] self-start md:self-auto"
        >
          <Plus size={16} strokeWidth={3} />
          Add Product
        </button>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* TOTAL SKU */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xl group hover:border-[#00C2FF]/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Active SKUs</span>
            <Package size={16} className="text-stone-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono">{stats.totalItems}</span>
            <span className="text-[10px] text-[#00C2FF] uppercase font-mono">Products</span>
          </div>
        </div>

        {/* TOTAL STOCK */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xl group hover:border-[#00C2FF]/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Total Inventory</span>
            <Activity size={16} className="text-stone-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono">{stats.totalStock}</span>
            <span className="text-[10px] text-stone-500 uppercase font-mono">Units</span>
          </div>
        </div>

        {/* VALUATION */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xl group hover:border-[#00C2FF]/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Estimated Value</span>
            <DollarSign size={16} className="text-[#00C2FF]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#00C2FF] font-mono">{stats.formattedValuation}</span>
            <span className="text-[9px] text-stone-500 uppercase font-mono">USD</span>
          </div>
        </div>

        {/* OUT OF STOCK ALERTS */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xl group hover:border-red-500/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Critical Alert</span>
            <AlertTriangle size={16} className={stats.outOfStock > 0 ? "text-red-400 animate-pulse" : "text-stone-500"} />
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-black font-mono ${stats.outOfStock > 0 ? "text-red-400" : "text-white"}`}>
              {stats.outOfStock}
            </span>
            <span className="text-[10px] text-stone-500 uppercase font-mono">Out of stock</span>
          </div>
        </div>

      </div>

      {/* FILTER & SEARCH PANEL */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
            <Search size={16} />
          </span>
          <input 
            type="text" 
            placeholder="Search parts, brand or specs..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs font-semibold bg-black/40 border border-white/10 rounded-lg text-white placeholder-stone-500 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all duration-300"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-500 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest flex items-center gap-1.5 mr-2">
            <Filter size={12} />
            Category:
          </span>
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-md text-[10px] font-extrabold tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-[#00C2FF]/20 text-[#00C2FF] border border-[#00C2FF]/30 shadow-[0_0_12px_rgba(0,194,255,0.1)]'
                    : 'bg-white/5 text-stone-400 border border-transparent hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

      </div>

      {/* DATA TABLE */}
      <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-[10px] uppercase tracking-widest text-stone-400 font-bold">
                <th className="p-5 pl-6">Product Details</th>
                <th className="p-5">Brand Name</th>
                <th className="p-5">Category</th>
                <th className="p-5">Unit Price</th>
                <th className="p-5">Stock Level</th>
                <th className="p-5 pr-6 text-right">Control Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm text-stone-200 font-medium">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                    
                    {/* DETAILS */}
                    <td className="p-5 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-black/40 rounded border border-white/10 flex items-center justify-center text-stone-500 group-hover:text-white transition-colors shrink-0">
                          <Package size={18} />
                        </div>
                        <div>
                          <div className="font-extrabold text-white tracking-wide">{product.name}</div>
                          {product.description && (
                            <div className="text-[10px] text-stone-500 font-normal max-w-sm line-clamp-1 mt-0.5">
                              {product.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* BRAND */}
                    <td className="p-5 text-stone-400 font-semibold">{product.brand}</td>

                    {/* CATEGORY */}
                    <td className="p-5">
                      <span className="bg-white/5 px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider border border-white/10">
                        {product.category}
                      </span>
                    </td>

                    {/* PRICE */}
                    <td className="p-5 font-mono text-[#00C2FF] font-extrabold">{product.price}</td>

                    {/* STOCK */}
                    <td className="p-5">
                      {product.stock > 0 ? (
                        <div className="flex items-center gap-1.5 text-stone-300 font-bold font-mono text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00C2FF]"></span>
                          {product.stock} Units
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 text-red-400 font-bold font-mono text-xs">
                          <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse"></span> 
                          Out of Stock
                        </div>
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="p-5 pr-6">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleOpenEdit(product)} 
                          className="p-2 text-stone-400 hover:text-[#00C2FF] bg-white/5 hover:bg-white/10 rounded transition-colors border border-transparent hover:border-[#00C2FF]/30"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 text-stone-400 hover:text-red-400 bg-white/5 hover:bg-red-500/20 rounded transition-colors border border-transparent hover:border-red-500/30"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-12 text-center">
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-stone-600">
                        <Package size={20} />
                      </div>
                      <h3 className="text-sm font-black text-white uppercase tracking-wider">No matching stock</h3>
                      <p className="text-xs text-stone-500 leading-normal font-medium">
                        Adjust filter parameters or product query to match items.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* UPGRADED SLIDE-OVER FORM */}
      {isSlideoverOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          
          {/* Backdrop with heavy overlay */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
            onClick={() => setIsSlideoverOpen(false)}
          ></div>
          
          {/* Panel */}
          <div className="relative w-full max-w-md bg-black/95 border-l border-white/10 h-full shadow-[0_0_50px_rgba(0,194,255,0.1)] animate-in slide-in-from-right duration-300 flex flex-col">
            
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div>
                <h2 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                  <Sparkles size={18} className="text-[#00C2FF]" />
                  {editingProductId ? 'Alter Product Spec' : 'Register New Inventory'}
                </h2>
                <p className="text-stone-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                  SYS BLOCK DATA ENTRY // STAGE ACTIVE
                </p>
              </div>
              <button 
                onClick={() => setIsSlideoverOpen(false)} 
                className="text-stone-400 hover:text-white transition-all p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg"
              >
                <X size={16} />
              </button>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSaveProduct} className="flex-1 flex flex-col justify-between overflow-hidden">
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Product Name */}
                <div>
                  <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2">
                    Product Name *
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-stone-900/80 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all font-semibold"
                    placeholder="e.g. BBS FI-R Forged Wheels" 
                  />
                </div>
                
                {/* Brand & Category */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2">
                      Brand *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formBrand}
                      onChange={(e) => setFormBrand(e.target.value)}
                      className="w-full bg-stone-900/80 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all font-semibold"
                      placeholder="e.g. BBS" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2">
                      Category
                    </label>
                    <select 
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full bg-stone-900/80 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all font-semibold"
                    >
                      <option value="Wheels">Wheels</option>
                      <option value="Brakes">Brakes</option>
                      <option value="Interior">Interior</option>
                      <option value="Exhaust">Exhaust</option>
                      <option value="Suspension">Suspension</option>
                    </select>
                  </div>
                </div>

                {/* Price & Stock */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2">
                      Price *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      className="w-full bg-stone-900/80 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-[#00C2FF] font-mono focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all font-bold"
                      placeholder="$0,000" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2">
                      Stock Level
                    </label>
                    <input 
                      type="number" 
                      min="0"
                      value={formStock}
                      onChange={(e) => setFormStock(e.target.value)}
                      className="w-full bg-stone-900/80 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all font-bold"
                      placeholder="0" 
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2">
                    Description / Tech Specs
                  </label>
                  <textarea 
                    rows="4" 
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full bg-stone-900/80 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all font-semibold resize-none"
                    placeholder="Provide technical specifications, dimensions, fitment parameters, or construction materials..."
                  ></textarea>
                </div>

              </div>
              
              {/* Actions Footer */}
              <div className="p-6 border-t border-white/10 bg-black/60 backdrop-blur-md flex justify-end gap-3 shrink-0">
                <button 
                  type="button"
                  onClick={() => setIsSlideoverOpen(false)} 
                  className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-white transition-colors border border-transparent hover:bg-white/5"
                >
                  Discard
                </button>
                <button 
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs tracking-wider uppercase px-6 py-2.5 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Save Product
                </button>
              </div>

            </form>
          </div>

        </div>
      )}

    </div>
  );
}
