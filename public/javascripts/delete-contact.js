$(() => $(".deleteButton").click(clickHandler));

function clickHandler() {

  if (confirm("Are you sure you would like to delete this contact?")) {
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
    url: '../contacts/',
    type: 'get'
  });
  setTimeout('window.location.replace("../contacts");', 3000)
  
}