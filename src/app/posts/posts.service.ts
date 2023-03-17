import { Injectable } from "@angular/core";
import {map, Subject} from 'rxjs';
import { Post } from "./post.model";
import {HttpClient} from '@angular/common/http'

@Injectable({providedIn: 'root'})


export class PostsService{
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();
    private url = "http://localhost:3000/api/posts/"

    constructor(private http: HttpClient){}

    getPosts(){
        this.http
            .get<{message:string, posts: any}>(this.url)
            .pipe(map((postData)=>{
                return postData.posts.map((post:any) => {
                    return {
                        title: post.title,
                        content: post.content,
                        id: post._id
                    }
                })
            }))
            .subscribe((changedPosts) => {
                this.posts = changedPosts;
                this.postsUpdated.next([... this.posts]);
            })
    }

    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    addPost(post: Post){
        this.http.post<{message:string, postId: string}>(this.url, post).subscribe(response =>{
            console.log(response)
            const id = response.postId
            post.id = id
            this.posts.push(post); 
            this.postsUpdated.next([...this.posts]);
        })
        
    }
    deletePost(postId: string){
        this.http.delete<{message:string}>(this.url + postId)
            .subscribe(response =>{
                const updatedPosts = this.posts.filter(post => post.id !== postId)
                this.posts = updatedPosts
                this.postsUpdated.next([...this.posts])
            })
    }
}