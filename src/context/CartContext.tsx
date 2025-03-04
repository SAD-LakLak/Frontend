import React, {createContext, useContext, useState, useEffect, ReactNode} from "react";

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    count: number;
    finalPrice: number;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    updateQuantity: (id: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({children}) => {
    const initialCart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const [cart, setCart] = useState<CartItem[]>(initialCart);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const count = cart.length;

    const finalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((i) => i.id === item.id);
            if (existingItem) {
                return prevCart.map((i) =>
                    i.id === item.id ? {...i, quantity: i.quantity + item.quantity} : i
                );
            } else {
                return [...prevCart, item];
            }
        });
    };

    const removeFromCart = (id: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        setCart((prevCart) =>
            prevCart.map((item) => (item.id === id ? {...item, quantity} : item))
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{cart, count, finalPrice, addToCart, removeFromCart, clearCart, updateQuantity}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("Context not found!");
    }
    return context;
};
