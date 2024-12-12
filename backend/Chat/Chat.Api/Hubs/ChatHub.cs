﻿using Chat.Api.Models;
using Microsoft.AspNetCore.SignalR;

namespace Chat.Api.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        public async Task JoinChat (UserConnection connection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatRoom);

            await Clients.Group(connection.ChatRoom)
                .ReceiveMessage("Admin", $"{connection.UserName} присоединился к чату.");
        }
    }

    public interface IChatClient
    {
        public Task ReceiveMessage(string userName, string message);
    }
}
