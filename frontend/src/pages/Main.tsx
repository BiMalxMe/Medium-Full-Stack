import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Main = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/signin');
        }
        navigate('/blogs')
    }, [navigate]);

    return (
        <div>
            {/* Your main component content here */}
        </div>
    );
};
