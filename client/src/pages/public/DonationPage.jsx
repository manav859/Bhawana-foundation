import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Heart, FileText, CheckCircle } from 'lucide-react';

export function DonationPage() {
  const [amount, setAmount] = useState(2000);
  const [isCustom, setIsCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState('one-time');

  const predefinedAmounts = [1000, 2000, 5000];

  const handleAmountClick = (val) => {
    setAmount(val);
    setIsCustom(false);
  };

  return (
    <main className="flex flex-col w-full bg-bg-light overflow-hidden pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative w-full h-[340px] lg:h-[420px] flex items-center bg-gray-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/uploads/donate-hero.jpg" 
            alt="Support Our Cause" 
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-white opacity-5 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-accent-blue opacity-10 rounded-full blur-[60px] -ml-10 -mb-10 pointer-events-none" />
        </div>
        
        <div className="relative z-10 w-full px-6 lg:px-[120px] max-w-[1440px] mx-auto flex flex-col gap-4">
          <div className="flex items-center gap-2 text-white/70 font-sans text-[13px] font-medium">
            <Link to="/" className="hover:text-white transition-colors text-white/80">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/80" />
            <span className="text-white font-semibold">Donate</span>
          </div>
          <h1 className="font-display text-[32px] lg:text-[44px] font-bold text-white max-w-[600px] leading-[1.2]">
            Support Our Cause
          </h1>
          <p className="font-sans text-[15px] lg:text-[16px] font-normal text-white/70 max-w-[500px] leading-[1.6]">
            Your contribution, no matter how small, has the power to change a life. Join us in our mission to create a society where everyone has equitable access.
          </p>
        </div>
      </section>

      {/* 2. Main Layout (Left: Info, Right: Form) */}
      <section className="w-full px-6 lg:px-[120px] max-w-[1440px] mx-auto mt-10 lg:mt-[-40px] relative z-20">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-[60px] items-start">
          
          {/* Left Panel: Impact & Info */}
          <div className="flex flex-col gap-8 w-full lg:w-1/2 pt-0 lg:pt-[80px]">
            <h2 className="font-display text-[28px] lg:text-[36px] font-bold text-text-dark leading-[1.2]">
              Why Your Donation Matters
            </h2>
            <p className="font-sans text-[16px] text-text-secondary leading-[1.7]">
              Every rupee you donate is channeled directly into our ground-level initiatives. Whether it's building a secure classroom, organizing a vital medical camp, or empowering a woman with vocational skills, your generosity is the fuel that drives our impact.
            </p>
            
            <div className="flex flex-col gap-5 mt-4">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-light-blue shrink-0">
                  <ShieldCheck className="w-6 h-6 text-primary-blue" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-display text-[18px] font-semibold text-text-dark">100% Transparency</h4>
                  <p className="font-sans text-[14px] text-text-secondary leading-[1.6]">We maintain detailed records. You will receive an annual report showing exactly how your funds were utilized.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-success-green/10 shrink-0">
                  <FileText className="w-6 h-6 text-success-green" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-display text-[18px] font-semibold text-text-dark">Tax Benefits Under 80G</h4>
                  <p className="font-sans text-[14px] text-text-secondary leading-[1.6]">All donations to Bhawna Foundation are 50% tax-exempt under section 80G of the Income Tax Act.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-warm-orange/10 shrink-0">
                  <Heart className="w-6 h-6 text-warm-orange" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-display text-[18px] font-semibold text-text-dark">Direct Community Impact</h4>
                  <p className="font-sans text-[14px] text-text-secondary leading-[1.6]">By keeping our administrative costs below 5%, we ensure maximum funds reach the beneficiaries.</p>
                </div>
              </div>
            </div>
            
            <div className="w-full h-[240px] rounded-2xl overflow-hidden mt-4 hidden lg:block">
              <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ5MDA5OTJ8&ixlib=rb-4.1.0&q=80&w=800" alt="Impact" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right Panel: Donation Form */}
          <div className="w-full lg:w-1/2 bg-white rounded-3xl p-6 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-border-light">
            <h3 className="font-display text-[24px] font-bold text-text-dark mb-6">Complete Your Donation</h3>
            
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              
              {/* Frequency Toggle */}
              <div className="flex bg-bg-light p-1 rounded-xl">
                <button 
                  type="button"
                  onClick={() => setFrequency('one-time')}
                  className={`flex-1 py-3 text-[14px] font-bold font-sans rounded-lg transition-colors ${frequency === 'one-time' ? 'bg-white text-primary-blue shadow-sm' : 'text-text-secondary hover:text-text-dark'}`}
                >
                  Give Once
                </button>
                <button 
                  type="button"
                  onClick={() => setFrequency('monthly')}
                  className={`flex-1 py-3 text-[14px] font-bold font-sans rounded-lg transition-colors ${frequency === 'monthly' ? 'bg-white text-primary-blue shadow-sm' : 'text-text-secondary hover:text-text-dark'}`}
                >
                  Monthly
                </button>
              </div>

              {/* Amount Selection */}
              <div className="flex flex-col gap-3">
                <label className="font-sans text-[14px] font-semibold text-text-dark">Select Amount (INR)</label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {predefinedAmounts.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleAmountClick(val)}
                      className={`py-3 rounded-lg font-sans text-[15px] font-bold border transition-colors ${
                        amount === val && !isCustom 
                          ? 'bg-light-blue border-primary-blue text-primary-blue' 
                          : 'bg-white border-border-light text-text-secondary hover:border-border-dark'
                      }`}
                    >
                      ₹ {val}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setIsCustom(true)}
                    className={`py-3 rounded-lg font-sans text-[15px] font-bold border transition-colors ${
                      isCustom 
                        ? 'bg-light-blue border-primary-blue text-primary-blue' 
                        : 'bg-white border-border-light text-text-secondary hover:border-border-dark'
                    }`}
                  >
                    Custom
                  </button>
                </div>
                
                {isCustom && (
                  <div className="relative mt-2">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans font-bold text-text-secondary">₹</span>
                    <input 
                      type="number" 
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-3.5 bg-white border border-border-light rounded-lg font-sans text-[15px] text-text-dark focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all"
                    />
                  </div>
                )}
              </div>

              {/* Personal Details */}
              <div className="flex flex-col gap-4 mt-2">
                <label className="font-sans text-[14px] font-semibold text-text-dark">Personal Details</label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="First Name *"
                    required
                    className="w-full px-4 py-3.5 bg-bg-light border border-transparent rounded-lg font-sans text-[15px] text-text-dark focus:outline-none focus:bg-white focus:border-primary-blue transition-all"
                  />
                  <input 
                    type="text" 
                    placeholder="Last Name *"
                    required
                    className="w-full px-4 py-3.5 bg-bg-light border border-transparent rounded-lg font-sans text-[15px] text-text-dark focus:outline-none focus:bg-white focus:border-primary-blue transition-all"
                  />
                </div>

                <input 
                  type="email" 
                  placeholder="Email Address *"
                  required
                  className="w-full px-4 py-3.5 bg-bg-light border border-transparent rounded-lg font-sans text-[15px] text-text-dark focus:outline-none focus:bg-white focus:border-primary-blue transition-all"
                />

                <input 
                  type="tel" 
                  placeholder="Phone Number *"
                  required
                  className="w-full px-4 py-3.5 bg-bg-light border border-transparent rounded-lg font-sans text-[15px] text-text-dark focus:outline-none focus:bg-white focus:border-primary-blue transition-all"
                />

                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="PAN Card Number (For 80G Tax Exemption)"
                    className="w-full px-4 py-3.5 bg-bg-light border border-transparent rounded-lg font-sans text-[15px] text-text-dark focus:outline-none focus:bg-white focus:border-primary-blue uppercase transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-sans text-[12px] text-text-secondary">Optional</span>
                </div>
              </div>

              <div className="flex gap-3 items-start mt-2">
                <input type="checkbox" id="terms" className="mt-1 w-4 h-4 rounded border-border-light text-primary-blue focus:ring-primary-blue" />
                <label htmlFor="terms" className="font-sans text-[13px] text-text-secondary leading-tight">
                  I agree to the <Link to="#" className="text-primary-blue hover:underline">Terms & Conditions</Link> and <Link to="#" className="text-primary-blue hover:underline">Privacy Policy</Link>. I confirm that the funds are from legitimate sources.
                </label>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-success-green text-white font-sans text-[16px] font-bold rounded-xl shadow-md hover:bg-success-green/90 hover:shadow-lg transition-all mt-4 flex items-center justify-center gap-2"
              >
                Donate {isCustom ? (customAmount ? `₹${customAmount}` : '') : `₹${amount}`} Securely
                <ChevronRight className="w-5 h-5" />
              </button>

            </form>
          </div>

        </div>
      </section>

    </main>
  );
}
