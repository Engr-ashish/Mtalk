export const load = (k) => localStorage.getItem(k);
export const save = (k, v) => localStorage.setItem(k, v);