var today = moment()
$("#currentDay").text(today.format("dddd, MMMM D"))

var hourNow = parseInt(today.format("H"))

$("textarea").each(function(){
    // alert($(this).attr("data-hour"));
    var dataHour = parseInt($(this).attr("data-hour"))
    console.log(dataHour)
    console.log(hourNow)
    if (dataHour < hourNow) {
        $(this).addClass("past")
    } else if (dataHour == hourNow) {
        $(this).addClass("present")
    } else if (dataHour > hourNow) {
        $(this).addClass("future")
    }
});

var existingEntries = JSON.parse(localStorage.getItem("scheduleEntries"));
if (existingEntries == null) { 
    existingEntries = [];
};

for (let i = 0; i < existingEntries.length; i++) {
    var j = existingEntries[i]["index"];
    if ($("textarea").eq(j).text() == "") {
        $("textarea")[j].append(existingEntries[i]["entry"])
    } else {
        $("textarea").eq(j).empty();
        $("textarea")[j].append(existingEntries[i]["entry"])
    }
}

$(".saveBtn").on("click", function() {
    var enteredText = $(this).siblings("textarea").val();
    //console.log(enteredText)
    var textIndex = $(this).siblings("textarea").attr("data-index")
    // console.log(textIndex)
    var toDo = {
        "entry": enteredText,
        "index": textIndex, 
    };
    localStorage.setItem("toDo", JSON.stringify(toDo));
    existingEntries.push(toDo);
    localStorage.setItem("scheduleEntries", JSON.stringify(existingEntries));
})