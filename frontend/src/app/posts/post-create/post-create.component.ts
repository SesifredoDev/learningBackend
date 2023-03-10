import { Component } from "@angular/core";


@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',

})
export class PostCreateComponent{
    addNewPost(){
        alert("Post Added")
    }
    
}