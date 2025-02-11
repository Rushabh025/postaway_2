import server from "./app.js";
import connectDB from "./config/db.js";

server.listen(3000, async () => {
    console.log(`server is running at port 3000`);
    connectDB();
});