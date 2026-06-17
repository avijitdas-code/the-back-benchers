"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const DEPARTMENTS = ["CSE-IT", "EE", "CE", "ECE", "ME"];
const SEMESTERS   = [1, 2, 3, 4, 5, 6, 7, 8];
const TYPES       = ["notes", "pyq", "organizer", "syllabus", "other"];

export default function AdminPage() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/admin/login");
  }, [status, router]);

  // ── Subject state ──
  const [subForm, setSubForm] = useState({ name: "", department: "", semester: "" });
  const [subMsg,  setSubMsg]  = useState("");

  // ── Material state ──
  const [form,    setForm]    = useState({ subject: "", semester: "", department: "", type: "notes" });
  const [file,    setFile]    = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ── Notice state ──
  const [noticeForm, setNoticeForm] = useState({ title: "", type: "General", link: "", pinned: false });
  const [notices,    setNotices]    = useState([]);
  const [noticeMsg,  setNoticeMsg]  = useState("");

  useEffect(() => {
    fetch("/api/notices")
      .then(r => r.json())
      .then(d => setNotices(d));
  }, []);

  // ── Handlers ──
  const handleAddSubject = async () => {
    if (!subForm.name || !subForm.department || !subForm.semester)
      return setSubMsg("❌ All fields required!");
    const res = await fetch("/api/subjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name:       subForm.name.trim(),
        code:       "",
        department: subForm.department,
        semester:   Number(subForm.semester)
      })
    });
    const data = await res.json();
    if (data._id) {
      setSubMsg("✅ Subject added!");
      setSubForm({ name: "", department: "", semester: "" });
    } else {
      setSubMsg("❌ Error: " + JSON.stringify(data));
    }
  };

  const handleSubmit = async () => {
    if (!file)                           return setMessage("❌ Please select a PDF!");
    if (!form.subject.trim())            return setMessage("❌ Subject name is required!");
    if (!form.department || !form.semester) return setMessage("❌ Department & semester required!");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    // normalise subject & department for consistent matching
    formData.append("title",      form.subject.trim());
    formData.append("subject",    form.subject.trim().toLowerCase());
    formData.append("semester",   form.semester);
    formData.append("department", form.department);
    formData.append("type",       form.type);
    formData.append("year",       "");

    const res  = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      setMessage("✅ Uploaded successfully!");
      setForm({ subject: "", semester: "", department: "", type: "notes" });
      setFile(null);
    } else {
      setMessage("❌ Error: " + data.error);
    }
  };

  const handleAddNotice = async () => {
    if (!noticeForm.title.trim()) return setNoticeMsg("❌ Title is required!");
    const res  = await fetch("/api/notices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(noticeForm)
    });
    const data = await res.json();
    if (data._id) {
      setNoticeMsg("✅ Notice posted!");
      setNotices(prev => [data, ...prev]);
      setNoticeForm({ title: "", type: "General", link: "", pinned: false });
    } else {
      setNoticeMsg("❌ Error posting notice");
    }
  };

  const handleDeleteNotice = async (id) => {
    await fetch("/api/notices", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    setNotices(prev => prev.filter(n => n._id !== id));
  };

  if (status === "loading") return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <p className="text-gray-400">Checking session…</p>
    </div>
  );
  if (status === "unauthenticated") return null;

  const inputCls  = "w-full p-3 rounded bg-gray-800 border border-gray-600 text-white";
  const selectCls = "w-full p-3 rounded bg-gray-800 border border-gray-600 text-white";

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10">
      <div className="flex items-center justify-between mb-10 max-w-xl">
        <h1 className="text-3xl font-bold text-yellow-400">Admin Panel</h1>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="px-5 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-500 transition text-sm">
          Logout
        </button>
      </div>

      {/* ── ADD SUBJECT ── */}
      <div className="max-w-xl mb-12">
        <h2 className="text-xl font-bold text-yellow-300 mb-4">➕ Add Subject</h2>
        <div className="space-y-3">
          <input
            className={inputCls}
            placeholder="Subject Name (e.g. Data Structures)"
            value={subForm.name}
            onChange={e => setSubForm({ ...subForm, name: e.target.value })}
          />
          <select
            className={selectCls}
            value={subForm.department}
            onChange={e => setSubForm({ ...subForm, department: e.target.value })}>
            <option value="">Select Department</option>
            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select
            className={selectCls}
            value={subForm.semester}
            onChange={e => setSubForm({ ...subForm, semester: e.target.value })}>
            <option value="">Select Semester</option>
            {SEMESTERS.map(s => <option key={s} value={s}>Semester {s}</option>)}
          </select>
          <button onClick={handleAddSubject} className="w-full p-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-400">
            Add Subject
          </button>
          {subMsg && <p className="text-center">{subMsg}</p>}
        </div>
      </div>

      {/* ── UPLOAD MATERIAL ── */}
      <div className="max-w-xl mb-12">
        <h2 className="text-xl font-bold text-yellow-300 mb-4">📤 Upload Material</h2>
        <div className="space-y-4">
          <select
            className={selectCls}
            value={form.department}
            onChange={e => setForm({ ...form, department: e.target.value })}>
            <option value="">Select Department</option>
            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select
            className={selectCls}
            value={form.semester}
            onChange={e => setForm({ ...form, semester: e.target.value })}>
            <option value="">Select Semester</option>
            {SEMESTERS.map(s => <option key={s} value={s}>Semester {s}</option>)}
          </select>
          <input
            className={inputCls}
            placeholder="Subject Name (e.g. data structures)"
            value={form.subject}
            onChange={e => setForm({ ...form, subject: e.target.value })}
          />
          <select
            className={selectCls}
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}>
            {TYPES.map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
          </select>
          <input
            type="file"
            accept=".pdf"
            className={inputCls}
            onChange={e => setFile(e.target.files[0])}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full p-3 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300 disabled:opacity-50">
            {loading ? "Uploading..." : "Upload Material"}
          </button>
          {message && <p className="text-center text-lg">{message}</p>}
        </div>
      </div>

      {/* ── NOTICE BOARD ── */}
      <div className="max-w-xl mb-12">
        <h2 className="text-xl font-bold text-yellow-300 mb-4">📢 Notice Board</h2>
        <div className="space-y-3">
          <input
            className={inputCls}
            placeholder="Notice Title"
            value={noticeForm.title}
            onChange={e => setNoticeForm({ ...noticeForm, title: e.target.value })}
          />
          <select
            className={selectCls}
            value={noticeForm.type}
            onChange={e => setNoticeForm({ ...noticeForm, type: e.target.value })}>
            {["General","Exam","Holiday","Event","Urgent"].map(t =>
              <option key={t} value={t}>{t}</option>
            )}
          </select>
          <input
            className={inputCls}
            placeholder="Link (optional)"
            value={noticeForm.link}
            onChange={e => setNoticeForm({ ...noticeForm, link: e.target.value })}
          />
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={noticeForm.pinned}
              onChange={e => setNoticeForm({ ...noticeForm, pinned: e.target.checked })}
              className="w-4 h-4 accent-yellow-400"
            />
            <span className="text-sm text-gray-300">Pin this notice</span>
          </label>
          <button onClick={handleAddNotice} className="w-full p-3 bg-green-500 text-white font-bold rounded hover:bg-green-400">
            Post Notice
          </button>
          {noticeMsg && <p className="text-center">{noticeMsg}</p>}
        </div>

        <div className="mt-6 space-y-3">
          {notices.length === 0 && <p className="text-gray-500 text-sm">No notices yet.</p>}
          {notices.map(n => (
            <div key={n._id} className="flex items-center justify-between bg-gray-800 border border-gray-700 p-4 rounded-xl">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-xs font-bold uppercase">{n.type}</span>
                  {n.pinned && <span className="text-[10px] bg-yellow-500 text-black px-2 py-0.5 rounded-full font-bold">PINNED</span>}
                </div>
                <p className="text-white font-semibold mt-1">{n.title}</p>
                <p className="text-gray-500 text-xs">{n.date}</p>
              </div>
              <button onClick={() => handleDeleteNotice(n._id)} className="text-red-400 hover:text-red-300 font-bold text-sm ml-4">
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}