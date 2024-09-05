import React from 'react';

const DownloadButton: React.FC = () => {
  return (
    <a
      href="https://github.com/link-to-code"
      className="bg-black text-white px-6 py-2 rounded-full flex items-center space-x-2"
    >
      <img src="/path-to-github-icon.svg" alt="GitHub" className="w-6 h-6" />
      <span>Download From GitHub</span>
    </a>
  );
};

export default DownloadButton;
