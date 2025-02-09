export default class CommentModel{

    constructor(id, userId, postId, content){
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }

    static createComment(commentData){
        let newComment = new CommentModel(
            comments.length + 1,
            commentData.userId,
            commentData.postId,
            commentData.content
        );

        comments.push(newComment);
        return newComment;
    }

    // Get all comments for a post
    static getPostComments(postId) {
        return comments.filter(comment => comment.postId === postId);
    }

    static updateComment(updateData){
        const comment = comments.find(comment => comment.id === updateData.id);
        if (!comment) {
            return null; // Comment not found
        }

        comment.content = updateData.content || comment.content;
        return comment;
    }

    static deleteComment(id){
        const commentIndex = comments.findIndex(comment => comment.id === id);
        if(commentIndex === -1){
            return false;
        }

        comments.splice(commentIndex, 1);
        return true; // Successfully deleted
    }

}

let comments = [
    new CommentModel(1, 1, 1, "First comment"),
    new CommentModel(2, 2, 1, "Second comment"),
    new CommentModel(3, 1, 2, "Comment on post 2"),
];