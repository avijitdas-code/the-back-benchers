"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const DEPARTMENTS = ["CSE-IT", "EE", "CE", "ECE", "ME"];
const SEMESTERS   = [1, 2, 3, 4, 5, 6, 7, 8];
const TYPES       = ["notes", "pyq", "organizer", "syllabus", "other"];
const NOTICE_TYPES = ["General", "Exam", "Holiday", "Event", "Urgent"];

const TYPE_BADGE = {
  pyq:       "bg-orange-500/10 text-orange-400",
  notes:     "bg-blue-500/10 text-blue-400",
  syllabus:  "bg-purple-500/10 text-purple-400",
  organizer: "bg-teal-500/10 text-teal-400",
  other:     "bg-gray-500/10 text-gray-400",
};

const NOTICE_BADGE = {
  General: "bg-gray-700 text-gray-300",
  Exam:    "bg-orange-500/10 text-orange-400",
  Holiday: "bg-green-500/10 text-green-400",
  Event:   "bg-blue-500/10 text-blue-400",
  Urgent:  "bg-red-500/10 text-red-400",
};

const inputCls  = "w-full p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400";
const selectCls = "w-full p-3 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-400";

const NAV_SECTIONS = [
  { items: [{ id: "dashboard", label: "Dashboard", icon: "🏠" }] },
  { title: "Subjects",  items: [{ id: "add-subject",     label: "Add subject",  icon: "➕" }, { id: "view-subjects",   label: "View & delete", icon: "📋" }] },
  { title: "Materials", items: [{ id: "upload-material", label: "Upload material", icon: "📤" }, { id: "view-materials", label: "View & delete", icon: "📁" }] },
  { title: "Notices",   items: [{ id: "add-notice",      label: "Add notice",  icon: "📢" }, { id: "view-notices",    label: "View & delete", icon: "🔔" }] },
];

export default function AdminPage() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/admin/login");
  }, [status, router]);

  const [activeTab, setActiveTab] = useState("dashboard");

  // ── Data ──
  const [subjects, setSubjects]   = useState(null);
  const [materials, setMaterials] = useState(null);
  const [notices, setNotices]     = useState(null);

  // ── Subject form ──
  const [subForm, setSubForm] = useState({ name: "", department: "", semester: "" });
  const [subMsg, setSubMsg]   = useState("");

  // ── Material upload form ──
  const [form, setForm]       = useState({ subject: "", semester: "", department: "", type: "notes", year: "" });
  const [file, setFile]       = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ── Material filters (view & delete) ──
  const [matFilters, setMatFilters] = useState({ department: "", semester: "", type: "" });

  // ── Notice form ──
  const [noticeForm, setNoticeForm] = useState({ title: "", type: "General", link: "", pinned: false });
  const [noticeMsg, setNoticeMsg]   = useState("");

  // ── Fetchers ──
  const fetchSubjects = useCallback(async () => {
    const res = await fetch("/api/subjects");
    setSubjects(await res.json());
  }, []);

  const fetchMaterials = useCallback(async (filters = matFilters) => {
    const params = new URLSearchParams();
    if (filters.department) params.set("department", filters.department);
    if (filters.semester)   params.set("semester", filters.semester);
    if (filters.type)       params.set("type", filters.type);
    const res = await fetch("/api/materials?" + params.toString());
    setMaterials(await res.json());
  }, [matFilters]);

  const fetchNotices = useCallback(async () => {
    const res = await fetch("/api/notices");
    setNotices(await res.json());
  }, []);

  useEffect(() => {
    fetchSubjects();
    fetchMaterials({ department: "", semester: "", type: "" });
    fetchNotices();
  }, [fetchSubjects, fetchMaterials, fetchNotices]);

  // ── Subject handlers ──
  const handleAddSubject = async () => {
    if (!subForm.name || !subForm.department || !subForm.semester)
      return setSubMsg("❌ All fields required!");
    const res = await fetch("/api/subjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: subForm.name.trim(),
        code: "",
        department: subForm.department,
        semester: Number(subForm.semester),
      }),
    });
    const data = await res.json();
    if (data._id) {
      setSubMsg("✅ Subject added!");
      setSubForm({ name: "", department: "", semester: "" });
      fetchSubjects();
    } else {
      setSubMsg("❌ Error: " + JSON.stringify(data));
    }
  };

  const handleDeleteSubject = async (id) => {
    await fetch("/api/subjects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchSubjects();
  };

  // ── Material handlers ──
  const handleSubmit = async () => {
    if (!file)                              return setMessage("❌ Please select a PDF!");
    if (!form.subject.trim())               return setMessage("❌ Subject name is required!");
    if (!form.department || !form.semester) return setMessage("❌ Department & semester required!");

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", form.subject.trim());
    formData.append("subject", form.subject.trim().toLowerCase());
    formData.append("semester", form.semester);
    formData.append("department", form.department);
    formData.append("type", form.type);
    formData.append("year", form.year);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (data.success) {
        setMessage("✅ Uploaded successfully!");
        setForm({ subject: "", semester: "", department: "", type: "notes", year: "" });
        setFile(null);
        fetchMaterials();
      } else {
        setMessage("❌ Error: " + data.error);
      }
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMaterial = async (id) => {
    await fetch("/api/materials", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchMaterials();
  };

  const applyMaterialFilters = (next) => {
    setMatFilters(next);
    fetchMaterials(next);
  };

  // ── Notice handlers ──
  const handleAddNotice = async () => {
    if (!noticeForm.title.trim()) return setNoticeMsg("❌ Title is required!");
    const res = await fetch("/api/notices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(noticeForm),
    });
    const data = await res.json();
    if (data._id) {
      setNoticeMsg("✅ Notice posted!");
      setNoticeForm({ title: "", type: "General", link: "", pinned: false });
      fetchNotices();
    } else {
      setNoticeMsg("❌ Error: " + JSON.stringify(data));
    }
  };

  const handleDeleteNotice = async (id) => {
    await fetch("/api/notices", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchNotices();
  };

  if (status === "loading" || status === "unauthenticated") {
    return <div className="min-h-screen bg-black text-gray-400 flex items-center justify-center">Loading…</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* ───────── SIDEBAR ───────── */}
      <aside className="w-56 shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col py-3">
        <div className="px-4 pb-3 border-b border-gray-800 mb-2">
          <p className="text-sm font-semibold text-white">The Back Benchers</p>
          <p className="text-xs text-gray-500">Admin panel</p>
        </div>

        {NAV_SECTIONS.map((section, i) => (
          <div key={i} className="mb-1">
            {section.title && (
              <p className="px-4 pt-3 pb-1 text-[11px] uppercase tracking-wide text-gray-500">{section.title}</p>
            )}
            {section.items.map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={
                    "w-[calc(100%-16px)] mx-2 mb-0.5 flex items-center gap-2 px-3 py-1.5 rounded text-sm text-left " +
                    (active ? "bg-yellow-400/10 text-yellow-300 font-medium" : "text-gray-300 hover:bg-gray-800")
                  }
                >
                  <span className="text-xs">{item.icon}</span>
                  {item.label}
                </button>
              );
            })}
          </div>
        ))}

        <div className="flex-1" />
        <div className="px-2 pt-3 border-t border-gray-800 mt-2">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm text-red-400 bg-red-500/10 hover:bg-red-500/20"
          >
            ⏻ Logout
          </button>
        </div>
      </aside>

      {/* ───────── MAIN ───────── */}
      <main className="flex-1 p-8 overflow-auto">

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-xl font-bold text-white mb-1">Dashboard</h1>
            <p className="text-sm text-gray-500 mb-6">Overview of your academic content</p>
            <div className="grid grid-cols-3 gap-4 max-w-xl">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Total subjects</p>
                <p className="text-2xl font-semibold">{subjects ? subjects.length : "—"}</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Materials</p>
                <p className="text-2xl font-semibold">{materials ? materials.length : "—"}</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Notices</p>
                <p className="text-2xl font-semibold">{notices ? notices.length : "—"}</p>
              </div>
            </div>
          </div>
        )}

        {/* ADD SUBJECT */}
        {activeTab === "add-subject" && (
          <div className="max-w-xl">
            <h1 className="text-xl font-bold text-white mb-1">Add subject</h1>
            <p className="text-sm text-gray-500 mb-6">Add a new subject to the platform</p>
            <div className="space-y-3">
              <input
                className={inputCls}
                placeholder="Subject name (e.g. Data Structures)"
                value={subForm.name}
                onChange={(e) => setSubForm({ ...subForm, name: e.target.value })}
              />
              <select
                className={selectCls}
                value={subForm.department}
                onChange={(e) => setSubForm({ ...subForm, department: e.target.value })}
              >
                <option value="">Select department</option>
                {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <select
                className={selectCls}
                value={subForm.semester}
                onChange={(e) => setSubForm({ ...subForm, semester: e.target.value })}
              >
                <option value="">Select semester</option>
                {SEMESTERS.map((s) => <option key={s} value={s}>Semester {s}</option>)}
              </select>
              <button onClick={handleAddSubject} className="w-full p-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-400">
                Add subject
              </button>
              {subMsg && <p className="text-center text-sm">{subMsg}</p>}
            </div>
          </div>
        )}

        {/* VIEW & DELETE SUBJECTS */}
        {activeTab === "view-subjects" && (
          <div>
            <h1 className="text-xl font-bold text-white mb-1">Subjects</h1>
            <p className="text-sm text-gray-500 mb-6">View and delete subjects</p>
            <div className="border border-gray-800 rounded-xl overflow-hidden">
              <div className="grid grid-cols-[1fr_90px_70px_60px] gap-2 px-4 py-2 bg-gray-900 text-[11px] uppercase tracking-wide text-gray-500">
                <span>Name</span><span>Dept</span><span>Sem</span><span></span>
              </div>
              {subjects === null && <p className="px-4 py-4 text-sm text-gray-500">Loading…</p>}
              {subjects?.length === 0 && <p className="px-4 py-4 text-sm text-gray-500">No subjects yet.</p>}
              {subjects?.map((s) => (
                <div key={s._id} className="grid grid-cols-[1fr_90px_70px_60px] gap-2 px-4 py-3 border-t border-gray-800 items-center">
                  <span className="text-sm">{s.name}</span>
                  <span className="text-xs text-gray-400">{s.department}</span>
                  <span className="text-xs text-gray-400">{s.semester}</span>
                  <button
                    onClick={() => handleDeleteSubject(s._id)}
                    className="text-xs px-2 py-1 rounded text-red-400 bg-red-500/10 hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* UPLOAD MATERIAL */}
        {activeTab === "upload-material" && (
          <div className="max-w-xl">
            <h1 className="text-xl font-bold text-white mb-1">Upload material</h1>
            <p className="text-sm text-gray-500 mb-6">Add notes, PYQs, or other resources</p>
            <div className="space-y-4">
              <select
                className={selectCls}
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
              >
                <option value="">Select department</option>
                {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <select
                className={selectCls}
                value={form.semester}
                onChange={(e) => setForm({ ...form, semester: e.target.value })}
              >
                <option value="">Select semester</option>
                {SEMESTERS.map((s) => <option key={s} value={s}>Semester {s}</option>)}
              </select>
              <input
                className={inputCls}
                placeholder="Subject name (e.g. data structures)"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
              <select
                className={selectCls}
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                {TYPES.map((t) => <option key={t} value={t}>{t.toUpperCase()}</option>)}
              </select>

              {form.type === "pyq" && (
                <select
                  className={selectCls}
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                >
                  <option value="">Select academic year</option>
                  <option value="2025-2026">2025-2026</option>
                  <option value="2024-2025">2024-2025</option>
                  <option value="2023-2024">2023-2024</option>
                  <option value="2022-2023">2022-2023</option>
                  <option value="2021-2022">2021-2022</option>
                </select>
              )}

              <input
                type="file"
                accept=".pdf"
                className={inputCls}
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full p-3 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300 disabled:opacity-50"
              >
                {loading ? "Uploading…" : "Upload material"}
              </button>
              {message && <p className="text-center text-sm">{message}</p>}
            </div>
          </div>
        )}

        {/* VIEW & DELETE MATERIALS */}
        {activeTab === "view-materials" && (
          <div>
            <h1 className="text-xl font-bold text-white mb-1">Materials</h1>
            <p className="text-sm text-gray-500 mb-6">View and delete uploaded materials</p>

            <div className="flex gap-2 mb-4 flex-wrap">
              <select
                className="text-sm bg-gray-800 border border-gray-700 rounded px-2 py-1.5"
                value={matFilters.department}
                onChange={(e) => applyMaterialFilters({ ...matFilters, department: e.target.value })}
              >
                <option value="">All departments</option>
                {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <select
                className="text-sm bg-gray-800 border border-gray-700 rounded px-2 py-1.5"
                value={matFilters.semester}
                onChange={(e) => applyMaterialFilters({ ...matFilters, semester: e.target.value })}
              >
                <option value="">All semesters</option>
                {SEMESTERS.map((s) => <option key={s} value={s}>Sem {s}</option>)}
              </select>
              <select
                className="text-sm bg-gray-800 border border-gray-700 rounded px-2 py-1.5"
                value={matFilters.type}
                onChange={(e) => applyMaterialFilters({ ...matFilters, type: e.target.value })}
              >
                <option value="">All types</option>
                {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="border border-gray-800 rounded-xl overflow-hidden">
              <div className="grid grid-cols-[1fr_70px_50px_80px_60px] gap-2 px-4 py-2 bg-gray-900 text-[11px] uppercase tracking-wide text-gray-500">
                <span>Subject</span><span>Dept</span><span>Sem</span><span>Type</span><span></span>
              </div>
              {materials === null && <p className="px-4 py-4 text-sm text-gray-500">Loading…</p>}
              {materials?.length === 0 && <p className="px-4 py-4 text-sm text-gray-500">No materials yet.</p>}
              {materials?.map((m) => (
                <div key={m._id} className="grid grid-cols-[1fr_70px_50px_80px_60px] gap-2 px-4 py-3 border-t border-gray-800 items-center">
                  <span className="text-sm">{m.subject}</span>
                  <span className="text-xs text-gray-400">{m.department}</span>
                  <span className="text-xs text-gray-400">{m.semester}</span>
                  <span className={"text-[11px] px-2 py-0.5 rounded w-fit " + (TYPE_BADGE[m.type] || TYPE_BADGE.other)}>{m.type}</span>
                  <button
                    onClick={() => handleDeleteMaterial(m._id)}
                    className="text-xs px-2 py-1 rounded text-red-400 bg-red-500/10 hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADD NOTICE */}
        {activeTab === "add-notice" && (
          <div className="max-w-xl">
            <h1 className="text-xl font-bold text-white mb-1">Add notice</h1>
            <p className="text-sm text-gray-500 mb-6">Post a new notice to the homepage</p>
            <div className="space-y-3">
              <input
                className={inputCls}
                placeholder="Notice title"
                value={noticeForm.title}
                onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
              />
              <select
                className={selectCls}
                value={noticeForm.type}
                onChange={(e) => setNoticeForm({ ...noticeForm, type: e.target.value })}
              >
                {NOTICE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <input
                className={inputCls}
                placeholder="Link (optional)"
                value={noticeForm.link}
                onChange={(e) => setNoticeForm({ ...noticeForm, link: e.target.value })}
              />
              <label className="flex items-center gap-3 cursor-pointer text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={noticeForm.pinned}
                  onChange={(e) => setNoticeForm({ ...noticeForm, pinned: e.target.checked })}
                  className="w-4 h-4 accent-yellow-400"
                />
                Pin this notice
              </label>
              <button onClick={handleAddNotice} className="w-full p-3 bg-green-500 text-white font-bold rounded hover:bg-green-400">
                Post notice
              </button>
              {noticeMsg && <p className="text-center text-sm">{noticeMsg}</p>}
            </div>
          </div>
        )}

        {/* VIEW & DELETE NOTICES */}
        {activeTab === "view-notices" && (
          <div>
            <h1 className="text-xl font-bold text-white mb-1">Notices</h1>
            <p className="text-sm text-gray-500 mb-6">View and delete notices</p>
            <div className="space-y-3 max-w-2xl">
              {notices === null && <p className="text-sm text-gray-500">Loading…</p>}
              {notices?.length === 0 && <p className="text-sm text-gray-500">No notices yet.</p>}
              {notices?.map((n) => (
                <div key={n._id} className="flex items-center justify-between bg-gray-900 border border-gray-800 p-4 rounded-xl">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={"text-[11px] font-bold uppercase px-2 py-0.5 rounded " + (NOTICE_BADGE[n.type] || NOTICE_BADGE.General)}>{n.type}</span>
                      {n.pinned && <span className="text-[10px] bg-yellow-500 text-black px-2 py-0.5 rounded-full font-bold">PINNED</span>}
                    </div>
                    <p className="text-white font-semibold text-sm">{n.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{n.date}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteNotice(n._id)}
                    className="text-xs px-2 py-1 rounded text-red-400 bg-red-500/10 hover:bg-red-500/20 ml-4 shrink-0"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
