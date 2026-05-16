interface VisitData {
  totalVisits: number
  dailyVisits: Record<string, number>
  toolVisits: Record<string, number>
  lastDate: string
}

const STORAGE_KEY = 'toolbox_visits'

function getData(): VisitData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { totalVisits: 0, dailyVisits: {}, toolVisits: {}, lastDate: '' }
}

function saveData(data: VisitData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function trackVisit() {
  const data = getData()
  data.totalVisits++
  const today = new Date().toISOString().slice(0, 10)
  data.dailyVisits[today] = (data.dailyVisits[today] || 0) + 1
  data.lastDate = today
  saveData(data)
}

export function trackToolVisit(toolId: string) {
  const data = getData()
  data.toolVisits[toolId] = (data.toolVisits[toolId] || 0) + 1
  saveData(data)
}

export function getVisitStats() {
  return getData()
}

export function getDailyTrend(days: number) {
  const data = getData()
  const result: { date: string; visits: number }[] = []
  const today = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    result.push({ date: key, visits: data.dailyVisits[key] || 0 })
  }
  return result
}
