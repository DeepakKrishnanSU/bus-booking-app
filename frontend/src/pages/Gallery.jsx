import React from "react";
import "./Gallery.css";
import { Link } from "react-router-dom";

function Gallery() {
  const galleryData = [
    {
      title: "Bus Exterior",
      images: [
        "https://assets.volvo.com/is/image/VolvoInformationTechnologyAB/BS%20VI%20Bus%20Single%20Axcel_Single%20Bus?wid=1400&fit=constrain",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFTWo0okfwIHZFeD0yH4uQRApTCntVzKOWBg&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS28k-FDf2PlHi7OR6u8rHo2VNFOcij6YS_LA&s",
      ],
    },
    {
      title: "Bus Interior",
      images: [
        "https://media.istockphoto.com/id/889402258/photo/these-seats-need-to-be-filled.jpg?s=612x612&w=0&k=20&c=4zBhSi2Ar7hpQqsZHUsA9uRmIHJK2qmOE__M7LjfGP8=",
        "https://coachbuildersindia.com/wp-content/uploads/2023/09/Interior-of-Sleeper-Buses-in-India.webp",
        "https://images.pexels.com/photos/6128508/pexels-photo-6128508.jpeg",
      ],
    },
    {
      title: "Journey Shots",
      images: [
        "https://t4.ftcdn.net/jpg/02/21/15/99/360_F_221159919_wBx90CxEQhsaW6ebDEceW1YrE3yS2sVp.jpg",
        "https://media.istockphoto.com/id/1140611116/photo/excited-to-travel.jpg?s=612x612&w=0&k=20&c=noaDQ4_2H3Z0AuZPiYtoljGRu_IyZyJwo4xiu1xs7C0=",
      ],
    },
    {
      title: "Staff & Service",
      images: [
        "https://static.toiimg.com/thumb/msid-58706278,imgsize-126428,width-400,height-225,resizemode-72/58706278.jpg",
        "https://www.shutterstock.com/image-photo/mumbaiindia-may-16-2020-bus-600nw-1733164436.jpg",
      ],
    },
    {
      title: "Destinations",
      images: [
        "https://media.istockphoto.com/id/1904925429/photo/princess-street-during-christmas-time-a-rainy-day-in-edinburgh.jpg?s=612x612&w=0&k=20&c=F71ih4eJtQLIfTYfGZk7OUtfOs6-49G2I6ZRkKZNtng=",
        "https://media.istockphoto.com/id/187613060/photo/bus-driving-through-tunel-bryce-canyon-usa.jpg?s=612x612&w=0&k=20&c=qT2OQq25HXPf6or1X85fBNQcNbUq56GDyWtaoa5YuvM=",
        "https://thumbs.dreamstime.com/b/bus-transport-giant-s-causeway-northern-ireland-uk-june-tourists-ride-buses-famous-tourist-destination-natural-area-county-357499145.jpg",
      ],
    },
  ];

  return (
    <div className="gallery-container">
      <Link to="/home" className="back-home-btn">← Back to Home</Link>

      <h1 className="gallery-title">Explore Our Journey Gallery</h1>
      {galleryData.map((section, index) => (
        <div key={index} className="gallery-section">
          <h2 className="section-title">{section.title}</h2>
          <div className="gallery-grid">
            {section.images.map((img, i) => (
              <div key={i} className="gallery-item">
                <img src={img} alt={`${section.title} ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Gallery;