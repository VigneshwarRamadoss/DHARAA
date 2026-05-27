import { createFileRoute } from '@tanstack/react-router';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { useAccount, Profile, Address } from '@/contexts/AccountContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { Heart, ShoppingBag, Box, Plus, Check } from 'lucide-react';
import { useState } from 'react';
import { CartDrawer } from '@/components/CartDrawer';
import { WishlistDrawer } from '@/components/WishlistDrawer';

export const Route = createFileRoute('/account')({
  component: AccountPage,
  head: () => ({
    meta: [
      { title: "Your Account — DHARAA" },
      { name: "description", content: "Manage your profile, saved addresses, and preferences." }
    ]
  })
});

function AccountPage() {
  const { profile, updateProfile, addAddress, removeAddress, setDefaultAddress, updatePreferences } = useAccount();
  const { cartCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const prefersReduced = useReducedMotion();

  // State for inline editing
  const [editingField, setEditingField] = useState<keyof Profile | null>(null);
  const [editValue, setEditValue] = useState('');

  // State for adding address
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({ type: 'HOME' });

  const handleEditClick = (field: keyof Profile, currentValue: string) => {
    setEditingField(field);
    setEditValue(currentValue);
  };

  const handleSaveField = () => {
    if (editingField) {
      updateProfile({ [editingField]: editValue });
      setEditingField(null);
    }
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAddress.line1 && newAddress.city && newAddress.state && newAddress.pincode) {
      addAddress(newAddress as Omit<Address, 'id'>);
      setIsAddingAddress(false);
      setNewAddress({ type: 'HOME' });
    }
  };

  const renderField = (label: string, field: keyof Profile, type: string = 'text', placeholder: string = '') => {
    const isEditing = editingField === field;
    const value = profile[field] as string;

    return (
      <div className="py-6 border-b border-border group relative">
        <span className="font-mono text-[9px] text-gold uppercase tracking-[0.2em] font-semibold mb-2 block">
          {label}
        </span>
        
        {isEditing ? (
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <input
              type={type}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-transparent border-b border-ink/30 focus:border-ink py-2 outline-none font-sans text-lg text-ink transition-colors"
              autoFocus
            />
            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={handleSaveField}
                className="bg-ink text-white hover:bg-gold transition-colors duration-300 font-mono text-[10px] font-bold uppercase tracking-widest py-2 px-6 rounded-none"
              >
                Save
              </button>
              <button 
                onClick={() => setEditingField(null)}
                className="font-mono text-[10px] text-slate hover:text-ink transition-colors uppercase tracking-widest py-2 px-4"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => handleEditClick(field, value || '')}
          >
            <p className={`font-display text-2xl ${value ? 'text-ink' : 'text-slate italic'}`}>
              {value || `Add your ${label.toLowerCase()}`}
            </p>
            <span className="font-mono text-[10px] text-gold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              ✎ Edit
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] relative selection:bg-gold selection:text-background font-sans">
      <Nav />
      <CartDrawer />
      <WishlistDrawer />

      {/* Welcome Header */}
      <section className="pt-32 pb-16 px-6 md:px-12 max-w-[1500px] mx-auto border-b border-border/50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <motion.div 
            className="max-w-xl"
            initial={prefersReduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[9px] text-gold uppercase tracking-[0.3em] font-semibold mb-4 block">
              § YOUR ACCOUNT
            </span>
            <h1 className="font-display text-5xl md:text-[64px] text-ink font-light leading-tight mb-4">
              Hello, {profile.name ? <em className="italic text-gold">{profile.name.split(' ')[0]}</em> : <em className="italic text-gold">Lovely</em>}.
            </h1>
            <p className="font-sans text-[13px] text-slate">
              Manage your profile, saved addresses, and preferences.
            </p>
          </motion.div>

          <motion.div 
            className="w-full md:w-auto bg-white border border-border p-6 md:p-8 shrink-0"
            initial={prefersReduced ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="flex flex-col gap-4 font-mono text-[10px] uppercase tracking-widest">
              <div className="flex justify-between gap-12">
                <span className="text-slate">Member Since</span>
                <span className="text-ink font-semibold">May 2026</span>
              </div>
              <div className="flex justify-between gap-12">
                <span className="text-slate">Items Saved</span>
                <span className="text-ink font-semibold">{wishlistItems.length}</span>
              </div>
              <div className="flex justify-between gap-12">
                <span className="text-slate">Orders Placed</span>
                <span className="text-ink font-semibold">0</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Main Column */}
          <div className="lg:col-span-8 border-r border-border/50">
            
            {/* Profile Section */}
            <section className="px-6 md:px-12 py-16 bg-white min-h-[400px]">
              <div className="flex items-center gap-4 mb-12">
                <div className="flex-1 h-[1px] bg-gold/30" />
                <span className="font-mono text-[10px] text-ink font-bold uppercase tracking-[0.3em]">
                  § PROFILE DETAILS
                </span>
                <div className="flex-1 h-[1px] bg-gold/30" />
              </div>

              <div className="flex flex-col">
                {renderField('Full Name', 'name', 'text', 'e.g. Priya Sharma')}
                {renderField('Email Address', 'email', 'email', 'e.g. priya@example.com')}
                {renderField('Phone Number', 'phone', 'tel', 'e.g. +91 98765 43210')}
              </div>
            </section>

            {/* Addresses Section */}
            <section className="px-6 md:px-12 py-16 bg-[#FAF7F2] border-t border-border/50">
              <div className="flex items-center gap-4 mb-12">
                <div className="flex-1 h-[1px] bg-gold/30" />
                <span className="font-mono text-[10px] text-ink font-bold uppercase tracking-[0.3em]">
                  § SAVED ADDRESSES
                </span>
                <div className="flex-1 h-[1px] bg-gold/30" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profile.addresses.map((address, i) => (
                  <motion.div 
                    key={address.id}
                    className="bg-white border border-border p-6 flex flex-col justify-between h-full"
                    initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="bg-cream-soft px-3 py-1 font-mono text-[9px] text-ink font-semibold uppercase tracking-widest border border-border">
                          {address.type}
                        </span>
                        {address.isDefault && (
                          <span className="font-mono text-[9px] text-gold uppercase tracking-widest font-semibold flex items-center gap-1">
                            <span className="text-xs">★</span> Default
                          </span>
                        )}
                      </div>
                      <p className="font-sans text-[13px] text-ink leading-relaxed mb-1">
                        {address.line1}
                        {address.line2 && <><br />{address.line2}</>}
                      </p>
                      <p className="font-sans text-[12px] text-slate">
                        {address.city}, {address.state} {address.pincode}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 mt-8 pt-4 border-t border-border/50">
                      {!address.isDefault && (
                        <button 
                          onClick={() => setDefaultAddress(address.id)}
                          className="font-mono text-[9px] text-ink hover:text-gold uppercase tracking-widest transition-colors"
                        >
                          Make Default
                        </button>
                      )}
                      <button 
                        onClick={() => removeAddress(address.id)}
                        className={`font-mono text-[9px] text-slate hover:text-red uppercase tracking-widest transition-colors ${address.isDefault ? 'ml-auto' : ''}`}
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}

                {/* Add New Address Card */}
                {!isAddingAddress && (
                  <motion.button 
                    onClick={() => setIsAddingAddress(true)}
                    className="border border-dashed border-border/70 hover:border-gold hover:bg-white transition-all duration-300 p-6 flex flex-col items-center justify-center gap-3 min-h-[200px] text-slate hover:text-ink group"
                    initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-10 h-10 rounded-full bg-cream-soft flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Plus size={16} className="text-ink" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest font-semibold">
                      Add New Address
                    </span>
                  </motion.button>
                )}
              </div>

              {/* Add Address Form */}
              <AnimatePresence>
                {isAddingAddress && (
                  <motion.div 
                    className="mt-6 bg-white border border-border p-8"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-display text-2xl text-ink mb-6">New Address</h3>
                    <form onSubmit={handleSaveAddress} className="flex flex-col gap-6">
                      
                      {/* Type Selection */}
                      <div className="flex gap-4">
                        {(['HOME', 'WORK', 'OTHER'] as const).map(type => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setNewAddress(prev => ({ ...prev, type }))}
                            className={`flex-1 py-3 font-mono text-[10px] uppercase tracking-widest border transition-colors ${
                              newAddress.type === type ? 'border-ink bg-ink text-white' : 'border-border text-slate hover:border-ink/50'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        <input 
                          type="text" required placeholder="Address Line 1" 
                          className="w-full bg-transparent border-b border-ink/30 focus:border-ink py-2 outline-none font-sans text-sm"
                          onChange={e => setNewAddress(prev => ({ ...prev, line1: e.target.value }))}
                        />
                        <input 
                          type="text" placeholder="Address Line 2 (Optional)" 
                          className="w-full bg-transparent border-b border-ink/30 focus:border-ink py-2 outline-none font-sans text-sm"
                          onChange={e => setNewAddress(prev => ({ ...prev, line2: e.target.value }))}
                        />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                          <input 
                            type="text" required placeholder="City" 
                            className="w-full bg-transparent border-b border-ink/30 focus:border-ink py-2 outline-none font-sans text-sm"
                            onChange={e => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                          />
                          <input 
                            type="text" required placeholder="State" 
                            className="w-full bg-transparent border-b border-ink/30 focus:border-ink py-2 outline-none font-sans text-sm"
                            onChange={e => setNewAddress(prev => ({ ...prev, state: e.target.value }))}
                          />
                          <input 
                            type="text" required placeholder="PIN Code" 
                            className="w-full md:col-span-1 col-span-2 bg-transparent border-b border-ink/30 focus:border-ink py-2 outline-none font-sans text-sm"
                            onChange={e => setNewAddress(prev => ({ ...prev, pincode: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mt-2">
                        <input 
                          type="checkbox" 
                          id="set-default"
                          className="accent-ink"
                          onChange={e => setNewAddress(prev => ({ ...prev, isDefault: e.target.checked }))}
                        />
                        <label htmlFor="set-default" className="font-sans text-[13px] text-slate cursor-pointer">
                          Set as default address
                        </label>
                      </div>

                      <div className="flex gap-4 mt-4">
                        <button type="submit" className="bg-ink text-white hover:bg-gold transition-colors duration-300 font-mono text-[10px] font-bold uppercase tracking-widest py-3 px-8 rounded-none">
                          Save Address
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setIsAddingAddress(false)}
                          className="font-mono text-[10px] text-slate hover:text-ink transition-colors uppercase tracking-widest py-3 px-4"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 bg-cream flex flex-col">
            
            {/* Preferences Section */}
            <section className="px-6 md:px-12 py-16 flex-1">
              <span className="font-mono text-[9px] text-gold uppercase tracking-[0.3em] font-semibold mb-8 block">
                § YOUR PREFERENCES
              </span>

              {/* Payment Pref */}
              <div className="mb-12">
                <h4 className="font-sans text-sm font-semibold text-ink mb-4">Preferred Payment Method</h4>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => updatePreferences('online')}
                    className={`relative p-4 border transition-colors flex items-center justify-center ${profile.preferredPayment === 'online' ? 'border-ink bg-white' : 'border-border hover:border-ink/50'}`}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-widest font-semibold text-ink">Online</span>
                    {profile.preferredPayment === 'online' && <Check size={12} className="absolute top-2 right-2 text-ink" />}
                  </button>
                  <button 
                    onClick={() => updatePreferences('cod')}
                    className={`relative p-4 border transition-colors flex items-center justify-center ${profile.preferredPayment === 'cod' ? 'border-ink bg-white' : 'border-border hover:border-ink/50'}`}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-widest font-semibold text-ink">COD</span>
                    {profile.preferredPayment === 'cod' && <Check size={12} className="absolute top-2 right-2 text-ink" />}
                  </button>
                </div>
              </div>

              {/* Notifications */}
              <div>
                <h4 className="font-sans text-sm font-semibold text-ink mb-6">Notifications</h4>
                <div className="flex flex-col gap-6">
                  {/* Custom Toggles */}
                  {[
                    { key: 'orderUpdates', label: 'Order Updates', desc: 'Shipping and delivery alerts' },
                    { key: 'newArrivals', label: 'New Arrivals', desc: 'Be the first to know about drops' },
                    { key: 'deals', label: 'Deals & Offers', desc: 'Exclusive access to sales' }
                  ].map((item) => {
                    const isActive = profile.notifications[item.key as keyof Profile['notifications']];
                    return (
                      <div key={item.key} className="flex items-center justify-between">
                        <div>
                          <p className="font-sans text-[13px] text-ink font-medium">{item.label}</p>
                          <p className="font-sans text-[11px] text-slate">{item.desc}</p>
                        </div>
                        
                        {/* The Toggle */}
                        <button 
                          onClick={() => updatePreferences(profile.preferredPayment, { [item.key]: !isActive })}
                          className={`w-11 h-6 rounded-full relative transition-colors duration-300 ease-in-out ${isActive ? 'bg-gold' : 'bg-slate/30'}`}
                        >
                          <motion.div 
                            className="w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm"
                            animate={{ left: isActive ? "24px" : "4px" }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

            </section>
          </div>
        </div>

        {/* Quick Actions Strip */}
        <section className="border-t border-border bg-white py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            
            <Link to="/wishlist" className="flex items-center gap-6 p-8 group hover:bg-cream-soft transition-colors">
              <div className="w-12 h-12 bg-cream flex items-center justify-center rounded-full text-ink group-hover:scale-110 transition-transform">
                <Heart size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink mb-1">View Wishlist</h4>
                <p className="font-sans text-[12px] text-slate">Your saved pieces ({wishlistItems.length})</p>
              </div>
              <span className="font-mono text-[10px] text-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">→</span>
            </Link>

            <Link to="/cart" className="flex items-center gap-6 p-8 group hover:bg-cream-soft transition-colors">
              <div className="w-12 h-12 bg-cream flex items-center justify-center rounded-full text-ink group-hover:scale-110 transition-transform">
                <ShoppingBag size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink mb-1">View Cart</h4>
                <p className="font-sans text-[12px] text-slate">Items ready to buy ({cartCount})</p>
              </div>
              <span className="font-mono text-[10px] text-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">→</span>
            </Link>

            <div className="flex items-center gap-6 p-8 opacity-50 cursor-not-allowed">
              <div className="w-12 h-12 bg-cream flex items-center justify-center rounded-full text-ink">
                <Box size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink mb-1">Past Orders</h4>
                <p className="font-sans text-[12px] text-slate">Coming soon</p>
              </div>
            </div>

          </div>
        </section>

      </div>
      
      <Footer />
    </div>
  );
}
