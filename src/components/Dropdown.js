import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Reusable dropdown component with headless behavior.
 * - Controlled by `value` and `onChange`
 * - `options`: Array<{ value: string, label?: string }>
 * - `buttonClassName`/`menuClassName` to tweak styles
 * - `align`: 'left' | 'right' (menu alignment)
 */
export default function Dropdown({
  value,
  onChange,
  options,
  buttonClassName = '',
  menuClassName = '',
  align = 'left',
  labelForValue,
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);

  const labelMap = useMemo(() => {
    const map = new Map();
    options.forEach((opt) => map.set(opt.value, opt.label ?? String(opt.value)));
    return map;
  }, [options]);

  const selectedLabel = labelForValue
    ? labelForValue(value)
    : labelMap.get(value) ?? String(value);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div className="relative" ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-0.5 sm:gap-1 md:gap-1 text-[8px] sm:text-[9px] md:text-xs text-gray-700 px-1 sm:px-1.5 md:px-2 py-0.5 sm:py-0.5 md:py-1 rounded-sm sm:rounded-md md:rounded-md border border-transparent hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900/10 ${buttonClassName}`}
        style={{ backgroundColor: '#F8F8F8' }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="truncate max-w-[4rem] sm:max-w-[6rem] md:max-w-[10rem]">{selectedLabel}</span>
        <img src="/icons/topbar/Dropdown.svg" alt="" aria-hidden className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 opacity-70" />
      </button>
      {open && (
        <div
          className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-0.5 sm:mt-1 md:mt-1 min-w-[5rem] sm:min-w-[6rem] md:min-w-[9rem] rounded-sm sm:rounded-md md:rounded-md border bg-white shadow z-10 ${menuClassName}`}
          role="listbox"
        >
          {options.map((opt) => {
            const isActive = opt.value === value;
            const label = opt.label ?? String(opt.value);
            return (
              <button
                key={opt.value}
                className={`w-full text-left px-1 sm:px-1.5 md:px-2 py-0.5 sm:py-0.5 md:py-1 text-[8px] sm:text-[9px] md:text-xs ${isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  onChange && onChange(opt.value);
                  setOpen(false);
                  if (buttonRef.current) buttonRef.current.focus();
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}


