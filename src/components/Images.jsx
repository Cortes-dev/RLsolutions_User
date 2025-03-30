import React from "react";

const images = [
    "https://rlsolutions.com.mx/img/img1Prolynx.jpg",
    "https://rlsolutions.com.mx/img/img2Prolynx.jpg",
    "https://rlsolutions.com.mx/img/img3Prolynx.jpg",
    "https://rlsolutions.com.mx/Admin/img/1120253900.jpg",
    "https://rlsolutions.com.mx/Admin/img/964434185.jpg",
    "https://rlsolutions.com.mx/Admin/img/1620268737.jpg",
];

const Collage = () => {
    return (
        <div className="grid grid-cols-3 gap-4 p-4 max-w-4xl mx-auto">
            {images.map((src, index) => (
                <div
                    key={index}
                    className="overflow-hidden rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                >
                    <img src={src} alt="Collage" className="w-full h-full object-cover" quality={100}
                        loading="lazy" />
                </div>
            ))}
        </div>
    );
};

export default Collage;