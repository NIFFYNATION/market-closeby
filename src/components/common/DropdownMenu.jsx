import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";

// Utility: Close dropdown on outside click
function useOutsideClick(ref, onClose) {
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, onClose]);
}

export default function DropdownMenu({
  buttonContent,
  menuItems,
  header,
  footer,
  align = "left",
  buttonClass = "",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useOutsideClick(ref, () => setOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button
        className={`flex items-center focus:outline-none ${buttonClass}`}
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        {buttonContent}
      </button>
      {open && (
        <div
          className={`absolute top-full mt-10 min-w-[260px] bg-white rounded-b-xl shadow-2xl  z-100 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
           {header && (
            <div className="px-6 py-4 flex justify-center">{header}</div>
          )}
          <ul className="py-3">
            {menuItems.map((item, idx) =>
              (
                <li key={item.label}>
                  {item.to ? (
                    <Link
                      to={item.to}
                      className="flex items-center px-6 py-2 hover:bg-gray-50 text-gray-900"
                      onClick={() => setOpen(false)}
                    >
                      {item.icon && <span className="mr-3">{item.icon}</span>}
                      {item.label}
                    </Link>
                  ) : item.href ? (
                    <a
                      href={item.href}
                      className="flex items-center px-6 py-2 hover:bg-gray-50 text-gray-900"
                      onClick={() => setOpen(false)}
                    >
                      {item.icon && <span className="mr-3">{item.icon}</span>}
                      {item.label}
                    </a>
                  ) : (
                    <button
                      className="flex items-center w-full px-6 py-2 hover:bg-gray-50 text-gray-900"
                      onClick={() => {
                        setOpen(false);
                        item.onClick && item.onClick();
                      }}
                    >
                      {item.icon && <span className="mr-3">{item.icon}</span>}
                      {item.label}
                    </button>
                  )}
                </li>
              )
            )}
          </ul>
          {footer && (
            <div className="border-t border-[#D9D9D9] px-6 py-4 flex justify-center">{footer}</div>
          )}
        </div>
      )}
    </div>
  );
}