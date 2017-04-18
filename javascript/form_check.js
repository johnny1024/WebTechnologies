function isEmpty(string) {
    if (string.length == 0) { return true; }
    else return false;
}

function isWhiteSpace(string) {
    var ws = "\t\n\r ";
    for (var i = 0; i < string.length; i++) {
        var c = string.charAt(i);
        if (ws.indexOf(c) == -1) {
            return false;
        }
        return true;
    }
}

function checkString(string) {
    if (isEmpty(string) || isWhiteSpace(string)) {
        alert("Niepoprawna wartość");
        return false;
    }
    else return true;
}

function checkStringAndFocus(obj, msg) {
    var str = obj.value;
    var errorFieldName = "e_" + obj.name.substr(2, obj.name.length);
    if (isWhiteSpace(str) || isEmpty(str)) {
        document.getElementById(errorFieldName).innerHTML = msg;
        obj.focus();
        startTimer(errorFieldName);
        return false;
    }
    else {
        return true;
    }
}

function showElement(e) {
    document.getElementById(e).style.visibility = 'visible';
    console.log(e);
}
function hideElement(e) {
    document.getElementById(e).style.visibility = 'hidden';
    console.log(e);
}

// not used
function checkEmail(str) {
    if (isWhiteSpace(str)) {
        alert("Podaj właściwy e-mail");
        return false;
    }
    else {
        var at = str.indexOf("@");
        if (at < 1) {
            alert("Nieprawidłowy e-mail");
            return false;
        }
        else {
            var l = -1;
            for (var i = 0; i < str.length; i++) {
                var c = str.charAt(i);
                if (c == ".") {
                    l = i;
                }
            }
            if ((l < (at + 2)) || (l == str.length - 1)) {
                alert("Nieprawidłowy e-mail");
                return false;
            }
        }
        return true;
    }
}

function checkEmailRegEx(str, msg) {
    var email = /[a-zA-Z_0-9\.]+@[a-zA-Z_0-9\.]+\.[a-zA-Z][a-zA-Z]+/;
    if (email.test(str))
        return true;
    else {
        //alert("Podaj właściwy e-mail");
        document.getElementById("e_email").innerHTML = msg;
        //obj.focus();
        //startTimer(errorFieldName);
        return false;
    }
}

function checkZIPCodeRegEx(str) {
    var kod = /^\d{5}$/;
    if (kod.test(str)) {
        document.getElementById("kod").className = "green";
        document.getElementById("kod").innerHTML = "OK";
        return true;
    }
    else {
        document.getElementById("kod").className = "red";
        document.getElementById("kod").innerHTML = "ŹLE";
        return false;
    }
}

var errorField = "";
function startTimer(fName) {
    errorField = fName;
    window.setTimeout("clearError(errorField)", 5000);
}
function clearError(objName) {
    document.getElementById(objName).innerHTML = "";
}

function cnt(form, msg, maxSize) {
    if (form.value.length > maxSize)
        form.value = form.value.substring(0, maxSize);
    else
        msg.innerHTML = maxSize - form.value.length;
}

function validate(form) {
    var passed = true;

    var names = ["f_imie", "f_nazwisko", "f_ulica", "f_miasto"];
    var errorMessages = ["Nieprawidłowe imię", "Nieprawidłowe nazwisko", "Nieprawidłowa ulica", "Nieprawidłowe miasto"];

    for (var i = names.length-1; i >= 0; i--) {
        if (!checkStringAndFocus(form.elements[names[i]], errorMessages[i])) {
            passed = false;
            form.elements[names[i]].className = "wrong";
        }
    }

    if (!checkEmailRegEx(form.elements["f_email"].value, "Nieprawidłowy email")) {
        passed = false;
        form.elements["f_email"].className = "wrong";
    }
    if (!checkZIPCodeRegEx(form.elements["f_kod"].value)) {
        passed = false;
    }

    return passed;
}

function alterRows(i, e) {
    if (e) {
        if (i % 2 == 1) {
            e.setAttribute("style", "background-color: Aqua;");
        }
        e = e.nextSibling;
        while (e && e.nodeType != 1) {
            e = e.nextSibling;
        }
        alterRows(++i, e);
    }
}

window.onload = function() { alterRows(1, document.getElementById("TABLE").getElementsByTagName("tr")[0]); }

function nextNode(e) {
    while (e && e.nodeType != 1) {
        e = e.nextSibling;
    }
    return e;
}
function prevNode(e) {
    while (e && e.nodeType != 1) {
        e = e.previousSibling;
    }
    return e;
}
function swapRows(b) {
    var tab = prevNode(b.previousSibling);
    var tBody = nextNode(tab.firstChild);
    var lastNode = prevNode(tBody.lastChild);
    tBody.removeChild(lastNode);
    var firstNode = nextNode(tBody.firstChild);
    tBody.insertBefore(lastNode, firstNode);
}
