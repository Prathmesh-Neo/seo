// "use client"
// import { logout_api } from "@/services/auth";

// import { useContext, createContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState();

//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) setUser(JSON.parse(storedUser));
//     }, []);

//     useEffect(() => {
//         if (user) {
//             localStorage.setItem("user", JSON.stringify(user));
//         } else {
//             localStorage.removeItem("user");
//         }
//     }, [user]);

//     const login = (data) => {
//         setUser(data);
//     }

//     const logout = async () => {
//         try {
//             const res = await logout_api();
//             if (res.status === 200) {
//                 setUser(null);
//                 localStorage.removeItem("user");
//                 window.location.reload();
//             }
//         } catch (error) {
//             console.error("Logout failed:", error);
//         }
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }


// export const useUser = () => useContext(AuthContext);

"use client"
import LogoutUser from "@/services/logout";
import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
        setLoading(false);
    }, []);


    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const login = (data) => {
        setUser(data);
    };

    const logout = async () => {
        LogoutUser();
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useUser = () => useContext(AuthContext);
