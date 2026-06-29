import React from 'react';
import { Check } from 'lucide-react';
import { isLightColor } from '@/lib/utils';

export interface ColorOption {
  id: string;
  hex: string;
  name: string;
}

interface ColorPickerProps {
  colors: ColorOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  title: string;
  description?: string;
  columns?: number;
  label?: string;
}

export function ColorPicker({
  colors,
  selectedId,
  onSelect,
  title,
  description,
  columns = 6,
  label,
}: ColorPickerProps) {
  const gridColsClass = {
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    8: 'grid-cols-8',
    10: 'grid-cols-10',
  }[columns] || 'grid-cols-6';

  return (
    <div className="card-panel">
      <h3 className="text-md font-bold mb-1">{title}</h3>
      {description && <p className="text-xs text-[#666666] mb-3">{description}</p>}
      
      <div 
        role="listbox" 
        aria-label={label || title}
        className={`grid ${gridColsClass} gap-2`}
      >
        {colors.map((color) => {
          const isSelected = selectedId === color.id;
          const isLight = isLightColor(color.hex);
          
          return (
            <button
              key={color.id}
              role="option"
              aria-selected={isSelected}
              title={color.name}
              className={`
                w-8 h-8 rounded-full transition-all duration-200 
                flex items-center justify-center relative
                hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500
                ${isSelected ? 'ring-2 ring-offset-1 ring-blue-600 scale-110' : 'hover:shadow-md'}
              `}
              style={{ backgroundColor: color.hex }}
              onClick={() => onSelect(color.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(color.id);
                }
              }}
            >
              {isSelected && (
                <Check 
                  size={14} 
                  className={isLight ? 'text-black' : 'text-white'} 
                  strokeWidth={3}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
