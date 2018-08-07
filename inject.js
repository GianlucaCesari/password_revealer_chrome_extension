(function () {
    let ary = []
    chrome.storage.local.get(["is_showing"], function (items) {
        if (items) {
            if (items.is_showing) {
                hidePasswords();
            } else {
                showPasswords();
            }
        } else {
            showPasswords();
        }
    });
    function showPasswords() {
        chrome.storage.local.set({
            "is_showing": true
        }, function () {
            let inputs = document.getElementsByTagName("input");
            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].type.toLowerCase() === "password") {
                    ary.push(inputs[i]);
                    inputs[i].type = 'text';
                    inputs[i].dataset.loud = "changed";
                }
            }
        });
    }
    function hidePasswords() {
        chrome.storage.local.set({
            "is_showing": false
        }, function () {
            let arrayInputs = document.querySelector('input[data-loud="changed"]');
            if (!arrayInputs.length) {
                arrayInputs.type = "password";
            } else {
                for (let i = 0; i < arrayInputs.length; i++) {
                    items.arr[i].type = 'password';
                }
            }
        });
    }
})();