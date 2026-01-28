"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AdminModal from "@/components/admin/AdminModal";

export default function AchievementManager() {
  const [view, setView] = useState("list");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    category: "award",
    title: "",
    year: "",
    description: "",
    image: null,
  });

  const [modal, setModal] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
    onConfirm: null,
  });

  const closeModal = () => setModal((prev) => ({ ...prev, isOpen: false }));

  const showModal = (type, title, message, onConfirm = null) => {
    setModal({ isOpen: true, type, title, message, onConfirm });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/achievements", { cache: "no-store" });
      if (!res.ok) throw new Error("Gagal fetch");
      const data = await res.json();
      setList(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const confirmDelete = (id) => {
    showModal(
      "confirm",
      "Hapus Prestasi/Riset?",
      "Data yang dihapus tidak dapat dikembalikan.",
      () => handleDeleteProcess(id),
    );
  };

  const handleDeleteProcess = async (id) => {
    try {
      const res = await fetch(`/api/achievements/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchData();
        setTimeout(() => {
          showModal(
            "success",
            "Berhasil Dihapus",
            "Data telah dihapus dari sistem.",
          );
        }, 300);
      } else {
        showModal(
          "error",
          "Gagal Menghapus",
          "Terjadi kesalahan saat menghapus data.",
        );
      }
    } catch (error) {
      showModal("error", "Error Koneksi", "Gagal menghubungi server.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("category", formData.category);
    data.append("title", formData.title);
    data.append("year", formData.year);
    data.append("description", formData.description);

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      let res;
      if (isEditing) {
        res = await fetch(`/api/achievements/${editId}`, {
          method: "PUT",
          body: data,
        });
      } else {
        res = await fetch("/api/achievements", {
          method: "POST",
          body: data,
        });
      }

      if (res.ok) {
        fetchData();
        resetForm();
        showModal(
          "success",
          "Berhasil Disimpan",
          isEditing
            ? "Data berhasil diperbarui!"
            : "Data baru berhasil ditambahkan!",
        );
      } else {
        showModal("error", "Gagal Menyimpan", "Terjadi kesalahan pada server.");
      }
    } catch (error) {
      showModal("error", "Error Koneksi", "Periksa koneksi internet Anda.");
    }
  };

  const resetForm = () => {
    setFormData({
      category: "award",
      title: "",
      year: "",
      description: "",
      image: null,
    });
    setPreview(null);
    setIsEditing(false);
    setEditId(null);
    setView("list");

    const fileInput = document.getElementById("awardFile");
    if (fileInput) fileInput.value = "";
  };

  const handleOpenEdit = (item) => {
    setFormData({
      category: item.category,
      title: item.title,
      year: item.year,
      description: item.description,
      image: null,
    });
    setPreview(item.image || null);
    setEditId(item.id);
    setIsEditing(true);
    setView("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const inputClass =
    "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white";

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 min-h-screen">
      <AdminModal
        isOpen={modal.isOpen}
        onClose={closeModal}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onConfirm={modal.onConfirm}
      />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Manajemen Prestasi & Riset
        </h2>
        {view === "list" && (
          <button
            onClick={() => {
              resetForm();
              setView("form");
            }}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-700 shadow transition"
          >
            + Tambah Data
          </button>
        )}
      </div>

      {view === "list" ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white uppercase font-bold">
              <tr>
                <th className="p-3">Kategori</th>
                <th className="p-3">Label/Tahun</th>
                <th className="p-3">Judul</th>
                <th className="p-3">Gambar</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : list.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center">
                    Belum ada data.
                  </td>
                </tr>
              ) : (
                list.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  >
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold uppercase ${item.category === "award" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200" : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"}`}
                      >
                        {item.category === "award" ? "Penghargaan" : "Riset"}
                      </span>
                    </td>
                    <td className="p-3">{item.year}</td>
                    <td className="p-3 font-bold">{item.title}</td>
                    <td className="p-3">
                      <div className="relative w-12 h-12">
                        {item.image && (
                          <Image
                            src={item.image}
                            alt="thumb"
                            fill
                            className="object-cover rounded shadow-sm"
                          />
                        )}
                      </div>
                    </td>
                    <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="text-yellow-600 hover:text-yellow-800 font-bold"
                      >
                        <i className="fas fa-edit"></i> Edit
                      </button>
                      <button
                        onClick={() => confirmDelete(item.id)}
                        className="text-red-600 hover:text-red-800 font-bold"
                      >
                        <i className="fas fa-trash"></i> Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-w-xl mx-auto bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg border border-gray-200 dark:border-gray-600"
        >
          <div>
            <label className="block text-sm font-bold mb-1 dark:text-gray-300">
              Jenis Data
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className={inputClass}
            >
              <option value="award">Penghargaan (Masuk Grid Awards)</option>
              <option value="research">
                Riset & Kolaborasi (Masuk Timeline)
              </option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1 dark:text-gray-300">
                {formData.category === "award"
                  ? "Tahun Perolehan"
                  : "Label (Misal: Akademik)"}
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                className={inputClass}
                placeholder="Contoh: 2025"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 dark:text-gray-300">
                Upload Foto
              </label>
              <input
                type="file"
                id="awardFile"
                onChange={handleFileChange}
                className="block w-full text-sm dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-green-700"
              />
            </div>
          </div>

          {preview && (
            <div className="mt-2 relative w-full h-40">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="rounded shadow object-contain bg-white p-1"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-bold mb-1 dark:text-gray-300">
              Judul
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 dark:text-gray-300">
              Deskripsi Singkat
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className={inputClass}
              rows="3"
            ></textarea>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition shadow-lg"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-600 transition shadow-lg"
            >
              Batal
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
