const Footer = () => {
  return (
    <footer className="py-8 bg-[#0B0F19] border-t border-white/5">
      <div className="container mx-auto px-6 text-center text-gray-600">
        <p>© {new Date().getFullYear()} MyAI. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;