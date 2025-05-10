import React from "react";
import TitleUpdater from "../../components/TitleUpdater";
import { useParams } from "react-router-dom";
import XRayCard from "../../components/XRayCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useState } from "react";
import 'swiper/css';

const XRay = () => {
    const { id } = useParams();
    const image_url = "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg"; 
    const [showImage, setShowImage] = useState(false);
    const [showImageId, setShowImageId] = useState();
    const images = 
    [
        {
            id: 1,
            image_url: ["https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg"],
            date: "08.98.1000",
        },
        {
            id: 2,
            image_url: ["https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg"],
            date: "08.98.1000",
        },
        {
            id: 3,
            image_url: ["https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg"],
            date: "08.98.1000",
        },
        {
            id: 4,
            image_url: ["https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg"],
            date: "08.98.1000",
        },
        {
            id: 5,
            image_url: ["https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg"],
            date: "08.98.1000",
        },
        {
            id: 6,
            image_url: ["https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg"],
            date: "08.98.1000",
        },
        {
            id: 7,
            image_url: ["https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg"],
            date: "08.98.1000",
        },
        {
            id: 8,
            image_url: ["https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg"],
            date: "08.98.1000",
        },
    ]
    const xrayData =
        [
            {
                id: 1,
                image_url: ["https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg"],
                date: "08.98.1000",
            },
            {
                id: 2,
                image_url: ["https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg"],
                date: "08.98.1000",
            },
            {
                id: 3,
                image_url: ["https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg"],
                date: "08.98.1000",
            },
            {
                id: 4,
                image_url: ["https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg"],
                date: "08.98.1000",
            },
            {
                id: 5,
                image_url: ["https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg"],
                date: "08.98.1000",
            },
            {
                id: 6,
                image_url: ["https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg"],
                date: "08.98.1000",
            },
            {
                id: 7,
                image_url: ["https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg"],
                date: "08.98.1000",
            },
            {
                id: 8,
                image_url: ["https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg", "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg"],
                date: "08.98.1000",
            },
        ]
    
    const handleSlideshow = (id) => {
        setShowImageId(id);
        setShowImage(true);
    }


    if (showImage) {
        return (
<div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} className="fixed top-0 left-0 w-full h-full z-50 flex flex-col items-center justify-center">
    <div className="flex flex-col items-center justify-center w-3/4 h-3/4 bg-white rounded-lg shadow-lg">
    <Swiper navigation={true} modules={[Navigation]} className="flex w-full h-full">
        {
            images?.map((image_url, index) => (
                <SwiperSlide key={index}>
                <div className="flex items-center justify-center p-4">
                    <img src={image_url} alt="X-Ray" className="object- rounded-lg" />
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

        <div className="flex flex-wrap">
        {
            xrayData.map((xray) => (
                <XRayCard key={xray.id} image_url={xray.image_url} date={xray.date} handleClick={handleSlideshow}/>
            ))
        } 
        </div>
    );
}
export default XRay;
//