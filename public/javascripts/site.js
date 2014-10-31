function DoNav(url, param){
    document.location.href = url + param;
}
function goBack() {
    window.history.back()
}

function testDelete(url, param){
    $.ajax({
        url: url + param,
        type: "DELETE",
        dataType: 'json'
    });
}