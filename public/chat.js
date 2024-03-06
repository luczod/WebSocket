const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get('username');
const room = urlSearch.get('select_room');

const greeding = (document.getElementById(
  'username',
).innerText = `Room: ${room} \n Username: ${username}`);

// emit => send some information/action
// on => listening to some information/action

socket.emit(
  'select_room',
  {
    username,
    room,
  },
  (messages) => {
    messages.forEach((element) => {
      createMsg(element);
    });
  },
);

document.getElementById('messages_input').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const message = event.target.value;

    const data = {
      room,
      message,
      username,
    };

    socket.emit('message', data);

    event.target.value = '';
  }
});

socket.on('message', (data) => {
  createMsg(data);
});

function createMsg(data) {
  const messageDiv = document.getElementById('messages');
  messageDiv.innerHTML += `
  <div class="new_messages">
    <div class="from-label"> <span class="createdAt">${dayjs(data.createdAt).format(
      'DD/MM HH:mm',
    )} </span> - <strong>${data.username}:</strong> ${data.text}</div>
  </div>
  `;
}

document.getElementById('logout').addEventListener('click', () => {
  window.location.href = 'index.html';
});
