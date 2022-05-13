import React,{useEffect,useState} from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";









const News =(props)=> {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
  
  const capitalizeFirstLetter =(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
   
    const updateNews=async()=>{
      props.setProgress(10)
      const url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=c8ca40c8ae774e5594341dda8543b602&page=${page}&pageSize=${props.pageSize}`;
     
      setLoading(true)
      let data= await fetch(url);
      props.setProgress(30)
      let parsedDaate= await data.json();
      props.setProgress(50)
      console.log(parsedDaate);
      setArticles(parsedDaate.articles)
      setTotalResults(parsedDaate.totalResults)
      setLoading(false)

    props.setProgress(100)

    }
    useEffect(() => {
      document.title=`${capitalizeFirstLetter(props.category)} - National News`;
      updateNews();
      
    
    }, [])
    
   
     const handlePrivousClick= async()=>{
      // let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=c8ca40c8ae774e5594341dda8543b602&page=${page-1}&pageSize=${props.pageSize}`;
      // setState({loading:true})
      // let data= await fetch(url);
      // let parsedDaate= await data.json();
      // console.log(parsedDaate);
      // // setState({articles:parsedDaate.articles})
      // setState({
      //   page:page - 1,
      //   articles:parsedDaate.articles,
      //   loading:false
      // })
      
      setPage(page - 1)

      updateNews();

    }
    const handleNextClick= async()=>{
      // console.log("Next")
      // if(!(page + 1>Math.ceil(totalResults/props.pageSize))){
      //   let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=c8ca40c8ae774e5594341dda8543b602&page=${page+1}&pageSize=${props.pageSize}`;
      //   setState({loading:true})
      //   let data= await fetch(url);
      //   let parsedDaate= await data.json();
      //   // setState({loading:false})
      //   // setState({articles:parsedDaate.articles})
      //   setState({
      //     page:page + 1,
      //     articles:parsedDaate.articles,
      //     loading:false
      //   })
      
      setPage(page + 1)
      updateNews();
    }

      // else{
      //   let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=c8ca40c8ae774e5594341dda8543b602&page=${page+1}&pageSize=${props.pageSize}`;
      //   let data= await fetch(url);
      //   let parsedDaate= await data.json();
      //   console.log(parsedDaate);
      //   // setState({articles:parsedDaate.articles})
      //  setState({
      //     page:.state.page + 1,
      //     articles:parsedDaate.articles
      //   })
      // }
       const fetchMoreData = async () => {
        
        const url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=c8ca40c8ae774e5594341dda8543b602&page=${page+1}&pageSize=${props.pageSize}`;
        // setState({loading:true})
        setPage(page + 1)
        let data= await fetch(url);
        let parsedDaate= await data.json();
        setArticles(articles.concat(parsedDaate.articles))
        setTotalResults(parsedDaate.totalResults)
        
      };
    
    return (
      <>
        <h3 className="text-center" style={{margin:"30px", marginTop:"60px"}}>National News Top   {capitalizeFirstLetter(props.category)} Headlines</h3>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !==totalResults}
          loader={<Spinner/>}
        >
          <div className="container">

        <div className="row">
        {articles.map((element)=>{

          return  <div className="col-md-4" key={element.url}>
            <NewsItems  title={element.title?element.title.slice(0, 20):""} description={element.description?element.description.slice(0, 50):" "} imageUrl= {element.urlToImage}   newsUrl={element.url}  author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>

        })}
          
          </div>
          </div>
        </InfiniteScroll>
        
          {/* <div className="container d-flex justify-content-between">
          <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrivousClick}> &larr; Privous</button>
          <button disabled={page + 1>Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}> Next  &rarr;</button>
          </div>
           */}
          
        </>
      
    );
  
}
News.defaultProps = {
  country:"in",
  pageSize: 8,
  category:"general",
}
News.defaultProps = {
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string,
}

export default News;
