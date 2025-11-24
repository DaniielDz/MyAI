import { Edit3, MessageSquare, Infinity as InfinityIcon } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Edit3 className="w-8 h-8 text-[#00D1FF]" />,
      title: "Personalización Total",
      description: "Crea personajes desde cero. Define su personalidad, historia y apariencia para una experiencia verdaderamente tuya."
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-[#00D1FF]" />,
      title: "Conversaciones Naturales",
      description: "Nuestra IA avanzada permite diálogos fluidos y coherentes que evolucionan contigo y recuerdan tus interacciones."
    },
    {
      icon: <InfinityIcon className="w-8 h-8 text-[#00D1FF]" />,
      title: "Siempre Disponible",
      description: "Tus compañeros de IA están listos para chatear 24/7, ofreciéndote compañía y entretenimiento cuando lo necesites."
    }
  ];

  return (
    <section className="py-20 bg-[#0B0F19]">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-[#111625] p-8 rounded-2xl border border-white/5 hover:border-[#00D1FF]/30 transition-colors duration-300 flex flex-col items-center text-center group">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#00D1FF]/10 mb-6 group-hover:bg-[#00D1FF]/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;