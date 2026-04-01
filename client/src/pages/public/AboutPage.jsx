import { Link } from 'react-router-dom';
import { Target, Compass, Heart, Users, BookOpen, Clock, ChevronRight, CheckCircle, Lightbulb, Shield, Globe } from 'lucide-react';

export function AboutPage() {
  return (
    <main className="flex flex-col w-full bg-white overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative w-full h-[340px] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1723649388532-358b56dda065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4ODgwOTl8&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="About Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>
        <div className="relative z-10 w-full px-6 lg:px-[120px] max-w-[1440px] mx-auto flex flex-col gap-4">
          <div className="flex items-center gap-2 text-white/80 font-sans text-[13px] font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">About Us</span>
          </div>
          <h1 className="font-display text-[32px] lg:text-[44px] font-bold text-white max-w-[600px] leading-[1.2]">
            About Bhawna Foundation
          </h1>
          <p className="font-sans text-[15px] lg:text-[16px] font-normal text-white/80 max-w-[500px] leading-[1.6]">
            Dedicated to transforming lives through compassion, education, and sustainable development.
          </p>
        </div>
      </section>

      {/* 2. Our Story */}
      <section className="w-full bg-white px-6 py-[60px] lg:px-20 lg:py-[80px]">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-[60px] max-w-[1440px] mx-auto">
          <div className="w-full lg:w-[520px] h-[280px] lg:h-[380px] shrink-0 rounded-2xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1653508310086-bd5f097286ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4ODgxMTN8&ixlib=rb-4.1.0&q=80&w=1080" 
              alt="Our Story"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-5 w-full lg:flex-1">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-light-blue rounded-full w-fit">
              <span className="w-3.5 h-3.5 flex items-center justify-center text-primary-blue font-bold text-[12px] italic">i</span>
              <span className="font-sans text-[12px] font-bold tracking-[1px] text-primary-blue uppercase">Our Story</span>
            </div>
            <h2 className="font-display text-[26px] lg:text-[32px] font-bold text-text-dark leading-[1.2]">
              A Journey of Hope and Compassion
            </h2>
            <p className="font-sans text-[15px] lg:text-[16px] font-normal text-text-secondary leading-[1.7]">
              Bhawna Foundation was established in 2015 with a vision to create a world where every individual, regardless of their background, has access to quality education, healthcare, and opportunities for growth.
            </p>
            <p className="font-sans text-[15px] lg:text-[16px] font-normal text-text-secondary leading-[1.7]">
              What started as a small initiative in Jaipur has now grown into a movement touching the lives of over 50,000 people across 25 cities in India. Our dedicated team of volunteers and professionals work tirelessly to bring positive change.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="w-full bg-bg-light px-6 py-[60px] lg:px-20 lg:py-[80px]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-[1440px] mx-auto">
          
          {/* Mission Card */}
          <div className="flex flex-col gap-5 p-8 lg:p-10 w-full lg:w-1/2 bg-white rounded-2xl border border-border-light shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-center w-16 h-16 bg-light-blue rounded-full">
              <Target className="w-7 h-7 text-primary-blue" />
            </div>
            <h3 className="font-display text-[24px] font-bold text-text-dark">
              Our Mission
            </h3>
            <p className="font-sans text-[15px] lg:text-[16px] font-normal text-text-secondary leading-[1.6]">
              To empower underprivileged communities through sustainable interventions in education, healthcare, and livelihood, enabling them to lead lives of dignity and self-reliance.
            </p>
          </div>

          {/* Vision Card */}
          <div className="flex flex-col gap-5 p-8 lg:p-10 w-full lg:w-1/2 bg-white rounded-2xl border border-border-light shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-center w-16 h-16 bg-light-blue rounded-full">
              <Compass className="w-7 h-7 text-primary-blue" />
            </div>
            <h3 className="font-display text-[24px] font-bold text-text-dark">
              Our Vision
            </h3>
            <p className="font-sans text-[15px] lg:text-[16px] font-normal text-text-secondary leading-[1.6]">
              A society where every individual has equitable access to opportunities and resources, fostering an environment of holistic growth and community well-being.
            </p>
          </div>

        </div>
      </section>

      {/* 4. Core Values */}
      <section className="w-full bg-white px-6 py-[60px] lg:px-20 lg:py-[80px]">
        <div className="flex flex-col gap-10 lg:gap-14 max-w-[1440px] mx-auto">
          <div className="flex flex-col gap-4 items-center">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-light-blue rounded-full w-fit">
              <Heart className="w-3.5 h-3.5 text-primary-blue shrink-0" />
              <span className="font-sans text-[12px] font-bold tracking-[1px] text-primary-blue uppercase">Core Values</span>
            </div>
            <h2 className="font-display text-[28px] lg:text-[36px] font-bold text-text-dark text-center">
              The Principles That Guide Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center gap-4 p-8 rounded-xl bg-bg-light">
              <div className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-sm">
                <Heart className="w-6 h-6 text-coral-red" />
              </div>
              <h4 className="font-display text-[18px] font-semibold text-text-dark">Compassion</h4>
              <p className="font-sans text-[14px] font-normal text-text-secondary leading-[1.6]">
                We approach every initiative with deep empathy and a desire to uplift those in need.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 p-8 rounded-xl bg-bg-light">
              <div className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-sm">
                <Shield className="w-6 h-6 text-success-green" />
              </div>
              <h4 className="font-display text-[18px] font-semibold text-text-dark">Integrity</h4>
              <p className="font-sans text-[14px] font-normal text-text-secondary leading-[1.6]">
                Transparency and honesty are at the foundation of all our operations and relationships.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 p-8 rounded-xl bg-bg-light">
              <div className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-sm">
                <Users className="w-6 h-6 text-accent-blue" />
              </div>
              <h4 className="font-display text-[18px] font-semibold text-text-dark">Inclusivity</h4>
              <p className="font-sans text-[14px] font-normal text-text-secondary leading-[1.6]">
                We build programs that support everyone, regardless of background, gender, or religion.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 p-8 rounded-xl bg-bg-light">
              <div className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-sm">
                <Lightbulb className="w-6 h-6 text-warm-orange" />
              </div>
              <h4 className="font-display text-[18px] font-semibold text-text-dark">Innovation</h4>
              <p className="font-sans text-[14px] font-normal text-text-secondary leading-[1.6]">
                We continuously seek new, sustainable ways to address complex societal challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Foundation History (Timeline) */}
      <section className="w-full bg-bg-light px-6 py-[60px] lg:px-20 lg:py-[80px]">
        <div className="flex flex-col gap-10 lg:gap-14 max-w-[800px] mx-auto">
          <div className="flex flex-col gap-4 items-center">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-light-blue rounded-full w-fit">
              <Clock className="w-3.5 h-3.5 text-primary-blue shrink-0" />
              <span className="font-sans text-[12px] font-bold tracking-[1px] text-primary-blue uppercase">Timeline</span>
            </div>
            <h2 className="font-display text-[28px] lg:text-[36px] font-bold text-text-dark text-center">
              Foundation History
            </h2>
          </div>

          <div className="flex flex-col gap-8 relative">
            <div className="absolute left-[20px] top-4 bottom-4 w-0.5 bg-border-light hidden lg:block" />
            
            {/* 2015 */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 relative">
              <div className="hidden lg:flex w-10 h-10 shrink-0 bg-primary-blue rounded-full items-center justify-center z-10 border-4 border-bg-light relative -left-[3px]">
                <span className="w-2.5 h-2.5 bg-white rounded-full" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-display text-[24px] font-bold text-primary-blue lg:leading-tight">2015</span>
                <h4 className="font-display text-[18px] font-semibold text-text-dark">The Inception</h4>
                <p className="font-sans text-[15px] font-normal text-text-secondary leading-[1.6]">
                  Founded in Jaipur with a small team of 5 volunteers, beginning with basic literacy drives in 3 rural schools.
                </p>
              </div>
            </div>

            {/* 2018 */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 relative">
              <div className="hidden lg:flex w-10 h-10 shrink-0 bg-white border border-border-light rounded-full items-center justify-center z-10 relative -left-[3px]">
                <span className="w-2.5 h-2.5 bg-accent-blue rounded-full" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-display text-[24px] font-bold text-accent-blue lg:leading-tight">2018</span>
                <h4 className="font-display text-[18px] font-semibold text-text-dark">Healthcare Expansion</h4>
                <p className="font-sans text-[15px] font-normal text-text-secondary leading-[1.6]">
                  Launched the mobile healthcare unit initiative, reaching out to 20+ isolated villages providing free medical checkups.
                </p>
              </div>
            </div>

            {/* 2021 */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 relative">
              <div className="hidden lg:flex w-10 h-10 shrink-0 bg-white border border-border-light rounded-full items-center justify-center z-10 relative -left-[3px]">
                <span className="w-2.5 h-2.5 bg-success-green rounded-full" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-display text-[24px] font-bold text-success-green lg:leading-tight">2021</span>
                <h4 className="font-display text-[18px] font-semibold text-text-dark">National Recognition</h4>
                <p className="font-sans text-[15px] font-normal text-text-secondary leading-[1.6]">
                  Awarded the Best Community NGO award, crossing a milestone of 25,000 lives impacted through various parallel programs.
                </p>
              </div>
            </div>

            {/* 2025 */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 relative">
              <div className="hidden lg:flex w-10 h-10 shrink-0 bg-white border border-border-light rounded-full items-center justify-center z-10 relative -left-[3px]">
                <span className="w-2.5 h-2.5 bg-warm-orange rounded-full" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-display text-[24px] font-bold text-warm-orange lg:leading-tight">2025</span>
                <h4 className="font-display text-[18px] font-semibold text-text-dark">Going Digital</h4>
                <p className="font-sans text-[15px] font-normal text-text-secondary leading-[1.6]">
                  Initiated massive digital literacy campaigns and expanded operations to 25 cities with over 2,500 active volunteers.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Team Preview */}
      <section className="w-full bg-white px-6 py-[60px] lg:px-20 lg:py-[80px]">
        <div className="flex flex-col gap-10 lg:gap-12 max-w-[1440px] mx-auto items-center">
          <div className="flex flex-col gap-4 items-center text-center">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-light-blue rounded-full w-fit">
              <Users className="w-3.5 h-3.5 text-primary-blue shrink-0" />
              <span className="font-sans text-[12px] font-bold tracking-[1px] text-primary-blue uppercase">Our Team</span>
            </div>
            <h2 className="font-display text-[28px] lg:text-[36px] font-bold text-text-dark">
              Meet Our Leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 w-full">
            {/* Team Member 1 */}
            <div className="flex flex-col items-center gap-4 text-center group">
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden mb-2">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4ODkwNDN8&ixlib=rb-4.1.0&q=80&w=400" alt="Team 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-display text-[18px] font-semibold text-text-dark">Anita Sharma</h4>
                <p className="font-sans text-[14px] font-medium text-primary-blue">Founder & President</p>
              </div>
            </div>
            
            {/* Team Member 2 */}
            <div className="flex flex-col items-center gap-4 text-center group">
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden mb-2">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4ODkwNDN8&ixlib=rb-4.1.0&q=80&w=400" alt="Team 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-display text-[18px] font-semibold text-text-dark">Rajeev Malik</h4>
                <p className="font-sans text-[14px] font-medium text-primary-blue">Operations Director</p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="flex flex-col items-center gap-4 text-center group">
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden mb-2">
                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4ODkwNDN8&ixlib=rb-4.1.0&q=80&w=400" alt="Team 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-display text-[18px] font-semibold text-text-dark">Priya Desai</h4>
                <p className="font-sans text-[14px] font-medium text-primary-blue">Head of Programs</p>
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="flex flex-col items-center gap-4 text-center group">
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden mb-2">
                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4ODkwNDN8&ixlib=rb-4.1.0&q=80&w=400" alt="Team 4" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-display text-[18px] font-semibold text-text-dark">Vikram Singh</h4>
                <p className="font-sans text-[14px] font-medium text-primary-blue">Finance Controller</p>
              </div>
            </div>
          </div>
          
          <button className="px-8 py-3.5 border border-border-light rounded-lg font-sans text-[15px] font-semibold text-text-dark hover:bg-bg-light transition-colors mt-2">
            View All Team Members
          </button>
        </div>
      </section>

      {/* 7. Impact Preview */}
      <section className="w-full bg-bg-light px-6 py-[60px] lg:px-20 lg:py-[80px]">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-[60px] max-w-[1440px] mx-auto">
          <div className="flex flex-col gap-6 w-full lg:w-1/2">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-light-blue rounded-full w-fit">
              <Globe className="w-3.5 h-3.5 text-primary-blue shrink-0" />
              <span className="font-sans text-[12px] font-bold tracking-[1px] text-primary-blue uppercase">Our Impact</span>
            </div>
            <h2 className="font-display text-[26px] lg:text-[32px] font-bold text-text-dark leading-[1.2]">
              Measuring What Matters
            </h2>
            <p className="font-sans text-[15px] lg:text-[16px] font-normal text-text-secondary leading-[1.6]">
              Our programs are designed for long-term sustainability and measurable outcomes. We track our impact rigorously to ensure community resources are utilized effectively.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="flex flex-col gap-1">
                <span className="font-display text-[32px] font-bold text-primary-blue">95%</span>
                <span className="font-sans text-[14px] font-medium text-text-dark">Funds reach directly</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-display text-[32px] font-bold text-success-green">50k+</span>
                <span className="font-sans text-[14px] font-medium text-text-dark">Active beneficiaries</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-display text-[32px] font-bold text-warm-orange">200+</span>
                <span className="font-sans text-[14px] font-medium text-text-dark">Local partnerships</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-display text-[32px] font-bold text-accent-blue">A+</span>
                <span className="font-sans text-[14px] font-medium text-text-dark">Transparency rating</span>
              </div>
            </div>

            <button className="w-fit mt-4 px-8 py-3.5 bg-primary-blue text-white font-sans text-[15px] font-semibold rounded-lg hover:bg-primary-blue/90 transition-colors">
              Read Annual Report
            </button>
          </div>
          
          <div className="w-full lg:w-1/2 h-[300px] lg:h-[420px] rounded-2xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1768583111933-a3d47a7a3baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzQ4ODgzNzV8&ixlib=rb-4.1.0&q=80&w=1080" 
              alt="Impact" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

    </main>
  );
}
