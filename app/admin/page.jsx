"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();  // ✅ now inside

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") !== "true") {
      router.replace("/admin/login");
    }
  }, []);

  // ── Subject state ──
  const [subForm, setSubForm] = useState({ name: "", code: "", department: "", semester: "" });
  const [subMsg, setSubMsg] = useState("");
  // ... rest unchanged

  // ── Material state ──
  const [form, setForm] = useState({ title: "", subject: "", semester: "", department: "", type: "notes", year: "" });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ── Notice state ──
  const [noticeForm, setNoticeForm] = useState({ title: "", type: "General", link: "", pinned: false });
  const [notices, setNotices] = useState([]);
  const [noticeMsg, setNoticeMsg] = useState("");

  // ── Fetch notices on load ──
  useEffect(() => {
    fetch("/api/notices")
      .then(res => res.json())
      .then(data => setNotices(data));
  }, []);

  const handleAddSubject = async () => {
    const res = await fetch("/api/subjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...subForm, semester: Number(subForm.semester), department: subForm.department.toUpperCase() })
    });
    const data = await res.json();
    if (data._id) { setSubMsg("✅ Subject added!"); setSubForm({ name: "", code: "", department: "", semester: "" }); }
    else setSubMsg("❌ Error adding subject");
  };

  const handleSubmit = async () => {
    if (!file) return setMessage("Please select a file!");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setLoading(false);
    if (data.success) { setMessage("✅ Uploaded successfully!"); setForm({ title: "", subject: "", semester: "", department: "", type: "notes", year: "" }); setFile(null); }
    else setMessage("❌ Error: " + data.error);
  };

  const handleAddNotice = async () => {
    if (!noticeForm.title.trim()) return setNoticeMsg("❌ Title is required!");
    const res = await fetch("/api/notices", {
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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold text-yellow-400 mb-10">Admin Panel</h1>

      {/* ── ADD SUBJECT ── */}
      <div className="max-w-xl mb-12">
        <h2 className="text-xl font-bold text-yellow-300 mb-4">Add Subject</h2>
        <div className="space-y-3">
          <input className="w-full p-3 rounded bg-gray-800 border border-gray-600" placeholder="Subject Name (e.g. Computer Networks)" value={subForm.name} onChange={e => setSubForm({...subForm, name: e.target.value})} />
          <input className="w-full p-3 rounded bg-gray-800 border border-gray-600" placeholder="Subject Code (e.g. PCC-CS501)" value={subForm.code} onChange={e => setSubForm({...subForm, code: e.target.value})} />
          <input className="w-full p-3 rounded bg-gray-800 border border-gray-600" placeholder="Department (e.g. CSE-IT, EE, ME, CE)" value={subForm.department} onChange={e => setSubForm({...subForm, department: e.target.value})} />
          <input className="w-full p-3 rounded bg-gray-800 border border-gray-600" placeholder="Semester (1-8)" value={subForm.semester} onChange={e => setSubForm({...subForm, semester: e.target.value})} />
          <button onClick={handleAddSubject} className="w-full p-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-400">Add Subject</button>
          {subMsg && <p className="text-center">{subMsg}</p>}
        </div>
      </div>

      {/* ── UPLOAD MATERIAL ── */}
      <div className="max-w-xl mb-12">
        <h2 className="text-xl font-bold text-yellow-300 mb-4">Upload Material</h2>
        <div className="space-y-4">
          <input className="w-full p-3 rounded bg-gray-800 border border-gray-600" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
          <input className="w-full p-3 rounded bg-gray-800 border border-gray-600" placeholder="Subject" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
          <input className="w-full p-3 rounded bg-gray-800 border border-gray-600" placeholder="Semester (1-8)" value={form.semester} onChange={e => setForm({...form, semester: e.target.value})} />
          <input className="w-full p-3 rounded bg-gray-800 border border-gray-600" placeholder="Department (e.g. CSE-IT, EE, ME, CE)" value={form.department} onChange={e => setForm({...form, department: e.target.value})} />
          <input className="w-full p-3 rounded bg-gray-800 border border-gray-600" placeholder="Year (e.g. 2023)" value={form.year} onChange={e => setForm({...form, year: e.target.value})} />
          <select className="w-full p-3 rounded bg-gray-800 border border-gray-600" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
            <option value="notes">Notes</option>
            <option value="pyq">Previous Year Question</option>
            <option value="organizer">Organizer</option>
            <option value="syllabus">Syllabus</option>
            <option value="other">Other</option>
          </select>
          <input type="file" accept=".pdf" className="w-full p-3 rounded bg-gray-800 border border-gray-600" onChange={e => setFile(e.target.files[0])} />
          <button onClick={handleSubmit} disabled={loading} className="w-full p-3 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300">
            {loading ? "Uploading..." : "Upload Material"}
          </button>
          {message && <p className="text-center text-lg">{message}</p>}
        </div>
      </div>

      {/* ── NOTICE BOARD MANAGEMENT ── */}
      <div className="max-w-xl mb-12">
        <h2 className="text-xl font-bold text-yellow-300 mb-4">📢 Notice Board</h2>
        <div className="space-y-3">
          <input className="w-full p-3 rounded bg-gray-800 border border-gray-600" placeholder="Notice Title" value={noticeForm.title} onChange={e => setNoticeForm({...noticeForm, title: e.target.value})} />
          <select className="w-full p-3 rounded bg-gray-800 border border-gray-600" value={noticeForm.type} onChange={e => setNoticeForm({...noticeForm, type: e.target.value})}>
            <option value="General">General</option>
            <option value="Exam">Exam</option>
            <option value="Holiday">Holiday</option>
            <option value="Event">Event</option>
            <option value="Urgent">Urgent</option>
          </select>
          <input className="w-full p-3 rounded bg-gray-800 border border-gray-600" placeholder="Link (optional)" value={noticeForm.link} onChange={e => setNoticeForm({...noticeForm, link: e.target.value})} />
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={noticeForm.pinned} onChange={e => setNoticeForm({...noticeForm, pinned: e.target.checked})} className="w-4 h-4 accent-yellow-400" />
            <span className="text-sm text-gray-300">Pin this notice (shows at top)</span>
          </label>
          <button onClick={handleAddNotice} className="w-full p-3 bg-green-500 text-white font-bold rounded hover:bg-green-400">Post Notice</button>
          {noticeMsg && <p className="text-center">{noticeMsg}</p>}
        </div>

        {/* Live notice list with delete */}
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
              <button onClick={() => handleDeleteNotice(n._id)} className="text-red-400 hover:text-red-300 font-bold text-sm ml-4">Delete</button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}