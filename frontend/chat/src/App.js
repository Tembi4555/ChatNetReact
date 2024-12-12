import { HubConnectionBuilder } from "@microsoft/signalr";
import { WaitingRoom } from "./components/WaitingRoom";

function App() {
  const joinChat = () => {
    var connection = new HubConnectionBuilder()
    .withUrl()
    .build();
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <WaitingRoom />
    </div>
  );
}

export default App;
