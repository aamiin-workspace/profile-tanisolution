"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AdminModal from "@/components/admin/AdminModal";

export default function KolaborasiManager() {
  const [view, setView] = useState("list");
  const [collabList, setCollabList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "magang",
    caption: "",
    detail: "",
    extra_1: "",
    extra_2: "",
    date: "",
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

  const fetchCollabs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/collab", { cache: "no-store" });
      if (!res.ok) throw new Error("Gagal fetch data");
      const data = await res.json();
      setCollabList(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollabs();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      category: "magang",
      caption: "",
      detail: "",
      extra_1: "",
      extra_2: "",
      date: "",
      image: null,
    });
    setPreview(null);
    setIsEditing(false);
    setEditId(null);
    setView("list");

    const fileInput = document.getElementById("collabFileInput");
    if (fileInput) fileInput.value = "";
  };

  const handleOpenCreate = () => {
    resetForm();
    setView("form");
  };

  const handleOpenEdit = (item) => {
    const dateObj = new Date(item.date);
    const formattedDate = !isNaN(dateObj)
      ? dateObj.toISOString().split("T")[0]
      : "";

    setFormData({
      title: item.title,
      category: item.category,
      caption: item.caption,
      detail: item.detail,
      extra_1: item.extra_1 || "",
      extra_2: item.extra_2 || "",
      date: formattedDate,
      image: null,
    });
    setPreview(item.image || null);
    setEditId(item.id);
    setIsEditing(true);
    setView("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmDelete = (id) => {
    showModal(
      "confirm",
      "Hapus Data Kolaborasi?",
      "Data yang dihapus tidak dapat dikembalikan.",
      () => handleDeleteProcess(id),
    );
  };

  const handleDeleteProcess = async (id) => {
    try {
      const res = await fetch(`/api/collab/${id}`, { method: "DELETE" });

      if (res.ok) {
        fetchCollabs();
        setTimeout(() => {
          showModal(
            "success",
            "Berhasil Dihapus",
            "Data kolaborasi berhasil dihapus.",
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    data.append("caption", formData.caption);
    data.append("detail", formData.detail);
    data.append("extra_1", formData.extra_1);
    data.append("extra_2", formData.extra_2);
    data.append("date", formData.date);

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      let res;
      if (isEditing) {
        res = await fetch(`/api/collab/${editId}`, {
          method: "PUT",
          body: data,
        });
      } else {
        res = await fetch("/api/collab", {
          method: "POST",
          body: data,
        });
      }

      if (res.ok) {
        fetchCollabs();
        resetForm();
        showModal(
          "success",
          "Berhasil Disimpan",
          isEditing
            ? "Data kolaborasi berhasil diperbarui!"
            : "Data baru berhasil ditambahkan!",
        );
      } else {
        showModal(
          "error",
          "Gagal Menyimpan",
          "Terjadi kesalahan saat menyimpan data.",
        );
      }
    } catch (error) {
      console.error(error);
      showModal("error", "Error Koneksi", "Periksa koneksi internet Anda.");
    }
  };

  const getLabelExtra1 = () => {
    if (formData.category === "riset") return "Nama Peneliti";
    if (formData.category === "kunjungan") return "Nama Instansi";
    return "Info Tambahan (Opsional)";
  };

  const inputClass =
    "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white";
  const labelClass =
    "block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300";

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
            ? "Manajemen Kolaborasi"
            : isEditing
              ? "Edit Data"
              : "Tambah Data"}
        </h2>
        {view === "list" && (
          <button
            onClick={handleOpenCreate}
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
                <th className="px-4 py-3">Gambar</th>
                <th className="px-4 py-3">Judul</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3">Info Extra</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : collabList.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    Belum ada data.
                  </td>
                </tr>
              ) : (
                collabList.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  >
                    <td className="px-4 py-3">
                      <div className="relative w-12 h-12">
                        {item.image && (
                          <Image
                            src={item.image}
                            alt="img"
                            fill
                            className="object-cover rounded shadow-sm"
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold capitalize
                        ${
                          item.category === "magang"
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                            : item.category === "riset"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                              : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        }`}
                      >
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs italic text-gray-500 dark:text-gray-400">
                      {item.category === "riset"
                        ? `Peneliti: ${item.extra_1 || "-"}`
                        : item.category === "kunjungan"
                          ? `Instansi: ${item.extra_1 || "-"}`
                          : "-"}
                    </td>
                    <td className="px-4 py-3 text-center space-x-2">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Kategori Program</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="magang">Magang</option>
                <option value="riset">Riset</option>
                <option value="kunjungan">Kunjungan</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Tanggal Kegiatan</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Judul Kegiatan / Riset</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>
              Upload Foto Dokumentasi {isEditing && "(Opsional)"}
            </label>
            <input
              type="file"
              id="collabFileInput"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-green-700"
            />
            {preview && (
              <div className="mt-4 relative w-full h-32">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="rounded shadow object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <label className={labelClass}>
              Caption Singkat (Muncul di Galeri)
            </label>
            <input
              type="text"
              name="caption"
              value={formData.caption}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div className="bg-blue-50 dark:bg-gray-700/50 p-4 rounded-lg border border-blue-100 dark:border-gray-600">
            <h4 className="text-xs font-bold text-blue-500 dark:text-blue-300 uppercase mb-3 tracking-widest">
              Detail Khusus: {formData.category}
            </h4>

            <div className="grid grid-cols-1 gap-4">
              {(formData.category === "riset" ||
                formData.category === "kunjungan") && (
                <div>
                  <label className="block text-xs font-bold text-blue-800 dark:text-blue-300 mb-1">
                    {getLabelExtra1()}
                  </label>
                  <input
                    type="text"
                    name="extra_1"
                    value={formData.extra_1}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Kosongkan jika tidak perlu"
                  />
                </div>
              )}

              {formData.category === "riset" && (
                <div>
                  <label className="block text-xs font-bold text-blue-800 dark:text-blue-300 mb-1">
                    Abstrak Penelitian
                  </label>
                  <textarea
                    name="extra_2"
                    value={formData.extra_2}
                    onChange={handleChange}
                    className={inputClass}
                    rows="3"
                    placeholder="Ringkasan hasil riset..."
                  ></textarea>
                </div>
              )}

              {formData.category === "magang" && (
                <p className="text-sm text-gray-500 italic">
                  Tidak ada detail khusus untuk kategori ini.
                </p>
              )}
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Uraian Detail (Muncul di Popup)
            </label>
            <textarea
              name="detail"
              rows="5"
              value={formData.detail}
              onChange={handleChange}
              className={inputClass}
              required
            ></textarea>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition shadow-lg"
            >
              {isEditing ? "Simpan Perubahan" : "Simpan Data"}
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
