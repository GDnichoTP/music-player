class Node {
    // node linked list
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class LinkedList {
    // method standar untuk membuat object
    constructor() {
        this.head = null;
        this.current = null;
        this.tail = null;
    }

    // menambahkan lagu baru
    insert(data) {
        const new_node = new Node(data);
        if (this.head === null) {
            this.head = new_node;
            this.head.next = this.head;
            this.head.prev = this.head;
            this.current = this.head;
        } else {
            this.tail = this.head.prev;
            this.tail.next = new_node;
            new_node.next = this.head;
            new_node.prev = this.tail;
            this.head.prev = new_node;
        }

        update_playlist();
        update_current();
    }

    // menghapus lagu tertentu
    delete(data) {
        if (this.head === null) return;

        let temp = this.head;
        let prev_node = this.tail;

        // cek manual per list
        do {
            if (temp.data === data) {
                if (temp === this.head) {
                    // jika menghapus head
                    this.head = temp.next;
                    this.head.prev = temp.prev;
                    temp.prev.next = this.head;
                } else {
                    // jika menghapus selain head
                    prev_node.next = temp.next;
                    temp.next.prev = prev_node;
                }
                if (temp === this.current) {
                    // jika menghapus lagu yang diputar
                    this.current = temp.next;
                }
                if (temp === this.head && temp.next === this.head) {
                    // jika list kosong
                    this.head = null;
                    this.current = null;
                }
                break;
            }
            prev_node = temp;
            temp = temp.next;
        } while (temp !== this.head);
        
        update_playlist();
        update_current();
    }

    // memberikan data lagu yang diputar
    current_song() {
        if (this.current != null) {
            return this.current.data;
        } else {
            return "none";
        }
    }

    preview(){
        if (this.current != null) {
            return this.current.next.data;
        } else {
            return "none";
        }
    }

    // memutar lagu selanjutnya
    next_song() {
        if (this.current != null) {
            this.current = this.current.next;
        }
        update_current();
    }

    // memutar lagu sebelumnya
    prev_song() {
        if (this.current != null) {
            this.current = this.current.prev;
        }
        update_current();
    }

    // membuat array list lagu
    make_list() {
        if (this.head === null) {
            return [];
        }
        const songs = [];
        let current = this.head;
        do {
            songs.push(current.data);
            current = current.next;
        } while (current !== this.head);
        return songs;
    }
}

// membuat object playlist dengan class LinkedList
const playlist = new LinkedList();

// memperbarui lagu yang diputar
function update_current() {
    document.getElementById('current-song').innerText = '"' + playlist.current_song() + '"';
    document.getElementById('textNextMusic').innerText = playlist.preview();
}

// memperbarui daftar lagu
function update_playlist() {
    // mencari tempat dengan id 'song-list'
    const song_list = document.getElementById('song-list');

    // mengosongkan variabel song_list
    song_list.innerHTML = '';

    // mengambil data array list lagu
    const songs = playlist.make_list();

    // menampilkan daftar lagu dalam list
    songs.forEach((song) => {
        // membuat layout list
        const item_list = document.createElement('li');
        item_list.className = 'song';

        const titleContainer = document.createElement('div');
        titleContainer.className = 'songTitleContainer';

        // membuat daftar lagu
        const song_text = document.createElement('span');
        song_text.className = 'songTitle';
        song_text.innerText = `${song}`;

        // membuat tombol delete untuk setiap lagu
        const delete_btn = document.createElement('button');
        delete_btn.className = 'deleteButton';
        delete_btn.innerText = '-';
        delete_btn.onclick = () => {
            playlist.delete(song);
        };

        titleContainer.appendChild(song_text);
        titleContainer.appendChild(delete_btn);

        // memasukan daftar lagu dan tombol delete ke dalam list
        item_list.appendChild(titleContainer);

        // memasukan list ke tempat song_list
        song_list.appendChild(item_list);
    });
}

// memanggil method insert dalam class LinkedList
function insert_song() {
    const new_song = prompt("Judul:");
    if  (new_song != null && new_song != ""){
        playlist.insert(new_song);
    }
}

// memanggil method next_song dalam class LinkedList
function next_song() {
    playlist.next_song();
}

// memanggil method prev_song dalam class LinkedList
function prev_song() {
    playlist.prev_song();
}

function play_song(){
    const playButton = document.getElementById('play');
        if (playButton.src.match('/stocks/Video_fill.png')){
        playButton.src = '/stocks/Stop_fill.png';
    }
    else{
        playButton.src = '/stocks/Video_fill.png';
    }
}

update_current();
update_playlist();