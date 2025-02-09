export default class LikeModel{

    constructor(id, userId, postId){
        this.id = id;
        this.userId = userId;
        this.postId = postId;
    }

    // Get all likes for a post
    static getLikes(postId) {
        return likes.filter(like => like.postId === postId);
    }

    static toggleLike(userId, postId){
        const existingLikeIndex = likes.findIndex(like => like.userId === userId && like.postId === postId);
        
        if (existingLikeIndex !== -1) {
            // Remove the like if it exists
            const removedLike = likes.splice(existingLikeIndex, 1)[0];
            return { added: false, like: removedLike };
        } else {
            // Add a new like
            const newLike = new LikeModel(likes.length + 1, userId, postId);
            likes.push(newLike);
            return { added: true, like: newLike };
        }
    }

}

let likes = [
    new LikeModel(1, 1, 1),
    new LikeModel(2, 2, 1),
    new LikeModel(3, 3, 2),
  ];