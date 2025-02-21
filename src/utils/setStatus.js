import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Skeleton from '../components/skeleton/Skeleton';

const setStatusChar = (status, Component, data) =>{
    switch(status){
        case"waiting":
            return <Skeleton/>
            break;
        case "loading":
            return <Spinner/>
            break;
        case "confirned":
            return <Component data={data}/>
            break;
        case "error":
            return <ErrorMessage/>
            break;
        default:
            throw new Error(`Status is ${status}`)
    }
}

export default setStatusChar;