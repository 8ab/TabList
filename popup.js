createTabsList();
function createTabsList() {
    chrome.tabs.query({ currentWindow: true }, function (tabs) {
        for (var i = 0; i < tabs.length; i++) {
            var container = document.createElement("div");
            if (tabs[i].active) {
                container.className = "container active";
            } else {
                container.className = "container inactive";
            }
            container.id = tabs[i].id;
            container.onclick = function () {
                chrome.tabs.update(Number(this.id), { active: true });
            }
            var favicon = document.createElement("img");
            favicon.className = "favicon";
            favicon.src = tabs[i].favIconUrl;
            var content = document.createElement("span");
            content.className = "content";
            content.innerHTML = tabs[i].title;
            var btn = document.createElement("button");
            btn.type = "button";
            btn.onclick = function (e) {
                e.stopPropagation();
                //削除対象タブのID（クリックされたボタンの親containerのID）を取得
                var containerId = this.parentElement.id;
                //現在表示しているタブのID（＝一覧上でactiveクラスが付いているcontainerのID）を退避
                var activeTabId = document.querySelector(".active").id;
                //一覧から削除対象タブの情報を削除
                var containerElt = document.getElementById(containerId);
                containerElt.parentNode.removeChild(containerElt);
                //タブ削除
                chrome.tabs.remove(Number(containerId), function () {
                    //削除前に表示していたタブを表示
                    chrome.tabs.update(Number(activeTabId), { active: true });
                    //
                })
            }
            container.appendChild(favicon);
            container.appendChild(content);
            container.appendChild(btn);
            document.body.appendChild(container);
        }
    })
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchbox").addEventListener("keyup", filterTabsList);
    function filterTabsList() {
        let contents = document.querySelectorAll(".content");
        contents.forEach(content => {
            if (content.innerHTML.toLowerCase().indexOf(this.value.toLowerCase()) < 0) {
                content.parentNode.style.display = "none";
            } else {
                content.parentNode.style.display = "grid";
            }
        })
    }
})

/*
function tabActivate(tabid) {

    chrome.tabs.update(Number(tabid), { active: true });

}

function tabDelete(tabid) {
    return function (e) {

        //現在表示しているタブのID（＝一覧上でactiveクラスが付いているcontainerのID）を退避
        var activeTabId = document.querySelector(".active").id;
        //一覧から削除対象タブの情報を削除
        var containerElt = document.getElementById(tabid);
        containerElt.parentNode.removeChild(containerElt);
        //タブ削除
        chrome.tabs.remove(Number(tabid), function () {
            //削除前に表示していたタブを表示

            chrome.tabs.update(Number(activeTabId), { active: true });
            //
        })
        e.stopPropagation();
    }
}

function tabControll(c, tabid) {
    switch (c) {
        case "active":
            chrome.tabs.update(Number(tabid), { active: true });
            break;
        case "delete":
            //現在表示しているタブのID（＝一覧上でactiveクラスが付いているcontainerのID）を退避
            var activeTabId = document.querySelector(".active").id;
            //一覧から削除対象タブの情報を削除
            var containerElt = document.getElementById(tabid);
            containerElt.parentNode.removeChild(containerElt);
            //タブ削除
            chrome.tabs.remove(Number(tabid), function () {
                //削除前に表示していたタブを表示

                //うまくいかない
                alert("aa");
                tabControll("active", activeTabId);
                //

            });
            break;
        default:
            console.log("invalid request.");

    }
}

*/