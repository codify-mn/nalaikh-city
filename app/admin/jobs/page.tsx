"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2, X, Save } from "lucide-react"

interface Job {
  id: string
  title: string
  department: string
  openings: number
  icon: string
  purpose: string
  status: string
  sortOrder: number
  duties: { duty: string; id?: string }[]
  requirements: { requirement: string; id?: string }[]
}

const ICON_OPTIONS = [
  { value: "ruler", label: "Ruler (Архитектор)" },
  { value: "hardhat", label: "Hard Hat (Барилга)" },
  { value: "droplets", label: "Droplets (Сантехник)" },
  { value: "thermometer", label: "Thermometer (Дулаан)" },
  { value: "calculator", label: "Calculator (Төсөв)" },
  { value: "briefcase", label: "Briefcase (Ерөнхий)" },
  { value: "code", label: "Code (IT)" },
  { value: "users", label: "Users (HR)" },
]

const emptyJob: Omit<Job, "id"> = {
  title: "",
  department: "",
  openings: 1,
  icon: "briefcase",
  purpose: "",
  status: "open",
  sortOrder: 0,
  duties: [{ duty: "" }],
  requirements: [{ requirement: "" }],
}

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<string | null>(null) // job id or "new"
  const [form, setForm] = useState<Omit<Job, "id">>(emptyJob)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/payload/jobs?limit=50&sort=sortOrder", {
        credentials: "include",
      })
      if (res.ok) {
        const data = await res.json()
        setJobs(data.docs || [])
      }
    } catch (err) {
      console.error("Failed to fetch jobs:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  const startCreate = () => {
    setEditing("new")
    setForm({ ...emptyJob, sortOrder: jobs.length + 1 })
  }

  const startEdit = (job: Job) => {
    setEditing(job.id)
    setForm({
      title: job.title,
      department: job.department,
      openings: job.openings,
      icon: job.icon,
      purpose: job.purpose,
      status: job.status,
      sortOrder: job.sortOrder,
      duties: job.duties?.length ? job.duties : [{ duty: "" }],
      requirements: job.requirements?.length
        ? job.requirements
        : [{ requirement: "" }],
    })
  }

  const cancelEdit = () => {
    setEditing(null)
    setForm(emptyJob)
  }

  const saveJob = async () => {
    setSaving(true)
    try {
      const payload = {
        ...form,
        duties: form.duties.filter((d) => d.duty.trim()),
        requirements: form.requirements.filter((r) => r.requirement.trim()),
      }

      const url =
        editing === "new"
          ? "/api/payload/jobs"
          : `/api/payload/jobs/${editing}`
      const method = editing === "new" ? "POST" : "PATCH"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => null)
        throw new Error(errData?.message || `Алдаа: ${res.status}`)
      }

      setError(null)
      cancelEdit()
      await fetchJobs()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Хадгалахад алдаа гарлаа")
      console.error("Failed to save job:", err)
    } finally {
      setSaving(false)
    }
  }

  const deleteJob = async (id: string) => {
    if (!confirm("Устгахдаа итгэлтэй байна уу?")) return
    try {
      const res = await fetch(`/api/payload/jobs/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
      if (!res.ok) throw new Error(`Алдаа: ${res.status}`)
      setError(null)
      await fetchJobs()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Устгахад алдаа гарлаа")
      console.error("Failed to delete job:", err)
    }
  }

  const updateDuty = (index: number, value: string) => {
    const updated = [...form.duties]
    updated[index] = { ...updated[index], duty: value }
    setForm({ ...form, duties: updated })
  }

  const addDuty = () => {
    setForm({ ...form, duties: [...form.duties, { duty: "" }] })
  }

  const removeDuty = (index: number) => {
    setForm({ ...form, duties: form.duties.filter((_, i) => i !== index) })
  }

  const updateRequirement = (index: number, value: string) => {
    const updated = [...form.requirements]
    updated[index] = { ...updated[index], requirement: value }
    setForm({ ...form, requirements: updated })
  }

  const addRequirement = () => {
    setForm({
      ...form,
      requirements: [...form.requirements, { requirement: "" }],
    })
  }

  const removeRequirement = (index: number) => {
    setForm({
      ...form,
      requirements: form.requirements.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ажлын байр</h1>
          <p className="text-gray-500 text-sm">
            Нээлттэй ажлын байрны зар удирдах
          </p>
        </div>
        {!editing && (
          <Button onClick={startCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            Шинэ ажлын байр
          </Button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Edit / Create Form */}
      {editing && (
        <Card className="mb-8 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg">
              {editing === "new" ? "Шинэ ажлын байр нэмэх" : "Ажлын байр засах"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Албан тушаал</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Архитектор"
                />
              </div>
              <div>
                <Label>Хэлтэс</Label>
                <Input
                  value={form.department}
                  onChange={(e) =>
                    setForm({ ...form, department: e.target.value })
                  }
                  placeholder="Зураг, төслийн газар"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label>Орон тоо</Label>
                <Input
                  type="number"
                  min={1}
                  value={form.openings}
                  onChange={(e) =>
                    setForm({ ...form, openings: parseInt(e.target.value) || 1 })
                  }
                />
              </div>
              <div>
                <Label>Дүрс</Label>
                <Select
                  value={form.icon}
                  onValueChange={(v) => setForm({ ...form, icon: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ICON_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Төлөв</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) => setForm({ ...form, status: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Нээлттэй</SelectItem>
                    <SelectItem value="closed">Хаагдсан</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Эрэмбэ</Label>
                <Input
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      sortOrder: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <Label>Зорилго</Label>
              <Textarea
                value={form.purpose}
                onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                rows={2}
              />
            </div>

            {/* Duties */}
            <div>
              <Label>Үндсэн үүрэг</Label>
              <div className="space-y-2 mt-1">
                {form.duties.map((d, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      value={d.duty}
                      onChange={(e) => updateDuty(i, e.target.value)}
                      placeholder="Үүрэг..."
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeDuty(i)}
                      className="shrink-0 text-gray-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addDuty}>
                  <Plus className="h-3 w-3 mr-1" /> Үүрэг нэмэх
                </Button>
              </div>
            </div>

            {/* Requirements */}
            <div>
              <Label>Шаардлага</Label>
              <div className="space-y-2 mt-1">
                {form.requirements.map((r, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      value={r.requirement}
                      onChange={(e) => updateRequirement(i, e.target.value)}
                      placeholder="Шаардлага..."
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeRequirement(i)}
                      className="shrink-0 text-gray-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addRequirement}>
                  <Plus className="h-3 w-3 mr-1" /> Шаардлага нэмэх
                </Button>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button onClick={saveJob} disabled={saving || !form.title} className="gap-2">
                <Save className="h-4 w-4" />
                {saving ? "Хадгалж байна..." : "Хадгалах"}
              </Button>
              <Button variant="outline" onClick={cancelEdit}>
                Цуцлах
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Job List */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Ачаалж байна...</div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Ажлын байр олдсонгүй
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className={`${job.status === "closed" ? "opacity-60" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{job.title}</span>
                        <Badge
                          variant={
                            job.status === "open" ? "default" : "secondary"
                          }
                          className="text-xs"
                        >
                          {job.status === "open" ? "Нээлттэй" : "Хаагдсан"}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {job.openings} орон тоо
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">{job.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEdit(job)}
                      className="gap-1"
                    >
                      <Pencil className="h-3 w-3" />
                      Засах
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteJob(job.id)}
                      className="gap-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                      Устгах
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400 mt-8">
        Олон хэл дээр засварлахын тулд Payload CMS админ руу орно уу.
      </p>
    </div>
  )
}
