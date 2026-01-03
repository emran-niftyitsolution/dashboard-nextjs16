const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="sticky bottom-0 z-10 flex items-center justify-between bg-white px-10 py-3 transition-colors duration-200 dark:bg-gray-900">
      <div>
        <p className="text-xs text-gray-500 md:text-sm dark:text-gray-400">
          © {currentYear} Dashboard. All rights reserved.
        </p>
      </div>
      <div>
        <p className="text-xs text-gray-500 md:text-sm dark:text-gray-400">
          Powered by{" "}
          <span className="text-blue-500 dark:text-blue-400">Emran</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
