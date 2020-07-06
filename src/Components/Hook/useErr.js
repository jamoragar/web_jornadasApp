import {useState} from 'react';

const useErr = () => {
    const [err, setErr] = useState({
        code:'ERR',
        message:'Error'
    });
    return {
        err,
        setErr
    };
};
 
export default useErr;