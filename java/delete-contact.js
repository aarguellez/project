$(() => $(".deleteButton").click(clickHandler));

function clickHandler() {

  if (confirm("Do you want to delete this?")) {
    const uid = $(this).attr("data-uid");
    console.log("delete: ", uid);
    deleteContact(uid);
    window.location.reload(true);
  } else {
    txt = "You pressed Cancel!";
  }
}

function deleteContact(uid) {
  const request = $.ajax({
    url: `/contacts/delete/${uid}`,
    type: "delete",
    success: function (data) {
      console.log("delete done", data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("error happend");
      console.log(jqXHR, textStatus, errorThrown);
    }
  });

  const requesthome = $.ajax({
    url: '../Contact List/',
    type: 'get'
  });
  setTimeout('window.location.replace("../contacts");', 3000)
  
}