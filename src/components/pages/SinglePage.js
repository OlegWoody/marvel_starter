import './singleComicPage.scss';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { Helmet } from 'react-helmet';


const SinglePage = () => {
    
    const {comicId, charId} = useParams();
    const [comic, setComic] = useState(null);
    const [char, setChar] = useState(null)
    const {loading,error, clearError, getComics,getCharacter} = useMarvelService()
    useEffect(()=>{
        updateComic()
    }, [comicId, charId]);

    const updateComic = () =>{
        if(comicId){
            getComics(comicId)
            .then(onComicLoaded)
        } else if(charId){
            console.log(charId)
            getCharacter(charId)
            .then(onCharLoaded)
        }
    }

    const onComicLoaded = (comic) =>{
        setComic(comic)
    }

    const onCharLoaded = (char) =>{
        setChar(char)
    }


    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading  ? <Spinner/> : null
    const content = !(loading || error || !comic) ? <ViewComic comic={comic}/> : !(loading || error || !char) ? <ViewChar char={char}/> : null

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const ViewComic = ({comic}) =>{
    const {id,name,price,thumbnail,description,pageCount,language} = comic
    return(
        <div key={id} className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${name} comics book`}
                    />
                <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>
    )
}

const ViewChar =({char}) =>{
    const {id,name,description,thumbnail} = char

    return(
        <div key={id} className='single-comic'>
            <Helmet>
                <meta
                    name="description"
                    content={`${name} charapter of comics`}
                    />
                <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className='single-comic__char-img'/>
            <div>
                <h2 className='single-comic__char-name'>{name}</h2>
                <p className='single-comic__char-descr'>{description}</p>
            </div>
            <Link to='/' className="single-comic__back">Back to list</Link>
        </div>
    )

}

export default SinglePage;