import React, {createContext, useContext, useState, useEffect, ReactNode} from "react";

interface CartItem {
    id: string,
    name: string,
    total_price: number,
    quantity: number,
}

export interface Package {
    id: string,
    name: string,
    total_price: number,
    image: string,
    is_active: boolean,
    summary: string,
    creation_date: Date,
    description: string,
    score: string,
    target_group: string,
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    updateQuantity: (id: number, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({children}) => {
    const initialCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const [cart, setCart] = useState<CartItem[]>(initialCart);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

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

    const removeFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        setCart((prevCart) =>
            prevCart.map((item) => (item.id === id ? {...item, quantity} : item))
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart, updateQuantity}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart باید داخل CartProvider استفاده شود.");
    }
    return context;
};
