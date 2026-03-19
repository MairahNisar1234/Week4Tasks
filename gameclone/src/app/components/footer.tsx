export default function Footer() {
  const footerLinks = [
    { title: "Resources", items: ["Creator Support", "Published on Epic", "Careers", "Company"] },
    { title: "Fan Work Policy", items: ["UX Research", "Store EULA"] },
    { title: "Online Services", items: ["Epic Online Services", "Epic Account", "Store Support"] },
  ];

  return (
    <footer className="bg-epic-black pt-16 pb-8 px-4 border-t border-white/5 font-poppins">
      <div className="max-w-7xl mx-auto">
        {/* Custom Social Icons Row */}
        <div className="flex gap-5 mb-10">
          {/* Replace src with your icon paths */}
          <img src="/facebook.png" className="w-6 h-6 opacity-60 hover:opacity-100 cursor-pointer" alt="fb" />
          <img src="/twitter.png" className="w-7 h-5 opacity-60 hover:opacity-100 cursor-pointer" alt="tw" />
          <img src="/youtube.png" className="w-5 h-6 opacity-60 hover:opacity-100 cursor-pointer" alt="yt" />
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h3 className="text-gray-500 font-bold text-[11px] uppercase mb-4 tracking-widest">{col.title}</h3>
              <ul className="flex flex-col gap-2">
                {col.items.map(item => (
                  <li key={item} className="text-white text-[13px] hover:text-epic-blue cursor-pointer transition-colors">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Legal Section */}
        <div className="border-t border-white/5 pt-8 text-[11px] text-gray-500 leading-loose">
          <p className="mb-8 max-w-3xl">
            © 2026, Epic Games, Inc. All rights reserved. Epic, Epic Games, the Epic Games logo, Fortnite, the Fortnite logo, Unreal, Unreal Engine, the Unreal Engine logo, Unreal Tournament, and the Unreal Tournament logo are trademarks or registered trademarks of Epic Games, Inc. in the United States of America and elsewhere.
          </p>
          <div className="flex gap-6 font-bold uppercase tracking-wider">
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}