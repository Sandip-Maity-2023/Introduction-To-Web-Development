export function Footer() {
  return (
    <footer className="bg-gray-900 px-6 py-16 text-white md:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4">
        <div>
          <h3 className="text-2xl font-semibold">Nano Banana</h3>
          <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
            Future-facing cold-crafted beverages with a premium, farm-fresh soul.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.32em] text-gray-300">Shop</h4>
          <ul className="mt-4 space-y-3 text-sm text-gray-400">
            <li><a href="#story" className="hover:text-white">Signature Bottles</a></li>
            <li><a href="#details" className="hover:text-white">Craft Process</a></li>
            <li><a href="#buy-now" className="hover:text-white">Gift Packs</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.32em] text-gray-300">Support</h4>
          <ul className="mt-4 space-y-3 text-sm text-gray-400">
            <li><a href="#buy-now" className="hover:text-white">Shipping Info</a></li>
            <li><a href="#buy-now" className="hover:text-white">Returns</a></li>
            <li><a href="mailto:hello@nanobanana.in" className="hover:text-white">hello@nanobanana.in</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.32em] text-gray-300">Newsletter</h4>
          <p className="mt-4 text-sm leading-6 text-gray-400">
            Weekly drops, launch flavors, and behind-the-bottle stories.
          </p>
          <form className="mt-5 flex gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500"
            />
            <button
              type="submit"
              className="rounded-full bg-orange-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-orange-400"
            >
              Join
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
