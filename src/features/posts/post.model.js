export default class PostModel{
    constructor(id, userId, caption, imageUrl){
        this.id = id;
        this.userId = userId;
        this.caption = caption;
        this.imageUrl = imageUrl;
    }

    static addPost(postData){
        let newPost = new PostModel(
            posts.length + 1,
            postData.userId,
            postData.caption,
            postData.imageUrl
        );

        posts.push(newPost);
        return newPost;
    }

    static getAllPosts(){
        return posts;
    }

    static getUserPosts(userId){
        return posts.find(post => post.userId === userId);
    }

    static getPostById(id){
        return posts.find(post => post.id === id);
    }

    static updatePost(updateData){
        var post = posts.find(post => post.id === updateData.id);
        if(!post){
            return null;
        }

        const {caption, imageUrl} = updateData;
        post.caption = caption || post.caption;
        post.imageUrl = imageUrl || post.imageUrl;

        return post;
    }

    static deletePost(id){
        var postIndex = posts.findIndex(post => post.id === id);
        if(postIndex === -1){
            return false;
        }

        posts.splice(postIndex, 1);
        return true;
    }

    static filterByCaption(caption) {
        return posts.filter(post => post.caption.toLowerCase().includes(caption.toLowerCase()));
    }
}

let posts = [
    new PostModel(1, 1, "First Post", "/img.jpg"),
    new PostModel(2, 2, "Second Post", "/img2.jpg"),
];
