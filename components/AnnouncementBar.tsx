import React from 'react';
import './AnnouncementBar.css';

const AnnouncementBar = () => {
    const mascotUrl = "https://i.ibb.co/1G6mLXk1/4654b70b-f406-4187-8345-236edbfc9fc6.png";
  const announcementContent = (
    <>
      <span className="font-semibold uppercase mx-8">
        Frete grátis acima de R$299.99
      </span>
      <img src={mascotUrl} alt="Mascote" className="h-6 w-6 rounded-full mx-8" />
      <span className="font-semibold uppercase mx-8">
        Frete grátis acima de R$299.99
      </span>
      <img src={mascotUrl} alt="Mascote" className="h-6 w-6 rounded-full mx-8" />
      <span className="font-semibold uppercase mx-8">
        Frete grátis acima de R$299.99
      </span>
      <img src={mascotUrl} alt="Mascote" className="h-6 w-6 rounded-full mx-8" />
      <span className="font-semibold uppercase mx-8">
        Frete grátis acima de R$299.99
      </span>
      <img src={mascotUrl} alt="Mascote" className="h-6 w-6 rounded-full mx-8" />
    </>
  );
  return (
    <div className="bg-[#00FF3B] text-black overflow-hidden whitespace-nowrap py-2">
      <div className="marquee-track-horizontal flex items-center">
        {announcementContent}
        {announcementContent}
      </div>
    </div>
  );
};



export default AnnouncementBar;