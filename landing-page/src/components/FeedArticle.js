import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

// import Component from "react"

function FeedArticle({ author, title, ticker, date, link, image, blurb }) {
    console.log("Article link:", link);
    return (
        <div className="feed">
            {/* <Post 
            author = {author} // authoring site or person ??
            title = {title} // article title //
            ticker = {ticker} // {add percent change} ??
            date = {date} // might have to be reformatted //
            link = {link} // article link //
            image = {image} // the link of the article image //
            blurb = {blurb} /> */}
            
          <hr></hr>

        
            <Post 
            author = "Bob Roberts" // authoring site or person ??
            title = "Falling Stocks" // article title //
            ticker = "DIS ↑1.40%" // {add percent change} ??
            date = "Sep 14, 2024" // might have to be reformatted //
            link = "https://www.w3schools.com" // article link //
            image = "https://placehold.jp/256x256.png" // the link of the article image //
            blurb = "Lorem ipsum odor amet, consectetuer adipiscing elit. Libero ornare justo; in lacus tortor nullam varius sapien faucibus? Nisl netus tortor magna duis pulvinar enim. Facilisis vestibulum ullamcorper lacus mattis commodo malesuada finibus porttitor. Sociosqu euismod sociosqu volutpat praesent malesuada viverra tempus primis aptent. Sapien mauris ornare dapibus et commodo inceptos sapien. Taciti conubia risus nibh ante vehicula euismod morbi nulla. Feugiat condimentum sollicitudin, maecenas platea nulla dolor diam? Eros quisque cursus velit praesent lacinia gravida hac volutpat non..." />
            {/* In essence, pull the author, title, ticket, date, link, image, and start of the body */}
            {/* 585 characters */}
            {/* Change color of ticker based on stock change for the day */}
          <hr></hr>
            {/* <span>This is my first post!</span> */}
            <Post 
            author = "Bob Roberts" 
            title = "Falling Stocks" 
            ticker = "DIS ↑1.40%" // {add percent change}
            date = "Sep 14, 2024"
            link = "https://www.w3schools.com"
            image = "https://placehold.jp/300x150.png"
            blurb = "Lorem ipsum odor amet, consectetuer adipiscing elit. Libero ornare justo; in lacus tortor nullam varius sapien faucibus? Nisl netus tortor magna duis pulvinar enim. Facilisis vestibulum ullamcorper lacus mattis commodo malesuada finibus porttitor. Sociosqu euismod sociosqu volutpat praesent malesuada viverra tempus primis aptent. Sapien mauris ornare dapibus et commodo inceptos sapien. Taciti conubia risus nibh ante vehicula euismod morbi nulla. Feugiat condimentum sollicitudin, maecenas platea nulla dolor diam? Eros quisque cursus velit praesent lacinia gravida hac volutpat non..." />
            {/* Change color of ticker based on stock change for the day */}
          <hr></hr>
          <Post 
            author = "Bob Roberts" // authoring site or person ??
            title = "Falling Stocks" // article title //
            ticker = "DIS ↑1.40%" // {add percent change} ??
            date = "Sep 14, 2024" // might have to be reformatted //
            link = "https://www.w3schools.com" // article link //
            image = "https://placehold.jp/256x256.png" // the link of the article image //
            blurb = "Lorem ipsum odor amet, consectetuer adipiscing elit. Libero ornare justo; in lacus tortor nullam varius sapien faucibus? Nisl netus tortor magna duis pulvinar enim. Facilisis vestibulum ullamcorper lacus mattis commodo malesuada finibus porttitor. Sociosqu euismod sociosqu volutpat praesent malesuada viverra tempus primis aptent. Sapien mauris ornare dapibus et commodo inceptos sapien. Taciti conubia risus nibh ante vehicula euismod morbi nulla. Feugiat condimentum sollicitudin, maecenas platea nulla dolor diam? Eros quisque cursus velit praesent lacinia gravida hac volutpat non..." />
        </div>
           
          
    )
}

function Post(props) {
    return (
        <div className="post rounded-md p-6">
            <div>
            <a href={props.link} target="_blank" rel="noreferrer">
            <article className="flex flex-row p-8 hover:cursor-pointer rounded-lg hover:text-white transition duration-300 ease-in-out" style={{boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )', backgroundColor: 'rgb(234, 244, 245, 0.8)'}}>

                <div className="ArticleImage w-1/4 m-6 object-contain flex align-middle items-center justify-center" style={{ height: '256px'}}>
                    <img src={props.image} className="rounded-md" alt=""></img>
                </div>

                
                <div className="ArticleText w-3/4 p-8 flex flex-col text-left justify-between" >
                    <div className="ArticleTopText flex flex-row space-x-4 mb-2">
                        <p className="ArticleDate font-thin"> {props.date}</p>
                        {/* <time className="font-thin" datetime="2024-09-14">Sep 14, 2024</time> */}
                        <p className="ArticleTicker text-green-600 border-2 border-gray-300 rounded-lg px-1"> {props.ticker}</p>
                        <div className="inline-block"><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></div>
                    </div>
                    <div className="ArticleMidText">
                        <h3 className="ArticleTitle font-bold pb-5 text-2xl">{props.title}</h3>
                        <p className="ArticleBlurb text-ellipsis">{props.blurb}</p>
                    </div>
                    <div className="ArticleBottom">
                        <p className="ArticleAuthor font-semibold text-lg">{props.author}</p>
                    </div>
                </div>

            </article>
            </a>
            </div>

            {/* <div className="Image">
                <img className="ArticlePic"
                // src={props.author.avatarUrl}
                // alt={props.author.name}
                />
            <div className="Date">
               
                {props.date} </div>
            <div className="Title">
                {props.title} </div>
            <div className="Author">
                {props.author} </div>
            <div className="Blurb">
                {props.blurb} </div>
            </div> */}
            
        </div>
        )
}


  export default FeedArticle;

//   class Post extends Component {
//     render() {
//       return (
//         <div className="post">
//           <span>{this.props.content}</span>
//         </div>
//       )
//     }
//   }
  
  