import { create } from 'zustand'

const useDashboardStore = create((set) => ({
  dashboards: [],
  currentDashboard: null,
  widgets: [],

  setDashboards: (dashboards) => set({ dashboards }),
  setCurrentDashboard: (dashboard) => set({ currentDashboard: dashboard }),
  setWidgets: (widgets) => set({ widgets }),

  addWidget: (widget) => set((s) => ({ widgets: [...s.widgets, widget] })),

  updateWidget: (id, updates) =>
    set((s) => ({
      widgets: s.widgets.map((w) => (w.id === id ? { ...w, ...updates } : w)),
    })),

  removeWidget: (id) =>
    set((s) => ({ widgets: s.widgets.filter((w) => w.id !== id) })),

  updateLayout: (layout) =>
    set((s) => ({
      widgets: s.widgets.map((w) => {
        const item = layout.find((l) => l.i === w.id)
        return item ? { ...w, position: { x: item.x, y: item.y, w: item.w, h: item.h } } : w
      }),
    })),
}))

export default useDashboardStore
