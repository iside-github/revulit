export default function download_table_as_csv(
  table_id = "dataframe",
  separator = ",",
  fname = "filename",
  filtertype = "filter"
) {
  // Select rows from table_id
  const toRemove = document.querySelectorAll(".to_remove");
  toRemove.forEach((node) => node.remove());
  var rows = document.querySelectorAll("table.dataframe" + " tr");
  // Construct csv
  var csv = [];
  for (var i = 0; i < rows?.length; i++) {
    var row = [],
      cols = rows[i].querySelectorAll("td, th");
    for (var j = 0; j < cols?.length; j++) {
      // Clean innertext to remove multiple spaces and jumpline (break csv)
      var data = cols[j].innerText
        .replace(/(\r\n|\n|\r)/gm, "")
        .replace(/(\s\s)/gm, " ");
      // Escape double-quote with double-double-quote (see https://stackoverflow.com/questions/17808511/properly-escape-a-double-quote-in-csv)
      data = data.replace(/"/g, '""');
      // Push escaped string
      row.push('"' + data + '"');
    }
    csv.push(row.join(separator));
  }
  var csv_string = csv.join("\n");
  // Download it
  var filename =
    "export_" + table_id + "_" + new Date().toLocaleDateString() + ".csv";
  var filenma =
    fname + "-" + filtertype + "-" + new Date().toLocaleDateString() + ".csv";
  var link = document.createElement("a");
  link.style.display = "none";
  link.setAttribute("target", "_blank");
  link.setAttribute(
    "href",
    "data:text/csv;charset=utf-8," + encodeURIComponent(csv_string)
  );
  link.setAttribute("download", filenma);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
