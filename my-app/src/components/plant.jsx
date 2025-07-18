import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // Import UUID for generating session IDs
import "../styles/gardening.css";
import Footer from "./Footer";


const ServicePage = ({ cart, setCart, searchQuery, user }) => {
  const { serviceType } = useParams();
  const [localSearchTerm, setLocalSearchTerm] = useState("");

 useEffect(() => {
    console.log("User state in Navbar:", user);
  }, [user]);
  
  const fetchUserProfile = async () => {
    const token = localStorage.getItem("Token");
    if (!token) {
      console.log("No token found in localStorage.");
      return null;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/users/profile", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
  
      const data = await response.json();
      console.log("User profile response:", data); // ✅ log response
  
      if (response.ok) {
        localStorage.setItem("userData", JSON.stringify(data)); // unify with the cart logic

        return data;
      } else {
        console.error("Error fetching profile:", data.message); // 🔥 log error message
        return null;
      }
    } catch (error) {
      console.error("Network or server error:", error); // ❗ catch fetch/network issues
      return null;
    }
  };
  
  useEffect(() => {
    fetchUserProfile();
  }, []);
 
  // Ensure sessionId exists in localStorage
  let sessionId = localStorage.getItem("sessionId") || uuidv4();
  if (!sessionId) {
    sessionId = uuidv4(); // Generate a new sessionId if not present
    localStorage.setItem("sessionId", sessionId);
  }


  // Sample services data for different service types
  const servicesData = {
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
        price: 199,
        image: "/tray.jpg",
      },
      {
        id: 3,
        name: "12 inch (30 cm) Rectangle Glass Vase",
        description: "fancy rectangle glass vase for room and office decoration by planting water based plant.",
        price: 399,
        image: "/rectangle.jpg",
      },
      {
        id: 4,
        name: "6.6 inch (17 cm) Tulsi Vrindavan Matt Finish Rectangle Ceramic Pot (Light Brown)",
        description: "Om styled matt for planting tulsi.",
        price: 199,
        image: "/om.jpg",
      },
      {
        id: 5,
        name: "2 inch (5 cm) Square Glass Vase (9 inch (23 cm) Height)",
        description: "square glass vase .",
        price: 199,
        image: "/square.jpg",
      },
      // Add more bike repair services
    ],
    fertilizers: [
      {
        id: 1,
        name: "Vermicompost - 1 kg (Set of 2)",
        description: "Vermicompost, created through earthworm decomposition of organic matter, is a nutrient-rich organic fertilizer.",
        price: 149,
        image: "/vermi.avif",
      },
      {
        id: 2,
        name: "Nutrient-rich general purpose potting soil mix - 5 kg",
        description: " providing essential nutrients, good drainage, and aeration for healthy growth in containers and pots, whether for indoor or outdoor plants.",
        price: 199,
        image: "/nutrient.jpg",
      },
      {
        id: 3,
        name: "Jeevamrut (Plant Growth Tonic) - 500 ml",
        description: "Jeevamrut, a natural fertilizer, is used to enhance soil health, improve plant growth, and increase crop yields by providing essential nutrients and beneficial microorganisms.",
        price: 199,
        image: "/jeevarmut.jpg",
      },
      {
        id: 4,
        name: "Plant O Boost (Special Flower Booster, 10 g) (set of 10)",
        description: "Plant O Boost is a product designed to enhance plant growth, improve overall health, and boost vitality, often used as a liquid biofertilizer or growth booster.",
        price: 199,
        image: "/0boost.jpg",
      },
      {
        id: 5,
        name: "Coco Peat Block - 4 kg (Expands Up to 60 - 70 L)",
        description: "Cocopeat blocks, made from compressed coconut husk fibers, are used as a versatile, sustainable, and eco-friendly growing medium for plants.",
        price: 149,
        image: "/coco.jpg",
      },
      // Add more bike repair services
    ],
    pebbles: [
      {
        id: 1,
        name: "Super Marble Pebbles (White, Small, Polished) - 1 kg",
        description: "",
        price: 49,
        image: "/white.webp",
      },
      {
        id: 2,
        name: "Aquarium Pebbles (Mix Color, Small) - 1 kg",
        description: "",
        price: 69,
        image: "/aquarium.webp",
      },
      {
        id: 3,
        name: "Marble Chips Pebbles (Mix Color, Small, Polished) - 1 kg",
        description: "",
        price: 79,
        image: "/chips.webp",
      },
      {
        id: 4,
        name: "Stone Sand (Blue) - 1 kg",
        description: "Blue sand like pebbles.",
        price: 49,
        image: "/blue.webp",
      },
      {
        id: 5,
        name: "Onex Pebbles (Mix Color, Medium)- 1 kg",
        description: "",
        price: 59,
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

  };

  const activeSearchTerm = searchQuery || localSearchTerm;

  const filteredServices = servicesData[serviceType]?.filter(service =>
    service.name.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(activeSearchTerm.toLowerCase())
  ) || [];

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = async (service) => {
    try {
      console.log("Original service image:", service.image);
      console.log("Service object received:", service);
  
      // 1. Get service ID (with validation)
      const serviceId = service.serviceId || service.id;
      if (!serviceId) throw new Error("Invalid service: missing ID");
  
      // 2. Get auth and session data
      const token = localStorage.getItem("Token");
      const userData = JSON.parse(localStorage.getItem("userData") || "null");
      let sessionId = localStorage.getItem("sessionId");
  
      if (userData) {
        console.log("User data is available:", userData);
      } else {
        console.log("No user data found.");
      }
  
      // 3. Create/update local cart
      const updatedCart = [...cart];
      const existingItemIndex = updatedCart.findIndex(
        item => item.serviceId === serviceId.toString()
      );
  
      if (existingItemIndex !== -1) {
        updatedCart[existingItemIndex].quantity += 1;
      } else {
        updatedCart.push({
          serviceId: serviceId.toString(),
          id: serviceId.toString(), // Add this line
          name: service.name,
          price: service.price,
          quantity: 1,
          image: service.image,
          description: service.description
        });
      }
      setCart(updatedCart);
  
      // 4. Generate session ID if needed (for guests)
      if (!userData?.id && !sessionId) {
        sessionId = uuidv4();
        localStorage.setItem("sessionId", sessionId);
      }
  
      // 5. Prepare API payload
      const payload = {
        serviceId: serviceId.toString(),
        name: service.name,
        price: Number(service.price),
        quantity: 1,
        image: service.image,
        description: service.description,
        userId: userData?.id || null,
        sessionId
      };
  
      // 6. Prepare headers
      const headers = {
        "Content-Type": "application/json",
        "x-session-id": sessionId
      };
  
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
  
      // 7. Make API request
      const response = await fetch("http://localhost:5000/api/carts/add", {
        method: "POST",
        headers,
        body: JSON.stringify(payload)
      });
  
      const data = await response.json();
      console.log("API Response:", data);
  
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to add item');
      }
  
      // 8. Sync with server response
      if (data.cart) {
        setCart(data.cart.items || []);
      }
  
    } catch (error) {
      console.error('Cart Error:', error.message);
      setCart(cart); // revert local UI if needed
      alert(error.message.includes("login")
        ? "Please login to save your cart"
        : "Failed to add item. Please try again.");
    }
  };
  
  const changeCartQuantity = async (serviceId, amount) => {
    try {
      // Find the item in cart
      const item = cart.find(i => i.serviceId === serviceId);
      if (!item) throw new Error("Service not found in cart");
  
      // Calculate new quantity
      const newQuantity = item.quantity + amount;
      
      // Prepare payload
      const userData = JSON.parse(localStorage.getItem("userData") || null);
      const sessionId = localStorage.getItem("sessionId");
      const token = localStorage.getItem("Token");
  
      const payload = {
        serviceId: serviceId.toString(),
        name: item.name,
        price: item.price,
        quantity: Math.abs(amount),
        image: item.image,
        description: item.description,
        userId: userData?.id || null,
        sessionId
      };
  
      const headers = {
        "Content-Type": "application/json",
        "x-session-id": sessionId
      };
  
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
  
      // Determine endpoint based on operation
      const endpoint = amount > 0
        ? "http://localhost:5000/api/carts/add"
        : "http://localhost:5000/api/carts/remove";
  
      // Make API call
      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(payload)
      });
  
      const data = await response.json();
  
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to update cart");
      }
  
      // Update local state based on server response
      if (data.cart?.items) {
        setCart(data.cart.items);
      } else {
        // Fallback: Update local state manually
        const updatedCart = cart.map(item => {
          if (item.serviceId === serviceId) {
            return {
              ...item,
              quantity: newQuantity > 0 ? newQuantity : item.quantity
            };
          }
          return item;
        }).filter(item => item.quantity > 0);
        
        setCart(updatedCart);
      }
    } catch (error) {
      console.error("Cart update failed:", error.message);
      alert(error.message || "Failed to update cart.");
    }
  };

  const renderCartItem = (item) => (
    <li key={item.serviceId} className="cart-item">
      <div className="item-details">
        <span className="item-name">{item.name}</span>
        <span className="item-price">₹{item.price}</span>
      </div>
      <div className="item-quantity">
        <button
          onClick={() => changeCartQuantity(item.serviceId, -1)}
          className="quantity-btn"
          aria-label="Decrease quantity"
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span className="quantity-text">Quantity: {item.quantity}</span>
        <button
          onClick={() => changeCartQuantity(item.serviceId, 1)}
          className="quantity-btn"
          aria-label="Increase quantity"
        >
          +
        </button>
        <button
          onClick={() => changeCartQuantity(item.serviceId, -item.quantity)}
          className="remove-btn"
          aria-label="Remove item"
        >
          Remove
        </button>
      </div>
    </li>
  );


  return (
    <div className="gardening-page">
      <div className="main-content">
        <div className="service-list">
          <h2 className="gardening-section">
            Find Your Right {serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}
          </h2>
          <div>
           
            {/* Other content */}
          </div>
          {/* Local search input for this page */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search services..."
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="services-grid">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <div key={service.id} className="service-card">
                  <img src={service.image} alt={service.name} />
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <p className="price">₹{service.price}</p>
                  <button onClick={() => addToCart(service)}>Add to Cart</button>
                </div>
              ))
            ) : (
              <p className="no-results">No services found matching your search.</p>
            )}
          </div>
        </div>

        <div className="cart-section">
          <h3>Your Cart</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="cart-items-list">
              {cart.map(renderCartItem)}
            </ul>
          )}
          <div className="total-price">
            <strong>Total:</strong> ₹{totalPrice}
          </div>
          <button
            className="checkout-btn"
            disabled={cart.length === 0}
          >
            <Link
              to="/cart"
              className="checkout-btn"
            >
              Proceed to Cart
            </Link>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServicePage;