const Hero = () => {
  return (
    <section className="py-16 flex items-center" style={{ backgroundColor: '#ffcc00', height: '200px' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg md:text-xl text-black font-light mb-4" style={{ marginTop: '-20px' }}>
            Негосударственная экспертиза
          </p>
          <div className="flex justify-center mb-6">
            <div className="border-4 border-black px-8 py-6 inline-block bg-white">
              <h1 className="text-2xl md:text-3xl text-black font-light tracking-wide" style={{ fontFamily: "'Century Gothic', 'Century Gothic Paneuropean', sans-serif" }}>
                ЭКСПЕРТНО-ПРОЕКТНЫЙ ЦЕНТР
              </h1>
            </div>
          </div>
          <p className="text-lg md:text-xl text-black font-light">
            Более 500 заключений с 2015 года
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
