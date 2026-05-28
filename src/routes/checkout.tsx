import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { OptimizedImage } from '@/components/OptimizedImage';

// Form validation schema
const checkoutSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().regex(/^[6-9]\d{9}$/, { message: "Invalid Indian phone number (10 digits)" }),
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  address: z.string().min(10, { message: "Please provide a complete address" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, { message: "Invalid Indian PIN code (6 digits)" }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export const Route = createFileRoute('/checkout')({
  component: CheckoutPage
});

function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    // Simulate API call for order placement
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Order placed:", { ...data, total: cartTotal, items });
    
    setIsSubmitting(false);
    clearCart();
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Nav />
        <main className="flex-1 flex items-center justify-center pt-32 pb-20 px-4">
          <div className="max-w-md w-full bg-white p-10 border border-border text-center shadow-sm">
            <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <h1 className="font-display text-3xl text-ink mb-4">Order Confirmed!</h1>
            <p className="font-sans text-slate mb-8">
              Thank you for shopping with DHARAA. Your order has been successfully placed and will be shipped soon.
            </p>
            <button onClick={() => navigate({ to: '/shop' })} className="btn-primary w-full">
              Continue Shopping
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Nav />
        <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-4">
          <h1 className="font-display text-3xl text-ink mb-4">Your Cart is Empty</h1>
          <p className="font-sans text-slate mb-8">Add some items before proceeding to checkout.</p>
          <button onClick={() => navigate({ to: '/shop' })} className="btn-primary">
            Return to Shop
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="pt-32 pb-20">
        <div className="section-container">
          <h1 className="font-display text-3xl md:text-4xl text-ink mb-10">Checkout</h1>
          
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Form Column */}
            <div className="flex-1 lg:max-w-2xl">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                
                {/* Contact Section */}
                <section>
                  <h2 className="font-sans text-lg font-semibold text-ink mb-6 flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-ink text-white text-xs">1</span>
                    Contact Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-xs font-medium text-slate mb-1">Email</label>
                      <input 
                        type="email" 
                        {...register('email')}
                        className={`form-input ${errors.email ? 'form-input-error' : ''}`} 
                        placeholder="you@example.com"
                      />
                      {errors.email && <p className="text-red text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block font-sans text-xs font-medium text-slate mb-1">Phone (10 digits)</label>
                      <input 
                        type="tel" 
                        {...register('phone')}
                        className={`form-input ${errors.phone ? 'form-input-error' : ''}`}
                        placeholder="9876543210"
                      />
                      {errors.phone && <p className="text-red text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>
                </section>

                <div className="h-px w-full bg-border" />

                {/* Shipping Section */}
                <section>
                  <h2 className="font-sans text-lg font-semibold text-ink mb-6 flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-ink text-white text-xs">2</span>
                    Shipping Address
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-xs font-medium text-slate mb-1">First Name</label>
                      <input 
                        type="text" 
                        {...register('firstName')}
                        className={`form-input ${errors.firstName ? 'form-input-error' : ''}`}
                      />
                      {errors.firstName && <p className="text-red text-xs mt-1">{errors.firstName.message}</p>}
                    </div>
                    <div>
                      <label className="block font-sans text-xs font-medium text-slate mb-1">Last Name</label>
                      <input 
                        type="text" 
                        {...register('lastName')}
                        className={`form-input ${errors.lastName ? 'form-input-error' : ''}`}
                      />
                      {errors.lastName && <p className="text-red text-xs mt-1">{errors.lastName.message}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block font-sans text-xs font-medium text-slate mb-1">Address</label>
                      <input 
                        type="text" 
                        {...register('address')}
                        className={`form-input ${errors.address ? 'form-input-error' : ''}`}
                        placeholder="House no, Building, Street, Area"
                      />
                      {errors.address && <p className="text-red text-xs mt-1">{errors.address.message}</p>}
                    </div>
                    <div>
                      <label className="block font-sans text-xs font-medium text-slate mb-1">City</label>
                      <input 
                        type="text" 
                        {...register('city')}
                        className={`form-input ${errors.city ? 'form-input-error' : ''}`}
                      />
                      {errors.city && <p className="text-red text-xs mt-1">{errors.city.message}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-sans text-xs font-medium text-slate mb-1">State</label>
                        <input 
                          type="text" 
                          {...register('state')}
                          className={`form-input ${errors.state ? 'form-input-error' : ''}`}
                        />
                        {errors.state && <p className="text-red text-xs mt-1">{errors.state.message}</p>}
                      </div>
                      <div>
                        <label className="block font-sans text-xs font-medium text-slate mb-1">PIN Code</label>
                        <input 
                          type="text" 
                          {...register('pincode')}
                          className={`form-input ${errors.pincode ? 'form-input-error' : ''}`}
                          placeholder="6 digits"
                        />
                        {errors.pincode && <p className="text-red text-xs mt-1">{errors.pincode.message}</p>}
                      </div>
                    </div>
                  </div>
                </section>

                <div className="h-px w-full bg-border" />

                {/* Payment Section (Simulated) */}
                <section>
                  <h2 className="font-sans text-lg font-semibold text-ink mb-6 flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-ink text-white text-xs">3</span>
                    Payment
                  </h2>
                  <div className="bg-cream/50 p-6 border border-border flex items-center justify-between">
                    <span className="font-sans text-sm text-ink font-medium">Cash on Delivery (COD)</span>
                    <span className="w-4 h-4 rounded-full border-4 border-ink bg-white"></span>
                  </div>
                  <p className="text-xs text-slate mt-4">
                    Currently, we only support Cash on Delivery. Online payments via Razorpay will be integrated soon.
                  </p>
                </section>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary w-full h-14 text-sm font-mono tracking-widest uppercase flex items-center justify-center gap-2 group relative overflow-hidden"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Securing Order...</span>
                    </>
                  ) : (
                    `Place Order (₹${cartTotal})`
                  )}
                </button>
              </form>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:w-[400px]">
              <div className="bg-cream p-6 md:p-8 sticky top-32">
                <h2 className="font-sans text-lg font-semibold text-ink mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex gap-4">
                      <OptimizedImage src={product.image} alt="" className="w-16 h-16 object-cover border border-border" />
                      <div className="flex-1">
                        <h4 className="font-sans text-sm text-ink line-clamp-1">{product.name}</h4>
                        <p className="font-sans text-xs text-slate mt-1">Qty: {quantity}</p>
                        <p className="font-sans text-sm font-semibold text-ink mt-1">₹{product.price * quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-6 space-y-3 font-sans text-sm">
                  <div className="flex justify-between text-slate">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-slate">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-border pt-3 mt-3 flex justify-between items-center">
                    <span className="text-ink font-semibold">Total</span>
                    <span className="text-xl font-bold text-ink">₹{cartTotal}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
