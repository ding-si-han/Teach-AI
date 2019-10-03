import React from "react";
import swal from "sweetalert2";
import halftimeReport from "../../views/Halftime/halftimeReport";

export default function sweetalertfunction1() {
  swal.fire({
      title: "Time for a break?\n",
      text: "Engagement of class detected to be falling.",
      type: "info",
      width: 1200,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Call for Break!"
    })
    .then(result => {
      if (result.value) {
        swal.fire({
            title: "Nice!",
            text: "Firing up your halftime report!",
            type: "success"
          })
          .then(function(result) {
            window.location = "/admin/halftimereport";
          });
      }
    });
}