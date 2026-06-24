import { Link, useRouterState } from "@tanstack/react-router";
import { XIcon } from "./../lib/icons";
import { sideItems } from "../utils/data";

export const MobileSidebar = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <div className={`fixed inset-0 z-50 pointer-events-none`}>
      {/* overlay */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close menu"
        className={`fixed inset-0 bg-black/60 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0"}`}
      />

      {/* drawer */}
      <aside
        className={`relative w-64 max-w-full h-full bg-black text-white border-r transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-bold">Bookmarks Vault</h2>
          <button onClick={onClose} className="p-1" type="button">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <hr />
        <ul className="p-4 space-y-3">
          {sideItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <li key={item.id}>
                <Link
                  to={item.href}
                  onClick={() => onClose()}
                  className={`flex items-center gap-2 px-3 py-2 rounded transition hover:bg-[#1a1a1a] ${isActive ? "bg-[#1a1a1a] font-bold" : ""}`}
                >
                  <Icon />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export default MobileSidebar;
