export default class UserModel{

    constructor(id, name, email, password){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static addUser(userDetails){
        if (this.getUser(userDetails.email)) {
            return null; // Email already exists
        }

        let newUser = new UserModel(
            users.length + 1,
            userDetails.name,
            userDetails.email,
            userDetails.password
        );

        users.push(newUser);
        return newUser;
    }

    static getAllUsers(){
        return users;
    }

    static getUser(email){
        return users.find((user) => user.email === email);
    }


}


let users = [
    new UserModel(1, "rushabh", "rushabh@gmail.com", 12345)
];

