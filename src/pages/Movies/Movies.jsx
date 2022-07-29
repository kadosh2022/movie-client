import Movie from '../../components/Movie';


function Movies({movies}) {
    return <>
        <Movie movie={movies} key={movies._id}/>
    </>

}

export default Movies;