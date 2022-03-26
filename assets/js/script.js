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

$(".saveBtn").on("click", function() {
    var enteredText = $(this).siblings("textarea").val();
    //console.log(enteredText)
    var textIndex = $(this).siblings("textarea").attr("data-index")
    // console.log(textIndex)
    var existingEntries = JSON.parse(localStorage.getItem("scheduleEntries"));
    if (existingEntries == null) existingEntries = [];
    var toDo = {
        "entry": enteredText,
        "index": textIndex, 
    };
    localStorage.setItem("toDo", JSON.stringify(toDo));
    existingEntries.push(toDo);
    localStorage.setItem("scheduleEntries", JSON.stringify(existingEntries));
})

var allScheduledEntries = JSON.parse(localStorage.getItem("scheduleEntries"));
if (allScheduledEntries == null) { 
    allScheduledEntries = [];
};

for (let i = 0; i < allScheduledEntries.length; i++) {
    var j = allScheduledEntries[i]["index"];
    if ($("textarea").eq(j).text() == "") {
        $("textarea")[j].append(allScheduledEntries[i]["entry"])
    } else {
        $("textarea").eq(j).empty();
        $("textarea")[j].append(allScheduledEntries[i]["entry"])
    }
}