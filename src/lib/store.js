import { writable } from 'svelte/store';

export const current = writable('home');
export const isMobile = writable(false);
export const menuOpen = writable(false);