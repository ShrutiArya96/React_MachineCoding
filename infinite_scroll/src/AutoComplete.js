import InfiniteScroll from "./InfiniteScroll";
import { useState, useRef, useCallback } from 'react'
import './Autocomplete.css'

export default function AutoComplete() {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [moviesList, setMoviesList] = useState(null);
    const fetchController = useRef(null);
    const searchBoxRef = useRef(null);

    const fetchData = async (page, searchQuery) => {
        try {
            if(fetchController.current) {
                fetchController.current.abort();
            }
            fetchController.current = new AbortController();
            let data = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=52c34330a05320a7628d303efe0e4a87&language=en-US&query=${searchQuery}&page=${page}`,
            {signal: fetchController.current.signal});
            data = await data.json();
            data = data.results;
            setMoviesList((prevList) => {
                if(prevList){ return [...prevList, ...data]} else {return data}
            });
        } catch(err) {
            if(fetchController.signal && fetchController.signal.aborted) {
                console.log('user aborted')
            } else {
                console.log('request failed')
            }
        }
    }

    const onReachingEnd = () => {
        fetchData(page+1, query);
        setPage(page+1);
    };

    const clearSearch = () => {
        searchBoxRef.current.value = '';
        searchBoxRef.current.focus();
        setQuery('');
        setMoviesList(null);
    }

    const optimisedSetQuery = (() => {
        let timer = null;
        return function (evt) {
            if(timer) clearTimeout(timer);
            timer = setTimeout(() => {
                setQuery('');
                setMoviesList(null);
                if(evt.target.value.length > 0) {
                    setQuery(evt.target.value);
                    fetchData(page, evt.target.value);
                }
            }, 300);
        }
    })()

    const listRenderer = useCallback(() => {
        return moviesList.map(movie => {
            return <div className='movie-container' key={movie.id}>
                        <div className='movie-title'>{movie.title || movie.name}</div>
                    </div>
        })
    }, [moviesList]);

    const renderEmptyState = () => {
        return <><h1>No movies match the searched text!</h1></>
    }

    return (
        <>
            <div>
                <input type='text' ref={searchBoxRef} className="autocomplete-box" onChange={(evt) => optimisedSetQuery(evt)}/>
                <span className="cancel" onClick={clearSearch}>X</span>
            </div>
            {
                moviesList && moviesList.length > 0 && <InfiniteScroll scrollEndCallback={onReachingEnd} listRenderer={listRenderer}></InfiniteScroll>
            }
            {
                moviesList && moviesList.length == 0 && renderEmptyState()
            }
        </>
    )
}