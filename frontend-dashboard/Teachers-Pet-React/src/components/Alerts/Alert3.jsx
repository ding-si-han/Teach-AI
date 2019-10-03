import React from "react";
import swal from "sweetalert2";

export default function sweetalertfunction3() {
  swal.fire({
    title: "Select field validation",
    input: "select",
    inputOptions: {
      apples: "Apples",
      bananas: "Bananas",
      grapes: "Grapes",
      oranges: "Oranges"
    },
    inputPlaceholder: "Select a fruit",
    showCancelButton: true
  });
}