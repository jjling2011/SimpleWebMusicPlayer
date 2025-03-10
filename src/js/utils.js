export default class Utils {
    #status

    #confirmResolve
    #confirmReject
    #promptResolve
    #promptReject

    constructor() {
        this.#status = $("#utils-status")
        $("#dialog-alert-ok").click(() => $("#dialog-alert").hide())
        $("#dialog-confirm-ok").click(() => this.#confirmResolve?.())
        $("#dialog-confirm-cancel").click(() => this.#confirmReject?.())
        $("#dialog-prompt-ok").click(() => this.#promptResolve?.())
        $("#dialog-prompt-cancel").click(() => this.#promptReject?.())
    }

    // https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
    move(arr, fromIndex, toIndex) {
        const element = arr[fromIndex]
        arr.splice(fromIndex, 1)
        arr.splice(toIndex, 0, element)
    }

    async prompt(title, content) {
        const dialog = $("#dialog-prompt")
        const p = new Promise((resolve, reject) => {
            this.#promptResolve = resolve
            this.#promptReject = reject
        })
        $("#dialog-prompt-title").text(title)
        $("#dialog-prompt-content").val(content)
        dialog.show()
        try {
            await p
            const s = $("#dialog-prompt-content").val()
            return s
        } catch {
        } finally {
            dialog.hide()
        }
        return null
    }

    async confirm(content) {
        const dialog = $("#dialog-confirm")
        const p = new Promise((resolve, reject) => {
            this.#confirmResolve = resolve
            this.#confirmReject = reject
        })
        $("#dialog-confirm-content").text(content)
        dialog.show()
        try {
            await p
            return true
        } catch {
        } finally {
            dialog.hide()
        }
        return false
    }

    alert(content) {
        $("#dialog-alert-content").text(content)
        $("#dialog-alert").show()
    }

    log(...args) {
        console.log(...args)
    }

    compareString(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    }

    showStatus(...args) {
        this.#status.text(args.join(" "))
    }

    showText(id, content) {
        $(`#${id}`).text(content)
    }

    post(url, str) {
        return new Promise((resolve, reject) => {
            // 创建一个新的 XMLHttpRequest 对象
            const xhr = new XMLHttpRequest()

            // 配置请求
            xhr.open("POST", url, true)
            xhr.setRequestHeader("Content-Type", "application/json")

            // 设置响应类型为 JSON
            xhr.responseType = "json"

            // 定义请求完成时的回调函数
            xhr.onload = function () {
                if (xhr.status !== 200) {
                    reject(`network error`)
                    return
                }
                // 请求成功，处理返回的 JSON 数据
                const response = xhr.response
                try {
                    if (response.ok) {
                        resolve(response.data)
                    } else {
                        reject(response.data)
                    }
                } catch (err) {
                    reject(err.message)
                }
            }

            xhr.onerror = (err) => reject(err.message)
            xhr.ontimeout = (err) => reject(err.message)
            xhr.send(str)
        })
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`
    }

    pickRandom(arr) {
        const idx = Math.floor(Math.random() * arr.length)
        return arr[idx]
    }

    isMatch(str, keywords) {
        if (keywords.length < 1) {
            return true
        }
        for (let kw of keywords) {
            if (str.indexOf(kw) < 0) {
                return false
            }
        }
        return true
    }

    getMusicName(url) {
        const ps = (url || "").split(/[/]/)
        if (ps.length < 1) {
            return ""
        }
        return ps[ps.length - 1]
    }

    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    shuffleArray(array) {
        for (var i = array.length - 1; i >= 0; i--) {
            var j = Math.floor(Math.random() * (i + 1))
            var temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    }
}
