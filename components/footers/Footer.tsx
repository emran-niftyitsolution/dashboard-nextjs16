const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="px-10 py-3 flex justify-between items-center sticky bottom-0 z-10 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div>
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
          © {currentYear} Dashboard. All rights reserved.
        </p>
      </div>
      <div>
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
          Powered by{" "}
          <span className="text-blue-500 dark:text-blue-400">Emran</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
