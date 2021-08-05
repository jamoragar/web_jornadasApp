import {useState} from 'react';

const useAuthenticated = () => {
    const [authenticated, setAuthenticated] = useState(null);
    console.log(authenticated)
    return {
        authenticated,
        setAuthenticated
    };
}
 
export default useAuthenticated;