import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchSection from "./components/SearchSection";
import Services from "./components/Services";
import Slider from "./components/Slider";
import AboutFeedback from "./components/AboutFeedback";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import ServicePage from "./components/plant";
import CartPage from "./components/CartPage";
import ScrollToTop from "./components/scrolltotop";
import Helper from "./components/helper";
import Profile from "./components/Profile"; // Import Profile component
import OrderReceipt from "./components/OrderReceipt";
import Address from "./components/address"; // Import the Address component
// Import OrderReceipt component
// Move this to a separate file if it gets large
const allServicesData = {
  gardening: [
    {
      id: 1,
      name: "Trending in Gardening",
      description: " Your Ultimate Plant Collection Discover the latest trends in gardening.",
      price: 499,
      image: "/trend.webp",
    },
    {
      id: 2,
      name: "Plants' Packs by Features",
      description: "Explore Our Unique 'Plants' Packs by Features Discover the beauty and benefits of our curated 'Plants' Packs by Features.",
      price: 599,
      image: "/features.avif",
    },
    {
      id: 3,
      name: "Miniature Gardens & Kits",
      description: "Miniature Gardens & Kits Discover the enchanting world of Miniature Gardens & Kits.",
      price: 799,
      image: "/miniature.avif",
    },
    {
      id: 4,
      name: "Plants' Packs by Location",
      description: "Plants Packs by Location Discover our exclusive collection of 'Plants' Packs by Location.",
      price: 699,
      image: "/location.avif",
    },
    {
      id: 5,
      name: "Plants' Packs by Season",
      description: "Plants Packs by Season Discover our exclusive 'Plants Packs by Season' collection.",
      price: 899,
      image: "/season.webp",
    },
    // Add more gardening services
  ],
  plants: [
    {
      id: 1,
      name: "Peace Lily, Spathiphyllum - Plant",
      description: "Lilies are known for their large, often fragrant flowers, diverse colors, and symbolic meanings, ranging from purity.",
      price: 499,
      image: "/lily.avif",
    },
    {
      id: 2,
      name: "Jasminum sambac, Mogra, Arabian Jasmine - Plant",
      description: "Jasmine flowers are renowned for their intoxicating, sweet, and often night-blooming fragrance.",
      price: 599,
      image: "/jasmin.avif",
    },
    {
      id: 3,
      name: "Parijat Tree, Parijatak, Night Flowering Jasmine - Plant",
      description: "The parijat flower, also known as Nyctanthes arbor-tristis, is a sacred plant in Hindu mythology.",
      price: 799,
      image: "/parijat.avif",
    },
    {
      id: 4,
      name: "Miniature Rose, Button Rose (Any Color) - Plant",
      description: "Miniature flowers, like miniature roses or orchids, stand out for their compact size, space-saving potential.",
      price: 699,
      image: "/buttonrose.avif",
    },
    {
      id: 5,
      name: "Damascus Rose, Scented Rose (Any Color) - Plant",
      description: "The Damascus rose (Rosa × damascena) is renowned for its intense, delicate fragrance and is commercially cultivated for its use in perfumery.",
      price: 899,
      image: "/scented.avif",
    },
    // Add more plants services
  ],
  seeds: [
    {
      id: 1,
      name: "Capsicum Green - Desi Vegetable Seeds",
      description: "Capsicum, commonly known as bell peppers or chili peppers, is a versatile vegetable .",
      price: 499,
      image: "/capsicum.jpg",
    },
    {
      id: 2,
      name: "Zinnia Dahlia Mixed Color - Desi Flower Seeds",
      description: "Zinnias stand out for their vibrant, daisy-like blooms in a wide array of colors, their ease of cultivation, and their ability to thrive in hot, sunny conditions.",
      price: 599,
      image: "/zinnia.jpg",
    },
    {
      id: 3,
      name: "Coriander Panipat - Desi Vegetable Seeds",
      description: "Coriander, both the leaves (cilantro) and seeds, boasts numerous health benefits.",
      price: 799,
      image: "/coriander.jpg",
    },
    {
      id: 4,
      name: "Balsam Double Mixed Color - Desi Flower Seeds",
      description: "Balsam plants, particularly Impatiens balsamina (garden balsam), are known for their vibrant, colorful flowers, their easy-to-grow nature.",
      price: 699,
      image: "/balsam.jpg",
    },
    {
      id: 5,
      name: "Cherry Tomato, Cherry Tomato Honey - Vegetable Seeds",
      description: "Cherry tomatoes stand out for their rich nutrient profile, particularly their high content of antioxidants like lycopene, and their versatility in both culinary and health applications.",
      price: 899,
      image: "/tomato.jpg",
    },
    // Add more seeds services
  ],
  bulbs: [
    {
      id: 1,
      name: "Rajnigandha, Tuberose - Bulbs (set of 10)",
      description: "The Rajnigandha flower, also known as Tuberose, is special for its strong, sweet fragrance, nocturnal blooming habit, and cultural significance.",
      price: 499,
      image: "/rajnigandha.avif",
    },
    {
      id: 2,
      name: "Gladiolus (Random color) - Bulbs (set of 10)",
      description: " Gladiolus flowers are known for their striking, tall flower spikes and vibrant, colorful blooms.",
      price: 599,
      image: "/gladious.webp",
    },
    {
      id: 3,
      name: "Ranunculus (Random Color) - Bulbs",
      description: "Ranunculus flowers, also known as buttercups, are prized for their unique, ruffled petals, vibrant colors, and long vase life.",
      price: 799,
      image: "/ranunculous.avif",
    },
    {
      id: 4,
      name: "Zephyranthes Lily, Rain Lily (Random color) - Bulbs",
      description: "Zephyranthes lilies, also known as rain lilies, are renowned for their ability to bloom unexpectedly, often after rainfall, and for their resilience and adaptability.",
      price: 699,
      image: "/zephy.avif",
    },
    {
      id: 5,
      name: "Tulip (Random Color) - Bulbs",
      description: "Tulips, known for their vibrant, cup-shaped flowers and symbolism of love and rebirth.",
      price: 899,
      image: "/tulip.webp",
    },
    // Add more bulbs services
  ],
  pots: [
    {
      id: 1,
      name: "5.1 inch (13 cm) Round Plastic Thermoform Pot (Mix Color) - Pack of 20",
      description: "Small round plastic pots for indoor decoration.",
      price: 499,
      image: "/round.jpg",
    },
    {
      id: 2,
      name: "23.6 inch (60 cm) Rectangle Plastic Microgreens Tray (3 mm) (Set of 2)",
      description: "rectangle plastic tray used for store microgeenes.",
      price: 599,
      image: "/tray.jpg",
    },
    {
      id: 3,
      name: "12 inch (30 cm) Rectangle Glass Vase",
      description: "fancy rectangle glass vase for room and office decoration by planting water based plant.",
      price: 799,
      image: "/rectangle.jpg",
    },
    {
      id: 4,
      name: "6.6 inch (17 cm) Tulsi Vrindavan Matt Finish Rectangle Ceramic Pot (Light Brown)",
      description: "Om styled matt for planting tulsi.",
      price: 699,
      image: "/om.jpg",
    },
    {
      id: 5,
      name: "2 inch (5 cm) Square Glass Vase (9 inch (23 cm) Height)",
      description: "square glass vase .",
      price: 899,
      image: "/square.jpg",
    },
    // Add more bike repair services
  ],
  fertilizers: [
    {
      id: 1,
      name: "Vermicompost - 1 kg (Set of 2)",
      description: "Vermicompost, created through earthworm decomposition of organic matter, is a nutrient-rich organic fertilizer.",
      price: 499,
      image: "/vermi.avif",
    },
    {
      id: 2,
      name: "Nutrient-rich general purpose potting soil mix - 5 kg",
      description: " providing essential nutrients, good drainage, and aeration for healthy growth in containers and pots, whether for indoor or outdoor plants.",
      price: 599,
      image: "/nutrient.jpg",
    },
    {
      id: 3,
      name: "Jeevamrut (Plant Growth Tonic) - 500 ml",
      description: "Jeevamrut, a natural fertilizer, is used to enhance soil health, improve plant growth, and increase crop yields by providing essential nutrients and beneficial microorganisms.",
      price: 799,
      image: "/jeevarmut.jpg",
    },
    {
      id: 4,
      name: "Plant O Boost (Special Flower Booster, 10 g) (set of 10)",
      description: "Plant O Boost is a product designed to enhance plant growth, improve overall health, and boost vitality, often used as a liquid biofertilizer or growth booster.",
      price: 699,
      image: "/0boost.jpg",
    },
    {
      id: 5,
      name: "Coco Peat Block - 4 kg (Expands Up to 60 - 70 L)",
      description: "Cocopeat blocks, made from compressed coconut husk fibers, are used as a versatile, sustainable, and eco-friendly growing medium for plants.",
      price: 899,
      image: "/coco.jpg",
    },
    // Add more bike repair services
  ],
  pebbles: [
    {
      id: 1,
      name: "Super Marble Pebbles (White, Small, Polished) - 1 kg",
      description: "",
      price: 499,
      image: "/white.webp",
    },
    {
      id: 2,
      name: "Aquarium Pebbles (Mix Color, Small) - 1 kg",
      description: "",
      price: 599,
      image: "/aquarium.webp",
    },
    {
      id: 3,
      name: "Marble Chips Pebbles (Mix Color, Small, Polished) - 1 kg",
      description: "",
      price: 799,
      image: "/chips.webp",
    },
    {
      id: 4,
      name: "Stone Sand (Blue) - 1 kg",
      description: "Blue sand like pebbles.",
      price: 699,
      image: "/blue.webp",
    },
    {
      id: 5,
      name: "Onex Pebbles (Mix Color, Medium)- 1 kg",
      description: "",
      price: 899,
      image: "/onex.webp",
    },
    // Add more bike repair services
  ],
  accessories: [
    {
      id: 1,
      name: "Filter Replacement",
      description: "Replace old or clogged water purifier filters.",
      price: 499,
      image: "https://images-na.ssl-images-amazon.com/images/I/71MIQqwP8gL._SL1500_.jpg",
    },
    {
      id: 2,
      name: "UV Lamp Replacement",
      description: "Replace faulty UV lamps in water purifiers.",
      price: 599,
      image: "https://cdn.shopclues.com/images1/detailed/89219/139483189-89219982-1530003784.jpg",
    },
    {
      id: 3,
      name: "General Maintenance",
      description: "Regular maintenance to ensure optimal performance.Ensure your water heater runs efficiently.",
      price: 799,
      image: "https://th.bing.com/th/id/OIP.7-nMfbNpB8gwYatD19cvgwHaE8?rs=1&pid=ImgDetMain",
    },
    {
      id: 4,
      name: "Motor Repair",
      description: "Repair or replace water purifier motors.",
      price: 699,
      image: "https://i.ytimg.com/vi/uHbjiHi76js/maxresdefault.jpg",
    },
    {
      id: 5,
      name: "Leakage Repair",
      description: "Fix water leakage issues in purifiers.",
      price: 899,
      image: "https://5.imimg.com/data5/SELLER/Default/2022/12/WT/CB/NR/132537498/water-heater-500x500.jpg",
    },
    // Add more bike repair services
  ],
  // ... other service categories
};

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [user, setUser] = useState(null);  // Store logged-in user
  const navigate = useNavigate();
  

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (id, amount) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + amount } : item
    ).filter(item => item.quantity > 0));
  };

  // Modal control functions
  const openLoginModal = () => {
    setShowLoginModal(true);
    setShowSignupModal(false);
  };

  const openSignupModal = () => {
    setShowSignupModal(true);
    setShowLoginModal(false);
  };

  const closeLoginModal = () => setShowLoginModal(false);
  const closeSignupModal = () => setShowSignupModal(false);

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    const results = Object.entries(allServicesData).flatMap(([category, services]) =>
      services
        .filter(
          (service) =>
            service.name.toLowerCase().includes(query.toLowerCase()) ||
            service.description.toLowerCase().includes(query.toLowerCase()
            )
        )
        .map((service) => ({ ...service, category }))
    );

    setSearchResults(results);
  };

  const handleLoginSuccess = (userData) => {
    console.log("Login successful, user data:", userData); // Debugging
    setUser(userData); // Update user state
    localStorage.setItem("user", JSON.stringify(userData)); // Save user to localStorage
    setShowLoginModal(false);
    navigate("/profile"); // Redirect to profile page
  };
  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("Token");        // Clear auth token
    localStorage.removeItem("userData");     // Clear user info
    localStorage.removeItem("sessionId");    // Clear guest session (optional)
    setUser(null);                           // Clear user state (if using global state or context)
    setCart([]);                             // Clear cart state
    navigate("/");                           // Redirect to homepage or login
  };
  

  return (
    <>
      <ScrollToTop />
      <Navbar
        openLoginModal={openLoginModal}
        cart={cart}
        user={user}
        onLogout={handleLogout}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchSection onSearch={handleSearch} />
              {isSearching ? (
                <div className="search-results-container">
                  <h2>Search Results for "{searchQuery}"</h2>
                  {searchResults.length > 0 ? (
                    <div className="services-grid">
                      {searchResults.map((service) => (
                        <div
                          key={`${service.category}-${service.id}`}
                          className="service-card"
                          onClick={() => navigate(`/services/${service.category}`)}
                        >
                          <img src={service.image} alt={service.name} />
                          <h3>{service.name}</h3>
                          <p>{service.description}</p>
                          <p className="price">₹{service.price}</p>
                          <p className="category">{service.category}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-results">No services found matching your search.</p>
                  )}
                </div>
              ) : (
                <>
                  <Services searchQuery={searchQuery} />
                  <Slider />
                  <AboutFeedback />
                </>
              )}
              <Footer openLoginModal={openLoginModal} openSignupModal={openSignupModal} />
            </>
          }
        />

        <Route
          path="/services/:serviceType"
          element={
            <ServicePage
              cart={cart}
              setCart={setCart}
              searchQuery={searchQuery}
            />
          }
        />
        <Route path="/helper" element={<Helper />} />
        <Route path="/receipt/:orderId" element={<OrderReceipt />} />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              removeFromCart={removeFromCart}
              openLoginModal={openLoginModal}  // ✅ Pass this!
            />
          }
        />

        {/* Profile Route */}
        <Route
          path="/profile"
          element={
            user ? (
              <Profile user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" /> // Redirect to home if not logged in
            )
          }
        />

       
        {/* OrderReceipt Route */}
        <Route
          path="/order-receipt"
          element={<OrderReceipt />} // Define the OrderReceipt route
        />
        <Route path="/address" element={<Address />} /> {/* Add this route */}
      </Routes>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          closeModal={closeLoginModal}
          switchToSignup={() => {
            closeLoginModal();
            openSignupModal();
          }}
          onLoginSuccess={handleLoginSuccess}  // Use the new handler
        />
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <SignupModal
          closeModal={closeSignupModal}
          switchToLogin={() => {
            closeSignupModal();
            openLoginModal();
          }}
        />
      )}
    </>
  );
}

export default App;