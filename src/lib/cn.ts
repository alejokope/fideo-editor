type ClassValue = string | number | boolean | undefined | null | ClassValue[] | Record<string, boolean | undefined | null>;

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];
  
  const flatten = (val: ClassValue): void => {
    if (!val) return;
    if (typeof val === 'string' || typeof val === 'number') {
      classes.push(String(val));
    } else if (Array.isArray(val)) {
      val.forEach(v => flatten(v));
    } else if (typeof val === 'object') {
      Object.entries(val as Record<string, boolean | undefined | null>).forEach(([key, value]) => {
        if (value) classes.push(key);
      });
    }
  };
  
  inputs.forEach(input => flatten(input));
  return classes.join(' ');
}