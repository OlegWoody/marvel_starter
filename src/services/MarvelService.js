import {useHttp} from "../hooks/http.hook";

const useMarvelService=()=>{
    const {loading, request, error, clearError, status, setStatus} = useHttp()
    // _apiBase='https://gateway.marvel.com:443/v1/public/characters';
    const _apiBase='https://gateway.marvel.com:443/v1/public/';
    // _apiKey='apikey=4a1cee68a845fc20042b5dc8b9523728';
    const _apiKey='apikey=729b5cdb5d9dcfb32ca407c6c566b080';
    const _baseOffset = 210;

    const getCharacterByName = async(name) =>{
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`)
        return res.data.results
    }

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getComics = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
    }

    const _transformComics = (comic) => {
        return {
            id: comic.id,
            homepage: comic.urls[0].url,
            name: comic.title,
			price: comic.prices[0].price
				? `${comic.prices[0].price}$`
				: "not available",
            thumbnail: comic.thumbnail.path + `.` + comic.thumbnail.extension,
            description: comic.description || "There is no description",
            pageCount: comic.pageCount
            ? `${comic.pageCount} p.`
            : "No information about the number of pages",
            language: comic.textObjects[0]?.language || "en-us",

        }
    }

    const _transformCharacter = (char) => {
        if(!char){
            return {error: true}
        }
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {status, 
        setStatus,
        loading,
        error, 
        clearError, 
        getAllCharacters, 
        getCharacter, 
        getAllComics, 
        getComics, 
        getCharacterByName
    }
}

export default useMarvelService;