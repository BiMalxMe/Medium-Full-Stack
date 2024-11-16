import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Main = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        // Check if token is valid and includes "Bearer"
        if (!token || !token.includes('Bearer ')) {
            navigate('/signin');  // Navigate to signin if token is invalid
        } else {
            navigate('/blogs');  // Or wherever the user should go if the token is valid
        }
    }, [navigate]);
    

    return (
        <div>
            Loading..............
        </div>
    );
};
