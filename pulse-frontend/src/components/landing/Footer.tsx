import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="text-gray-400 py-6 text-center flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto">
      <div className="text-sm mb-4">
        © {new Date().getFullYear()} pulseping.avikmukherjee.me
      </div>
      <div className="flex justify-center gap-8">
        <Link
          href="https://twitter.com/avikm744"
          className="hover:text-gray-200 transition-colors"
        >
          Contact
        </Link>
        <Link
          href="https://twitter.com/avikm744"
          target="_blank"
          className="hover:text-gray-200 transition-colors"
        >
          Twitter
        </Link>
        <Link
          href="https://github.com/Avik-creator"
          target="_blank"
          className="hover:text-gray-200 transition-colors"
        >
          GitHub
        </Link>
      </div>
    </footer>
  );
};
