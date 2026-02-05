const Footer = () => {
  return (
    <footer className="w-full mt-14">
      <div className="border-t-2 border-(--color-primary) px-6 py-6 text-center text-xs">
        <div className="flex flex-col items-center gap-2">
          <img src="/logo_blumen.png" alt="" className="h-8 w-auto" />

          <p className="italic">
            Sakura sagt: <br />
            „Du machst das{" "}
            <span className="text-(--color-primary) font-bold">super!</span>“
          </p>

          <p className="opacity-70">
            © {new Date().getFullYear()} SakuraBloom by Alissa, Souher
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
