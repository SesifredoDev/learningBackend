import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

import {Subscription } from 'rxjs'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{

  // posts = [
  //   {title:"First Post", content:"this is the content"},
  //   {title:"Second Post", content:"this is the content"},
  //   {title:"Third Post", content:"this is the content"},
  // ]
  posts: Post[] = [];
  public postsSub : Subscription;

  constructor(private postsService: PostsService){}
  
  ngOnInit(): void {
    this.postsService.getPosts();  
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[])=>{
        console.log(posts)
        this.posts = posts
    });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();  
  }
  onDelete = (postId: string) =>{
    this.postsService.deletePost(postId)
  }

}
