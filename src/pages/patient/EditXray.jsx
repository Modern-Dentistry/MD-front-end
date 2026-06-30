import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TitleUpdater from '../../components/TitleUpdater';
import { IoMdClose, IoMdCloudDownload } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usePatientXrayStore from "../../../stores/patient-xrayStore";

const EditXray = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { selectedXray, fetchXrayById, updateXray, loading, error, clearError } = usePatientXrayStore();

    const [xrayData, setXrayData] = useState({
        date: '',
        description: '',
        url: ''
    });
    const [newImage, setNewImage] = useState(null);
    const [newImagePreview, setNewImagePreview] = useState('');

    useEffect(() => {
        if (id) {
            fetchXrayById(parseInt(id));
        }
    }, [id, fetchXrayById]);

    useEffect(() => {
        if (selectedXray) {
            setXrayData({
                date: selectedXray.date || '',
                description: selectedXray.description || '',
                url: selectedXray.url || ''
            });
        }
    }, [selectedXray]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setXrayData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleNewImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (newImagePreview) {
                URL.revokeObjectURL(newImagePreview);
            }
            setNewImage(file);
            setNewImagePreview(URL.createObjectURL(file));
        }
        e.target.value = null;
    };

    const handleRemoveNewImage = () => {
        if (newImagePreview) {
            URL.revokeObjectURL(newImagePreview);
        }
        setNewImage(null);
        setNewImagePreview('');
    };

    const handleDownloadImage = async (e, imageUrl) => {
        e.stopPropagation();
        try {
            const response = await fetch(imageUrl, { mode: 'cors' });
            const blob = await response.blob();
    
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (err) {
            console.error('Şəkil yüklənərkən xəta baş verdi:', err);
            alert("Şəkil yüklənə bilmədi.");
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        
        if (!xrayData.date) {
            toast.error("Rentgenin tarixi boş ola bilməz!");
            return;
        }

        try {
            const updatePayload = {
                date: xrayData.date,
                description: xrayData.description
            };

            await updateXray(parseInt(id), updatePayload, newImage);
            toast.success("Rentgen uğurla yeniləndi!");
            
            if (newImagePreview) {
                URL.revokeObjectURL(newImagePreview);
            }
            
            setTimeout(() => {
                navigate(-1);
            }, 1500);
        } catch (err) {
            toast.error(err.response?.data?.message || "Rentgen yenilənərkən xəta baş verdi!");
            console.error(err);
        }
    };

    const handleCancel = () => {
        if (newImagePreview) {
            URL.revokeObjectURL(newImagePreview);
        }
        if (clearError) {
            clearError();
        }
        navigate(-1);
    };

    useEffect(() => {
        return () => {
            if (newImagePreview) {
                URL.revokeObjectURL(newImagePreview);
            }
        };
    }, [newImagePreview]);

    if (loading && !selectedXray) {
        return <div className="flex justify-center items-center h-screen text-xl">Məlumat yüklənir...</div>;
    }

    return (
        <div className="flex justify-center items-start min-h-screen p-6 bg-gray-100">
            <TitleUpdater title={`Rentgen Redaktə Et: ${id}`} />
            <ToastContainer />

            <form onSubmit={handleSave} className="bg-white rounded-lg shadow-xl p-8 w-full max-w-7xl h-auto border border-gray-200">
                <div className="mb-6 flex items-start">
                    <label htmlFor="date" className="block text-gray-700 text-base font-semibold mb-2 w-48 flex-shrink-0 pt-3">Rentgenin tarixi</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={xrayData.date}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg p-3 w-full ml-4 focus:ring-blue-500 focus:border-blue-500"
                        required
                        disabled={loading}
                    />
                </div>

                <div className="mb-6 flex items-start">
                    <label htmlFor="description" className="block text-gray-700 text-base font-semibold mb-2 w-48 flex-shrink-0 pt-3">Əlavə məlumat</label>
                    <textarea
                        id="description"
                        name="description"
                        value={xrayData.description}
                        onChange={handleChange}
                        rows="5"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg p-3 w-full ml-4 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Əlavə məlumat daxil edin..."
                        disabled={loading}
                    ></textarea>
                </div>

                {/* Mövcud Şəkil */}
                {xrayData.url && (
                    <div className="mb-6 flex items-start">
                        <label className="block text-gray-700 text-base font-semibold mb-2 w-48 flex-shrink-0 pt-3">Mövcud Şəkil</label>
                        <div className="flex flex-wrap gap-4 p-2 w-full ml-4 border border-gray-300 rounded-lg bg-gray-50">
                            <div className="relative w-32 h-32 md:w-40 md:h-40 border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                                <img
                                    src={xrayData.url}
                                    alt="Mövcud X-Ray"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={(e) => handleDownloadImage(e, xrayData.url)}
                                    className="absolute top-1 right-1 bg-green-500 text-white rounded-full p-1.5 opacity-80 hover:opacity-100 transition-opacity duration-200"
                                    aria-label="Şəkli yüklə"
                                >
                                    <IoMdCloudDownload className="text-xl" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Yeni Şəkil Yükləmə */}
                <div className="mb-6 flex items-start">
                    <label htmlFor="newImage" className="block text-gray-700 text-base font-semibold mb-2 w-48 flex-shrink-0 pt-3">Yeni Şəkil Yüklə</label>
                    <div className="w-full ml-4">
                        <input
                            type="file"
                            id="newImage"
                            name="newImage"
                            accept="image/*"
                            onChange={handleNewImageUpload}
                            disabled={loading}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {newImagePreview && (
                            <div className="flex flex-wrap gap-4 mt-4 p-2 border border-gray-300 rounded-lg bg-gray-50">
                                <div className="relative w-32 h-32 md:w-40 md:h-40 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                                    <img
                                        src={newImagePreview}
                                        alt="Yeni X-Ray Önizləmə"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveNewImage}
                                        className="absolute top-1 left-1 bg-red-500 text-white rounded-full p-1.5 opacity-80 hover:opacity-100 transition-opacity duration-200"
                                        aria-label="Yeni şəkli sil"
                                    >
                                        <MdDeleteForever className="text-xl" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {error && (
                    <div className="flex justify-center text-red-600 text-sm mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Düymələr */}
                <div className="flex justify-end gap-4 mt-8">
                    <button
                        type="button"
                        onClick={handleCancel}
                        disabled={loading}
                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 font-semibold"
                    >
                        Ləğv Et
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold disabled:opacity-50"
                    >
                        {loading ? "Saxlanılır..." : "Yadda Saxla"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditXray;