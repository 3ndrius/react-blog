import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import CategoryNav from './../Layout/CategoryNav'
import '../css/Main.css';
import Category from './Category';
import Loader from '../Layout/Loader';
import Button from './Button';

 class Main extends Component {
  render() {
  const { posts } = this.props.posts;
  const postList = posts.length ? (
      posts.map((post)=> {
          return(
              <div key={post._id} className="card-wrap">
               <span className="pos">
               <img src={post.metadata.image.url} alt=""/>
               </span>
              <div className="card">
               <Link to={'/' + post.slug}> <h2 className="card-title">{post.title}</h2></Link>
          {post.metadata.snipped && <p className="card-body" dangerouslySetInnerHTML={{__html:post.metadata.snipped}}></p> }
               <span className="date">{post.created_at}</span>
                
              </div>
            </div>
          )
      })

  ) 
  : 
  (
      // <div className="text-center"> No posts yet </div>
     <Loader />
  )
  return (
    <div>
      <CategoryNav />
      <div className="content-wrap">
        {postList}
      </div>
      <hr/>
      {
      this.props.posts.ads ?
      <div className="page">
        <div className="page-overlay">
          <h1>{ this.props.posts.ads.title}</h1>
          <p dangerouslySetInnerHTML={{__html:this.props.posts.ads.content}} ></p>
          <Button title={"See more"} />
        </div>
        <img className="ads-image" src={this.props.posts.ads.metadata ? this.props.posts.ads.metadata.image.url : "#" } alt="img"/>
        </div>
        :
        <p>No page</p>
        }
        <div>
       { posts && <h2 className="category-title">FILM</h2>}
          <hr/>
          <Category />
        </div>
      
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  
  return{
    posts: state.posts,
    ads: state.ads,
  }
}
export default connect(mapStateToProps)(Main);