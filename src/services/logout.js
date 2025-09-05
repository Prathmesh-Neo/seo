import { useRouter } from "next/navigation";
import { logout_api } from "./auth";
import { useUser } from "@/app/AuthContext";
export default async function Logout() {
    const router = useRouter();
    const { setUser } = useUser();
    try {
        const res = await logout_api();
        if (res.status === 200) {
            localStorage.removeItem("user");
            router.push("/login");
        }
    } catch (error) {
        console.error("Logout failed:", error);
        setUser(null);
        localStorage.removeItem("user");
        router.push("/login");
    }
}