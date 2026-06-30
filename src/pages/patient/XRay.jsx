import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

// Swiper CSS importları
import 'swiper/css';
import 'swiper/css/navigation';

import TitleUpdater from "../../components/TitleUpdater";
import XRayCard from "../../components/XRayCard";
import usePatientXrayStore from "../../../stores/patient-xrayStore";

const XRay = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { xrays, fetchXrays, deleteXray, loading } = usePatientXrayStore();

    const [showSlideshow, setShowSlideshow] = useState(false);
    const [currentSlideshowImages, setCurrentSlideshowImages] = useState([]);

    useEffect(() => {
        if (id) {
            fetchXrays(parseInt(id));
        }
    }, [id, fetchXrays]);

    const handleOpenSlideshow = (xrayId) => {
        const selectedXray = xrays.find(xray => xray.id === xrayId);
        if (selectedXray && selectedXray.url) {
            setCurrentSlideshowImages([selectedXray.url]);
            setShowSlideshow(true);
        } else {
            console.warn(`No image URL found for X-Ray ID: ${xrayId}`);
        }
    };

    const handleCloseSlideshow = () => {
        setShowSlideshow(false);
        setCurrentSlideshowImages([]);
    };

    const handleAddNewXRay = () => {
        navigate('add');
    };

    const handleDelete = async (xrayId) => {
        if (window.confirm("Rentgen məlumatını silmək istədiyinizə əminsinizmi?")) {
            try {
                await deleteXray(xrayId);
                alert("Rentgen məlumatı uğurla silindi!");
            } catch (err) {
                alert("Rentgen silinərkən xəta baş verdi.");
            }
        }
    };

    if (showSlideshow) {
        return (
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} className="fixed top-0 left-0 w-full h-full z-50 flex flex-col items-center justify-center">
                <div className="relative flex flex-col items-center justify-center
                                     w-[90%] h-[90vh]
                                     max-w-7xl
                                     bg-white rounded-lg shadow-lg">
                    <button
                        onClick={handleCloseSlideshow}
                        className="absolute top-4 right-4 text-gray-800 text-4xl z-10 p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                        aria-label="Close slideshow"
                    >
                        <IoMdClose />
                    </button>

                    <Swiper
                        navigation={currentSlideshowImages.length > 1}
                        modules={[Navigation]}
                        className="w-full h-full flex items-center justify-center"
                        grabCursor={true}
                        spaceBetween={10}
                        slidesPerView={1}
                    >
                        {
                            currentSlideshowImages.map((imageUrl, index) => (
                                <SwiperSlide key={index}>
                                    <div className="flex items-center justify-center w-full h-full p-4">
                                        <img
                                            src={imageUrl}
                                            alt={`X-Ray ${index + 1}`}
                                            className="max-w-full max-h-full object-contain rounded-lg shadow-md"
                                            style={{ minWidth: '0', minHeight: '0' }}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-6 p-6 justify-center min-h-screen relative pt-[7rem]">
            <TitleUpdater title="X-Rays" />

            <div className="absolute top-6 right-6 z-10">
                <button
                    onClick={handleAddNewXRay}
                    className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 font-semibold"
                >
                    <FaPlus className="mr-2" /> Yenisini əlavə et
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center w-full h-64 text-xl">Məlumat yüklənir...</div>
            ) : xrays && xrays.length > 0 ? (
                xrays.map((xray) => (
                    <XRayCard
                        key={xray.id}
                        xrayId={xray.id}
                        image_url={xray.url || null}
                        date={xray.date}
                        handleClick={() => handleOpenSlideshow(xray.id)}
                        onDelete={handleDelete}
                    />
                ))
            ) : (
                <div className="flex justify-center items-center w-full h-64 text-xl text-gray-500">Rentgen tapılmadı.</div>
            )}
        </div>
    );
};

export default XRay;