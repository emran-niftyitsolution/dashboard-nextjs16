const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="px-10 py-3 flex justify-between items-center sticky bottom-0 bg-white z-10">
      <div>
        <p className="text-xs md:text-sm text-gray-500">
          © {currentYear} Dashboard. All rights reserved.
        </p>
      </div>
      <div>
        <p className="text-xs md:text-sm text-gray-500">
          Powered by <span className="text-blue-500">Emran</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
