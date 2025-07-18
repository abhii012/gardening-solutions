import React from "react";
import { Link } from "react-router-dom";

const Services = ({ searchQuery }) => {
  const services = [
    { id: 1, img: "/plants.jpg", title: "Plants", description: "Explore Our Diverse Collection of Plants Welcome to our vibrant collection of plants", link: "/services/gardening" },
    { id: 2, img: "/seeds.jpeg", title: "Seeds", description: "Explore Our Premium Seeds Collection Welcome to our extensive collection of seeds.", link: "/services/seeds" },
    { id: 3, img: "/pots.jpg", title: "Pots", description: " Explore Our Exquisite Collection of Planters Welcome to our stunning collection of pots.", link: "/services/pots" },
    { id: 4, img: "/gift.webp", title: "Gifts", description: " Discover the Perfect Gifts for Every Occasion Welcome to our curated collection of gifts.", link: "/services/gift" },
    { id: 5, img: "/fertilizers.jpg", title: "Fertilizers", description: "Just like humans need food for sustainability, plants need soil and fertilizers.", link: "/services/fertilizers" },
    { id: 6, img: "/pebbles.jpg", title: "Pebbles", description: " Pebbles Collection Discover our exquisite Pebbles Collection.", link: "/services/pebbles" },
    { id: 7, img: "/accessories.jpg", title: "Accessories", description: "Explore Our Unique Accessories Collection Welcome to our Accessories Collection.", link: "/services/accessories" },
    { id: 8, img: "/bulbs.webp", title: "Bulbs", description: "Flower Bulbs Collection Discover the enchanting world of our Flower Bulbs collection.", link: "/services/bulbs" },
  ];

  // ✅ Filter services based on search query
  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="services">
      <h2 className="our-services">Our Services</h2>

      {filteredServices.length === 0 ? (
        <p className="no-results">No services found for "{searchQuery}"</p>
      ) : (
        <div className="service-grid">
          {filteredServices.map((service) => (
            <div key={service.id} className="service-box">
              <img src={service.img} alt={service.title} />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              {service.link ? (
                <Link to={service.link}>
                  <button>Book Now</button>
                </Link>
              ) : (
                <button disabled>Coming Soon</button>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Services;
