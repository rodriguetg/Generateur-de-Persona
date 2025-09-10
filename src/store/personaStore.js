import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { generatePersona as generatePersonaUtil } from '../utils/personaGenerator'

export const usePersonaStore = create(
  persist(
    (set, get) => ({
      // STATE
      currentView: 'home',
      currentPersona: null,
      isGenerating: false,
      personaHistory: [],
      favoritePersonas: [],
      hasVisited: false,
      
      // ACTIONS
      setHasVisited: () => set({ hasVisited: true }),

      generatePersona: async (filters = {}) => {
        set({ isGenerating: true })
        
        // Simulate generation time for better UX
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        const newPersona = await generatePersonaUtil(filters)
        
        set(state => ({
          currentPersona: newPersona,
          personaHistory: [newPersona, ...state.personaHistory.slice(0, 9)],
          currentView: 'preview',
          isGenerating: false,
        }))
      },

      selectPersona: (persona) => {
        set({
          currentPersona: persona,
          currentView: 'preview',
        })
      },

      backToHome: () => {
        set({
          currentView: 'home',
          currentPersona: null,
        })
      },

      toggleFavorite: (persona) => {
        const favorites = get().favoritePersonas
        const isFavorite = favorites.some(p => p.id === persona.id)

        if (isFavorite) {
          set({ favoritePersonas: favorites.filter(p => p.id !== persona.id) })
        } else {
          set({ favoritePersonas: [...favorites, persona] })
        }
      },
    }),
    {
      name: 'persona-generator-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({ 
        personaHistory: state.personaHistory,
        favoritePersonas: state.favoritePersonas,
        hasVisited: state.hasVisited,
      }),
    }
  )
)
