function loginSubmit() {
  console.log("hi");
  var val = document.getElementById("dukes-id").value;
  location.href = "profile.html"; // route to profile page
  if (val.includes("-ta")) {
    document.getElementById("student-table").style.display = "none";
  } else {
    document.getElementById("ta-table").style.display = "none";
  }
}
