import React  from "react";

const NewsItems=(props)=> {
  
    let { title, description, imageUrl, newsUrl, author, date ,source} = props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{display:"flex", justifyContent:"flex-end", position:"absolute", right:0}}>
          <span className=" badge rounded-pill bg-danger" >
                {source}</span>
          </div >
          
          
          <img
            src={
              !imageUrl
                ? "https://images.news18.com/ibnlive/uploads/2021/08/national-flag-16289132954x3.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h4 className="card-title">
              {title}...
            </h4>  
                
              
            

            <p className="card-text" style={{ fontSize: "15px" }}>
              {description}...
            </p>
            <p className="card-footer" style={{ fontSize: "12px" }}>
              <small className="text-muted">
                By {!author ? "unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>

            <a
              rel="noreferrer"
              href={newsUrl}
              target="-blank"
              className="btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItems;
