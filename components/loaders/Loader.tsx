import { Spin } from "antd";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900 transition-colors">
      <div className="flex flex-col items-center gap-4">
        <Spin size="large" />
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;

