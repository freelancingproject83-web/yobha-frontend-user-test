import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-premium-cream">
      {/* Hero Section - Compact */}
      <section className="relative py-8 bg-gradient-to-br from-premium-beige via-premium-cream to-premium-warm-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-black uppercase tracking-widest mb-4">
              About YOBHA
            </h1>
            <p className="text-text-medium text-lg font-light tracking-wide">
              Redefining the essence of modern comfort
            </p>
          </div>
        </div>
      </section>

      {/* Main Content - Compact */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <p className="text-text-dark text-base leading-relaxed font-light">
              YOBHA is an international luxury sleepwear and loungewear brand redefining the essence of modern comfort.
            </p>
            
            <p className="text-text-dark text-base leading-relaxed font-light">
              Born from the idea that tranquility is the new form of luxury, YOBHA blends timeless silhouettes, serene palettes, and refined fabrics into an experience of effortless sophistication.
            </p>
            
            <p className="text-text-dark text-base leading-relaxed font-light">
              Every piece is designed to flow with your rhythm — from peaceful nights to slow, intentional mornings.
            </p>

            <div className="border-l-4 border-luxury-gold pl-4 py-2">
              <p className="text-text-dark text-base leading-relaxed font-light italic">
                "Rooted in calm minimalism and soft structure, our creations celebrate the art of being at ease — feeling beautiful, composed, and entirely yourself."
              </p>
            </div>
          </div>

          {/* Visual Element - Compact */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-premium-beige to-premium-warm-white border border-text-light/20 shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 border-2 border-luxury-gold rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-luxury-gold">Y</span>
                  </div>
                  <p className="text-text-medium text-xs uppercase tracking-widest font-medium">
                    Luxury Redefined
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section - Compact */}
      <section className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-black uppercase tracking-wide mb-3">
              Our Philosophy
            </h2>
            <div className="w-16 h-1 bg-luxury-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-black uppercase tracking-wide mb-3">
                Beyond Sleep
              </h3>
              <p className="text-text-dark text-base leading-relaxed font-light">
                YOBHA extends beyond sleep. Our world embraces loungewear, homewear, daywear, kidswear, and petwear, crafting a seamless universe of elevated essentials that connect you to your most authentic, grounded self.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black uppercase tracking-wide mb-3">
                Home as State of Mind
              </h3>
              <p className="text-text-dark text-base leading-relaxed font-light">
                At YOBHA, home becomes a state of mind — and comfort becomes couture. Every piece is designed to create a sanctuary of tranquility and elegance in your daily life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Compact */}
      <section className="bg-premium-beige py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-black uppercase tracking-wide mb-3">
              Our Values
            </h2>
            <div className="w-16 h-1 bg-luxury-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border-2 border-luxury-gold rounded-full flex items-center justify-center">
                <span className="text-xl">✨</span>
              </div>
              <h3 className="text-lg font-bold text-black uppercase tracking-wide mb-3">
                Tranquility
              </h3>
              <p className="text-text-dark text-sm leading-relaxed font-light">
                Creating peaceful moments through thoughtful design and serene aesthetics.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border-2 border-luxury-gold rounded-full flex items-center justify-center">
                <span className="text-xl">🎨</span>
              </div>
              <h3 className="text-lg font-bold text-black uppercase tracking-wide mb-3">
                Elegance
              </h3>
              <p className="text-text-dark text-sm leading-relaxed font-light">
                Timeless silhouettes that celebrate the art of being effortlessly sophisticated.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border-2 border-luxury-gold rounded-full flex items-center justify-center">
                <span className="text-xl">🏠</span>
              </div>
              <h3 className="text-lg font-bold text-black uppercase tracking-wide mb-3">
                Comfort
              </h3>
              <p className="text-text-dark text-sm leading-relaxed font-light">
                Elevated essentials that connect you to your most authentic, grounded self.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
