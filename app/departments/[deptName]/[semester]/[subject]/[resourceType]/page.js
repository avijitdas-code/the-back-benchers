"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function MaterialsPage() {
  const params = useParams();

  const deptName = params.deptName;
  const semester = params.semester;
  const subject = params.subject;
  const resourceType = params.resourceType;

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        setLoading(true);

        // ✅ Normalize subject to lowercase
        const normalizedSubject = subject?.toLowerCase();

        const res = await fetch(
          `/api/materials?department=${deptName}&semester=${semester}&subject=${normalizedSubject}&resourceType=${resourceType}`
        );

        const data = await res.json();

        if (data.success) {
          setMaterials(data.materials);
        }
      } catch (error) {
        console.error("Error fetching materials:", error);
      } finally {
        setLoading(false);
      }
    };

    if (deptName && semester && subject && resourceType) {
      fetchMaterials();
    }
  }, [deptName, semester, subject, resourceType]);

  if (loading) {
    return <p className="p-4">Loading materials...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        {subject} - {resourceType}
      </h1>

      {materials.length === 0 ? (
        <p>No materials found.</p>
      ) : (
        <ul className="space-y-4">
          {materials.map((item) => (
            <li key={item._id} className="border p-4 rounded">
              <h2 className="font-semibold">{item.title}</h2>

              <a
                href={item.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View PDF
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}