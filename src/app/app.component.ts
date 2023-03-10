import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedPosts = []

  onPostAdded(post: Event){
    this.storedPosts.push(post)
  }
}
