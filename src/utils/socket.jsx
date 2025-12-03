import { io } from "socket.io-client";
import { baseUrl } from "./constants";

export const createSocketConnection = () => {
    if(location.hostname === "localhost"){
        //localhost
        return io(`${baseUrl}`)
    }else{
        //production
        return io("/", {path: "/api/socket.io"})
    }
    
}