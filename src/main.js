import "./css/solid.min.css"
import "./css/fontawesome.min.css"
import "./css/styles.css"

import Player from "./js/player.js"
import Database from "./js/database.js"
import LibList from "./js/lib-list.js"
import Pages from "./js/pages.js"
import PlayList from "./js/play-list.js"
import DirList from "./js/dir-list.js"

const pages = new Pages()
pages.init()

const db = new Database()
const player = new Player(db)
const playList = new PlayList(db, player)
const dirList = new DirList(db, playList, player, pages)
const libList = new LibList(db, player, playList, dirList)

function init() {
    libList.clearSearchKeyword()
    playList.refresh()
    dirList.refresh()
}

if (db.getAllMusic().length < 1) {
    db.updateMusicDbAsync().then(() => {
        init()
        pages.show("lib")
    })
} else {
    init()
    pages.show("playlist")
}
