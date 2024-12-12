import { HubConnectionBuilder } from "@microsoft/signalr";
import { WaitingRoom } from "./components/WaitingRoom";
import { useState } from "react";
import { Chat } from "./components/Chat";

function App() {

  const [connection, setConnection] = useState(null);
  const [chatRoom, setChatRoom] = useState("");
  const [message, setMessages] = useState([]);

  const joinChat = async (userName, chatRoom) => {
    var connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5138/chat")
      .withAutomaticReconnect()
      .build();
    
    connection.on("ReceiveMessage", (userName, message) => {
      setMessages((messages) => [...messages, {userName, message}]);
    });

    try{
      await connection.start();
      await connection.invoke("JoinChat", {userName, chatRoom});

      setConnection(connection);
      setChatRoom();
    }
    catch(error){
      console.log(error);
    }
  };

  const sendMessage = (message) => {
    connection.invoke("SendMessage", message);
  }

  const closeChat = async () => {
    await connection.stop();
    setConnection(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {connection ? (<Chat 
        messages={message} 
        chatRoom={chatRoom}
        sendMessage={sendMessage}
        closeChat={closeChat}
        />
        ) : (
        <WaitingRoom joinChat={joinChat}/>
        )}
    </div>
  );
}

export default App;
