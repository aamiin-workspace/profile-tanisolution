'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import AdminModal from '@/components/admin/AdminModal';

export default function PartnerManager() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', image: null });

  const [modal, setModal] = useState({
    isOpen: false,
    type: 'success',
    title: '',
    message: '',
    onConfirm: null 
  });

  const closeModal = () => setModal(prev => ({ ...prev, isOpen: false }));
  
  const showModal = (type, title, message, onConfirm = null) => {
    setModal({ isOpen: true, type, title, message, onConfirm });
  };

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/partners', { cache: 'no-store' });
      const data = await res.json();
      setList(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const confirmDelete = (id) => {
    showModal(
        'confirm', 
        'Hapus Partner?', 
        'Tindakan ini tidak bisa dibatalkan. Data akan hilang permanen.',
        () => handleDeleteProcess(id)
    );
  };

  const handleDeleteProcess = async (id) => {
    try {
        const res = await fetch(`/api/partners/${id}`, { method: 'DELETE' });
        if (res.ok) {
            fetchPartners();
            setTimeout(() => {
                showModal('success', 'Berhasil Dihapus', 'Data partner telah dihapus dari sistem.');
            }, 300);
        } else {
            showModal('error', 'Gagal Menghapus', 'Terjadi kesalahan saat menghapus data.');
        }
    } catch (error) {
        showModal('error', 'Error Koneksi', 'Gagal menghubungi server.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    if (formData.image) data.append('image', formData.image);

    try {
      const url = isEditing ? `/api/partners/${editId}` : '/api/partners';
      const method = isEditing ? 'PUT' : 'POST';
      
      const res = await fetch(url, { method, body: data });
      if (res.ok) {
        fetchPartners();
        resetForm();
        showModal('success', 'Berhasil Disimpan', isEditing ? 'Data partner berhasil diperbarui.' : 'Partner baru berhasil ditambahkan.');
      } else {
        showModal('error', 'Gagal Menyimpan', 'Terjadi kesalahan saat menyimpan data.');
      }
    } catch (e) {
        showModal('error', 'Error Koneksi', 'Periksa koneksi internet Anda.');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', image: null });
    setPreview(null);
    setIsEditing(false);
    setEditId(null);
    const fileInput = document.getElementById('partnerFile');
    if(fileInput) fileInput.value = "";
  };

  const handleEdit = (item) => {
    setFormData({ name: item.name, image: null });
    setPreview(item.image);
    setEditId(item.id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 min-h-screen">
      
      {/* --- KOMPONEN MODAL DISINI --- */}
      <AdminModal 
        isOpen={modal.isOpen}
        onClose={closeModal}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onConfirm={modal.onConfirm}
      />

      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Manajemen Partner & Mitra</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="mb-10 bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
        <h3 className="font-bold text-lg mb-4 text-gray-700 dark:text-gray-200">{isEditing ? 'Edit Partner' : 'Tambah Partner Baru'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-bold mb-1 dark:text-gray-300">Nama Partner / Instansi</label>
                <input 
                    type="text" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white" 
                    required 
                />
            </div>
            <div>
                <label className="block text-sm font-bold mb-1 dark:text-gray-300">Logo (Wajib)</label>
                <input 
                    type="file" 
                    id="partnerFile"
                    onChange={e => {
                        const file = e.target.files[0];
                        setFormData({...formData, image: file});
                        if(file) setPreview(URL.createObjectURL(file));
                    }} 
                    className="block w-full text-sm dark:text-gray-300" 
                    required={!isEditing} 
                />
                {preview && <img src={preview} className="mt-2 h-16 object-contain bg-white p-1 rounded" alt="Preview" />}
            </div>
        </div>
        <div className="mt-4 flex gap-3">
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition shadow-lg">Simpan</button>
            {isEditing && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-600 transition shadow-lg">Batal</button>}
        </div>
      </form>

      {/* LIST TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white uppercase font-bold">
                <tr>
                    <th className="p-3">Logo</th>
                    <th className="p-3">Nama</th>
                    <th className="p-3 text-center">Aksi</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? <tr><td colSpan="3" className="p-4 text-center">Loading...</td></tr> : list.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="p-3">
                          <div className="relative w-16 h-10 bg-white rounded border flex items-center justify-center overflow-hidden">
                              {/* Gunakan tag <img> biasa untuk Admin Panel agar lebih fleksibel 
                                  menangani URL Cloudinary vs URL Lokal tanpa ribet config width/height 
                              */}
                              <img 
                                  src={item.image || '/placeholder.jpg'} 
                                  alt="logo" 
                                  className="object-contain w-full h-full p-1" 
                              />
                          </div>
                      </td>
                      <td className="p-3 font-bold">{item.name}</td>
                      <td className="p-3 text-center space-x-3">
                          <button onClick={() => handleEdit(item)} className="text-yellow-500 font-bold hover:text-yellow-600">
                            <i className="fas fa-edit"></i> Edit
                          </button>
                          <button onClick={() => confirmDelete(item.id)} className="text-red-500 font-bold hover:text-red-600">
                            <i className="fas fa-trash"></i> Hapus
                          </button>
                      </td>
                  </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}