import React from 'react';
import './AnnouncementBar.css';

const AnnouncementBar = () => {
    const mascotUrl = "https://i.ibb.co/1G6mLXk1/4654b70b-f406-4187-8345-236edbfc9fc6.png";
    return (
        <div className="bg-[#00FF3B] text-black overflow-hidden whitespace-nowrap py-2">
            <div className="marquee-track-horizontal flex items-center">
                <span className="font-semibold uppercase mx-8">
                    Frete grátis acima de R$299.99
                </span>
                 <img src={mascotUrl} alt="Mascote" className="h-6 w-6 rounded-full mx-8" />
                <span className="font-semibold uppercase mx-8">
                    10% OFF na 1ª compra usando o cupom: PRIMEIRA10
                </span>
                 <img src={mascotUrl} alt="Mascote" className="h-6 w-6 rounded-full mx-8" />
                 <span className="font-semibold uppercase mx-8">
                    Frete grátis acima de R$299.99
                </span>
                 <img src={mascotUrl} alt="Mascote" className="h-6 w-6 rounded-full mx-8" />
                <span className="font-semibold uppercase mx-8">
                    10% OFF na 1ª compra usando o cupom: PRIMEIRA10
                </span>
                 <img src={mascotUrl} alt="Mascote" className="h-6 w-6 rounded-full mx-8" />
            </div>
        </div>
    );
};

const styles = `
.marquee-track-horizontal {
  animation: marquee-horizontal 20s linear infinite;
  will-change: transform;
}

@keyframes marquee-horizontal {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.marquee-track-horizontal:hover {
    animation-play-state: paused;
}
`;

// Inject styles into the head
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);


export default AnnouncementBar;