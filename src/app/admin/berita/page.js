"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AdminModal from "@/components/admin/AdminModal";

export default function BeritaManager() {
  const [view, setView] = useState("list");
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "Kegiatan",
    author: "",
    date: "",
    excerpt: "",
    content: "",
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

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/news", { cache: "no-store" });
      if (!res.ok) throw new Error("Gagal fetch data");
      const data = await res.json();
      setNewsList(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const confirmDelete = (id) => {
    showModal(
      "confirm",
      "Hapus Berita Ini?",
      "Tindakan ini tidak bisa dibatalkan. Berita akan dihapus permanen.",
      () => handleDeleteProcess(id),
    );
  };

  const handleDeleteProcess = async (id) => {
    try {
      const res = await fetch(`/api/news/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchNews();
        setTimeout(() => {
          showModal(
            "success",
            "Berhasil Dihapus",
            "Berita berhasil dihapus dari sistem.",
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

  const resetForm = () => {
    setFormData({
      title: "",
      category: "Kegiatan",
      author: "",
      date: "",
      excerpt: "",
      content: "",
      image: null,
    });
    setPreview(null);
    setIsEditing(false);
    setEditId(null);
    setView("list");

    const fileInput = document.getElementById("newsFileInput");
    if (fileInput) fileInput.value = "";
  };

  const handleOpenEdit = (item) => {
    const dateObj = new Date(item.date);
    const formattedDate = !isNaN(dateObj)
      ? dateObj.toISOString().split("T")[0]
      : "";

    setFormData({
      title: item.title,
      category: item.category,
      author: item.author,
      date: formattedDate,
      excerpt: item.excerpt,
      content: item.content,
      image: null,
    });

    setPreview(item.image || null);
    setEditId(item.id);
    setIsEditing(true);
    setView("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("author", formData.author);
    data.append("date", formData.date);
    data.append("excerpt", formData.excerpt);
    data.append("content", formData.content);

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      let res;
      if (isEditing) {
        res = await fetch(`/api/news/${editId}`, {
          method: "PUT",
          body: data,
        });
      } else {
        res = await fetch("/api/news", {
          method: "POST",
          body: data,
        });
      }

      if (res.ok) {
        fetchNews();
        resetForm();
        showModal(
          "success",
          "Berhasil Disimpan",
          isEditing
            ? "Berita berhasil diperbarui!"
            : "Berita baru berhasil diterbitkan!",
        );
      } else {
        const err = await res.json();
        showModal(
          "error",
          "Gagal Menyimpan",
          err.error || "Terjadi kesalahan pada server.",
        );
      }
    } catch (error) {
      console.error(error);
      showModal("error", "Error Koneksi", "Periksa koneksi internet Anda.");
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
          {view === "list"
            ? "Manajemen Berita"
            : isEditing
              ? "Edit Berita"
              : "Tambah Berita"}
        </h2>
        {view === "list" && (
          <button
            onClick={() => {
              resetForm();
              setView("form");
            }}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow"
          >
            + Tambah Baru
          </button>
        )}
      </div>

      {view === "list" && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Gambar</th>
                <th className="px-6 py-4">Judul</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Link (Slug)</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : newsList.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    Belum ada berita.
                  </td>
                </tr>
              ) : (
                newsList.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="relative w-16 h-10">
                        {item.image && (
                          <Image
                            src={item.image}
                            alt="thumb"
                            fill
                            className="object-cover rounded"
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white line-clamp-1">
                      {item.title}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <div className="flex items-center space-x-2">
                        <span
                          className="text-xs text-gray-500 truncate w-24 block"
                          title={item.slug}
                        >
                          {item.slug || "-"}
                        </span>
                        {item.slug && (
                          <a
                            href={`/berita/${item.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-green-700"
                            title="Lihat Halaman"
                          >
                            <i className="fas fa-external-link-alt"></i>
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center space-x-2">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 font-bold"
                      >
                        <i className="fas fa-edit"></i> Edit
                      </button>
                      <button
                        onClick={() => confirmDelete(item.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 font-bold"
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
      )}

      {view === "form" && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-w-3xl mx-auto bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg border border-gray-200 dark:border-gray-600"
        >
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
              Judul
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                Kategori
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Kegiatan">Kegiatan</option>
                <option value="Teknologi">Teknologi</option>
                <option value="Edukasi">Edukasi</option>
                <option value="Tips">Tips</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                Penulis
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
              Tanggal
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
              {isEditing ? "Ganti Gambar (Opsional)" : "Upload Gambar"}
            </label>
            <input
              type="file"
              id="newsFileInput"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-green-700"
            />
            {preview && (
              <div className="mt-4 relative w-full h-40">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="rounded shadow object-contain bg-white p-1"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
              Ringkasan (Excerpt)
            </label>
            <textarea
              name="excerpt"
              rows="2"
              value={formData.excerpt}
              onChange={handleChange}
              className={inputClass}
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
              Konten (HTML Support)
            </label>
            <textarea
              name="content"
              rows="10"
              value={formData.content}
              onChange={handleChange}
              className={inputClass}
              required
              placeholder="Tulis konten berita di sini..."
            ></textarea>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition shadow-lg"
            >
              {isEditing ? "Update Berita" : "Simpan Berita"}
            </button>
            <button
              type="button"
              onClick={resetForm}
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
