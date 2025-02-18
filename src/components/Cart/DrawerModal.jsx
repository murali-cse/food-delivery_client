import React, { useState,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { useDispatch,useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import BottomCartBar from "./BottomCartBar";
import { formatPrice } from "../../utils/formatPrice";

const drawerVariants = {
  hidden: {
    x: "100%",
    opacity: 0,
    rotateY: 30,
    scale: 0.95,
  },
  visible: {
    x: 0,
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1], // Smooth cubic-bezier for a breezy effect
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    rotateY: -30,
    scale: 0.95,
    transition: {
      duration: 1.1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1], // Smooth fade-in for overlay
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const chipVariants = {
  hidden: {
    opacity: 0,
    transform: "scale(0.8) translateY(20px)", // Start small and lower
  },
  visible: (custom) => ({
    opacity: 1,
    transform: "scale(1) translateY(0)", // Grows to full size and moves up
    transition: {
      delay: custom * 0.1, // Slight delay for cascading effect
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1], // Smooth cubic-bezier easing
    },
  }),
  hover: {
    transform: "scale(1.08)", // Slight growth for a hover effect
    boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)", // Adds a shadow for depth
    transition: {
      duration: 0.5,
      ease: "easeOut", // Subtle easing for hover
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.03, // Very subtle enlargement
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)", // Soft shadow for subtle depth
    transition: {
      duration: 0.3, // Shorter and more fluid
      ease: "easeOut", // Natural easing
    },
  },
  tap: {
    scale: 0.97, // Slight shrink for tactile feedback
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Lighter shadow for pressed state
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const DrawerModal = ({ isOpen, onClose, selectedItem }) => {
console.log("selectedItem", selectedItem)
  const dispatch = useDispatch();
// Fetch existing cart item details (if already added)
const existingItem = useSelector((state) =>
  state.cart.items.find((item) => item.id === selectedItem?.id)
);
  const [selectedAddOns, setSelectedAddOns] = useState({});

// States
const [quantity, setQuantity] = useState(existingItem ? existingItem.quantity : 1);
const [selectedToppings, setSelectedToppings] = useState(existingItem?.toppings || []);
const [selectedDips, setSelectedDips] = useState(existingItem?.dips || []);
const [selectedDrinks, setSelectedDrinks] = useState(existingItem?.drinks || []);
const [instructions, setInstructions] = useState(existingItem?.instructions || "");
const [showCartBar, setShowCartBar] = useState(false);

// Reset states when `selectedItem` changes
useEffect(() => {
  setQuantity(existingItem ? existingItem.quantity : 1);
  setSelectedToppings(existingItem?.toppings || []);
  setSelectedDips(existingItem?.dips || []);
  setSelectedAddOns({});

  setSelectedDrinks(existingItem?.drinks || []);
  setInstructions(existingItem?.instructions || "");
}, [selectedItem, existingItem]);

// Quantity change handler
const handleQuantityChange = (type) => {
  setQuantity((prev) => (type === "increment" ? prev + 1 : Math.max(1, prev - 1)));
};
const handleAddOnSelect = (addOnId, itemId, isMultiSelect, selectUpto) => {
  setSelectedAddOns((prev) => {
    const currentSelections = prev[addOnId] || [];

    if (isMultiSelect) {
      // If already selected, remove it
      if (currentSelections.includes(itemId)) {
        return { ...prev, [addOnId]: currentSelections.filter((id) => id !== itemId) };
      }
      // If limit reached, prevent adding more
      if (currentSelections.length >= selectUpto) {
        return prev;
      }
      // Add new selection
      return { ...prev, [addOnId]: [...currentSelections, itemId] };
    } else {
      // If single select, replace the selection
      return { ...prev, [addOnId]: [itemId] };
    }
  });
};

const clearSelectedAddOns = (addOnId) => {
  setSelectedAddOns((prev) => {
    const newSelection = { ...prev };
    delete newSelection[addOnId];
    return newSelection;
  });
};
// Add to Cart Handler
const handleAddToCart = () => {
  if (selectedItem) {
    const updatedItem = {
      ...selectedItem,
      quantity,
      toppings: selectedToppings,
      dips: selectedDips,
      drinks: selectedDrinks,
      instructions,
    };
    dispatch(addToCart(updatedItem));
    setShowCartBar(true);
    onClose(); // Close the drawer
  }
};


const handleCloseCartBar = () => {
  setShowCartBar(false);
};

const handleRemoveAddon = (addOnId, itemId) => {
  setSelectedAddOns((prev) => ({
    ...prev,
    [addOnId]: prev[addOnId].filter((id) => id !== itemId),
  }));
};


  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 z-[9998] backdrop-blur-md "
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className={`fixed 
  top-0 sm:top-16 
  md:top-0 right-0 
  w-full max-w-md 
  h-full 
  bg-white shadow-xl 
  z-[9999] rounded-t-xl 
  md:rounded-none 
  overflow-visible`}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="h-full flex flex-col">
              {/* Sticky Header */}
              <motion.div
                className="sticky top-0 bg-white px-4  py-3 md:py-5 shadow-sm z-[9999]text-center border-b border-gray-200"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <h3 className="text-md md:text-xl font-semibold text-gray-800">
                  {selectedItem?.name}
                </h3>
                {/* Selection Limit Condition */}
   {selectedItem?.description &&   <p className="text-xs md:text-sm text-gray-500 mt-1">
                  {selectedItem?.description}
                </p> }
              
                {selectedItem?.rating &&   <p className="text-xs md:text-lg text-green-600 font-medium mt-1">
                  {selectedItem?.rating} ⭐ • 30 min
                </p>}
              
                {/* Close Button */}
                <motion.button
                  className="absolute -top-0 md:-top-0  right-0 bg-primary text-white w-8 h-8 rounded-md lg:rounded-full shadow-lg flex items-center justify-center md:m-3 z-50"
                  // className="absolute -top-6 right-0 bg-primary text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center border-4 border-white z-50"
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ✕
                </motion.button>
              </motion.div>

              {/* Content */}
              <motion.div
                className="px-4 py-6 flex-1 overflow-y-scroll no-scrollbar"
                initial="hidden"
                animate="visible"
              >
{selectedItem?.add_ons?.length > 0 && selectedItem.add_ons.map((addOn) => (
  <div key={addOn.id} className="mb-6">
    {/* Add-on Name */}
    <h4 className="font-semibold text-gray-800 mb-2">{addOn.name}</h4>

    {/* Selection Limit Condition */}
    <p className="text-xs md:text-sm text-gray-500 mb-3">
      {addOn.is_multi_select ? `Select up to ${addOn.select_upto} ${addOn.name}` : `Select 1 ${addOn.name}`}
    </p>

    {/* Add-on Options */}
    <div className="flex flex-wrap gap-2">
      {addOn.items.map((item) => {
        const isSelected = selectedAddOns[addOn.id]?.includes(item.id);
        const isLimitReached = addOn.is_multi_select && selectedAddOns[addOn.id]?.length >= addOn.select_upto;

        return (
          <button
            key={item.id}
            onClick={() => handleAddOnSelect(addOn.id, item.id, addOn.is_multi_select, addOn.select_upto)}
            disabled={isLimitReached && !isSelected} // Disable button if limit is reached
            className={`px-3 py-1 rounded border transition ${
              isSelected ? "bg-red-500 text-white border-red-500" : "bg-gray-100 text-gray-800 border-gray-300"
            } ${isLimitReached && !isSelected ? "opacity-50 cursor-not-allowed" : ""}`} // Gray out extra selections
          >
            {item.name} (+{formatPrice(item.price)})
          </button>
        );
      })}
    </div>

    {/* Display Selected Add-ons */}
    {selectedAddOns[addOn.id]?.length > 0 && (
      <div className="mt-2 flex flex-wrap gap-2">
        {selectedAddOns[addOn.id].map((id) => {
          const selectedItem = addOn.items.find((i) => i.id === id);
          return (
            <span key={id} className="px-2 py-1 bg-red-100 text-red-600 rounded-full flex items-center">
              {selectedItem.name}
              <FaTimes className="ml-1 cursor-pointer" onClick={() => handleRemoveAddon(addOn.id, id)} />
            </span>
          );
        })}
        <button onClick={() => clearSelectedAddOns(addOn.id)} className="text-red-500 underline text-sm">
          Clear
        </button>
      </div>
    )}
  </div>
))}

                {/* Notes Section */}
                <div className="mb-6 text-sm md:text-lg ">
                  <h4 className="font-semibold  text-gray-800 mb-1">
                    Special Instructions
                  </h4>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Add any notes for the chef (e.g., allergies, preferences)."
                    className="w-full p-4 border-2 border-gray-300 rounded-lg bg-gray-50 focus:border-primary focus:ring-primary focus:outline-none transition"
                    rows="3"
                  ></textarea>
                </div>
              </motion.div>

              {/* Footer */}
              <motion.div
                className="flex items-center justify-between border-t border-gray-200 px-4 py-3"
                initial="hidden"
                animate="visible"
              >
                <div className="flex  items-center space-x-2">
                  <motion.button
                    onClick={() => handleQuantityChange("decrement")}
                    className="w-6 h-6 md:w-8 md:h-8 bg-primary text-white rounded-full shadow-md flex items-center justify-center hover:bg-opacity-90 transition-transform active:scale-95"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <FaMinus size={12} />
                  </motion.button>

                  <motion.span
                    className="px-2 md:px-3 py-0 md:py-1 text-base font-medium text-gray-800 bg-gray-100 rounded-md border border-gray-300"
                    variants={chipVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                  >
                    {quantity}
                  </motion.span>

                  <motion.button
                    onClick={() => handleQuantityChange("increment")}
                    className="w-6 h-6 md:w-8 md:h-8 bg-primary text-white rounded-full shadow-md flex items-center justify-center hover:bg-opacity-90 transition-transform active:scale-95"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <FaPlus size={12} />
                  </motion.button>
                </div>

                <motion.button
                  className="bg-primary text-white px-2 md:px-5 py-3 rounded-lg font-bold text-xs md:text-sm hover:bg-opacity-90 shadow-lg transition"
                  onClick={handleAddToCart}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                   Add to Cart • {formatPrice(selectedItem?.price * quantity)}
               
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
            <BottomCartBar isVisible={showCartBar} onClose={handleCloseCartBar} />

    </AnimatePresence>
  );
};

export default DrawerModal;
