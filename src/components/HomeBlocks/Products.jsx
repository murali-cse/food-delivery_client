import React, { useState, forwardRef } from "react";
import DrawerModal from "../Cart/DrawerModal";
import { motion } from "framer-motion";
import { FaPlus,FaChevronDown } from "react-icons/fa";

// Static Data for All Items
const items = [
    {
      id: 1,
      name: "Pizza Meal For 1 (10\")",
      price: "£10",
      description: "2 toppings, dip, chips and free can of drink",
      img: "assets/delicious-pizza-studio 1.png",
      rating: "4.5",
      reviews: "1K Reviews",
      popular: true,
      toppings: ["Mushroom", "Chicken", "Pepperoni", "Sweetcorn", "Onions", "Green Peppers"],
      dips: ["Curry", "Gravy", "Garlic", "Chilli", "Mint Sauce"],
      drinks: ["Coca Cola", "Diet Coke", "Fanta Orange", "Sprite"],
    },
    {
      id: 2,
      name: "Pizza Meal For 2 (12\")",
      price: "£14",
      description: "2 toppings, chips, dip and 2 free cans",
      img: "assets/delicious-pizza-studio (2) 1.png",
      rating: "4.5",
      reviews: "1K Reviews",
      popular: true,
      toppings: ["Tuna", "Bacon", "Jalapenos", "Kebab", "Salami", "Sweetcorn"],
      dips: ["House", "Garlic", "Chilli", "Barbecue", "Honey Mustard"],
      drinks: ["Coca Cola", "Diet Coke", "Coke Zero", "Pepsi", "7UP"],
    },
    {
      id: 3,
      name: "10\" Munch Box",
      price: "£11",
      description: "Lamb kebab, 2x wings, 2x nuggets, 2x chicken...",
      img: "assets/appetizing-kofta-kebab-meatballs-with-sauce-tortillas-tacos-white-plate 1.png",
      rating: "4.5",
      reviews: "1K Reviews",
      popular: true,
      toppings: ["Lamb", "Chicken", "Nuggets", "Wings", "Cheese", "Pickles"],
      dips: ["Curry", "Garlic", "Hot Sauce", "Mayonnaise"],
      drinks: ["Sprite", "Coca Cola", "Diet Coke", "Fanta Orange"],
    },
    {
      id: 4,
      name: "Special Pizza Meal...",
      price: "£20",
      description: "2 toppings, large chips, french garlic bread, 2 dips...",
      img: "assets/top-view-whole-pepperoni-pizza-with-sesame-sprinkles-top 1.png",
      rating: "4.5",
      reviews: "1K Reviews",
      popular: false,
      toppings: ["Salami", "Olives", "Peppers", "Chicken", "Mushrooms", "Sweetcorn"],
      dips: ["House", "Garlic", "Barbecue", "Ranch", "Ketchup"],
      drinks: ["Coke Zero", "Fanta Orange", "Pepsi", "Mountain Dew"],
    },
    {
      id: 5,
      name: "Burger Meal For 2",
      price: "£16",
      description: "2x burgers (chicken with cheese or 1/4lb cheese...",
      img: "assets//burger-with-fries-cherry-tomatoes 1.png",
      rating: "4.5",
      reviews: "1K Reviews",
      popular: false,
      toppings: ["Cheese", "Lettuce", "Tomato", "Pickles", "Onions", "Bacon"],
      dips: ["Ketchup", "Mayonnaise", "Mustard", "Ranch"],
      drinks: ["Coca Cola", "Sprite", "Water", "Diet Coke"],
    },
    {
      id: 6,
      name: "Big Family x2 Pizza...",
      price: "£16",
      description: "2 toppings, 2 chips, x4 goujons, 2 dips and 1.25l...",
      img: "assets/pizza-pizza-filled-with-tomatoes-salami-olives 1.png",
      rating: "4.5",
      reviews: "1K Reviews",
      popular: false,
      toppings: ["Pepperoni", "Cheese", "Sweetcorn", "Jalapenos", "Mushrooms", "Chicken"],
      dips: ["Garlic", "Chilli", "Barbecue", "Honey Mustard", "Ranch"],
      drinks: ["Coca Cola", "Diet Coke", "Sprite", "Fanta Orange"],
    },
  ];

const Products = forwardRef((props, ref) => {
  const [visibleItems, setVisibleItems] = useState(6);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 3);
  };

  const handleAddItem = (item) => {
    setSelectedItem(item);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="px-4 sm:px-8 py-8 mt-8 bg-gray-50">
      <h2 ref={ref} className="text-lg md:text-2xl font-bold mb-6 text-gray-800">
        Meals
      </h2>
      <motion.div
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6"
  initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {items.slice(0, visibleItems).map((item) => (
          <motion.div
            key={item.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-transform duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              {item.popular && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Popular
                </span>
              )}
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-4 flex flex-col">
              <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={i < Math.round(item.rating) ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className={`w-4 h-4 ${
                      i < Math.round(item.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.027 6.254a1 1 0 00.95.69h6.614c.969 0 1.371 1.24.588 1.81l-5.351 3.89a1 1 0 00-.364 1.118l2.027 6.254c.3.921-.755 1.688-1.54 1.118l-5.351-3.89a1 1 0 00-1.175 0l-5.351 3.89c-.784.57-1.84-.197-1.54-1.118l2.027-6.254a1 1 0 00-.364-1.118l-5.351-3.89c-.783-.57-.38-1.81.588-1.81h6.614a1 1 0 00.95-.69l2.027-6.254z"
                    />
                  </svg>
                ))}
                <span className="ml-2 text-green-600 font-semibold">
                  {item.rating}
                </span>
                <span className="ml-2 text-gray-500">{item.reviews}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2 truncate">
                {item.description}
              </p>
              <div className="flex justify-between items-center mt-4">
                                  <span className="text-red-500 font-bold text-lg">
                                    {item.price}
                                  </span>
                                  <button
                                    onClick={() => handleAddItem(item)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition flex items-center"
                                  >
                                    <FaPlus className="mr-2" />
                                    Add Item
                                  </button>
                                </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      {visibleItems < items.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleShowMore}
            className="bg-red-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-red-600 flex items-center"
          >
            Show more
            <FaChevronDown className="ml-2" />
          </button>
        </div>
      )}

      <DrawerModal
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        selectedItem={selectedItem}
      />
    </div>
  );
});

export default Products;
