import React, {createContext, useContext, useState, useEffect, ReactNode} from "react";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    count: number;
    finalPrice: number;
    discount: number;
    setDiscount: (value: number) => void;
    free_shipping: boolean;
    setFreeShipping: (value: boolean) => void;
    discount_code: string;
    setDiscountCode: (code: string) => void;
    addToCart: (item: CartItem) => void;
    subtractFromCart: (id: string) => void;
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
    const initialDiscount: number = parseFloat(localStorage.getItem("discount") || "0");
    const initialFreeShipping: boolean = JSON.parse(localStorage.getItem("free_shipping") || "false");
    const initialDiscountCode: string = localStorage.getItem("discount_code") || "";

    const [cart, setCart] = useState<CartItem[]>(initialCart);
    const [discount, setDiscount] = useState<number>(initialDiscount);
    const [free_shipping, setFreeShipping] = useState<boolean>(initialFreeShipping);
    const [discount_code, setDiscountCode] = useState<string>(initialDiscountCode);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem("discount", discount.toString());
    }, [discount]);

    useEffect(() => {
        localStorage.setItem("free_shipping", JSON.stringify(free_shipping));
    }, [free_shipping]);

    useEffect(() => {
        localStorage.setItem("discount_code", discount_code);
    }, [discount_code]);

    const count = cart.length;

    const finalPrice = Math.max(
        cart.reduce((total, item) => total + item.price * item.quantity, 0),
        0
    );

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

    const subtractFromCart = (id: string, quantity: number = 1) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === id ? {...item, quantity: item.quantity - quantity} : item
                )
                .filter((item) => item.quantity > 0)
        );
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
        setDiscount(0);
        setFreeShipping(false);
        setDiscountCode("");
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                count,
                finalPrice,
                discount,
                setDiscount,
                free_shipping,
                setFreeShipping,
                discount_code,
                setDiscountCode,
                addToCart,
                subtractFromCart,
                removeFromCart,
                clearCart,
                updateQuantity,
            }}
        >
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
