import { useState } from "react"
import { useEffect } from "react"

const ShowDetails = ({match})=>{

    const [movie, setMovie] = useState(null)
    const [comments,setComments] = useState([])

   useEffect(()=>{
       const movies = async ()=>{
           let id= match.params.imdbID
           if(id){
               let response= await fetch(' http://www.omdbapi.com/?i=tt3896198&apikey=d43ffb59&i=' + id)
               let data= await response.json()
               setMovie(data)
           }
       }
       movies()
   },[match.params.imdbID])

   useEffect(()=>{
    const getComment = async ()=>{
        let id= match.params.imdbID
        if(id){
            let response= await fetch('https://striveschool-api.herokuapp.com/api/comments/' + id,{
                headers:{
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjVlZDJkNTI2MjAwMTViNmRjOTQiLCJpYXQiOjE2MzM1Mjg3MzksImV4cCI6MTYzNDczODMzOX0.lnYsajOBTRoPNpjzbJm2u2bM-Rn5pX9moDCQtTm1zds"

                },
            })
            let comment= await response.json()
            setComments(comment)
        }
    }
    getComment()
   },[match.params.imdbID])


    return(
        <>
        <h2 className='text-light text-center my-5'>Movie Details...</h2>
        {
            movie && (<div className="text-center text-light mb-5">
                <img src={movie.Poster} alt="movie poster" />
                <h4 className="mt-3">{movie.Title} ( {movie.Actors} )</h4>
                <div><p>{movie.Released} - {movie.Runtime}</p></div>
                <p>{movie.Plot}</p>
                <ul style={{listStyle:'none'}}>
                    <h5 style={{textDecoration:'underline'}}>Comments</h5>
                    {
                        comments.map(c =>
                            <li key={c._id}>{c.comment}</li>
                        )
                    }
                </ul>

            </div>)
        }
        </>
    )
}
export default ShowDetails