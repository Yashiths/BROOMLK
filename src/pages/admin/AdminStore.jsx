import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Package } from 'lucide-react';

const DUMMY_PRODUCTS = [
  { id: 1, name: 'BBS FI-R Forged Wheels', brand: 'BBS', category: 'Wheels', price: '$8,400', stock: 12 },
  { id: 2, name: 'Brembo GT Brakes Kit', brand: 'Brembo', category: 'Brakes', price: '$4,200', stock: 5 },
  { id: 3, name: 'Recaro Podium Carbon Seat', brand: 'Recaro', category: 'Interior', price: '$3,150', stock: 2 },
  { id: 4, name: 'Akrapovic Titanium Exhaust', brand: 'Akrapovic', category: 'Exhaust', price: '$5,900', stock: 0 },
  { id: 5, name: 'KW Variant 4 Coilovers', brand: 'KW Suspensions', category: 'Suspension', price: '$4,850', stock: 8 },
];

export default function AdminStore() {
  const [isSlideoverOpen, setIsSlideoverOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Wheels', 'Brakes', 'Interior', 'Exhaust', 'Suspension'];

  const filteredProducts = activeCategory === 'All' 
    ? DUMMY_PRODUCTS 
    : DUMMY_PRODUCTS.filter(p => p.category === activeCategory);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsSlideoverOpen(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setIsSlideoverOpen(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-1">Performance Store</h1>
          <p className="text-stone-400 text-sm font-medium tracking-wide">Manage inventory, pricing, and elite stock.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-[#00C2FF] text-black hover:bg-white px-5 py-2.5 rounded-lg font-bold text-sm tracking-wide transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* FILTER TABS */}
      <div className="flex items-center gap-2 mb-6 p-1.5 bg-white/5 backdrop-blur-md border border-white/5 rounded-xl w-max">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-lg text-sm font-bold tracking-wide transition-all duration-300 ${
              activeCategory === cat 
                ? 'bg-[#00C2FF]/10 text-[#00C2FF] border border-[#00C2FF]/30 shadow-[0_0_15px_rgba(0,194,255,0.1)]' 
                : 'text-stone-400 hover:text-[#00C2FF] border border-transparent hover:bg-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* DATA TABLE */}
      <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-[10px] uppercase tracking-widest text-stone-400 font-bold">
                <th className="p-5 pl-6">Product Name</th>
                <th className="p-5">Brand</th>
                <th className="p-5">Category</th>
                <th className="p-5">Price</th>
                <th className="p-5">Stock</th>
                <th className="p-5 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm text-stone-200 font-medium">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-5 pl-6 flex items-center gap-3">
                    <div className="h-10 w-10 bg-black/40 rounded border border-white/10 flex items-center justify-center text-stone-500 group-hover:text-white transition-colors">
                      <Package size={18} />
                    </div>
                    <span className="font-bold text-white tracking-wide">{product.name}</span>
                  </td>
                  <td className="p-5 text-stone-400">{product.brand}</td>
                  <td className="p-5"><span className="bg-white/10 px-2.5 py-1 rounded text-xs tracking-wider border border-white/5">{product.category}</span></td>
                  <td className="p-5 font-mono text-[#00C2FF]">{product.price}</td>
                  <td className="p-5">
                    {product.stock > 0 ? (
                      <span className="text-stone-300">{product.stock} Units</span>
                    ) : (
                      <span className="text-red-400 font-bold flex items-center gap-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" /> Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="p-5 pr-6">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(product)} className="p-2 text-stone-400 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-stone-400 hover:text-red-400 bg-white/5 hover:bg-red-500/20 rounded transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SLIDE-OVER FORM */}
      {isSlideoverOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSlideoverOpen(false)}></div>
          
          {/* Panel */}
          <div className="relative w-full max-w-md bg-[#0a0a0a] border-l border-white/10 h-full shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-black text-white uppercase tracking-tight">
                {editingProduct ? 'Edit Product' : 'New Product'}
              </h2>
              <button onClick={() => setIsSlideoverOpen(false)} className="text-stone-400 hover:text-white transition-colors p-1 bg-white/5 rounded">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <form className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Product Name</label>
                  <input type="text" defaultValue={editingProduct?.name} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00C2FF] transition-colors font-medium text-sm" placeholder="e.g. BBS FI-R Wheels" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Brand</label>
                    <input type="text" defaultValue={editingProduct?.brand} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00C2FF] transition-colors font-medium text-sm" placeholder="e.g. BBS" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Category</label>
                    <select className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00C2FF] transition-colors font-medium text-sm">
                      <option>Wheels</option>
                      <option>Brakes</option>
                      <option>Exhaust</option>
                      <option>Suspension</option>
                      <option>Interior</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Price (USD)</label>
                    <input type="text" defaultValue={editingProduct?.price} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#00C2FF] font-mono focus:outline-none focus:border-[#00C2FF] transition-colors text-sm" placeholder="$0.00" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Stock Level</label>
                    <input type="number" defaultValue={editingProduct?.stock} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-[#00C2FF] transition-colors text-sm" placeholder="0" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Description</label>
                  <textarea rows="4" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00C2FF] transition-colors font-medium text-sm resize-none" placeholder="Product details..."></textarea>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-white/10 bg-black flex justify-end gap-3">
              <button onClick={() => setIsSlideoverOpen(false)} className="px-5 py-2.5 rounded-lg font-bold text-sm tracking-wide text-stone-300 hover:text-white transition-colors">Cancel</button>
              <button className="bg-[#00C2FF] text-black hover:bg-white px-5 py-2.5 rounded-lg font-bold text-sm tracking-wide transition-colors">Save Details</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
