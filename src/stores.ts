import { writable } from 'svelte/store'

export const filterPacks = writable<string[]>([])
