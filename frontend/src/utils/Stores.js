import create from 'zustand'

// Create a zustand store for global state management
const useUserStore = create((set, get) => ({
    UserId: -1,
    FullName: "",
    AccessToken: "",
    loading: true,

    setUser: (userId, fullName, accessToken) => set({ 
            UserId: userId,
            FullName: fullName,
            AccessToken: accessToken,
        }),

    setAccessToken: (newAccessToken) => set({ AccessToken: newAccessToken }),
    setLoading: (newLoading) => set({ loading: newLoading }),
}))

export default useUserStore