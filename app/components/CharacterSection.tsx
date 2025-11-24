import Link from 'next/link';

const characters = [
  {
    name: "Messi",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdH5gOT8Nm6bp5ClX6Dl48mqzi6tmQs24Rg3KBjNUDzMoLQZzfSOLe1ullvi4HP33uGt-zjF8fSSBJ-OzpM9A_xoZhSTxowbMksmJytAf_kbjcubcL80m_hO3EfMLbleqQm2qllTP6lS7VpyvUWoVp4tsuhySme9_e4TiNjg-lIenCognqFAVrwmpZE5pcR7okCmDIykC3GPrRLepjHEJ5uGpmH3KSCUx7acFOSxrCIlTQZUyhDTuWLyDkC_yZT3_Fnoqr7Trll4EB",
    id: "messi"
  },
  {
    name: "Homero Simpson",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgV2azoE79rIZ_IYHDM6OpQdhQX3w2M7_S-v0Din3nOWIODeKgDPqenDc8XTbU9xmxwKfJQHoUzKa1O2A1aIQcJpvuBYs0P38yu8Ictw4Lrgqp6ggUtjuXRuM1kTqZGrdZP2_iu1hM1RUyYvfPQiboHjfZRWKgif08Wb_LYAnnW4vP7DbzgSd6seOEUIjn-GFw8fEjdR632X-O_QjsCUnOozqhq4DroSg5yzKREUC7BgVSbBTH2XOLZyHiHIWjbHx4JXiC_cg3-ar_",
    id: "homer"
  },
  {
    name: "Cristiano Ronaldo",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLICXwwM0wzJOKqVXm69vAoHICC54dUX9F-YcHAFPgtXwUfcyfDe1jEgyzKkf0Mk_EH91FgzC_2QfIbBYwfjxJgztI0-tRhVOeHmDW9gvXZj4wJ2Rf6yV-O3LG4eyRBUDcq_1beuESpLKq5Om_tEpTbTLAHu1VW3EMU4zn3l88Csx-NMNpl755dD1sIajiOz8Nlo23h-2a7T2Z0-jhYkzfgIiaGACFQaRkLRr_fZY9jpW2ibcasKrcz7fEv79sio06DhOOeIAyyq_6",
    id: "cr7"
  }
];

const CharacterSection = () => {
  return (
    <section className="py-20 md:py-28 bg-[#0B0F19]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Prueba algunos Personajes</h2>
          <p className="text-lg text-gray-400">Comienza a chatear con una de nuestras personalidades de IA.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {characters.map((char) => (
            <div key={char.id} className="bg-[#111625] rounded-2xl border border-white/5 overflow-hidden flex flex-col hover:border-[#00D1FF]/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] group">
              <div className="h-80 overflow-hidden relative">
                <div className="absolute inset-0 bg-linear-to-t from-[#111625] to-transparent opacity-60 z-10" />
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6 flex flex-col grow relative z-20 -mt-12">
                <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">{char.name}</h3>
                <div className="mt-auto">
                  <Link
                    href={`/chat?character=${char.id}`}
                    className="block w-full text-center bg-[#00D1FF] hover:bg-[#00A3CC] text-[#0B0F19] font-bold py-3 px-6 rounded-xl transition-colors duration-300"
                  >
                    Chatear Ahora
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CharacterSection;